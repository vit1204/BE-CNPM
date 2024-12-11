const userModels = require("../models/user.model");

class userController {
  getAllUsers = async (req, res, next) => {
    try {
      const result = await userModels.selectAllUsers();
      res.status(200).json(result);
      console.log("get all users Successfully");
    } catch (err) {
      console.log("get all users Failed");
      next(err);
    }
  };

  selectOneUser = async (req, res, next) => {
    try {
      const result = await userModels.selectOneUser(req.params.id);
      res.status(200).json(result);
      console.log("get ONE user Successfully");
    } catch (err) {
      console.log("get ONE user Failed");
      next(err);
    }
  };

  createUser = async (req, res, next) => {
    try {
      const result = await userModels.createUser(req);
      res.status(200).json(result);
      console.log("createUser Successfully");
    } catch (err) {
      console.log("createUser Failed");
      next(err);
      console.log(err);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const users = await userModels.selectOneUser(req.params.id);

      const result = await userModels.updateUser(req.params.id, req);

      res.status(200).json(result);

      console.log("updateUser Successfully");
    } catch (err) {
      console.log("updateUser Failed");

      next(err);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const result = await userModels.deleteUser(req.params.id);
      res.status(200).json(result);
      console.log("deleteUser Successfully");
    } catch (err) {
      console.log("deleteUser Failed");

      next(err);
    }
  };

  searchUser = async (req, res, next) => {
    try {
      const result = await userModels.searchUser(req.params.key);
      res.status(200).json(result);
      console.log("searchUser Successfully");
    } catch (err) {
      console.log("searchUser Failed");

      next(err);
    }
  };
}

module.exports = new userController();
