const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const PlanSchema = new Schema({
  name: String,
  price: Number,
  feature: [String],
  validity: Number
});

PlanSchema.plugin(autoIncrement, { inc_field: "id" });  

const PlanModel = mongoose.model('Plan', PlanSchema);
module.exports = PlanModel;
