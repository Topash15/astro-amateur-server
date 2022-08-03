"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var photos_1 = __importDefault(require("../controllers/photos"));
var router = express_1.default.Router();
router.get('/get/photos', photos_1.default.getAllPhotos);
exports.default = router;
