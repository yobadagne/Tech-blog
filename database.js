const mysql = require('mysql2');
// create a connection

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password : "yobadagne2nd",
    database : "login"
});

// db.connect((err)=>{
//     if (err) throw err;
//     console.log('DB Connected!')
//     db.query("show tables", (err,res)=>console.log(res))
// });
module.exports = db;