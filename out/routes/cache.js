"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cache = express_1.Router();
/* GET home page. */
cache.get('/', function (req, res) {
    res.send('List');
});
cache.get('/:id', function (req, res) {
    res.send('Single');
});
cache.post('/:id', function (req, res) {
    res.send('Add new');
});
cache.post('/delete', function (req, res) {
    res.send('Delete all');
});
cache.delete('/:id', function (req, res) {
    res.send('Delete one');
});
exports.default = cache;
//# sourceMappingURL=cache.js.map