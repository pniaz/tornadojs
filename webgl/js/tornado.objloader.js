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
		xhr.onload = __bind(function() {
		  var data = (xhr.responseText);
		  return callback(new TORNADO.OBJ(data));
		}, this); 
		xhr.send(null);
		return this.obj;
	}
}