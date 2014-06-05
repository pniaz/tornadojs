
$(document ).ready(function() {
	
	var canvas = document.getElementById("main");
	
	var scene = new TORNADO.Scene(canvas);
	var renderer = new TORNADO.Renderer();
	var camera = new TORNADO.Camera();
	

	
	var trans = new TORNADO.Transform();
	var transNode = new TORNADO.Node(trans)
	scene.addChild(transNode);
	
	/*
	var OBJloader = new TORNADO.OBJLoader();
	OBJloader.load("./cubo.obj", function(mesh){
		scene.addChild(new TORNADO.Node(mesh));
	});
	*/
	
	var JSONloader = new TORNADO.JSONLoader();	
	JSONloader.load("./Teapot.json", function(mesh){
		transNode.addChild(new TORNADO.Node(mesh));
	});

	var light1 = new TORNADO.Light(
		200,  			//bright, 
		"#222222",  //aColor, 
		"white",  //dColor, 
		"rgb(255,255,255)",  //sColor, 
		new TORNADO.Vertex(-10, 4, -20) //vertexPosition
	);
	scene.addChild(new TORNADO.Node(light1));

	var lastTime = 0;
	var t = 0.1;

	renderer.startLoop(function(){
        var timeNow = new Date().getTime();

	    if (lastTime != 0) {
	     	var elapsed = timeNow - lastTime;
	     	
	     	var vel = 0.0001;
	     	/*
				Transformaciones automaticas

	     	trans.translate(vel*10,vel*10,vel*10);
	     	trans.scale(1+vel,1+vel,1+vel);
	     	trans.rotate(elapsed*vel,1+vel,1+vel,1+vel);
	     	*/
        renderer.render(scene,camera);
	    }
	    lastTime = timeNow;

	    //rotate
			if(keys[65]) trans.rotate(0.01,0,1,0);	//izquierda
			if(keys[87]) trans.rotate(0.01,1,0,0);	//arriba
	    if(keys[68]) trans.rotate(-0.01,0,1,0);	//derecha
			if(keys[83]) trans.rotate(-0.01,1,0,0);	//abajo
			if(keys[81]) trans.rotate(0.01,0,0,1);	//abajo
			if(keys[69]) trans.rotate(-0.01,0,0,1);	//abajo
			//translate
			if(keys[37]) trans.translate(-0.1,0,0);	//izquierda
			if(keys[38]) trans.translate(0,0.1,0);	//arriba
			if(keys[39]) trans.translate(0.1,0,0,1);	//derecha
			if(keys[40]) trans.translate(0,-0.1,0);	//abajo
			//scale
			if(keys[77]) trans.scale(1.01,1.01,1.01);	//delante
			if(keys[78]) trans.scale(0.99,0.99,0.99);	//atras
			
	    if(keys[82]) trans.identity();	//reiniciar
	});

	var keys = [];
	onkeydown = onkeyup = function(event){
	    keys[event.keyCode] = event.type == 'keydown';
	}
	document.addEventListener('keydown', onkeydown);
	document.addEventListener('keyup', onkeyup);

});
