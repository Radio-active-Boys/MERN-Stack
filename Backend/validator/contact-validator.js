const {z} = require("zod");

// creating a object Schema using zod
const contactSchema = z.object({
    name: z
    .string({required_error:"Enter Name"})
    .trim()
    .min(3,{message:"Name must be at least of 3 characters"}),

    email: z
    .string({required_error:"Enter Email"})
    .trim()
    .email({message:"Invalid Email Address"}),

    message: z
    .string({required_error:"Enter Message"})
    .trim()
    .min(10,{message:"Min limit 10 characters"})
    .max(60,{message:"Max limit 60 characters"}),
});


module.exports = contactSchema;