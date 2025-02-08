const { leaveTypeModel } = require("../Models/leaveType");


const addleavetype = async (req,res) =>{
    const {collegeId} = req.user;
    const {leavetype} = req.body;

    const newleavetype = new leaveTypeModel({
        leavetype,
        collegeId,
    })

    await newleavetype.save();

    return res.status(201).json({
        message:"Leave Type Added Successfully!!!",
        success:true,
    })
}


const getleaveType = async (req,res) =>{
    const {id} = req.query;
    const {collegeId} = req.user;

    if(id){
        const leavedata = await leaveTypeModel.findOne({collegeId,_id:id});

        if(!leavedata){
            return res.status(404).json({
                message:"Data Not Found !!",
                success:false,
            })
        }

        return res.status(200).json({
            message:"Data Found Successfully !!",
            data:leavedata,
            success:true,
        })
    }else{
        const leavedata = await leaveTypeModel.findOne({collegeId});

        if(!leavedata){
            return res.status(404).json({
                message:"Data Not Found !!",
                success:false,
            })
        }

        return res.status(200).json({
            message:"Data Found Successfully !!",
            data:leavedata,
            success:true,
        })
    }
}

module.exports = {addleavetype,getleaveType}