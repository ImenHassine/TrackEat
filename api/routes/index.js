var express = require('express');
var router = express();

router.use(express.static("public"));


module.exports = router;
