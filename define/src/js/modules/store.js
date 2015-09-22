var qwest = require('qwest');
var Promise = require("bluebird")

var Store = new function() {

	var cached_structure = null;

	this.getStructure = function() {
		if(cached_structure==null){
			return qwest.get('/api/v1/description')
			.then(function(xhr, response) {
				cached_structure = response;
				return response; //callback reponseText
			});			
		}else{
			return Promise.resolve(cached_structure);
		}
	};

	this.getResourceTypeDescription = function(resource_type_name){
		return this.getStructure()
		.then(function(structure){ //callback for qwest
			for(var i in structure){
				if(structure[i].name==resource_type_name){
					return structure[i];
				}
			}
			return null;
		});
	}

	this.getResourceBody = function(resource) {
		return qwest.get('/api/v1/' + resource)
			.then(function(xhr, response) {
				return response;
			});
	};

	this.getResourceById = function(resource, id) {
		return qwest.get('/api/v1/' + resource + '/' + id)
			.then(function(xhr, response) {
				return response;
			});
	};

	this.addResource = function(resource, data) {
		return qwest.post('/api/v1/' + resource, {
				data
			})
			.then(function(xhr, response) {
				return response;
			});
	};

	this.updateResource = function(resource, id, data) {
		return qwest.put('/api/v1' + resource + '/' + id, {
				data
			})
			.then(function(xhr, response) {
				return response;
			})
	};

	this.deleteResource = function(resource, id) {
		return qwest.delete('/api/v1' + resource + '/' + id)
			.then(function(xhr, response) {
				return response;
			})

	};

	this.resourceCheck = function(some_value) {

	};
};

module.exports = Store;
