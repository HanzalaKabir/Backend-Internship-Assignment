require("dotenv").config();
const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
    try {
        const newUser = new User({
            name: req.body.name,
            password: req.body.password
        })
        newUser.save();
        res.status(201).json({ msg: "User Created", newUser });
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
}

const findUser = async (req, res) => {
    try {
        const user = await User.findOne({ name: req.query.name, password: req.query.password });
        if (user) {
            const accessToken = jwt.sign({name:req.query.name,password:req.query.password}, process.env.ACCESSTOKEN);
            res.status(200).json({ msg: "User Found", accessToken });
        }
        else {
            res.status(404).json({ msg: "User Not Found" });
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }
}


const updateUser = async (req, res) => {
    const user = await User.findOneAndUpdate({ name: req.body.name}, { name: req.body.newName });
    if (user) {
        res.status(201).json({ msg: "User Updated", user });
    } else {
        res.status(404).json({ msg: "User Not Found" });
    }
}

const deleteUser = async (req, res) => {
    const user = await User.findOneAndDelete({ name: req.body.name, password: req.body.password });
    if (user) {
        res.status(201).json({ msg: "User Deleted", user });
    } else {
        res.status(404).json({ msg: "User Not Found" });
    }
}

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        jwt.verify(authHeader, process.env.ACCESSTOKEN, (err, user) => {
            if (err) {
                res.status(403).json({ msg: "Invalid Token" });
            }
            else {
                req.body.name = user.name;
                req.body.password=user.password;
                next();
            }
        })
    }
    else {
        res.status(401).json({ msg: "Unauthorized" });
    }
}

module.exports = { createUser, findUser, deleteUser,updateUser, verifyToken };