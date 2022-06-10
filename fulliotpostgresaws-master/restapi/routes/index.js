var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('Docker: Mosquitto + PostgreSQL + NodeJS-APIREST + Dashboard');
});

module.exports = router;