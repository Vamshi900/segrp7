const express = require('express');
const router = express.Router();
const dbConn = require('../../dbconnection.js');

// READ all orders
router.get('/', async (req, res) => {
  dbConn.query('SELECT * FROM Orders', (err, result)=>{
    if(err){
        console.log('Error while fetching orders', err);
        res.status(500);
        res.json({"error": {"message" : "Internal Server Error", "code" : "500"}});
    }else{
        console.log(JSON.stringify(result));
        res.json(result);
    }
});
});
// READ one order
router.get('/:Order_ID', async (req, res, next) => {
    try {
      let Order_ID = req.params.Order_ID
      var q1_output, q2_output;
      if (!isNaN(Order_ID)) {
          id = parseInt(Order_ID);
          q1_output = dbConn.query('SELECT * FROM Orders WHERE Order_ID=?', id, (err, result)=>{
              if(err) {
                  console.log('Error while fetching Order by id: ', err);
                  res.status(500);
                  res.json({"error": {"message" : "Internal Server Error", "code" : "500"}});
              }
              else {
                return result;
              }
          });
          q2_output = dbConn.query('SELECT * FROM Product WHERE Product_ID = (SELECT Product_ID FROM Order_Products WHERE Order_ID=?)', id, (err, result)=>{
            if(err) {
                console.log('Error while fetching Order by id: ', err);
                res.status(500);
                res.json({"error": {"message" : "Internal Server Error", "code" : "500"}});
            }
            else {
              return result;
            }
        });
        // console.log(JSON.stringify(q1_output));
        // console.log(JSON.stringify(q2_output));
        let response = Object.assign(q1_output, q2_output);
        res.json(response);
      }
      else {
          throw ('Error while fetching Product id: ID is NaN');
      }
  }
  catch(err) {
      console.log(err);
      res.status(500);
      res.json({"error": {"message" : "Internal Server Error", "code" : "500"}});
  }
});

// Create order
router.post('/create', async (req, res) => {

    try {
        res.json({
            Order_ID: 28394792387,
            Order_Detail: "This is Order Detail",
            Date: `${new Date("2022-10-29")}`,
            Order_Type: "Order Type",
          });
    } catch (error) {
        console.log(error)
    }
});

// update order
router.put('/edit/:Order_ID', async (req, res) => {

    try {
        // Query database to find object with ORDER_ID
        res.json({
            Order_ID: 28394792387,
            Order_Detail: "This is Order Detail",
            Date: `${new Date("2022-10-29")}`,
            Order_Type: "Order Type",
          });
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;