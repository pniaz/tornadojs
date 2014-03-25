/*
	Resource class
*/
TORNADO.Resource = function () {

	return this;

};

TORNADO.Resource.prototype = {

	constructor: TORNADO.Resource,
	name: "", 

	setName: function (name) {
		this.name = name;
			return true;
	},
	getName: function (){
		return this.name;
	}
};