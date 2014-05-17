/*
	Camera class
*/
TORNADO.Camera = function () {
	return this;
};

TORNADO.Camera.prototype = {
	constructor: TORNADO.Camera,

	x:10, y:10, z:-7.0,
	fov: 150, nearest: 0.8, farest: 100.0,
	rotationX: 0,

	setPerspective: function(pMatrix, mvMatrix){
		mat4.perspective(this.fov, gl.viewportWidth / gl.viewportHeight, this.nearest, this.farest, pMatrix);
		mat4.identity(mvMatrix);
	    mat4.translate(mvMatrix, [this.x, this.y, this.z]);
	    //console.log(degToRad(this.rotationX));
		//mat4.rotate(this.mvMatrix, degToRad(this.rotationX), [1, 0, 0]);
	},
	setPosition: function(x,y,z){
		if(x && x != undefined)
			this.x = x;
		if(y && y != undefined)
			this.y = y;
		if(z && z != undefined)
			this.z = z;
	},
	setRotationX: function(x){
		if(x != undefined)
			this.rotationX = x;
	}
}

