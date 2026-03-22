require("dotenv").config();
const connectDB = require("./config/database.config");
const app = require("./app");

const PORT = process.env.PORT || 5010;

// Connect to Database and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
