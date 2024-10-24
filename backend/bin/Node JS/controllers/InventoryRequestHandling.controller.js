var db = require("../models/index");


//retrive and return all vendorProducts/retive a single vendorProduct'
exports.find = async function (req, res) {
  try {
    console.log("athule");
    const userData = await db.requestedItems.findAll();

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

exports.create = async (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: req.body });
    return;
  }
  const data = req.body;
  try {
    const book = await db.requestedItems.create(data);
    res.send(book);
  } catch (err) {
    res.send(err);
  }
};

exports.findOne = async function (req, res) {
  try {
    console.log("athule");
    const userData = await db.requestedItems.findAll(
      { where: { request_status: 'APPROVED', id: req.param("id") } }
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
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  const id = req.body.id;

  try {
    const num = await db.requestedItems.update(req.body, { where: { id: id } });

    if (num == 1) {
      let tempMsg = "Requested item APPROVED successfully.";
      if (req.body.request_status === "APPROVED") {
        let stockItem = await db.stock.findOne({ where: { id: req.body.product_id } });

        if (stockItem) {
          let data = { quantity: parseInt(stockItem.quantity) + parseInt(req.body.quantity) }
          const updatedNum = await db.stock.update(data, { where: { id: req.body.product_id } });

          if (updatedNum == 1) {
            tempMsg += " | Exiting stock item count was updated successfully.";
          } else {
            tempMsg += ` | Cannot update stock item with id=${req.body.product_id}. Maybe stock item was not found or req.body is empty.`
          }
        } else {
          let stockItem = await db.vendorProduct.findOne({ where: { product_id: req.body.product_id } });
          if (stockItem) {
            let newStockItem = {
              id: stockItem.product_id,
              name: stockItem.product_name,
              brand: stockItem.brand,
              type: stockItem.type,
              color: stockItem.color,
              quantity: req.body.quantity,
              price: stockItem.price,
              vendor_id: stockItem.vendor_id
            };

            await db.stock.create(newStockItem);
            tempMsg += " | Stock item was added successfully.";
          }
        }
      }

      return res.status(200).send({
        message: tempMsg
      });
    } else {
      return res.status(404).send({
        message: `Cannot update request item with id=${id}. Maybe request item was not found or req.body is empty.`
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: "Error updating request item with id=" + id
    });
  }
}
