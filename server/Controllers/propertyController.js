const connection = require("../config/db.js");


class propertyController {


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
  
// CREAR UN ACTIVO
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

//TRAE INFO DE TODAS LA COCINAS
  allKitchens = (req, res) => {
    let sql = 'SELECT * FROM kitchen';
    connection.query(sql, (error, result)=>{
        error ? res.status(400).json({error}) : res.status(200).json(result);
    });
  }

// MODIFICAR LAS CARACTERISTICAS DE UNA PROPIEDAD
  addBasicFeaturesToProperty = (req, res) => {

    let {property_kitchen_id, property_id} = req.params;
    let { property_total_meters, property_built_meters, property_built_year, property_rooms, property_bathrooms, property_garage} = req.body;

    let sql = `UPDATE property SET property_total_meters = ${property_total_meters},
     property_built_meters = ${property_built_meters}, property_built_year = ${property_built_year},
      property_rooms = ${property_rooms}, property_bathrooms = ${property_bathrooms},
       property_garage = ${property_garage}, property_kitchen_sid = ${property_kitchen_id}
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
    };

  
  //Método get descubre
    showAllDescubre = (req, res) =>{

        let sql = 'SELECT * from property WHERE property_is_for_sale = true AND property_is_user_deleted = false AND property_is_admin_deleted = false ORDER BY property_built_year DESC';

        connection.query(sql, (error, result)=>{
            error ? res.status(400).json({error}) : res.status(200).json(result);
        })
    }


//MUESTRA TODAS LAS PROVINCIAS
    allProvinces = (req, res) => {

      let sql = 'SELECT * FROM province'
    
      connection.query(sql, (error, result)=>{
        error ? res.status(400).json({error}) : res.status(200).json(result);
      })
    }
    
  //MUESTRA TODAS LA CIUDADES
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

//CREAR LA DIRECCION DE UNA PROPIEDAD
      addAddress = (req, res) => {
        let {property_id, province_id, city_id} = req.params;
  
        let {address_street_name, address_street_number, address_floor, address_gate, address_block, address_stair, address_door, address_postal_code} = req.body;
  
        let sql = `INSERT INTO address VALUES (${property_id}, "${address_street_name}", "${address_street_number}", "${address_floor}", "${address_gate}", "${address_block}", "${address_stair}", "${address_door}", "${address_postal_code}", ${province_id}, ${city_id})`;
  
        let sqlAddress = `select * from property, address where property.property_id = address.address_property_id and property.property_id = ${property_id} `;
  
        connection.query(sql, (error, result) => {
          if(error) throw error;
          console.log(result);
  
          connection.query(sqlAddress, (errorAddress, resultAddress) => {
            if(errorAddress) throw errorAddress;
            res.status(200).json(resultAddress);
          })
        })
      }
  
      //TRAE INFO DE TODAS LAS CARACTERISTICAS DE  LOS ACTIVOS
      allFeatures = (req, res) => {
        let sql = 'SELECT * FROM feature';
        connection.query(sql, (error, result) => {
          error ? res.status(400).json({error}) : res.status(200).json(result);
        })
      }
  
      // AÑADE CARACTERISTICAS A UN ACTIVO
      addFeaturesToProperty = (req, res) => {
        let {property_id} = req.params;
       
        let features = req.body;

        /* let features = [2,3,1] */
  
        features?.map((feature, index) => {
          let sql = `INSERT INTO feature_property (feature_id, property_id) VALUES ("${feature}", ${property_id})`;
  
          connection.query(sql, (error, result) => {
            if(error) throw error;
          })
        })
  
        res.status(200).send('features save successfully')
      }
  


      //TRAE LA INFO DE LAS CARACTERISTICAS DE UN ACTIVO CONCRETO

      getPropertyFeatures = (req, res) => {
        let {property_id} = req.params;
  
        let sql = `SELECT feature_property.feature_id, feature.feature_name FROM feature_property, feature WHERE feature_property.feature_id = feature.feature_id AND feature_property.property_id = ${property_id}`
  
        connection.query(sql, (error, result) => {
          error ? res.status(400).json({error}) : res.status(200).json(result);
        })
      }

      //Añade Imágenes a una Propiedad
      //localhost:4000/property/addImgsProperty/:property_id
      addImgsProperty = (req, res) => {
        let {property_id} = req.params;

        let img = [''];

        if(req.files != undefined){
          img = req.files;
        }

        img.forEach((img) => {
          let sql = `INSERT INTO image (image_title, image_property_id) VALUES('${img.filename}', ${property_id})`;

          connection.query(sql, (error, result) => {
            if(error) throw error;
            console.log(result);
          })
        })

        let sqlImagesProperty = `SELECT * FROM image WHERE image_property_id = ${property_id} AND image_is_deleted = 0`;

        connection.query(sqlImagesProperty, (errorImgs, resultImgs) => {
          errorImgs
            ? res.status(400).json({error})
            : res.status(200).json(resultImgs)
        });
      };



      propertyDetails = (req, res) => {
        let {property_id, user_id} = req.params;
  
        let sql = `SELECT * FROM property WHERE property_user_id = ${user_id} AND property_id = ${property_id} `;
  
        connection.query(sql, (error, result) => {
          error ? res.status(400).json({error}) : res.status(200).json(result);
        })
      }


      

      propertyDetailsImg = (req, res) => {
        let {property_id} = req.params;
  
        let sql = `SELECT  * FROM image WHERE image_property_id = ${property_id} AND image_is_deleted = 0 `;
  
        connection.query(sql, (error, result) => {
          error ? res.status(400).json({error}) : res.status(200).json(result);
        })
      }


      

      propertyDetailsAddress = (req, res) => {
        let {property_id} = req.params;
  
        let sql = `SELECT  * FROM address WHERE address_property_id = ${property_id} `;
  
        connection.query(sql, (error, result) => {
          error ? res.status(400).json({error}) : res.status(200).json(result);
        })
      }


      propertyDetailsPurchase = (req, res) => {
        let {property_id} = req.params;
  
        let sql = `SELECT  * FROM purchase WHERE purchase_property_id = ${property_id} `;
  
        connection.query(sql, (error, result) => {
          error ? res.status(400).json({error}) : res.status(200).json(result);
        })
      }


      propertyDetailsProvinceCity = (req, res) => {
        let {property_id} = req.params;
  
        let sql = `SELECT property.*, address.*, city.city_name, province.province_name
        FROM property, address, city, province 
        WHERE  property.property_id = address.address_property_id
        AND address.address_city_id = city.city_id
        AND city.city_province_id = province.province_id
        AND property.property_id = ${property_id}
        GROUP BY province.province_id
        HAVING province.province_id = address.address_province_id;`;
  
        connection.query(sql, (error, result) => {
          error ? res.status(400).json({error}) : res.status(200).json(result);
        })
      }


      propertyDetailsSubtype = (req, res) => {
        let {property_id} = req.params;
  
        let sql = `SELECT subtype.subtype_name FROM property, subtype WHERE property.property_subtype_id = subtype.subtype_id AND property_id = ${property_id} `;
  
        connection.query(sql, (error, result) => {
          error ? res.status(400).json({error}) : res.status(200).json(result);
        })
      }


      

      propertyDetailsRent = (req, res) => {
        let {property_id} = req.params;
  
        let sql = `SELECT * FROM rent WHERE rent_property_id = ${property_id} `;
  
        connection.query(sql, (error, result) => {
          error ? res.status(400).json({error}) : res.status(200).json(result);
        })
      }
      

      propertyDetailsLoan = (req, res) => {
        let {property_id} = req.params;
  
        let sql = `SELECT * FROM loan WHERE loan_property_id = ${property_id} `;
  
        connection.query(sql, (error, result) => {
          error ? res.status(400).json({error}) : res.status(200).json(result);
        })
      }


      
      
      discover = (req, res) => {
  
        let sql = `SELECT property.*, address.*, purchase.*, image.image_title, city.city_name, province.province_name
        FROM property 
        LEFT JOIN address
        ON property.property_id = address.address_property_id 
        JOIN city
        ON address.address_city_id = city.city_id
        JOIN province
        on city.city_province_id = province.province_id
        LEFT JOIN purchase 
        ON property.property_id = purchase.purchase_property_id 
        JOIN image
        ON property.property_id = image.image_property_id 
        WHERE property_is_user_deleted = false
        AND image.image_is_main = 1
        group by province.province_id
        having province.province_id = address.address_province_id;`;
  
        connection.query(sql, (error, result) => {
          error ? res.status(400).json({error}) : res.status(200).json(result);
        })
      }

}







module.exports = new propertyController();