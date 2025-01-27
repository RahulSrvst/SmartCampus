const { DepartmentModel } = require("../Models/Department");


const get_department = async(req,res)=>{
    try{

      const {collegeId} = req.user;

      if(!collegeId){
        return res.status(404).json({
          message:"UnAuthorized College !!!",
          success:true,
        })
      }
      
        const department = await DepartmentModel.find({collegeId});
        return res.status(201).json({
            message: "Departent Get successfully!",
            data: department,
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

const add_department = async(req,res) =>{
    try{
    const {department_name} = req.body;

    const {collegeId} = req.user;

      if(!collegeId){
        return res.status(404).json({
          message:"UnAuthorized College !!!",
          success:true,
        })
      }


    const newDepartment = new DepartmentModel({
        department_name,
        collegeId,
    })

    await newDepartment.save();

    return res.status(201).json({
        message: "Departent added successfully!",
        data: newDepartment,
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


module.exports = {add_department,get_department}