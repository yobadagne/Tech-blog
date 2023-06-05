const express = require("express")
const db = require('./database');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
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
    //console.log(req.body)
    //res.send("recieved")
    First_name = req.body.First_name;
    Last_name = req.body.Last_name;
    email = req.body.email;
    Birth_day = req.body.Birth_day;
    password = req.body.password;
    const sqlCheck = "select * from users where email = ?" ;
    db.query(sqlCheck,[email], (err,result)=>{
        if(result[0])
        {
           // console.log(result);
            res.send("A user is already register with this email please login");
        }
        else 
        {
            bcrypt.genSalt(7,(err,salt)=>{
                bcrypt.hash(password,salt ,(err,hash)=>{
                    const sqlInsert = "Insert into users (First_name, Last_name,Birth_day,email,password) values (?,?,?,?,?)";
                    db.query(sqlInsert,[First_name,Last_name,Birth_day,email,hash], (err,result)=>{
                        if (err) console.log(err);
                        //console.log(result);
                        else {res.send("recieved")}
                        });
                    })
                })
        }
    })

//salt and hash password

   
    })

// stroing into database
    
    // const sqlInsert = "Insert into users (First_name, Last_name,Birth_day,email,password) values (?,?,?,?,?)";
    // db.query(sqlInsert,[First_name,Last_name,Birth_day,email,hash], (err,result)=>{
    //     if (err) console.log(err);
    //     console.log(result);
    //     });

app.get("/login", (req,res)=>{
   email = req.body.email;
    password = req.body.password;
    sqlSelect = "select password from users where email = ?";
    db.query(sqlSelect,[email],(err, result)=>{
        console.log(result[0].password);
        hashed = result[0].password;
        bcrypt.compare(password, hashed, (err,result)=>{
            if (result) res.send("Access Granted");
            else res.send("please enter the correct password");
        })
       
    })
})
// a home page that returns the whole blog in the blogs table for loggin or logged out user
// app.get("/home", (req,res)=>{res.send(select all from blogs table)})
// a tech blog by a logged in user 
app.post("/newblog", (req,res)=>{
    title = req.body.title;
    content = req.body.content;
    email =req.body.email;
    sqlFind = "select user_id from users where email = ?";
    db.query(sqlFind, [email], (err1, result1)=>{ 
        console.log(result1);
    
    sqlInsert = "Insert into blogs (Blog_title, Blog_content,user_id) values (?,?,?)";
    db.query(sqlInsert, [title, content, result1[0].user_id], (err2, result2)=>{
    if (err2) console.log(err2);
    else {res.send("Blog saved");}
    })})
})
app.listen(3000)