var express = require('express');
var router = express.Router();
var adminController = require('../Controllers/adminController')

router.get("/getPropertyTypes", adminController.getPropertyTypes);

module.exports = router;