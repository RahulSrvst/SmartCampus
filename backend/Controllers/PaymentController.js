const { createrazorpayInstance } = require("../config/razorpay.config");

 const razorpayInstance =  createrazorpayInstance();
 const dotenv = require("dotenv")
 dotenv.config();
const crypto = require("crypto")


exports.createOrder = async (req,res) =>{
    const {plan_id,amount} = req.body;


    const options = {
        amount : amount * 100,
        currency : "INR",
        receipt : `receipt_order_1`
    }


    try{
        razorpayInstance.orders.create(options, (err,order)=>{
            if(err){
                return res.status(500).json({
                    message:"Something Went Wrong !!",
                    success:false,
                })
            }
            return res.status(200).json(order)
        })
    }catch(e){
        return res.status(500)
        .json({
            message:"SomeThing Went Wrong !!",
            success:false,
        })
    }
}


exports.verifyPayment = async(req,res)=>{
    const {order_id,payment_id,signature} = req.body;

    const secret= process.env.RAZORPAY_KEY_SECERT

    const hmac = crypto.createHmac("sha256",secret);

    hmac.update(order_id + "|" + payment_id);

    const generatedSignature = hmac.digest("hex");


    if(generatedSignature === signature){
        return res.status(200).json({
            message:"Payment Successfull !!",
            success:true,
        })
    }else{
        return res.status(400).json({
            message:"Payment Failed !!",
            success:true,
        })
    }
}