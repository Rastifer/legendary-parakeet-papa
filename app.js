require('dotenv').config()
const express = require("express");
const app = express();
const port = process.env.PORT || 5500;
const { MongoClient, ServerApiVersion } = require('mongodb');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.uri, {
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
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    const result = await client.db("papa-database").collection("papa-collection").find().toArray()

      console.log("papa-database result:", result);
    //   function(err, result) {
    //   if (err) throw err;
    //   console.log("papa-database result:", result);
    //   db.close();
    // })
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.get('/read', (req,res) => {

  let myResultServer = run()

  res.render('index', {
    myTypeClient: myTypeServer,
    myResultClient: run()
    
  })

})

app.get('/', function(req, res) {

  res.render('index', {
   
    myTypeClient: myTypeServer 

  });
  
});


app.get('/send', function (req, res) {
  
    res.send('Hello World from Express <br><a href="/">home</a>')
})

// app.listen(3000)

app.listen(port, () => {
  console.log(`nov app listening on port ${port}`)
})