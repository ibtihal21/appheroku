const Order=require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors=require("../middleware/catchAsyncErrors");

//create new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
  
    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });
  
    res.status(201).json({
      success: true,
      order,
    });
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

    }

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
    });
       
});


//get all orders -- Admin
exports.getAllOrders=catchAsyncErrors(async(req,res,next)=>{
    const orders=await Order.find();

    //admin will calculate total amount with orders
    let totalAmount=0;
    orders.forEach((order)=>{
        totalAmount+=order.totalPrice;
    });
    res.status(200).json({
        success:true,
        totalAmount,
        orders,
    });
       
});

//update Order status -- admin
exports.updateOrder=catchAsyncErrors(async(req,res,next)=>{
    const order=await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHander("Order not found with this Id", 404));
      }
    
    if(order.orderStatus==="Delivered"){
        return next(new ErrorHander("You have already recieved this order",404));
    }
        order.orderItems.forEach(async(order)=>{
          await updateStock(order.product,order.quantity);

        });

        //order ka status bta diya idhar
        order.orderStatus=req.body.status;
        
        //delivered ker diya hai to date ko bhi bta denge
        if(req.body.status==="Delivered"){
            order.deliveredAt=Date.now();
        }
    await order.save({validateBeforeSave:false});
    res.status(200).json({
        success:true,
    });
       
});

//this function is used to update the stock of product
async function updateStock(id,quantity){
    const product=await Product.findById(id);

    //change S to s
    product.stock -= quantity;
    await product.save({validateBeforeSave:false});
}

//delete order -- Admin
exports.deleteOrder=catchAsyncErrors(async(req,res,next)=>{
    const order=await Order.findById(req.params.id);

   if(!order){
    return next(new ErrorHander("Order not found with this id",404));
   }
   await order.remove();
    res.status(200).json({
        success:true,
    });
       
});