const connection = require("../config/db.js");
const fs = require('fs').promises;


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
              res.status(400).json(error);
          }
          res.status(200).json(result);
          console.log(result);
      });
  }
  
// CREAR UN ACTIVO
  createProperty = (req, res) => {
    let {property_user_id, property_subtype_id} = req.params;
    let {property_name} = req.body;


    let sql = `INSERT INTO property (property_name, property_user_id, property_subtype_id) VALUES ('${property_name}', ${property_user_id}, ${property_subtype_id})`;


    connection.query(sql, (error, result) => {
      if (error){res.status(400).json(error)}

      
        let property_id = result.insertId;

        let sqlProperty = `SELECT * FROM property WHERE property_id = ${property_id}`;
        
        let sqlInsertPurchase = ` INSERT INTO purchase (purchase_property_id) VALUES (${property_id})`;
        let sqlInsertRent = ` INSERT INTO rent (rent_property_id) VALUES (${property_id})`;
        let sqlInsertLoan = ` INSERT INTO loan (loan_property_id) VALUES (${property_id})`;
        
        connection.query(sqlInsertRent, (errRent, resultRent) => {
          errRent && res.status(400).json({errRent});
          connection.query(sqlInsertLoan, (errLoan, resultLoan) => {
            errLoan && res.status(400).json({errLoan});
            connection.query(sqlInsertPurchase, (errPurchase, resultPurchase) => {
              errPurchase && res.status(400).json({errPurchase});
              connection.query(sqlProperty, (err, resultProperty) => {
                err ? res.status(400).json({err}) : res.status(200).json({resultProperty, resultRent,resultLoan, resultPurchase });
              })
              });
            })
          })
        })
        
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
       property_garage = ${property_garage}, property_kitchen_id = ${property_kitchen_id}
        WHERE property_id = ${property_id}`;

    let sqlProperty = `SELECT * FROM property WHERE property_id = ${property_id}`;

    connection.query(sql, (error, result)=>{
      if (error) {res.status(400).json({error})}

      connection.query(sqlProperty, (err, resultProperty) => {

        if (err){res.status(400).json(err)}
          res.status(200).json(resultProperty);
      })
  });
  }


    ///Marca una propiedad como en venta
    checkSale = (req, res) => {
        let {property_id, user_id} = req.params;

        let sql = `UPDATE property SET property_is_for_sale = 1 WHERE property_id = '${property_id}'`;

        let sql2 = `SELECT property.*, address.*, purchase.purchase_buy_price, image.image_title FROM property LEFT JOIN address ON property.property_id = address.address_property_id LEFT JOIN purchase ON property.property_id = purchase.purchase_property_id JOIN image ON image.image_property_id = property.property_id   WHERE property.property_user_id = ${user_id} AND property_is_user_deleted = false AND image.image_is_deleted = false AND image.image_is_main = true ORDER BY property_id DESC `;

        connection.query(sql, (error, result) => {

          if (error){
            res.status(400).json(error)}
            console.log(error);
          });
           connection.query(sql2, (error, resultUsers) => {
             error ? res.status(400).json({ error }) : res.status(200).json(resultUsers);
          });
    };
    ///Marca ADMINISTRADOR una propiedad como en venta
    checkSaleAdmin = (req, res) => {
        let {property_id} = req.params;

        let sql = `UPDATE property SET property_is_for_sale = 1 WHERE property_id = '${property_id}'`;

        let sql2 = 'SELECT property.*, address.address_street_name, province.province_name, purchase.purchase_buy_price, image.image_title FROM property LEFT JOIN purchase ON property.property_id = purchase.purchase_property_id LEFT JOIN address ON property.property_id = address.address_property_id JOIN province ON address.address_province_id = province.province_id JOIN image ON image.image_property_id = property.property_id WHERE property.property_is_admin_deleted = false AND image.image_is_main = true ORDER BY property.property_id DESC';

        connection.query(sql, (error, result) => {

          if (error){
            res.status(400).json(error)}
            console.log(error);
          });
           connection.query(sql2, (error, resultUsers) => {
             error ? res.status(400).json({ error }) : res.status(200).json(resultUsers);
          });
    };

    ///Deshabilita ADMINISTRADOR el marcado en venta
    uncheckSaleAdmin = (req, res) => {
        let {property_id} = req.params;

        let sql = `UPDATE property SET property_is_for_sale = 0 WHERE property_id = '${property_id}' `;

        let sql2 = 'SELECT property.*, address.address_street_name, province.province_name, purchase.purchase_buy_price, image.image_title FROM property LEFT JOIN purchase ON property.property_id = purchase.purchase_property_id LEFT JOIN address ON property.property_id = address.address_property_id JOIN province ON address.address_province_id = province.province_id JOIN image ON image.image_property_id = property.property_id WHERE property.property_is_admin_deleted = false AND image.image_is_main = true ORDER BY property.property_id DESC';

        connection.query(sql, (error, result) => {
          if (error){
            res.status(400).json(error)}
            console.log(error);
          });
           connection.query(sql2, (error, resultUsers) => {
             error ? res.status(400).json({ error }) : res.status(200).json(resultUsers);
          });
    };
    ///Deshabilita el marcado en venta
    uncheckSale = (req, res) => {
        let {property_id, user_id} = req.params;

        let sql = `UPDATE property SET property_is_for_sale = 0 WHERE property_id = '${property_id}' `;
        let sql2 = `SELECT property.*, address.*, purchase.purchase_buy_price, image.image_title FROM property LEFT JOIN address ON property.property_id = address.address_property_id LEFT JOIN purchase ON property.property_id = purchase.purchase_property_id JOIN image ON image.image_property_id = property.property_id   WHERE property.property_user_id = ${user_id} AND property_is_user_deleted = false AND image.image_is_deleted = false AND image.image_is_main = true ORDER BY property_id DESC  `;

        connection.query(sql, (error, result) => {
          if (error){
            res.status(400).json(error)}
            console.log(error);
          });
           connection.query(sql2, (error, resultUsers) => {
             error ? res.status(400).json({ error }) : res.status(200).json(resultUsers);
          });
    };

  
  //Método get descubre (ES TEMPORAL POR FALTA DE ARQUITECTURA)
    showAllDescubre = (req, res) =>{

       let sql = `SELECT property.*, purchase.purchase_buy_price, address.address_city_id, city.city_name, province.province_id, province.province_name, type.type_id, type.type_name, subtype.subtype_name, subtype.subtype_id, kitchen.*
       from property, purchase, address, city, province, type, subtype, kitchen
       where property.property_id = address.address_property_id
       AND address.address_city_id = city.city_id
       AND subtype.subtype_id = type.type_id
       AND city.city_id = province.province_id
       AND property.property_id = purchase.purchase_property_id
       AND property.property_kitchen_id = kitchen.kitchen_id
       AND property.property_is_for_sale = true
       AND property.property_is_admin_deleted = false
       AND property.property_is_user_deleted = false
       group by property.property_id;`

        connection.query(sql, (error, result)=>{
            error ? res.status(400).json({error}) : res.status(200).json(result);
        })
    }
    
//METODO GET DESCUBRE QUE USAREMOS DE FORMA FINAL
    discover = (req, res) => {
  
      let sql = `SELECT property.property_id, property.property_bathrooms, property.property_is_for_sale, property.property_rooms, property.property_built_meters, property.property_subtype_id, property.property_total_meters, property.property_built_year, property.property_garage, property.property_kitchen_id, address.*, purchase.purchase_buy_price, purchase.purchase_is_new, image.image_title, city.city_name, province.province_name, type.*, subtype.subtype_id, subtype.subtype_name, kitchen.*
      FROM property, address, city, province, purchase, image, subtype, type, kitchen
      where property.property_id = purchase.purchase_property_id 
      and property.property_id = address.address_property_id 
      and address.address_city_id = city.city_id	and  address.address_province_id  = city.city_province_id     
      and city.city_province_id = province.province_id
      and property.property_id = image.image_property_id 
      AND property.property_subtype_id = subtype.subtype_id
      AND property.property_kitchen_id = kitchen.kitchen_id
      AND property.property_is_for_sale = true
      AND property.property_is_admin_deleted = false
      AND property.property_is_user_deleted = false
      AND subtype.subtype_type_id = type.type_id
      AND purchase.purchase_buy_price > 0
      AND image.image_is_main = 1`;

      connection.query(sql, (error, result) => {
        error ? res.status(400).json({error}) : res.status(200).json(result);
        /* console.log(result, "esto es el result de descubre") */
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

        console.log(property_id, "el id que buscamos");
  
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
          if (error){
            res.status(400).json(error)}
          console.log(result);
  
          connection.query(sqlAddress, (errorAddress, resultAddress) => {

            if (errorAddress){
              res.status(400).json(errorAddress)}
            res.status(200).json(resultAddress);
          })
        })
      }

      //EDITAR DIRECCIÓN Propiedad
      editPropertyAddress = (req, res) => {
        let {property_id, province_id, city_id} = req.params;

        /* console.log('PROPIEDAD', property_id, 'PROVINCIA', province_id, 'CIUDAD', city_id);*/
        
        console.log('REQ.BODY DE LA EDIDCIÓN DE LA DIRECCIÓN', req.body);

        let sql = 'select * from property';

        for(const [field, value] of Object.entries(req.body)){

          if(field.startsWith('property') && field != 'property_id' && value){
            sql = `UPDATE property SET ${field} = '${value}' WHERE property_id = ${property_id}`
          }

          if(field.startsWith('address') && field != 'address_property_id' && value){
            sql = `UPDATE address SET ${field} = '${value}' WHERE address_property_id = ${property_id}`
          }

          /* else if(field == 'type_id'){
          } */

          /* console.log('SQL DE ADDRESS', sql); */
          connection.query(sql, (errorUpd, resultUpd) => {
            /* errorUpd && res.status(400).json({errorUpd}) */
            errorUpd && console.log(errorUpd);
            
          })
        }

        res.status(200).send('update correct')
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
            if (error){
              res.status(400).json(error)}
          })
        })
  
        res.status(200).send('features save successfully')
      }

      //EDITAR CARACTERÍSTICAS DE UN INMUEBLE
      editFeaturesProperty = (req, res) => {
        let {property_id} = req.params;
        let features = req.body;

        let sqlDelete = `DELETE FROM feature_property WHERE property_id = ${property_id}`;

        connection.query(sqlDelete, (errorDel, resultDel) => {
          errorDel && res.status(400).json({errorDel});

          features?.map((feature, ind) => {
            let sqlIns = `INSERT INTO feature_property (feature_id, property_id) VALUES(${feature}, ${property_id})`;

            connection.query(sqlIns, (errorIns, resultIns) => {
              errorIns && res.status(400).json({errorIns})
            })
          })

          res.status(200).send('features saved succesfully');
        })
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

        
        let mainImage = img[0].filename

        img.forEach((img) => {

          let sql = '';

          if(mainImage == img.filename){
            sql = `INSERT INTO image (image_title, image_property_id, image_is_main) VALUES('${img.filename}', ${property_id}, true)`
          }
          else {
            sql = `INSERT INTO image (image_title, image_property_id) VALUES('${img.filename}', ${property_id})`;
          }

          connection.query(sql, (error, result) => {

            if (error){
              res.status(400).json(error)}
            })
          })
          
        let sqlImagesProperty = `SELECT * FROM image WHERE image_property_id = ${property_id} AND image_is_deleted = 0`;

        connection.query(sqlImagesProperty, (errorImgs, resultImgs) => {
          errorImgs
            ? res.status(400).json({error})
            : res.status(200).json(resultImgs)
        });
      };

      //Editar Fotos Propiedad
      //localhost:4000/property/updateImagesProperty/:property_id
      updateImagesProperty = (req, res) => {
        let {property_id} = req.params;
        let imgs = [''];
        let mainImage = '';

        if(req.files != undefined){
          imgs = req.files;
          mainImage = imgs[0].filename
        }


        let sqlDeleteImg = `UPDATE image SET image_is_deleted = true, image_is_main = false WHERE image_property_id = ${property_id}`

        connection.query(sqlDeleteImg, (errorDeleteImg, resultDeleteImg) => {
          errorDeleteImg && res.status(400).json({errorDeleteImg})

          /* console.log('IMAGEN PRINCIPAL', mainImage); */
         /*  console.log('IMÁGENES QUE VOY A INSERTAR', imgs); */

          imgs.forEach((img) => {
          
            let sqlInsert = '';
          
            if(mainImage == img.filename){
              sqlInsert = `INSERT INTO image (image_title, image_property_id, image_is_main) VALUES('${img.filename}', ${property_id}, true)`
            }
            else {
              sqlInsert = `INSERT INTO image (image_title, image_property_id) VALUES('${img.filename}', ${property_id})`;
            }

            connection.query(sqlInsert, (errorInsert, resultInsert) => {
              errorInsert && res.status(400).json({errorInsert})
            })
          })
          
          let sqlSelect = `SELECT * FROM image WHERE image_property_id = ${property_id} AND image_is_deleted = 0`;

          connection.query(sqlSelect, (errorSelect, resultSelect) => {
            errorSelect 
                ? res.status(400).json({errorSelect})
                : res.status(200).json({resultSelect})
          })
        })
      }


      addOneImage = (req, res) => {
        let {property_id} = req.params;
        let images = [''];

        if(req.files != undefined){
          images = req.files;
        }

        /* console.log('IMAGENES PARA GUARDAR', images); */
        

        images.forEach((img) =>{
          let sqlAdd = `INSERT INTO image (image_title, image_property_id) VALUES ('${img.filename}', ${property_id})`

          connection.query(sqlAdd, (errorAdd, resultAdd) => {
            errorAdd && res.status(400).json({errorAdd})
          })
        })

        let sqlSelect = `SELECT * FROM image WHERE image_property_id = ${property_id} AND image_is_deleted = 0`;

        connection.query(sqlSelect, (errorSelect, resultSelect) => {
          errorSelect 
              ? res.status(400).json({errorSelect})
              : res.status(200).json({resultSelect})
        })
      }

      //Elimina una Foto del EditForm
      //localhost:4000/property/delImg/:image_id
      delImg = (req, res) => {
        const {image_id} = req.params;
        console.log('ID DE LA FOTO A QUITAR',image_id);
        

        let sqlDeleteImg = `UPDATE image SET image_is_deleted = true, image_is_main = false WHERE image_id = ${image_id}`
        connection.query(sqlDeleteImg, (errorDel, resultDel) => {
          errorDel ? res.status(400).json({errorDel}) : res.status(200).json(resultDel) 
        } )
      }

    



//editPurchase, rent y loan
editPurchase = (req,res) => {
  let {property_id} = req.params;

  // let {purchase_buy_price, purchase_buy_date, purchase_is_new, purchase_furniture_expenses, purchase_reform_expenses,purchase_ownership_percentage, purchase_is_usual, purchase_entry_expenses, purchase_trading_expenses } = req.body;

  console.log(req.body, 'req.bodyyyy');
  let sql = '';

  for(const [field, value] of Object.entries(req.body)){
    

    if(field == "purchase_buy_date" && value && value != ''){

     sql = `UPDATE purchase SET ${field} = date_format('${value}', '%Y-%m-%d')  WHERE purchase_property_id = ${property_id}`;
     connection.query(sql, (error, result)=>{
      if (error){
        throw (error)  
      } 
    });
    } 
    if(field == "purchase_buy_price" || field == "purchase_is_new" || field == "purchase_furniture_expenses" || field == "purchase_reform_expenses" || field == "purchase_ownership_percentage" || field == "purchase_is_usual" || field == "purchase_entry_expenses" || field == "purchase_trading_expenses") {
      sql = `UPDATE purchase SET ${field} = ${value} WHERE purchase_property_id = ${property_id}`;
      connection.query(sql, (error, result)=>{
        if (error){
          throw (error)  
        } 
      });
    } 

   

    if(field == "rent_renting_date" && value && value != ''){

      sql = `UPDATE rent SET ${field} = date_format('${value}', '%Y-%m-%d') WHERE rent_property_id = ${property_id}`;
      connection.query(sql, (error, result)=>{
       if (error){
         throw (error)  
       } 
     });
     } 
    if (field == "rent_renting_price" || field == "rent_expenses" ){
      sql = `UPDATE rent SET ${field} = ${value} WHERE rent_property_id = ${property_id}`
      connection.query(sql, (error, result)=>{
        if (error){
          throw (error)  
        } 
      });
    }
    if (field == "loan_years" || field == "loan_interest_rate" || field == "loan_type" || field == "loan_value"){
      sql = `UPDATE loan SET ${field} = ${value} WHERE loan_property_id = ${property_id}`
      connection.query(sql, (error, result)=>{
        if (error){
          throw (error)  
        } 
      });
    }
  
  }
  res.status(200).send('insert correctos');
  /* console.log('correctos'); */
}


 //ELIMINA FOTO de una Propiedad
//localhost:4000/property/deleteImageProperty/:image_id/:property_id
      deleteInitialImageProperty = (req, res) => {

        let {image_id, property_id} = req.params;

        let sql = `DELETE FROM image WHERE image_id = ${image_id}`;

        let sqlImagesProperty = `SELECT * FROM image WHERE image_property_id = ${property_id}`;

        connection.query(sql, (error, result) => {
          if (error) {res.status(400).json({error})}
          connection.query(sqlImagesProperty, (errorImgs, resultImgs) => {
            if (errorImgs) {res.status(400).json({errorImgs})}
            res.status(200).json(resultImgs);
          })
        })
      }

      //Setear FOTO PRINCIPAL de una propiedad
      //localhost:4000/property/setMainImage/:image_id/:property_id
      setMainImage = (req, res) => {
        let {image_id, property_id} = req.params;

        let unSetMainSql = `UPDATE image SET image_is_main = false WHERE image_property_id = ${property_id}`

        let sql = `UPDATE image SET image_is_main = true WHERE image.image_id = ${image_id}`;

        let sqlImagesProperty = `SELECT * FROM image WHERE image_property_id = ${property_id} and image_is_deleted = false`;

        connection.query(unSetMainSql, (errorUnSet, resultUnSet) => {
          if (errorUnSet) {res.status(400).json({errorUnSet})}
          connection.query(sql, (error, result) => {
            if (error) {res.status(400).json({error})}
            connection.query(sqlImagesProperty, (errorImgs, resultImgs) => {
              if (errorImgs) {res.status(400).json({errorImgs})}
              res.status(200).json(resultImgs);
            })
          })
        })
      }

      //Deshacer FOTO PRINCIPAL de una propiedad
      //localhost:4000/property/unSetMainImage/:image_id/:property_id

      unSetMainImage = (req, res) => {
        let {image_id, property_id} = req.params;

        let sql = `UPDATE image SET image_is_main = false WHERE image.image_id = ${image_id}`;

        let sqlImagesProperty = `SELECT * FROM image WHERE image_property_id = ${property_id}`;

        connection.query(sql, (error, result) => {
          if (error) {res.status(400).json({error})}
          connection.query(sqlImagesProperty, (errorImgs, resultImgs) => {
            if (errorImgs) {res.status(400).json({errorImgs})}
            res.status(200).json(resultImgs);
          })
        })
      }

  
//trae todos los datos de purchase, rent y loan
getAllPurchaseData = (req, res) => {
  let {property_id} = req.params;
  
  let sql = `select loan.*, purchase.purchase_property_id, purchase.purchase_buy_price, date_format(purchase.purchase_buy_date, '%Y-%m-%d') as purchase_buy_date, purchase.purchase_is_new, purchase.purchase_furniture_expenses, purchase.purchase_reform_expenses, purchase.purchase_ownership_percentage,purchase.purchase_is_usual, purchase.purchase_entry_expenses, purchase.purchase_trading_expenses, date_format(rent.rent_renting_date, '%Y-%m-%d') as rent_renting_date, rent.rent_property_id, rent.rent_renting_price, rent.rent_expenses from loan , purchase, rent
            where loan.loan_property_id = ${property_id}
            and rent.rent_property_id = ${property_id}
            and purchase.purchase_property_id = ${property_id}`;
  
            connection.query(sql, (error, result)=>{
              if (error){
                  res.status(400).json({error});
                  console.log(error, 'este es el error de getallpurchase');
              }
              res.status(200).json(result);
              console.log(result);
          })
}
  
  
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
  
        let sql = `SELECT property.*, address.*, city.city_name, province.province_name, type.type_id
        FROM property, address, city, province , type, subtype
        WHERE  property.property_id = address.address_property_id
        AND address.address_city_id = city.city_id
        AND city.city_province_id = province.province_id
        AND property.property_subtype_id = subtype.subtype_id
        AND subtype.subtype_type_id = type.type_id
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

      /* discover = (req, res) => {
  
        let sql = `SELECT property.property_id, property.property_bathrooms, property.property_rooms, property.property_built_meters, property.property_total_meters, 
        property.property_garage, property.property_built_year, property.property_kitchen_id, address.*, purchase.purchase_buy_price, purchase.purchase_is_new,
        image.image_title, province.province_id,city.city_name, province.province_name, type.*, subtype.subtype_id, subtype.subtype_name, kitchen.*
        FROM property 
        LEFT JOIN purchase ON  purchase.purchase_property_id = property.property_id
        LEFT JOIN address ON address.address_property_id = property.property_id
        LEFT JOIN city ON address.address_city_id = city.city_id and  address.address_province_id  = city.city_province_id
        LEFT JOIN province ON city.city_province_id = province.province_id
        LEFT JOIN image ON property.property_id = image.image_property_id 
        LEFT JOIN subtype ON property.property_subtype_id = subtype.subtype_id
        LEFT JOIN type ON subtype.subtype_type_id = type.type_id
        LEFT JOIN kitchen ON property.property_kitchen_id = kitchen.kitchen_id
        WHERE  property.property_is_for_sale = true
        AND property.property_is_admin_deleted = false
        AND property.property_is_user_deleted = false
        AND image.image_is_main = 1;`;

  
        connection.query(sql, (error, result) => {
          error ? res.status(400).json({error}) : res.status(200).json(result);
        })
      } */
      
      fav = (req, res) => {
        let {user_id, property_id} = req.params;
        console.log(user_id, property_id, "SOMOS LOS ID")
        let sql = `INSERT INTO favourite(favourite_user_id, favourite_property_id) VALUES (${user_id}, ${property_id})`;
  
        connection.query(sql, (error, result) => {
          error ? res.status(400).json({error}) : res.status(200).json(result);
        })
      }

      
      unfav = (req, res) => {
        let {user_id, property_id} = req.params;
        
        let sql = `DELETE FROM favourite WHERE favourite_user_id = ${user_id} AND  favourite_property_id = ${property_id}`;
      
            connection.query(sql, (error, result) => {
              error ? res.status(400).json({error}) : res.status(200).json(result);
            })
          }

        favUser = (req, res) => {
        let {user_id} = req.params;
        console.log("Hola")
        let sql = `SELECT property.*, image.image_title, purchase.*, city.*, province.*
        FROM  property, favourite, image, purchase, city, province, address
        WHERE favourite.favourite_property_id = property.property_id
         AND purchase.purchase_property_id = property.property_id
         AND image.image_property_id = property.property_id 
         and property.property_id = address.address_property_id 
        and address.address_city_id = city.city_id	and  address.address_province_id  = city.city_province_id      
        and city.city_province_id = province.province_id
         AND image.image_is_main = 1 
         AND favourite.favourite_user_id = ${user_id}`;
          
         connection.query(sql, (error, result) => {
          error ? res.status(400).json({error}) : res.status(200).json(result);
           })
        }      

  

        //SACA TODAS LA ENTRADAS DE FEATURES_PROPERTY PARA FILTRAR EN DESCUBRE.
        //localhost:4000/property/discover/allpropertywithfeature
        getAllFeature_Property = (req, res) =>{
          let sql = 'select * from feature_property ORDER BY property_id;'

          connection.query(sql, (error, result)=>{
            error ? res.status(400).json({error}) : res.status(200).json(result);
          })
        }

        getType = (req, res) => {
          let {property_subtype_id} = req.params;
          console.log(property_subtype_id, 'id del subtipo');
          
          property_subtype_id = Number(property_subtype_id);

          let sqlType = `SELECT subtype_type_id from subtype  WHERE subtype_id = ${property_subtype_id}`;

          connection.query(sqlType, (error, result) => {
            error ? res.status(400).json({error}) : res.status(200).json(result);
            console.log(result, 'resultado select tipo..lsdkjflñsk');
            
          })
        }

}


module.exports = new propertyController();


