TORNADO.Vertex = function ( x,y,z, color) {

	if(x && x != undefined)
		this.x = x;
	if(y && y != undefined)
		this.y = y;
	if(z && z != undefined)
		this.z = z;

	this.color = new TORNADO.Color();
	if (color && color !== undefined )
		this.color.set( color );
	return this;

};

TORNADO.Vertex.prototype = {

	constructor: TORNADO.Vertex,

	x: 0, y: 0, z: 0, color:null,

	setX: function ( value ) {
		this.x = value;
	},
	setY: function ( value ) {
		this.y = value;
	},
	setZ: function ( value ) {
		this.z = value;
	},
	setPosition: function(x,y,z){
		if(x && x != undefined)
			this.setX(x);
		if(y && y != undefined)
			this.setY(y);
		if(z && z != undefined)
			this.setX(z);
	},
	setColor: function ( value ) {
		this.color.set(value);
	},
	getPosition: function(){
		return [this.x, this.y, this.z];
	},
	getColor: function(){
		return this.color.toArray();
	}
}