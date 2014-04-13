/*
	ShadersLoader class
*/

TORNADO.ShadersLoader = function (gl,shaderProgram) {
	if(gl){ gl = gl; } else if (window.stop) {window.stop(); }
	
	this.program = shaderProgram;
	this.shadersPaths = [
		"shaders/fs/fragmentShader1.c",
    	"shaders/vs/vertexShader1.c"
	];
	this.shaders = [];


	return this;
};

TORNADO.ShadersLoader.prototype = {

	constructor: TORNADO.ShadersLoader,
	gl: null,
	program: null,
	shadersPaths: null,
	shaders: null,

	initShaders: function (callbackShadersLoaded){
		
		console.log("initShaders called");

		for (var i = 0; i < this.shaders.length; i++) {
			gl.attachShader(this.program, this.shaders[i]);
		};
		
		gl.linkProgram(this.program);
		console.debug(this);

		if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {alert("Could not initialise shaders."); }

		gl.useProgram(this.program);
		
		this.program.vertexPositionAttribute = gl.getAttribLocation(this.program, "aVertexPosition");
		gl.enableVertexAttribArray(this.program.vertexPositionAttribute);
		
		//lesson 2
		this.program.vertexColorAttribute = gl.getAttribLocation(this.program, "aVertexColor");
    	gl.enableVertexAttribArray(this.program.vertexColorAttribute);
		//lesson 2

		this.program.pMatrixUniform = gl.getUniformLocation(this.program, "uPMatrix");
		this.program.mvMatrixUniform = gl.getUniformLocation(this.program, "uMVMatrix");

		return callbackShadersLoaded();

	},
	loadShaders: function (callbackShadersLoaded){

		var self = this;
		loader.loadFiles(this.shadersPaths, function(results){
			
			for (var i = 0; i < self.shadersPaths.length; i++) {
				var shader = null;
				if(self.shadersPaths[i].indexOf("fs/") != -1)
					shader = gl.createShader(gl.FRAGMENT_SHADER);
				else if(self.shadersPaths[i].indexOf("vs/") != -1)
					shader = gl.createShader(gl.VERTEX_SHADER);
				else{
					console.error("Invalid shader "+self.shadersPaths[i]);
					return null;
				}
				gl.shaderSource(shader,results[i]);
				gl.compileShader(shader);
				
				if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
					alert("Error al cargar el shader "+ self.shadersPaths[i] +": "+gl.getShaderInfoLog(shader));
					return null;
				}
				self.shaders.push(shader);
			}
			self.initShaders(callbackShadersLoaded);
		}, 
		function(error){});
	}
}
/*
Victoria Bueno - Periodista encargada Universitarios
965 98 91 31

Centralita - 965 98 91 00
*/