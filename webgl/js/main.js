var renderer;
var scene;
var camera;

$(document ).ready(function() {
	
	var canvas = document.getElementById("main");
	
	scene = new TORNADO.Scene(canvas);
	renderer = new TORNADO.Renderer();
	camera = new TORNADO.Camera();

	var OBJloader = new TORNADO.OBJLoader();

	OBJloader.load("./mono.obj", function(mesh){
		scene.addChild(new TORNADO.Node(mesh));
	});

	var lastTime = 0;
	var rPyramid = 0.1;

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
