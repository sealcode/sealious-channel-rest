var React = require("react");
var Router = require("react-router");
var Description_provider = require("../stores/description-provider.js");
var SyntaxStore = require("../stores/syntax-store.js");
var Sealious = require("./app.jsx");
var Highlight = require('react-highlight');
var Utils = require('../utils.js');

var ResourceType = React.createClass({
	mixins: [Router.State, Router.Navigation],
	getInitialState: function(){
		return {
			resource_type_description: null,
			theme: SyntaxStore.getCookie()
		}
	},

	componentDidMount: function() {
		var self = this;
		this.reloadStructure();

		SyntaxStore.on('syntax', function(){
			var theme = SyntaxStore.getCookie();
			self.setState({
				theme: theme 
			});
		});
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

	handleMethodChange: function(e){
		var method = e.target.value;
		this.transitionTo("rest_method", {method: method, resource_type_name: this.getParams().resource_type_name});
		e.preventDefault();
		return null;
	},

	loadOptionsToSelect: function(){
		var obj = Utils.translateReactionToMethod();
		var options = [];

		for (var prop in obj) {
			options.push(
				<option value={prop}>{obj[prop].name}</option>
			)
		}
		
		return options;
	},

	render: function() {
		var resource_type = this.state.resource_type_description;
		var theme = this.state.theme;
		var link_to_theme = "css/highlight/" + theme + ".css";
		var resource_type_name = this.getParams().resource_type_name;

		var options = this.loadOptionsToSelect();

		if(resource_type !== null){         //for loading when user will reload page on e.g /#/resource-type/user
			return (
				<div className="content">
					<div className="content-inputs">
						<h1> Input</h1>
						<h2>Method
								<select className="resource-select" value={this.getParams().method} onChange={this.handleMethodChange}>
									{options}
								</select><br />
							name: {resource_type.name}<br />	
							human_readable_name: {resource_type.human_readable_name}<br />
							summary: {resource_type.summary}<br />
							structure: 
							<link rel="stylesheet" href={link_to_theme}/>
							<Highlight className='json'>
								{JSON.stringify(resource_type.fields, null, "\t")}
							</Highlight>
							<Router.RouteHandler/>
						</h2>
					</div>
					<Sealious.Output/>
				</div>
			);
		}else{
			return (
				<div></div>
			);
		}
	}
});

module.exports = ResourceType;