const connection = require("../config/db.js");

class userController {

//--    CREAR USUARIO
//localhost:4000/users/createUser

createUser = (req, res) =>{
    const { name, lastname, email, password, promotional_code} = req.body;
    console.log(promotional_code, "esto es el promotional code")

    let rondasSeguridad = 8;

    let sqlBcrypt = ``;
    if(promotional_code != ""){
        sqlBcrypt = `INSERT INTO user (user_name, user_lastname, user_code, user_email, user_password) VALUES ('${name}','${lastname}','${promotional_code}', '${email}', '${password}')`;
    } else {
        sqlBcrypt = `INSERT INTO user (user_name, user_lastname, user_email, user_password) VALUES ('${name}','${lastname}', '${email}', '${password}')`;
            }

    connection.query(sqlBcrypt, (error, loginResult)=>{
        console.log(error);

        error ? res.status(500).json("Ha habido un error en register") 
        : res.status(200).json(loginResult); 

        console.log(loginResult);
    })

    //TODO LO RELATIVO A BCRYPT CUANDO LO INTEGREMOS

    // bcrypt.generarEncript(rondasSeguridad, function(errorBcryp, rondasSeguridad) {
    //     bcrypt.hash(password, rondasSeguridad, function (err, hash){

    //         let sqlBcrypt = "";

    //         if(promotional_code != ""){
    //              sqlBcrypt = `INSERT INTO user (user_name, user_lastname, user_code, user_email, user_password) VALUES ('${name}','${lastname}','${promotional_code}', '${email}' '${hash}')`;
    //         } else {
    //              sqlBcrypt = `INSERT INTO user (user_name, user_lastname, user_email, user_password) VALUES ('${name}','${lastname}', '${email}', '${hash}')`;
    //         }

    //         connection.query(sqlBcrypt, (error, loginResult) =>{
    //             console.log(error);
    //         error
    //          ? res.status(500).json( "ha habido un error" )
    //          : res.status(200).json(loginResult);
    //         });
    //     }); 
    // });
}


// LOGIN USER
//localhost:4000/users/login 

loginUser =(req, res)=>{

    let {email, password} = req.body;

    let sql = `SELECT * FROM user WHERE user_email = '${email}' and user_is_deleted = false`;

    connection.query(sql, (error, result) =>{
        if(error) return res.status(404).json(error);

        if(!result || !result.length){
            res.status(401).json("Usuario sin cuenta activa");
        } else {

            //METODO PARA BCRYPT CUANDO LO IMPLEMENTEMOS

            // const [user] = result;
            // const hash = user.user_password;

            // const userId = user.user_id;


            // bcrypt.compare(password, hash, (error, response) => {
            //     if (error) throw error;
            //     //si las contraseñas coinciden
            //     if (response === true) {
            //       const token = jwt.sign(
            //         {
            //           user: {
            //             email: user.user_email,
            //             name: user.user_name,
            //             lastname: user.user_lastname,
            //             id: userId,
            //             type: user.user_type
            //           },
            //         },
            //         process.env.SECRET,
            //         { expiresIn: "7d" }
            //       );
            //       res.status(200).json({ token });
            //       //si las contraseñas coinciden
            //     } else {
            //       res.status(401).json("Usuario y contraseña incorrectos");
            //     }
            //   });

            res.status(200).json(result)
        }

    })

}


// GET DE UN SOLO USER (devuelve los datos de un usuario tras loguearse)
//localhost:4000/users/:id
selectOneUser =(req, res)=>{

    const userId = req.params.user_id;

    let sqlUser = `SELECT * FROM user WHERE user_id = ${userId} and user_is_deleted = false`;

    let sqlProperty = `SELECT * from property WHERE property_user_id = ${userId} and property_is_user_deleted = false and property_is_admin_deleted = false`;

    connection.query(sqlUser, (errorUser, resultUser) =>{
        if(errorUser){
            res.status(400).json({ errorUser});
            }
        connection.query(sqlProperty, (errorProperty, resultProperty) =>{
            if(errorProperty) {
                res.status(400).json({ errorProperty });
                }
            res.status(200).json({ resultUser, resultProperty})
        });
    });

};

// FORMULARIO EDITAR USER
showOneUser = (req, res) =>{
     
    let userId = req.params.user_id

    let sqlGE = `SELECT * FROM user where user_id = ${userId}`

    connection.query(sqlGE, (errorGE, result)=>{
        if(errorGE) {
            res.status(400).json({errorGE});
        }
        res.status(200).json({result})
    } )
}


// EDITAR UN USUARIO (metodo put)
//localhost:4000/users/editUser/:userId
editOneUser =(req, res)=>{


    let userId = req.params.user_id;

    const { name, lastname, phone, dni, promotional_code, birth_date } = JSON.parse(req.body.register)

    // eliminamos espacios en blanco previos o posteriores al dato a rescatar
    name = name.trim()
    lastname = lastname.trim();
    phone = phone.trim();
    dni = dni.trim();
    promotional_code = promotional_code.trim();
    birth_date = birth_date.trim()


    let img = "";

    let sql = `UPDATE user SET user_name = "${name}", user_lastname = "${lastname}", user_phone = "${phone}", user_dni = "${dni}", user_code = "${promotional_code}", user_birth_date = "${birth_date}" WHERE user_id = ${userId}`;

    if(req.file != undefined){
        img = req.file.filename;
        
        sql = `UPDATE user SET user_name = "${name}", user_lastname = "${lastname}", user_phone = "${phone}", user_dni = "${dni}", user_code = "${promotional_code}", user_birth_date = "${birth_date}", user_img = ${img} WHERE user_id = ${userId}`
    }

    connection.query(sql, (errorEdit, resultEdit) =>{
        if (errorEdit) throw errorEdit;
        errorEdit ? res.status(400).json({errorEdit}) : res.status(200).json(resultEdit);
    })

};




}

module.exports = new userController();