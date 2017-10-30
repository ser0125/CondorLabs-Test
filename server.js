//We are going to use express and Moongose so here we import all of them
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');  
var db

const app = express()
app.use(bodyParser.json())

//Here we connect to the database
var db
mongoose.connect('mongodb://sergioll:sergioll@ds235775.mlab.com:35775/evercheck-test-sergio-llanos', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

var Schema = mongoose.Schema; 

var providerSchema = new Schema({
firstName : String,
lastName : String,
middleName : String,
email : String,
 specialty : {
  name: String,
  createdBy: Number,
  createdAt: Date,
  updatedBy: Number,
  updatedAt: Date
},
projectedStartDate: Number,
employerId: Number,
providerType: String,
staffStatus: String,
assignedTo: Number,
status: String,
createdBy: Number,
createdAt: Date,
updatedBy: Number,
updatedAt: Date
})

var providers = mongoose.model("Providers",providerSchema);

//This method return all the data from providers
app.get('/list', (req, res) => {
  providers.find(function(err, results) {
    res.send(results)
  })
})
//This method return all the data with the firstName like a param 
app.get('/list/:firstName', (req, res) => {
  providers.find({firstName : req.params.firstName},function(err, results) {
    res.send(results)
  })
})

//this method save in to the database
app.post('/saveInfo', (req, res) => {
  var provider = new providers({
    firstName: req.body.firstName,
    lastName :req.body.lastName,
    middleName : req.body.middleName,
    email : req.body.email,
  });
  provider.save(function() {
      res.send("Your data is saved");
    })
  })

//this method actualize the first object from the collection that match with the name
  app.put('/updateInfo/:firstName', (req, res) => {
    providers.findOne({firstName: req.params.firstName}, (err, provider) => {
      if (err)  return handleError(err)
      provider.firstName = req.body.firstName
      provider.save(function() {
        res.send("Your data is actualized");
      })
    })
  })
  //this method actualize all the objects from the collection from the collection that match with the name
  app.put('/updateAllInfo/:firstName', (req, res) => {
    providers.updateMany({firstName: req.params.firstName},{ $set: { firstName: req.body.firstName }},{ multi: true },(err, provider) => {
      if (err)  return handleError(err)
        res.send("Your data is actualized");
    })
  })

//This method delete the first object from the collection that match with the name
app.delete('/deleteInfo/:firstName', (req, res) => {
  providers.findOneAndRemove({firstName: req.params.firstName}, (err) =>{
    if(!err) {
      res.send("User was deleted");
  } 
  })
})
//This method delete all the objects from the collection that match with the name
app.delete('/deleteAllInfo/:firstName', (req, res) => {
  providers.deleteMany({firstName: req.params.firstName}, (err) =>{
    if(!err) {
      res.send("Users with that name are deleted");
  } 
  })
})