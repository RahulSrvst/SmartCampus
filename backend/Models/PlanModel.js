const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlanSchema = new Schema({
  name: String,
  price: Number,
  feature: [String],
  validity: Number
});

const PlanModel = mongoose.model('Plan', PlanSchema);
module.exports = PlanModel;
