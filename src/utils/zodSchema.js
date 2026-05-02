const { z } = require("zod");

const registerSchema = z.object({
  firstName: z.string().min(1, "Enter a valid name"),
  lastName: z.string().min(1, "Enter a valid name"),
  emailId: z.string().email("Enter a valid email id"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const loginSchema = z.object({
  emailId: z.string().email("Enter a valid email id"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

module.exports = { registerSchema, loginSchema };
