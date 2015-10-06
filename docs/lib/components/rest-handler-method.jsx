var React = require("react");
var Router = require("react-router");
var Store = require("../stores/store.js");
var Decription_provider = require("../stores/description-provider.js");
var Form = require("./form.jsx");
var Utils = require("../utils.js");

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
		var action = this.getParams().method;
		var resource_type_name = this.getParams().resource_type_name;
		var resource_id = this.getParams().resource_id;

		var obj = Utils.translateReactionToMethod(resource_type_name, resource_id);

		var method = obj[action].http_method;

		if (method !== "GET" && method !== "DELETE") {
			var data = this.refs.form.getValues();
		}

		var url = obj[action].url;

		Store.request(method, url, data)
			.then(function(response){
				self.setState({
					response_content: response
				})
			}
		);

	},

	render: function() {
		var action = this.getParams().method;
		var resource_type_name = this.getParams().resource_type_name;
		var resource_id = this.getParams().resource_id;

		var obj = Utils.translateReactionToMethod(resource_type_name, resource_id);

		var page = [];

		page.push(
			<p>Method: {obj[action].http_method} <code>{obj[action].url}</code></p>
		)

		if (obj[action].needs_id === true) {
			page.push(
				<span>needs_id === true</span>
			)
		}

		if (obj[action].needs_field_values === true) {
			page.push(
				<Form ref="form" onSubmit={this.sendRequest}/>
			)
		}

		return (
			<div>
				{page}
				<button onClick={this.sendRequest}>sendRequest</button>
			</div>
		);
	}
});

module.exports = RestHandler_method;