const connection = require("../config/db.js");


class adminController {
    // CRUD Property
    //Trae los tipos de propiedades
    getPropertyTypes = (req, res) =>{
        let sql ="SELECT * FROM type "
        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});
                
            }
            res.status(200).json(result);
            console.log(result);
        });
    };

    //crear un tipo de propiedad
    createPropertyType = (req, res) => {
        let {type_name} = req.body;

        let sql =`INSERT INTO type (type_name) VALUES (${type_name})`;

        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});
                
            }
            res.status(200).json(result);
            console.log(result);
        });
    }

    //edita una propiedad
    editPropertyType = (req, res) => {
        let {type_id} = req.params;
        let {type_name} = req.body;

        let sql =`UPDATE type SET type_name = ${type_name} where type_id = ${type_id}`;

        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});
                
            }
            res.status(200).json(result);
            console.log(result);
        });
    }
    
    //borra una propiedad
    deletePropertyType = (req, res) => {
        let {type_id} = req.params;

        let sql =`DELETE FROM type where type_id = ${type_id}`;

        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});
                
            }
            res.status(200).json(result);
            console.log(result);
        });
    }

    // CRUD Kitchen

    //trae la info de todos los tipos de cocina
    getKitchenTypes = (req, res) =>{
        let sql ="SELECT * FROM kitchen "
        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});
                
            }
            res.status(200).json(result);
            console.log(result);
        });
    };

    //crea un tipo de cocina
    createKitchenType = (req, res) => {
        let {kitchen_name} = req.body;

        let sql =`INSERT INTO kitchen (kitchen_name) VALUES (${kitchen_name})`;
        console.log(sql);

        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});
                
            }
            res.status(200).json(result);
            console.log(result);
        });
    }

    //edita un tipo de cocina
    editKitchenType = (req, res) => {
        let {kitchen_id} = req.params;
        let {kitchen_name} = req.body;

        let sql =`UPDATE kitchen SET kitchen_name = ${kitchen_name} where kitchen_id = ${kitchen_id}`;

        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});
                
            }
            res.status(200).json(result);
            console.log(result);
        });
    }
    
    //borra un tipo de cocina
    deleteKitchenType = (req, res) => {
        let {kitchen_id} = req.params;

        let sql =`DELETE FROM kitchen where kitchen_id = ${kitchen_id}`;

        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});
                
            }
            res.status(200).json(result);
            console.log(result);
        });
    }

}

module.exports = new adminController();