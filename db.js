const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://irwantowibowojs:irwantowibowojs@cluster0-shard-00-00.wt5s5.mongodb.net:27017,cluster0-shard-00-01.wt5s5.mongodb.net:27017,cluster0-shard-00-02.wt5s5.mongodb.net:27017/basicpos?ssl=true&replicaSet=atlas-rvam0u-shard-0&authSource=admin&retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

mongoose.connection.on("connected", function () {
  console.log("Mongoose default connection open");
});

mongoose.connection.on("err", function (err) {
  console.log(`Mongoose default connection error ${err}`);
});

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose default connection disconnected");
});

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});
