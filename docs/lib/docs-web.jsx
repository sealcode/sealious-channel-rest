var React = require("react");
var Router = require("react-router");
var routes = require("./components/routes.jsx");

Router.run(routes, function(Handler) {
	var element = document.getElementById("content");
    React.render( <Handler/> , element);
});