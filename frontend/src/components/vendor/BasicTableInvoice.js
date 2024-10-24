import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './common.css';
import axios from 'axios';
import {Button} from '@mui/material';


const BasicTableInvoice = (props) => {
  const { headers, rows, preview, edit, deleteFunc } = props;

  const handlePaymentRecived = (id , requestId , total , invoicedDate , dueDate) => {
    let data = {
      id: id,
      requestId: requestId,
      invoicedDate: invoicedDate,
      dueDate: dueDate,
      total: total,
      status: "PAYMENT DONE"
    }
    axios.put('http://localhost:8080/api/v1/vendor-invoice', data).then((res) => {
        console.log(res.data);
        window.location.reload();
    }).catch(err => {
        console.error(err);
    });
  }

  return (
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
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {/* <TableCell component="th" scope="row">
                {row.name}
              </TableCell> */}
              <TableCell align="center">{row.id}</TableCell>
              <TableCell align="center">{row.requestId}</TableCell>
              <TableCell align="center">{row.total}</TableCell>
              <TableCell align="center">{row.invoicedDate}</TableCell>
              <TableCell align="center">{row.dueDate}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
              <TableCell align="center">
                {row.status !== "PAYMENT DONE" &&
                <button variant="success" className='btn btn-success' onClick={(e) => handlePaymentRecived(row.id, row.requestId , row.total , row.invoicedDate , row.dueDate)}>Payment Received</button>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BasicTableInvoice;
