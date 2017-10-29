//We are going to use express and Mongodb so here we import all of them
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;


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
  var cursor = db.collection('providers').find().toArray(function (err, results) {
    res.send(results)
    
  })
})
//This method return all the data with the firstName like a param 
app.get('/list/:firstName', (req, res) => {
  //.find() return a cursor and this have a method that is toArray that return the data
  var query = {
    firstName: req.params.firstName
  }
  var cursor = db.collection('providers').find(query).toArray(function (err, results) {
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
//this method actualize the first object from the collection that match with the name
app.put('/updateInfo/:firstName', (req, res) => {
  var userToUpdate = req.params.firstName
  db.collection('providers').updateOne({
    firstName: userToUpdate
  }, req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('Update your changes')

  })
})
//this method actualize the first name of all the objects that match with the name in the collection
app.put('/updateAllInfo/:firstName', (req, res) => {
  var usersToUpdate = req.params.firstName
  var newvalues = {
    $set: {
      firstName: req.body.firstName
    }
  };
  db.collection('providers').updateMany({
    firstName: usersToUpdate
  }, newvalues, (err, result) => {
    if (err) return console.log(err)
    console.log('Update your changes')
  })
})

app.delete('/deleteInfo/:firstName', (req, res) => {
  var userToEliminate = req.params.firstName
  db.collection('providers').deleteOne({
    firstName: userToEliminate
  }, req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('The user is deleted')
    db.close()
  })
})
app.delete('/deleteAllInfo/:firstName', (req, res) => {
  var usersToDelete = req.params.firstName
  var newvalues = {
    $set: {
      firstName: req.body.firstName
    }
  };
  db.collection('providers').deleteMany({
    firstName: usersToDelete
  }, newvalues, (err, result) => {
    if (err) return console.log(err)
    console.log('The user is deleted')
  })
})