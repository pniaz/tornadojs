/*
	Light class
*/
TORNADO.Light = function (bright, aColor, dColor, sColor, vertexPosition) {
	this.ambientColor = new TORNADO.Color();
	if (aColor && aColor !== undefined )
		this.ambientColor.set( aColor );
	else this.ambientColor.set( "white" );

	this.difuseColor = new TORNADO.Color();
	if (dColor && dColor !== undefined )
		this.difuseColor.set( dColor );
	else this.difuseColor.set( "white" );

	this.specularColor = new TORNADO.Color();
	if (sColor && sColor !== undefined )
		this.specularColor.set( sColor );
	else this.specularColor.set( "white" );
	
	this.brightness = bright;

	if (vertexPosition && vertexPosition !== undefined)
		this.position = vertexPosition;
	else this.position = new TORNADO.Vertex(0,0,0,"white");

	console.debug(this.position);
	return;
	TORNADO.Entity.call(this);
};

var yes = false;

extend(TORNADO.Entity, TORNADO.Light);
TORNADO.Light.prototype.ambientColor = null;
TORNADO.Light.prototype.difuseColor = null;
TORNADO.Light.prototype.specularColor = null;

TORNADO.Light.prototype.brightness = null;
TORNADO.Light.prototype.position = null;

TORNADO.Light.prototype.beginDraw = function(){
	//console.log("HOLA");


	gl.uniform1i(shaderProgram.showSpecularHighlightsUniform, true);
  gl.uniform1i(shaderProgram.useLightingUniform, true);

  var pos = this.position.getPosition()
  gl.uniform3f(shaderProgram.pointLightingLocationUniform, pos[0], pos[1], pos[2]);
  gl.uniform1f(shaderProgram.materialShininessUniform, this.brightness);

  var aC = this.ambientColor.toArray();
	var dC = this.difuseColor.toArray();
	var sC = this.specularColor.toArray();
  gl.uniform3f(shaderProgram.ambientColorUniform, aC[0], aC[1], aC[2]);
  gl.uniform3f(shaderProgram.pointLightingDiffuseColorUniform, dC[0], dC[1], dC[2] );
  gl.uniform3f(shaderProgram.pointLightingSpecularColorUniform, sC[0], sC[1], sC[2] );


}
TORNADO.Light.prototype.endDraw = function(){
}