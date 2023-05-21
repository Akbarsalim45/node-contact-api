import dotenv from "dotenv";
import express from "express";
import { dbConnect } from "./config/dbConfig.js";
import { errorHandler } from "./middleware/errorHandler.js";
import contactRoutes from "./routes/contactRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
dbConnect();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contacts", contactRoutes);
app.use("/api/user", userRoutes);
app.use(errorHandler);

app.listen(port, () => console.log(`App running on port ${port}`));
