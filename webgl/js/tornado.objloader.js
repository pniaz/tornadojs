/*
	OBJLoader class
*/
TORNADO.OBJLoader = function() {}
  
TORNADO.OBJLoader.prototype = {

	constructor: TORNADO.OBJLoader,
	
	load: function(url, callback) {
		var xhr;
		xhr = new XMLHttpRequest;
		xhr.open("GET", url);
		xhr.responseType = "text";
		xhr.onload = __bind(
			function() {
				var data = (xhr.responseText);
				var obj = new TORNADO.OBJ(data);
				var numTriangles = obj.decode();

				var vertex = obj.getListVertexArray();
				var faces = obj.getListFaceArray();
				var indices = obj.getListIndexArray(faces);
				var textureCoord = obj.getListTextureCoordArray();
				var normals = obj.getListNormals();
					
				var mesh = new TORNADO.Mesh();

				mesh.addListVertex(vertex);
				mesh.addListIndex(indices);
				mesh.addListTextureCoord(textureCoord);
				mesh.addListNormal(normals);

				mesh.prepare();

				return callback(mesh);
			}, 
			this
		); 
		xhr.send(null);
	}
}