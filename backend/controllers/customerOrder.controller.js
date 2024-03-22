var db = require("../models/index");

// create and save new customer oder
exports.create = async (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: req.body });
    return;
  }
  const data = req.body;
  try {
    const book = await db.customerOrder.create(data);
    res.send(book);
  } catch (err) {
    res.send(err);
  }
};

//retrive and return all vendorProducts/retive a single customer order'
exports.find = async function (req, res) {
  try {
    const userData = await db.customerOrder.findAll();

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
