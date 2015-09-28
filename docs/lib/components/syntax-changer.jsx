var React = require("react");
var Router = require("react-router");
var SyntaxStore = require("../stores/syntax-store.js");
// var cookie = require('react-cookie');

var SyntaxChanger = React.createClass({
	handleChange: function(e){
		var theme = e.target.value;
		SyntaxStore.syntaxChange(theme);
		e.preventDefault();
		return null;
	},
	render: function() {
		return (
 			<select onChange={this.handleChange}>
	 			<option value="agate">agate</option>
	 			<option value="arta">arta</option>
	 			<option value="ascetic">ascetic</option>
	 			<option value="color-brewer">color-brewer</option>
	 			<option value="dark">dark</option>
	 			<option value="docco">docco</option>
	 			<option value="github">github</option>
	 			<option value="mono-blue">mono-blue</option>
	 			<option value="railscasts">railscasts</option>
	 			<option value="rainbow">rainbow</option>
	 			<option value="solarized_dark">solarized_dark</option>
	 			<option value="tomorrow">tomorrow</option>
	 			<option value="tomorrow-night-eighties">tomorrow-night-eighties</option>
	 			<option value="vs">vs</option>
	 			<option value="xcode">xcode</option>
	 			<option value="zenburn">zenburn</option>
 			</select>
		);
	}
});

module.exports = SyntaxChanger;