import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableSortLabel } from "@mui/material";

export default function ReportTable({ data = [] }) {
  const row1 = data?.[0] ?? {};
  const { metrics = {} } = row1?.record ?? {};
  const [orderDirection, setOrderDirection] = React.useState("asc");

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{"origin"}</TableCell>
            {[...Object.keys(metrics)].map((field, idx) => {
              return (
                <TableCell align="right" key={`${field}_${idx}`}>
                  <TableSortLabel active={true} direction={orderDirection}>
                    {field}
                  </TableSortLabel>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => {
            return (
              <TableRow
                key={`${row.origin}+${idx}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row?.origin}
                </TableCell>
                {[...Object.keys(metrics)].map((field, idx) => {
                  return (
                    <TableCell key={idx} component="th" scope="row">
                      {row?.record?.metrics?.[field]?.percentiles?.p75}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
