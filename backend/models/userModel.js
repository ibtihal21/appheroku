const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto=require("crypto");

const userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Please enter Your Name"],
        maxLength:[30,"Name cannot exceed 30 char"],
        minLength:[4,"Name should have more than 4 char"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Your  Email"],
        unique:true,
        // problem aa rha tha validator wo ab resolve ho gya hai
        validate:{
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
          },
    },
    password:{
        type:String,
        required:[true,"Please Enter Password"],
        minLength:[8,"Password should have more than 8 char"],
        select:false //admin bas name and email dekh sakega pass nahi
    },
    avatar:
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            },
           
    },
    role:{
  
        type:String,
        default:"user"
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date,

});


//encrypt password save hone se pahle
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
});


//json web token  :-
//cookie ka kam yahi hoga 
//jaise irctc me login kerte hai and kuch time baad wo expire ho jata hai
//just uske jaisa hi kam hoha token expire ho jaega
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
};


//compare password
userSchema.methods.comparePassword=async function(password_pass){
    return await bcrypt.compare(password_pass,this.password);
};

//Generating password reset Token
userSchema.methods.getResetPasswordToken=function(){
    //Generating Token
    const resetToken=crypto.randomBytes(20).toString("hex");


    //hashing and adding resetPasswordToken
    this.resetPasswordToken=crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    this.resetPasswordExpire=Date.now()+15*60*1000;
    return resetToken;
}
module.exports=mongoose.model("user",userSchema)