const express = require('express');
const router = express.Router();
const dbConn = require('../../dbconnection.js');

//[cart] Routes
// User_ID. INT
// Product_ID. INT
// Quantity. INT
// DATE_ADDED. DATETIME


// Path: server/src/api/cart/cart.routes.js

// add to cart
// post request
// input: user_id, product_id, quantity
router.post('/addtocart', async (req, res, next) => {
    // safe guard against sql injection
    // validate input
    // check if user exists
    // add Date_Added to the request body
    let d = new Date();
    req.body.Date_Added = d;
    if (!req.body.user_id) {
        return res.status(400).send({
            message: "user_id can not be empty"
        });
    }
    if (!req.body.product_id) {
        return res.status(400).send({
            message: "product_id can not be empty"
        });
    }
    if (!req.body.quantity) {
        return res.status(400).send({
            message: "quantity can not be empty"
        });
    }
    // check if user exists
    dbConn.query('SELECT * FROM User WHERE User_ID=?', req.body.user_id, (err, result) => {
        if (err) {
            return res.status(400).send({
                message: "user does not exist"
            });
        }
        // check if product exists
        dbConn.query('SELECT * FROM Product WHERE Product_ID=?', req.body.product_id, (err, result) => {
            if (err) {
                return res.status(400).send({
                    message: "product does not exist"
                });
            }
            // add to cart
            dbConn.query('INSERT INTO Cart SET ?', req.body, (err, result) => {
                if (err) {
                    return res.status(400).send({
                        message: "product already in cart"
                    });
                }
                return res.status(200).send({
                    message: "product added to cart"
                });
            });
        });
    });
}
);




// delete from cart
// delete request
// input: user_id, product_id
router.delete('/deletefromcart', async (req, res, next) => {
    // safe guard against sql injection
    // validate input
    // check if user exists
    if (!req.body.user_id) {
        return res.status(400).send({
            message: "user_id can not be empty"
        });
    }
    if (!req.body.product_id) {
        return res.status(400).send({
            message: "product_id can not be empty"
        });
    }
    // check if user exists
    dbConn.query('SELECT * FROM User WHERE User_ID=?', req.body.user_id, (err, result) => {
        if (err) {
            return res.status(400).send({
                message: "user does not exist"
            });
        }
        // check if product exists
        dbConn.query('SELECT * FROM Product WHERE Product_ID=?', req.body.product_id, (err, result) => {
            if (err) {
                return res.status(400).send({
                    message: "product does not exist"
                });
            }
            // delete from cart
            dbConn.query('DELETE FROM Cart WHERE User_ID=? AND Product_ID=?', [req.body.user_id, req.body.product_id], (err, result) => {
                if (err) {
                    return res.status(400).send({
                        message: "product not in cart"
                    });
                }
                return res.status(200).send({
                    message: "product deleted from cart"
                });
            });
        });
    });
}
);



// update quantity
// put request
// input: user_id, product_id, quantity
router.put('/updatequantity', async (req, res, next) => {
    // safe guard against sql injection
    // validate input
    // check if user exists
    if (!req.body.user_id) {
        return res.status(400).send({
            message: "user_id can not be empty"
        });
    }
    if (!req.body.product_id) {
        return res.status(400).send({
            message: "product_id can not be empty"
        });
    }
    if (!req.body.quantity) {
        return res.status(400).send({
            message: "quantity can not be empty"
        });
    }
    // check if user exists
    dbConn.query('SELECT * FROM User WHERE User_ID=?', req.body.user_id, (err, result) => {
        if (err) {
            return res.status(400).send({
                message: "user does not exist"
            });
        }
        // check if product exists
        dbConn.query('SELECT * FROM Product WHERE Product_ID=?', req.body.product_id, (err, result) => {
            if (err) {
                return res.status(400).send({
                    message: "product does not exist"
                });
            }
            // update quantity
            dbConn.query('UPDATE Cart SET Quantity=? WHERE User_ID=? AND Product_ID=?', [req.body.quantity, req.body.user_id, req.body.product_id], (err, result) => {
                if (err) {
                    return res.status(400).send({
                        message: "product not in cart"
                    });
                }
                return res.status(200).send({
                    message: "quantity updated in cart"
                    
                });
            });
        });
    });
}
);

