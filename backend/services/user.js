const User = require("../models/user.model")
const bcrypt = require("bcrypt");

async function createUser(userData){
    const {f_name, l_name, phone, email, address, role, password} = userData;
    const hashPassword = await bcrypt.hash(password, 10);
    const createduser = new User({
        f_name,
        l_name,
        phone,
        email,
        address,
        role,
        hashPassword
    });

    const savedUser = await createduser.save();
    return savedUser;
}
module.exports = {createUser}