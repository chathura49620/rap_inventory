const jwt = require("jsonwebtoken");
const secretKey = require("../config/jwt.config");

function authToken(req, res, next){
    const authHeader = req.header("Authontication");
    if(!authHeader){
        return res.status(401).json({message: "Unauthrized: missing token !!!"})
    }
    const [bearer, token] = authHeader.split("");
    if(bearer !== "Bearer" || !token) {
        return res.status(401).json({message: "Unauthrized: invalid token format !!!"})
    }
    jwt.verify(token, secretKey, (err, user) => {
        if(err){
            return res.status(403).json({message:"forbidden: Invalid token"})
        }
        req.user = user;
        next();
    })
}

module.exports = {authToken}