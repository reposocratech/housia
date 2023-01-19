var express = require('express');
var router = express.Router();
const userController = require('../Controllers/userController');





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

module.exports = router;
