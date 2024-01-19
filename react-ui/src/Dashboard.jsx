import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import ReportTable from "./ReportTable";
import Filters from "./components/Filters";
import { generateReport } from "./actions";
import UrlChips from "./UrlChips";
import _ from "lodash";

export default function Dashboard() {
  const [url, setUrl] = useState([]);
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    return () => {
      setUrl([]);
    };
  }, []);

  const fetchData = async (searchFieldText) => {
    const response = await generateReport({
      urls: _.uniq([...url, searchFieldText]),
    });

    setTableData((prev) =>
      _.uniqBy([...prev, ...response], "urlNormalizationDetails.originalUrl")
    );
  };
  const handleDelete = (v) => {
    setUrl((prev) => prev.filter((val) => val !== v));
    setTableData((prev) =>
      prev.filter((val) => val.urlNormalizationDetails.originalUrl !== v)
    );
  };
  console.log({ tableData });
  return (
    <Container
      style={{ padding: `10px 10px 0 10px`, margin: `0 0 0 0` }}
      maxWidth={false}
    >
      <Filters
        url={url}
        setUrl={setUrl}
        tableData={tableData}
        setTableData={setTableData}
        fetchData={fetchData}
        handleDelete={handleDelete}
      />
      <UrlChips url={url} handleDelete={handleDelete} />
      {(tableData ?? []).length > 0 && <ReportTable data={tableData} />}
    </Container>
  );
}
