var Sealious = {};

var React = require("react");
var Router = require("react-router");
var Store = require("../modules/store.js");

Sealious.Navigation = require("./navigation.jsx");
Sealious.ResourceType = require("./resource-type.jsx");
Sealious.RestHandler = require("./rest-handler.jsx");

Sealious.App = React.createClass({
	mixins: [ Router.State, Router.Navigation],
	getInitialState: function(){
		return {
			structure : []
		};
	},

	componentDidMount: function(){
		this.loadStructure();
	},

	componentWillMount: function(){
	},

	loadStructure: function(){
		Store.getStructure().then(this.storeStructure);
	},

	storeStructure: function(structure){
		console.log("app.jsx: loaded rest structure", structure);
		this.setState({
			structure: structure
		});
	},

	changeAttributeValue: function(attribute_name, value){
		var obj = {};
		obj[attribute_name] = value;
		this.setState(obj);
	},

	render: function () {
		return (
			<div className="app">
				<p>App</p>
				<Sealious.Navigation structure={this.state.structure}/>		
				<div className="content">
					<Router.RouteHandler key={name}/>
				</div>			
			</div>
		)
	}
});

module.exports = Sealious;