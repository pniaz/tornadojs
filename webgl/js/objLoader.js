var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
var OBJLoader = function() {
}
  
OBJLoader.prototype.load = function(url) {
  var xhr;
  xhr = new XMLHttpRequest;
  xhr.open("GET", url, true);
  xhr.responseType = "text";
  xhr.onload = __bind(function() {
	  var data = (xhr.responseText);
	  return this.loaderOBJCallback(new OBJ(data));
  }, this);
  return xhr.send(null);
};

OBJLoader.prototype.loaderOBJCallback = function (obj) {
  var instance = obj;
  var numTriangles = instance.decode();

  console.log('Numero de triangulos del cubo');
  console.debug(instance);
}