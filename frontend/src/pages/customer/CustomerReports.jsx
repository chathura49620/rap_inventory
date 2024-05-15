import * as React from 'react';
import { useState } from 'react';
import { Box, MenuItem, InputLabel, FormControl, Select, TextField, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useGet } from "./../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Container } from '@mui/material';
import Header from '../../components/customer/Header';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const BasicTable = () => {
  return (
    <>
    <Header />
    <Container maxWidth="md" style={{ marginTop: 20 }}>
    <TableContainer style={{ marginTop: 32 }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Item name</TableCell>
            <TableCell align="right">Brand</TableCell>
            <TableCell align="right">type</TableCell>
            <TableCell align="right">price</TableCell>
            <TableCell align="right">quantity</TableCell>
            <TableCell align="right">quantity</TableCell>
            <TableCell align="right">date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
    </>
  );
}

const CustomerReports = () => {
  const navigate = useNavigate();
  const { data: currentUserData, fetchData: fetchCustomer } = useGet();
  const { fetchData: fetchReport, isPending: isReportPending, data: reportData } = useGet();
  const currentUserId = 1;
  const [startDate, setStartDate] = useState('')
  const [endtDate, setEndDate] = useState('')

  useEffect(() => {
    fetchCustomer(`customer?id=${currentUserId}`);
  }, []);

  const [reportType, setReportType] = useState(''); // State to store selected report type

  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
  };

  const onGenerateReport = () => {
    fetchReport(`customer-order-report?start_date=${startDate}&end_date=${endtDate}&order_status=${reportType}`)
  }
  useEffect(() => {
    if (reportData?.data?.length > 0) {
      const mappedReportData = []
      reportData.data.forEach((customerOrder) => {
        const orderItem = customerOrder?.orderItem?.map((item) => {
          return {
            ...item,
            order_id: item.id,
            name: item.stockItem.name,
            brand: item.stockItem.brand,
            color: item.stockItem.color,
            price: item.stockItem.price,
            type: item.stockItem.type
          }
        })
        mappedReportData.push(orderItem)
      })

      console.log(mappedReportData);

      const doc = new jsPDF()
      autoTable(doc, {
        head: [['Item name', 'Brand', 'type', 'price', 'quantity', 'date']],
        body: [
          ['David', 'david@example.com', 'Sweden'],
          ['Castille', 'castille@example.com', 'Spain'],
        ],
      })
      doc.save('table.pdf')
    }
  }, [reportData])

  return (
    <>
      <table id="my-table"></table>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, marginTop: 32 }}>
        <Typography gutterBottom variant="h3" style={{ display: 'flex', alignContent: 'center', margin: 0, marginRight: 16 }}>
          Reports
        </Typography>
        {/* Added a dropdown to select report type */}

      </div>
      <Box sx={{ display: 'flex' }}>
        <TextField id="outlined-basic" label="Start Date" variant="outlined" sx={{ marginRight: 10 }} onChange={(e) => setStartDate(e.target.value)} placeholder="YYYY-MM-DD" />
        <TextField id="outlined-basic" label="End Date" variant="outlined" sx={{ marginRight: 10 }} onChange={(e) => setEndDate(e.target.value)} placeholder="YYYY-MM-DD" />
        <FormControl sx={{ minWidth: 120, marginRight: 10 }}>
          <InputLabel id="report-type-select-label">Order Status</InputLabel>
          <Select
            labelId="report-type-select-label"
            id="report-type-select"
            value={reportType}
            label="Report Type"
            onChange={handleReportTypeChange}
          >
            <MenuItem value="1">Order Pending</MenuItem>
            <MenuItem value="2">Order Deliver</MenuItem>
            <MenuItem value="3">Order Completed</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={() => onGenerateReport()}>Generate report</Button>
      </Box>

      {/* <BasicTable /> */}
    </>
  );
};

export default CustomerReports;
