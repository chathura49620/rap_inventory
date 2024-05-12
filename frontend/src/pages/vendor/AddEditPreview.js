import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


const AddEditPreview = (props) => {
    const { type, open, setOpen, data, handleAddOrEdit } = props;

    const [productId, setProductId] = React.useState('');
    const [productName, setProductName] = React.useState('');
    const [description, setProductDescription] = React.useState('');
    const [type1, setType1] = React.useState('');
    // const [qty, setQty] = React.useState('');
    // const [price, setPrice] = React.useState('');
    // const [supId, setSupId] = React.useState('');

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
            product_id: productId,
            product_name: productName,
            type: type1,
            description: description,
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
                    <TextField id="productId" label="product Id" variant="outlined" value={productId} onChange={(e) => setProductId(e.target.value)} disabled={type === 'preview'}  style={{marginBottom:"10px", marginTop:"10px" , borderRadius: "10px"}}/> <br />
                    <TextField id="productId" label="product Name" variant="outlined" value={productName} onChange={(e) => setProductName(e.target.value)} disabled={type === 'preview'} style={{marginBottom:"10px"}}/> <br />
                    <TextField id="description" label="Description" variant="outlined" value={description} onChange={(e) => setProductDescription(e.target.value)} disabled={type === 'preview'} style={{marginBottom:"5px"}}/> <br />
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

export default AddEditPreview;