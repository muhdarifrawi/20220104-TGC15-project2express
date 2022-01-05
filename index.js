const express = require("express");
const app = express();
const MongoUtil = require("./MongoUtil.js");

require("dotenv").config();

// app.get("/", (req,res)=>res.send(("Welcome to the main page." + process.env.MONGO_URL)))

// app.get("/hello/:name", (req,res)=>{
//     let name = req.params.name;
//     res.send("Hello, "+ name)
// })


async function main(){
    await MongoUtil.connect(process.env.MONGO_URL, 'express-project');

    app.get("/", async (req, res) => {
        let db = MongoUtil.getDB();
        let mainDB = await db
            .collection("main")
            .find()
            .toArray();
        console.log(mainDB);
        res.send(mainDB);
      });

    app.listen(3000,()=>console.log("Server Ready"))
}

main();

