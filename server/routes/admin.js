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


//SUBTYPE

//localhost:4000/admin/getPropertySubTypes/subtype_type_id
router.get("/getPropertySubTypes/:subtype_type_id", adminController.getPropertySubTypes);


//localhost:4000/admin/createPropertySubType/:subtype_type_id
router.post("/createPropertySubType/:subtype_type_id", adminController.createPropertySubType);


//localhost:4000/admin/editPropertySubType/subtype_id
router.put("/editPropertySubType/:subtype_id", adminController.editPropertySubType);


//localhost:4000/admin/deletePropertySubType/:subtype_id
router.delete("/deletePropertySubType/:subtype_id", adminController.deletePropertySubType);



module.exports = router;