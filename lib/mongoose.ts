import mongoose from "mongoose";

const DatabaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (err) {
    console.error(err);
  }
};

export default DatabaseConnection;
