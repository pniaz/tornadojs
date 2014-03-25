/*
	Node class
*/
TORNADO.Node = function () {

	return this;

};

TORNADO.Node.prototype = {

	constructor: TORNADO.Node,

	entity: null, 
	dad: null,
	children: new array(), 

	setEntity: function ( value ) {
		if ( value instanceof TORNADO.Entity ) {
			this.entity = value;
			return true;
		}
		else return false;
	},
	getEntity: function(){
		return this.entity;
	},
	addChild: function ( node ) {
		if ( node instanceof THREE.Node ) {
			return this.hijos.push(nodo);
		}
		return false;
	},
	remChildByNode: function (node) {
		var index = this.children.indexOf(node);
		if(index!=-1){
			return this.remChildByIndex(index);
		}
		else return false;
	},
	remChildByIndex: function (index){
		if(this.children.length>index){
			return this.children.splice(index, 1);
		}
		else 
	},
	setDad: function (dad){
		if ( node instanceof THREE.Node ) {
			this.dad = dad;
			return true;
		}
		return false;
	},
	getDad: function (){
		return this.dad;
	},
	draw: function(){
		this.entity.beginDraw();
		for (i in this.children) {
			this.children[i].draw();
		}
		this.entity.endDraw();
	}
};