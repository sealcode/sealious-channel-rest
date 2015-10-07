var utils = new function(){
	this.translateReactionToMethod = function(resource_type_name, resource_id) {
		
		var map = {
			"list-all" : {
				name: "List all",
				needs_id: false,
				needs_field_values: false,
				http_method: "GET",
				url: "/api/v1/" + resource_type_name
			},
			"get-by-id" : {
				name: "Get by id",
				needs_id: true,
				needs_field_values: false,
				http_method: "GET",
				url: "/api/v1/" + resource_type_name + "/" + resource_id
			},
			"get-spec" : {
				name: "Get spec",
				needs_id: false,
				needs_field_values: false,
				http_method: "GET",
				url: "/api/v1/" + resource_type_name + "/signature"
			},
			"create-new" : {
				name: "Create new",
				needs_id: false,
				needs_field_values: true,
				http_method: "POST",
				url: "/api/v1/" + resource_type_name
			},
			"replace-by-id" : {
				name: "Replace by id",
				needs_id: true,
				needs_field_values: true,
				http_method: "PUT",
				url: "/api/v1/" + resource_type_name + "/" + resource_id
			},
			"edit-by-id" : {
				name: "Edit by id",
				needs_id: true,
				needs_field_values: true,
				http_method: "PATCH",
				url: "/api/v1/" + resource_type_name + "/" + resource_id
			},
			"remove-by-id" : {
				name: "Remove by id",
				needs_id: true,
				needs_field_values: false,
				http_method: "DELETE",
				url: "/api/v1/" + resource_type_name + "/" + resource_id
			}
		}
		return map;
	}	
}

module.exports = utils;