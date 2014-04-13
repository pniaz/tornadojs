$( document ).ready(function() {
	
	//webGLStart();
	var canvas = document.getElementById("main");
	var scene = new TORNADO.Scene(canvas);
	scene.render();

	var loader = new TORNADO.OBJLoader();

	function addOBJ (obj) {
	  var instance = obj;
	  var numTriangles = instance.decode();

	  console.debug(instance.getListVertexArray());
	}

	loader.load("./cubo.obj", addOBJ);
});
