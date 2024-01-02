const UserModel = require("../Database/model/userModel.js");
const Model = require("../Database/model/userModel.js");
const ContactModel = require("../Database/model/contactModel.js");
const TechWork = require("../Database/model/techWorkModel.js")
const bcrypt = require("bcryptjs");
// registration logic or API
const register = async (req, res,next) => {
    console.log("req.body:", req.body);
    try {
        const { firstName, lastName, email, password, confirmPassword, dateOfBirth, gender, address } = req.body;

        // Note: You need to await the findOne method to ensure it completes before proceeding
        const userExist = await UserModel.findOne({  email });

        if (userExist) {
            return res.status(200).json({ message: "Email already exists" });
        }
        console.log("Welcome new User name",`${firstName}`);

        // password don't match
        if (password != confirmPassword){
            return res.status(200).json({ message: "Password doesn't match" });
        }
        console.log("Password Test Sucessful");
        const userCreated = await UserModel.create({
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            dateOfBirth,
            gender,
            address,
        });

        res.status(201).json({ msg: "Registration Successful",
        token : await userCreated.generateToken(),
        userId : userCreated._id.toString() });
        console.log("Congraluation Registration Sucessful");
    } catch (err) {
        console.log(err);
        const status = 500;
        const message = "Internal Server Error";         
        const error = {
            status,
            message,            
        };        
        next(error);
    }
    
};



// Home Page
const home = async(req,res,next) => {
    const query = req.query;
    
    const queryObject = {};
    if(query){
        queryObject.query =  query;   
    }

    let apiData = Model.find(queryObject);
    const recieveData = await apiData;
    res.status(201).json({recieveData});
};

// Work Page 
const work = async (req, res) => {
    const query = req.query;

    try {
        console.log('Query Object:', query); // Log the query object
        // Use the TechWork model to find records based on the query
        const apiData = await TechWork.find(query);
        console.log('API Data:', apiData); // Log the fetched data
        res.status(200).json({ apiData });
    } catch (error) {
        console.error('Error:', error); // Log the complete error message
        res.status(500).json({ message: error.message });
    }
};



// Other routes and middleware can be added here

// Export the work function for use in other parts of your application


// Contact page
const contact = async (req, res, next) => {
    try {
        const { contactName, email, message } = req.body;
        console.log("welcome contact form");
        // Check if required fields are present
        if (!contactName || !email || !message) {
            return res.status(201).json({ msg: 'Name, email, and message are required fields' });
        }
        console.log("creating contact form");
        const contactCreated = await ContactModel.create({
            contactName,
            email,
            message,
        });
        console.log("created form");
        res.status(201).json({ msg: 'Thanks for contacting us. We will soon reach out to you.' });
    } catch (err) {
        console.log(err);
        const status = 500;
        const message = 'Internal Server Error';
        const error = {
            status,
            message,
        };
        next(error);
    }
};


// login Page
const login = async(req,res,next) => {
    const {email,password} = req.body;
    
    // check your exist or not
    const userExist = await UserModel.findOne({email});
    if(!userExist){
        console.log("Login unSucessful");
        return res.status(401).json({msg:"Invalid Credentials"});
    }
    // password is matching or not 
   // const isPasswordValid = await bcrypt.compare(password,userExist.password);
    const isPasswordValid = await userExist.compareLoginPassword(password);
    if(isPasswordValid){
        res.status(200).json({ msg: "Login Successful",
        token : await userExist.generateToken(),
        userId : userExist._id.toString() });
        console.log("Login Sucessful");
    }
    else{
         console.log("Password Invalid");
         return res.status(401).json({msg:"Invalid Email & password"});
    }
 

}


// user data on login 
const user = async (req, res) => {
    try {
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({  userData });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {home,work,contact,register,login,user};