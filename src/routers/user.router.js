const express = require("express");
const router = express.Router();
require("dotenv").config();

const userController = require("../controllers/user.controler");
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = (app) => {
  router.get(
    "/" /*,checkPermission(1)*/,
    awaitHandlerFactory(userController.getAllUsers)
  ); // localhost:8080/api/v1/users

  router.get("/:id", awaitHandlerFactory(userController.selectOneUser)); // localhost:8080/api/v1/users/1

  router.post("/", userController.createUser); // localhost:8080/api/v1/users

  router.put("/:id", userController.updateUser); // localhost:8080/api/v1/users/1 , using patch for partial update

  router.delete("/:id", userController.deleteUser); // localhost:8080/api/v1/users/1

  router.get("/search/:key", userController.searchUser); // localhost:8080/api/v1/users/search/key

  return app.use(`${process.env.API_V1}/users`, router);
};

module.exports = userRouter;
