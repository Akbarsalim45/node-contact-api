import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_URL);

    console.log(
      "Connected to database",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log("err", err);
    process.exit(1);
  }
};
