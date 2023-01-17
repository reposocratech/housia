var express = require('express');
var router = express.Router();
var adminController = require('../Controllers/adminController')

// localhost:4000/admin

//localhost:4000/admin/getPropertyTypes
router.get("/getPropertyTypes", adminController.getPropertyTypes);

//localhost:4000/admin/createPropertyType
router.post("/createPropertyType", adminController.createPropertyType);

//localhost:4000/admin/editPropertyType/:type_id
router.put("/editPropertyType/:type_id", adminController.editPropertyType);

//localhost:4000/admin/deletePropertyType/:type_id
router.delete("/deletePropertyType/:type_id", adminController.deletePropertyType);

module.exports = router;