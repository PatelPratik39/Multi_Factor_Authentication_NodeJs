import { connect } from "mongoose";

const dbConnect = async () => {
  try {
    // console.log("MongoDB Connection String:", process.env.CONNECTION_STRING); // Log to check if it's defined

    const mongoDbConnection = await connect(process.env.CONNECTION_STRING);
    console.log(`MongoDB database connected: ${mongoDbConnection.connection.host}`); // Log the host
  } catch (error) {
    console.log(`Database connection failed: ${error}`);
    process.exit(1);
  }
};

export default dbConnect;
