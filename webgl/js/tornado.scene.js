/*
	Mesh class
*/

TORNADO.Scene = function (canvas) {
	TORNADO.Node.call(this);
	
	try{
		gl = canvas.getContext("experimental-webgl");
	} catch(e) {}

	if (!gl) {
	  console.error("WebGL no está soportado en este sistema.");
	  if (window.stop) {window.stop(); }
	}

	gl.viewportWidth = canvas.width;
	gl.viewportHeight = canvas.height;

	this.resourceManager = new TORNADO.ResourceManager();
};

extend(TORNADO.Node, TORNADO.Scene);

TORNADO.Scene.prototype.resourceManager = null;




