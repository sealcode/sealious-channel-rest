var qwest = require('qwest');

var Store = new function() {

	this.getStructure = function() {
		return qwest.get('/api/v1/description')
			.then(function(xhr, response) {
				return response; //callback reponseText
			});
	};

	this.getResource = function(resource) {
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
