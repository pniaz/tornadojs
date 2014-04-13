/*
	Mesh class
*/
var rend;

TORNADO.Scene = function (canvas) {
	//Node.call(this);
	try{
		this.gl = canvas.getContext("experimental-webgl");
	} catch(e) {}

	if (!this.gl) {
	  console.error("WebGL no está soportado en este sistema.");
	  if (window.stop) {window.stop(); }
	}
	this.gl.viewportWidth = canvas.width;
	this.gl.viewportHeight = canvas.height;
	
	this.shaderProgram = this.gl.createProgram();

	this.shadersLoader = new TORNADO.ShadersLoader(this.gl,this.shaderProgram);
	this.resourceManager = new TORNADO.ResourceManager();
	this.renderer = new TORNADO.Renderer(this.gl, this.shaderProgram);	

	rend = this.renderer;
};

extend(TORNADO.Node, TORNADO.Scene);

TORNADO.Scene.prototype.gl = null;
TORNADO.Scene.prototype.shaderProgram = null;
TORNADO.Scene.prototype.shaderLoader = null;
TORNADO.Scene.prototype.resourceManager = null;
TORNADO.Scene.prototype.renderer = null;

TORNADO.Scene.prototype.render = function() {

	//this.draw();

	var pyramidVertexPositionBuffer = 0;
	var pyramidVertexColorBuffer = 0;

	this.renderer.initBuffers();
	this.shadersLoader.loadShaders(tick);
};

function tick(){

	requestAnimFrame(tick);
    rend.render();
    animate();
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

