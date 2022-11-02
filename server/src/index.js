const app = require('./app');
const mysql = require('mysql');

const db = mysql.createConnection({
  host:process.env.DB_HOST,
  port:process.env.DB_PORT,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_NAME,
})

db.connect(err=>{
  if(err) {
    console.log(err.message);
    return;
  }
  console.log("Connected to Database");
})

const port = process.env.PORT || 5000;
app.listen(port, () => {

  console.log(`Listening: http://localhost:${port}`);

});