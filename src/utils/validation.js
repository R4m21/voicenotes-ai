const { registerSchema, loginSchema } = require("./zodSchema");

const validateRegisterData = (req) => {
  try {
    registerSchema.parse(req.body);
  } catch (error) {
    throw new Error(error.message);
  }
};

const validateLoginData = (req) => {
  try {
    loginSchema.parse(req.body);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { validateRegisterData, validateLoginData };
