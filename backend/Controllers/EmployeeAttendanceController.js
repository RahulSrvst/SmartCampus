const { DesignationModel } = require("../Models/Designation");
const { EmployeeAttendanceModel } = require("../Models/EmployeeAttendance");
const { EmployeeModel } = require("../Models/EmployeeRegistration");
const { PaySlipModel } = require("../Models/GeneratePaySlip");

const add_attendance = async (req, res) => {
  const { attendance, employee, designation, status, note } = req.body;


  const employee_n = await EmployeeModel.findById(employee);
  if(!employee_n){
    return res.status(404).json({
        message:"Employee not Found !!!",
        success:false,
    })
  }

  const designation_n = await DesignationModel.findById(designation);
  if(!designation_n){
    return res.status(404).json({
        message:"Designation not Found !!!",
        success:false,
    })
  }
  

  const newattendance = new EmployeeAttendanceModel({
    attendance,
    employee:employee,
    designation:designation,
    status,
    note,
  });

  await newattendance.save();

  if(!newattendance){
    return res.status(404).json({
        message:"Attendance Not Found !!!",
        success:false,
    })
  }

  return res.status(201).json({
    message:"Attendance Marked Successfully !!!",
    data:newattendance,
    success:true,
  })
};


const get_attendance = async (req, res) => {
    try {
      const { id, attendance, designation_id, employee_id } = req.query;
  
      // Handle the case when no query parameters are provided
      if (!id && !attendance && !designation_id && !employee_id) {
        return res.status(400).json({
          message: "At least one query parameter (id, attendance, designation_id, or employee_id) is required",
          success: false,
        });
      }
  
      // If 'id' is provided, find attendance by ID
      if (id) {
        const attendance_data = await EmployeeAttendanceModel.findById(id)
          .populate("employee", "firstname lastname")
          .populate("designation", "designation_name");
  
        if (!attendance_data) {
          return res.status(300).json({
            message: "Attendance not found",
            success: false,
          });
        }
  
        return res.status(200).json({
          message: "Attendance retrieved successfully",
          data: attendance_data,
          success: true,
        });
      }
  
      // If 'employee_id' is provided, find attendance by employee ID
      if (employee_id) {
        const data = await EmployeeAttendanceModel.find({ employee: employee_id })
          .populate("employee", "firstname lastname")
          .populate("designation", "designation_name");
  
        if (!data || data.length === 0) {
          return res.status(300).json({
            message: "No attendance records found for the given employee",
            success: false,
          });
        }
  
        return res.status(200).json({
          message: "Attendance retrieved successfully",
          data: data,
          success: true,
        });
      }
  
      // If 'designation_id' is provided, find attendance by designation ID
      if (designation_id) {
        const data = await EmployeeAttendanceModel.find({ designation: designation_id })
          .populate("employee", "firstname lastname")
          .populate("designation", "designation_name");
  
        if (!data || data.length === 0) {
          return res.status(300).json({
            message: "No attendance records found for the given designation",
            success: false,
          });
        }
  
        return res.status(200).json({
          message: "Attendance retrieved successfully",
          data: data,
          success: true,
        });
      }
  
      // If 'attendance' date is provided, fetch attendance records for that date
      if (attendance) {
        if (!attendance) {
          return res.status(400).json({
            message: "Date is required to fetch attendance",
            success: false,
          });
        }
  
        // Convert the date string to a Date object (ensure valid format 'YYYY-MM-DD')
        const attendanceDate = new Date(attendance);
  
        if (isNaN(attendanceDate.getTime())) {
          return res.status(400).json({
            message: "Invalid date format. Please provide a valid date.",
            success: false,
          });
        }
  
        // Find attendance records for the specific date
        const attendance_data = await EmployeeAttendanceModel.find({
          attendance: {
            $gte: attendanceDate.setHours(0, 0, 0, 0), 
            $lt: attendanceDate.setHours(23, 59, 59, 999),
          },
        })
          .populate("employee", "firstname lastname")
          .populate("designation", "designation_name");
  
        if (!attendance_data || attendance_data.length === 0) {
          return res.status(300).json({
            message: "No attendance found for the given date",
            success: false,
          });
        }
  
        return res.status(200).json({
          message: "Attendance retrieved successfully",
          data: attendance_data,
          success: true,
        });
      }
  
      // Default case: Fetch all attendance data if no specific query parameter is provided
      const attendance_data = await EmployeeAttendanceModel.find()
        .populate("employee", "firstname lastname")
        .populate("designation", "designation_name");
  
      if (!attendance_data || attendance_data.length === 0) {
        return res.status(300).json({
          message: "No attendance records found",
          success: false,
        });
      }
  
      return res.status(200).json({
        message: "Attendance retrieved successfully",
        data: attendance_data,
        success: true,
      });
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };



  const mongoose = require("mongoose");

const get_employee_attendance = async (req, res) => {
  try {
    const { employee_id, month, year } = req.query;

    // Validate required parameters
    if (!month || !year) {
      return res.status(400).json({
        message: "Month and year are required.",
        success: false,
      });
    }

    // Construct the start and end dates for the requested month
    const startDate = new Date(year, month - 1, 1); // Start of the month
    const endDate = new Date(year, month, 0); // End of the month

    // Query for employee attendance
    let query = {
      attendance: {
        $gte: startDate.setHours(0, 0, 0, 0),
        $lte: endDate.setHours(23, 59, 59, 999),
      },
    };

    if (employee_id) {
      query.employee = new mongoose.Types.ObjectId(employee_id); // Ensure employee_id is ObjectId
    }

    // Fetch the attendance data
    const attendanceData = await EmployeeAttendanceModel.find(query)
      .populate("employee", "firstname lastname");

    if (!attendanceData || attendanceData.length === 0) {
      return res.status(404).json({
        message: "No attendance records found for the given filters.",
        success: false,
      });
    }

    const totalWorkingDays = new Date(year, month, 0).getDate();
    let employeeAttendanceArray = [];
    const employeeGroup = {};

    // Log the employee_id and month/year for better debugging
    console.log("Employee ID:", employee_id);
    console.log("Payslip Year:", year);
    console.log("Payslip Month (zero-indexed):", month - 1);

    // Query for the payslip of the employee for the specific month/year
    const payslipData = await PaySlipModel.find({
      employee: new mongoose.Types.ObjectId(employee_id), // Ensure ObjectId type with `new`
      payslipYear: year,
      payslipmonth: month - 1, // MongoDB stores months as 0-11, so subtract 1
    });

    console.log("Payslip Data:", payslipData); // Log payslip data for debugging

    // Process the attendance data and build the employee group
    attendanceData.forEach((attendance) => {
      // Log attendance data to debug
      console.log("Attendance Data:", attendance);

      // Check if employee object exists and has _id
      if (attendance.employee && attendance.employee._id) {
        const employeeId = attendance.employee._id.toString();

        // Initialize employee data if not already added
        if (!employeeGroup[employeeId]) {
          employeeGroup[employeeId] = {
            employeename: `${attendance.employee.firstname} ${attendance.employee.lastname}`,
            employee_id: employeeId,
            totalWorkingDays: totalWorkingDays,
            present_count: 0,
            absent_count: 0,
            halfday_count: 0,
            leave_count: 0,
            payslip: null, // Default to null for payslip
          };
        }

        // Count statuses for the employee
        switch (attendance.status) {
          case "Present":
            employeeGroup[employeeId].present_count += 1;
            break;
          case "Absent":
            employeeGroup[employeeId].absent_count += 1;
            break;
          case "Half Day":
            employeeGroup[employeeId].halfday_count += 1;
            break;
          case "Leave":
            employeeGroup[employeeId].leave_count += 1;
            break;
          default:
            break;
        }
      } else {
        // Log if the employee is undefined or does not have _id
        console.log("No employee data found for attendance:", attendance);
      }
    });

    // If a payslip exists, add it to the employee's data
    if (payslipData.length > 0) {
      payslipData.forEach((payslip) => {
        const employeeId = payslip.employee.toString();
        if (employeeGroup[employeeId]) {
          employeeGroup[employeeId].payslip = payslip; // Add payslip to the employee
        }
      });
    }

    // Convert the employee group object to an array
    for (let employeeId in employeeGroup) {
      employeeAttendanceArray.push(employeeGroup[employeeId]);
    }

    // Return aggregated data in array format
    return res.status(200).json({
      message: "Employee attendance data retrieved successfully",
      success: true,
      data: employeeAttendanceArray,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};



  
  
  
  
  



module.exports = {add_attendance,get_attendance,get_employee_attendance};
