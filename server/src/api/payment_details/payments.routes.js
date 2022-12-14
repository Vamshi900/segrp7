
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

// api mimicking payment gateway
// verfyJWT
const verifyJWT = require('../../middleware/verifyJWT.js');
const verifyRoles = require('../../middleware/verifyRoles.js');

router.get('/payment_gateway', verifyJWT,verifyRoles("usa"),async (req, res, next) => {
    
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

// payment details from the user 
// input: user_id, amount, first_name, last_name, card number, expiration date, cvv, billing address, save card
router.post('/payment',verifyJWT,verifyRoles("usa"), async (req, res, next) => {
    //check if required parameters are present
    if (!req.body.user_id) {
        return res.status(400).send({
            message: "user_id can not be empty"
        });
    }

    if (!req.body.amount) {
        return res.status(400).send({
            message: "amount can not be empty"
        });
    }

    if (!req.body.first_name) {
        return res.status(400).send({
            message: "first name can not be empty"
        });
    }

    if (!req.body.card_number) {
        return res.status(400).send({
            message: "No card details provided"
        });
    }
    else {
        var flag = false;
        var mastercardno = /^(?:5[1-5][0-9]{14})$/;
        var visacardno = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
        if (req.body.card_number.match(mastercardno)) {
            flag = true;
        }
        if (req.body.card_number.match(visacardno)) {
            flag = true;
        }
        if (!flag) {
            return res.status(400).send({
                message: "card details are not correct"
            });
        }
    }

    if (!req.body.exp_month && !req.body.exp_year) {
        return res.status(400).send({
            message: "expiration date can not be empty"
        });
    }
    else {
        var date = new Date();
        var month = date.getMonth();
        var year = date.getFullYear();
        var exYear = Number(req.body.exp_year);
        var exMonth = Number(!req.body.exp_month)
        if (year > exYear || (year === exYear && month >= exMonth)) {
            return res.status(400).send({
                message: "card has expired"
            });
        }

    }

    if (!req.body.cvv) {
        return res.status(400).send({
            message: "card cvv missing"
        });
    }
    else {
        var cvvex = new RegExp(/^[0-9]{3,4}$/);
        if (!cvvex.test(req.body.cvv)) {
            return res.status(400).send({
                message: "cvv not in correct format"
            });
        }
    }

    // safe guard against sql injection
    // validate input
    // check if user exists
    dbConn.query('SELECT * FROM User WHERE User_ID=?', req.body.user_id, (err, result) => {
        if (err) {
            console.log('Error while fetching user by id', err);
        } else {
            console.log(JSON.stringify(result));
            if (result.length == 0) {
                return res.status(400).send({
                    message: "user does not exist"
                });
            }
        }
    });
    res.json({
        "message": "payment processed",
        "payment_gateway": {
            "1": "approve",
            "2": "decline"
        }
    });
});

// approve payment
// post request
// input: user_id, amount, currency, method, status
router.post('/approve',verifyJWT,verifyRoles("usa"), async (req, res, next) => {
    // safe guard against sql injection
    // validate input
    // check if user exists
    if (!req.body.user_id) {
        return res.status(400).send({
            message: "user_id can not be empty"
        });
    }
    if (!req.body.amount) {
        return res.status(400).send({
            message: "amount can not be empty"
        });
    }

    // check if user exists
    dbConn.query('SELECT * FROM User WHERE User_ID=?', req.body.user_id, (err, result) => {
        if (err) {
            console.log('Error while fetching user by id', err);
        } else {
            console.log(JSON.stringify(result));
            if (result.length == 0) {
                return res.status(400).send({
                    message: "user does not exist"
                });
            }
        }
    });

    let user_id = req.body.user_id;
    let amount = req.body.amount;
    const payment_id = Math.floor(100000 + Math.random() * 900000);

    dbConn.query('INSERT INTO Payment (User_ID, Payment_ID, amount) VALUES (?,?,?)', [user_id, payment_id, amount], (err, result)=>{
        if(err){
            console.log('Error while adding payment details', err);
        } else {
            console.log(JSON.stringify(result));
            res.json({
                "message": "payment successful"
            });
        }
    });
}
);


// reject payment
// post request
// input: user_id, amount,
router.post('/reject',verifyJWT,verifyRoles("usa"), async (req, res, next) => {
    // safe guard against sql injection
    // validate input
    if (!req.body.user_id) {
        return res.status(400).send({
            message: "user_id can not be empty"
        });
    }
    if (!req.body.amount) {
        return res.status(400).send({
            message: "amount can not be empty"
        });
    }
    // check if user exists
    dbConn.query('SELECT * FROM User WHERE User_ID=?', req.body.user_id, (err, result) => {
        if (err) {
            console.log('Error while fetching user by id', err);
        } else {
            console.log(JSON.stringify(result));
            if (result.length == 0) {
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