//We are going to use  Moongose so here we import that
const mongoose = require('mongoose');  

//Here we connect to the database
mongoose.connect('mongodb://sergioll:sergioll@ds235775.mlab.com:35775/evercheck-test-sergio-llanos');

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
});

var providers = mongoose.model("Providers",providerSchema);

//This method return all the data from providers
function getProviders(req, res){ 
  providers.find(function(err, results) {
    res.send(results)
  });
}
//This method return all the data with the firstName like a param 
function getProvidersByName(req, res){ 
  providers.find({firstName : req.params.firstName},function(err, results) {
    res.send(results)
  });
}

//this method save in to the database
function saveProvider(req, res){ 
  var provider = new providers({
    firstName: req.body.firstName
  });
  provider.save(function() {
      res.send("Your data is saved");
    })
  }

//this method actualize the first object from the collection that match with the name
  function updateProvider(req,res){
    providers.findOne({firstName: req.params.firstName}, (err, provider) => {
      if (err)  return handleError(err);
      provider.firstName = req.body.firstName;
      provider.save(function() {
        res.send("Your data is actualized");
      });
    });
  }

  //this method actualize all the objects from the collection from the collection that match with the name
   function updateAllProvider(req,res){
    providers.updateMany({firstName: req.params.firstName},{ $set: { firstName: req.body.firstName }},{ multi: true },(err, provider) => {
      if (err)  return handleError(err);
        res.send("Your data is actualized");
    })
  }

//This method delete the first object from the collection that match with the name
function deleteProvider(req,res){
  providers.findOneAndRemove({firstName: req.params.firstName}, (err) =>{
    if(!err) {
      res.send("User was deleted");
    } 
  });
}
//This method delete all the objects from the collection that match with the name
function deleteAllProvider(req,res){
  providers.deleteMany({firstName: req.params.firstName}, (err) =>{
    if(!err) {
      res.send("Users with that name are deleted");
    } 
  });
}

module.exports = { // Export all the methods
  getProviders: getProviders,
  getProvidersByName: getProvidersByName,
	saveProvider: saveProvider,
  updateProvider: updateProvider,
  updateAllProvider: updateAllProvider,
  deleteProvider: deleteProvider,
  deleteAllProvider: deleteAllProvider
};