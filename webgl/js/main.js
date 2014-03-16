$( document ).ready(function() {
	
	console.log('Start mainjs'); // no sale

	webGLStart();

	var loader = new TORNADO.OBJLoader();

	function addOBJ (obj) {
	  var instance = obj;
	  var numTriangles = instance.decode();

	  console.log('Leido cubo'); // no sale
	  console.debug(instance);

	}

	loader.load("./cubo.obj", addOBJ);
});
