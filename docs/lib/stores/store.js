var qwest = require('qwest');
var EventEmitter = require('event-emitter');

var Store = new function() {

	var ee = new EventEmitter();
	this.on = ee.on.bind(ee);

	var last_response = {};

	// this.request = function(method, url, data) {
	// 	return qwest[method](url, data)
	// 		.then(function(xhr, response) {
	// 			console.log(xhr)
	// 			last_response = {
	// 				"response": response,
	// 				"responseURL" : xhr.responseURL,
	// 				"status": xhr.status,
	// 				"statusText": xhr.statusText
	// 			}
	// 			ee.emit('change');
	// 		});
	// };

	function handle_response(xhr, response){
		last_response = {
			"response": response,
			"responseURL" : xhr.responseURL,
			"status": xhr.status,
			"statusText": xhr.statusText
		}
		ee.emit('change');		
	}

	this.request = function(method, url, data) {
		return qwest.map(method, url, data)
			.then(handle_response, handle_response);
	};

	this.getLastResponse = function() {
		return last_response;
	};

};

module.exports = Store;
