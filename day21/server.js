const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 3000;

const start = async () => {
  const uri = process.env.MONGO_URI;
  if (uri) {
    await connectDB(uri);
  } else {
    console.warn("MONGO_URI is not set, skipping DB connection");
  }
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

start();
