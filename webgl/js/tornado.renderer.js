/*
	Rederer class
*/

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

	mvPushMatrix: function() {
    	var copy = mat4.create();
   	 	mat4.set(this.mvMatrix, copy);
    	this.mvMatrixStack.push(copy);
        return this.mvMatrix;
	},

	mvPopMatrix: function() {
    	if (this.mvMatrixStack.length == 0) {
      		throw "Invalid popMatrix!";
    	}
    	this.mvMatrix = this.mvMatrixStack.pop();
	},

	setMatrixUniforms: function() {
    	gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, this.pMatrix);
    	gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, this.mvMatrix);
	},

	render: function (scene, camera) {

	    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        camera.setPerspective(this.pMatrix, this.mvMatrix);
	    
        this.mvPushMatrix();        
        scene.draw(this);
        this.setMatrixUniforms();      
	   	this.mvPopMatrix();
	},

    startLoop: function(loop)
    {
        this.shadersLoader.loadShaders(function mainLoop(){
            requestAnimFrame(mainLoop);
            loop();
        });
    }
}
