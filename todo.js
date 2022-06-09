const express =require('express');
const req = require('express/lib/request');
var app = express();
const { json } = require('express/lib/response');
app.use(express.json());
const port = 4300;
const fs = require('fs');
const json_data = require('./todo.json');


app.get('/',(req,res)=>{
    res.send("Welcome");
});

//Create a Todo Task
app.post('/sendData',(req,res)=>{
    let dt = new Date();
    let val={
        "id": req.body.id,
        "date_time": dt,
        "task_details": req.body.task_details,
        "has_done": req.body.has_done
    }
    json_data.push(val);
    let data = JSON.stringify(json_data);
    fs.writeFile('./todo.json',data,'utf-8',(error)=>{
        res.send(val);
    })
});

app.put('/modifyData',(req,res)=>{
    let date = new Date();
    let values={
        "id": req.body.id,
        "date_time": date,
        "task_details": req.body.task_details,
        "has_done": req.body.has_done
    }
    jsonfile.readFile("./todo.json", function(err,data) {
        var fileObj = data;
        
    })
})

//List all the todo task
app.get('/fetchData',(req,res)=>{
    res.send(json_data);
});

//Get a specific todo task details
app.get('/fetchTaskDetail/:uid',(req,res)=>{
    let task_info = json_data.find(store=> store.id === parseInt(req.params.uid));
    if(task_info){
        let saveData = JSON.stringify(task_info);
        res.send(saveData);
    }
    else{
        res.send("User not found");
    }
});

//Remove a todo task
app.delete('/removeTaskDetail/:uid',(req,res)=>{
    let task_info = json_data.find(store=> store.id === parseInt(req.params.uid));
    if(task_info){
        var key = req.params.uid - 1;
        // console.log(key);
        // delete json[key];
        json_data.splice(key,1);
        let data = JSON.stringify(json_data);
        fs.writeFile('./todo.json',data,'utf-8',(error)=>{
            res.send();
        });
        res.send("Task Information deleted successfully");
    }
    else{
        res.send("User not found");
    }
});

app.listen(port,()=>{
    console.log(`${port} port is running....`);
});