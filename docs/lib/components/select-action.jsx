var React = require("react");
var Router = require("react-router");
var Utils = require('../utils.js');

var SelectAction = React.createClass({

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
		var options = this.loadOptionsToSelect();

		return (
			<select className="resource-select" value={this.props.method} onChange={this.props.handleMethodChange}>
				{options}
			</select>
		);
	}
});

module.exports = SelectAction;