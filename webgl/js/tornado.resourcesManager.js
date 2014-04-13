/*
	ResourceManager class
*/
TORNADO.ResourceManager = function () {

	return this;

};

TORNADO.ResourceManager.prototype = {

	constructor: TORNADO.ResourceManager,
	resources: [], 

	getResource: function (name){
		var resourceIndex = -1;

		for(i = 0; i < this.resources.length && resourceIndex == -1 ; i++)
			if(name.localeCompare(this.resources[i].getName()))
				resourceIndex = i;
		
		if(resourceIndex == -1){
			var resource = TORNADO.Resource();			
			resource.load(name);//comprobar asincronia
			this.resources.push(resource);
			resourceIndex = this.resources.length - 1;
		}

		return this.resources[resourceIndex];
	}
};