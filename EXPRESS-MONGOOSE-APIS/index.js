const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const contactRoute = require("./ROUTES/contactRoute")
app.use("/api",contactRoute) 

//connection from mongoode to mongoDB
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/task", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to mongoDB");
  } catch (error) {
    console.log(error);
    process.exit(1); //if has an error we will exit the process
  }
};
connectDB();

const port = 3000;
app.listen(port, () => {
  console.log("Apllication started successfully");
});
