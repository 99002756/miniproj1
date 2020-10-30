const app=require('express')();
const { group } = require('console');
var fs = require('fs');
var data=require("./donersdata.json");

app.get("/searchByGroup", function(req, res)
{
    var searchgroup = [];
    var bgroup = req.query.bg;
    //searchgroup = [];
    data.forEach(element =>
    {
        if(bgroup == element.group)
        {
            searchgroup.push(element); // this will only send name of the hotel, for full detail use push(element)
        }
    });
    if(searchgroup.length==0)
      {
          var msg="No donor Available";
          res.send(msg);
      }
     else{
        res.send(searchgroup);
     }
     
})
app.listen(3333,()=>{
    console.log("Running at 3333");
})
