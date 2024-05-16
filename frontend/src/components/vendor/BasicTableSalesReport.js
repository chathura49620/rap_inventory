import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './common.css';



const BasicTableSalesReport = (props) => {
  const { headers, rows , totalReport } = props;


  
  return (
    <>
    <h3><center>Total Sales :- Rs. ${totalReport}</center></h3>
    <TableContainer class="table1" component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map(header => (
              <TableCell align="center"><b>{header}</b></TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.id}</TableCell>
              <TableCell align="center">{row.request_Id}</TableCell>
              <TableCell align="center">{row.total}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

export default BasicTableSalesReport;
