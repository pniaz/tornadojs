/*
	Mesh class
*/
TORNADO.Mesh = function () {
	Entity.call(this);

	this.vertexArray = [];
	this.vertexBuffer = [];
	this.colorBuffer = [];
};

extend(TORNADO.Entity, TORNADO.Mesh);

TORNADO.Mesh.prototype.vertexArray = null;

TORNADO.Mesh.prototype.addVertex = function(x,y,z,color){
	if(x instanceof TORNADO.Vertex){
		this.vertexArray.push(x);
	}
	else{
		var vertex = new TORNADO.Vertex(x,y,z,color);
	}
}
TORNADO.Mesh.prototype.getVertexBuffer = function(){
	var list = new Array();

	for (i in this.vertexArray){
		list = list.concat(this.vertexArray.getPosition());
	}
	return list;
}
TORNADO.Mesh.prototype.getColorBuffer = function(){
	var list = new Array();

	for (i in this.vertexArray){
		list = list.concat(this.vertexArray.getColor().concat(1.0));
	}
	return list;
}
TORNADO.Mesh.prototype.prepare = function(){
	this.vertexBuffer = gl.createBuffer();
	gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.getVertexBuffer()), gl.STATIC_DRAW);
    this.vertexBuffer.itemSize = 3;
    this.vertexBuffer.numItems = this.vertexArray.length;

    this.colorBuffer = this.gl.createBuffer();
    gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
	gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.getColorBuffer()), gl.STATIC_DRAW);
    this.colorBuffer.itemSize = 4;
    this.colorBuffer.numItems = this.vertexArray.length;
}
TORNADO.Mesh.prototype.beginDraw = function(){
    gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.vertexBuffer.itemSize, this.gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
    gl.vertexAttribPointer(this.shaderProgram.vertexColorAttribute, this.colorBuffer.itemSize, this.gl.FLOAT, false, 0, 0);

    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexBuffer.numItems);
}
TORNADO.Mesh.prototype.endDraw = function(){
}