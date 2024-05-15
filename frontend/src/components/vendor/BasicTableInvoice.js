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

  const handlePaymentRecived = (id) => {
    let data = {
      id: id,
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
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {/* <TableCell component="th" scope="row">
                {row.name}
              </TableCell> */}
              <TableCell align="center">{row.id}</TableCell>
              <TableCell align="center">{row.request_Id}</TableCell>
              <TableCell align="center">{row.total}</TableCell>
              <TableCell align="center">{row.invoiced_date}</TableCell>
              <TableCell align="center">{row.due_date}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
              {/* <TableCell align="center">{row.due_date}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
              <TableCell align="center">{row.price}</TableCell>
              <TableCell align="center">{row.supplier_id}</TableCell> */}
              <TableCell align="center">
                {row.status !== "PAYMENT DONE" &&
                <Button variant="success" onClick={() => handlePaymentRecived(row.id)}>Payment Received</Button>
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
