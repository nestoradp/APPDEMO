import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

function DataTable({ data }) {
  const columns = data[0] && Object.keys(data[0]);

  const row = [data.map((r) => ({ id: r.id, path: r.path }))];

  console.log(row);

  return (
    <TableContainer>
      <Table aria-label="simple table" size="medium">
        <TableHead>
          <TableRow>
            {data[0] &&
              columns.map((heading) => <TableCell>{heading}</TableCell>)}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.abstract}</TableCell>
              <TableCell>{row.path}</TableCell>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.author.name}</TableCell>
              <TableCell>{row.resource.id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
