const express = require('express');
const route = express.Router()


const contoller = require('../controllers/controller');


//vendorProduct APIs
route.post('/api/v1/vendor-product',contoller.vendorProduct.create);
route.get('/api/v1/vendor-product',contoller.vendorProduct.find);
// route.put('/api/v1/vendor-product/',contoller.vendorProduct.update);
// route.delete('/api/v1/vendor-product/',contoller.vendorProduct.delete);



module.exports = route;