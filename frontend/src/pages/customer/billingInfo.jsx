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
import ListSubheader from '@mui/material/ListSubheader';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { useGet } from "./../../hooks/useFetch";
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';

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
  const { data: currentUserData, fetchData } = useGet();
  const currentUserId = 1
  useEffect(() => {
    fetchData(`customer?id=${currentUserId}`)
  }, [])

  const [currentUser, setCurrentUser] = useState([]);
  useEffect(() => {
    if (currentUserData) {
      setCurrentUser(currentUserData.data)
    }
  }, [currentUserData])

  // const billingInfo = fetchData(data.data);
  return (
    <>
      {/* <h1 style={{ textAlign: 'left', marginLeft: '5px' }}>Order Confirmation</h1> */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ListSubheader component="div" id="nested-list-subheader">
          <h1>Order Confirmation</h1>
        </ListSubheader>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p>Order Total:&nbsp;<b>400(LKR)&nbsp;&nbsp;</b></p>
          <Button variant="contained" size="small">Place Order</Button>
        </div>
      </div>
      {/* <Card sx={{ minWidth: 275, maxWidth: 400, marginLeft: '20px'}}> */}
      <Box sx={{ minWidth: 275, maxWidth: 1000, marginLeft: '20px' }}>
        {/* {billings.map(billing => ( */}
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {/* {(customers || []).map((customer) => {
          return (
          <Grid item xs={6}>
            <Item><p>Your Informationssssssssssssssssssssss</p></Item>
          </Grid>
          <Grid item xs={6}>
            <Item>Shipping Address</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>Payment</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>Billing Address</Item>
          </Grid>
         })} </Grid> */}
            <Grid item xs={6}>
              <Item><p>Your Information</p>
                <h6>{currentUser.first_name}&nbsp;{currentUser.last_name}</h6>
                <h6>{currentUser.email}</h6>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>Shipping Address
              <h6>              
                <TextField
                  required
                  id="outlined-required"
                  value={currentUser.shipping_address}
                /></h6>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>Payment
              <h6></h6>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>Billing Address
              <h6><TextField
                required
                id="outlined-required"
                value={currentUser.billing_address}
              /></h6>
              </Item>
            </Grid>
          </Grid>
        {/* ))} */}
      </Box>
    </>
  );
}
export default BillingInfo