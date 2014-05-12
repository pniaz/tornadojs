var renderer;
var scene;
var camera;


$(document ).ready(function() {
	
	var canvas = document.getElementById("main");
	
	scene = new TORNADO.Scene(canvas);

	/*
	var pyramid = new TORNADO.Mesh();
	
	pyramid.addVertex(0, 0, 0,"cyan"); 
	pyramid.addVertex(1, 0, 0, "blue");
	pyramid.addVertex(1, 1, 0, "cyan");
	pyramid.addVertex(0, 1, 0, "green");
	pyramid.addVertex(0.5, 0.5, 1, "green");

	var indices = [0, 1, 3, 3, 1, 2, 2, 3, 4, 4, 0, 3, 0, 1, 4, 1, 4, 2];

	pyramid.addListIndex(indices);
	
	pyramid.prepare();

	scene.addChild(new TORNADO.Node(pyramid));
	*/
	//console.debug(scene);

	var loader = new TORNADO.OBJLoader();

	loader.load("./mono.obj", function(obj){
	  	
	  	var numTriangles = obj.decode();

		var vertexCube = obj.getListVertexArray();
		var facesCube = obj.getListFaceArray();
		var indices = obj.getListIndexArray(facesCube);
		console.log(facesCube);
			
		var cubo = new TORNADO.Mesh();
		cubo.addListVertex(vertexCube);
		cubo.addListIndex(indices);
		cubo.prepare();
		scene.addChild(new TORNADO.Node(cubo));
		
	});

	renderer = new TORNADO.Renderer();
	renderer.startRender(scene,camera);
});



