const express = require("express");
const server = express();

require("dotenv/config");
const port = process.env.PORT;


server.get("/",(req,res)=>{
    res.send("Hello World");
});

server.listen(port,()=>{
    console.log(`server is running http://localhost:${port}`);
});