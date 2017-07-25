var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.send("<< Touchdown server >>");
});

module.exports = router;
