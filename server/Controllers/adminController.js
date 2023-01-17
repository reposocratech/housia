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
}

module.exports = new adminController();