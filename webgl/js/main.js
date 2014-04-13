
var lastTime = 0;
var rPyramid = 0;

var pyramidVertexPositionBuffer = 0;
var pyramidVertexColorBuffer = 0;

var gl;
var shaderProgram;
var shadersLoader;

var renderer;

function initGL() {
	try {
		canvas = document.getElementById("main");
		gl = canvas.getContext("experimental-webgl");
        shaderProgram = gl.createProgram();
		shadersLoader = new TORNADO.ShadersLoader(gl,shaderProgram);
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height;
        
        renderer = new TORNADO.Renderer(gl,shaderProgram);

	} catch(e) {
	}
	if (!gl) {
	  console.error("WebGL no está soportado en este sistema.");
	  if (window.stop) {window.stop(); }
	}
}

function webGLStart() {
    initGL();
    renderer.initBuffers();    
    shadersLoader.loadShaders(tick);
}

function animate() {
    var timeNow = new Date().getTime();

    if (lastTime != 0) {
      var elapsed = timeNow - lastTime;
      rPyramid += (90 * elapsed) / 1000.0;
    }
    lastTime = timeNow;
}

function tick() {
    requestAnimFrame(tick);
    renderer.render();
    animate();
}

$( document ).ready(function() {
	
	webGLStart();

	var loader = new TORNADO.OBJLoader();

	function addOBJ (obj) {
	  var instance = obj;
	  var numTriangles = instance.decode();

	  console.debug(instance.getListVertexArray());
	}

	loader.load("./cubo.obj", addOBJ);
});
