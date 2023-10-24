

function errorHanlder(error, req, res, next) {

    if (error.name === "UnauthorizedError") {
        return res.status(401).json({ success: false, message: "You are not authorized!"});
    }

    if (error.name === "ValidationError") {
        return res.status(401).json({ success: false, error: error });
    }

    return res.status(500).json({success: false,message: "Something went wrong!"});

}

module.exports = errorHanlder;
