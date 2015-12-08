require("sealious-www-server");
var Sealious = require("sealious");
var www_server = Sealious.ChipManager.get_chip("channel", "www_server");
var ConfigManager = Sealious.ConfigManager;

var get_context = www_server.get_context;

var REST = new Sealious.ChipTypes.Channel("rest");

ConfigManager.set_default_config( 
    "rest_config", {
        url_base: "/api/v1"
    }
);

REST.start = function(){
    var resource_types = Sealious.ChipManager.get_all_resource_types();
    var rest_url_base = ConfigManager.get_config().rest_config.url_base;
    for (var i in resource_types) {
        var complete_url = rest_url_base + '/' + resource_types[i];
        REST.add_path(complete_url, resource_types[i]);
    }
}

REST.add_path = function(url, resource_type_name){

    var resource_type_object = Sealious.ChipManager.get_chip("resource_type", resource_type_name);

    www_server.route({
        method: "GET",
        path: url+"/signature",
        handler: function(request, reply, context){
            Sealious.Dispatcher.resources.get_resource_type_signature(context, resource_type_name)
            .then(reply, reply).catch(reply);
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
        method: ["GET", "DELETE"],
        path: url+"/{id}",
        handler: function(request, reply){
            var method = request.method;

            var context = get_context(request);

            var promise;
            switch(method.toUpperCase()){
                case "DELETE":
                    Sealious.ResourceManager.delete(context, resource_type_name, request.params.id)
                    .then(function(response){reply("").code(204);}, reply);
                return;
                break;
                case "GET":
                    promise = Sealious.ResourceManager.get_by_id(context, request.params.id);
                break;
                default:
                    promise = Promise.reject({error:"unsupported method:" + method.toUpperCase()})
            }            
            promise.then(reply, reply);
        }
    });

    www_server.route({
        method: ["PATCH", "PUT", "POST"],
        path: url+"/{id}",
        config: {
            payload: {
                maxBytes: 209715200,
                output: resource_type_object.has_large_data_fields()? 'stream' : "data",
            },
            handler: function(request, reply){

                var context = get_context(request);
                
                var method = request.method;
                if(request.headers["x-http-method-override"]){
                    method = request.headers["x-http-method-override"];
                }

                if(request.payload["x-http-method-override"]){
                    method = request.payload["x-http-method-override"];
                    delete request.payload["x-http-method-override"];
                }

                var promise;
                switch(method.toUpperCase()){
                    case "PUT":
                        promise = Sealious.ResourceManager.update_resource(context, resource_type_name, request.params.id, request.payload);
                    break;
                    case "PATCH":
                        promise = Sealious.ResourceManager.patch_resource(context, resource_type_name, request.params.id, request.payload);
                    break;
                    default:
                        promise = Promise.reject({error:"unsupported method:" + method.toUpperCase()})
                }
                promise.then(reply, reply);
            }
        }
    });

}
