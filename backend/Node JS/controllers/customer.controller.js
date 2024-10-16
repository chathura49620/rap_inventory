var db = require("../models/index");

// create and save new customer
exports.create = async (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: req.body });
    return;
  }
  const data = req.body;
  try {
    const book = await db.customer.create(data);
    res.send(book);
  } catch (err) {
    res.send(err);
  }
};

//retrive and return all customers/retive a single customer'
exports.find = async function (req, res) {
  try {
    const userData = await db.customer.findAll();

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

//retrive and return all customers/retive a single customer'
exports.findOne = async function (req, res) {
  try {
    const id = req.query.id
    const userData = await db.customer.findAll({ where: { id } })

    if (userData.length > 0) {
      res
        .status(200)
        .json({ message: "Connection successful", data: userData[0] });
    } else {
      res.status(200).json({ message: "No Data to Retrive", data: [] });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
