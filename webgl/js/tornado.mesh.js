/*
	Mesh class
*/

TORNADO.Mesh = function () {
	TORNADO.Entity.call(this);

    //this.auxVertexCopy = [];
	this.vertexArray = [];

	this.faceArray = [];
    this.indexArray = [];
	this.normalsArray = [];

	this.vertexBuffer = [];
	this.indexBuffer = [];
	this.normalsBuffer = [];
	this.colorBuffer = [];

	this.texture = {};
};

extend(TORNADO.Entity, TORNADO.Mesh);

TORNADO.Mesh.prototype.vertexArray = null;

TORNADO.Mesh.prototype.addVertex = function(x,y,z,color){
  if(x instanceof TORNADO.Vertex){
    this.vertexArray.push(x);
    //this.auxVertexCopy.push(x);
  }
  else{
    var vertex = new TORNADO.Vertex(x,y,z,color);
    this.vertexArray.push(vertex);
    //this.auxVertexCopy.push(vertex);
  }
}
TORNADO.Mesh.prototype.addListVertex = function(listVertex){
  var color;
  for (var i=0; i<listVertex.length; i+=3){
    color = "gray";
    if(i%6==0) color = "green";
    if(i%9==0) color = "red";
    if(i%12==0) color = "yellow";
    this.addVertex(listVertex[i],listVertex[i+1],listVertex[i+2],color);
  }   
}
TORNADO.Mesh.prototype.setTexture = function(url, coords){
    this.texture = new TORNADO.Texture();
    this.texture.init(url, coords);
}
TORNADO.Mesh.prototype.addListIndex = function(indexList){

    //this.vertexArray = new Array();

	for(var i=0; i < indexList.length;i++){
		this.indexArray.push(indexList[i]);
      //  this.vertexArray.push(this.auxVertexCopy[indexList[i]]);
	}

    //console.debug(this.vertexArray);
}

TORNADO.Mesh.prototype.addListTextureCoord = function(textureCoordList){
    this.texture.setCoords(textureCoordList);  
}
TORNADO.Mesh.prototype.addListNormal = function(normalsList){
    this.normalsArray = normalsList;  
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
	this.initBuffers();
//	this.texture.init();
/*
    console.debug(this);
    console.debug(this.getVertexBuffer());
*/
}
TORNADO.Mesh.prototype.initBuffers = function(){

    //Vertex
    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.getVertexBuffer()), gl.STATIC_DRAW);
    this.vertexBuffer.itemSize = 3;
    this.vertexBuffer.numItems = this.vertexArray.length;

    //Normals
    this.normalsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normalsArray),gl.STATIC_DRAW);
    this.normalsBuffer.itemSize = 3;
    this.normalsBuffer.numItems = (this.normalsArray.length);

    //Index 
    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indexArray),gl.STATIC_DRAW);
    this.indexBuffer.itemSize = 1;
    this.indexBuffer.numItems = this.indexArray.length;
}
TORNADO.Mesh.prototype.beginDraw = function(renderer){
    
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalsBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, this.normalsBuffer.itemSize, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texture.getCoordsBuffer());
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.texture.getCoordsBuffer().itemSize, gl.FLOAT, false, 0, 0);
    this.texture.draw();
     
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

    renderer.setMatrixUniforms();
    gl.drawElements(gl.TRIANGLES,this.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}
TORNADO.Mesh.prototype.endDraw = function(){
}