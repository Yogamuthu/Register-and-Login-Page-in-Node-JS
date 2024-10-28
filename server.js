var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/shoe_shop');

var db = mongoose.connection;
db.on('error', function(){
    console.log("db error");
})
db.on('open', function(){
    console.log("connection succeeded");
})

var app = express();
app.use(express.static('public'));
app.use(express.static('view'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.get("/index.html",function(req,res){
    res.sendFile(__dirname+"/view/index.html");
})


app.post('/login.html', function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    var cpassword = req.body.cpassword;
  
    var data = {      
        "user_name":username,
        "password":password,
        "confirm_password":cpassword
       
    }
    db.collection("details").insertOne(data);
    res.sendFile(__dirname+"/view/login.html")
})


app.post('/home.html',async (req,res) => {

    const check = await
db.collection('details').findOne({user_name : req.body.username})

if (check.confirm_password === req.body.password){
    res.sendFile(__dirname+"/view/home.html")
}
else {
    res.send("<h1>incorrect password</h1>")
}


}

)

app.listen(3003, function(){
    console.log("server listening at port 3003");
});
