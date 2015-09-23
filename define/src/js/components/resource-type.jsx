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
				<span>ResourceType.View</span>
					<div>
						<pre>
							name: {resource_type.name}<br />	
							human_readable_name: {resource_type.human_readable_name}<br />
							summary: {resource_type.summary}<br />
							fields: {JSON.stringify(resource_type.fields, null, 4)}
						</pre>
					</div>
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
			resource_content : []
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

	postBody: function(){
		var self = this;
		var resource_type_name = this.getParams().resource_name;

		Store.addResource(resource_type_name, data)
			.then(function(response){
				self.setState({

				})
			})
	},


	getOutput: function(){

	},

	getOnChoosenResource: function(){
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

				// {resources}
		return (
			<div className="resource-content">
				<span>ResourceType.Test</span>
				<button OnClick={this.getOnChoosenResource}>test</button>
			</div>
		);
	}
})

module.exports = ResourceType;
