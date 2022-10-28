const mongodb = require("mongodb");
const dbName = "TicketBooking";
const dbUrl = `mongodb+srv://ArmanMogal:Arman009@arman.psqzpfi.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const MongoClient = mongodb.MongoClient;

module.exports = { mongodb, dbName, dbUrl, MongoClient };