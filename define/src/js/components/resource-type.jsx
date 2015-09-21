var React = require("react");
var Router = require("react-router");

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
		
		var name = this.getRoutes().reverse()[2].name;

		return (
			<div>
				<span>ResourceType</span>
				<Router.RouteHandler key={name} resource_type={resource_type}/>
			</div>
		);
	}
});

ResourceType.View = React.createClass({
	render: function() {
		var resource_type = this.props.resource_type;
		console.log(resource_type)
		// if(resource_type.name !== undefined){
			return (
				<div className="resource-type-details">
					<span>ResourceType.View</span>
					<div>{resource_type.name}</div>
					<div>{resource_type.human_readable_name}</div>
					<div>{resource_type.summary}</div>
					<div>{resource_type.fields}</div>
				</div>
			);
		// }
	}
})

module.exports = ResourceType;

				// <div className="resource-type-details">
				// </div>
