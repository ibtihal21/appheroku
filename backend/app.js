const express=require("express");
const app=express();
const cookieParser=require("cookie-parser");
const bodyParser = require("body-parser");

const errorMiddleware=require("./middleware/error");

// This method is called as a middleware in an application using this code:-
app.use(express.json())

app.use(cookieParser())
//Route imports
const product=require("./routes/productRoute");
const user =require("./routes/userRoute");
const order =require("./routes/orderRoute");

app.use("/api/v1",product);
app.use("/api/v1", user);
app.use("/api/v1", order);

//middleware for error
app.use(errorMiddleware);

module.exports=app; 