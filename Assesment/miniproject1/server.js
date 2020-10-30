const app=require('express')();
 var fs = require('fs');
var doners=[];
var sname,sage,sgender,slocation,number,bgroup,data;
 
app.get("/users",(req,res)=>{
    //reading the data from the form
    sname=req.query.name;
    //console.log(sname);
    sage=req.query.age;
    //console.log(sage)
    sgender=req.query.gender;
    //console.log(sgender)
    slocation=req.query.city;
    //console.log(slocation)
    number=req.query.phone;
    //console.log(number)
    bgroup=req.query.bloodgroup;
    //console.log(bgroup)
    doners.push({name:sname,age:sage,gender:sgender,location:slocation,
    pnumber:number,group:bgroup})
    data=JSON.stringify(doners);
    //console.log(data)
    fs.writeFileSync('./donersdata.json', data)
})

//creating port 
app.listen(1234,()=>{
    console.log("Running at 1234");
})