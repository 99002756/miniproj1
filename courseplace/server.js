const app=require('express')();
 var fs = require('fs');
var users=[];
var uname,second,pwd,secpwd,data;
var sub;
function fillData(){
    users=JSON.parse(fs.readFileSync("./donersdata.json","utf-8"));
}
app.get("/users",(req,res)=>{
    //reading the data from the form
    uname=req.query.name;
    //console.log(sname);
    second=req.query.sname;
    //console.log(sage)
    //console.log(sgender)
   // email=req.query.uemail;
    //console.log(slocation)
    pwd=req.query.upassword;
    console.log(pwd)
    secpwd=req.query.rpassword;
    //console.log(bgroup)
    sub=req.query.uCourse;
    users.push({name:uname,sname:second,pwd:pwd,secpwd:secpwd,uCourse:sub})
    data=JSON.stringify(users);
    //console.log(data)
    fs.writeFileSync('./donersdata.json', data)
})
app.get("/searchByCourse", function(req, res)
{
    var searchCourse = [];
    var details = req.query.course;
    if(users.length==0)
        fillData()
    users.forEach(element =>
    {
        if(details == element.uCourse)
        {
            searchCourse.push(element.name,element.sname);
        }
    });
    if(searchCourse.length==0)
      {
          var msg="No course";
          res.send(msg);
      }
     else{
        res.send(searchCourse);
     }
     
})
app.listen(1234,()=>{
    console.log("Running at 1234");
})
