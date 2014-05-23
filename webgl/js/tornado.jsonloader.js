/*
	JSONLoader class
*/
TORNADO.JSONLoader = function() {}
  
TORNADO.JSONLoader.prototype = {
	
	constructor: TORNADO.JSONLoader,


	load: function(url, callback) {
		var xhr;
		xhr = new XMLHttpRequest;
		xhr.open("GET", url);
		xhr.responseType = "text";
		xhr.onload = __bind(
			function() {
				var data = (xhr.responseText);
				JSONData = JSON.parse(data);
						
				var mesh = new TORNADO.Mesh();
				mesh.addListVertex(JSONData.vertexPositions);
				mesh.addListIndex(JSONData.indices);
				mesh.addListTextureCoord(JSONData.vertexTextureCoords);
				mesh.addListNormal(JSONData.vertexNormals);

				mesh.prepare();

				return callback(mesh);
			}, 
			this
		); 
		xhr.send(null);
	}
}