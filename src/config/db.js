import mongoose from "mongoose";

const connectDb = async () => {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/warehouse";
  try {
    await mongoose.connect(uri, { autoIndex: true });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error", err.message);
    process.exit(1);
  }
};

export default connectDb;
