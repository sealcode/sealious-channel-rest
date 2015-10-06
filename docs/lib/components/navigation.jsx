var React = require("react");
var Router = require("react-router");
var Sealious = require("./app.jsx");
Sealious.SyntaxChanger = require("./syntax-changer.jsx");

var Naviagtion = React.createClass({
	mixins: [ Router.State, Router.Navigation],

	prepareListResourceTypes: function(mode){

		var structure = this.props.structure.map(function(resource_type){
			if (mode === 1) {
				return (
					<Router.Link to="resource-type-view" params={{resource_type_name:resource_type.name}}>
						<li id={resource_type.name} key={resource_type.name}>{resource_type.human_readable_name}</li>
					</Router.Link>
				)
			} else {
				return (
					<option value={resource_type.name}>{resource_type.human_readable_name}</option>
				)
			};
		}.bind(this));

		return structure;
	},

	handleChangeFromSelect: function(e){
		var resource_type = e.target.value;
		console.log(resource_type);
		e.preventDefault();
		return null;
	},

	render: function() {
		var resource_type_links = this.prepareListResourceTypes(1);
		var resource_type_options = this.prepareListResourceTypes();

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
					<div className="navigation-resource">
						<h2>Resource<br />
							<select id="nav-select" defaultValue="Choose" onChange={this.handleChangeFromSelect}>
								{resource_type_options}
							</select>
						</h2>
					</div>
					<div className="syntax-highlight">
						<h2>Syntax highlight<br />
							<Sealious.SyntaxChanger/>
						</h2>
					</div>
				</div>
				<ul>
					{resource_type_links}
				</ul>
			</div>
		);
	}
});

module.exports = Naviagtion;