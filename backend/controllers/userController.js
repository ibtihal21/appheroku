const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User=require("../models/userModel");
const sendToken=require("../utils/jwtToken");
const sendEmail=require("../utils/sendEmail");
const crypto=require("crypto");
const cloudinary = require("cloudinary");

//Register a user
exports.registerUser=catchAsyncErrors(async (req,res,next)=>{
    
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
    
    const {name,email,password}=req.body;

    const user=await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
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

    )}/password/reset/${resetToken}`; //localhost ka id de diya hai

    // this message will send to users email for reset password
    const message=`Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this mail then, please ignore it`;

    
    try{

        await sendEmail({
            email:user.email,
            subejct:`SuperShop Password Recovery`,
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

    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);
    
        const imageId = user.avatar.public_id;
    
        await cloudinary.v2.uploader.destroy(imageId);
    
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "avatars",
          width: 150,
          crop: "scale",
        });
    
        newUserData.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
    
    //we will add cloudinary later
    const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        userFindAndModify:false,
    });

    res.status(200).json({
        success:true,
    });
  });

  //Get all users(admin)
  exports.getAllUser=catchAsyncErrors(async(req,res,next)=>{
    const users=await User.find();

    res.status(200).json({
        success:true,
        users,
    });
  });

  //Get single user (admin)
  exports.getSingleUser=catchAsyncErrors(async(req,res,next)=>{

    const user=await User.findById(req.params.id);

    if(!user){
        return next(
            new ErrorHander(`User does not exist with this id: ${req.params.id}`)
        );
    }

    res.status(200).json({
        success:true,
        user,
    });
  });

  //update user Role--Admin
  exports.updateUserRole=catchAsyncErrors(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
    };

    await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        userFindAndModify:false,
    });

    res.status(200).json({
        success:true,
    });
  });

  //Delete user Role--Admin
  exports.deleteUser=catchAsyncErrors(async(req,res,next)=>{
    
    const user=await User.findById(req.params.id)
    //we  will remove cloudinary later

    if(!user){
        return next(
            new ErrorHander(`user does not exist with id:${req.params.id}`,400)
        );
    }

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    await user.remove();

    res.status(200).json({
        success:true,
        message:"User deleted successfully",
    });
  });

  