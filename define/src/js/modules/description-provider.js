var qwest = require('qwest');
var Promise = require("bluebird");

var Description_provider = new function() {

	var cached_structure = null;

	this.getStructure = function() {
		if (cached_structure == null) {
			return qwest.get('/api/v1/description')
				.then(function(xhr, response) {
					cached_structure = response;
					return response; //callback reponseText
				});
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
