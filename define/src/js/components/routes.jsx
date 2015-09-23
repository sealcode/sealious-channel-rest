var Sealious = require("./app.jsx");
var React = require("react");
var Router = require("react-router");

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var routes = (
	<Route path="/" handler={Sealious.App}>
		<Route path="resource-type" >
			<DefaultRoute name="resource-type-list"/>
			<Route name="resource-type-view" path=":resource_name" handler={Sealious.ResourceType}>
				<Route name="rest" path="rest" handler={Sealious.RestHandler}>
					<Route name="get" path="get" handler={Sealious.RestHandler.get}/>
					<Route name="post" path="post" handler={Sealious.RestHandler.post}/>
					<Route name="put" path="put" handler={Sealious.RestHandler.put}/>
					<Route name="patch" path="patch" handler={Sealious.RestHandler.patch}/>
					<Route name="delete" path="delete" handler={Sealious.RestHandler.delete}/>
				</Route>
			</Route>
		</Route>
	</Route>
);

Router.run(routes, function(Handler) {
    var element = document.getElementById("content");
    React.render( <Handler/> , element);
});