// get cart
// get request
// input: user_id
router.get('/:user_id', async (req, res, next) => {
    let user_id = req.params.user_id;

    // safe guard against sql injection
    // validate input
    // check if user exists
    if (!user_id) {
        return res.status(400).send({
            message: "user_id can not be empty"
        });
    }
    // check if user exists
    dbConn.query('SELECT * FROM User WHERE User_ID=?', user_id, (err, result) => {
        if (err) {
            return res.status(400).send({
                message: "user does not exist"
            });
        }
        // get product details from product table and send to front end
        dbConn.query('SELECT * FROM Product WHERE Product_ID IN (SELECT Product_ID FROM Cart WHERE User_ID=?)', user_id, (err, result) => {
            if (err) {
                return res.status(400).send({
                    message: "cart is empty"
                });
            }
            return res.status(200).send({
                message: "cart fetched",
                data: result
            });
        }
        // get cart
        // dbConn.query('SELECT * FROM Cart WHERE User_ID=?', user_id, (err, result) => {
        //     if (err) {
        //         return res.status(400).send({
        //             message: "cart is empty"
        //         });
        //   
        );
    });
}
);

router.post('/checkout/:user_id', async (req, res, next) => {
    let user_id = req.params.user_id;

    // safe guard against sql injection
    // validate input
    // check if user exists
    if (!user_id) {
        return res.status(400).send({
            message: "user_id can not be empty"
        });
    }
    // check if user exists
    dbConn.query('SELECT * FROM User WHERE User_ID=?', user_id, (err, result) => {
        if (err) {
            return res.status(400).send({
                message: "user does not exist"
            });
        }
        // get cart
        dbConn.query('SELECT * FROM Cart WHERE User_ID=?', user_id, (err, result) => {
            if (err) {
                return res.status(400).send({
                    message: "cart is empty"
                });
            }

            var product_ids = new Array();
            var quantity = new Array();
            for (i = 0; i < result.length; i++) {
                product_ids.push(Number(result[i].Product_ID))
                quantity.push(Number(result[i].Quantity))
            }

            dbConn.query('SELECT * FROM Product WHERE Product_ID IN (' + dbConn.escape(product_ids) + ')', (err, result) => {
                if (err) {
                    return res.status(500).send({
                        message: "Error!"
                    });
                }

                var total = 0;
                var sub_total = 0;
                var delivery_fee = 0;
                var tax = 0;
                for (j = 0; j < result.length; j++) {
                    if (result[j].Product_ID != product_ids[j]) {
                        return res.status(500).send({
                            message: "Product not available:" + result[j].Product_Name
                        });
                    }
                    if (Number(result[j].Quantity) < quantity[j]) {
                        return res.status(500).send({
                            message: "Product out of stock!"
                        });
                    }
                    sub_total = sub_total + (Number(result[j].Price) * quantity[j]);
                }
                // shipping fee calculation
                // if total is greater than or equal to 35 no charges
                // else 5% of the total is charged for delivery.
                if (sub_total < 35) {
                    delivery_fee = 0.05 * sub_total;
                }

                tax = sub_total * 0.10;
                total = sub_total + delivery_fee + tax;

                var discount = 0;
                //validate coupon and apply discount
                if(req.body.coupon_id){
                    dbConn.query('SELECT * FROM Coupon WHERE Coupon_ID = ?', req.body.coupon_id, (err, output) => {
                        if(output) {
                            if(output[0].Redeemed == "NO") {
                                discount = (sub_total * Number(output[0].discount_percent))/100;
                                total = total - discount;
                                return res.json({ "sub total": sub_total, "delivery fee": delivery_fee, "tax": tax, "discount": discount, "total": total, "products": result });
                            }
                        }
                    });
                }
                else{
                    res.json({"sub_total":sub_total, "delivery_fee":delivery_fee, "tax": tax,  "discount": discount, "total": total, "products": result});
                }
            });
        });
    });
}
);

module.exports = router;
