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





































////features
//localhost:4000/admin/getPropertyFeatures
router.get("/getPropertyFeatures", adminController.getPropertyFeatures
);

//localhost:4000/admin/createPropertyFeatures
router.post("/createPropertyFeatures", adminController.createPropertyFeatures);

//localhost:4000/admin/editPropertyFeature/:feature_id
router.put("/editPropertyFeature/:feature_id", adminController.editPropertyFeature);

//localhost:4000/admin/deletePropertyFeature/:feature_id
router.delete("/deletePropertyFeature/:feature_id", adminController.deletePropertyFeature);


module.exports = router;