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

	var OBJloader = new TORNADO.OBJLoader();

	OBJloader.load("./mono.obj", function(mesh){
		scene.addChild(new TORNADO.Node(mesh));
	});

	renderer = new TORNADO.Renderer();
	camera = new TORNADO.Camera();
	
	var lastTime = 0;
	var rPyramid = 0;

	renderer.startRender(scene,camera, function(){
        renderer.render(scene,camera);
        
        var timeNow = new Date().getTime();

	    if (lastTime != 0) {
	      var elapsed = timeNow - lastTime;
	      rPyramid += (90 * elapsed) / 1000.0;

	      //camera.setRotationX(rPyramid);
	    }
	    lastTime = timeNow;
		
	});
});