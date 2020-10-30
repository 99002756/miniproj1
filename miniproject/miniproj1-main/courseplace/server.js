const app=require('express')();
 var fs = require('fs');
var users=[];
var fname,sname,uemail,upassword,rpassword;
 
app.get("/users",(req,res)=>{
    //reading the data from the form
    //console.log(name);
    fname=req.query.name;
    //console.log(sname);
    sname=req.query.secname;
    //console.log(email)
    uemail=req.query.email;
    //console.log(password)
    upassword=req.query.password;
    //console.log(retype password)
    rpassword=req.query.retype_password;

    doners.push({name:fname,sname:secname,uemail:email,upassword:password,rpassword:retype_password})
    data=JSON.stringify(users);
    //console.log(data)
    fs.writeFileSync('./usersdata.json', data)
})

//creating port 
app.listen(1234,()=>{
    console.log("Running at 1234");
})