const app = require("./src/app");
const connectDB = require("./src/config/db");
const PORT = process.env.PORT || 5000;

const serverStart = async (params) => {
  try {
    await connectDB();
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(`MongoDB Connection Error: ${err}`);
  }
};

serverStart();
