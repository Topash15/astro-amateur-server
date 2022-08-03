"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var http_1 = __importDefault(require("http"));
// import cors from 'cors';
var config_1 = __importDefault(require("./config/config"));
var photos_1 = __importDefault(require("./routes/photos"));
var NAMESPACE = 'Server';
var router = (0, express_1.default)();
/** Log the request */
router.use(function (req, res, next) {
    /** Log the req */
    console.log(NAMESPACE, "METHOD: [".concat(req.method, "] - URL: [").concat(req.url, "] - IP: [").concat(req.socket.remoteAddress, "]"));
    res.on('finish', function () {
        /** Log the res */
        console.log(NAMESPACE, "METHOD: [".concat(req.method, "] - URL: [").concat(req.url, "] - STATUS: [").concat(res.statusCode, "] - IP: [").concat(req.socket.remoteAddress, "]"));
    });
    next();
});
/** Parse the body of the request */
router.use(body_parser_1.default.urlencoded({ extended: true }));
router.use(body_parser_1.default.json());
/** Rules of our API */
router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    return next();
});
/** Routes go here */
router.use('/api/portfolio', photos_1.default);
/** Error handling */
router.use(function (req, res, next) {
    var error = new Error('Not found');
    res.status(404).json({
        message: error.message,
    });
});
var httpServer = http_1.default.createServer(router);
httpServer.listen(config_1.default.server.port, function () {
    return console.log(NAMESPACE, "Server is running ".concat(config_1.default.server.hostname, ":").concat(config_1.default.server.port));
});
// const connection = mysql.createConnection({
//   host: 'sql740.main-hosting.eu',
//   user: 'u791833797_topash15',
//   password: 'Cardinals285004!',
//   database: 'u791833797_astroAmateur',
// });
// connection.connect();
// console.log('connection successful!');
// const app = express()
//   .use(cors())
//   .use(bodyParser.json())
//   .use(routes.createRouter(connection));
// const port = process.env.PORT || 8080;
// console.log(module.exports);
// app.listen(port, () => {
//   console.log(`Express server listening on port ${port}`);
// });
