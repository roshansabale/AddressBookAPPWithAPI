const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "First name can not be empty"]
    },
    lastName: {
        type: String,
        required: [true, "Last name can not be empty"]
    },
    email: {
        type: String,
        required: [true, "Email can not be empty"]
    },
    address: {
        type: String,
        required: [true, "Address can not be empty"]
    },
    password: {
        type: String,
        required: [true, "Password can not be empty"]
    },
    state: {
        type: String,
        required: [true, "State can not be empty"]
    },
    city: {
        type: String,
        required: [true, "City can not be empty"]
    },
    phone: {
        type: String,
        required: [true, "Phone number can not be empty"]
    },

    zipCode: {
        type: String,
        required: [true, "ZipCode can not be empty"]
    },
    acceptStatus: {
        type: String,
        required: [true, "Acceptance status can not be empty"]
    },
}, { timestamps: true });



let personSchema = new Schema({
    name: {
        type: String,
        required: [true, "First name can not be empty"]
    },
    address: {
        type: String,
        required: [true, "Address can not be empty"]
    },
    email: {
        type: String,
        required: [true, "Email can not be empty"]
    },
    phone: {
        type: Number,
        required: [true, "Phone number can not be empty"]
    },
    state: {
        type: String,
        required: [true, "State can not be empty"]
    },
    city: {
        type: String,
        required: [true, "City can not be empty"]
    },

    zipcode: {
        type: String,
        required: [true, "ZipCode can not be empty"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
}, { timestamps: true });

//collections
exports.userModel = mongoose.model("user", userSchema);
exports.personModel = mongoose.model("people", personSchema);