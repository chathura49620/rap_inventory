import React, { useEffect, useState } from 'react';
import SideNav from '../../../components/vendor/sideNav/Sidebar'
import {Button} from '@mui/material';
import BasicTableInvoice from '../../../components/vendor/BasicTableInvoice';
import axios from 'axios';
import AddEditPreview from './AddEditPreviewInvoice';

const Invoice = () => {
    const [invoice, setInvoice] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [previewType, setPreviewType] = useState([]);
    const [openPreview, setOpenPreview] = useState(false);
    const [previewData, setPreviewData] = useState([]);
    const [refreshTable, setRefreshTable] = useState(false);

    useEffect(() => {
        setHeaders(["ID", "Product Request Id", "Invoice Total", "Invoiced Date", "Due Date", "Status", "Action"]);
    }, []);

    useEffect(() => {
        axios.get('http://localhost:9000/api/v1/vendor-invoice').then((res) => {
            console.log(res.data);
            setInvoice(res.data.data);
        }).catch(err => {
            console.error(err);
        });

    }, [refreshTable]);

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

    const handleAddOrEdit = (type, data) => {
        if (type === 'add') {
            axios.post('http://localhost:9000/api/v1/vendor-invoice', data).then((res) => {
                console.log(res.data);
                setRefreshTable(prev => !prev);
            }).catch(err => {
                console.error(err);
            });
        } else {
            axios.put('http://localhost:9000/api/v1/vendor-invoice', data).then((res) => {
                console.log(res.data);
                setRefreshTable(prev => !prev);
            }).catch(err => {
                console.error(err);
            });
        }
    }


    return (
        <div>
            <SideNav />

            <Button id="add_product_button" style={{ margin: 25, marginBottom: 0 }} onClick={handleAdd}>+ Add New Vendor Invoice</Button>

            <div className='stock-body'>
                
                <BasicTableInvoice
                    headers={headers}
                    rows={invoice}
                    preview={handlePreview}
                    edit={handleEdit}
                />


                <AddEditPreview
                    type={previewType}
                    open={openPreview}
                    setOpen={setOpenPreview}
                    data={previewData}
                    handleAddOrEdit={handleAddOrEdit}
                />

               
            </div>
        </div>
    )
}

export default Invoice;