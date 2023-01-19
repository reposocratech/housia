var express = require('express');
var router = express.Router();
const userController = require('../Controllers/userController');
<<<<<<< HEAD





/* GET users listing. */

//-- CREATE USER
//localhost:4000/users/createUser
router.post("/createUser", userController.createUser);

//-- LOGIN USER
//localhost:4000/users/login
router.post("/login", userController.loginUser)


//-- ONE USER 
//localhost:4000/users/:user_id
router.get("/:user_id", userController.selectOneUser)

//-- TRAE LA INFO DE UN USER (EDITAR U OTROS)
////localhost:4000/users/editUser/:userId
router.get("/editUser/:user_id", userController.showOneUser)

//-- EDIT USER (meter info nueva)
//localhost:4000/users/editUser/:userId
router.put("/editUser/:user_id", userController.editOneUser)
//----------------------LINEA PARA AÑADIR MULTER A LA RUTA
//router.put("/editUser/:user_id", multerSingle("user"), userController.editOneUser)



// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
=======

/* GET users listing. */
>>>>>>> 88292833a8f1102111f60dd9b35cde94c23c822e

//-- CREATE USER
//localhost:4000/users/createUser
router.post("/createUser", userController.createUser);

//-- LOGIN USER
//localhost:4000/users/login
router.post("/login", userController.loginUser)

//-- ONE USER 
//localhost:4000/users/:user_id
router.get("/:user_id", userController.selectOneUser)

//-- TRAE LA INFO DE UN USER (EDITAR U OTROS)
////localhost:4000/users/editUser/:user_id
router.get("/editUser/:user_id", userController.showOneUser)

//-- EDIT USER (meter info nueva)
//localhost:4000/users/editUser/:user_id
router.put("/editUser/:user_id", userController.editOneUser)
//----------------------LINEA PARA AÑADIR MULTER A LA RUTA
//router.put("/editUser/:user_id", multerSingle("user"), userController.editOneUser)

////rent
//localhost:4000/users/createRent/:property_id
router.post("/createRent/:property_id", userController.createRent);

//localhost:4000/users/editRent/:rent_id
router.put("/editRent/:rent_id", userController.editRent);



module.exports = router;