const express = require("express");
const server = express();

require("dotenv/config");
const port = process.env.PORT;
const api_url = process.env.API_URL;

// ==================== Middlewares ==========================

// middleware for json 
const bodyParser = require("body-parser");
server.use(bodyParser.json());

// for http request log 
const morgan = require("morgan");
server.use(morgan("tiny"))


// product router 
const productRouter = require("./routers/products");
server.use("/products",productRouter);

// category router 
const categoryRouter = require("./routers/categories");
server.use("/categories", categoryRouter);


// ==================== Middlewares ends ==========================





// mongoDB database connection with mongoose
const mongoose = require("mongoose");

// connect with database 
mongoose.connect(process.env.CONNECTION_STRING, {
    dbName: "nodeapidb"
})
    .then(() => {
        console.log("MongoDB Connected!");
    }).catch((error) => {
        console.log(error);
    })

server.listen(port, () => {
    console.log(`server is running http://localhost:${port}${api_url}`);
});