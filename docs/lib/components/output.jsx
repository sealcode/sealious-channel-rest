var React = require("react");
var Router = require("react-router");
var Store = require("../stores/store.js");
var SyntaxStore = require("../stores/syntax-store.js");
var Highlight = require('react-highlight');

var Output = React.createClass({
	mixins: [Router.State],
	getInitialState: function() {
		return {
			output: {},
			theme: SyntaxStore.getCookie()
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

		SyntaxStore.on('syntax', function(){
			var theme = SyntaxStore.getCookie();
			self.setState({
				theme: theme 
			});
		});
	},

	render: function() {

		var status = (this.state.output["status"] || "") + " " + (this.state.output["statusText"] || "");
		var response_url = this.state.output["responseURL"] || "";
		var output = JSON.stringify(this.state.output["response"], null, '\t');

		var theme = this.state.theme;
		var link_to_theme = "css/highlight/" + theme + ".css";
		
		if (output !== {}) {
			return (
				<div className="content-outputs">
					<h1>Output</h1>
					<h2>
						<span>{status} {response_url}</span><br />
						<link rel="stylesheet" href={link_to_theme}/>
						<Highlight className="json">{output}</Highlight>
					</h2>
				</div>
			);
		} else {
			return (
				<div />
			)
		}

	}
})
module.exports = Output;
				// <pre id="pre-results">{output}</pre>