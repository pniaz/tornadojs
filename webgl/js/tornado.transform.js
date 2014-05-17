/*
	Transform class
*/
TORNADO.Transform = function () {
	TORNADO.Entity.call(this);
};
extend(TORNADO.Entity, TORNADO.Transform);

TORNADO.Transform.prototype.matrix = mat4.create();

TORNADO.Transform.prototype.charge = function(mat){
	this.matrix = mat4.create(mat);
}
/* MATRIX OPERATIONS */
TORNADO.Transform.prototype.identity = function(){
	this.matrix = mat4.identity();
}
TORNADO.Transform.prototype.transpose = function(){
	this.matrix = mat4.transpose(this.matrix);
}
TORNADO.Transform.prototype.inverse = function(){
	this.matrix = mat4.inverse(this.matrix);
}
TORNADO.Transform.prototype.multiply = function(mat){
	this.matrix = mat4.multiply(this.matrix, mat);
}
TORNADO.Transform.prototype.multiplyVec3 = function(vec){
	this.matrix = mat4.multiplyVec3(this.matrix, vec);
}
TORNADO.Transform.prototype.multiplyVec4 = function(vec){
	this.matrix = mat4.multiplyVec4(this.matrix, vec);
}
/* TRANSFORMATION OPERATIONS */
TORNADO.Transform.prototype.translate = function(x,y,z){
	var vecTrans = vec3.create();
	vecTrans[0] = x; 
	vecTrans[1] = y;
	vecTrans[2] = z;
	this.matrix = mat4.translate(this.matrix, vecTrans);
}
TORNADO.Transform.prototype.scale = function(x,y,z){
	var vecScale = vec3.create();
	vecScale[0] = x;
	vecScale[1] = y;
	vecScale[2] = z;
	this.matrix = mat4.scale(this.matrix, vecScale);
}
TORNADO.Transform.prototype.rotate = function(degrees, x, y, z){
	var axis = vec3.create();
	axis[0] = x;
	axis[1] = y;
	axis[2] = z;
	this.matrix = mat4.rotate(this.matrix, degrees, axis);
}
TORNADO.Transform.prototype.beginDraw = function(renderer){
	var mv = renderer.mvPushMatrix();
    mat4.multiply(mv,this.matrix);
}
TORNADO.Transform.prototype.endDraw = function(renderer){
	renderer.mvPopMatrix();
}