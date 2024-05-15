var db = require("../models/index");

// create and save new user
exports.create = async (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: req.body });
    return;
  }
  const data = req.body;
  try {
    const book = await db.user.create(data);
    res.send(book);
  } catch (err) {
    res.send(err);
  }
};

//retrive and return all 
exports.find = async function (req, res) {
  try {
    const userData = await db.user.findAll();
console.log("this is find")
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

//update a new identify user by user id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  const id = req.body.id;

  // Assuming 'id' and the fields to be updated are in 'req.body'
  db.user
    .update(req.body, {
      where: { id: id },
    })
    .then((num) => {
      // 'num' is the number of affected rows
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating user with id=" + id,
      });
    });
};

//Delete a user with specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  db.user
    .destroy({
      where: {
        id: id, // Replace 'yourIdVariable' with the actual ID you want to delete
      },
    })
    .then((data) => {
      if (!data) {
        res
          .status(400)
          .send({
            message: `cannot Delete user code with $(id). Maybe user code not found`,
          });
      } else {
        res.send({ message: "user code was deleted" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};
