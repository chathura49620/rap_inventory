import * as React from 'react';
import { useState } from "react";
import { Box, Stepper, Step, StepLabel, TextField, Button, Avatar } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useGet, usePatch } from "./../../hooks/useFetch";
import { useSearchParams } from "react-router-dom";
import Header from '../../components/customer/Header';
import { Container } from '@mui/material';

const steps = [
  'Order Pending',
  'Order Deliver',
  'Order Completed',
];

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const Tracking = () => {
  const { fetchData: fetchCustomer } = useGet();
  const { isPending: isMarkingAsComplete, postData: postMarkAsComplete } = usePatch();
  const { fetchData: fetchTrackOrder, isPending: isTracking, data: trackedOrder } = useGet();
  const currentUserId = 1
  const [queryParameters] = useSearchParams()
  const trackingIdParam = queryParameters.get("id")
  useEffect(() => {
    fetchCustomer(`customer?id=${currentUserId}`)
    if (trackingIdParam) {
      setTrackingNumber(trackingIdParam)
      onTrackOrder(trackingIdParam)
    }
  }, [])

  const [trackingNumber, setTrackingNumber] = useState();
  const onTrackOrder = (id) => {
    fetchTrackOrder(`customer-order/track-order?id=${id || trackingNumber}`)
  }
  const onMarkAsComplete = () => {
    postMarkAsComplete(`customer-order/update-status?id=${trackedOrder?.data?.id}`).then(() => {
      onTrackOrder()
    })
  }

  return (
    <>
    <Header />
    <Container maxWidth="md" style={{ marginTop: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, marginTop: 32 }}>
        <Typography gutterBottom variant="h3" style={{ display: 'flex', alignContent: 'center', margin: 0, marginRight: 16 }}>
          Order Tracking
        </Typography>
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32, marginTop: 32 }}>
          <TextField id="outlined-basic" variant="outlined" size="small" value={trackingNumber} onChange={e => setTrackingNumber(e.target.value)} />
          <Button variant="contained" color="success" size="large" disabled={!!!trackingNumber} style={{ marginLeft: 32 }} onClick={() => onTrackOrder()}>{isTracking ? 'Tracking...' : 'Track order'}</Button>
          {trackedOrder?.data?.order_status == 2 && <Button variant="outlined" size="large" style={{ marginLeft: 32 }} onClick={() => onMarkAsComplete()}>{isMarkingAsComplete ? 'Completing...' : 'Mark as complete'}</Button>}
        </div>
      </div>
      {!isTracking && trackedOrder?.data.id ?
        <Box>
          <Stepper activeStep={trackedOrder.data.order_status} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        : null}
      {!isTracking && trackedOrder?.data?.length === 0 ? <p>No tracking details available for this tracking number</p> : null}
      </Container>
    </>
  );
}
export default Tracking