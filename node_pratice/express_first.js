const express = require('express');
const req = require('express/lib/request');
const { json } = require('express/lib/response');
//const { json } = require('express/lib/response');
var app = express();
app.use(express.json());
const port = 4100;
//Including fs
const fs = require('fs');
//Including Json File
const js = require('./data.json');
app.get('/',function(req,res){
    res.send("Hello World!");
});

app.get('/fetchValue',(req,res)=>{
    res.send(js);
})

app.post('/sendValue',(req,res)=>{
    // console.log(req.body);
    // res.json({
    //     status:200,
    //     message:"success",
    // })
    //const val = JSON.parse(js);
    //var data = fs.readFileSync(js);
    //var parse = json.parse(data);
    let val={
        "id": req.body.id,
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "email": req.body.email,
        "password":req.body.password
    };
    js.push(val);
    let val1=JSON.stringify(js);
    //callback.....
    fs.writeFile("./data.json",val1,"utf-8",(error)=>{
        res.send(val);
    });
});
app.listen(port,()=>{
    console.log(`node is runnning ${port}`);
})