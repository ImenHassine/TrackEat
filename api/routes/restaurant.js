var express = require('express');
var router = express();

router.use(express.static("restaurant"));


module.exports = router;
