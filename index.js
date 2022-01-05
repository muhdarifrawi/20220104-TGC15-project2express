const express = require("express");
const app = express();

app.get("/", (req,res)=>res.send(("Welcome to the main page.")))

app.get("/hello/:name", (req,res)=>{
    let name = req.params.name;
    res.send("Hello, "+ name)
})

app.listen(3000,()=>console.log("Server Ready"))