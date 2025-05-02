const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const projectSchema = require("../models/project");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Name is required"],
        maxLength: [50, "Name must be less than 50 characters"],
        minLength: [3, "Name must be at least 3 characters"]
    },

    email: {
        type:String,
        required: [true,"Email is required"],
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: 'Please enter a valid email'
        }
    },

    password: {
        type:String,
        required: [true,"Password is required"],
        minLength: [6, "Password must be at least 6 characters"]
    },

    country: {
        type: String,
        default : "India"
    },

    projects: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'project',
    }]
});

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
});

module.exports = mongoose.model("user",userSchema);