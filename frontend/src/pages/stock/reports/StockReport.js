import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './report.css';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Button } from '@mui/material';

const StockReport = () => {
    const [data, setData] = useState([]);
    const [sortConfig, setSortConfig] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/stock");
                const result = response.data.data;
                setData(result);
            } catch (error) {
                console.error("Error fetching the stock data", error);
            }
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
                <h2>Stock Report</h2>&nbsp;&nbsp;
                <Button className='print-btn' onClick={() => window.print()}><PictureAsPdfIcon /></Button>
            </div>

            <table className="table-container">
                <thead>
                    <tr>
                        <th onClick={() => sortData('id')} className={getClassNamesFor('id')}>ID</th>
                        <th onClick={() => sortData('name')} className={getClassNamesFor('name')}>Name</th>
                        <th onClick={() => sortData('brand')} className={getClassNamesFor('brand')}>Brand</th>
                        <th onClick={() => sortData('type')} className={getClassNamesFor('type')}>Type</th>
                        <th onClick={() => sortData('color')} className={getClassNamesFor('color')}>Color</th>
                        <th onClick={() => sortData('quantity')} className={getClassNamesFor('quantity')}>Quantity</th>
                        <th onClick={() => sortData('price')} className={getClassNamesFor('price')}>Price</th>
                        <th onClick={() => sortData('vendorId')} className={getClassNamesFor('vendorId')}>Vendor ID</th>
                        <th onClick={() => sortData('updatedAt')} className={getClassNamesFor('updatedAt')}>Updated At</th>
                        <th onClick={() => sortData('createdAt')} className={getClassNamesFor('createdAt')}>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.brand}</td>
                            <td>{item.type}</td>
                            <td>{item.color}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>{item.vendorId}</td>
                            <td>{new Date(item.updatedAt).toLocaleString()}</td>
                            <td>{new Date(item.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StockReport;
