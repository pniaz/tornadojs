/*
	Rederer class
*/

TORNADO.Renderer = function ( gl ) {
 	if(gl){ this.gl = gl; } else if (window.stop) {window.stop(); }
	
	this.mvMatrix = mat4.create(),
	this.pMatrix = mat4.create(),
	this.shaderProgram = gl.createProgram();

	gl.clearColor(0.0, 0.0, 0.0, 1.0);                      // Set clear color to black, fully opaque
    gl.enable(gl.DEPTH_TEST);                               // Enable depth testing
    gl.depthFunc(gl.LEQUAL);                                // Near things obscure far things
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);      // Clear the color as well as the depth buffer.
};

TORNADO.Renderer.prototype = {

	constructor: TORNADO.Renderer,

	gl: null, mvMatrix: null, pMatrix: null, shaderProgram: null,

	render: function ( scene, camera ) {
		this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
		mat4.perspective(45, this.gl.viewportWidth / this.gl.viewportHeight, 0.1, 100.0, this.pMatrix);
		mat4.identity(mvMatrix);
	}
}