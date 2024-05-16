import React, { useEffect, useState } from 'react';
import SideNav from '../../../components/vendor/sideNav/Sidebar'
import BasicTableSalesReport from '../../../components/vendor/BasicTableSalesReport';
import axios from "axios";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const SalesReports = () => {
    const [invoice, setInvoice] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [status, setStatus] = useState('SENT TO CLIENT');
    const [totalReport, setTotalReport] = useState('');

    useEffect(() => {
        setHeaders(["ID", "Product Request Id", "Invoice Total", "Status"]);
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/vendor-invoice?status=${status}`).then((res) => {
            console.log(res.data);
            setInvoice(res.data.data);
            let total = 0;
            res.data.data.forEach(element => {
                total += Number(element.total)
            });
            setTotalReport(total);
        }).catch(err => {
            console.error(err);
        });

    }, [status]);


    const generatePDF = async (event) => {
        event.preventDefault();
        // Create a new PDF instance
        const doc = new jsPDF();
    
        // Set the document title
        doc.text('Sales Report Data', 10, 10);
    
        // Convert the table data to an array of arrays
        let data = []
        invoice.forEach(element => {
          let array = [element.id ,element.request_Id , element.total , element.status ] 
          data.push(array);
    
    
        });
    
    
        // Add the table using autoTable plugin
        doc.autoTable({
          head: [["ID", "Product Request Id", "Invoice Total", "Status"]], // Header row
          body: data // Data rows
        });
    
        // Save the PDF
        doc.save('sales-report.pdf');
      };

   

   


    return (
        <div style={{display: "block"}}>
            <SideNav />
            <div className='stock-body' style={{display: "block"}}>
                <h1><center>Sales Report</center></h1>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginLeft:"400px" , marginTop: "15px" }}>
                  
                 <Select
                    style={{ display: "flex", alignItems: "center" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Status"
                    onChange={(e) => setStatus(e.target.value)}
                >
                        <MenuItem value="SENT TO CLIENT">SENT TO CLIENT</MenuItem>
                        <MenuItem value="PAYMENT DONE">PAYMENT DONE</MenuItem>
                  
                </Select>
                
            
                <button className='btn btn-warning'  style={{ display: "flex", justifyContent: "flex-end" }} onClick={(e) => generatePDF(e)}>Generate PDF</button> <br />
           
                </div>
                <BasicTableSalesReport
                    headers={headers}
                    rows={invoice}
                    totalReport={totalReport}
                />
               
            </div>
        </div>
    )
}

export default SalesReports;