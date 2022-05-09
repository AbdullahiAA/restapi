const router = require("express").Router();

const userController = require("../controllers/user.controller");

module.exports = (app) => {
  // Create a new User
  router.post("/", userController.create);

  //   Retrieve all users
  router.get("/", userController.findAll);

  //   Retrieve a single user with id
  router.get("/:id", userController.findOne);

  //   Update a user with id
  router.put("/:id", userController.update);

  //   Delete a User with id
  router.delete("/:id", userController.delete);

  app.use("/api/users", router);
};
