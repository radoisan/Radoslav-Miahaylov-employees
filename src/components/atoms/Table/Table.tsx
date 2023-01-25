import { FC } from "react";
import { StyledPaper } from "./Table.styles";
import { ITable } from "./Table.types";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const DenseTable: FC<ITable> = ({ data, columnConfig }) => {
  return (
    <TableContainer component={StyledPaper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {columnConfig.map((element, index) => (
              <TableCell key={element.columnName + index}>
                {element.columnName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((row) => (
              <TableRow
                key={row.id_person1 + row.id_person2}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.id_person1}</TableCell>
                <TableCell>{row.id_person2}</TableCell>
                <TableCell>{row.project_id}</TableCell>
                <TableCell>{row.daysWorkedTogether}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DenseTable;
