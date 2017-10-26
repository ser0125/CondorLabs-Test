
//We are going to use express and Mongodb so here we import all of them
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

const app = express()
app.use(bodyParser.json())

//Here we connect to the database
var db
MongoClient.connect('mongodb://sergioll:sergioll@ds235775.mlab.com:35775/evercheck-test-sergio-llanos', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})
  //This method return all the data from providers
  app.get('/list', (req, res) => {
    //.find() return a cursor and this have a method that is toArray that return the data
    var cursor = db.collection('providers').find().toArray(function(err, results) {
        res.send(results)
      })
})
//This method return all the data with the firstName like a param 
app.get('/list/:firstName', (req, res) => {
    //.find() return a cursor and this have a method that is toArray that return the data
    var query = {firstName: req.params.firstName}
    var cursor = db.collection('providers').find(query).toArray(function(err, results) {
        res.send(results)
      })
})
  //this method save in to the database
  app.post('/saveInfo', (req, res) => {
    db.collection('providers').save(req.body, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/list')
      })
  })
  //this method actualize one object from the collection
  app.put('/updateInfo/:id', (req, res) => {
    var userToUpdate = req.params.id
    db.collection('providers').updateOne({ _id: ObjectId(userToUpdate)},req.body, (err, result) => {
        if (err) return console.log(err)
        console.log('Update your changes')
        res.send( (err === null) ? {msg: ''} : {msg: err}
    );
      })
  })
