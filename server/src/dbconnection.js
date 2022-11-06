const mysql = require('mysql');

// Host: sparkstore-db.cwghnrodrqcd.us-east-1.rds.amazonaws.com
// Port: 3306
// Username: admin
// Password: Janishcgo_5m

const dbConn = mysql.createConnection({
    host:"sparkstore-db.cwghnrodrqcd.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "admin",
    password: "Janishcgo_5m",
    database:"SparkStore",
  });
  
dbConn.connect(function(error){
    if(error) {
        console.log(error.message);
        return;
      }
    console.log('Database Connected Successfully!!!');
  })

module.exports = dbConn;