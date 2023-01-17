const connection = require("../config/db.js");


class propertyController {
    

    createProperty = (req, res) => {
        let {property_kitchen_id, property_address_id, property_subtype_id, property_rent_id } = req.params;

        let {property_bathrooms, property_rooms, property_built_meters, property_total_meters, property_built_year, property_garage, property_name } = req.body;

        let sql = `INSERT INTO property (property_kitchen_id, property_address_id, property_subtype_id, property_rent_id, property_bathrooms, property_rooms, property_built_meters, property_total_meters, property_built_year, property_garage, property_name ) VALUES (${property_kitchen_id}, ${property_address_id}, ${property_subtype_id}, ${property_rent_id}, ${property_bathrooms}, ${property_rooms}, ${property_built_meters}, ${property_total_meters}, ${property_built_year}, ${property_garage}, ${property_name}) `;
        
        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});
                
            }
            res.status(200).json(result);
            console.log(result);
        });
    }
    
}

module.exports = new propertyController();