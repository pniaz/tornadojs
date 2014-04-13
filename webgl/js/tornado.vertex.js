TORNADO.Vertex = function ( x,y,z, color) {

	this.x = x;
	this.y = y;
	this.z = z;

	this.color = new TORNADO.Color();
	if ( color !== undefined )
		this.color.set( color );
	return this;

};

TORNADO.Vertex.prototype = {

	constructor: TORNADO.Vertex,

	x: 1, y: 1, z: 1, color:null,

	setX: function ( value ) {
		this.x = value;
	},
	setY: function ( value ) {
		this.y = value;
	},
	setZ: function ( value ) {
		this.z = value;
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