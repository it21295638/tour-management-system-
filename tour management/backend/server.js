const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();
const bodyParser = require("body-parser")

app.use(express.static('public'));
app.use(cors());
// app.use(bodyParser.json());
app.use(express.json({limit: "30mb",extended:true}));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

const TourRouter = require("./routes/TourRouter");

const URL = process.env.MONGODB_URL;

//connect to database url with the given options
mongoose.connect(URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

//database connection
const connection = mongoose.connection;
connection.once("open", function() {
    console.log("db connection success");
}); 

//when http://localhost:8080/tour ran it will execute TourRouter.js file
app.use("/tour", TourRouter);
//defining a port to run the application
//use port 8070 or use any other port if the 8070 is unavailable 
const PORT = process.env.PORT || 8080;

//running the app in previously defined port
const server = app.listen(PORT,() =>{
    console.log(`Server is up and running on: ${PORT}`);
})

//if the server crashed show it simply and stop the server
process.on("unhandledRejection", (error, promise) => {
    console.log(`Logged error: ${error}`);
    server.close(() => process.exit(1));
})
