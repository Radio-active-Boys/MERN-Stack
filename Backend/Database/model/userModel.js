const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
// Registration Schema
const RegistrationSchema = new mongoose.Schema(
    {
        
          "firstName": {
            "type": "string",
            "required": true
          },
          "lastName": {
            "type": "string",
            "required": true
          },
          "email": {
            "type": "string",
            "format": "email",
            "required": true
          },
          "password": {
            "type": "string",
            "minLength": 8,
            "required": true
          },
          "confirmPassword": {
            "type": "string",
            "minLength": 8,
            "required": true
          },
          "dateOfBirth": {
            "type": "string",
            "format": "date",
            "required": true
          },
          "gender": {
            "type": "string",
            "enum": ["male", "female", "other"],
            "required": false
          },
          "address": {
             
                "type": "string",
                "required": false
              }
            }           
);
// secure password with bcryptjs using pre method
// secure password with bcryptjs using pre method
RegistrationSchema.pre("save", async function (next) {
  
  const user = this;

  try {
    if (!user.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, salt);
    user.password = hash_password;
    next();
    // Do not hash confirmPassword, as it's generally not needed
  } catch (error) {
    return next(error);
  }
  console.log("Pre method in Action", this);
  // Continue with the save operation
  
});

// json web token 
// schema.methods.<nameFxn> is very powerful to create function with in schma and model can access them easily anywhere
RegistrationSchema.methods.generateToken = async function (){
  try {
    return JWT.sign({
      userId : this._id.toString(),
      email: this.email,
      isAdmin: this.isAdmin,
    },
    process.env.JWT_SIGNATURE_KEY,
    {
      expiresIn:"30d",
    }
    )
  } catch (error) {
    
  }
};

// compare user login passord validation
RegistrationSchema.methods.compareLoginPassword = async function(password){
    console.log("Validation of password using bcrypt is methods");
    return  bcrypt.compare(password,this.password);
    
};

// mongoose.model('<collectionNameinDB>',<Schema>);
const UserModel = mongoose.model('userData1',RegistrationSchema);

module.exports = UserModel;