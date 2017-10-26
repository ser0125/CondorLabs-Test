
//We are going to use express, bodyParser and Mongodb so here we import all of them
const express = require('express');
//We need to import bodyparser to handle the inputs in the form
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient

const app = express();

// Express allow to use bodyparser to parse the HTTP request body
app.use(bodyParser.urlencoded({extended: true}))

var db
MongoClient.connect('mongodb://sergioll:sergioll@ds235775.mlab.com:35775/evercheck-test-sergio-llanos', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
    var query = { firstName: "Sergio" };
      //.find() return a cursor and this have a method that is toArray that return the data
    var cursor = db.collection('providers').find(query).toArray(function(err, results) {
        console.log(results)
        
      })
})
  
  app.post('/saveInfo', (req, res) => {
    db.collection('providers').save(req.body, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/')
      })
  })
