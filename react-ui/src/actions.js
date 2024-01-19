import axios from "axios";
import { API, BASE_URL } from "./constants";

export const generateReport = async ({ urls }) => {
  try {
    const { data: response } = await axios.post(
      `${BASE_URL}/${API.GENERATE_REPORT}`,
      {
        urls,
      }
    );
    return response;
  } catch (ex) {}
};
