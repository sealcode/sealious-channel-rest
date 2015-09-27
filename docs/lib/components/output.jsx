var React = require("react");
var Router = require("react-router");
var Store = require("../stores/store.js");

var Output = React.createClass({
	mixins: [Router.State],
	getInitialState: function() {
		return {
			output: {}
		};
	},
	componentWillReceiveProps: function(nextProps) {
		
	},
	componentDidMount: function() {
		var self = this;

		Store.on('change', function() {
			var output = Store.getLastResponse();
			self.setState({
				output: output
			});
		});
	},

	render: function() {

		var status = (this.state.output["status"] || "") + " " + (this.state.output["statusText"] || "");
		var output = JSON.stringify(this.state.output["response"], null, '\t');

		return (
			<div className="content-outputs">
				<h1>Output</h1>
				<span>{status}</span><br />
				<span>Output</span><br />
				<pre id="pre-results">{output}</pre>
			</div>
		);
	}
})

module.exports = Output;