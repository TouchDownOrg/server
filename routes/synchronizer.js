var express = require('express');
var router = express.Router();
var details = require('../details/Details');
var descriptors = require('../descriptors/Descriptor');

function parseDate(stringDate) {
    var dateObj = new Date(stringDate); //if the date in format of yyyy-MM-HHThh:mm:ss.xxxZ
    if (isNaN(dateObj.valueOf())) { //if the date in format of int
        dateObj = new Date(parseInt(stringDate));
    }
    return isNaN(dateObj.valueOf()) ? undefined : dateObj;
}

router.get('/details/:date', function (req, res, next) {
    var stringDate = req.params.date;
    var dateObj = parseDate(stringDate);

    if (!dateObj) {
        return next(new Error("Couldn't parse date from request parameter: " + stringDate));
    }

    details.find({
        creation_date: {$gt: dateObj}
    }).exec(function (err, details) {
        if (err) {
            next(err);
        } else {
            res.send(details);
        }
    });
});


router.get('/descriptors/:date', function (req, res, next) {
    var stringDate = req.params.date;
    var dateObj = parseDate(stringDate);

    if (!dateObj) {
        return next(new Error("Couldn't parse date from request parameter: " + stringDate));
    }

    descriptors.find({
        creation_date: {$gt: dateObj}
    }).exec(function (err, details) {
        if (err) {
            next(err);
        } else {
            res.send(details);
        }
    });
});

module.exports = router;
