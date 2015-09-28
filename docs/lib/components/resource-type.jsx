var React = require("react");
var Router = require("react-router");
var Description_provider = require("../stores/description-provider.js");
var SyntaxStore = require("../stores/syntax-store.js");
var Sealious = require("./app.jsx");
var Highlight = require('react-highlight');


var ResourceType = React.createClass({
	mixins: [Router.State, Router.Navigation],
	getInitialState: function(){
		return {
			resource_type_description: null,
			theme: null
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

		SyntaxStore.on('syntax', function(){
			var theme = SyntaxStore.getChoosenSyntax();
			self.setState({
				theme: theme 
			});
		});
	},

	handleMethodChange: function(e){
		var method = e.target.value;
		this.transitionTo("rest_method", {method: method, resource_type_name: this.getParams().resource_type_name});
		e.preventDefault();
		return null;
	},

	render: function() {
		var resource_type = this.state.resource_type_description;
		var theme = "css/highlight/" + this.state.theme + ".css";

		
		if(resource_type !== null){         //for loading when user will reload page on e.g /#/resource-type/user
			return (
				<div className="content">
					<div className="content-inputs">
						<h1> Input</h1>
						<h2>Method 
								<select className="resource-select" value={this.getParams().method} onChange={this.handleMethodChange}>
									<option value="get">GET</option>
									<option value="post">POST</option>
									<option value="delete">DELETE</option>
									<option value="patch">PATCH</option>
									<option value="put">PUT</option>
								</select><br />
							name: {resource_type.name}<br />	
							human_readable_name: {resource_type.human_readable_name}<br />
							summary: {resource_type.summary}<br />
							structure: 
							<link rel="stylesheet" href={theme}/>
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
				<div>
				</div>
			);
		}
	}
});

module.exports = ResourceType;