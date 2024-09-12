const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const dotenv = require('dotenv');
dotenv.config();

const connectDB=require("./connectDB/connectDB");
const authRouter=require("./Router/AuthRouter");

const app = express();

app.use(cors());
app.use(express.json());
connectDB();


app.get('/', (req, res) => {
  const name = process.env.NAME || 'World';
  res.send(`Hello ${name}!`);
});

app.use("/api/auth",authRouter);

mongoose.connection.once("open", () => {
  console.log('Connected to MongoDB');
  app.listen(process.env.PORT || 3000, () => {
    console.log('Server is up and running');
  })
});
