const { query } = require("express");
const db = require("../models");
const Phunks = db.phunks;

class SearchOptions {
  constructor(query) {
      this.limit = query.limit ? parseInt(query.limit) : null;
      this.skip = (query.page && this.limit) ? (parseInt(query.page)-1) * this.limit : null;
      this.sort = {};
      if(query.sortBy) {
          const sortStr = query.sortBy.split(':');
          this.sort[sortStr[0]] = sortStr[1] === 'desc' ? -1 : 1
      } 
  }
}


// Create and Save a new Phunk
exports.create = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  //Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create Phunk record
  const phunk = new Phunks({
    name: req.body.name,
    description: req.body.description,
    attributes: req.body.attributes,
    rank: req.body.rank ? req.body.rank : null,
    owner: req.body.owner ? req.body.owner : null,
    onMarket: req.body.onMarket ? req.body.onMarket : false,
    hasBid: req.body.hasBid ? req.body.hasBid : false,
    image_url: req.body.image_url
  })
  // Save Phunk in the database
  phunk
    .save(phunk)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Phunk."
      });
    });

};

// Retrieve all Phunks from the database.
exports.findAll = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  const name = req.query.name;
  const onMarket = req.query.onMarket;
  const hasBid = req.query.hasBid;
  const order_created = req.query.order_created;
  const rank = req.query.rank;
  const owner = req.query.owner;
  const market = req.query.market;


  var condition = 
    name ? { name: { $regex: new RegExp(name), $options: "i" }} : 
    order_created ? { order_created: order_created} :
    onMarket ? {onMarket: onMarket} :
    hasBid ? {hasBid: hasBid} :
    rank ? {rank: rank} :
    owner ? {owner: owner} :
    market ? {market: new RegExp(market)} :
    {};

  Phunks.find(condition, null, new SearchOptions(req.query))
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Phunks."
      });
    });
};

// Find a single Phunk with an id
exports.findOne = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  const id = req.params.id;

  Phunks.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Phunks with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Phunks with id=" + id });
    });
};

// Update a Phunk by the id in the request
exports.update = (req, res) => {
  // res.setHeader("Access-Control-Allow-Origin", "*")
  // res.setHeader("Access-Control-Allow-Credentials", "true");
  // res.setHeader("Access-Control-Max-Age", "1800");
  // res.setHeader("Access-Control-Allow-Headers", "content-type");
  // res.setHeader("Access-Control-Allow-Methods", "PUT");
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Phunks.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Phunk with id=${id}. Maybe Phunk was not found!`
        });
      } else res.send({ message: "Phunk was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Phunk with id=" + id
      });
    });
};

// Delete a Phunk with the specified id in the request
exports.delete = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "DELETE");
  const id = req.params.id;

  Phunks.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Phunks with id=${id}. Maybe Phunks was not found!`
        });
      } else {
        res.send({
          message: "Phunks was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Phunks with id=" + id
      });
    });
};

// Delete all Phunks from the database.
exports.deleteAll = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "DELETE");
  Phunks.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Phunks were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Phunks."
      });
    });
};

// Find all for sale Phunks
exports.findAllOnMarket = (req, res) => {
  // res.setHeader("Access-Control-Allow-Origin", "*")
  // res.setHeader("Access-Control-Allow-Credentials", "true");
  // res.setHeader("Access-Control-Max-Age", "1800");
  // res.setHeader("Access-Control-Allow-Headers", "content-type");
  // res.setHeader("Access-Control-Allow-Methods", "GET");
  Phunks.find({ onMarket: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Phunks."
      });
    });
};

// Find all for sale Phunks
exports.findPhunk = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  Phunks.findOne({ name: req.params.id })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Phunks."
      });
    });
};

// Find all Phunks with bids
exports.findHasBid = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  Phunks.find({ hasBid: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Phunks."
      });
    });
};
