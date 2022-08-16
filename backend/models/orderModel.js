const mongoose=require("mongoose");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHander = require("../utils/errorhander");

const orderSchema=new mongoose.Schema({
    shippingInfo:{
      address:{
        type:String,
        required:true,
    },

    city:{
        type:String,
        required:true,
    },

    state:{
        type:String,
        required:true,
    },

    country:{
        type:String,
        required:true,
    },

    pinCode:{
        type:Number,
        required:true,
    },

    phoneNo:{
        type:Number,
        required:true,
    },
    },

    orderItems:[
        {
            name:{
                type:String,
                required:true,
            },
            price:{
                type:Number,
                required:true,
            },
            quantity:{
                type:Number,
                required:true,
            },
            image:{
                type:String,
                required:true,
            },
            product:{
                type:mongoose.Schema.ObjectId,
                ref:"Product",
                required:true,
            },
        },
    ],

    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },

    paymentInfo:{
        id:{
            type:String,
            required:true,
        },
        status:{
            type:String,
            required:true,
        },
    },
    paidAt:{
        type:Date,
        required:true,
    },
    itemsPrice:{
        type:Number,
        required:true,
        default:0,
    },

    taxPrice:{
        type:Number,
        required:true,
        default:0,
    },
    shippingPrice:{
        type:Number,
        required:true,
        default:0,
    },
    totalPrice:{
        type:Number,
        required:true,
        default:0,
    },
    orderStatus:{
        type:String,
        required:true,
        default:"Processing",
    },
    deliveredAt:Date,
    createdAt:{
        type:Date,
        default:Date.now,
    },
});

//get single order
exports.getSingleOrder=catchAsyncErrors(async(req,res,next)=>{
    //
    const order =await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );

    if(!order){
        return next(new ErrorHander("Order not found with this Id",404));

    };

    res.status(200).json({
        success:true,
        order,
    });
});

//get logged in user orders
exports.myOrders=catchAsyncErrors(async(req,res,next)=>{
    const orders=await Order.find({user:req.user._id});

    res.status(200).json({
        success:true,
        orders,
    })
       
})

module.exports=mongoose.model("Order",orderSchema);