TORNADO.Texture = function ( value ) {
	return this;
};

TORNADO.Texture.prototype = {
	glTexture: null,
	coordBuffer: [],

	init: function(urlImg, coords){
		var self = this;
    this.glTexture = gl.createTexture();
    this.glTexture.image = new Image();
    this.glTexture.image.onload = function() {
        self.handleLoadedTexture();
    }
    this.glTexture.image.src = urlImg;


    this.coordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.coordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coords), gl.STATIC_DRAW);
    this.coordBuffer.itemSize = 2;

    this.coordBuffer.numItems = coords.length/2;

	},
	draw: function(){
		gl.uniform1i(shaderProgram.useTexturesUniform, document.getElementById("textureCheck").checked);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
    gl.uniform1i(shaderProgram.samplerUniform, 0);
	},
	getCoordsBuffer: function(){
		return this.coordBuffer;
	},
	handleLoadedTexture: function() {
  
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.glTexture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);

    gl.bindTexture(gl.TEXTURE_2D, null);
}
};
