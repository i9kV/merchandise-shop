import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import db from "./db";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => res.send("Merchandise API running!"));
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
  try {
    await db.query("SELECT 1");
    console.log(`✅ Server running on port ${PORT}`);
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
});
