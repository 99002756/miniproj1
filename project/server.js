const app=require('express')();
const parser=require("body-parser");

const fs = require('fs');
const {dirname}=require('path');
app.use(parser.urlencoded({extended:true}));
app.use(parser.json());

var users=[];
let arr = [];
var uname,second,pwd,secpwd,data,uname1,upwd1;
var sub;
var course = [];
//let lon=document.querySelector('#login')
//document.body.style.backgroundImage="url('bg.jpg')";
function fillData(){
    const filename8 = "./registerdata.json";
    const jsonData = JSON.stringify(users);

    fs.writeFileSync(filename8, jsonData, 'utf-8');
    //users=JSON.parse(fs.readFileSync("./registerdata.json","utf-8"));
}
app.get("/users",(req,res)=>{
    //reading the data from the form
    let body = req.body;
    uname=req.query.name;
    second=req.query.sname;
    pwd=req.query.upassword;
    console.log(pwd)
    secpwd=req.query.rpassword;
    sub=req.query.uCourse;
    users.push({name:uname,sname:second,pwd:pwd,secpwd:secpwd,uCourse:sub})
    console.log(users)

    //users.push(users);
        fillData();
        res.send("Player added successfully");

    

    // fs.writeFileSync(filename2, jsonData2, 'utf-8');
    res.sendFile(__dirname + '/login.html');
    //res.send("Course added succesfully");
})

app.post("/userslogin",(req,res)=>{
    uname1=req.query.userName;
    upwd1=req.query.password;
    console.log(uname);
})
// app.get("/search1", function(req, res)
// {
//     fillData();
// console.log(users);
// res.send(JSON.stringify(users));
// })    
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
            searchCourse.push(element.name,element.uCourse);
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
//admin server


function readData(){
    const filename = "course.json";//new file... 
    const jsonContent = fs.readFileSync(filename, 'utf-8');
    course = JSON.parse(jsonContent);
}
 
function saveData(){
    const filename = "course.json";
    const jsonData = JSON.stringify(course);
    fs.writeFileSync(filename, jsonData, 'utf-8');
}
app.get("/course", (req, res)=>{
    readData();
    res.send(JSON.stringify(course));    
})
 
app.get("/course/:id", (req, res)=>{
    const courseid = req.params.id;
    if(course.length == 0){
        readData();
    }
    let foundRec = course.find((e) => e.courseId == courseid);
    if(foundRec == null)
        throw "course not found";
    res.send(JSON.stringify(foundRec))
})
 
app.put("/course", (req, res)=>{
    if(course.length == 0)
        readData();//Fill the array if it is not loaded....
    let body = req.body;
    //iterate thro the collection
    for (let index = 0; index < course.length; index++) { 
        let element = course[index];
        if (element.courseId == body.courseId) {//find the matching record
            element.courseTitle = body.courseTitle;
            // element.bookAuthor = body.bookAuthor;
            
            saveData();
            res.send("Course updated successfully");
        }
    }
    //update the data
    //exit the function....
})
 
app.post('/course', (req, res)=>{
    //res.send("iam here");
    // if (course.length == 0){
    //     //res.send("iam here");
    //      readData();
    // res.send("iam late"); 
    //  }//Fill the array if it is not loaded....
    console.log(course);
    let body = req.body;//parsed data from the POST...
    course.push(body);  
    saveData();//updating to the JSON file...
    res.send("course added successfully");
})
/*
app.delete("/books/:id", (req, res)=>{
const reqid=req.params.id;
const index=indexOf(reqid);
books.splice(index,1);
if(err)
res.send(err);
res.json(books);
})
*/
app.delete("/course/:id", (req, res) => {
    if (course.length == 0)
        readData(); 
    //let body = req.body; 
    var flag=1;
    const courseid = req.params.id;
    for (let index = 0; index < course.length; index++) {
        let element = course[index];
        if (element.courseId == courseid) { 
            users.splice(index,1);
            res.send("Course Deleted Successfully");
            saveData();
            readData();
            flag = 0;
        }
     }
     if (flag >= 1) {
        res.send("Error in Deleting");
    }
})
app.listen(4321,()=>{
    console.log("Running at 4321");
})
