//jshint esversion:6
const express=require('express');
const axios = require('axios');
const ejs = require("ejs");
 
const url = "https://api.covid19india.org/data.json";
  
 
const app=express();
app.use(express.static( "public"));
app.set('view engine', 'ejs');
 
app.get("/",(req,res)=>{
   
 
    axios.get("https://api.covid19india.org/data.json")
    .then(response => {
      const resdata=response.data;
      // The data have lot of extra properties
      // We will filter it
      var data = [];
      for (let i = 0; i < resdata.statewise.length; i++) {
          data.push({
              "State": resdata.statewise[i].state,
 
              "Confirmed": resdata.statewise[i].confirmed,
 
              "Active": resdata.statewise[i].active,
 
              "Recovered": resdata.statewise[i].recovered,
 
              "Death": resdata.statewise[i].deaths
          });
      }
 
    //   console.log("-----Total Cases in India "
    //       + "and in each state-----");
 
     
    //   console.log(data);
      res.render("result",{data});
    })
    .catch(error => {
      console.log(error);
    });
        
    
})

app.get("/home",(req,res)=>{
    
 
    axios.get("https://api.covid19india.org/data.json")
    .then(response => {
      const resdata=response.data;
      // The data have lot of extra properties
      // We will filter it
      var data = [];
      for (let i = 0; i < resdata.statewise.length; i++) {
          data.push({
              "State": resdata.statewise[i].state,
 
              "Confirmed": resdata.statewise[i].confirmed,
 
              "Active": resdata.statewise[i].active,
 
              "Recovered": resdata.statewise[i].recovered,
 
              "Death": resdata.statewise[i].deaths
          });
      }
 
    //   console.log("-----Total Cases in India "
    //       + "and in each state-----");
 
     
    //   console.log(data);
      res.render("home",{data});
    })
    .catch(error => {
      console.log(error);
    });
        
    
})
let port =process.env.PORT;
if(port ==null || port ==""){
  port=3000;
}

app.listen(port, function() {
  console.log("Server has started on port 3000");
});