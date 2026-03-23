require("dotenv").config();

let PORT;
try {
  const env = require("./config/env.config");
  PORT = env.PORT;
} catch (err) {
  // Fail fast before starting the server or accepting requests.
  console.error(`❌ ${err.message}`);
  process.exit(1);
}

const connectDB = require("./config/database.config");
const app = require("./app");

// Connect to Database and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
