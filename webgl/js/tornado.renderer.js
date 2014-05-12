/*
	Rederer class
*/
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

	render: function (scene, camera) {

	    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
	    //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	    
	    mat4.perspective(49, gl.viewportWidth / gl.viewportHeight, 0.4, 100.0, this.pMatrix);
	    
	    mat4.identity(this.mvMatrix);
	    
	    mat4.translate(this.mvMatrix, [-1.5, 0.0, -7.0]);

	    this.mvPushMatrix();
	    mat4.rotate(this.mvMatrix, this.degToRad(rPyramid), [0.5, 1, 0]);

        scene.draw();

        this.setMatrixUniforms();
        
	   	this.mvPopMatrix();
	},

    startRender: function(scene,camera)
    {
        sceneActual = scene;
        cameraActual = camera;

        this.shadersLoader.loadShaders(function() {
            charged = true;
        });
        loop();
    }
}

function loop(){

    requestAnimFrame(loop);

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