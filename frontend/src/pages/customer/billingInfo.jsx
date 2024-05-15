// import ListSubheader from '@mui/material/ListSubheader';
// const BillingInfo = () => {
//   return (
//       <>
//           <h1 align="center">Billing info</h1>
//       </>
//   )
// }

// export default BillingInfo

import * as React from 'react';
import { useState } from "react";
import { Box, Grid, TextField, Paper, Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { useGet, usePost } from "./../../hooks/useFetch";
import MinHeightTextarea from "./../../components/customer/TextareaInput"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const BillingInfo = () => {
  const navigate = useNavigate()
  const { data: currentUserData, fetchData: fetchCustomer } = useGet();
  const { data: customerOrderResponse, postData: postCustomerOrder } = usePost();
  const currentUserId = 1
  useEffect(() => {
    fetchCustomer(`customer?id=${currentUserId}`)
  }, [])

  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    if (currentUserData) {
      setCurrentUser(currentUserData.data)
    }
  }, [currentUserData])

  const lsCartItems = localStorage.getItem('cart-items')
  const [cartItems, setCartItems] = useState([])
  useEffect(() => {
    if (lsCartItems) {
      setCartItems(JSON.parse(lsCartItems))
    }
  }, [])
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.qty), 0)

  const orderObject = {
    items: cartItems.map(item => {
      return {
        stock_id: item.id,
        quantity: item.qty,
      }
    }),
    customer_id: currentUserId
  }
  const onPlaceOrder = () => {
    postCustomerOrder('customer-order', orderObject)
    setTimeout(() => {
      navigate("/view-Stock")
    }, 500);
  }
  useEffect(() => {
    if (customerOrderResponse?.length > 0) {
      const notifications = JSON.parse(localStorage.getItem('notifications')) || []
      const orderId = customerOrderResponse[0].order_id
      const notification = {
        id: Date.now(),
        title: 'Your order has been placed',
        description: `Order #${orderId} can be tracked here`,
        url: `tracking?id=${orderId}`
      }
      notifications.push(notification)
      localStorage.setItem('notifications', JSON.stringify(notifications))
    }
  }, [customerOrderResponse])

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, marginTop: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ width: 24, height: 24, marginRight: 1 }} onClick={() => navigate("/cart")}>
            <ArrowBackIcon />
          </Avatar>
          <Typography gutterBottom variant="h5" style={{ display: 'flex', alignContent: 'center', margin: 0, marginRight: 16 }}>
            Order Confirmation
          </Typography>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography gutterBottom variant="p" style={{ margin: 0, marginRight: 16 }}>
            Order Total
          </Typography>
          <Typography gutterBottom variant="h6" style={{ margin: 0, marginRight: 16 }}>
            <b>{subtotal} LKR</b>
          </Typography>
          <Button variant="contained" color="success" size="small" onClick={onPlaceOrder}>Place Order</Button>
        </div>
      </div>

      <Paper style={{ padding: 16 }}>
        <Grid container>
          <Grid xs={6}>
            <Box component="section" sx={{ padding: 1 }}>
              <Typography gutterBottom variant="h6">
                Your information
              </Typography>

              <div style={{ display: 'flex' }}>
                <TextField style={{ marginRight: 16 }} label="First name" variant="standard" InputLabelProps={{ shrink: true }} value={currentUser.first_name} />
                <TextField style={{ marginRight: 16 }} label="Last name" variant="standard" InputLabelProps={{ shrink: true }} value={currentUser.last_name} />
                <TextField style={{ marginRight: 16 }} label="Email" variant="standard" InputLabelProps={{ shrink: true }} value={currentUser.email} />
              </div>
            </Box>
            <Box component="section" sx={{ padding: 1 }}>
              <Typography gutterBottom variant="h6">
                Payment
              </Typography>
              <Button variant="outlined" size="small">
                VISA
              </Button>
              <p style={{ margin: 0 }}>
                <small>Visa card ending is **** 1234</small>
              </p>
            </Box>
          </Grid>
          <Grid xs={6}>
            <Box component="section" sx={{ padding: 1 }}>
              <Typography gutterBottom variant="h6">
                Shipping address
              </Typography>

              <MinHeightTextarea defaultValue={currentUser.shipping_address} />
            </Box>
            <Box component="section" sx={{ padding: 1 }}>
              <Typography gutterBottom variant="h6">
                Billing address
              </Typography>

              <MinHeightTextarea defaultValue={currentUser.billing_address} />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
export default BillingInfo