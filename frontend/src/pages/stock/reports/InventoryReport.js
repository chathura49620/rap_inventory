import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './report.css';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Button } from '@mui/material';

const InventoryReport = () => {
    const [data, setData] = useState([]);
    const [sortConfig, setSortConfig] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:8080/api/v1/request-vendor");
            // console.log(response.data)
            const result = await response.data;

            setData(result);
        };
        fetchData();
    }, []);

    const sortData = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = React.useMemo(() => {
        if (sortConfig !== null) {
            return [...data].sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return data;
    }, [data, sortConfig]);

    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return 'sortable';
        }
        return sortConfig.key === name ? `sortable sorted-${sortConfig.direction}` : 'sortable';
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: 15 }}>
                <h2>Inventory Report</h2>&nbsp;&nbsp;
                <Button className='print-btn' onClick={() => window.print()}><PictureAsPdfIcon /></Button>
            </div>

            <table className="table-container">
                <thead>
                    <tr>
                        <th onClick={() => sortData('id')} className={getClassNamesFor('id')}>ID</th>
                        <th onClick={() => sortData('productId')} className={getClassNamesFor('productId')}>Product ID</th>
                        <th onClick={() => sortData('vendorId')} className={getClassNamesFor('vendorId')}>Vendor ID</th>
                        <th onClick={() => sortData('quantity')} className={getClassNamesFor('quantity')}>Quantity</th>
                        <th onClick={() => sortData('requestStatus')} className={getClassNamesFor('requestStatus')}>Request Status</th>
                        <th onClick={() => sortData('deliveryStatus')} className={getClassNamesFor('deliveryStatus')}>Delivery Status</th>
                        <th onClick={() => sortData('deliveryDate')} className={getClassNamesFor('deliveryDate')}>Delivery Date</th>
                        <th onClick={() => sortData('updatedAt')} className={getClassNamesFor('updatedAt')}>Updated At</th>
                        <th onClick={() => sortData('createdAt')} className={getClassNamesFor('createdAt')}>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.productId}</td>
                            <td>{item.vendorId}</td>
                            <td>{item.quantity}</td>
                            <td>{item.requestStatus}</td>
                            <td>{item.deliveryStatus}</td>
                            <td>{item.deliveryDate}</td>
                            <td>{new Date(item.updatedAt).toLocaleString()}</td>
                            <td>{new Date(item.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryReport;