import mongoose from "mongoose";
import env from "../config/env.js";
import logger from "../utils/logger.js";

let { MONGO_URI } = env();

export const mongoRemote = MONGO_URI;

export const connectMongodb = async () => {
  try {
    mongoose.set("strictQuery", false);

    await mongoose.connect(mongoRemote, {});
    logger.info("Cytric Nft Minting Database Connected Successfully!");
  } catch (err) {
    console.log("mongodb", err);
    logger.error("MongoDB connection - error: ", err.code);
    logger.error("MongoDB connection - retrying");

    connectMongodb();
  }
};
