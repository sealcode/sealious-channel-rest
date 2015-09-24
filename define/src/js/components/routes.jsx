var Sealious = require("./app.jsx");
var React = require("react");
var Router = require("react-router");

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var routes = (
	<Route path="/" handler={Sealious.App}>
		<DefaultRoute name="resource-type-list"/>
		<Route name="resource-type-view" path=":resource_name" handler={Sealious.ResourceType}>
			<Route name="rest_method" path=":method" handler={Sealious.RestHandler_method}/>
		</Route>
	</Route>
);

Router.run(routes, function(Handler) {
    var element = document.getElementById("content");
    React.render( <Handler/> , element);
});