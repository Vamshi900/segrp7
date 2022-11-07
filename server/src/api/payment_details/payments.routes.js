
const express = require('express');
const router = express.Router();
const dbConn = require('../../dbconnection.js');

// [payment_details] is the name of the table in the database
// id  primary key
// amount
// currency
// method
// status
// created_at
// updated_at

// operations 
// add new payment details
// should mimick payment gateway flow

// get provider payment gateway
// api mimicking payment gateway
router.get('/payment_gateway', async(req, res, next) =>{
    // return options for payment gateway
    // 1. approve 
    // 2. decline
    return res.json({
        "payment_gateway": {
            "1": "approve",
            "2": "decline"
        }
    });
}
);



// approve payment
// post request
// input: user_id, amount, currency, method, status
router.post('/approve', async(req, res, next) =>{
    // safe guard against sql injection
    // validate input
    // check if user exists
    if(!req.body.user_id){
        return res.status(400).send({
            message: "user_id can not be empty"
        });
    }
    if(!req.body.amount){
        return res.status(400).send({
            message: "amount can not be empty"
        });
    }
    if(!req.body.currency){
        return res.status(400).send({
            message: "currency can not be empty"
        });
    }
    if(!req.body.method){
        return res.status(400).send({
            message: "method can not be empty"
        });
    }
    if(!req.body.status){
        return res.status(400).send({
            message: "status can not be empty"
        });

    }
    // check if user exists
    dbConn.query('SELECT * FROM User WHERE User_ID=?', req.body.user_id, (err, result)=>{
        if(err){
            console.log('Error while fetching user by id', err);
        }else{
            console.log(JSON.stringify(result));
            if(result.length == 0){
                return res.status(400).send({
                    message: "user does not exist"
                });
            }
        }
    });


    let user_id = req.body.user_id;
    let amount = req.body.amount;
    let currency = req.body.currency;
    let method = req.body.method;
    let status = req.body.status;
    let created_at = new Date();
    let updated_at = new Date();
    

    dbConn.query('INSERT INTO payment_details (user_id, amount, currency, method, status, created_at, updated_at) VALUES (?,?,?,?,?,?,?)', [user_id, amount, currency, method, status, created_at, updated_at], (err, result)=>{
        if(err){
            console.log('Error while adding payment details', err);
        }else{
            console.log(JSON.stringify(result));
            res.json(result);
        }
    });
}
);


// reject payment
// post request
// input: user_id, amount,
router.post('/reject', async(req, res, next) =>{
    // safe guard against sql injection
    // validate input
    if(!req.body.user_id){
        return res.status(400).send({
            message: "user_id can not be empty"
        });
    }
    if(!req.body.amount){
        return res.status(400).send({
            message: "amount can not be empty"
        });
    }
    // check if user exists
    dbConn.query('SELECT * FROM User WHERE User_ID=?', req.body.user_id, (err, result)=>{
        if(err){
            console.log('Error while fetching user by id', err);
        }else{
            console.log(JSON.stringify(result));
            if(result.length == 0){
                return res.status(400).send({
                    message: "user does not exist"
                });
            }
        }
    });

    let user_id = req.body.user_id;
    let amount = req.body.amount;
    let currency = req.body.currency;
    // send a response payment declined
    return res.json({
        "message": "payment declined",
        "user_id": user_id,
    });

}
);



module.exports = router;