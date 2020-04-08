const { get, set, omit } = require("lodash");
class RouteWinMap {
  maps = {};

  getWin(id) {
    return get(this.maps, id, undefined);
  }

  pushOrUpdateWin(id, win) {
    set(this.maps, id, win);
  }

  removeWin(id) {
    this.maps = omit(this.maps, [id]);
  }
}

const winMap = new RouteWinMap();

module.exports = {
  winMap,
};
