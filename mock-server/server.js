const jsonServer = require("json-server");
const fs = require("fs");
const path = require("path");
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

const jsonfolder = path.resolve(__dirname, "dbs");

const db = {};
// const files = fs.readdirSync(jsonfolder);
// files.forEach(function (file) {
//   if (path.extname(jsonfolder + file) === ".json") {
//     db[path.basename(jsonfolder + file, ".json")] = require(path.join(
//       jsonfolder,
//       file
//     ));
//   }
// });
db["events"] = require("./dbs/events.json");
const cities = require("./dbs/cities.json");
db.events.map((item) => {
  item.city = cities.find((p) => p.id === item.city).name;
  return item;
});
const router = jsonServer.router(db);
server.use(middlewares);
server.use(router);
server.listen(5000, function () {
  console.log("JSON Server is running");
});
