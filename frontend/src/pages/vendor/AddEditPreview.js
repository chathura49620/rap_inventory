import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';


const AddEditPreview = (props) => {
    const { type, open, setOpen, data, handleAddOrEdit, vendors } = props;

    const [productId, setProductId] = React.useState('');
    const [productName, setProductName] = React.useState('');
    const [brand, setBrand] = React.useState('');
    const [color, setColor] = React.useState('');
    const [type1, setType1] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [selectedVendor, setSelectedVendor] = React.useState('');

    React.useEffect(() => {
        if (type !== 'add') {
            setProductId(data.productId);
            setProductName(data.name);
            setBrand(data.brand);
            setColor(data.color);
            setType1(data.type);
            setPrice(data.price);
        } else {
            setProductId('');
            setProductName('');
            setBrand('');
            setColor('');
            setType1('');
            setPrice('');
        }
    }, [data]);

    const handleSubmit = () => {
        let data1 = {
            id: (type !== 'add') ? data.id : undefined,
            productId: productId,
            name: productName,
            brand: brand,
            type: type1,
            color: color,
            price: parseFloat(price),
            vendorId: "J01"
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
                    <TextField id="productId" label="product Id" variant="outlined" value={productId} onChange={(e) => setProductId(e.target.value)} disabled={type === 'preview'} style={{ marginBottom: "10px", marginTop: "10px", borderRadius: "10px" }} /> <br />
                    <TextField id="productId" label="product Name" variant="outlined" value={productName} onChange={(e) => setProductName(e.target.value)} disabled={type === 'preview'} style={{ marginBottom: "10px" }} /> <br />
                    <TextField id="Brand" label="Brand" variant="outlined" value={brand} onChange={(e) => setBrand(e.target.value)} disabled={type === 'preview'} /> <br />
                    <TextField id="Color" label="Color" variant="outlined" value={color} onChange={(e) => setColor(e.target.value)} disabled={type === 'preview'} /> <br />
                    <TextField id="Type" label="Type" variant="outlined" value={type1} onChange={(e) => setType1(e.target.value)} disabled={type === 'preview'} /> <br />
                    <TextField id="Price" label="Price" variant="outlined" value={price} onChange={(e) => setPrice(e.target.value)} disabled={type === 'preview'} /> <br />
                    {/* <FormControl fullWidth disabled={type === 'preview'}>
                        <InputLabel shrink id="vendor-label">Vendor</InputLabel>
                        <Select
                            labelId="vendor-label"
                            id="vendor-select"
                            value={selectedVendor}
                            label="Select Vendor"
                            onChange={handleVendor}
                        >
                            {vendors.map((vendor) => (
                                <MenuItem key={vendor.id} value={vendor.id}>{vendor.firstName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl> */}
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