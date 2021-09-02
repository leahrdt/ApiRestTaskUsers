//3.0.0 nos conectamos con mongoose
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(     { 
        user: {type: String},
        email: {type: String, required: true},
        password: {type: String, required: true}
    }
);

module.exports = mongoose.model("users", userSchema);

