/*
	Mesh class
*/
TORNADO.Camera = function () {
	Entity.call(this);
};

extend(Entity, Camera);

TORNADO.Mesh.prototype.camera = null;

TORNADO.Mesh.prototype.beginDraw = function(){
}
TORNADO.Mesh.prototype.endDraw = function(){
}