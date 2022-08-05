const app=require("./app");

const dotenv =require("dotenv");

const connectDatabase=require("./config/database")


//handling uncaught exceptions
process.on("uncaughtException",err=>{
    console.log(`Error: ${err.message}`);
    console.log("shutting down the server due to uncaught exception");
    process.exit(1);
});
// console.log(youtube); ye uncaught exception ka example hai

//config
dotenv.config({path:"backend/config/config.env"});


//connecting to databse
connectDatabase();


//create a server
const server=app.listen(process.env.PORT,()=>
{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)

})


// Unhandaled promise rejection
// e.g:- config me jo mongodb hai usko mongo likh do error aa jaega
// that error is call unhandaled
process.on("unhandledRejection",err=>
{
    console.log(`Error: ${err.message}`);
    console.log("shuting down the server due to unhandled promise rejection");

    server.close(()=>{
        process.exit(1);
    });
});
