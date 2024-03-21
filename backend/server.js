const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
var Sequelize = require("sequelize");
const { dbConfig } = require("./models/index");

const app = express();
// app.use(dbConfig)
app.use(cors({
  origin: 'http://localhost:3000'
}));
// app.use (cors(corsOptons));

// parse requests of content-type - application/json
app.use(Sequelize);
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", require("./routes/router"));

//simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to easyInventory.com" });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('Server is running on port $(PORT).');
});