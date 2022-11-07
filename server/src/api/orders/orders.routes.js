const express = require('express');
const router = express.Router();
const dbConn = require('../../dbconnection.js');

// [Orders] Routes
// Order_ID. INT
// User_ID. INT
//Contact 
// Order_Date. DATETIME
// Order_Status. VARCHAR(255)
// ADDRESS_ID. INT
// Payment_Details_ID. INT
//updated_at. DATETIME

//[Order_Products] Table
// Order_ID. INT
// Product_ID. INT
// Quantity. INT

//[Porduct] Table
// Product_ID. INT
// Product_Name. VARCHAR(255)
// Avalibility 
// Quantity. INT


// Path: server/src/api/orders/orders.routes.js

// get all orders
// get request
// input: none
router.get('/getallorders', async (req, res, next) => {
  // safe guard against sql injection
  // validate input
  // get all orders
  dbConn.query('SELECT * FROM Orders', (err, result) => {
    if (err) {
      return res.status(400).send({
        message: "error"
      });
    }
    return res.status(200).send({
      message: "success",
      data: result
    });
  });
}
);

// get all orders by user
// get request
// input: User_ID
router.get('/getallordersbyuser/:User_ID', async (req, res, next) => {
  // safe guard against sql injection
  // validate input
  // get all orders by user
  dbConn.query('SELECT * FROM Orders WHERE User_ID=?', req.params.User_ID, (err, result) => {
    if (err) {
      return res.status(400).send({
        message: "error"
      });
    }
    return res.status(200).send({
      message: "success",
      data: result
    });
  });
}
);

// get all orders by status
// get request
// input: Order_Status
router.get('/getallordersbystatus/:Order_Status', async (req, res, next) => {
  // safe guard against sql injection
  // validate input
  // get all orders by status
  dbConn.query('SELECT * FROM Orders WHERE Order_Status=?', req.params.Order_Status, (err, result) => {
    if (err) {
      return res.status(400).send({
        message: "error"
      });
    }
    return res.status(200).send({
      message: "success",
      data: result
    });
  });
}
);

// get all orders by date
// get request
// input: Order_Date
router.get('/getallordersbydate/:Order_Date', async (req, res, next) => {
  // safe guard against sql injection
  // validate input
  // get all orders by date
  dbConn.query('SELECT * FROM Orders WHERE Order_Date=?', req.params.Order_Date, (err, result) => {
    if (err) {
      return res.status(400).send({
        message: "error"
      });
    }
    return res.status(200).send({
      message: "success",
      data: result
    });
  });
}
);

// random 8 digit order id
// const genrate_order_id = () => {


// add order
// post request
// input: User_ID, Contact, Order_Date, Order_Status, ADDRESS_ID, Payment_Details_ID
// flow of adding an order
// 1. generate order_id
// 2. add order to orders table
// 3. move products from cart to order_products table
// 4. update product quantity
// 5. delete cart
router.post('/addorder', async (req, res, next) => {
  // safe guard against sql injection
  // validate input
  // add order
  // 1. generate order_id
  const order_id = Math.floor(10000000 + Math.random() * 90000000);

  let cart_products = [];
  // get all products from cart
  dbConn.query('SELECT * FROM Cart WHERE User_ID=?', req.body.User_ID, (err, result) => {
    if (err) {
      return res.status(400).send({
        message: "error getting products from cart"
      });
    } else {
      cart_products = result;
    }
  });


  // 3. move products from cart to order_products table
  cart_products.forEach((product) => {
    dbConn.query('INSERT INTO Order_Products (Order_ID, Product_ID, Quantity) VALUES (?, ?, ?)', [order_id, product.Product_ID, product.Quantity], (err, result) => {
      if (err) {
        return res.status(400).send({
          message: "error adding products to order_products"
        });
      }
    });
  });


  // 4. update product quantity
  cart_products.forEach((product) => {
    dbConn.query('UPDATE Product SET Quantity=Quantity-? WHERE Product_ID=?', [product.Quantity, product.Product_ID], (err, result) => {
      if (err) {
        return res.status(400).send({
          message: "error updating product quantity"
        });
      }
    });
  });

  // 5. delete items from cart and make cart empty
  dbConn.query('DELETE FROM Cart WHERE User_ID=?', req.body.User_ID, (err, result) => {

    if (err) {
      return res.status(400).send({
        message: "error deleting cart"
      });
    }
    return res.status(200).send({
      message: "success",
      data: result
    });
  }
  );

  // finally add order to orders table
  // 2. add order to orders table 
  dbConn.query('INSERT INTO Orders (Order_ID, User_ID, Contact, Order_Date, Order_Status, ADDRESS_ID, Payment_Details_ID) VALUES (?, ?, ?, ?, ?, ?, ?)', [order_id, req.body.User_ID, req.body.Contact, req.body.Order_Date, req.body.Order_Status, req.body.ADDRESS_ID, req.body.Payment_Details_ID], (err, result) => {
    if (err) {
      return res.status(400).send({
        message: "error adding order"
      });
    }
  });
}
);



// update order status
// put request
// input: Order_ID, Order_Status
router.put('/updateorderstatus', async (req, res, next) => {
  // safe guard against sql injection
  // validate input
  if(!req.body.Order_ID || !req.body.Order_Status) {
    return res.status(400).send({
      message: "error order id or order status not provided"
    });
  }
  // update order status
  // check if order exists
  dbConn.query('SELECT * FROM Orders WHERE Order_ID=?', req.body.Order_ID, (err, result) => {
    if (err) {
      return res.status(400).send({
        message: "error order does not exist"
      });
    }
    // update order status
    dbConn.query('UPDATE Orders SET Order_Status=? WHERE Order_ID=?', [req.body.Order_Status, req.body.Order_ID], (err, result) => {
      if (err) {
        return res.status(400).send({
          message: "error updating order status"
        });
      }
      return res.status(200).send({
        message: "success updating order status",
        data: result
      });
    });
  });
}
);


// delete order
// delete request
// input: Order_ID
// flow of deleting an order
// 1. delete order from Order_Products table









module.exports = router;