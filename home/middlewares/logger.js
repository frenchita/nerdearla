const logger = (req, res, next) => {
    console.log(`Logger: ${req.originalUrl}:${res.statusCode}`)
    next();
};

module.exports = logger;