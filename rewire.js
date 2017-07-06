const resolve = require("resolve");
const path = require("path");

var pkgPath = path.resolve("package.json");
var utils = require('./utils');

utils.verifyPackageExists();

console.log("Starting application in rewire");


