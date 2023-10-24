var { expressjwt: jwt } = require("express-jwt");


function authJwt(){
    return jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] });
}


module.exports = authJwt;