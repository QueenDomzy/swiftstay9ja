// server/index.ts
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

// Import routes
import authRoutes from "./routes/auth";
import aiRoutes from "./routes/ai";
import propertyRoutes from "./routes/property";
import bookingRoutes from "./routes/booking";
import onboardingRoutes from "./routes/onboarding";
import paymentRoutes from "./routes/payment";
import uploadRoutes from "./routes/upload";
import userRoutes from "./routes/user";

// Middleware
import { authenticate } from "./middleware/auth";

dotenv.config();

const app = express();

// --------------------
// Middleware
// --------------------
app.use(
  cors({
    origin: [
      "http://localhost:5173", // frontend dev
      "https://swiftstaynigeria-frontend.onrender.com", // production frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// --------------------
// API Routes
// --------------------
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/onboarding", onboardingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/user", authenticate, userRoutes);

// --------------------
// Health Check
// --------------------
app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("🚀 SwiftStayNig Backend Running ✅");
});

// --------------------
// Global Error Handler
// --------------------
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Global error handler:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// --------------------
// Start Server
// --------------------
const PORT = Number(process.env.PORT) || 5003;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

export default app;
