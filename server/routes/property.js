var express = require('express');
var router = express.Router();
var propertyController = require('../Controllers/propertyController')

// localhost:4000/property


//localhost:4000/property/createProperty
router.post("/createProperty/:property_address_id/:property_subtype_id/:property_kitchen_id/:property_rent_id", propertyController.createProperty);


module.exports = router;