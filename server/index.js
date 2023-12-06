
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

const uri = "mongodb+srv://manjusha:Manjusha123@projects.n1hsxeo.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //create collection of docs
    const booksCollection = client.db("BookInventory").collection("books");
    
    //insert book
    app.post("/upload-book", async(req, res) => {
      const data = req.body;
      const result = await booksCollection.insertOne(data);
      res.send(result);
    } )

    //get all books 
    // app.get("/all-books", async(req, res) => {
    //   const books = booksCollection.find();
    //   const result = await books.toArray();
    //   res.send(result);
    // })

    //update books
    app.patch("/books/:id", async(req, res) => {
      const id = req.params.id;
      const updateBookData = req.body;
      const filter = {_id : new ObjectId(id)};
      const options = {upsert : true};
      const updateDoc = {
        $set: {
          ...updateBookData
        }
      }
      const result = await booksCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    })

    //delete books
    app.delete("/books/:id", async(req, res) => {
      const id=req.params.id;
      const filter = {_id : new ObjectId(id)};
      const result = await booksCollection.deleteOne(filter);
      res.send(result);
    })

    //find by filter
    app.get("/all-books", async(req, res) => {
      let query = {};
      if(req.query?.category){
        query =  {category: req.query.category}
      }
      const result = booksCollection.find(query).toArray();
      res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);


// Endpoint
app.listen(port, () => {
  console.log(`Connected to port ${port}`)
})