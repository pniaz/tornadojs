/*
	Mesh class
*/
TORNADO.Light = function () {
	Entity.call(this);
};

extend(Entity, Light);

TORNADO.Mesh.prototype.light = null;

TORNADO.Mesh.prototype.beginDraw = function(){
}
TORNADO.Mesh.prototype.endDraw = function(){
}