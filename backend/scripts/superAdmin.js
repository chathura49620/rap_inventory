const User = require("../models/user.model");
var db = require("../models/index");
const bcrypt = require("bcrypt");

async function createSuperAdmin(){
    try {
        const existingAdmin = await db.user.findAll({where:{email: "superAdmin@gmail.com"}});
        if (!existingAdmin) {
            const newAdmin = await db.user.create({
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