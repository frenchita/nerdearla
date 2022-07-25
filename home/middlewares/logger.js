const logger = (req, res, next) => {
    console.log(`Logger: ${req.originalUrl}`)
    next();
};

module.exports = logger;