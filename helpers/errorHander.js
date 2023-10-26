

function errorHanlder(error, req, res, next) {

    if (error.name === "UnauthorizedError") {
        return res.status(401).json({ success: false, message: "You are not authorized!"});
    }

    return res.send(error);

}

module.exports = errorHanlder;
