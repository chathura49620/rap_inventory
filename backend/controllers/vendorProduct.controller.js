var db = require("../models/index");

// create and save new vendorProduct
exports.create = async (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: req.body });
    return;
  }
  const data = req.body;
  try {
    const book = await db.vendorProduct.create(data);
    res.send(book);
  } catch (err) {
    res.send(err);
  }
};

//retrive and return all vendorProducts/retive a single vendorProduct'
exports.find = async function (req, res) {
  try {
    console.log("athule");
    const userData = await db.vendorProduct.findAll();

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
// exports.update = (req,res) => {
//     if(!req.body){
//         return res
//                 .status(400)
//                 .send({message:"Data to update can not be empty"})
//     }

//     const id  = req.body.id;
//     vendorProduct.findByIdAndUpdate(id, req.body,{useFindAndModify:false})
//     .then(data =>{
//         if(!data){
//             res.status(400).send({message:"matirel code id not found"});
//         }else{
//             res.send(data);
//         }
//     })
//     .catch(err =>{
//         res.status(500).send({message:"Error while updateting"})
//     })
// }

//Delete a vendorProduct with specified vendorProduct id in the request
// exports.delete = (req,res) => {
//     const id  = req.body.id;

//     vendorProduct.findByIdAndDelete(id)
//     .then(data=>{
//         if(!data){
//             res.status(400).send({message:`cannot Delete product code with $(id). Maybe product code not found`});
//         }
//         else{
//             res.send({message:"product code was deleted"});
//         }
//     })
//     .catch(err =>{
//         res.status(500).send({message:"Error while Deleting"})
//     })

// }
