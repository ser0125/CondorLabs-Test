var express = require('express');
var router = express.Router();
var database = require('./querys'); 

router.get('/list', database.getProviders);  	//Route that show us all the providers 
router.get('/list/:firstName', database.getProvidersByName);     //Route that show us the providers with the name send in the parameter
router.post('/saveInfo', database.saveProvider);  //Route that save a provider
router.put('/updateInfo/:firstName', database.updateProvider);  //Route that update data from a provider that match with the name
router.put('/updateAllInfo/:firstName', database.updateAllProvider);  //Route that delete data from all the providers that match with the name
router.delete('/deleteInfo/:firstName', database.deleteProvider);  //Route that delete data from a provider that match with the name
router.delete('/deleteAllInfo/:firstName', database.deleteAllProvider);  //Route that delete data from all the providers that match with the name
module.exports = router;    //export all that is in the router
