const express = require("express");
const server = express();
const port = 3000;


server.get("/",(req,res)=>{
    res.send("Hello World");
});

server.listen(port,()=>{
    console.log(`server is running http://localhost:${port}`);
});