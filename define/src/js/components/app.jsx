var Sealious_rest_docs = {};

var React = require("react");
var Router = require("react-router");
var Store = require("../modules/store.js");

// Sealious_rest_docs.MapL = require("./map.jsx");

Sealious_rest_docs.App = React.createClass({
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
		var name = this.getRoutes().reverse()[0].name;

		return (
			<div className="app">
				<Router.RouteHandler 
					key={name} 
					structure={this.state.structure} 
					changeAttributeValue={this.changeAttributeValue}/>

			</div>
		)
	}
});

module.exports = Sealious_rest_docs;


// <Sealious_rest_docs.Panel 
// 	places={this.state.places} 
// 	mode={this.state.mode}
// 	found_coords={this.state.found_coords}
// 	map_center_coords={this.state.map_center_coords}/>