const { PayheadModel } = require("../Models/Payhead");

const add_paytype = async (req, res) => {
  try {
    const { payheadtype, description, addition_or_deduction } = req.body;

    const { collegeId } = req.user;

    if (!collegeId) {
      return res.status(404).json({
        message: "UnAuthorized College !!!",
        success: true,
      });
    }
    const newPayhead = new PayheadModel({
      payheadtype,
      description,
      addition_or_deduction,
      collegeId,
    });

    await newPayhead.save();
    return res.status(201).json({
      message: "PayHead added successfully!",
      data: newPayhead,
      success: true,
    });
  } catch (error) {
    console.log("pay Head Error", error);
    res.status(500).json({
      message: "Pay Head Added Successfully !!!",
      success: false,
    });
  }
};

const get_paytype = async (req, res) => {
  try {
    const { id } = req.query;
    const { collegeId } = req.user;

    if (!collegeId) {
      return res.status(404).json({
        message: "UnAuthorized College !!!",
        success: true,
      });
    }
    if (id) {
      const paytype = await PayheadModel.findOne({_id:id,collegeId});

      if (!paytype) {
        return res.status(404).json({
          message: "Paytype not Found !!!",
          success: false,
        });
      }
      return res.status(200).json({
        message: "Paytype Get Successfully !!!",
        data: paytype,
        success: false,
      });
    } else {
      const paytype = await PayheadModel.find({collegeId});

      if (!paytype) {
        return res.status(404).json({
          message: "Paytype not Found !!!",
          success: false,
        });
      }
      return res.status(200).json({
        message: "Paytype Get Successfully !!!",
        data: paytype,
        success: false,
      });
    }
  } catch (error) {
    console.log("pay Head Error", error);
    res.status(500).json({
      message: "Pay Head Added Successfully !!!",
      success: false,
    });
  }
};

module.exports = { get_paytype, add_paytype };
