const express = require('express');
const route = express.Router()


const contoller = require('../controllers/controller');


//vendorProduct APIs
route.post('/api/v1/vendor-product',contoller.vendorProduct.create);
route.get('/api/v1/vendor-product',contoller.vendorProduct.find);
route.put('/api/v1/vendor-product/',contoller.vendorProduct.update);
route.delete('/api/v1/vendor-product/:id',contoller.vendorProduct.delete);

route.get('/api/v1/vendor', contoller.vendor.find);

//requestedItems APIs
route.get('/api/v1/requested-items',contoller.requestedItems.find);
route.put('/api/v1/requested-items',contoller.requestedItems.update);
route.post('/api/v1/requested-items',contoller.requestedItems.create);
route.get('/api/v1/requested-items/:id',contoller.requestedItems.findOne);

//stock APIs
route.post('/api/v1/stock', contoller.stock.create);
route.get('/api/v1/stock', contoller.stock.find);
route.put('/api/v1/stock/', contoller.stock.update);
route.delete('/api/v1/stock/:id', contoller.stock.delete);

//TRACK DELIVERY APIS
route.get('/api/v1/delivery-items/:id',contoller.deliveryItems.find);
route.put('/api/v1/delivery-items',contoller.deliveryItems.update);

//vendor Invoice APIs
route.post('/api/v1/vendor-invoice',contoller.vendorInvoice.create);
route.get('/api/v1/vendor-invoice',contoller.vendorInvoice.find);
route.put('/api/v1/vendor-invoice/',contoller.vendorInvoice.update);
route.delete('/api/v1/vendor-invoice/:id',contoller.vendorInvoice.delete);
//user APIs
route.post("/api/v1/user", contoller.user.create);
route.get("/api/v1/user", contoller.user.find);
route.put("/api/v1/user/", contoller.user.update);
route.delete("/api/v1/user/:id", contoller.user.delete);

//user APIs
route.post("/api/v1/invitation", contoller.invitation.create);
route.get("/api/v1/invitation", contoller.invitation.find);
route.put("/api/v1/invitation/", contoller.invitation.update);
route.delete("/api/v1/invitation/:id", contoller.invitation.delete);

module.exports = route;