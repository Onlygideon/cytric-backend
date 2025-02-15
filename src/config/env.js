import dotenv from "dotenv";
dotenv.config();

export default () => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    DEPLOYED_SERVER_BASE_URL: process.env.DEPLOYED_SERVER_BASE_URL,
  };
};
