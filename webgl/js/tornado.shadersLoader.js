/*
	ShadersLoader class
*/

TORNADO.ShadersLoader = function (gl) {
	if(gl){ this.gl = gl; } else if (window.stop) {window.stop(); }
	
	this.program = gl.createProgram();
	this.shadersPaths = [
		"shaders/fs/fragmentShader1.c",
    	"shaders/vs/vertexShader1.c"
	];
	this.shaders = [];
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
			this.gl.attachShader(this.program, this.shaders[i]);
		};

		this.gl.linkProgram(this.program);

		if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {alert("Could not initialise shaders."); }

		this.gl.useProgram(this.program);
		this.program.vertexPositionAttribute = this.gl.getAttribLocation(this.program, "aVertexPosition");
		this.gl.enableVertexAttribArray(this.program.vertexPositionAttribute);
		this.program.pMatrixUniform = this.gl.getUniformLocation(this.program, "uPMatrix");
		this.program.mvMatrixUniform = this.gl.getUniformLocation(this.program, "uMVMatrix");

	},
	loadShaders: function (){

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
					alert(gl.getShaderInfoLog(shader));
					return null;
				}
				self.gl.attachShader(self.program, shader);
				self.shaders.push(shader);
			}


			self.initShaders(callbackShadersLoaded);

		}, 
		function(error){});

	}
}
