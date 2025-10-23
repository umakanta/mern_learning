const errorHandler = (err, req, res, next) => {
    res.status(res.statusCode || 404).json({
        message: "Error handler: " + err.message
    });
};

module.exports = errorHandler;