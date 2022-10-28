var express = require('express');
var router = express.Router();
const { mongoose, usersModel } = require("../dbSchema.js");
const { mongodb, dbName, dbUrl, MongoClient} = require("../dbConfig");
// const { hashPassword, hashCompare, createToken, jwtDecode, validate, roleAdmin } = require("../auth");
mongoose.connect(dbUrl);


/* GET home page. */
router.get('/booking', async (req, res) => {
  let users = await usersModel.find()
  res.send({
    statusCode: 200,
    data: users
  });
});


router.post("/create", async (req, res) => {
  try {
    let user = await usersModel.find({ ticketNumber: req.body.ticketNumber })
    if (user.length) {
      res.send({
        statusCode: 400,
        message: "Ticket already booked"
      })
    }
    else {
      let newUser = await usersModel.create(req.body)
      res.send({
        statusCode: 200,
        message: "Ticket booked Successfully"
      })
    }
  } catch (error) {
    console.log(error)
    res.send({
      statusCode: 200,
      message: "Internal server error",
      error
    })
  }
})


router.post("/newBooking", async (req, res) => {
  try {
    let user = await usersModel.insertOne(req.body)
    if (req.body.bookedStatus) {
      const customer = await usersModel.findOne({ ticketNumber: req.body.ticketNumber });
      customer.ticketBooking.push(req.body.customerName)
      const update = await usersModel.updateOne({ ticketNumber: req.body.ticketNumber }, { $set: { customerName: req.body.customerName } })
      res.send({
        statusCode: 400,
        message: "Booking Successfull"
      })
    }
    else {
      res.send({
        statusCode: 400,
        message: "Booking Failed",
        instruction: "Check ticket exist or not and check the availability"
      })
    }
  } catch (error) {
    console.log(error)
    res.send({
      statusCode: 200,
      message: "Internal server error",
      error
    })
  }
})

router.get('/booked-ticket-details', async (req, res) => {

  const client = await MongoClient.connect(dbUrl);
  try {
    const db = client.db("TicketBooking");
    const user = await db.collection("users").find().toArray();
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.json({ message: "Error Occured in DB" });
  } finally {
    client.close();
  }
});

module.exports = router;
