import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

const AddEditPreviewInvoice = (props) => {
    const { type, open, setOpen, data, handleAddOrEdit } = props;

    const [productId, setProductId] = React.useState('');
    const [productName, setProductName] = React.useState('');
    const [description, setProductDescription] = React.useState('');
    const [quantity, setQuantity] = React.useState('');
    const [total, seTtotal] = React.useState('');
    const [type1, setType1] = React.useState('');
    const [date, setDate] = React.useState(dayjs('2022-04-17'));
    const [requestItemId, setRequestItemId] = React.useState('');
    const [requestItems, setRequestItems] = useState([]);



    React.useEffect(() => {
        if (type !== 'add') {
            setProductId(data.product_id);
            setProductName(data.product_name);
            setProductDescription(data.description);
            setType1(data.type);
            // setQty(data.quantity);
            // setPrice(data.price);
            // setSupId(data.supplier_id);
        } else {
            setProductId('');
            setProductName('');
            setProductDescription('');
            setType1('');
            // setQty('');
            // setPrice('');
            // setSupId('');
        }
    }, [data]);

    const handleSubmit = () => {
        let data1 = {
            id: (type !== 'add') ? data.id : Math.floor((Math.random() * 10) + 11),
            requestId: requestItemId,
            total: total,
            invoicedDate: new Date(),
            dueDate: date,
            status: "SENT TO CLIENT",
        }

        handleAddOrEdit(type, data1);
        handleClose();
    }

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/request-vendor').then((res) => {
            console.log(res.data);
            setRequestItems(res.data);
        }).catch(err => {
            console.error(err);
        });


    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/request-vendor/${requestItemId}`).then((res) => { 
            setRequestItemId(requestItemId);
            setQuantity(res.data.data[0].quantity);
            seTtotal(res.data.data[0].quantity * 100);
        }).catch(err => {
            console.error(err);
        });


    }, [requestItemId]);



    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        width: '40%'
                    }
                }}
            >
                <DialogTitle>{type === 'add' ? 'Add New Invoice' : type === 'edit' ? 'Edit Invoice' : 'Preview Invoice'}</DialogTitle>
                <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>

                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={requestItemId}
                        label="Age"
                        onChange={(e) => setRequestItemId(e.target.value)}
                    >
                        {requestItems.map((row) => (
                            <MenuItem value={row.id}>REQ- {row.id}</MenuItem>
                        ))}
                    </Select>

                    <TextField id="quantity" label="quantity" variant="outlined" value={quantity} onChange={(e) => setQuantity(e.target.value)}  style={{ marginBottom: "10px", marginTop: "10px", borderRadius: "10px" }} /> <br />
                    <TextField id="total" label="Invoice Total" variant="outlined" value={total} onChange={(e) => seTtotal(e.target.value)}  style={{ marginBottom: "10px" }} /> <br />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                label="Controlled picker"
                                value={date}
                                onChange={(newValue) => setDate(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    {type !== 'preview' &&
                        <Button onClick={handleSubmit}>{type === 'add' ? 'Add' : 'Edit'}</Button>
                    }
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default AddEditPreviewInvoice;