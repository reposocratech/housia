var express = require('express');
var router = express.Router();
var adminController = require('../Controllers/adminController')

// localhost:4000/admin

// Property types
//localhost:4000/admin/getPropertyTypes
router.get("/getPropertyTypes", adminController.getPropertyTypes);

//localhost:4000/admin/createPropertyType
router.post("/createPropertyType", adminController.createPropertyType);

//localhost:4000/admin/editPropertyType/:type_id
router.put("/editPropertyType/:type_id", adminController.editPropertyType);

//localhost:4000/admin/deletePropertyType/:type_id
router.delete("/deletePropertyType/:type_id", adminController.deletePropertyType);



// Kitchen types
//localhost:4000/admin/getKitchenTypes
router.get("/getKitchenTypes", adminController.getKitchenTypes);

//localhost:4000/admin/createKitchenType
router.post("/createKitchenType", adminController.createKitchenType);

//localhost:4000/admin/editKitchenType/:kitchen_id
router.put("/editKitchenType/:kitchen_id", adminController.editKitchenType);

//localhost:4000/admin/deleteKitchenType/:kitchen_id
router.delete("/deleteKitchenType/:kitchen_id", adminController.deleteKitchenType);

module.exports = router;