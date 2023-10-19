const express = require("express");
const server = express();

require("dotenv/config");
const port = process.env.PORT;
const api_url = process.env.API_URL;

// middleware for json 
const bodyParser = require("body-parser");
server.use(bodyParser.json());

// for http request log 
const morgan = require("morgan");
server.use(morgan("tiny"))

// mongoDB database connection with mongoose
const mongoose = require("mongoose");


server.post(api_url+"/products",(req,res)=>{
    let product = req.body;
    console.log(product);
    res.send(product);
});




// connect with database 
mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log("MongoDB Connected!");
}).catch((error)=>{
    console.log(error);
})

server.listen(port,()=>{
    console.log(`server is running http://localhost:${port}${api_url}`);
});