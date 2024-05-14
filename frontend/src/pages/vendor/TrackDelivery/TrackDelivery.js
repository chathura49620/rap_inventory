import React, { useEffect, useState } from "react";
import SideNav from "../../../components/vendor/sideNav/Sidebar";
import axios from "axios";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const steps = ["Pending Delivery", "On Going Delivery", "Delivery Completed"];

const TrackDelivery = () => {
  const [trackId, setTrackId] = useState([]);
  const [deliveryItems, setDeliveryItemData] = useState([]);

  

  const handleSubmit = () => {
    axios
    .get(`http://localhost:9000/api/v1/delivery-items/${trackId}`)
    .then((res) => {
      console.log(res.data);
      setDeliveryItemData(res.data.data);
    })
    .catch((err) => {
      console.error(err);
    });
  }

  const handleOnGoingDeliveryChange = (trackId) => {
    let data = {
      id: trackId,
      delivery_status: "ON GOING DELIVERY"
    }
    axios.put('http://localhost:9000/api/v1/delivery-items', data).then((res) => {
        console.log(res.data);
        window.location.reload();
    }).catch(err => {
        console.error(err);
    });
  }

  const handleDeliveryCompleteChange = (trackId) => {
    let data = {
      id: trackId,
      delivery_status: "DELIVERY COMPLETED"
    }
    axios.put('http://localhost:9000/api/v1/delivery-items', data).then((res) => {
        console.log(res.data);
        window.location.reload();
    }).catch(err => {
        console.error(err);
    });
  }

 

  return (
    <div>
      <SideNav />
      <div className="stock-body mt-5" style={{ display: "block" }}>
        <center>
        <h1 className="ml-3">Track Delivery</h1>
        <br />
        <br />
        <br />

        <TextField id="productId" label="product Id" variant="outlined" value={trackId} onChange={(e) => setTrackId(e.target.value)}  style={{marginBottom:"10px", marginTop:"10px" , borderRadius: "10px"}}/>     
        <Button onClick={handleSubmit}>Track</Button>

        {deliveryItems.length > 0 ? 
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={
            deliveryItems[0]?.delivery_status === 'PENDING' ? 0 : 
            deliveryItems[0]?.delivery_status === 'ON GOING DELIVERY' ? 1 :
            deliveryItems[0]?.delivery_status === 'DELIVERY COMPLETED' ? 2 : 0
            } alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
          : ""}
         { deliveryItems[0]?.delivery_status  === 'PENDING' ?
          <Button variant="success" onClick={() => handleOnGoingDeliveryChange(trackId)}>Change to On Going Delivery</Button> : 
          deliveryItems[0]?.delivery_status  === 'ON GOING DELIVERY' ?
          <Button variant="success" onClick={() => handleDeliveryCompleteChange(trackId)}>Change to Delivery Completed</Button> : "" }
        </center>
      </div>
    </div>
  );
};

export default TrackDelivery;
