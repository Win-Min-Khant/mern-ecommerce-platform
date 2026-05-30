"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var cors_1 = require("cors");
var cookie_parser_1 = require("cookie-parser");
var connectDB_js_1 = require("./db/connectDB.js");
// dotenv config
dotenv_1.default.config({
    path: ".env"
});
// create server
var app = (0, express_1.default)();
// middlewares
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use((0, express_1.json)());
app.use((0, cookie_parser_1.default)());
// routes
// connect with db and server
var PORT = process.env.PORT || "8000";
app.listen(PORT, function () {
    (0, connectDB_js_1.connectDB)();
    console.log("Server is running on PORT ".concat(PORT, "."));
});
