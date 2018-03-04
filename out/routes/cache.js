"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mongoose = require("mongoose");
var uuid = require("uuid/v4");
var Cache = mongoose.model('Cache');
var cache = express_1.Router();
var generateHash = function (key) {
    return {
        key: key || uuid(),
        data: uuid()
    };
};
var toResponse = function (cache) {
    console.log('cache 17', cache);
    return {
        key: cache.key,
        data: cache.data
    };
};
/* GET home page. */
cache.get('/', function (req, res) {
    Cache.find({})
        .select({ _id: 0, __v: 0, createdAt: 0 })
        .then(function (caches) { return res.send(caches); })
        .catch(function (err) {
        res.status(500);
        return res.send('Internal server error');
    });
});
cache.get('/:key', function (req, res) {
    var key = req.params.key;
    Cache.findOne({ key: key })
        .then(function (cache) {
        if (cache) {
            console.log('Cache hit', cache);
            return res.send(cache.data);
        }
        else {
            console.log('Cache miss');
            return Cache.create(generateHash(key));
        }
    })
        .then(function (cache) {
        if (cache instanceof Cache) {
            res.status(201);
            return res.send(cache.data);
        }
    })
        .catch(function (err) {
        res.status(500);
        return res.send("Error \"" + err.message + "\" occurred");
    });
});
cache.post('/', function (req, res) {
    var key = req.body.key;
    var data = req.body.data;
    if (!key || !data) {
        res.status(400);
        return res.send('Invalid request, please specify valid `key` and `data`');
    }
    var cache = new Cache();
    cache.key = key;
    cache.data = data;
    cache.save()
        .then(function () {
        res.send(toResponse(cache));
    })
        .catch(function (err) {
        res.status(500);
        res.send("Error \"" + err.message + "\" occurred");
    });
});
cache.put('/:key', function (req, res) {
    var key = req.params.key;
    var data = req.body.data;
    Cache.update({ key: key }, { $set: { key: key, data: data } })
        .then(function (updated) {
        if (updated.nModified) {
            return res.status(200).end();
        }
        else {
            res.status(404);
            return res.send('Cache not found');
        }
    })
        .catch(function (err) {
        res.status(500);
        return res.send("Error \"" + err.message + "\" occurred");
    });
});
cache.post('/delete', function (req, res) {
    Cache.remove({})
        .then(function () {
        return res.end();
    })
        .catch(function () {
        res.status(500);
        return res.send('Internal server error');
    });
});
cache.delete('/:key', function (req, res) {
    Cache.remove({})
        .then(function () { return res.end(); })
        .catch(function () {
        res.status(500);
        return res.send('Internal server error');
    });
});
exports.default = cache;
//# sourceMappingURL=cache.js.map