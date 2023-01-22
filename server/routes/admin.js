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



//SUBTYPE

//localhost:4000/admin/getPropertySubTypes/subtype_type_id
router.get("/getPropertySubTypes/:subtype_type_id", adminController.getPropertySubTypes);

//localhost:4000/admin/createPropertySubType/:subtype_type_id
router.post("/createPropertySubType/:subtype_type_id", adminController.createPropertySubType);

//localhost:4000/admin/editPropertySubType/subtype_id
router.put("/editPropertySubType/:subtype_id", adminController.editPropertySubType);


//localhost:4000/admin/deletePropertySubType/:subtype_id
router.delete("/deletePropertySubType/:subtype_id", adminController.deletePropertySubType);


// Kitchen types

//localhost:4000/admin/getKitchenTypes
router.get("/getKitchenTypes", adminController.getKitchenTypes);

//localhost:4000/admin/createKitchenType
router.post("/createKitchenType", adminController.createKitchenType);

//localhost:4000/admin/editKitchenType/:kitchen_id
router.put("/editKitchenType/:kitchen_id", adminController.editKitchenType);

//localhost:4000/admin/deleteKitchenType/:kitchen_id
router.delete("/deleteKitchenType/:kitchen_id", adminController.deleteKitchenType);




//features

//localhost:4000/admin/getPropertyFeatures
router.get("/getPropertyFeatures", adminController.getPropertyFeatures
);

//localhost:4000/admin/createPropertyFeatures
router.post("/createPropertyFeatures", adminController.createPropertyFeatures);

//localhost:4000/admin/editPropertyFeature/:feature_id
router.put("/editPropertyFeature/:feature_id", adminController.editPropertyFeature);

//localhost:4000/admin/deletePropertyFeature/:feature_id
router.delete("/deletePropertyFeature/:feature_id", adminController.deletePropertyFeature);


//Borra de manera lógica un ACTIVO(propiedad)
//localhost:4000/admin/logicDeletedAdminProperty/:property_id
router.put("/logicDeletedAdminProperty/:property_id",adminController.logicDeletedAdminProperty);

//Bloquea para el usuario un Activo (admin lo bloquea)
//localhost:4000/admin/blockProperty/:property_id
router.put("/blockProperty/:property_id", adminController.blockProperty)

//DESbloquea para el usuario un Activo (admin lo libera)
//localhost:4000/admin/unBlockProperty/:property_id
router.put("/unBlockProperty/:property_id", adminController.unblockProperty)


//METODO GET para mostrar todos los activos de la plataforma al admin
////localhost:4000/admin/allProperties
router.get("/allProperties", adminController.showAdminAllProperties);


module.exports = router;