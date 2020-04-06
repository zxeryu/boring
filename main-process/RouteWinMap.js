const { get, set, omit } = require("lodash");
class RouteWinMap {
  maps = {};

  getWin(id) {
    return get(this.maps, id, undefined);
  }

  pushOrUpdateWin(key, win) {
    set(this.maps, key, win);
  }

  removeWin(...ids) {
    this.maps = omit(this.maps, [...ids]);
  }
}

const winMap = new RouteWinMap();

module.exports = {
  winMap,
};
