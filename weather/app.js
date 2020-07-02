const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
var temp="";
var press="";
var vis="";
const app=express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("publiic"));
app.set('view engine','ejs');

app.get("/",function(req,res){

res.render("data",{a : temp ,b : press, c : vis});
})

app.post("/",function(req,res){
var cityName=req.body.city;

const ID="48991ca72a1faf3f966e312f19bd6623"
const url="https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid="+ ID+"";
https.get(url,function(response){
    console.log(response.statusCode);
response.on("data",function(data){
const weatherData=JSON.parse(data);
console.log(weatherData);
temp = weatherData.main.temp ;
press= weatherData.main.pressure ;
vis = weatherData.visibility;
res.redirect("/");
})
})

})



app.listen(3000,function(){
    console.log("this app is running at port : 3000");
})