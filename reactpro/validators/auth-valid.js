const {z}= require("zod");

const signupSchema = z.object({
    username:z.string({required_error:"Name is required"})
    .trim()
    .min(3,{message:"Name must be at least of 3 chars"})
    .max(255,{message:"name must not be more than 255 chars"}),
    email:z.string({required_error:"Email is required"})
    .trim()
    .email({message:"Invalid email addresss"})
    .min(3,{message:"Email must be at least of 3 chars"})
    .max(255,{message:"Email must not be more than 255 chars"}),
    password:z.string({required_error:"Password is required"})
    .trim()
    .min(3,{message:"Password must be at least of 3 chars"})
    .max(255,{message:"Password must not be more than 255 chars"}),
    dob:z.string({required_error:"dob is required"})
    .trim()
    .min(3,{message:"dob must be at least of 3 chars"})
    .max(255,{message:"dob must not be more than 255 chars"}),
    organisation:z.string({required_error:"organisation is required"})
    .trim()
    .min(3,{message:"organisation must be at least of 3 chars"})
    .max(255,{message:"organisation must not be more than 255 chars"}),
});
module.exports = signupSchema;