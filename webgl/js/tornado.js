var TORNADO = { REVISION: '1' };

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
};
