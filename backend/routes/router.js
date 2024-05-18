const express = require('express');
const route = express.Router()


const contoller = require('../controllers/controller');
//const authMiddleware = require("../utills/auth.middleware")

//vendorProduct APIs
route.post('/api/v1/vendor-product',contoller.vendorProduct.create);
route.get('/api/v1/vendor-product',contoller.vendorProduct.find);
// route.put('/api/v1/vendor-product/',contoller.vendorProduct.update);
// route.delete('/api/v1/vendor-product/',contoller.vendorProduct.delete);

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

//login
//route.post("/login", contoller.login.login);
//route.get("/users", authMiddleware.authMiddleware,contoller.user.getUsers);

module.exports = route;