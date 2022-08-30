const rateLimit = require('express-rate-limit');

const limitUserRequests = rateLimit(
    {
        windowMs: 1000 * 60 * 60 * process.env.WINDOW_LOG_INTERVAL_IN_HOURS,
        max: process.env.MAX_WINDOW_REQUEST_COUNT,
        message: `You have exceeded the ${process.env.MAXIMUM_REQUESTS} requests per ${process.env.WINDOW_LOG_INTERVAL_IN_HOURS} hours limit`,
        standardHeaders: true,
        legacyHeaders: false
    }
);

module.exports = {limitUserRequests};