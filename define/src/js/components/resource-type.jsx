var React = require("react");
var Router = require("react-router");
var Store = require("../modules/store.js");

var ResourceType = React.createClass({
	mixins: [Router.State],

	identifyResourceName: function(){
		var structure = this.props.structure;
		var name = this.getParams().resource_name;
		var resource_type;

		for(var i in structure){
			if(name === structure[i].name){
				resource_type = structure[i];
				break;
			}
		}
		return resource_type;
	},


	render: function() {
		var resource_type = this.identifyResourceName();
		
		var name = this.getRoutes().reverse()[2].name; // for pointing choosen resource_type

		return (
			<div>
				<span>ResourceType</span>
				<Router.RouteHandler key={name} resource_type={resource_type}/>
			</div>
		);
	}
});

ResourceType.View = React.createClass({
	mixins: [Router.State],
	getInitialState: function(){
		return {
			resource_type_description: null
		}
	},

	componentDidMount: function(){
		this.reloadStructure();
	},

	// componentWillUpdate: function(){
	// 	this.reloadStructure();
	// },
	
	componentWillReceiveProps: function(){
		this.reloadStructure();
	},

	reloadStructure: function(){
		var self = this;
		
		var resource_type_name = this.getParams().resource_name;
		// if(this.state.resource_type_description === null || this.state.resource_type_description.name !== resource_type_name){
			Store.getResourceTypeDescription(resource_type_name)
			.then(function(resource_type_description){
				self.setState({
					resource_type_description: resource_type_description
				});
			})			
		// }
	},
	render: function() {
		var resource_type = this.state.resource_type_description;
		if(resource_type !== null){
			return (
				<div className="resource-type-details">
				<span>ResourceType.View</span>
					<ul>
						<li>{resource_type.name}</li>
						<li>{resource_type.human_readable_name}</li>
						<li>{resource_type.summary}</li>
						<li>{resource_type.fields}</li>
					</ul>
				<ResourceType.Test/>
				</div>
			);
		}else{
			return <div/>
		}
	}
});

ResourceType.Test = React.createClass({
	mixins: [Router.State],
	getInitialState: function(){
		return{
			resource_content : null
		}
	},
	componentDidMount: function(){
		this.getBody();
	},

	componentWillReceiveProps: function(){
		this.getBody();
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
	render: function() {
		// console.log(this.state.resource_content)
		return (
			<div className="resource-content">
				<span>ResourceType.Test</span>
				{this.state.resource_content}
			</div>
		);
	}
})

module.exports = ResourceType;

				// <div className="resource-type-details">
				// </div>
