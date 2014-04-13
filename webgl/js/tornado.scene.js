/*
	Mesh class
*/
TORNADO.Scene = function () {
	Entity.call(this);
};

extend(Node, Scene);

TORNADO.Mesh.prototype.scene = null;

TORNADO.Mesh.prototype.beginDraw = function(){
}
TORNADO.Mesh.prototype.endDraw = function(){
}