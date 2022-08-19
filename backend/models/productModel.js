const mongoose=require("mongoose");
const productSchema= new mongoose.Schema({
// name of product
    name:{
        type:String,
        required:[true,"Please enter product name"],
        trim:true
    },

//description of product
    description:{
        type:String,
        required:[true,"Please Enter product Description"]
    },

//price of product
    price:{
        type:Number,
    required:[true,"Please Enter product price"],
    maxLength:[8,"Price cannot exceed 8 char"]
   },

//product rating
   ratings:{
    type:Number,
    default:0
   },

//product image
   images:
   [
    {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
       }
   ],

//product category (phone,loptop etc)
   category:{
    type:String,
    required:[true,"Please Enter product Category"],
   },

//product in stock
   stock:{
    type:Number,
    required:[true,"Please enter product Stock"],
    maxLength:[4,"Stock cannot exceed 4 characters"],
    default:1
   },

//total number of reviews of product
   numOfReviews:{
    type:Number,
    default:0
   },

// product reviews
   reviews:[
    {
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true,
           },
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
            required:true
        },

    },
   ],

   //kisne bnaya
   user:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true,
   },

//date of creation of product
   createdAt:{
    type:Date,
    default:Date.now
   }

})

module.exports=mongoose.model("Product",productSchema);