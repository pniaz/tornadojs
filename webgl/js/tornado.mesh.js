/*
	Mesh class
*/
TORNADO.Mesh = function () {
	TORNADO.Entity.call(this);

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
		this.vertexArray.push(vertex);
	}
}
TORNADO.Mesh.prototype.addListVertex = function(listVertex){

	for (var i=0; i<listVertex.length; i+=3)
	{
		var color = "yellow";
		if(i%3==1)
			color = "red";
		else if (i%3 == 2)
			color = "green";

		this.addVertex(listVertex[i],listVertex[i+1],listVertex[i+2],color) ;
	}		

	console.debug(this.vertexArray);

}
TORNADO.Mesh.prototype.getVertexBuffer = function(){
	var list = new Array();

	for (i in this.vertexArray){
		list = list.concat(this.vertexArray[i].getPosition());
	}
	return list;
}
TORNADO.Mesh.prototype.getColorBuffer = function(){
	var list = new Array();

	for (i in this.vertexArray){
		list = list.concat(this.vertexArray[i].getColor().concat(1.0));
	}
	return list;
}
TORNADO.Mesh.prototype.prepare = function(){
	this.vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.getVertexBuffer()), gl.STATIC_DRAW);
    this.vertexBuffer.itemSize = 3;
    this.vertexBuffer.numItems = this.vertexArray.length;

    this.colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.getColorBuffer()), gl.STATIC_DRAW);
    this.colorBuffer.itemSize = 4;
    this.colorBuffer.numItems = this.vertexArray.length;
}
TORNADO.Mesh.prototype.beginDraw = function(){
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, this.colorBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, this.vertexBuffer.numItems);
}
TORNADO.Mesh.prototype.endDraw = function(){
}