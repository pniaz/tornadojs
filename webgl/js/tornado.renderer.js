/*
	Rederer class
*/

TORNADO.Renderer = function (gl,shaderProgram) {
 	if(gl){ this.gl = gl; } else if (window.stop) {window.stop(); }
	
	this.mvMatrix = mat4.create(),
	this.pMatrix = mat4.create(),
	this.mvMatrixStack = [],

	this.shaderProgram = shaderProgram;

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0),          // Set clear color to black, fully opaque
    this.gl.enable(gl.DEPTH_TEST),                    // Enable depth testing
    this.gl.depthFunc(gl.LEQUAL);                    // Near things obscure far things

    //pyramidVertexPositionBuffer = [];
    //this.pyramidVertexColorBuffer = [];

    return this;
};

TORNADO.Renderer.prototype = {

	constructor: TORNADO.Renderer,

	gl: null, 
	mvMatrix: null, 
	pMatrix: null, 
	shaderProgram: null,
	mvMatrixStack:null,
	//pyramidVertexPositionBuffer:null,
	//pyramidVertexColorBuffer:null,

	mvPushMatrix: function() {
    	var copy = mat4.create();
   	 	mat4.set(this.mvMatrix, copy);
    	this.mvMatrixStack.push(copy);
	},

	mvPopMatrix: function() {
    	if (this.mvMatrixStack.length == 0) {
      		throw "Invalid popMatrix!";
    	}
    	this.mvMatrix = this.mvMatrixStack.pop();
	},

	degToRad: function(degrees) {
    	return degrees * Math.PI / 180;
	},

	setMatrixUniforms: function() {
    	this.gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, this.pMatrix);
    	this.gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, this.mvMatrix);
	},

	initBuffers: function(){

		console.log("initBuffers called");

   		pyramidVertexPositionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, pyramidVertexPositionBuffer);
       
        var vertices = [
            // Front face
             0.0,  1.0,  0.0,
            -1.0, -1.0,  1.0,
             1.0, -1.0,  1.0,

            // Right face
             0.0,  1.0,  0.0,
             1.0, -1.0,  1.0,
             1.0, -1.0, -1.0,

            // Back face
             0.0,  1.0,  0.0,
             1.0, -1.0, -1.0,
            -1.0, -1.0, -1.0,

            // Left face
             0.0,  1.0,  0.0,
            -1.0, -1.0, -1.0,
            -1.0, -1.0,  1.0
        ];

        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
        pyramidVertexPositionBuffer.itemSize = 3;
        pyramidVertexPositionBuffer.numItems = 12;

        pyramidVertexColorBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, pyramidVertexColorBuffer);
       
        var colors = [
            // Front face
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0,

            // Right face
            1.0, 0.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
            0.0, 1.0, 0.0, 1.0,

            // Back face
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0,

            // Left face
            1.0, 0.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
            0.0, 1.0, 0.0, 1.0
        ];

        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(colors), this.gl.STATIC_DRAW);
        pyramidVertexColorBuffer.itemSize = 4;
        pyramidVertexColorBuffer.numItems = 12;
	},

	render: function (scene, camera) {

	    this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
	    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
	    
	    mat4.perspective(45, this.gl.viewportWidth / this.gl.viewportHeight, 0.1, 100.0, this.pMatrix);
	    
	    mat4.identity(this.mvMatrix);
	    
	    mat4.translate(this.mvMatrix, [-1.5, 0.0, -7.0]);

	    this.mvPushMatrix();
	    //mat4.rotate(this.mvMatrix, this.degToRad(rPyramid), [0, 1, 0]);

	    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, pyramidVertexPositionBuffer);
	    this.gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, pyramidVertexPositionBuffer.itemSize, this.gl.FLOAT, false, 0, 0);
	    
	    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, pyramidVertexColorBuffer);
	    this.gl.vertexAttribPointer(this.shaderProgram.vertexColorAttribute, pyramidVertexColorBuffer.itemSize, this.gl.FLOAT, false, 0, 0);

	    this.setMatrixUniforms();

	    this.gl.drawArrays(this.gl.TRIANGLES, 0, pyramidVertexPositionBuffer.numItems);

	   	this.mvPopMatrix();
	}
}