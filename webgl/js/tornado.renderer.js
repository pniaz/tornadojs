/*
	Rederer class
*/

TORNADO.Renderer = function ( gl ) {
 	if(gl){ this.gl = gl; } else if (window.stop) {window.stop(); }
	
	this.mvMatrix = mat4.create(),
	this.pMatrix = mat4.create(),
	this.shaderProgram = gl.createProgram();

	gl.clearColor(0.0, 0.0, 0.0, 1.0);           // Set clear color to black, fully opaque
    gl.enable(gl.DEPTH_TEST);                    // Enable depth testing
    gl.depthFunc(gl.LEQUAL);                     // Near things obscure far things
};

TORNADO.Renderer.prototype = {

	constructor: TORNADO.Renderer,

	gl: null, mvMatrix: null, pMatrix: null, shaderProgram: null,

	render: function ( scene, camera ) {
		this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
    	gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);      					// Clear the color as well as the depth buffer.
		mat4.perspective(45, this.gl.viewportWidth / this.gl.viewportHeight, 0.1, 100.0, this.pMatrix);
		mat4.identity(mvMatrix);

		//init bffers
		triangleVertexPositionBuffer = gl.createBuffer();
	    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
	    var vertices = [
	         0.0,  1.0,  0.0,
	        -1.0, -1.0,  0.0,
	         1.0, -1.0,  0.0
	    ];
	    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	    triangleVertexPositionBuffer.itemSize = 3;
	    triangleVertexPositionBuffer.numItems = 3;

	    //draw object
		mat4.translate(mvMatrix, [-1.5, 0.0, -7.0]);
	    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
	    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, triangleVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
	    setMatrixUniforms();
	    gl.drawArrays(gl.TRIANGLES, 0, triangleVertexPositionBuffer.numItems);
	}
}