const express = require("express")
const db = require('./database');
const bodyParser = require('body-parser');
const app = express()

//app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())
//Routes
app.get("/", (req,res)=>{
    res.render("index.ejs")
} )

//end of routes

//database connection
//db.query("show tables", (err,res)=>console.log(res))
   
app.post("/register", (req,res)=>{
    console.log(req.body)
    res.send("recieved")
    First_name = req.body.First_name;
    Last_name = req.body.Last_name;
    email = req.body.email;
    Birth_day = req.body.Birth_day;
    password = req.body.password;

    const sqlInsert = "Insert into users (First_name, Last_name,Birth_day,email,password) values (?,?,?,?,?)";
    db.query(sqlInsert,[First_name,Last_name,Birth_day,email,password], (err,result)=>{
        if (err) console.log(err);
        console.log(result);
    });
})

app.listen(3000)