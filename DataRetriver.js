const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://root:root@127.0.0.1:27017/customerData?authSource=admin",
  {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
  }
);

var db = mongoose.connection;
db.on("error", error => {
  console.log(error);
});
var schema = mongoose.Schema({
  _id: String,
  RefNo: String,
  ClaimType: String,
  BeginDate: String,
  EndDate: String,
  Units: Number,
  MarkdownAmount: Number,
  Quarter: String,
  Year: Number,
  ItemDesc: String,
  Dept: Number,
  DPCI: String,
  VendorNumber: Number,
  Amount: Number,
  ProbRating: Number,
  Multiplier: String,
  Division: String,
  uploadedBy: String,
  filename: String,
  User: String,
  isCancel: Boolean,
  ViewNo: Number,
  Status: String,
  created_at: String,
  updated_at: String,
  VendorName: String,
  __v: Number,
  ProofType: String,
  isQuarterClosed: Boolean
});
var data = mongoose.model("data", schema, "user");
var aggData = data.aggregate(
  [
    {
      $match: { RefNo: { $ne: null } }
    },
    {
      $group: {
        _id: "$RefNo",
        dpcis: { $push: "$DPCI" },
        itemDes: { $push: "$ItemDesc" },
        beginDates: { $push: "$BeginDate" },
        endingDates: { $push: "$EndDate" },
        units: { $push: "$Units" },
        amounts: { $push: "$Amount" }
      }
    }
  ],
  (error, results) => {
    console.log(results);
  }
);
//module.exports =  data.find({}).limit(10000).cursor() ;
