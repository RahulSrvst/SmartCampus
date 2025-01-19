const { DesignationModel } = require("../Models/Designation");
const { EmployeeModel } = require("../Models/EmployeeRegistration");
const { PayheadModel } = require("../Models/Payhead");
const { PaymentModel } = require("../Models/PaymentType");
const { SalarySettingsModel } = require("../Models/SalarySettings");

const add_Salary = async (req, res) => {
  try {
    const {
      designation,
      paymenttype,
      payhead,
      amount,
      employeename,
      startdate,
      enddate,
      issuedate,
    } = req.body;

    const designation_n = await DesignationModel.findById(designation);
    if (!designation_n) {
      return res.status(409).json({
        message: "Designation Doesn't Exist's",
        success: false,
      });
    }

    const payhead_n = await PayheadModel.findById(payhead);
    if (!payhead_n) {
      return res.status(409).json({
        message: "Payhead Doesn't Exist's",
        success: false,
      });
    }

    const paymentType_n = await PaymentModel.findById(paymenttype);
    if (!paymentType_n) {
      return res.status(409).json({
        message: "PaymentType Doesn't Exist's",
        success: false,
      });
    }
    
    const employee_n = await EmployeeModel.findById(employeename);
    if (!employee_n) {
      return res.status(409).json({
        message: "Employee Doesn't Exist's",
        success: false,
      });
    }

    const newSalary = new SalarySettingsModel({
      designation: designation,
      paymenttype: paymenttype,
      payhead: payhead,
      amount,
      employeename:employeename,
      startdate,
      enddate,
      issuedate,
    });

    await newSalary.save();

    res.status(201).json({
      message: "Salary Added Successfully !!",
      success: true,
      data: newSalary,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error !!!",
      success: false,
    });
  }
};

const get_salary = async (req, res) => {
    try{
        const {id , employee_id} = req.query;
        if(id){
            const Salary = await SalarySettingsModel.findById(id).populate("designation","designation_name").populate("employeename","firstname").populate("payhead","payhead").populate("Payment","typename");

        if(!Salary){
            return res.status(404).json({
                message:"Salary not Found !!!",
                success:false,
            })
        }
        return res.status(200).json({
            message:"Salary Get Successfully !!!",
            data:Salary,
            success:false,
        })
        }else if (employee_id){
          const Salary = await SalarySettingsModel.find({ employeename: employee_id })
          .populate("designation", "designation_name")
          .populate("employeename", "firstname")
          .populate("payhead", "payhead")
          .populate("paymenttype", "typename");
  
      if (!Salary) {
          return res.status(404).json({
              message: "Salary not Found for the given Employee ID !!!",
              success: false,
          });
      }
      return res.status(200).json({
          message: "Salary Get Successfully !!!",
          data: Salary,
          success: true,
      });
        }else{
            const Salary = await SalarySettingsModel.find().populate("designation","designation_name").populate("employeename","lastname firstname").populate("payhead","payheadtype").populate("paymenttype","typename");

        if(!Salary){
            return res.status(404).json({
                message:"Salary not Found !!!",
                success:false,
            })
        }
        return res.status(200).json({
            message:"Salary Get Successfully !!!",
            data:Salary,
            success:false,
        })
        }
    }catch(error){
        console.log("pay Head Error",error);
        res.status(500).json({
            message:"Internal Server Error !!!",
            success:false,
        })
    }
};


module.exports ={get_salary,add_Salary};