var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
function extend(base, sub) {sub.prototype = Object.create(base.prototype); sub.prototype.constructor = sub; Object.defineProperty(sub.prototype, 'constructor', {enumerable: false, value: sub }); }
function degToRad(degrees) {return degrees * Math.PI / 180; }

var gl;
var shaderProgram;

var TORNADO = { REVISION: '1' };

TORNADO.Loader = function (){

}
TORNADO.Loader.prototype  = {
	constructor: TORNADO.Loader,

	scripts: [
		"js/webgl-utils.js",
		"js/tornado.matrix.js",
		"js/tornado.color.js",
		"js/tornado.texture.js",
		"js/tornado.vertex.js",
		"js/tornado.obj.js",
		"js/tornado.objloader.js",
		"js/tornado.jsonloader.js",
		"js/tornado.camera.js",
		"js/tornado.renderer.js",
		"js/tornado.shadersLoader.js",
		"js/tornado.entity.js",
		"js/tornado.mesh.js",
		"js/tornado.transform.js",
		"js/tornado.light.js",
		"js/tornado.node.js",
		"js/tornado.resource.js",
		"js/tornado.resourcesManager.js",
		"js/tornado.scene.js"
	],
	loadScripts: function (){
		var self = this;
		name = this.scripts.shift(); 
		$.getScript(name, function(){
			console.log("Script "+ name +" loaded and executed."); 
			if(self.scripts.length > 0){
				self.loadScripts(); 
			} 
			else $.holdReady( false ); 
		}); 
	},
	loadFile: function (url, data, callback, errorCallback) {
		var request = new XMLHttpRequest(); 
		request.open('GET', url, true); 
		request.onreadystatechange = function () {
			if (request.readyState == 4) {
				if (request.status == 200) {
					callback(request.responseText, data) 
				} else {errorCallback(url); } 
			} 
		}; request.send(null); 
	},

	loadFiles: function (urls, callback, errorCallback) {
		var numUrls = urls.length; 
		var numComplete = 0; 
		var result = []; 
		function partialCallback(text, urlIndex) {
			result[urlIndex] = text; 
			numComplete++; 
			if (numComplete == numUrls) {
				callback(result); 
			} 
		} 
		for (var i = 0; i < numUrls; i++) {
			this.loadFile(urls[i], i, partialCallback, errorCallback); 
		} 
	}
} 


/*LOADING TORNADO ENGINE*/
$.holdReady( true );
var loader = new TORNADO.Loader();
loader.loadScripts();
