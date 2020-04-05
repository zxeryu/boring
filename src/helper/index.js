const { parse, stringify } = require("querystring");

const toSearchString = (query) => {
  const s = stringify(query);
  return s ? `?${stringify(query)}` : "";
};

function parseSearchString(search) {
  if (search.startsWith("?")) {
    search = search.slice(1);
  }
  return parse(search);
}

module.exports = {
  toSearchString,
  parseSearchString,
};
