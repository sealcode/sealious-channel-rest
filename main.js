require("sealious-www-server");
var Sealious = require("sealious");

var REST = new Sealious.ChipTypes.Channel("rest");

Sealious.ConfigManager.set_default_config( 
	"rest_config", {
		url_base: "/api/v1"
	}
);

var http_to_subject_method = {
	"GET": "show",
	"POST": "create",
	"PATCH": "update",
	"PUT": "replace",
	"DELETE": "delete"
}

function handle_request(request, reply, context){
	var path_elements = request.params.elements.split('/');
	var path = new Sealious.SubjectPath(path_elements);
	var subject;
	try{
		subject = Sealious.RootSubject.get_subject(path);		
	}catch(e){
		reply(e);
		return;
	}

	var action_name = http_to_subject_method[request.method];

	try{
		subject.perform_action(context, action_name, request.body)
		.then(reply)
		.catch(reply);
	}catch(e){
		reply(e);
		return;
	}
}

REST.start = function(){
	var resource_types = Sealious.ChipManager.get_all_resource_types();
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