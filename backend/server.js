const mongoose=require("mongoose");
const express =require("express");
const cors=require("cors");
const app=express();
app.use(express.json());
require("dotenv").config();
const expenseRoutes = require("./routes/expenseRoutes");
 const authRoutes=require("./routes/authRoutes")
app.use(cors());

app.use(express.json());

app.use( "/expenses", expenseRoutes);
app.use("/auth",authRoutes);



mongoose.connect(process.env.MONGO_DB)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});





app.get("/",(req,res)=>{
    res.send("Backend Working");
});




app.listen(5000,()=>{
    console.log("server running");
});




