// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors()); // Use this after the variable declaration

app.get("/", (req: Request, res: Response) => {
  res.send("*****BACK END*****");
});

app.post("/generateReport", async (req: Request, res: Response) => {
  const {
    body: { urls = [] },
  } = req;
  if (urls && urls.length > 0) {
    const requestConfig = urls.map((origin: string) => ({
      url: `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${process.env.GOOGLE_API_KEY}`,
      data: {
        formFactor: "PHONE",
        origin,
      },
    }));
    const tasks = requestConfig.map(({ url, data }: any) =>
      axios.post(url, data)
    );
    const responses = await Promise.allSettled(tasks);
    const fulfilled = responses.filter(
      (result) => result.status === "fulfilled"
    );
    let results = fulfilled.map((r: any) => {
      const {
        value: { data: { record: { key: { origin = {} } = {} } = {} } = {} },
      } = r;

      return {
        origin,
        ...r.value.data,
      };
    });
    res.send(JSON.stringify(results, null, 2));
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
