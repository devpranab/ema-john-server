const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3010;

app.get("/", (req, res) => {
  res.send("Server Running");
});

//MongoDB Start
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.i8jndut.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const productsCollection = client.db("emaJohnDb").collection("products");
  // perform actions on the collection object
  console.log("db connected");

  //POST
  app.post("/addProduct", (req, res) => {
    const product = req.body;
    productsCollection.insertOne(product)
    .then(res => {
        console.log(res);
    })
  });
});
//MongoDB End

app.listen(port, () => {
  console.log(`App listening at http://localhost:3008`);
});
