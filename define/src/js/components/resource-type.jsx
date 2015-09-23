var React = require("react");
var Router = require("react-router");
var Store = require("../modules/store.js");

var ResourceType = React.createClass({
	mixins: [Router.State],
	getInitialState: function(){
		return {
			resource_type_description: null
		}
	},

	componentDidMount: function(){
		this.reloadStructure();
	},
	
	componentWillReceiveProps: function(){
		this.reloadStructure();
	},

	reloadStructure: function(){
		var self = this;
		
		var resource_type_name = this.getParams().resource_name;

		Store.getResourceTypeDescription(resource_type_name)
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
				<div className="resource-type-details">
					<span>ResourceType</span>
					<div>
						<pre>
							name: {resource_type.name}<br />	
							human_readable_name: {resource_type.human_readable_name}<br />
							summary: {resource_type.summary}<br />
							fields: {JSON.stringify(resource_type.fields, null, 4)}
						</pre>
					</div>
				<Router.RouteHandler
					key={name}
					resource_type_description={this.state.resource_type_description}/>
				</div>
			);
		}else{
			return <div/>
		}
	}
});

module.exports = ResourceType;
