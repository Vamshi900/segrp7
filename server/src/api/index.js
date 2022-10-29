const express = require("express");
const orders = require("./orders/orders.routes")


const router = express.Router();

// API overview:
router.get("/", (req, res) => {
  res.json({
    message: "Hello World (API Overview)",
  });
});


router.use('/orders', orders)



module.exports = router;