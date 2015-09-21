var React = require("react");
var Router = require("react-router");

var MainView = React.createClass({
	mixins: [Router.State],
	render: function() {
		var name = this.getRoutes().reverse()[0].name;
		return (
			<div className="MainView">
				<p>MainView</p>
				<div className="content">
					<Router.RouteHandler
						key={name}
						structure={this.props.structure}/>
				</div>
			</div>
		);
	}
});

module.exports = MainView;