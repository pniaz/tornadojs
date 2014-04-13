var renderer;
var scene;
var camera;


$( document ).ready(function() {
	
	var canvas = document.getElementById("main");
	
	scene = new TORNADO.Scene(canvas);
	renderer = new TORNADO.Renderer();

	camera = null;

	renderer.startRender(scene,camera);

	//scene.sayHello();

	var loader = new TORNADO.OBJLoader();

	function addOBJ (obj) {
	  var instance = obj;
	  var numTriangles = instance.decode();

	  console.debug(instance.getListVertexArray());
	}

	loader.load("./cubo.obj", addOBJ);
});



