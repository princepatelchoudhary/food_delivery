const Order = require('../models/Orders')

exports.myOrder=async(req,res)=>{
    const email=req.body.email
    try{
        const orderData=await Order.findOne({email});
        res.status(200).json({
            success:true,
            orderData:orderData.order_data
        })
    }
    catch(err)
    {
        res.status(400).json({success:false,err});
    }
}