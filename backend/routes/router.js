const express = require('express');
const route = express.Router()


const contoller = require('../controllers/controller');


//vendorProduct APIs
route.post('/api/v1/vendor-product', contoller.vendorProduct.create);
route.get('/api/v1/vendor-product', contoller.vendorProduct.find);
// route.put('/api/v1/vendor-product/',contoller.vendorProduct.update);
// route.delete('/api/v1/vendor-product/',contoller.vendorProduct.delete);

//stock APIs
route.post('/api/v1/stock', contoller.stock.create);
route.get('/api/v1/stock', contoller.stock.find);
route.put('/api/v1/stock/', contoller.stock.update);
route.delete('/api/v1/stock/:id', contoller.stock.delete);


module.exports = route;