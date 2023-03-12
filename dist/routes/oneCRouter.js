"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.oneCRouter = void 0;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
exports.oneCRouter = express_1.default.Router();
var jsonParser = body_parser_1.default.json();
exports.oneCRouter.route('ifsum')
    .get(function (req, res) {
    res.send({ response: 'It`s works!' });
})
    .post(jsonParser, function (req, res) {
});
//# sourceMappingURL=oneCRouter.js.map