var qwest = require('qwest');

var Dispatcher = new function() {

    this.getResource = function(resource) {
        qwest.get("/api/v1"+resource, response)
            .then(function(){
                console.log(response);
            });
    };

    this.getResourceById = function(resource_id) {
        qwest.get("/api/v1"+resource, response)
            .then(function(){
                console.log(response);
            });
    };

    this.addResource = function(resource_data) {

    };

    this.updateResource = function(resource_id, resource_data) {

    };

    this.deleteResource = function(resource_id) {

    };

    this.resourceCheck = function(some_value) {

    };
};

module.exports = Dispatcher;
