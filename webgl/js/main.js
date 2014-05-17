
$(document ).ready(function() {
	
	var canvas = document.getElementById("main");
	
	var scene = new TORNADO.Scene(canvas);
	var renderer = new TORNADO.Renderer();
	var camera = new TORNADO.Camera();

	var monoT = new TORNADO.Transform();
	var monoTNode = new TORNADO.Node(monoT)
	scene.addChild(monoTNode);

	var OBJloader = new TORNADO.OBJLoader();

	OBJloader.load("./mono.obj", function(mesh){
		scene.addChild(new TORNADO.Node(mesh));
	});

	var lastTime = 0;
	var trans = 0.1;

	renderer.startLoop(function(){
        var timeNow = new Date().getTime();

	    if (lastTime != 0) {
	     	var elapsed = timeNow - lastTime;
	     	trans += elapsed;
	     	monoT.translate(trans,0,0);
        	renderer.render(scene,camera);
	    }
	    lastTime = timeNow;
		
	});
});
