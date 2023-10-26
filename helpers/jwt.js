var { expressjwt: jwt } = require("express-jwt");


function authJwt() {
    return jwt({
            secret: process.env.JWT_SECRET,
            algorithms: ["HS256"],
            isRevoked: isRevoked
        }).unless({
        path: [
            {
                url: /\/categories(.*)/, methods: ["GET", "OPTIONS"],
                url: /\/products(.*)/, methods: ["GET", "OPTIONS"],
            },
            "/users/login",
            "/users/register"
        ]
    });
}



// (allow only admin user ) 
async function isRevoked(req,token){
  return !token.payload.isAdmin

}


module.exports = authJwt;