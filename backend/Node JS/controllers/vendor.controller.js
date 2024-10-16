var db = require("../models/index");

exports.find = async function (req, res) {
    try {
      console.log("athule");
      const userData = await db.vendor.findAll();
  
      if (userData.length > 0) {
        res
          .status(200)
          .json({ message: "Connection successful", data: userData });
      } else {
        res.status(200).json({ message: "No Data to Retrive", data: [] });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
