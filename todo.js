const express =require('express');
const req = require('express/lib/request');
var app = express();
const { json } = require('express/lib/response');
app.use(express.json());
const port = 4300;
const fs = require('fs');
const fss = require('fs').promises;
const json_data = require('./todo.json');


app.get('/',(req,res)=>{
    res.send("Welcome");
});

//Create a Todo Task
app.post('/sendData', async(req,res)=>{
    let dt = new Date();
    let lastElement = '';
    if(json_data.length!=0){
        lastElement = json_data[json_data.length-1].id;
    }
    else{
        lastElement = 0;
    }
    let autoincrement_id= lastElement+1;
    let done ="";
    if(req.body.has_done == true){
        done = "Done";
    }
    else{
        done = "Not done";
    }
    let val={
        "id": autoincrement_id,
        "date_time": dt,
        "task_details": req.body.task_details,
        "has_done": done
    }
    if(val.task_details && val.has_done){
        json_data.push(val);
        let data = JSON.stringify(json_data);
    // fs.writeFile('./todo.json',data,'utf-8',(error)=>{
    //     res.send(val);
    // })
    fss.writeFile('./todo.json',data,'utf-8');
    res.send("Data added successfully");
    }
    else{
    res.send("Failed to add data");
    }
    
});

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

//Get the list of task that are done
app.get('/fetchtaskinfo/:slug',async (req,res)=>{
    let val= await fss.readFile('./todo.json','utf-8');
    let val_json_data= JSON.parse(val);
    //console.log(val_json_data);
    let task_info = val_json_data.filter(store=> store.has_done === req.params.slug);
    //console.log(task_info);
    if(task_info){
        //let saveData = JSON.stringify(val_json_data);
        res.send(task_info);
    }
    else{
        res.send("User not found");
    }
});

//Get the list of task that are expired.
app.get('/expireddate',async(req,res)=>{
    let dt = new Date();
    let array_read= await fss.readFile('./todo.json','utf-8');
    let val_jsonarray_data= JSON.parse(array_read);
    //console.log(val_jsonarray_data);
    let arr_date=[];
    let datetime = val_jsonarray_data.map(function(item){
        //return(item['date_time']);
        let convert_date = Date.parse(item['date_time']);
        //console.log(convert_date);
        let today_date = dt.getTime();
        //console.log(today_date);
        if( convert_date < today_date){
            arr_date.push(item); 
        }
    });
    res.send(arr_date);
    //res.send("stop...");
});


//Remove a todo task
app.delete('/removeTaskDetail/:uid',async (req,res)=>{
    let val = req.params.uid;
    let index = -1;
    let obj = json_data.find(function(item,i){
        if(item.id == val){
            index= i;
            return true;
        }
    });

    if(obj === undefined){
        res.send("Failed to delete");
    }
    else{
        json_data.splice(index,1);
        let data = JSON.stringify(json_data);
        // fs.writeFile('./todo.json',data,'utf-8',(error)=>{
        //     res.send("deleted successfully");
        // });
        await fss.writeFile('./todo.json',data,'utf-8');
        res.send("deleted successfully");
    }
});

//Update a todo task
app.put('/editTaskDetails/:uid',(req,res)=>{
    let dat = new Date();
    let get_task_details = json_data.find(store=> store.id === parseInt(req.params.uid));
    let save_task_info = '';
    let check_done='';
    if(get_task_details){
        let index= json_data.findIndex(obj=>obj.id===parseInt(req.params.uid));
        //console.log(req.body);
        let fetch_id = get_task_details.id;

        if(req.body.task_details === undefined || ''){
             save_task_info = get_task_details.task_details; 
        }
        else{
             save_task_info = req.body.task_details;
        }
        if(req.body.has_done === undefined || ''){
            check_done = get_task_details.has_done; 
       }
       else{
            check_done = req.body.has_done;
       }
        let value ={
            "id": fetch_id,
            "date_time": dat,
            "task_details": save_task_info,
            "has_done": check_done
        }
        //console.log(value);
        //res.json(saveData.id);
        if(value.task_details || value.has_done){
        json_data[index]=value;

        //write json file...........
        let data = JSON.stringify(json_data);
        fss.writeFile('./todo.json',data,'utf-8');
        res.send("Data updated successfully");
        }
        else{
        res.send("Failed to update data");
        }
    }
    else{
        res.send("User not found");
    }
});

app.listen(port,()=>{
    console.log(`${port} port is running....`);
});