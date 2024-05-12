import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import Button from 'react-bootstrap/Button';
import './common.css';
import axios from 'axios';

const BasicTableRequestedItems = (props) => {
  const { headers, rows} = props;

  const handleApprove = (id) => {
        let data = {
          id: id,
          request_status: "APPROVED"
        }
        axios.put('http://localhost:9000/api/v1/requested-items', data).then((res) => {
            console.log(res.data);
            window.location.reload();
        }).catch(err => {
            console.error(err);
        });
  }

  const handleReject = (id) => {
    let data = {
      id: id,
      request_status: "REJECTED"
    }
    axios.put('http://localhost:9000/api/v1/requested-items', data).then((res) => {
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
              <TableCell align="center">{row.product_id}</TableCell>
              <TableCell align="center">{row.product_name}</TableCell>
              <TableCell align="center">{row.quntity}</TableCell>
              <TableCell align="center">{row.request_status}</TableCell>
              <TableCell align="center">
                <Button variant="success" onClick={() => handleApprove(row.id)}>Approve</Button>
                <Button variant="danger" onClick={() => handleReject(row.id)}>Reject</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BasicTableRequestedItems;
