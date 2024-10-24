import * as React from 'react';
import { useState } from 'react';
import { Box, MenuItem, InputLabel, FormControl, Select, TextField, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useGet } from "./../../hooks/useFetch";
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
function createData(id, name, brand, type, color, price, quantity, date) {
  return { id, name, brand, type, color, price, quantity, date };
}

const BasicTable = (props) => {
  const { rows } = props
  const oDownloadReport = () => {
    const doc = new jsPDF()
    autoTable(doc, { html: '#report-table' })
    const fileName = Date.now()
    doc.save(`${fileName}.pdf`)
  }
  return (
    <>
      <TableContainer style={{ marginTop: 32 }} component={Paper}>
        <Table id="report-table" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Item name</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Color</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell>{row.brand}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.color}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%', marginBottom: 32, marginTop: 32 }}>
        <Button variant="contained" color="success" onClick={() => oDownloadReport()}>Download report</Button>
      </div>
    </>
  );
}

const CustomerReports = () => {
  const { fetchData: fetchCustomer } = useGet();
  const { fetchData: fetchReport, data: reportData } = useGet();
  const currentUserId = 1;
  const [startDate, setStartDate] = useState('')
  const [endtDate, setEndDate] = useState('')
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchCustomer(`customer?id=${currentUserId}`);
  }, []);

  const [reportType, setReportType] = useState(''); // State to store selected report type

  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
  };

  const onGenerateReport = () => {
    fetchReport(`customer-order/filter?startDate=${startDate}&endDate=${endtDate}&orderStatus=${reportType}`)
  }
  useEffect(() => {
    if (reportData?.data?.length > 0) {
      const mappedReportData = []
      reportData.data.forEach((order) => {
        order?.items?.forEach((item) => {
          let dateStr = new Date(item.createdAt)
          dateStr = dateStr.toLocaleDateString()
          const createdData = createData(
            item.id,
            item.name,
            item.brand,
            item.type,
            item.color,
            item.price,
            item.quantity,
            dateStr
          )
          mappedReportData.push(createdData)
        })
      })

      if (mappedReportData?.length > 0) setRows(mappedReportData)
    }
  }, [reportData])

  return (
    <>
      <Header />
      <Container maxWidth="md" style={{ marginTop: 20 }}>
        <table id="my-table"></table>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, marginTop: 32 }}>
          <Typography gutterBottom variant="h3" style={{ display: 'flex', alignContent: 'center', margin: 0, marginRight: 16 }}>
            Reports
          </Typography>
        </div>
        <Box sx={{ display: 'flex' }}>
          <TextField id="outlined-basic" name="startDate" label="Start Date" variant="outlined" sx={{ marginRight: 10 }} onChange={(e) => setStartDate(e.target.value)} placeholder="YYYY-MM-DD" />
          <TextField id="outlined-basic" name="endDate" label="End Date" variant="outlined" sx={{ marginRight: 10 }} onChange={(e) => setEndDate(e.target.value)} placeholder="YYYY-MM-DD" />
          <FormControl sx={{ minWidth: 120, marginRight: 10 }}>
            <InputLabel id="report-type-select-label">Order Status</InputLabel>
            <Select
              labelId="report-type-select-label"
              id="report-type-select"
              value={reportType}
              label="Report Type"
              onChange={handleReportTypeChange}
            >
              <MenuItem value="pending">Order Pending</MenuItem>
              <MenuItem value="deliver">Order Deliver</MenuItem>
              <MenuItem value="completed">Order Completed</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" onClick={() => onGenerateReport()}>Generate report</Button>
        </Box>
        {
          rows?.length > 0 && <BasicTable rows={rows} />
        }
      </Container>
    </>
  );
};

export default CustomerReports;
