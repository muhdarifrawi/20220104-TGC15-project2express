const express = require("express");
const app = express();
const objectId = require("mongodb").ObjectId;
const MongoUtil = require("./MongoUtil.js");
const cors = require("cors");

require("dotenv").config();

// app.get("/", (req,res)=>res.send(("Welcome to the main page." + process.env.MONGO_URL)))

// app.get("/hello/:name", (req,res)=>{
//     let name = req.params.name;
//     res.send("Hello, "+ name)
// })
app.use(express.json());
app.use(cors());


async function main() {
  await MongoUtil.connect(process.env.MONGO_URL, 'express-project');
  let db = MongoUtil.getDB();

  app.get("/", async (req, res) => {

    let mainDB = await db
      .collection("main")
      .find()
      .toArray();
    console.log(mainDB);
    res.send(mainDB);
  });

  app.post("/products", async (req, res) => {
    console.log(req.body);
    let date = new Date(req.body.date) || new Date();
    let user = req.body.user;
    let itemName = req.body.itemName;
    let category = req.body.category;
    let itemDescription = req.body.itemDescription;

    try {
      let result = await db.collection("main").insertOne({
        date: date,
        user: user,
        itemName: itemName,
        category: category,
        itemDescription: itemDescription,
      });
      res.status(200);
      res.send(result);
    }
    catch (e) {
      res.status(500);
      res.send({
        error: "Internal server error. Please contact site administrator."
      })
      console.log(e);
    }

  });

  app.delete("/products/:id", async (req, res) => {
    try {
      let result = await db.collection("main").remove({
        _id: ObjectId(req.params.id)
      });
      res.status(200);
      res.send({
        message:"Data deleted okay."
      });
    }
    catch (e) {
      res.status(500);
      res.send({
        error: "Internal server error. Please contact site administrator."
      })
      console.log(e);
    }
  });

}

main();

app.listen(3000, () => console.log("Server Ready"))