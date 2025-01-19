const { PaySlipModel } = require("../Models/GeneratePaySlip");

const addPaySlip = async (req, res) => {
    try {
      const {
        basicpay,
        Payslipdate,
        Houserentallowance,
        Paid_days,
        casual_leave,
        Privilegeleave,
        Totaldeduction,
        netsalary,
        employee,
      } = req.body;
  
      console.log("Requested Body:", req.body);
  
      if (!Payslipdate || !employee || !basicpay || !netsalary) {
        return res.status(400).json({
          message: "Missing required fields: Payslipdate, employee, basicpay, or netsalary.",
          success: false,
        });
      }
  
      const date = new Date(Payslipdate);
      if (date.toString() === "Invalid Date") {
        return res.status(400).json({
          message: "Invalid Payslip date provided. It should be a string in 'YYYY-MM-DD' format.",
          success: false,
        });
      }
  
      const payslipmonth = date.getMonth();
      const payslipYear = date.getFullYear();
  
      const existingPaySlip = await PaySlipModel.findOne({
        employee,
        payslipmonth,
        payslipYear,
      });
  
      if (existingPaySlip) {
        return res.status(400).json({
          message: "Payslip for this employee already exists for this month!",
          success: false,
        });
      }
  
      const payslip = new PaySlipModel({
        employee,
        basicpay,
        Payslipdate,
        Houserentallowance,
        Paid_days,
        casual_leave,
        Privilegeleave,
        Totaldeduction,
        netsalary,
        payslipYear, 
        payslipmonth, 
      });

      await payslip.save();
  
      return res.status(200).json({
        message: "PaySlip for this Month Created Successfully!!!",
        data: payslip,
        success: true,
      });
    } catch (error) {
      console.log("There is some internal Error", error);
      return res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }
  };
  
  const getPaySlip = async (req, res) => {
    try {
      const payslips = await PaySlipModel.find()
  .populate({
    path: "employee",
    populate: [
      {
        path: "department", // Assuming "department" is the field in the employee model
        select: "department_name", // Only include the name field of the department
      },
      {
        path: "designation", // Assuming "designation" is the field in the employee model
        select: "designation_name", // Only include the name field of the designation
      },
    ],
  })
  .exec();

  
      if (!payslips || payslips.length === 0) {
        return res.status(404).json({
          message: "No Payslip found for any employee.",
          success: false,
        });
      }
  
      return res.status(200).json({
        message: "PaySlips retrieved successfully!",
        data: payslips.map(payslip => ({
          ...payslip.toObject(),
          payslipYear: payslip.payslipYear, 
          payslipmonth: payslip.payslipmonth, 
        })),
        success: true,
      });
    } catch (error) {
      console.log("There is some internal Error", error);
      return res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }
  };

module.exports = { addPaySlip, getPaySlip };
