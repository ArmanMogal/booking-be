const mongoose = require("mongoose");
const validator = require("validator");

var userSchema = new mongoose.Schema({
    ticketNumber: { type: "string", required: true },
    bookedStatus: { type: "string", required: true },
    customerName: { type: "string", require: true },
    startTime: { type: "string", required: true },
    endTime: { type: "string", required: true},
    createdAt: { type: Date, default: Date.now() },
});

let usersModel = mongoose.model("users", userSchema);

module.exports = { mongoose, usersModel };