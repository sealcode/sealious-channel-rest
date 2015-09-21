var Sealious = require("./app.jsx");
var React = require("react");
var Router = require("react-router");

var routes = (
	<Router.Route path="/" handler={Sealious.App}>
		<Router.Route name="resource-type" path="/resource-type/:resource_name" handler={Sealious.ResourceType}>
			<Router.DefaultRoute name="resource-type-view" handler={Sealious.ResourceType.View}/>
		</Router.Route>
	</Router.Route>
);

Router.run(routes, function(Handler) {
    var element = document.getElementById("content");
    React.render( <Handler/> , element);
});
		// <Router.Route path="/resource-type" handler={Sealious.ResourceType}/>
		// <Router.Route name="navigate" path="/resource-type" handler={Sealious.Navigation}/>
			// <Router.DefaultRoute name="resource-type" path="/resource-type" handler={Sealious.ResourceType}/>
		// <Router.DefaultRoute name="start" path="/test" handler={Sealious.NavigationBox}/>
	 //    <Router.Route handler={Sealious.NavigationBox} path="/test">
	 //    	// <Router.DefaultRoute name="view-places" path="/places" handler={Sealious.PlacesView}/>
	 //    </Router.Route>