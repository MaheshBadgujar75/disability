const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cluster = require("cluster");
const os = require("os");
const process = require("process");
const helmet = require("helmet"); // Security middleware
const compression = require("compression"); // Response compression
const rateLimit = require("express-rate-limit"); // Rate limiting
const connectDB = require("./config/db");

// Import routes
const disabilityRoutes = require("./routes/disabilities");
const disabilityTypeRoutes = require("./routes/disabilitiestypes");
const governmentSchemeRoutes = require("./routes/govschemes");

dotenv.config();

// Get environment variables
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";
const WORKERS = process.env.WEB_CONCURRENCY || os.cpus().length;

// Determine if primary or worker process
if (cluster.isPrimary) {
  console.log(`🚀 Primary ${process.pid} is running in ${NODE_ENV} mode`);
  console.log(`🔄 Setting up ${WORKERS} workers...`);

  // Fork workers based on configured count
  for (let i = 0; i < WORKERS; i++) {
    cluster.fork();
  }

  let disconnectCount = 0;
  const totalWorkers = WORKERS;

  // Handle worker exits and restart them
  cluster.on("exit", (worker, code, signal) => {
    const exitType = worker.exitedAfterDisconnect ? "intentional" : "unexpected";
    console.log(`⚠️ Worker ${worker.process.pid} ${exitType} exit with code: ${code} and signal: ${signal}`);

    // Only restart workers that crashed unexpectedly
    if (!worker.exitedAfterDisconnect) {
      console.log("🔄 Starting a new worker...");
      cluster.fork();
    }
  });

  // Graceful reload without downtime
  process.on("SIGUSR2", () => {
    console.log("🔄 Received SIGUSR2 - Reloading workers gracefully...");

    disconnectCount = 0;
    const workerIds = Object.keys(cluster.workers);

    // Sequential worker restart to avoid downtime
    function restartWorker(i) {
      if (i >= workerIds.length) return;

      const worker = cluster.workers[workerIds[i]];
      console.log(`🔁 Restarting worker ${worker.process.pid}...`);

      // Create a new worker before disconnecting the old one
      const newWorker = cluster.fork();

      // When the new worker is listening, disconnect the old one
      newWorker.on("listening", () => {
        worker.disconnect();
        disconnectCount++;

        // Move to next worker when this one has disconnected
        worker.on("disconnect", () => {
          restartWorker(i + 1);
        });
      });
    }

    // Start the sequential restart process
    restartWorker(0);
  });

  // Graceful shutdown handler
  process.on("SIGTERM", () => {
    console.log("🛑 Received SIGTERM - Gracefully shutting down primary process...");

    // Signal workers to finish processing requests and then exit
    for (const id in cluster.workers) {
      cluster.workers[id].process.kill("SIGTERM");
    }
  });
} else {
  // Worker process - actual server code

  // Initialize app
  const app = express();

  // Allowed origins for CORS
  const allowedOrigins = [
    "http://localhost:5175",
    "https://yourfrontenddomain.com",
  ];

  // Security middleware
  app.use(helmet());

  // Compression middleware
  app.use(compression());

  // Rate limiting
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests from this IP, please try again after 15 minutes"
  });

  // Apply rate limiting to all API routes
  app.use("/api/", apiLimiter);

  // CORS middleware
  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET"], // Only allow GET requests
    allowedHeaders: ["Content-Type", "Authorization"],
  }));

  // Body parser middleware
  app.use(express.json({ limit: "10kb" })); // Limit body size

  // Database connection
  connectDB();

  // Add request ID for tracking
  app.use((req, res, next) => {
    req.id = Date.now().toString(36) + Math.random().toString(36).substr(2);
    res.setHeader("X-Request-ID", req.id);
    next();
  });

  // Simple request logger
  if (NODE_ENV === "development") {
    app.use((req, res, next) => {
      console.log(`[${req.id}] ${req.method} ${req.originalUrl} [Worker ${process.pid}]`);
      next();
    });
  }

  // Routes
  app.use("/api/disabilities", disabilityRoutes);
  app.use("/api/disabilitiestypes", disabilityTypeRoutes);
  app.use("/api/governmentschemes", governmentSchemeRoutes);

  // Health check endpoint
  app.get("/health", (req, res) => {
    res.status(200).json({
      status: "ok",
      workerId: process.pid,
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      env: NODE_ENV
    });
  });

  // Root route to show API is working
  app.get("/", (req, res) => {
    // HTML response for browser viewing
    if (req.headers.accept && req.headers.accept.includes('text/html')) {
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <title>API Status</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                background: #f7f9fc;
                color: #333;
                max-width: 800px;
                margin: 0 auto;
                padding: 2rem;
                line-height: 1.6;
              }
              .container {
                background: white;
                border-radius: 8px;
                padding: 2rem;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                border-left: 5px solid #4CAF50;
              }
              h1 {
                margin-top: 0;
                color: #2c3e50;
                border-bottom: 1px solid #eee;
                padding-bottom: 10px;
              }
              .status {
                display: inline-block;
                background: #4CAF50;
                color: white;
                padding: 5px 15px;
                border-radius: 20px;
                font-weight: bold;
              }
              .endpoints {
                margin-top: 2rem;
              }
              code {
                background: #f4f6f8;
                padding: 0.2em 0.4em;
                border-radius: 3px;
                font-family: SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                font-size: 90%;
              }
              .endpoint {
                background: #f4f6f8;
                padding: 10px 15px;
                border-radius: 5px;
                margin-bottom: 10px;
                border-left: 3px solid #3498db;
              }
              .worker {
                margin-top: 1.5rem;
                font-size: 0.9rem;
                color: #666;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>API Status</h1>
              <p>The API is <span class="status">running</span></p>
              
              <div class="endpoints">
                <h2>Available Endpoints:</h2>
                
                <div class="endpoint">
                  <code>GET /api/disabilities</code> - Get all disabilities
                </div>
                
                <div class="endpoint">
                  <code>GET /api/disabilitiestypes</code> - Get disability types
                </div>
                
                <div class="endpoint">
                  <code>GET /api/governmentschemes</code> - Get government schemes
                </div>
                
                <div class="endpoint">
                  <code>GET /health</code> - Check API health status
                </div>
              </div>
              
              <div class="worker">
                <p>Worker ID: ${process.pid}</p>
                <p>Server Time: ${new Date().toLocaleString()}</p>
              </div>
            </div>
          </body>
        </html>
      `);
    } else {
      // JSON response for API clients
      res.json({
        status: "OK",
        message: "API is working",
        version: process.env.npm_package_version || "1.0.0",
        endpoints: {
          disabilities: "/api/disabilities",
          disabilityTypes: "/api/disabilitiestypes",
          governmentSchemes: "/api/governmentschemes"
        },
        server: {
          workerId: process.pid,
          time: new Date().toISOString()
        }
      });
    }
  });

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(`[${req.id}] Error:`, err);
    res.status(err.status || 500).json({
      error: {
        message: NODE_ENV === "production" ? "Something went wrong" : err.message,
        code: err.code || "INTERNAL_ERROR"
      }
    });
  });

  // Start server
  const server = app.listen(PORT, () => {
    console.log(`✅ Worker ${process.pid} started and listening on port ${PORT}`);
  });

  // Handling unhandled promise rejections
  process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    // Close server & exit process
    server.close(() => process.exit(1));
  });

  // Graceful shutdown handler
  process.on("SIGTERM", () => {
    console.log(`🛑 Worker ${process.pid} received SIGTERM signal, shutting down gracefully...`);
    server.close(() => {
      console.log("🔒 HTTP server closed");
      process.exit(0);
    });
  });
}