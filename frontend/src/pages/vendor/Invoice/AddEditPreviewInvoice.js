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
    const [quntity, setQuntity] = React.useState('');
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
            id: (type !== 'add') ? data.id : undefined,
            request_Id: productId,
            total: productName,
            invoiced_date: new Date(),
            due_date: date,
            status: "SENT TO CLIENT",
            // quantity: parseInt(qty),
            // price: parseFloat(price),
            // supplier_id: parseInt(supId)
        }

        handleAddOrEdit(type, data1);
        handleClose();
    }

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        axios.get('http://localhost:9000/api/v1/requested-items').then((res) => {
            console.log(res.data);
            setRequestItems(res.data.data);
        }).catch(err => {
            console.error(err);
        });

       
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:9000/api/v1/requested-items/${requestItemId}`).then((res) => {
            console.log(res.data);
            setQuntity(res.data.data[0].quntity);
            seTtotal(res.data.data[0].quntity * 100);
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
                <DialogTitle>{type === 'add' ? 'Add New Vendor Catalog' : type === 'edit' ? 'Edit Vendor Catalog' : 'Preview Vendor Catalog'}</DialogTitle>
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

                    <TextField id="quntity" label="Quntity" variant="outlined" value={quntity}  disabled={true}  style={{marginBottom:"10px", marginTop:"10px" , borderRadius: "10px"}}/> <br />
                    <TextField id="total" label="Invoice Total" variant="outlined" value={total}  disabled={true} style={{marginBottom:"10px"}}/> <br />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            {/* <DatePicker label="Basic date picker" onChange={(e) => setDate(e.target.value)}/> */}
                            <DatePicker
                                // defaultValue={dayjs('2022-04-17')}
                                label="Controlled picker"
                                value={date}
                                onChange={(newValue) => setDate(newValue)}
                                />
                        </DemoContainer>
                    </LocalizationProvider>
                    {/* <TextField id="Type" label="Type" variant="outlined" value={type1} onChange={(e) => setType1(e.target.value)} disabled={type === 'preview'} /> <br />
                    <TextField id="Quantity" label="Quantity" variant="outlined" value={qty} onChange={(e) => setQty(e.target.value)} disabled={type === 'preview'} /> <br />
                    <TextField id="Price" label="Price" variant="outlined" value={price} onChange={(e) => setPrice(e.target.value)} disabled={type === 'preview'} /> <br />
                    <TextField id="Supplier" label="Supplier" variant="outlined" value={supId} onChange={(e) => setSupId(e.target.value)} disabled={type === 'preview'} /> <br /> */}
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