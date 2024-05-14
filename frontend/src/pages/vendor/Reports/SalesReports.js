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
    const [status, setStatus] = useState('');

    useEffect(() => {
        setHeaders(["ID", "Product Request Id", "Invoice Total", "Status"]);
    }, []);

    useEffect(() => {
        axios.get('http://localhost:9000/api/v1/vendor-invoice').then((res) => {
            console.log(res.data);
            setInvoice(res.data.data);
        }).catch(err => {
            console.error(err);
        });

    }, [status]);


    const generatePDF = async (event) => {
        event.preventDefault();
        // Create a new PDF instance
        const doc = new jsPDF();
    
        // Set the document title
        doc.text('Table Data', 10, 10);
    
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
            <center>
                 <Select
                    style={{marginTop: "15px"}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Status"
                    onChange={(e) => setStatus(e.target.value)}
                >
                        <MenuItem value="SENT TO CLIENT">SENT TO CLIENT</MenuItem>
                        <MenuItem value="PAYMENT DONE">PAYMENT DONE</MenuItem>
                  
                </Select><br />
                <button onClick={(e) => generatePDF(e)}>Generate PDF</button> <br />
                </center>
                <BasicTableSalesReport
                    headers={headers}
                    rows={invoice}
                />
               
            </div>
        </div>
    )
}

export default SalesReports;