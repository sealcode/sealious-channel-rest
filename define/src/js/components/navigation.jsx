var React = require("react");
var Router = require("react-router");

var Naviagtion = React.createClass({
	mixins: [ Router.State, Router.Navigation],

	prepareListResourceTypes: function(){

		var structure = this.props.structure.map(function(resource_type){
			return (
				<li id={resource_type.name} key={resource_type.name}>
			 		<Router.Link to="resource-type-view" params={{resource_type_name:resource_type.name}}>{resource_type.human_readable_name}</Router.Link>
				</li>
			);
		}.bind(this));

		return structure;
	},

	render: function() {
		var list_resource_types = this.prepareListResourceTypes();

		return (
			<div>
				<div className="naviagtion">
					<p>Naviagtion</p>
					<ul>
						{list_resource_types}
					</ul>
				</div>
			</div>
		);
	}
});

module.exports = Naviagtion;