$( document ).ready(function() {
	
	webGLStart();

	var loader = new TORNADO.OBJLoader();

	function addOBJ (obj) {
	  var instance = obj;
	  var numTriangles = instance.decode();

	  console.debug(instance.list_vn);
	}

	loader.load("./cubo.obj", addOBJ);
});
