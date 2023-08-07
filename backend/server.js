const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors")

const app = express();


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))


//const connectDB = require("./config/connectDB")
const mongoose = require("mongoose");
const Task = require("./model/taskModel");

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(5000, () => {
        console.log("Server is running on port 5000");
    });
}).catch((error)=>{
    console.log(error)
})

app.get("/", (req,res)=>{
    res.send("home page")
})

//create tasks
app.post("/api/tasks", async(req, res)=>{
    try{
        const task = await Task.create(req.body)
        res.status(200).json(task)
    }catch(error){
        res.status(500).json({msg: error.message})
    }
})

//get tasks
app.get("/api/tasks", async(req,res)=>{
    try{
        const task = await Task.find()
        res.status(200).json(task)
    }catch(error){
        res.status(500).json({msg: error.message})
    }
})

//get single task
app.get("/api/tasks/:id", async(req,res)=>{
    try{
        const {id} = req.params
        const task = await Task.findById(id)
        res.status(200).json(task)
        if(!task){
            return res.status(404).json(`no task with id: ${id}`)
        }
    }catch(error){
        res.status(500).json({msg: error.message})
    }
})

//delete task
app.delete("/api/tasks/:id", async(req,res)=>{
    try{
        const {id} = req.params;
        const task = await Task.findByIdAndDelete(id)
        res.status(200).json(task)
        if(!task){
            return res.status(404).json(`no task with id: ${id}`)
        }
    }
    catch(error){
        res.status(500).json({msg: error.message})
    }
})


//update task
app.put("/api/tasks/:id", async(req, res)=>{
    try{
        const {id} = req.params
        const task =await Task.findByIdAndUpdate({_id:id}, req.body, {new: true, runValidators:true})
        res.status(200).json(task)
        if(!task){
            return res.status(404).json(`no task with id: ${id}`)
        }
    }catch(error){
        res.status(500).json({msg: error.message})
    }
})


{/*const startServer = async()=>{
    try{
        await connectDB()
        app.listen(5000, () => {
            console.log("Server is running on port 5000");
        });
    }catch(error){
        console.log(error)
    }
}
startServer();
*/}