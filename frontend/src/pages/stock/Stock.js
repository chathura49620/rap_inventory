import React, { useEffect, useState } from 'react';
import { Button} from '@mui/material';
import BasicTable from '../common/BasicTable';
import Notifications from './Notifications';
import axios from 'axios';
import AddEditPreview from './AddEditPreview';
import ConfirmDelete from './ConfirmDelete';

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

    const createData2 = (id, header, details, request) => {
        return { id, header, details, request };
    }

    const refreshNotifications = async () => {
        try {
            let tempStocks = [];
            let tempRequests = [];

            const stockResponse = await axios.get('http://localhost:8080/api/v1/stock');
            tempStocks = stockResponse.data.data;
            tempStocks = tempStocks.filter(stock => stock.quantity < 100);

            const requestsResponse = await axios.get('http://localhost:8080/api/v1/requested-items');
            tempRequests = requestsResponse.data.data;
            tempRequests = tempRequests.filter(req => req.request_status.toLowerCase() !== 'requested');

            let tempList = [];
            tempStocks.forEach(stock => {
                tempList.push(createData2(stock.id, `Item #${stock.id} (${stock.name}) requires more stock!`, `Item #${stock.id} (${stock.brand} ${stock.name} ${stock.type}) currently have only ${stock.quantity} stocks.`, true));
            });

            tempRequests.forEach(req => {
                tempList.push(createData2(req.product_id, `Request status of #${req.id}`, `Request for item #${req.product_id} has been ${req.request_status}!`, false));
            });

            setNotifyList(tempList);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
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

                <Notifications list={notifyList} refresh={refreshNotifications} />

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