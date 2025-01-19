const PlanModel = require("../Models/PlanModel");

const getPlan = async (req, res) => {
  try {
    const plans = await PlanModel.find();
    res.status(200).json({
      message: "Plan Fetched Successfully !",
      success: true,
      data: plans,
    });
  } catch (e) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const addPlan = async (req, res) => {
  try {
    const { name, price, feature, validity } = req.body;
    if (!name || !price || !feature|| !validity) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const newplan = new PlanModel({
      name,
      price,
      feature,
      validity,
    });

    await newplan.save();

    res.status(201).json({
        message:"Plan Added Successfully !!",
        success:true,
        data:newplan,
    })


  } catch (e) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};


const updatePlan = async (req,res) =>{
  try{
    const {id} = req.params;
    const {name,price,feature,validity} = req.body;

    const updatedPlan = await PlanModel.findByIdAndUpdate(
      id,
      {name,feature,validity,price},
      {new:true , runValidators:true}
    )

    if(!updatedPlan){
      return res.status(404).json({
        message:"Plan is not Found",
        success:false,
      })
    }

    res.status(200).json({
      message:"Plan Updated Successfully !!",
      success:true,
    })
  }catch(e){
    res.status(500).json({
      message:"Plan Updated Successfully !!",
      success:false,
  })
}
}


module.exports = {getPlan,addPlan,updatePlan}
