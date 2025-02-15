import usecases from "../usecases/index.js";
import ResponseHandler from "./response.js";
import NftHandler from "./nft.js";
import ServerMonitorHandler from "./monitor.js";

export default {
  nft: new NftHandler(usecases.nft, ResponseHandler),
  monitor: new ServerMonitorHandler(ResponseHandler),
};
