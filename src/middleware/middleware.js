export default class Middleware {
  constructor(app) {
    this._app = app;
  }

  getApp() {
    return this._app;
  }

  setApp(app) {
    this._app = app;
  }

  addMiddleware(arg1, arg2) {
    if (arg2) {
      this.getApp().use(arg1, arg2);
    } else {
      this.getApp().use("", arg1);
    }
  }

  addMiddlewareX(arg1, arg2, arg3) {
    this.getApp().use(arg1, arg2, arg3);
  }
}
