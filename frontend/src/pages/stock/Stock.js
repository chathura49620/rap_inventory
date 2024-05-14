import React, { useEffect, useState } from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import BasicTable from '../common/BasicTable';
import Notifications from './Notifications';
import axios from 'axios';
import AddEditPreview from './AddEditPreview';
import ConfirmDelete from './ConfirmDelete';
// import Sidebar from '../common/Sidebar';

const Stock = () => {
    const [stocks, setStocks] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [notifyList, setNotifyList] = useState([]);
    const [previewType, setPreviewType] = useState([]);
    const [openPreview, setOpenPreview] = useState(false);
    const [previewData, setPreviewData] = useState([]);
    const [deleteData, setDeleteData] = useState([]);
    const [refreshTable, setRefreshTable] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [delId, setDelId] = useState();

    useEffect(() => {
        setHeaders(["ID", "Name", "Brand", "Color", "Type", "Quantity", "Price", "Supplier ID", ""]);

        setNotifyList([
            createData2(1, 'Item #2 requires more stock!', 'Item #2 requires more stock!', true),
            createData2(2, 'Message from vendor Maliban', ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.', false),
            createData2(2, 'New order received #345', ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.', false),
            createData2(2, 'Vendor accpted the invitation', ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.', false),
            createData2(2, 'Receipt for the purchase order #115515', ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.', false),
        ]);
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/stock').then((res) => {
            console.log(res.data);
            setStocks(res.data.data);
        }).catch(err => {
            console.error(err);
        });

        setDelId();
    }, [refreshTable]);

    // function createData(id, name, brand, color, type, quantity, price, supplier_id) {
    //     return { id, name, brand, color, type, quantity, price, supplier_id };
    // }

    function createData2(id, header, details, request) {
        return { id, header, details, request };
    }

    const handleAdd = () => {
        setPreviewType('add')
        setOpenPreview(true);
        setPreviewData();
    };

    const handlePreview = (data) => {
        setPreviewType('preview')
        setOpenPreview(true);
        setPreviewData(data);
    };

    const handleEdit = (data) => {
        setPreviewType('edit')
        setOpenPreview(true);
        setPreviewData(data);
    };

    const handleDelete = (row) => {
        setDelId(row.id);
        setDeleteOpen(true);
        setDeleteData(row);
    };

    const handleAddOrEdit = (type, data) => {
        if (type === 'add') {
            axios.post('http://localhost:8080/api/v1/stock', data).then((res) => {
                console.log(res.data);
                setRefreshTable(prev => !prev);
            }).catch(err => {
                console.error(err);
            });
        } else {
            axios.put('http://localhost:8080/api/v1/stock', data).then((res) => {
                console.log(res.data);
                setRefreshTable(prev => !prev);
            }).catch(err => {
                console.error(err);
            });
        }
    }

    const deleteProduct = () => {
        console.log(delId)
        axios.delete(`http://localhost:8080/api/v1/stock/${delId}`).then((res) => {
            console.log(res.data);
            setRefreshTable(prev => !prev);
        }).catch(err => {
            console.error(err);
        });
    }

    return (
        <div>
            {/* <Sidebar /> */}
            {/* <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Stock Management
                    </Typography>
                </Toolbar>
            </AppBar> */}

            <div className='add-new-stock'>
                <Button onClick={handleAdd}>+ Add New Product</Button>
            </div>

            <div className='stock-body'>
                <BasicTable
                    headers={headers}
                    rows={stocks}
                    preview={handlePreview}
                    edit={handleEdit}
                    deleteFunc={handleDelete}
                />

                <Notifications list={notifyList} />

                <AddEditPreview
                    type={previewType}
                    open={openPreview}
                    setOpen={setOpenPreview}
                    data={previewData}
                    handleAddOrEdit={handleAddOrEdit}
                />

                <ConfirmDelete
                    open={deleteOpen}
                    setOpen={setDeleteOpen}
                    delete1={deleteProduct}
                    data={deleteData}
                />
            </div>
        </div>
    )
}

export default Stock;