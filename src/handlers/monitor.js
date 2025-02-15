export default class ServerMonitorHandler {
  constructor(responseHandler) {
    this._handler = responseHandler;
  }

  get handler() {
    return this._handler;
  }

  set handler(responseHandler) {
    this._handler = responseHandler;
  }

  async serverMonitor(req, res) {
    try {
      return this._handler.success(res, "Welcome To Cytric Nft Minting Server");
    } catch (error) {
      return this._handler.internalServerError(res, error.message || error);
    }
  }
}
