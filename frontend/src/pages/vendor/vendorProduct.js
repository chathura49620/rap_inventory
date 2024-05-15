import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import BasicTable from '../../components/vendor/BasicTable';
import axios from 'axios';
import AddEditPreview from './AddEditPreview';
import ConfirmDelete from './ConfirmDelete';
import SideNav from '../../components/vendor/sideNav/Sidebar'

const VendorProduct = () => {
    const [stocks, setStocks] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [previewType, setPreviewType] = useState([]);
    const [openPreview, setOpenPreview] = useState(false);
    const [previewData, setPreviewData] = useState([]);
    const [deleteData, setDeleteData] = useState([]);
    const [refreshTable, setRefreshTable] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [delId, setDelId] = useState();
    const [vendorList, setVendorList] = useState([]);

    useEffect(() => {
        setHeaders(["ID", "Product Id", "Product Name", "Brand", "Color", "Type", "Vendor", "Action"]);

        axios.get('http://localhost:8080/api/v1/vendor').then((res) => {
            setVendorList(res.data.data);
        }).catch(err => {
            console.error(err);
        });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/vendor-product').then((res) => {
            console.log(res.data);
            setStocks(res.data.data);
        }).catch(err => {
            console.error(err);
        });

        setDelId();
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

    const handleDelete = (row) => {
        setDelId(row.id);
        setDeleteOpen(true);
        setDeleteData(row);
    };

    const handleAddOrEdit = (type, data) => {
        if (type === 'add') {
            axios.post('http://localhost:8080/api/v1/vendor-product', data).then((res) => {
                console.log(res.data);
                setRefreshTable(prev => !prev);
            }).catch(err => {
                console.error(err);
            });
        } else {
            axios.put('http://localhost:8080/api/v1/vendor-product', data).then((res) => {
                console.log(res.data);
                setRefreshTable(prev => !prev);
            }).catch(err => {
                console.error(err);
            });
        }
    }

    const deleteProduct = () => {
        console.log(delId)
        axios.delete(`http://localhost:8080/api/v1/vendor-product/${delId}`).then((res) => {
            console.log(res.data);
            setRefreshTable(prev => !prev);
        }).catch(err => {
            console.error(err);
        });
    }

    return (
        <div>
            <SideNav />

            <Button id="add_product_button" style={{ margin: 25, marginBottom: 0 }} onClick={handleAdd}>+ Add New Vendor Catalog</Button>

            <div className='stock-body'>

                <BasicTable
                    headers={headers}
                    rows={stocks}
                    preview={handlePreview}
                    edit={handleEdit}
                    deleteFunc={handleDelete}
                />

                <AddEditPreview
                    type={previewType}
                    open={openPreview}
                    setOpen={setOpenPreview}
                    data={previewData}
                    handleAddOrEdit={handleAddOrEdit}
                    vendors={vendorList}
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

export default VendorProduct;