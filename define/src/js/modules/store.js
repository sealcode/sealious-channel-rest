var qwest = require('qwest');
var EventEmitter = require('event-emitter');

var Store = new function() {

	var ee = new EventEmitter();
	this.on = ee.on.bind(ee);

	this.request = function(method, resource_type_name, data, id) {
		if (id === undefined) {
			return qwest[method]('/api/v1/' + resource_type_name, {data})
					.then(function(xhr, response) {
						var answer = {
							"response" : response,
							"status" : xhr.status,
							"statusText" : xhr.statusText
						}
						ee.emit('change', answer);
						return response;
					});
		} else {
			return qwest[method]('/api/v1/' + resource_type_name +'/'+ id)
					.then(function(xhr, response) {
						ee.emit('change', response);
						return response;
					});
		}
	}

};

module.exports = Store;
