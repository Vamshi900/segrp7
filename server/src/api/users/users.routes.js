// api routes for users

const express = require('express');
const router = express.Router();
const dbConn = require('../../dbconnection.js');

// [user table]
// User_ID int(11) NOT NULL AUTO_INCREMENT,
//Primary_Email_Id varchar(255) NOT NULL,
//Alternate_Email_Id varchar(255) NOT NULL,
//User_Name varchar(255) NOT NULL,
//Birth_Gender varchar(255) NOT NULL,
//DOB date NOT NULL,
//Mobile_Number varchar(255) NOT NULL,
//Password varchar(255) NOT NULL,
//Role int(11) NOT NULL,


// GET Users by User_ID
router.get('/:User_ID', async(req, res, next) =>{
    let User_ID = req.params.User_ID;
    if (!isNaN(User_ID)){
        id = parseInt(User_ID);
        dbConn.query('SELECT * FROM User WHERE User_ID=?', id, (err, result)=>{
            if(err){
                console.log('Error while fetching employee by id', err);
            }else{
                console.log(JSON.stringify(result));
                res.json(result);
            }
        });
    }
}
);


//GET all users
router.get('/', async(req, res, next) =>{
    dbConn.query('SELECT * FROM User', (err, result)=>{
        if(err){
            console.log('Error while fetching employees', err);
        }else{
            console.log(JSON.stringify(result));
            res.json(result);
        }
    });
}
);

// get users by email
// input email as a string
router.get('/email/:Email', async(req, res, next) =>{
    let Email = req.params.Email;
    dbConn.query('SELECT * FROM User WHERE Primary_Email_Id=?', Email, (err, result)=>{
        if(err){
            console.log('Error while fetching employees', err);
        }else{
            console.log(JSON.stringify(result));
            res.json(result);
        }
    });
}
);

// get users by name
// input name as a string
router.get('/name/:Name', async(req, res, next) =>{
    let Name = req.params.Name;
    dbConn.query('SELECT * FROM User WHERE User_Name=?', Name, (err, result)=>{
        if(err){
            console.log('Error while fetching employees', err);
        }else{
            console.log(JSON.stringify(result));
            res.json(result);
        }
    });
}
);

// get users by role
// input role as a string
router.get('/role/:Role', async(req, res, next) =>{
    let Role = req.params.Role;
    dbConn.query('SELECT * FROM User WHERE Role=?', Role, (err, result)=>{
        if(err){
            console.log('Error while fetching employees', err);
        }else{
            console.log(JSON.stringify(result));
            res.json(result);
        }
    });
}
);

// add a new user
router.post('/', async(req, res, next) =>{
    let Primary_Email_Id = req.body.Primary_Email_Id;
    let Alternate_Email_Id = req.body.Alternate_Email_Id;
    let User_Name = req.body.User_Name;
    let Birth_Gender = req.body.Birth_Gender;
    let DOB = req.body.DOB;
    let Mobile_Number = req.body.Mobile_Number;
    let Password = req.body.Password;
    let Role = req.body.Role;
    let User_ID = Math.floor(Math.random() * 1000);
    let User = {User_ID: User_ID, Primary_Email_Id: Primary_Email_Id, Alternate_Email_Id: Alternate_Email_Id, User_Name: User_Name, 
        Birth_Gender: Birth_Gender, DOB: DOB, Mobile_Number: Mobile_Number, Password: Password, Role: Role};
    let sql = "INSERT INTO User SET ?";
    dbConn.query(sql, User, (err, result)=>{
        if(err){
            console.log('Error while inserting data', err);
            res.status(500);
            res.json({"error": {"message" : "Internal Server Error", "code" : "500"}});
        }else{
            console.log('User created successfully');
            res.json({"success": {"message" : "User Created Successfully", "code" : "200"}});
        }
    });
}
);

// update a user
router.put('/:User_ID', async(req, res, next) =>{
    let User_ID = req.params.User_ID;
    let Primary_Email_Id = req.body.Primary_Email_Id;
    let Alternate_Email_Id = req.body.Alternate_Email_Id;
    let User_Name = req.body.User_Name;
    let Birth_Gender = req.body.Birth_Gender;
    let DOB = req.body.DOB;
    let Mobile_Number = req.body.Mobile_Number;
    let Password = req.body.Password;
    let Role = req.body.Role;
    let User = {Primary_Email_Id: Primary_Email_Id, Alternate_Email_Id: Alternate_Email_Id, User_Name: User_Name,
        Birth_Gender:Birth_Gender, DOB: DOB, Mobile_Number: Mobile_Number, Password: Password, Role: Role};
    let sql = "UPDATE User SET ? WHERE User_ID=?";
    dbConn.query(sql, [User, User_ID], (err, result)=>{
        if(err){
            console.log('Error while updating data', err);
        }else{
            console.log('User updated successfully');
            res.json(result);
        }
    });
}
);

// delete a user
router.delete('/:User_ID', async(req, res, next) =>{
    let User_ID = req.params.User_ID;
    dbConn.query('DELETE FROM User WHERE User_ID=?', User_ID, (err, result)=>{
        if(err){
            console.log('Error while deleting data', err);
        }else{
            console.log('User deleted successfully');
            res.json({"success": {"message" : "User Deleted Successfully", "code" : "200"}});
        }
    });
}
);

module.exports = router;
