$.holdReady( true );
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

var scripts = [
		"js/glMatrix.js",
		"js/tornado.obj.js",
		"js/tornado.objloader.js",
		"js/webgl.example1.js",
	];

function getScripts(){
	name = scripts.shift();
	$.getScript(name, function(){
		console.log("Script "+ name +" loaded and executed.");
		if(scripts.length > 0){
			getScripts();
		}
		else{
			$.holdReady( false );
		}
	});
}
getScripts();

var TORNADO = { REVISION: '1' };



/*
TORNADO.Renderer = function ( canvas ) {
	try {
	  	this.gl = canvas.getContext("experimental-webgl");
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height;
		return this;
	} catch(e) {
	}
	if (!gl) {
	  alert("WebGL no está soportado en este sistema.");
	}
	
};

TORNADO.Renderer.prototype = {

	constructor: TORNADO.Renderer,

	gl: null, 
	dad: null,
	children: new array(), 

	render: function ( scene, camera ) {
		if ( value instanceof TORNADO.Entity ) {
			this.entity = value;
		}
		return true;
	},
	addChild: function ( node ) {
		if ( node instanceof THREE.Node ) {
			return this.hijos.push(nodo);
		}
		return -1;
	},
}
*/



