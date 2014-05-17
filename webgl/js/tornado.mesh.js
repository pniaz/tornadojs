/*
	Mesh class
*/
TORNADO.Mesh = function () {
	TORNADO.Entity.call(this);

	this.vertexArray = [];
	this.faceArray = [];
	this.indexArray = [];

	this.vertexBuffer = [];
	this.indexBuffer = [];
	this.normalsBuffer = [];
	this.colorBuffer = [];

	//Texture
	this.texture;
	this.textureCoorBuffer = [];
};

extend(TORNADO.Entity, TORNADO.Mesh);

TORNADO.Mesh.prototype.vertexArray = null;

TORNADO.Mesh.prototype.addIndex = function(index){
	
	if(index >= 0){
		this.indexArray.push(index);
	}
}
TORNADO.Mesh.prototype.addListIndex = function(indexList){
	
	for(var i=0; i < indexList.length;i++){
		this.addIndex(indexList[i]);
	}
}
TORNADO.Mesh.prototype.addVertex = function(x,y,z,color){
	if(x instanceof TORNADO.Vertex){
		this.vertexArray.push(x);
	}
	else{
		var vertex = new TORNADO.Vertex(x,y,z,color);
		this.vertexArray.push(vertex);
	}
}
TORNADO.Mesh.prototype.calculateNormals = function(vs, ind){

	 	var x=0; 
        var y=1;
        var z=2;
        
        var ns = [];
        for(var i=0;i<vs.length;i=i+3){ //for each vertex, initialize normal x, normal y, normal z
            ns[i+x]=0.0;
            ns[i+y]=0.0;
            ns[i+z]=0.0;
        }
        
        for(var i=0;i<ind.length;i=i+3){ //we work on triads of vertices to calculate normals so i = i+3 (i = indices index)
            var v1 = [];
            var v2 = [];
            var normal = [];	
            //p2 - p1
            v1[x] = vs[3*ind[i+2]+x] - vs[3*ind[i+1]+x];
            v1[y] = vs[3*ind[i+2]+y] - vs[3*ind[i+1]+y];
            v1[z] = vs[3*ind[i+2]+z] - vs[3*ind[i+1]+z];
            //p0 - p1
            v2[x] = vs[3*ind[i]+x] - vs[3*ind[i+1]+x];
            v2[y] = vs[3*ind[i]+y] - vs[3*ind[i+1]+y];
            v2[z] = vs[3*ind[i]+z] - vs[3*ind[i+1]+z];
            //cross product by Sarrus Rule
            normal[x] = v1[y]*v2[z] - v1[z]*v2[y];
            normal[y] = v1[z]*v2[x] - v1[x]*v2[z];
            normal[z] = v1[x]*v2[y] - v1[y]*v2[x];
            for(j=0;j<3;j++){ //update the normals of that triangle: sum of vectors
                ns[3*ind[i+j]+x] =  ns[3*ind[i+j]+x] + normal[x];
                ns[3*ind[i+j]+y] =  ns[3*ind[i+j]+y] + normal[y];
                ns[3*ind[i+j]+z] =  ns[3*ind[i+j]+z] + normal[z];
            }
        }
        //normalize the result
        for(var i=0;i<vs.length;i=i+3){ //the increment here is because each vertex occurs with an offset of 3 in the array (due to x, y, z contiguous values)
        
            var nn=[];
            nn[x] = ns[i+x];
            nn[y] = ns[i+y];
            nn[z] = ns[i+z];
            
            var len = Math.sqrt((nn[x]*nn[x])+(nn[y]*nn[y])+(nn[z]*nn[z]));
            if (len == 0) len = 1.0;
            
            nn[x] = nn[x]/len;
            nn[y] = nn[y]/len;
            nn[z] = nn[z]/len;
            
            ns[i+x] = nn[x];
            ns[i+y] = nn[y];
            ns[i+z] = nn[z];
        }
        
        return ns;
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
	this.initTexture();
}
TORNADO.Mesh.prototype.initBuffers = function(){

	/*
	//Vertex
	this.vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.getVertexBuffer()), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    this.vertexBuffer.itemSize = 3;
    this.vertexBuffer.numItems = this.indexArray.length;

    //Normals
    var normals = this.calculateNormals(this.getVertexBuffer(), this.indexArray);
    console.log(normals);
    this.normalsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals),gl.STATIC_DRAW);
    this.normalsBuffer.itemSize = 3;
    this.normalsBuffer.numItems = this.indexArray.length;
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    //Index 
    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indexArray),gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    //Color
    
    this.colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.getColorBuffer()), gl.STATIC_DRAW);
    this.colorBuffer.itemSize = 4;
    this.colorBuffer.numItems = this.vertexArray.length;
    */
  	this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    var vertices = [
        // Front face
        -1.0, -1.0,  1.0,
         1.0, -1.0,  1.0,
         1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,

        // Back face
        -1.0, -1.0, -1.0,
        -1.0,  1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0, -1.0, -1.0,

        // Top face
        -1.0,  1.0, -1.0,
        -1.0,  1.0,  1.0,
         1.0,  1.0,  1.0,
         1.0,  1.0, -1.0,

        // Bottom face
        -1.0, -1.0, -1.0,
         1.0, -1.0, -1.0,
         1.0, -1.0,  1.0,
        -1.0, -1.0,  1.0,

        // Right face
         1.0, -1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0,  1.0,  1.0,
         1.0, -1.0,  1.0,

        // Left face
        -1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0,  1.0, -1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    this.vertexBuffer.itemSize = 3;
    this.vertexBuffer.numItems = 24;

    //Texture
    this.textureCoorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoorBuffer);
    
    var textureCoords = [
      // Front face
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,

      // Back face
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,

      // Top face
      0.0, 1.0,
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,

      // Bottom face
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
      1.0, 0.0,

      // Right face
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,

      // Left face
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    this.textureCoorBuffer.itemSize = 2;
    this.textureCoorBuffer.numItems = 24;

	this.indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
	var cubeVertexIndices = [
	    0, 1, 2,      0, 2, 3,    // Front face
	    4, 5, 6,      4, 6, 7,    // Back face
	    8, 9, 10,     8, 10, 11,  // Top face
	    12, 13, 14,   12, 14, 15, // Bottom face
	    16, 17, 18,   16, 18, 19, // Right face
	    20, 21, 22,   20, 22, 23  // Left face
	]
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
	this.indexBuffer.itemSize = 1;
    this.indexBuffer.numItems = 36;
}
TORNADO.Mesh.prototype.initTexture = function(){
	var self = this;
    this.texture = gl.createTexture();
    this.texture.image = new Image();
    this.texture.image.onload = function() {
      self.handleLoadedTexture(self.texture);
    }
    this.texture.image.src = "nehe.gif"; 
}
TORNADO.Mesh.prototype.handleLoadedTexture = function(texture) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.bindTexture(gl.TEXTURE_2D, null);
}
TORNADO.Mesh.prototype.beginDraw = function(renderer){
    
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoorBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.textureCoorBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.uniform1i(shaderProgram.samplerUniform, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    renderer.setMatrixUniforms();
    gl.drawElements(gl.TRIANGLES, this.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}
TORNADO.Mesh.prototype.endDraw = function(){
}