const {z} = require("zod");
const signinSchema = z.object({
    email: z
    .string({required_error:"Enter Email"})
    .trim()
    .email({message:"Invalid Email Address"}),

    password: z
    .string({required_error:"Enter Pasaword"})
    .trim()
    .min(6,{message:"Password must be at least of 3 character"})
    .max(10,{message:"Password max length"}),
});
module.exports = signinSchema;