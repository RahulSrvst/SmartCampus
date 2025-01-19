const { DesignationModel } = require("../Models/Designation");


const get_Designation = async(req,res)=>{
    try{
        const Designation = await DesignationModel.find();
        return res.status(201).json({
            message: "Designation Get successfully!",
            data: Designation,
            success: true,
          });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
          message: "Internal Server Error",
          success: false,
        });
      }
}

const add_Designation = async(req,res) =>{
    try{
    const {designation_name} = req.body;

    const newDesignation = new DesignationModel({
        designation_name,
    })

    await newDesignation.save();

    return res.status(201).json({
        message: "Designation added successfully!",
        data: newDesignation,
        success: true,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }
}


module.exports = {add_Designation,get_Designation}