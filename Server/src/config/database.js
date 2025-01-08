import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const DB_URI = process.env.MONGO_DB_URI;

const DbConnection = async () => {
  try {
    const { connection } = mongoose.connect(DB_URI);
    if (connection) console.log(`Connected To DB: ${connection.host}`);
  } catch (error) {
    console.log("Error in DB Connection", error);
    process.exit(1);
  }
};

export default DbConnection;
