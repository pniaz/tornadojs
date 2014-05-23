/*
	ShadersLoader class
*/

TORNADO.ShadersLoader = function () {
	
	this.shadersPaths = [
		"shaders/fs/fragmentShader1.c",
    	"shaders/vs/vertexShader1.c"
	];
	this.shaders = [];


	return this;
};

TORNADO.ShadersLoader.prototype = {

	constructor: TORNADO.ShadersLoader,
	shadersPaths: null,
	shaders: null,

	initShaders: function (callbackShadersLoaded){
		
		console.log("initShaders called");

		for (var i = 0; i < this.shaders.length; i++) {
			gl.attachShader(shaderProgram, this.shaders[i]);
		};
		
		gl.linkProgram(shaderProgram);

		if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {alert("Could not initialise shaders."); }

		gl.useProgram(shaderProgram);
		
		shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
    gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

    shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
    gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");
    shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
    shaderProgram.materialShininessUniform = gl.getUniformLocation(shaderProgram, "uMaterialShininess");
    shaderProgram.showSpecularHighlightsUniform = gl.getUniformLocation(shaderProgram, "uShowSpecularHighlights");
    shaderProgram.useTexturesUniform = gl.getUniformLocation(shaderProgram, "uUseTextures");
    shaderProgram.useLightingUniform = gl.getUniformLocation(shaderProgram, "uUseLighting");
    shaderProgram.ambientColorUniform = gl.getUniformLocation(shaderProgram, "uAmbientColor");
    shaderProgram.pointLightingLocationUniform = gl.getUniformLocation(shaderProgram, "uPointLightingLocation");
    shaderProgram.pointLightingSpecularColorUniform = gl.getUniformLocation(shaderProgram, "uPointLightingSpecularColor");
    shaderProgram.pointLightingDiffuseColorUniform = gl.getUniformLocation(shaderProgram, "uPointLightingDiffuseColor");


/*
		//Vertex
		shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
		gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
		
		//Color
		shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
  	gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

  	shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
  	gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
  	//Texture
  	
		shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
    gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
    

		shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
		shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
		//shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler"); //Texture
*/
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