import { connect } from "mongoose";

const dbConnect = async () => {
  try {
    const mongoDbConnection = await connect(process.env.connect)
  } catch (error) {
    console.log(`Database connection Failed ${error}`);
    process.exit(1);
  }
};

export default dbConnect;
