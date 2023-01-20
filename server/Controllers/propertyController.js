const connection = require("../config/db.js");


class propertyController {


      ////////////////////////////////////////////////////////////////////////////////////////////////////// 
    
    /* Mostrar Todos los TIPOS */
    showAllTypes = (req, res) => {
      let sql = 'SELECT * FROM type';

      connection.query(sql, (error, result) => {
          if(error){res.status(400).json({error})};
          res.status(200).json(result)
      })
  }

  /* Mostra Todos los SUBTIPOS de cada Tipo */
  showAllSubTypes = (req, res) => {
      let {type_id} = req.params;
      let sql = `select * from subtype where subtype_type_id = ${type_id}`

      connection.query(sql, (error, result)=>{
          if (error){
              res.status(400).json({error});
          }
          res.status(200).json(result);
          console.log(result);
      });
  }
  

  createProperty = (req, res) => {
    let {property_user_id, property_subtype_id} = req.params;
    let {property_name} = req.body;

    property_name.trim();

    let sql = `INSERT INTO property (property_name, property_user_id, property_subtype_id) VALUES ('${property_name}', ${property_user_id}, ${property_subtype_id})`;

    connection.query(sql, (error, result)=>{
        if (error) throw error;
        let property_id = result.insertId;

        let sqlProperty = `SELECT * FROM property WHERE property_id = ${property_id}`;

        connection.query(sqlProperty, (err, resultProperty) => {
            if(err) throw err;
            res.status(200).json(resultProperty);
        })
    });
}


  allKitchens = (req, res) => {
    let sql = 'SELECT * FROM kitchen';
    connection.query(sql, (error, result)=>{
        error ? res.status(400).json({error}) : res.status(200).json(result);
    });
  }


  addBasicFeaturesToProperty = (req, res) => {

    let {property_kitchen_id, property_id} = req.params;
    let { property_total_meters, property_built_meters, property_built_year, property_rooms, property_bathrooms, property_garage} = req.body;

    let sql = `UPDATE property SET property_total_meters = ${property_total_meters},
     property_built_meters = ${property_built_meters}, property_built_year = ${property_built_year},
      property_rooms = ${property_rooms}, property_bathrooms = ${property_bathrooms},
       property_garage = ${property_garage}, property_kitchen_id = ${property_kitchen_id}
        WHERE property_id = ${property_id}`;

    connection.query(sql, (error, result)=>{
      if (error) throw error;

      let sqlProperty = `SELECT * FROM property WHERE property_id = ${property_id}`;

      connection.query(sqlProperty, (err, resultProperty) => {
          if(err) throw err;
          res.status(200).json(resultProperty);
      })
  });
  }


    ///Marca una propiedad como en venta
    checkSale = (req, res) => {
        let {property_id, property_user_id} = req.params;

        let sql = `UPDATE property SET property_is_for_sale = 1 WHERE property_id = '${property_id}' AND property_user_id = '${property_user_id}'`;
        let sql2 = `SELECT * from property WHERE property_user_id = '${property_user_id}'`;

        connection.query(sql, (error, result) => {
            if (error) throw error;
            console.log(error);
          });
           connection.query(sql2, (error, resultUsers) => {
             error ? res.status(400).json({ error }) : res.status(200).json(resultUsers);
          });
    };

    ///Deshabilita el marcado en venta
    uncheckSale = (req, res) => {
        let {property_id, property_user_id} = req.params;

        let sql = `UPDATE property SET property_is_for_sale = 0 WHERE property_id = '${property_id}' AND property_user_id = '${property_user_id}'`;
        let sql2 = `SELECT * from property WHERE property_user_id = '${property_user_id}'`;

        connection.query(sql, (error, result) => {
            if (error) throw error;
            console.log(error);
          });
           connection.query(sql2, (error, resultUsers) => {
             error ? res.status(400).json({ error }) : res.status(200).json(resultUsers);
          });
    }
    ///Trae todas las imágenes de una propiedad
    getImagesProperty = (req, res) => {
        let {property_id} = req.params;

        let sql = `SELECT * FROM image WHERE property_id = ${property_id} AND image_is_deleted = 0`;
        connection.query(sql, (error, result) => {
            error ? res.status(400).json({ error }) : res.status(200).json(result);
          });
  
  
  //Método get descubre
    showAllDescubre = (req, res) =>{

        let sql = 'SELECT * from property WHERE property_is_for_sale = true AND property_is_user_deleted = false AND property_is_admin_deleted = false ORDER BY property_built_year DESC';

        connection.query(sql, (error, result)=>{
            error ? res.status(400).json({error}) : res.status(200).json(result);
        })
    }



    allProvinces = (req, res) => {

      let sql = 'SELECT * FROM province'
    
      connection.query(sql, (error, result)=>{
        error ? res.status(400).json({error}) : res.status(200).json(result);
      })
    }
    
  
    allCities = (req, res) => {
      let {province_id} = req.params;
      
      let sql = `SELECT * FROM city WHERE city_province_id = ${province_id} `;
    
      connection.query(sql, (error, result) => {
        error ? res.status(400).json({error}) : res.status(200).json(result);
      })
    
      
    }
    


    //Trae todas las fotos de una propiedad
    //localhost:4000/property/getImagesProperty/:property_id
    getImagesProperty = (req, res) => {
        let {property_id} = req.params;
  
        let sql = `SELECT * FROM image WHERE image_property_id = ${property_id} AND image_is_deleted = 0`;
  
        connection.query(sql, (error, result) => {
          error ? res.status(400).json({ error }) : res.status(200).json(result);
        });
      }

}
}







module.exports = new propertyController();