import mongoose from "mongoose";

mongoose.set("bufferCommands", false);

let dbStatus = {
  connected: false,
  lastError: null,
};

export async function connectDB() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is required");
  }

  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 15000,
  });
  dbStatus = { connected: true, lastError: null };
  console.log("MongoDB connected");
}

export function getDBStatus() {
  return {
    connected: mongoose.connection.readyState === 1,
    readyState: mongoose.connection.readyState,
    lastError: dbStatus.lastError,
  };
}

export async function connectDBWithRetry(intervalMs = 10000) {
  try {
    await connectDB();
  } catch (error) {
    dbStatus = { connected: false, lastError: error.message };
    console.error("MongoDB connection failed:", error.message);
    console.error("Retrying MongoDB connection in", `${intervalMs / 1000}s`);
    setTimeout(() => connectDBWithRetry(intervalMs), intervalMs);
  }
}

mongoose.connection.on("connected", () => {
  dbStatus = { connected: true, lastError: null };
});

mongoose.connection.on("disconnected", () => {
  dbStatus.connected = false;
});

mongoose.connection.on("error", (error) => {
  dbStatus = { connected: false, lastError: error.message };
});
