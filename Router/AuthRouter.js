const express = require("express");
const Router = express.Router();

const { createUser, findUser, deleteUser, updateUser, verifyToken } = require("../Controller/AuthController")


Router.route("/signup").post(createUser);
Router.route("/login").get(findUser);
Router.route("/deleteUser").delete(verifyToken,deleteUser);
Router.route("/updateUser").put(verifyToken,updateUser);

module.exports = Router;