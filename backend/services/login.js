// const bcrypt = require("bcrypt");
// const {genrateToken} = require("../utills/jwt.utills");
// const db = require("../models/index");

// async function login(email, password) {
//     try {
//         const existingUser = await db.user.findOne({email});
//         if(!existingUser){
//             throw new Error("USer Not Found !!!");
//         }
//         const isPasswordValid = bcrypt.compare(password, existingUser.password)
//         if(!isPasswordValid){
//             throw new Error("Incorret Password!!!");
//         }
//         const token = genrateToken(existingUser);
//         return token;
//     } catch (error) {
//         throw new Error("Invalid credentials !!!") 
//     }
// }

// module.exports = {
//     login
// }

const bcrypt = require("bcrypt");
const { generateToken } = require("../utills/jwt.utills");
const db = require("../models/index");

async function login(email, password) {
    try {
        const existingUser = await db.user.findOne({ where: { email } });
        if (!existingUser) {
            throw new Error("User Not Found !!!");
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            throw new Error("Incorrect Password!!!");
        }
        const token = generateToken(existingUser);
        return token;
    } catch (error) {
        throw new Error("Invalid credentials !!!");
    }
}

module.exports = {
    login
};
