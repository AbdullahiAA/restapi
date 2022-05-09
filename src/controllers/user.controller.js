const User = require("../models/user.model");

// Create and Save a user
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be enmpty",
    });
  }

  // Create a User
  const { id, email, phone_number } = req.body;
  const user = new User(id, email, phone_number);

  //   Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
      });
    else res.send(data);
  });
};

// Retrieve all users from the database
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the users.",
      });
    else res.send(data);
  });
};

// Find a single user by Id
exports.findOne = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "Not found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving User with id ${req.params.id}.`,
        });
      }
    } else res.send(data);
  });
};

// Update a user
exports.update = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be enmpty",
    });
  }

  const { id, email, phone_number } = req.body;

  User.updateById(
    Number(req.params.id),
    new User(id, email, phone_number),
    (err, data) => {
      if (err) {
        if (err.kind === "Not found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: `Error updating User with id ${req.params.id}.`,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a User with the specified Id in the request
exports.delete = (req, res) => {
  User.delete(req.params.id, (err) => {
    if (err) {
      if (err.kind === "Not found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete a User with id ${req.params.id}.`,
        });
      }
    } else res.send({ message: "User deleted successfuly!" });
  });
};
