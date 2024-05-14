const express = require('express');
const route = express.Router()


const contoller = require('../controllers/controller');


//vendorProduct APIs
route.post('/api/v1/vendor-product', contoller.vendorProduct.create);
route.get('/api/v1/vendor-product', contoller.vendorProduct.find);
// route.put('/api/v1/vendor-product/',contoller.vendorProduct.update);
// route.delete('/api/v1/vendor-product/',contoller.vendorProduct.delete);
route.post('/api/v1/customer', contoller.customer.create);
route.get('/api/v1/customer', contoller.customer.findOne);
route.get('/api/v1/customers', contoller.customer.find);
route.post('/api/v1/customer-order', contoller.customerOrder.create);
route.get('/api/v1/customer-order', contoller.customerOrder.find);
route.get('/api/v1/track-order', contoller.customerOrder.trackOrder);
route.patch('/api/v1/mark-order-as-complete', contoller.customerOrder.updateOrderStatus);
route.post('/api/v1/stocks', contoller.stockView.create);
route.get('/api/v1/stocks', contoller.stockView.find);



module.exports = route;