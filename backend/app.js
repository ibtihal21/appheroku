const express=require("express");
const app=express();


// This method is called as a middleware in an application using this code:-
app.use(express.json())

//Route imports
const product=require("./routes/productRoute");

app.use("/api/v1",product);

module.exports=app;