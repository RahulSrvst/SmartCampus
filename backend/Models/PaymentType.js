const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    typename:{
        type:String,
        required:true,
    },
    collegeId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true,
        }
})

const PaymentModel = mongoose.model("Payment",PaymentSchema);

module.exports = {PaymentModel};