var db = require("../models/index");
var nodemailer = require('nodemailer');

// create and save new vendorInvoice
exports.create = async (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: req.body });
    return;
  }
  const data = req.body;
  try {
    const book = await db.vendorInvoice.create(data);
    res.send(book);
  } catch (err) {
    res.send(err);
  }
};

//retrive and return all vendorInvoices/retive a single vendorInvoice'
exports.find = async function (req, res) {
  try {
    console.log("athule");
    let userData = null;
    if(req.query.status == "SENT TO CLIENT"){
      userData = await db.vendorInvoice.findAll(
        { where: { status: 'SENT TO CLIENT'} }
      );
    }else if(req.query.status == "PAYMENT DONE"){
      userData = await db.vendorInvoice.findAll(
        { where: { status: 'PAYMENT DONE'} }
      );
    }else{
      userData =  await db.vendorInvoice.findAll();
    }
    

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


//update a new identify vendorInvoice by vendorInvoice id
exports.update = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: "Data to update can not be empty" })
  }

  const id = req.body.id;

  // Assuming 'id' and the fields to be updated are in 'req.body'
    db.vendorInvoice.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        // 'num' is the number of affected rows
        if (num == 1) {
          res.send({
            message: "Stock item was updated successfully."
          });
        } else {
          res.status(404).send({
            message: `Cannot update stock item with id=${id}. Maybe stock item was not found or req.body is empty.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating stock item with id=" + id
        });
      });
}

//Delete a vendorInvoice with specified vendorInvoice id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  db.vendorInvoice.destroy({
    where: {
      id: id // Replace 'yourIdVariable' with the actual ID you want to delete
    }
  })
    .then(data => {
      if (!data) {
        res.status(400).send({ message: `cannot Delete product code with $(id). Maybe product code not found` });
      }
      else {
        res.send({ message: "product code was deleted" });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err })
    })
}
