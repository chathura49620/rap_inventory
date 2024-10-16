const User = require("../models/user.model");
const bcrypt = require("bcrypt");

async function createSuperAdmin(){
    try {
        const existingAdmin = await User.findAll({whrer:{email: "superAdmin@gmail.com"}});
        if (!existingAdmin) {
            const newAdmin = new User({
                f_name: "admin",
                l_name: "admin",
                phone: "000",
                email: "superAdmin@gmail.com",
                address: "address",
                role: "admin",
                password: await bcrypt.hash("superAdmin",10)
            })
            await newAdmin.save();
            console.log("---- Super Admin Created Successfully !!!")
        } else {
            console.log("---- Super Admin Already Exist !!!")
        }
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = createSuperAdmin;