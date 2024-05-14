const express = require('express');
const route = express.Router()


const contoller = require('../controllers/controller');


//vendorProduct APIs
route.post('/api/v1/vendor-product',contoller.vendorProduct.create);
route.get('/api/v1/vendor-product',contoller.vendorProduct.find);
route.put('/api/v1/vendor-product/',contoller.vendorProduct.update);
route.delete('/api/v1/vendor-product/:id',contoller.vendorProduct.delete);


//requestedItems APIs
route.get('/api/v1/requested-items',contoller.requestedItems.find);
route.put('/api/v1/requested-items',contoller.requestedItems.update);
route.get('/api/v1/requested-items/:id',contoller.requestedItems.findOne);

//TRACK DELIVERY APIS
route.get('/api/v1/delivery-items/:id',contoller.deliveryItems.find);
route.put('/api/v1/delivery-items',contoller.deliveryItems.update);

//vendor Invoice APIs
route.post('/api/v1/vendor-invoice',contoller.vendorInvoice.create);
route.get('/api/v1/vendor-invoice',contoller.vendorInvoice.find);
route.put('/api/v1/vendor-invoice/',contoller.vendorInvoice.update);
route.delete('/api/v1/vendor-invoice/:id',contoller.vendorInvoice.delete);


module.exports = route;