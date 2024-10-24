import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import Button from 'react-bootstrap/Button';
import './common.css';
import axios from 'axios';

const BasicTableRequestedItems = (props) => {
  const { headers, rows } = props;

  const handleApprove = (dataapprove) => {
    // event.preventDefult();
    console.log("dataapprove",dataapprove);
    let dataApprove = {
      id: dataapprove.id,
      deliveryDate: dataapprove.deliveryDate,
      deliveryStatus: dataapprove.deliveryStatus,
      productId: dataapprove.productId,
      productName: dataapprove.productName,
      quantity: dataapprove.quantity,
      vendorId: dataapprove.vendorId,
      requestStatus: "APPROVED"
      
    }
    axios.put('http://localhost:8080/api/v1/request-vendor', dataApprove).then((res) => {
      console.log(res.data);
      window.location.reload();
    }).catch(err => {
      console.error(err);
    });
  }

  const handleReject = (dataReject) => {
    let datareject = {
      id: dataReject.id,
      deliveryDate: dataReject.deliveryDate,
      deliveryStatus: dataReject.deliveryStatus,
      productId: dataReject.productId,
      productName: dataReject.productName,
      quantity: dataReject.quantity,
      vendorId: dataReject.vendorId,
      requestStatus: "REJECTED"
    }
    axios.put('http://localhost:8080/api/v1/request-vendor', datareject).then((res) => {
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
              <TableCell align="center">{row.productId}</TableCell>
              <TableCell align="center">{row.productName}</TableCell>
              <TableCell align="center">{row.quantity}</TableCell>
              <TableCell align="center">{row.requestStatus}</TableCell>
              <TableCell align="center">
                {row.requestStatus === "PENDING" && 
                  <>
                  <Button variant="success" onClick={() => handleApprove(row)}>Approve</Button>
                  <Button variant="danger" onClick={() => handleReject(row)}>Reject</Button>
                  </>
               }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BasicTableRequestedItems;
