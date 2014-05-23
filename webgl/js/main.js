
$(document ).ready(function() {
	
	var canvas = document.getElementById("main");
	
	var scene = new TORNADO.Scene(canvas);
	var renderer = new TORNADO.Renderer();
	var camera = new TORNADO.Camera();
	
	/*
	var monoT = new TORNADO.Transform();
	var monoTNode = new TORNADO.Node(monoT)
	scene.addChild(monoTNode);
	*/

	
	var OBJloader = new TORNADO.OBJLoader();
	OBJloader.load("./cubo.obj", function(mesh){
		scene.addChild(new TORNADO.Node(mesh));
	});
	
	/*
	var JSONloader = new TORNADO.JSONLoader();	
	JSONloader.load("./Teapot.json", function(mesh){
		scene.addChild(new TORNADO.Node(mesh));
	});
	*/
	
	var lastTime = 0;
	var trans = 0.1;

	renderer.startLoop(function(){
        var timeNow = new Date().getTime();

	    if (lastTime != 0) {
	     	var elapsed = timeNow - lastTime;
	     	trans += elapsed;
	     	
	     	//console.log(trans);
        	renderer.render(scene,camera);
	    }
	    lastTime = timeNow;

		if(keys[37]) camera.move(-0.4,0,0);	//izquierda
		if(keys[38]) camera.move(0,0.4,0);	//arriba
	    if(keys[39]) camera.move(0.4,0,0);	//derecha
	    if(keys[40]) camera.move(0,-0.4,0);	//abajo
	    if(keys[65]) camera.move(0,0,0.4);	//delante
	    if(keys[90]) camera.move(0,0,-0.4);	//atras
	});

	var keys = [];
	onkeydown = onkeyup = function(event){
	    keys[event.keyCode] = event.type == 'keydown';
	}
	document.addEventListener('keydown', onkeydown);
	document.addEventListener('keyup', onkeyup);

});
