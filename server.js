import express from "express";
import cors from "cors";
import dataRoutes from "./routes/dataRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import moviesRoutes from "./routes/moviesRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import listRoutes from "./routes/listRoutes.js";
import { sequelize } from "./models/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", dataRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/list", listRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`API escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar la base de datos:", error);
    process.exit(1);
  }
};

startServer();

