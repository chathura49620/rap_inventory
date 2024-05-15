import { useEffect, useState } from 'react';
// import { useGet } from "./../../hooks/useFetch";
import { Button } from '@mui/material';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SendIcon from '@mui/icons-material/Send';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import NumberInput from "../../components/customer/NumberInput";
import IconButton from '@mui/material/IconButton';
import { Delete } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { Container } from '@mui/material';
import Header from '../../components/customer/Header';

const Cart = () => {
    const navigate = useNavigate()
    const lsCartItems = localStorage.getItem('cart-items')
    const [cartItems, setCartItems] = useState([])
    useEffect(() => {
        if (lsCartItems) {
            setCartItems(JSON.parse(lsCartItems))
        }
    }, [])
    if (!lsCartItems) {
        const tempCartItems = [
            {
                id: 1,
                name: 'book',
                price: 300,
                qty: 1,
            },
            {
                id: 2,
                name: 'pen',
                price: 30,
                qty: 3,
            },
            {
                id: 3,
                name: 'envelop',
                price: 5,
                qty: 4,
            }
        ]
        localStorage.setItem('cart-items', JSON.stringify(tempCartItems))
    }

    const changeQty = (item, value) => {
        const cartItemsClone = JSON.parse(JSON.stringify(cartItems))
        const cartItemToBeUpdated = cartItemsClone.find(cartItem => cartItem.id === item.id)
        cartItemToBeUpdated.qty = value
        setCartItems(cartItemsClone)
    }
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.qty), 0);
    const removeItem = (itemId) => {
        const cartItemsClone = JSON.parse(JSON.stringify(cartItems))
        const filteredOutItems = cartItemsClone.filter(cartItem => cartItem.id !== itemId)
        setCartItems(filteredOutItems)
    }
    const removeAll = () => {
        setCartItems([])
    }
    const checkout = () => {
        localStorage.setItem('cart-items', JSON.stringify(cartItems))
        navigate("/billing-info")
    }
    return (
        <>
        <Header />
        <Container maxWidth="md" style={{ marginTop: 20 }}>
            <h1 align="center">My Shopping Cart</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <ListSubheader component="div" id="nested-list-subheader">
                    Shopping Cart
                </ListSubheader>
                <Button variant="text" size="small" color="error" onClick={removeAll}>Remove all</Button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell width="30%">Item&nbsp;Name</TableCell>
                            <TableCell align="right">Price&nbsp;(LKR)</TableCell>
                            <TableCell align="center" width="150px">Quantity</TableCell>
                            <TableCell align="right">Total&nbsp;(LKR)</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cartItems.map(cartItem => (
                            <TableRow key={cartItem.id}>
                                <TableCell component="th" scope="row">{cartItem.name}</TableCell>
                                <TableCell align="right">{cartItem.price}</TableCell>
                                <TableCell align="right">
                                    <div style={{ width: 150 }}>
                                        <NumberInput item={cartItem} value={cartItem.qty} onUpdate={changeQty} min={1} />
                                    </div>
                                </TableCell>
                                <TableCell align="right">
                                    <span>{cartItem.price * cartItem.qty}</span>
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton aria-label="remove" size="small" onClick={() => removeItem(cartItem.id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell component="th" scope="row"></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"><Typography variant="h6" gutterBottom>
                                Sub Total &nbsp;&nbsp;{subtotal}
                            </Typography></TableCell>
                            <TableCell align="right"></TableCell>
                            {/* <TableCell align="right">{(cartItem.price * cartItem.qty)}</TableCell> */}
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row"></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right">
                                <Button variant="contained" size="medium" disabled={cartItems.length === 0} onClick={checkout}>Checkout</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
        </>
    )
}

export default Cart