const express = require("express");
const server = express();

require("dotenv/config");
const port = process.env.PORT;
const api_url = process.env.API_URL;

// middleware for json 
const bodyParser = require("body-parser");
server.use(bodyParser.json());



server.post(api_url+"/products",(req,res)=>{
    let product = req.body;
    console.log(product);
    res.send(product);
});





server.listen(port,()=>{
    console.log(`server is running http://localhost:${port}${api_url}`);
});