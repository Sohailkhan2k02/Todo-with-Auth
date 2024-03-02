const express=require("express");
const { createTodo, updateTodo } = require("./types");
const { todo }=require("./db");
const app=express();

app.use(express.json());

app.post("/todo", async function(req,res){
    const createPayload=req.body;
    const parsePayload=createTodo.safeParse(createPayload);
    if(!parsePayload.success){
        res.status(411).json({
            msg:"Invalid inputs"
        })
        return;
    }

    await todo.create({
        title:createPayload.title,
        description:createPayload.description,
        completed:false
    })
    res.json({
        msg:"Todo created successfully!"
    })
})

app.get("/todos", async function(req,res){
    const todos=await todo.find({});
    res.json({
        todos
    })
})

app.put("/completed", async function(req,res){
    const updatePayload=req.body;
    const parseupdatePayload=updateTodo.safeParse(updatePayload);
    if(!parseupdatePayload.success){
        res.status(403).json({
            msg:"Invalid inputs"
        })
        return;
    }

    await todo.update({
        _id: req.body.id
    },{
        completed:true
    })

    res.json({
        msg: "Todo marked is completed"
    })
})

app.listen(3000);