/*
	Rederer class
*/
var pyramidVertexPositionBuffer = [];
var pyramidVertexColorBuffer = [];
var charged = false;

var sceneActual;
var cameraActual;

TORNADO.Renderer = function () {
	
	this.mvMatrix = mat4.create(),
	this.pMatrix = mat4.create(),
	this.mvMatrixStack = [],

	gl.clearColor(0.0, 0.0, 0.0, 1.0),          // Set clear color to black, fully opaque
    gl.enable(gl.DEPTH_TEST),                    // Enable depth testing
    gl.depthFunc(gl.LEQUAL),                    // Near things obscure far things

    shaderProgram = gl.createProgram();

    this.shadersLoader = new TORNADO.ShadersLoader(gl, shaderProgram);

    return this;
};


TORNADO.Renderer.prototype = {

	constructor: TORNADO.Renderer,

	gl: null, 
	mvMatrix: null, 
	pMatrix: null, 
	shaderProgram: null,
	mvMatrixStack:null,
    shaderProgram:null,
    shadersLoader:null,
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
    	gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, this.pMatrix);
    	gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, this.mvMatrix);
	},

	initBuffers: function(){

		console.log("initBuffers called");

   		pyramidVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, pyramidVertexPositionBuffer);
       
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

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        pyramidVertexPositionBuffer.itemSize = 3;
        pyramidVertexPositionBuffer.numItems = 12;

        pyramidVertexColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, pyramidVertexColorBuffer);
       
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

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        pyramidVertexColorBuffer.itemSize = 4;
        pyramidVertexColorBuffer.numItems = 12;
	},

	render: function (scene, camera) {

	    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
	    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	    
	    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, this.pMatrix);
	    
	    mat4.identity(this.mvMatrix);
	    
	    mat4.translate(this.mvMatrix, [-1.5, 0.0, -7.0]);

	    this.mvPushMatrix();
	    //mat4.rotate(this.mvMatrix, this.degToRad(rPyramid), [0, 1, 0]);

	    gl.bindBuffer(gl.ARRAY_BUFFER, pyramidVertexPositionBuffer);
	    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, pyramidVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
	    
	    gl.bindBuffer(gl.ARRAY_BUFFER, pyramidVertexColorBuffer);
	    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, pyramidVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

	    this.setMatrixUniforms();

	    gl.drawArrays(gl.TRIANGLES, 0, pyramidVertexPositionBuffer.numItems);

	   	this.mvPopMatrix();
	},

    startRender: function(scene,camera)
    {
        sceneActual = scene;
        cameraActual = camera;

        this.initBuffers();
        this.shadersLoader.loadShaders(finishLoader);

        tick();
    }
}
function finishLoader()
{
    charged = true;
}

function tick(){

    requestAnimFrame(tick);

    if(charged)
    {
        renderer.render(sceneActual,cameraActual);
        animate();
    }
};

var lastTime = 0;
var rPyramid = 0;

function animate() {
    var timeNow = new Date().getTime();

    if (lastTime != 0) {
      var elapsed = timeNow - lastTime;
      rPyramid += (90 * elapsed) / 1000.0;
    }
    lastTime = timeNow;
}