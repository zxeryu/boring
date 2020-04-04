const { assign, map, concat } = require("lodash");
class RouteTree {
  id;
  name;
  path;
  routes;
  parent;
  config;
  win;

  set(key, value) {
    return new RouteTree(assign({}, this, { [key]: value }));
  }

  setParent(route) {
    return this.set("parent", route);
  }

  constructor(route) {
    this.id = route.id;
    this.name = route.name;
    this.path = route.path;
    this.routes = map(route.routes || [], (subRouteTree) =>
      subRouteTree.setParent(this)
    );
    this.parent = route.parent;
    this.config = route.config;
    this.win = route.win;
  }

  static id = (id) => {
    return new RouteTree({
      id,
    });
  };

  withPath(path) {
    return this.set("path", path);
  }

  withName(name) {
    return this.set("name", name);
  }

  withRoutes(...routes) {
    return this.set("routes", concat(this.routes || []), ...routes);
  }

  withConfig(config) {
    return this.set("config", config);
  }

  withWin(win) {
    return this.set("win", win);
  }
}

module.exports = {
  RouteTree,
};
