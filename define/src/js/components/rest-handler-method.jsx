var React = require("react");
var Router = require("react-router");
var Store = require("../modules/store.js");

var RestHandler_method = React.createClass({
	mixins: [Router.State],
	getInitialState: function(){
		return{
			response_content : []
		}
	},

	sendRequest: function(method){
		var self = this;
		var resource_type_name = this.getParams().resource_name;
		var method = this.getParams().method;

		Store.request(method, resource_type_name, {})
			.then(function(response){
				self.setState({
					response_content: response
				});
			});
	},

	render: function() {
		return (
			<button onClick={this.sendRequest}>sendRequest</button>
		);
	}
});

module.exports = RestHandler_method;