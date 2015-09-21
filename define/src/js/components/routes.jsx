var Sealious_rest_docs = require("./app.jsx");
var React = require("react");
var Router = require("react-router");

var routes = (
	<Router.Route handler={Sealious_rest_docs.App} path="/">
	</Router.Route>
);

Router.run(routes, function(Handler) {
    var element = document.getElementById("content");
    React.render( <Handler/> , element);
});
		// <Router.DefaultRoute name="start" path="/test" handler={Sealious_rest_docs.NavigationBox}/>
	 //    <Router.Route handler={Sealious_rest_docs.NavigationBox} path="/test">
	 //    	// <Router.DefaultRoute name="view-places" path="/places" handler={Sealious_rest_docs.PlacesView}/>
	 //    </Router.Route>