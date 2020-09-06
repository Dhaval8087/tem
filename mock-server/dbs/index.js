const cities = require("./cities.json");
const events = require("./events.json");
module.exports = function () {
  return {
    cities,
    events,
  };
};

