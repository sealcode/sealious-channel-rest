var path = require("path");
var Sealious = require("sealious");
var www_server = Sealious.ChipManager.get_chip("channel", "www_server");

var path_to_public_rest_docs = path.resolve(module.filename, "../docs/public");
console.log(path_to_public_rest_docs);
www_server.static_route(path_to_public_rest_docs, '/rest_docs');