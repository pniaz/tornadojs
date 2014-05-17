/*
	Node class
*/

TORNADO.Node = function (entity) {
	this.children = [];
	this.entity = entity || null;
};

TORNADO.Node.prototype = {

	constructor: TORNADO.Node,

	entity: null, 
	dad: null,
	children: null, 

	setEntity: function (value) {

		if (value instanceof TORNADO.Entity) {
			this.entity = value;
			return true;
		}
		else return false;
	},
	getEntity: function(){
		return this.entity;
	},
	addChild: function (node) {
		if (node instanceof TORNADO.Node) {
			this.children.push(node);
			return true;
		}
		return false;
	},
	remChildByIndex: function (index){
		if(this.children.length>index){
			return this.children.splice(index, 1);
		}
		else return false;
	},
	remChildByNode: function (node) {
		var index = this.children.indexOf(node);
		if(index!=-1){
			return this.remChildByIndex(index);
		}
		else return false;
	},
	setDad: function (dad){
		if (dad instanceof TORNADO.Node) {
			this.dad = dad;
			return true;
		}
		return false;
	},
	getDad: function (){
		return this.dad;
	},
	draw: function(renderer){
		if(this.entity)
			this.entity.beginDraw(renderer);
		for (i in this.children) {
			this.children[i].draw(renderer);
		}
		if(this.entity)
			this.entity.endDraw(renderer);
	},
	sayHello: function(){
		console.log("Hello");
	}
};