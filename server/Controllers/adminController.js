const connection = require("../config/db.js");


class adminController {
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




































































































































// CONSEGUIR LA INFO DE TODOS LOS FEATURES EXISTENTES

    getPropertyFeatures = (req, res) =>{
        let sql ="SELECT * FROM feature";
        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});
                
            }
            res.status(200).json(result);
            console.log(result);
        });
    };


//CREAR UN NUEVO FEATURE NO EXISTENTE

    createPropertyFeatures = (req, res) => {
        let {feature_name} = req.body;

        let sql =`INSERT INTO type (type_name) VALUES (${feature_name})`;

        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});
                
            }
            res.status(200).json(result);
            
        });
    }


    //EDITAR UN FEATURE YA EXISTENTE

    editPropertyFeature = (req, res) =>{
        let {feature_id} = req.params;
        let {feature_name} = req.body;

        let sql =`UPDATE type SET type_name = ${feature_name} where type_id = ${feature_id}`;

        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});
                
            }
            res.status(200).json(result);
            console.log(result);
        });

    }



// BORRAR UN FEATURE YA EXISTENTE.

    deletePropertyFeature = (req, res) =>{
        let {feature_id} = req.params
        console.log(req.params.feature_id);


        let sql =`DELETE FROM feature where feature_id = ${feature_id}`;
        console.log(sql);

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