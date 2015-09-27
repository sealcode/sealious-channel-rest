var React = require("react");
var Router = require("react-router");

var Naviagtion = React.createClass({
	mixins: [ Router.State, Router.Navigation],

	prepareListResourceTypes: function(){

		var structure = this.props.structure.map(function(resource_type){
				// <li id={resource_type.name} key={resource_type.name}>
			 // 		<Router.Link to="resource-type-view" params={{resource_type_name:resource_type.name}}>{resource_type.human_readable_name}</Router.Link>
				// </li>
			return (
				<Router.Link to="resource-type-view" params={{resource_type_name:resource_type.name}}>
					<li id={resource_type.name} key={resource_type.name}>{resource_type.human_readable_name}</li>
				</Router.Link>
			);
		}.bind(this));

		return structure;
	},

	render: function() {
		var resource_type_links = this.prepareListResourceTypes();

		console.log(resource_type_links)

		return (
			<div className="navigation">
				<div className="nav-absolute-logo">
					<div>
						<a href="https://github.com/Sealious/sealious-channel-rest/">
							<img src="logo_sealious.svg"/>
						</a>
					</div>
					<h3>REST API Documentation</h3>
					<select id="nav-select">
						<option>Juzer</option>
						<option>Juzer</option>
					</select>
				</div>
				<ul>
					{resource_type_links}
				</ul>
			</div>
		);
	}
});

module.exports = Naviagtion;