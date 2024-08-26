var express=require("express"); 
var bodyParser=require("body-parser"); 
const mongoose = require('mongoose');
const assert=require('assert');
const path = require('path'); 
mongoose.connect('mongodb://localhost:27017/website',{ useNewUrlParser: true, useUnifiedTopology: true }); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
	console.log("connection succeeded....."); 
}) 

var app=express() 
app.use(express.static(__dirname));

app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
	extended: true
}));

/*- - - - - - - - - - - - - - - - LOGIN FORM- - - - - - - - - - - - - - - - - - - - - - -  */

app.post('/sign_up', function(req,res){ 
	var name = req.body.name; 
	var email =req.body.email; 
	var pass = req.body.password;  
	
	var data = { 
		"name": name, 
		"email":email, 
		"password":pass, 
  
	} 
db.collection('details').insertOne(data,function(err, collection){ 
		if (err) throw err; 
		console.log("Profile ID inserted Successfully"); 		
	});
		return res.redirect('main.html'); 
}) 

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

/*- - - - - - - - - - - - - - - - PURCHASE 1- - - - - - - - - - - - - - - - - - - - - - -  */

app.post('/pur1',function(req,res){
	var data = { 
		"Course purchased":"Chihuahua", 
		"Cost":"$30",
		"Exercise duration":"1 hour + Personal Trainer", 
		"Course duration":"1 Month",
        "Purchase date":"30-11-2020"
	} 
	db.collection('purchase').insertOne(data,function(err, collection){ 
		if (err) throw err; 
		console.log("Chihuahua inserted Successfully"); 	
	});
	
})

/*- - - - - - - - - - - - - - - - PURCHASE 2- - - - - - - - - - - - - - - - - - - - - - -  */

app.post('/pur2',function(req,res){
	var data = { 
		"Course purchased":"Labrador", 
		"Cost":"$49",
		"Exercise duration":"1.30 hours + Personal Trainer", 
		"Course duration":"1 Month",
        "Purchase date":"30-11-2020"
	} 
	db.collection('purchase').insertOne(data,function(err, collection){ 
		if (err) throw err; 
		console.log("Labrador inserted Successfully"); 	
	});
	
})

/*- - - - - - - - - - - - - - - - PURCHASE 3- - - - - - - - - - - - - - - - - - - - - - -  */

app.post('/pur3',function(req,res){
	var data = { 
		"Course purchased":"Mastiff", 
		"Cost":"$99", 
		"Exercise duration":"Flexible timings + Personal Trainer + Complamentary Cardio Fitness",
		"Course duration":"1 month",
        "Purchase date":"30-11-2020"
	} 
	db.collection('purchase').insertOne(data,function(err, collection){ 
		if (err) throw err; 
		console.log("mastiff inserted Successfully"); 	
	});
	
})

/*- - - - - - - - - - - - - - - - DB => PURCHASE HISTORY- - - - - - - - - - - - - - - - - - - - - - -  */

app.get('/purchasehis',function(req,res){  
	db.collection('purchase').find({},{projection:{_id:0}}).toArray(function(err,data_list){
	  assert.equal(err,null);
	  res.render('purch',{'devices':data_list})
	});
   
  })

.listen(4) 
console.log("server listening at port 4");
 