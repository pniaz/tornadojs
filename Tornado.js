/**
 * @author Álvaro Yuste / http://yuste.info/
 * @author Javier Sánchez Riquelme / http://javiersr.com
 * @author Pablo Niñoles Aznar / http://insiria.com/imagine
 */

var TORNADO = { REVISION: '1' };

TORNADO.Node = function ( value ) {

	return this;

};
/*
	this.entidad = null;
	this.hijos   = new array();
	this.padre   = null;

	this.addHijo    = function(nodo) {
		return this.hijos.push(nodo);
	}
	this.remHijoByIndex    = function(index) {
		this.hijos.splice(index,1);
	}
	this.remHijoByNode    = function(node) {this.entidad = ent}

	this.setEntidad = function(enti) {this.entidad = ent}
	this.getEntidad = function() {return this.entidad}
	this.setPadre   = function(pad) {this.padre = pad}
	this.getPadre   = function() {return this.padre}

	this.draw       = function() {}
*/
TORNADO.Node.prototype = {

	constructor: TORNADO.Node,

	entity: null, 
	dad: null,
	children: new array(), 

	setEntity: function ( value ) {
		if ( value instanceof TORNADO.Entity ) {
			this.entity = value;
		}
		return true;
	},
	addChild: function ( node ) {
		if ( node instanceof THREE.Node ) {
			return this.hijos.push(nodo);
		}
		return -1;
	},
};

function TEntidad () 
{
    this.beginDraw = function() {}
    this.endDraw = function() {}
}

function TNodo () {

	this.entidad = null;
	this.hijos   = new array();
	this.padre   = null;

	this.addHijo    = function(nodo) {
		return this.hijos.push(nodo);
	}
	this.remHijoByIndex    = function(index) {
		this.hijos.splice(index,1);
	}
	this.remHijoByNode    = function(node) {this.entidad = ent}

	this.setEntidad = function(enti) {this.entidad = ent}

	this.entidad = new TEntidad();
	this.hijos   = new Array();
	this.padre   = padre;

	this.addHijo    = function(nodo) {}
	this.remHijo    = function(nodo) {}
	this.setEntidad = function(ent) {this.entidad = ent;}
	this.setPadre = function(ent) {this.padre = padre;}
	this.getEntidad = function() {return this.entidad}
	this.getPadre   = function() {return this.padre}
	this.draw       = function() {
		this.getEntidad().beginDraw();
		this.getEntidad().endDraw();
	}
}

function TColor(){

	this.specular;
	this.ambient;
	this.diffuse;

	this.setSpecular = function(spec) { this.specular = spec; }
    this.setAmbient =  function(amb)  { this.ambient  = amb;  }
    this.setDiffuse =  function(dif)  { this.diffuse  = dif;  }
    this.getSpecular = function() { return this.specular; }
    this.getAmbient =  function()  { return this.ambient; }
    this.getDiffuse =  function()  { return this.diffuse; }

}

function TLuz (type) {

    this.color = new TColor();
    this.type = type;
	this.setIntensidad = function(inten) { this.intesidad = inten;}
	this.getIntensidad = function() { return this.intensidad;}
	this.beginDraw     = function() {}
	this.endDraw       = function() {}

}

function TCamara () {
	
	this.esPerspectiva = new Float32Array();
	this.cercano = 0.0;
	this.lejano  = 0.0;

	this.setPerspectiva = function(x, y, z) {esPerspectiva.push([x,y,z]);}
	this.setParalela    = function(x, y, z) {}
	this.beginDraw      = function() {}
	this.endDraw        = function() {}
   
}

function TFichero () {
}

function TRecursoMalla () {
   	this.cargarMalla    = function(fich) {}
	this.beginDraw      = function() {}
	this.endDraw        = function() {}
}

function TMalla () {
	this.malla = new TRecursoMalla();
}

function TTransf () {

	this.identity = function() {}
	this.load    = function() {}
	this.transpose = function() {}
	this.traslate = function(x, y, z) {}
	this.rotate     = function(x, y, z) {}
	this.scale = function(x, y, z)
	this.beginDraw = function() {}
	this.endDraw   = function() {}
}

//Herencia
TLuz.prototype = new TEntidad();
TCamara.prototype = new TEntidad();
TMalla.prototype = new TEntidad();
TTransf.prototype = new TEntidad();





