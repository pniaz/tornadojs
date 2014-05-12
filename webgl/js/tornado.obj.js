/*
	OBJ class
*/

TORNADO.OBJ = function(data) {
  this.data = data.split('\n');
  
  this.list_v = new Array();
  this.list_f = new Array();
  this.listVertex = new Array();
  this.list_vt = new Array();
  this.list_vn = new Array();
  this.listFace = new Array();
  this.list_s = new Array();

}
    
TORNADO.OBJ.prototype = {
	
	constructor: TORNADO.OBJ,

	decode: function() {
		// parse entire file info.
		for( var i=0; i<this.data.length; i++) 
			this.parseLine(i);
		return this.listFace.length;
	},
	getListVertexArray: function(){

		var listVertexArray = new Array();

		for (i in this.listVertex)
		{
			listVertexArray.push(this.listVertex[i][0]);
			listVertexArray.push(this.listVertex[i][1]);
			listVertexArray.push(this.listVertex[i][2]);
		}

		return listVertexArray;
	},
	getListFaceArray: function (){

		var listFaceArray = new Array();
		var aux = new Array();
		for (i in this.listFace){
			for (j in this.listFace[i]){
				if(j != 0)
					aux.push(this.listFace[i][j]);
			}
			listFaceArray.push(aux);
			aux = new Array();
		}
		return listFaceArray;
	},
	parseLine: function(i) {
		var list = this.data[i].replace("\r", "");
		list = list.split(" ");
		var type = list[0];

		switch(type){
			case "v":
			  var v = [	parseFloat(list[1]),
				  parseFloat(list[2]),
				  parseFloat(list[3])];
			  if(list.length==5)
			    v.push(parseFloat(list[4]));
			  this.listVertex.push(v);
			break;

			case "vt":
			  var vt = [parseFloat(list[1]),
					parseFloat(list[2]),
					parseFloat(list[3])];
			  this.list_vt.push(vt);
			break;

			case "vn":
			  var vn = [parseFloat(list[1]),
					parseFloat(list[2]),
					parseFloat(list[3])];
			  this.list_vn.push(vn);
			break;

			case "vp":
			  var vp = [parseFloat(list[1]),
				  parseFloat(list[2])];
			  if(list.length==4)
			  v.push(parseFloat(list[3]));
			  this.list_vp.push(vp);
			break;

			case "f":
			  var face = [list.length];
			  for(var j=1; j<list.length; j++)
			face.push(parseInt(list[j])-1);
			this.listFace.push(face);
			break;

			case "s":
			this.list_s.push(list);
			break;

			default:
		}			
	}
}