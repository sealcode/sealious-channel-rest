var EventEmitter = require('event-emitter');
var cookie = require('react-cookie');

var SyntaxStore = new function() {

	var ee = new EventEmitter();
	this.on = ee.on.bind(ee);

	this.setCookie = function(theme){
		cookie.save('theme', theme);
		ee.emit('syntax', theme);
	};

	this.getCookie = function(){
		var theme = cookie.load('theme');
		if (theme !== undefined) {
			return theme;
		} else {
			return 'github'; //if cookie isn't set
		}
	};
};

module.exports = SyntaxStore;
