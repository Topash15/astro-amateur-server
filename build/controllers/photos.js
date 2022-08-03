"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = require("../config/mysql");
var getAllPhotos = function (req, res, next) {
    console.log("Getting books");
    var query = "SELECT * FROM photos";
    (0, mysql_1.Connect)()
        .then(function (connection) {
        (0, mysql_1.Query)(connection, query)
            .then(function (results) {
            return res.status(200).json({
                results: results,
            });
        })
            .catch(function (error) {
            console.log(error);
            return res.status(500).json({
                message: error.message,
                error: error,
            });
        })
            .finally(function () {
            connection.end;
        });
    })
        .catch(function (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            error: error,
        });
    });
};
exports.default = { getAllPhotos: getAllPhotos };
