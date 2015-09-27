var React = require("react");
var Router = require("react-router");
var Description_provider = require("../stores/description-provider.js");
var Sealious = require("./app.jsx");

var ResourceType = React.createClass({
	mixins: [Router.State],
	getInitialState: function(){
		return {
			resource_type_description: null
		}
	},

	componentDidMount: function() {
		this.reloadStructure();
	},
	
	componentWillReceiveProps: function(){
		this.reloadStructure();
	},

	reloadStructure: function(){
		var self = this;
		
		var resource_type_name = this.getParams().resource_type_name;

		Description_provider.getResourceTypeDescription(resource_type_name)
			.then(function(resource_type_description){
				self.setState({
					resource_type_description: resource_type_description
				});
			});
	},

	render: function() {
		var resource_type = this.state.resource_type_description;
		
		if(resource_type !== null){         //for loading when user will reload page on e.g /#/resource-type/user
			return (
				<div className="content">
					<div className="content-inputs">
						<h1> Input </h1>
						name: {resource_type.name}<br />	
						human_readable_name: {resource_type.human_readable_name}<br />
						summary: {resource_type.summary}<br />
						<pre>
							fields: {JSON.stringify(resource_type.fields, null, "\t")}
						</pre>
					</div>
					<Router.RouteHandler/>
					<Sealious.Output/>
				</div>
			);
		}else{
			return (
				<div>
				</div>
			);
		}
	}
});

module.exports = ResourceType;