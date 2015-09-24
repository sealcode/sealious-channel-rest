var React = require("react");
var Router = require("react-router");
var Store = require("../modules/store.js");

var Output = React.createClass({
	mixins: [Router.State],
	getInitialState: function() {
		return {
			output: [],
			status: [],
			statusText: []
		};
	},
	componentWillReceiveProps: function(nextProps) {
		
	},
	componentDidMount: function() {
		var self = this;

		Store.on('change', function(data) {
			console.log("on change")
			// console.log(anwser);
			self.setState({
				output: data.response,
				status: data.status,
				statusText: data.statusText
			});
		});
	},

	render: function() {
		var output = JSON.stringify(this.state.output, null, '\t');
		var status = this.state.status + " " + this.state.statusText;
		return (
			<div className="resource-content">
				<span>Status: {status}</span><br />
				<span>Output</span><br />
				<pre>{output}</pre>
			</div>
		);
	}
})

module.exports = Output;