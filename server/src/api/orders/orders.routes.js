const express = require('express');

const router = express.Router();


// READ all orders
router.get('/', async (req, res) => {

    if (req.query.search){
        //search database
        res.json([{
            Order_ID: "292387",
            Order_Detail: "This is Order Detail",
            Date: `${new Date("2022-10-29")}`,
            Order_Type: "Order Type",
          }]);
    } else{
    res.json([{
        Order_ID: "292387", 
        Order_Detail: "This is Order Detail",
        Date: `${new Date("2022-10-29")}`,
        Order_Type: "Order Type",
      },{
        Order_ID: "23423",
        Order_Detail: "This is Order Detail",
        Date: `${new Date("2022-10-12")}`,
        Order_Type: "Order Type",
      },{
        Order_ID: "9843",
        Order_Detail: "This is Order Detail",
        Date: `${new Date("2022-10-8")}`,
        Order_Type: "Order Type",
      }]);
    }

});
// READ one order
router.get('/:Order_ID', async (req, res, next) => {
    let Order_ID = req.params.Order_ID

    if (!isNaN(Order_ID)) {
        id = parseInt(Order_ID)
      /*
        Query Database
      */
     //Temporary Test Data:
        res.json({
            Order_ID: "28394792387",
            Order_Detail: "This is Order Detail",
            Date: `${new Date("2022-10-29")}`,
            Order_Type: "Order Type",
          });
    } else {
    // return status 404 and empty array
    res.statusCode = 404
    res.json([]);
    }
});

// Create order
router.post('/', async (req, res) => {

    try {
        res.json({
            Order_ID: "28394792387",
            Order_Detail: "This is Order Detail",
            Date: `${new Date("2022-10-29")}`,
            Order_Type: "Order Type",
          });
    } catch (error) {
        console.log(error)
    }
});

// update order
router.put('/:Order_ID', async (req, res) => {

    try {
        // Query database to find object with ORDER_ID
        res.json({
            Order_ID: "28394792387",
            Order_Detail: "This is Order Detail",
            Date: `${new Date("2022-10-29")}`,
            Order_Type: "Order Type",
          });
    } catch (error) {
        console.log(error)
    }
});





module.exports = router;