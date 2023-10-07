const { rateLimit } = require("express-rate-limit")

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 15 minutes
    limit: 50, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {message:'Too many requests from this IP, please try again after some time'},
    // store: ... , // Use an external store for more precise rate limiting
})

module.exports = { limiter }