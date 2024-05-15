var db = require("../models/index");
const { Op } = require('sequelize');

// create and save new customer oder
exports.create = async (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: req.body });
    return;
  }
  const data = req.body;
  try {
    const successOrder = await db.customerOrder.create(data);
    const orderArr = await data.items.map(item => {
      return {
        order_id: successOrder.id,
        stock_id: item.stock_id,
        quantity: item.quantity,
        customer_id: data.customer_id
      }
    })
    const successOrderItems = await db.orderItem.bulkCreate(orderArr);
    await res.send(successOrderItems);
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

exports.trackOrder = async function (req, res) {
  try {
    const id = req.query.id
    const userData = await db.customerOrder.findAll({ where: { id } });

    if (userData.length > 0) {
      res
        .status(200)
        .json({ message: "Successful", data: userData[0] });
    } else {
      res.status(200).json({ message: "No Data to Retrive", data: [] });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getFilteredOrders = async function (req, res) {
  try {
    const orderStatus = req.query.order_status
    const startDate = req.query.start_date
    const endDate = req.query.end_date

    const customerOrders = await db.customerOrder.findAll({
      where: {
        order_status: orderStatus,
        "createdAt": {
          [Op.and]: {
            [Op.gte]: startDate,
            [Op.lte]: endDate
          }
        }
      },
      include: [{
        model: db.orderItem,
        as: 'orderItem',
        include: [{
          model: db.stockView,
          as: 'stockItem',
          attributes: ['name', 'brand', 'type', 'color', 'price'],
        }],
      }],
    });

    if (customerOrders.length > 0) {
      res
        .status(200)
        .json({ message: "Successfull", data: customerOrders });
    } else {
      res.status(200).json({ message: "No Data to Retrive", data: [] });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.updateOrderStatus = async function (req, res) {
  try {
    await db.customerOrder.update({ order_status: 3 }, { where: { id: req.query.id } });
    res
      .status(200)
      .json({ message: "Successfully updated" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
