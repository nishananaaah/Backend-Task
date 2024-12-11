const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({ //schema is nothing it is the structure of the document 
    //inside this we will define what are the fields in the perticular collection
    firstName:{
        type:String,
        required:[true,"FirstName is required"],
        minLength:3,
        maxLength:20,
        trim:true,
        validate:{
            validator:function(value){
                const nameRegex = /^[a-zA-Z\s]+$/;
                return nameRegex.test(value);
            },
            message:"First Name must be contains only alphabetic characters"
        }
    },
    lastName:{
        type:String,
        required:[true,"LastName is required"]
    },
    emailAddress:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required:false
    } //it has 4 fields
})

module.exports = mongoose.model("Contact",contactSchema)