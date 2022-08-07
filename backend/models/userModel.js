const mongoose=require("mongoose");
const validator=require("validator");
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
        validate:[validator.ismail,"Please Enter a valid mail"],  //esme problem aa rha hai
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
module.exports=mongoose.model("user",userSchema)