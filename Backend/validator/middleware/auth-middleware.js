const jwt = require("jsonwebtoken");
const user = require("../../Database/model/userModel")
const authMiddleware = async(req,res,next) => {
    const token = req.header('Authorization');

    if(!token){
        res.status(401).json({meassage : "Un-authorization HTTP , Token not providede"})
    }
    
    // Assuming token is in the format "Bearer <jwt voken>, Removing the "Bearer" prefix'
    const jwtToken = token.replace("Bearer", "").trim();
    console.log("token from authiddleware",jwtToken);
    try {

        const isVerified = jwt.verify(jwtToken,process.env.JWT_SIGNATURE_KEY);
        console.log("verified token data",isVerified);


        const userData = await user.findOne({email : isVerified.email}).select({password:0,confirmPassword:0})
        req.user = userData;
        req.token = jwtToken;
        req.userID = userData._id;

        next();
    } catch (error) {
        return res.status(400).json({ msg:"Token is not valid "})
    }
    
    
}

module.exports = authMiddleware;