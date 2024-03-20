import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import BasicTable from '../common/BasicTable';
import Notifications from './Notifications';

const Stock = () => {
    const [stocks, setStocks] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [notifyList, setNotifyList] = useState([]);

    useEffect(() => {
        setHeaders(["ID", "Name", "Brand", "Color", "Type", "Quantity", "Price", "Supplier ID", ""]);
        setStocks([
            createData(1, 'Chooty', 'Atlas', 'Red', 'Pen', 500, 50.0, 1234),
            createData(2, 'Chooty', 'Atlas', 'Blue', 'Pen', 500, 50.0, 1234),
            createData(3, 'Chooty', 'Atlas', 'Black', 'Pen', 500, 50.0, 1234),
            createData(4, 'Chooty', 'Atlas', 'Grey', 'Pen', 500, 50.0, 1234),
            createData(5, 'Chooty', 'Atlas', 'Green', 'Pen', 500, 50.0, 1234),
        ]);

        setNotifyList([
            createData2(1, 'Item #2 requires more stock!', 'Item #2 requires more stock!', true),
            createData2(2, 'Lorem Ipsum', ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.', false),
            createData2(2, 'Lorem Ipsum', ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.', false),
            createData2(2, 'Lorem Ipsum', ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.', false),
            createData2(2, 'Lorem Ipsum', ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.', false),
        ]);
    }, []);

    function createData(id, name, brand, color, type, quantity, price, supplier_id) {
        return { id, name, brand, color, type, quantity, price, supplier_id };
    }

    function createData2(id, header, details, request) {
        return { id, header, details, request };
    }

    const handlePreview = () => {
        console.log('Preview action');
    };

    const handleEdit = () => {
        console.log('Edit action');
    };

    const handleDelete = () => {
        console.log('Delete action');
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Stock Management
                    </Typography>
                </Toolbar>
            </AppBar>

            <div className='stock-body'>
                <BasicTable headers={headers} rows={stocks} preview={handlePreview} edit={handleEdit} deleteFunc={handleDelete} />

                <Notifications list={notifyList} />
            </div>
        </div>
    )
}

export default Stock;