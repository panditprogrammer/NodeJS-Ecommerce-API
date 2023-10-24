const expressJwt = require("express-jwt");
require("dotenv/config");



function authJwt(){
    const JWT_SECRET = process.env.JWT_SECRET;
    return({
        JWT_SECRET,
        algorithms: ['HS256']
    })
}

module.exports = authJwt;
