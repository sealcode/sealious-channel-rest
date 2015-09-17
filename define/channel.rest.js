require("sealious-www-server");
var path = require("path");
var Sealious = require("sealious");
var www_server = Sealious.ChipManager.get_chip("channel", "www_server");

var get_context = www_server.get_context;

var path_to_public_rest_docs = "";
path_to_public_rest_docs = path.resolve(module.filename, "..") + '/public';
www_server.static_route(path_to_public_rest_docs, '/rest_docs');


var REST = new Sealious.ChipTypes.Channel("rest");

// REST.start = function(){
//     var resource_types = Sealious.ChipManager.get_all_resource_types();
//     console.log(resource_types);

//     www_server.add_path
//  }


REST.set_url_base = function(base_url) {
    var resource_types = Sealious.ChipManager.get_all_resource_types();
    for (var i in resource_types) {
        var complete_url = base_url + '/' + resource_types[i];
        REST.add_path(complete_url, resource_types[i]);
    }
    www_server.route({
        method: "GET",
        path: base_url+"/description",
        handler: function(request, reply){
            var resource_types = Sealious.ChipManager.get_chips_by_type('resource_type');

            var signatures = [];

            for (element in resource_types){
                signatures.push(resource_types[element].get_signature());
            }
            reply(signatures);
        }
    });
} 

REST.add_path = function(url, resource_type_name){

    var resource_type_object = Sealious.ChipManager.get_chip("resource_type", resource_type_name);

    www_server.route({
        method: "GET",
        path: url+"/signature",
        handler: function(request, reply, context){
            Sealious.Dispatcher.resources.get_resource_type_signature(context, resource_type_name)
            .then(reply, reply);
        }
            // hanlder GET ma wypisać wszystkie zasoby o podanym typie
        });

    www_server.route({
        method: "GET",
        path: url,
        handler: function(request, reply){
            var context = get_context(request);
            Sealious.Dispatcher.resources.list_by_type(context, resource_type_name)
            .then(reply, reply);
        }
    });

    www_server.route({
        method: "POST",
        path: url,
        config: {
            payload: {
                maxBytes: 209715200,
                output: resource_type_object.has_large_data_fields()? 'stream' : "data",
            },
            handler: function(request, reply){
                var context = get_context(request);
                Sealious.Dispatcher.resources.create(context, resource_type_name, request.payload)
                .then(function(response){
                    reply(response).code(201);
                }, reply)
            }
        },
    });

    www_server.route({
        method: ["GET", "DELETE", "PATCH", "PUT"],
        path: url+"/{id}",
        handler: function(request, reply){
            var method = request.method;
            if(request.headers["x-http-method-override"]){
                method = request.headers["x-http-method-override"];
            }

            var ResourceManager = Sealious.Dispatcher.resources;

            var context = get_context(request);

            var promise;
            switch(method.toUpperCase()){
                case "DELETE":
                    ResourceManager.delete(context, resource_type_name, request.params.id)
                    .then(function(response){reply("").code(204);}, reply);
                return;
                break;
                case "PUT":
                    promise = ResourceManager.update_resource(context, resource_type_name, request.params.id, request.payload);
                break;
                case "PATCH":
                    promise = ResourceManager.patch_resource(context, resource_type_name, request.params.id, request.payload);
                break;
                case "GET":
                    promise = ResourceManager.get_by_id(context, request.params.id);
                break;
            }            
            promise.then(reply, reply);
        }
    });
}
