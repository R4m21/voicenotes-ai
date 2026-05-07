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

const VALID_PRIORITIES = ["High", "Medium", "Low"];

const actionItemsSchema = z.object({
  id: z.string(),
  text: z.string(),
  priority: z.enum(VALID_PRIORITIES),
});

const aiResponseSchema = z
  .object({
    title: z.string().optional(),
    summary: z.string().optional(),
    actionItems: z.array(actionItemsSchema).optional(),
    keywords: z.array(z.string()).optional(),
  })
  .transform((data) => {
    return {
      title: data.title || "",
      summary: data.summary || "",
      actionItems: (data.actionItems || []).map((item) => ({
        id: item?.id?.trim() || "",
        text: item?.text?.trim() || "",
        priority: VALID_PRIORITIES.includes(item.priority)
          ? item.priority
          : "Low",
      })),
      keywords: (data.keywords || []).filter(Boolean),
    };
  });

module.exports = { registerSchema, loginSchema, aiResponseSchema };
