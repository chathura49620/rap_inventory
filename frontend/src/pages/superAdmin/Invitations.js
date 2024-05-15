import React, { useEffect, useState } from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import InvitationBasicTable from '../common/InvitationBasicTable';
//import Notifications from './Notifications';
import axios from 'axios';
import AddEditPreview from './InvitationAddEditPreview';
import ConfirmDelete from './ConfirmDelete';
import SideNav from '../../components/superAdmin/sideNav/Sidebar'

const User = () => {
    const [stocks, setStocks] = useState([]);
    const [headers, setHeaders] = useState([]);
//    const [notifyList, setNotifyList] = useState([]);
    const [previewType, setPreviewType] = useState([]);
    const [openPreview, setOpenPreview] = useState(false);
    const [previewData, setPreviewData] = useState([]);
    const [deleteData, setDeleteData] = useState([]);
    const [refreshTable, setRefreshTable] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [delId, setDelId] = useState();

    useEffect(() => {
        setHeaders(["ID", "Subject", "Message", "Receiver", "Sender", ""]);
        // setNotifyList([
        //     createData2(1, 'Item #2 requires more stock!', 'Item #2 requires more stock!', true),
        //     createData2(2, 'Message from vendor Maliban', ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.', false),
        //     createData2(2, 'New order received #345', ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.', false),
        //     createData2(2, 'Vendor accpted the invitation', ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.', false),
        //     createData2(2, 'Receipt for the purchase order #115515', ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.', false),
        // ]);
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/invitation').then((res) => {
            console.log(res.data);
            setStocks(res?.data?.data);
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
            axios.post('http://localhost:8080/api/v1/invitation', data).then((res) => {
                console.log(res.data);
                setRefreshTable(prev => !prev);
            }).catch(err => {
                console.error(err);
            });
        } else {
            axios.put('http://localhost:8080/api/v1/invitation', data).then((res) => {
                console.log(res.data);
                setRefreshTable(prev => !prev);
            }).catch(err => {
                console.error(err);
            });
        }
    }

    const deleteProduct = () => {
        console.log(delId)
        axios.delete(`http://localhost:8080/api/v1/invitation/${delId}`).then((res) => {
            console.log(res.data);
            setRefreshTable(prev => !prev);
        }).catch(err => {
            console.error(err);
        });
    }

    return (
        <div>
            <SideNav/>
        <div>
            {/* <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        User Management
                    </Typography>
                </Toolbar>
            </AppBar> */}
                <Button style={{ margin: 25, marginBottom: 0 }} onClick={handleAdd}>+ Add New Invitation</Button> 
        <div className='stock-body'>   
                <InvitationBasicTable
                    headers={headers}
                    rows={stocks}
                    preview={handlePreview}
                    edit={handleEdit}
                    deleteFunc={handleDelete}
                />
                {/* <Notifications list={notifyList} /> */}
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
    </div>
    )
}

export default User;