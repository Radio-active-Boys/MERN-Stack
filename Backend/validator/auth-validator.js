const {z} = require("zod");

// creating a object Schema using zod
const signupSchema = z.object({
    firstName: z
    .string({required_error:"Enter First Name"})
    .trim()
    .min(3,{message:"Name must be at least of 3 character"}),

    lastName: z
    .string({required_error:"Enter Last Name"})
    .trim()
    .min(3,{message:"Name must be at least of 3 character"}),

    email: z
    .string({required_error:"Enter Email"})
    .trim()
    .email({message:"Invalid Email Address"}),

    password: z
    .string({required_error:"Enter Pasaword"})
    .trim()
    .min(6,{message:"Password must be at least of 3 character"})
    .max(10,{message:"Password max length"}),

    confirmPassword: z
    .string({required_error:"Enter Pasaword"})
    .trim()
    .min(6,{message:"Password must be at least of 3 character"})
    .max(10,{message:"Password max length"}),

    dateOfBirth: z
    .string({required_error:"Enter DOB"})
    .trim(),

    gender: z
    .string({required_error:"Enter gender"})
    .trim(),

    address: z
    .string({required_error:"Enter Address"})
    .trim()
    .min(6,{message:"Adress must be at least of 6 character"}),   
  
});

module.exports = signupSchema;