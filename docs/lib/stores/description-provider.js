var qwest = require('qwest');
var Promise = require("bluebird");
var EventEmitter = require('event-emitter');

var Description_provider = new function() {
	
	var ee = new EventEmitter();
	this.on = ee.on.bind(ee);

	var cached_structure = null;
	var loading = false;

	this.getStructure = function() {
		var self = this;
		if (cached_structure == null) {
			if(!loading){
				loading = true;
				return qwest.get('/api/v1/specification')
					.then(function(xhr, response) {
						cached_structure = response;
						ee.emit('change', response);
						loading = false;
						return response; //callback to qwest
					});	
			}else{
				return new Promise(function (resolve, reject){
					ee.on("change", function(){
						resolve(cached_structure);
					})
				});
			}
		} else {
			return Promise.resolve(cached_structure);
		}
	};

	this.getResourceTypeDescription = function(resource_type_name) {
		return this.getStructure()
			.then(function(structure) { //callback for qwest
				for (var i in structure) {
					if (structure[i].name == resource_type_name) {
						return structure[i];
					}
				}
				return null;
			});
	};

};

module.exports = Description_provider;
