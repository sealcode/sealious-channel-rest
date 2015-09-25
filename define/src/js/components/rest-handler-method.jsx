var React = require("react");
var Router = require("react-router");
var Store = require("../modules/store.js");
var Decription_provider = require("../modules/description-provider.js");
var Form = require("./form.jsx");

var RestHandler_method = React.createClass({
	mixins: [Router.State],
	getInitialState: function(){
		return{
			response_content : []
		}
	},

	componentWillReceiveProps: function(nextProps) {
		var self = this;

		var resource_type_name = this.getParams().resource_type_name;

		Decription_provider.getResourceTypeDescription(resource_type_name)
		.then(function(description){
			var rows = [];
			for (var field_name in description.fields){
				var field = description.fields[field_name]

				var row = {
					key: field.name
				}

				if (field.type === "file") { 
					row.type = "file"
				} else {
					row.type = "text"
				}
				rows.push(row);
			}
			self.refs.form && self.refs.form.setRows(rows); 
		})
	},

	sendRequest: function(e){
		e.preventDefault();
		var self = this;
		var resource_type_name = this.getParams().resource_type_name;
		var method = this.getParams().method;
		var id = this.getParams().resource_id;

		var url = "/api/v1/" + resource_type_name;

		if (method !== "get") {
			var data = this.refs.form.getValues();
			console.log(data);
		}

		if (id !== undefined){
			url = url + "/" + id;
		}

		Store.request(method, url, data)
			.then(function(response){
				self.setState({
					response_content: response
				});
			});

	},

	returnUrl: function(){
		var resource_type_name = this.getParams().resource_type_name;
		var id = this.getParams().resource_id;
		var url = "/api/v1/" + resource_type_name;

		if (id !== undefined){
			url = url + "/" + id;
		}

		return url;

	},

	render: function() {
		var method = this.getParams().method;
		var url = this.returnUrl();

		if (method === 'get') {
			return (
				<button onClick={this.sendRequest}>sendRequest</button>
			);
		} else {
			return (
				<div>
					<span>Method: {method.toUpperCase()} Request on: <code>{url}</code></span>
					<Form ref="form" onSubmit={this.sendRequest}/>
				</div>
			);
		}

	}
});

module.exports = RestHandler_method;