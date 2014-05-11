var renderer;
var scene;
var camera;


$( document ).ready(function() {
	
	var canvas = document.getElementById("main");
	
	scene = new TORNADO.Scene(canvas);

	var pyramid = new TORNADO.Mesh();
	
	pyramid.addVertex( 0.0,  1.0,  0.0, "cyan");
	pyramid.addVertex(-1.0, -1.0,  1.0, "green");
	pyramid.addVertex( 1.0, -1.0,  1.0, "blue");

	pyramid.addVertex( 0.0,  1.0,  0.0, "green");
	pyramid.addVertex( 1.0, -1.0,  1.0, "cyan");
	pyramid.addVertex( 1.0, -1.0, -1.0, "blue");
	
	pyramid.addVertex( 0.0,  1.0,  0.0, "blue");
	pyramid.addVertex( 1.0, -1.0, -1.0, "blue");
	pyramid.addVertex(-1.0, -1.0, -1.0, "blue");
	
	pyramid.addVertex( 0.0,  1.0,  0.0, "yellow");
	pyramid.addVertex(-1.0, -1.0, -1.0, "yellow");
	pyramid.addVertex(-1.0, -1.0,  1.0, "yellow");
	
	pyramid.prepare();

	scene.addChild(new TORNADO.Node(pyramid));

	//console.debug(scene);

	var loader = new TORNADO.OBJLoader();

	loader.load("./cubo.obj", function(obj){
	  	
	  	var numTriangles = obj.decode();
	
		var vertexCube = obj.getListVertexArray();
		var faceCube = obj.getListFaceArray();

		console.debug(vertexCube);
		console.debug(faceCube);

		var cubo = new TORNADO.Mesh();
		cubo.addListVertex(vertexCube);
		cubo.prepare();
		//scene.addChild(new TORNADO.Node(cubo));
	});

	renderer = new TORNADO.Renderer();
	renderer.startRender(scene,camera);
});



