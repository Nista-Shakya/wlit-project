const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const artSchema = new Schema({
  categories: String,
  image: {
    // data: Buffer,
    type: String
  },
  title: {
    type: String,
    required: true
  },
  price: String,
  description: String
}, {timestamps: true});

module.exports = mongoose.model('art',artSchema)