const catchAsyncErrors = require("./catchAsyncErrors");

const isAuthenticatedUser=catchAsyncErrors(async(req,res,next)=>
{
    const token=req.cookies;
    console.log(token);
});

module.exports=isAuthenticatedUser;