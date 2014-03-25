/*
	Mesh class
*/
TORNADO.Mesh = function () {
	Entity.call(this);
};
extend(Entity, Mesh);

TORNADO.Mesh.prototype.mesh = null;
TORNADO.Mesh.prototype.charge = function(file){
	this.matrix = mat4.create(mat);
}
TORNADO.Mesh.prototype.beginDraw = function(){
}
TORNADO.Mesh.prototype.endDraw = function(){
}