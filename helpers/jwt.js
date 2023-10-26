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



async function isRevoked(req,payload){
    // (allow only admin user not customer )
    console.log(payload);
    return payload.isAdmin;

}


module.exports = authJwt;