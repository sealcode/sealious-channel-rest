var React = require("react");
var Router = require("react-router");
var Store = require("../modules/store.js");

var RestHandler = React.createClass({
	mixins: [Router.State],

	render: function() {
		// var output = this.showOutput();
				// <button onClick={this.getBody}>getBody</button>
				// {output}
				// <Router.RouteHandler
				// 	key={name}
				// 	resource_type_description={this.state.resource_type_description}/>
		return (
			<div className="resource-content">
				<span>RestHandler</span>
				<Router.RouteHandler key={name}/>
			</div>
		);
	}
})

RestHandler.get = React.createClass({
	mixins: [Router.State],
	getInitialState: function(){
		return{
			resource_content : []
		}
	},

	getBody: function(){
		var self = this;
		var resource_type_name = this.getParams().resource_name;

		Store.getResourceBody(resource_type_name)
			.then(function(response){
				self.setState({
					resource_content: response
				});
			});
	},

	showOutput: function(){
		var loaded_data = this.state.resource_content;
		return (
			<ul>
				{loaded_data.map(function(result) {
					return (
						<li key={result.id}>
							<div className="resource-content-details">
								<pre>
									id: {result.id}<br />
									type: {result.type}<br />
									body: {JSON.stringify(result.body, null, 4)}<br />
									created context: {JSON.stringify(result.created_context, null, 4)}<br />
								</pre>
							</div>
						</li>
					)
				})}
			</ul>
		);
	},

	render: function() {
		var output = this.showOutput();
		return (
			<div>
				<button onClick={this.getBody}>getBody</button>
				{output}
			</div>
		);
	}
});


module.exports = RestHandler;