module.exports = app => {
    const phunks = require("../controllers/phunks.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Phunk
    router.post("/", phunks.create);
  
    // Retrieve all phunks
    router.get("/", phunks.findAll);
  
    // Retrieve all published phunks
    router.get("/onMarket", phunks.findAllOnMarket);
    
    // Retrieve all phunks with bids
    router.get("/bids", phunks.findHasBid);
  
    // Retrieve a single Phunk with mongo id
    router.get("/mongo/:id", phunks.findOne);

    // Retrieve a single Phunk with id
    router.get("/:id", phunks.findPhunk);    
  
    // Update a Phunk with id
    router.put("/mongo/:id", phunks.update);
  
    // Delete a Phunk with id
    router.delete("/mongo/:id", phunks.delete);
  
    // Delete all
    router.delete("/mongo/", phunks.deleteAll);
  
    app.use('/api/phunks', router);
  };