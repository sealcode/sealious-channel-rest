var EventEmitter = require('event-emitter');

var SyntaxStore = new function() {

	var ee = new EventEmitter();
	this.on = ee.on.bind(ee);

	var last_choosen_syntax = {};

	this.syntaxChange = function(theme){
		last_choosen_syntax = theme;
		ee.emit('syntax', theme);
	};

	this.getChoosenSyntax = function(){
		return last_choosen_syntax;
	};
};

module.exports = SyntaxStore;
