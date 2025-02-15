import fetch from "node-fetch";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { connectMongodb } from "./db/mongo.js";
import logger from "./utils/logger.js";
import env from "./config/env.js";

import middleware from "./middleware/index.js";
import routes from "./routes/index.js";

const secrets = env();

const port = secrets.PORT || 5000;

const apiVersion = "v1";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cytric NFT Minting API",
      version: "1.0.0",
      description: "API for storing and retrieving NFT metadata",
    },
    servers: [
      { url: env().NODE_ENV == "dev" ? "http://localhost:8080" : env().DEPLOYED_SERVER_BASE_URL },
    ],
  },
  apis: ["./src/routes/*.js"],
};

(async () => {
  try {
    // Connect to MongoDB instance
    await connectMongodb();

    const swaggerDocs = swaggerJSDoc(swaggerOptions);
    middleware.addMiddlewareX("/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    // Add routes
    middleware.addMiddleware(`/${apiVersion}`, routes.nft);
    middleware.addMiddleware(``, routes.monitor);

    // Start server
    const server = middleware.getApp().listen(port, () => {
      logger.info(`Server Running...Port: ${port}`);
    });

    server.timeout = 300000;

    // Reload render server periodically
    const url = String(secrets.DEPLOYED_SERVER_BASE_URL);
    const interval = 300000;

    function reloadServer() {
      fetch(`${url.replace("/v1", "")}`)
        .then((response) => {
          console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
        })
        .catch((error) => {
          console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
        });
    }

    setInterval(reloadServer, interval);
  } catch (error) {
    logger.error("Server failed to start:", error);
    process.exit(1);
  }
})();

export default middleware.getApp();
