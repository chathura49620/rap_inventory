import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';


const AddEditPreview = (props) => {
    const { type, open, setOpen, data, handleAddOrEdit, vendors, isNameExists } = props;

    const [name, setName] = React.useState('');
    const [brand, setBrand] = React.useState('');
    const [color, setColor] = React.useState('');
    const [type1, setType1] = React.useState('');
    const [qty, setQty] = React.useState(0);
    const [price, setPrice] = React.useState(0);
    const [selectedVendor, setSelectedVendor] = React.useState('');

    React.useEffect(() => {
        if (type !== 'add') {
            setName(data.name);
            setBrand(data.brand);
            setColor(data.color);
            setType1(data.type);
            setQty(data.quantity);
            setPrice(data.price);
            setSelectedVendor(data.vendorId);
        } else {
            setName('');
            setBrand('');
            setColor('');
            setType1('');
            setQty(0);
            setPrice(0);
            setSelectedVendor('');
        }
    }, [data]);

    const handleSubmit = () => {
        if (name === '' || brand === '' || color === '' || type1 === '' || selectedVendor === '') {
            toast.error('Please fill all the fields');
            return;
        }

        if (type == 'add' && isNameExists(name)) {
            toast.error('Name exists already');
            return;
        }

        if (qty <= 0) {
            toast.error('Quantity should be greater than 0');
            return;
        }

        if (price <= 0) {
            toast.error('Price should be greater than 0');
            return;
        }

        let data1 = {
            id: (type !== 'add') ? data.id : undefined,
            name: name,
            brand: brand,
            type: type1,
            color: color,
            quantity: parseInt(qty),
            price: parseFloat(price),
            vendorId: selectedVendor
        }

        handleAddOrEdit(type, data1);
        handleClose();
    }

    const handleVendor = (event) => {
        setSelectedVendor(event.target.value);
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <ToastContainer />
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        width: '40%'
                    }
                }}
            >
                <DialogTitle>{type === 'add' ? 'Add New Product' : type === 'edit' ? 'Edit Product' : 'Preview Product'}</DialogTitle>
                <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField id="Name" label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} disabled={type === 'preview'} /> <br />
                    <TextField id="Brand" label="Brand" variant="outlined" value={brand} onChange={(e) => setBrand(e.target.value)} disabled={type === 'preview'} /> <br />
                    <TextField id="Color" label="Color" variant="outlined" value={color} onChange={(e) => setColor(e.target.value)} disabled={type === 'preview'} /> <br />
                    <TextField id="Type" label="Type" variant="outlined" value={type1} onChange={(e) => setType1(e.target.value)} disabled={type === 'preview'} /> <br />
                    <TextField id="Quantity" label="Quantity" type='number' variant="outlined" value={qty} onChange={(e) => setQty(e.target.value)} disabled={type === 'preview'} /> <br />
                    <TextField id="Price" label="Price" type='number' variant="outlined" value={price} onChange={(e) => setPrice(e.target.value)} disabled={type === 'preview'} /> <br />
                    <FormControl fullWidth disabled={type === 'preview'}>
                        <InputLabel shrink id="vendor-label">Vendor</InputLabel>
                        <Select
                            labelId="vendor-label"
                            id="vendor-select"
                            value={selectedVendor || ''}
                            label="Select Vendor"
                            onChange={handleVendor}
                        >
                            {vendors.map((vendor) => (
                                <MenuItem key={vendor.id} value={vendor.id}>{vendor.firstName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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

export default AddEditPreview;