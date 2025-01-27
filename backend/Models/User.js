const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    college: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    pincode: {
        type: Number,
        required: false,
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Plan",
        required: true,
    },
    password: { 
        type: String,
        required: false,
    },logo: { 
        type: String,
        required: false,
    },loginToken: { 
        type: String,
        required: false,
    },
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
