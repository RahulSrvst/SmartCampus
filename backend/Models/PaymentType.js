const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    typename:{
        type:String,
        required:true,
    }
})

const PaymentModel = mongoose.model("Payment",PaymentSchema);

module.exports = {PaymentModel};