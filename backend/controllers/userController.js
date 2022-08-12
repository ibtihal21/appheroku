const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User=require("../models/userModel");
const sendToken=require("../utils/jwToken");
const sendEmail=require("../utils/sendEmail");
const crypto=require("crypto");

//Register a user
exports.registerUser=catchAsyncErrors(async (req,res,next)=>{
    const {name,email,password}=req.body;

    const user=await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"this is a sample id",
            url:"profilepicUrl",
        },
        });
        sendToken(user,201,res);

        

});


//login user
exports.loginUser=catchAsyncErrors(async(req,res,next)=>{
    const{email,password}=req.body;

    //checking if user has given password and email both

    if(!email || !password)
    {
        return next(new ErrorHander("Please Enter Email & Password",400));
    }

    const user =await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHander("Invalid email or password",401))
    }

    //check passwrod of user (matched or not)
    const isPasswordMatched= await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHander("Invalid email or password",401));
    }
    sendToken(user,200,res);
    
});

//logout user
exports.logout=catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });
    res.status(200).json({
        success:true,
        message:"Logged Out",
    });
});   

// Forgot Password
exports.forgotPassword=catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHander("User not found",404));

    }

    //Get resetPassword Token
    const resetToken= user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});

    //yaha url banega and message me jaega user ke phir user us url ka use ker ke password reset ker sakega
    const resetPasswordUrl=`${req.protocol}://${req.get(
        "host"

    )}/api/v1/password/reset/${resetToken}`; //localhost ka id de diya hai

    // this message will send to users email for reset password
    const message=`Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this mail then, please ignore it`;

    
    try{

        await sendEmail({
            email:user.email,
            subejct:`Ecommerce Password Recovery`,
            message,
        });
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`,
        });
    }catch(error)
    {
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;

        await user.save({validateBeforeSave:false});

        return next(new ErrorHander(error.message,500));
    }
});

//reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
  
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
  
    if (!user) {
      return next(
        new ErrorHander(
          "Reset Password Token is invalid or has been expired",
          400
        )
      );
    }
  
    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHander("Password does not Matched", 400));
    }
  
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
  
    await user.save();
  
    sendToken(user, 200, res);
  });

  //Get user details
  exports.getUserDetails=catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user,
    });
  });

  // update user password

  exports.updatePassword=catchAsyncErrors(async(req,res,next)=>{

    const user=await User.findById(req.user.id).select("+password");

    const isPasswordMatched=await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHander("old password is incorrect",404));
    }

    if(req.body.newPassword!== req.body.confirmPassword){
        return next(new ErrorHander("password does not matched"));
    }

    user.password=req.body.newPassword;
    await user.save();
    sendToken(user,200,res);
  });

  //update user Profile
  exports.updateProfile=catchAsyncErrors(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
    };

    //we will add cloudinary later
    const user=User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        userFindAndModify:false,
    });

    res.status(200).json({
        success:true,
    });
  });