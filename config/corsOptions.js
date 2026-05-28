const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    /* callback is a function that is called when the request is made & sended by the express server */
    origin: (origin, callback) => {
        /* !origin means the request is from the same origin [In Development] */
        if (allowedOrigins.includes(origin) || !origin) { 
            callback(null, true); // null means no error
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,  // allow credentials (cookies, authorization headers, etc.) to be sent
    optionsSuccessStatus: 200
};

module.exports = corsOptions;
