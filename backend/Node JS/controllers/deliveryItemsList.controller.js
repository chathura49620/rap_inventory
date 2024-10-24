var db = require("../models/index");


//retrive and return all vendorProducts/retive a single vendorProduct'
exports.find = async function (req, res) { 
  try {
    const userData = await db.requestedItems.findAll(
      { where: { request_status: 'APPROVED' , id : req.param("id") } }
    );

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


//update a new identify vendorProduct by vendorProduct id
exports.update = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: "Data to update can not be empty" })
  }

  const id = req.body.id;

  // Assuming 'id' and the fields to be updated are in 'req.body'
    db.requestedItems.update(req.body, {
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
