import express from "express";
import handlers from "../handlers/index.js";

const api = express.Router({
  mergeParams: true,
});

export default function MonitorRoute() {
  const handler = handlers.monitor;

  api.route("/").get((req, res) => {
    handler.serverMonitor(req, res);
  });

  return api;
}
