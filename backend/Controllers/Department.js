const { DepartmentModel } = require("../Models/Department");


const get_department = async(req,res)=>{
    try{
        const department = await DepartmentModel.find();
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

    const newDepartment = new DepartmentModel({
        department_name,
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