const { PaymentModel } = require("../Models/PaymentType");

const add_payment_type = async (req, res) => {
  try {
    const {typename} = req.body;
    const { collegeId } = req.user;

    if (!collegeId) {
      return res.status(404).json({
        message: "UnAuthorized College !!!",
        success: true,
      });
    }
    const newPaymentType = new PaymentModel({
      typename,
      collegeId,
    });

    await newPaymentType.save();
    return res.status(201).json({
      message: "PaymentType added successfully!",
      data: newPaymentType,
      success: true,
    });
  } catch (error) {
    console.log("Pay Error", error);
    res.status(500).json({
      message: "Internal Server Error!!!",
      success: false,
    });
  }
};

const get_PaymentType = async(req,res)=>{
    try{
        const {id} = req.query;
        const { collegeId } = req.user;

    if (!collegeId) {
      return res.status(404).json({
        message: "UnAuthorized College !!!",
        success: true,
      });
    }
        if(id){
            const PaymentType = await PaymentModel.findOne({_id:id,collegeId});

        if(!PaymentType){
            return res.status(404).json({
                message:"PaymentType not Found !!!",
                success:false,
            })
        }
        return res.status(200).json({
            message:"PaymentType Get Successfully !!!",
            data:PaymentType,
            success:false,
        })
        }else{
            const PaymentType = await PaymentModel.find({collegeId});

        if(!PaymentType){
            return res.status(404).json({
                message:"PaymentType not Found !!!",
                success:false,
            })
        }
        return res.status(200).json({
            message:"PaymentType Get Successfully !!!",
            data:PaymentType,
            success:false,
        })
        }
    }catch(error){
        console.log("pay Head Error",error);
        res.status(500).json({
            message:"Pay Head Added Successfully !!!",
            success:false,
        })
    }
}


module.exports ={add_payment_type , get_PaymentType}
