var Sealious = {};

var React = require("react");
var Router = require("react-router");
var Store = require("../modules/store.js");

Sealious.Navigation = require("./navigation.jsx");
Sealious.MainView = require("./main-view.jsx");
Sealious.ResourceType = require("./resource-type.jsx");

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
		console.log("loaded rest structure", structure);
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
				<Sealious.MainView structure={this.state.structure}/>			
			</div>
		)
	}
});

module.exports = Sealious;

				// <Sealious.MainView/>

// Sealious.Editor = require("./editor.jsx");
// Sealious.Form = require("./form.jsx");
// Sealious.Description = require("./description.jsx");
// Sealious.Results = require("./results.jsx");

// <Sealious.Panel 
// 	places={this.state.places} 
// 	mode={this.state.mode}
// 	found_coords={this.state.found_coords}
// 	map_center_coords={this.state.map_center_coords}/>