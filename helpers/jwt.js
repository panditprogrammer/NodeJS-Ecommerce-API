var { expressjwt: jwt } = require("express-jwt");


function authJwt(){
    return jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }).unless({
        path: [
            "/users/login",
            "/users/register"
        ]
    });
}


module.exports = authJwt;