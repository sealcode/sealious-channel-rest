"use strict";
var Sealious = require("sealious");
require("sealious-www-server");
var merge = require("merge");

var REST = new Sealious.ChipTypes.Channel("rest");

var http_to_subject_method = {
	"GET": "show",
	"POST": "create",
	"PATCH": "edit",
	"PUT": "replace",
	"DELETE": "delete"
}

function handle_request(context, request){
	var path_elements = request.params.elements.split('/');
	var action_name = http_to_subject_method[request.method];
	var action = new Sealious.Action(path_elements, action_name);
	return action.run(context, merge(request.payload, request.query));
}

REST.start = function(){
	var www_server = Sealious.ChipManager.get_chip("channel", "www_server");
	var rest_url_base = Sealious.ConfigManager.get_config().rest_config.url_base;

	var path = `${rest_url_base}/{elements*}`;

	www_server.route({
		method: ["GET", "DELETE"],
		path: path,
		handler: handle_request
	})

	www_server.route({
		method: ["PATCH", "PUT", "POST"],
		path: path,
		config: {
			payload: {
				maxBytes: 209715200,
				output: "stream",
			},
			handler: handle_request
		}
	});
}
