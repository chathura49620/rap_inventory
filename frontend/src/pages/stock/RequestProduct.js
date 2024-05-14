import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const RequestProduct = () => {
    const query = useQuery();
    const id = query.get('id');

    const [selectedVendor, setSelectedVendor] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(0);

    const [vendorList, setVendorList] = useState([]);
    const [vendorProducts, setVendorProducts] = useState([]);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/vendor').then((res) => {
            // console.log(res.data);
            setVendorList(res.data.data);
        }).catch(err => {
            console.error(err);
        });

        axios.get('http://localhost:8080/api/v1/vendor-product').then((res) => {
            // console.log(res.data);
            setVendorProducts(res.data.data);
        }).catch(err => {
            console.error(err);
        });
    }, []);

    useEffect(() => {
        if (vendorProducts?.length > 0 && id) {
            setSelectedVendor(vendorProducts.find((product) => product.id === parseInt(id)).vendor_id);
            setTimeout(() => { setSelectedProduct(id); }, 250);
        }
    }, [vendorProducts]);

    const handleVendor = (event) => {
        setSelectedVendor(event.target.value);
        const products = vendorProducts.filter((product) => product.vendor_id === event.target.value);
        setProductList(products);
    }

    const handleProduct = (event) => {
        setSelectedProduct(event.target.value);
    }

    const requestProduct = () => {
        console.log(selectedVendor, selectedProduct, quantity);

        let obj = {
            "product_id": selectedProduct,
            "vendor_id": selectedVendor,
            "quntity": quantity,
            "request_status": "REQUESTED",
            "delivery_status": "NULL",
            "delivery_date": "NULL"
        }

        axios.post('http://localhost:8080/api/v1/requested-items', obj).then((res) => {
            console.log(res.data);
        }).catch(err => {
            console.error(err);
        });
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <FormControl style={{ width: 250, margin: 10 }}>
                <InputLabel id="vendor-label">Vendor</InputLabel>
                <Select
                    labelId="vendor-label"
                    id="vendor-select"
                    value={selectedVendor}
                    label="Select Vendor"
                    onChange={handleVendor}
                >
                    {vendorList.map((vendor) => (
                        <MenuItem key={vendor.id} value={vendor.id}>{vendor.first_name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl style={{ width: 250, margin: 10 }}>
                <InputLabel id="product-label">Product</InputLabel>
                <Select
                    labelId="product-label"
                    id="product-select"
                    value={selectedProduct}
                    label="Select Product"
                    onChange={handleProduct}
                    disabled={!selectedVendor} // Disable until a vendor is selected
                >
                    {productList.map((product) => (
                        <MenuItem key={product.id} value={product.id}>{product.product_name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField style={{ width: 250, margin: 10 }} id="qty" type='number' label="Quantity" variant="outlined" value={quantity} onChange={(e) => setQuantity(e.target.value)} />

            <Button style={{ margin: 10 }} variant="contained" color="primary" onClick={requestProduct}>Request</Button>
        </div>
    );
}

export default RequestProduct;
