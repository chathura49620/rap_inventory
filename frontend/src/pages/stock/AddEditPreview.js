import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


const AddEditPreview = (props) => {
    const { type, open, setOpen, data, handleAddOrEdit } = props;

    const [name, setName] = React.useState('');
    const [brand, setBrand] = React.useState('');
    const [color, setColor] = React.useState('');
    const [type1, setType1] = React.useState('');
    const [qty, setQty] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [supId, setSupId] = React.useState('');

    React.useEffect(() => {
        if (type !== 'add') {
            setName(data.name);
            setBrand(data.brand);
            setColor(data.color);
            setType1(data.type);
            setQty(data.quantity);
            setPrice(data.price);
            setSupId(data.supplier_id);
        } else {
            setName('');
            setBrand('');
            setColor('');
            setType1('');
            setQty('');
            setPrice('');
            setSupId('');
        }
    }, [data]);

    const handleSubmit = () => {
        let data1 = {
            id: (type !== 'add') ? data.id : undefined,
            name: name,
            brand: brand,
            type: type1,
            color: color,
            quantity: parseInt(qty),
            price: parseFloat(price),
            supplier_id: parseInt(supId)
        }

        handleAddOrEdit(type, data1);
        handleClose();
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
                <DialogTitle>{type === 'add' ? 'Add New Product' : type === 'edit' ? 'Edit Product' : 'Preview Product'}</DialogTitle>
                <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField id="Name" label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} disabled={type === 'preview'} /> <br />
                    <TextField id="Brand" label="Brand" variant="outlined" value={brand} onChange={(e) => setBrand(e.target.value)} disabled={type === 'preview'} /> <br />
                    <TextField id="Color" label="Color" variant="outlined" value={color} onChange={(e) => setColor(e.target.value)} disabled={type === 'preview'} /> <br />
                    <TextField id="Type" label="Type" variant="outlined" value={type1} onChange={(e) => setType1(e.target.value)} disabled={type === 'preview'} /> <br />
                    <TextField id="Quantity" label="Quantity" variant="outlined" value={qty} onChange={(e) => setQty(e.target.value)} disabled={type === 'preview'} /> <br />
                    <TextField id="Price" label="Price" variant="outlined" value={price} onChange={(e) => setPrice(e.target.value)} disabled={type === 'preview'} /> <br />
                    <TextField id="Supplier" label="Supplier" variant="outlined" value={supId} onChange={(e) => setSupId(e.target.value)} disabled={type === 'preview'} /> <br />
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