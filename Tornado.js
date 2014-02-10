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
/*
function TNodo () {
	
<<<<<<< HEAD
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
=======
	this.entidad = new TEntidad();
	this.hijos   = new Array();
	this.padre   = padre;

	this.addHijo    = function(TNodo nodo) {}
	this.remHijo    = function(TNodo nodo) {}
<<<<<<< HEAD
	this.setEntidad = function(TEntidad ent) {this.entidad = ent}
=======
	this.setEntidad = function(TEntidad ent) {this.entidad = ent;}
>>>>>>> be8ea2413f39af6b7c81c32e9c918c5ec1163476
>>>>>>> 4eb59acac1d42806412bed59c672f8ce9bdfa0f6
	this.getEntidad = function() {return this.entidad}
	this.setPadre   = function(pad) {this.padre = pad}
	this.getPadre   = function() {return this.padre}

	this.draw       = function() {}
}
*/
function TColor(){

}

function TLuz () {
   this.intensidad = new TColor();

	this.setIntensidad = function(inten) { this.intesidad = inten;}
	this.getIntensidad = function() { return this.intensidad;}
	this.beginDraw     = function() {}
	this.endDraw       = function() {}
}

function TCamara (º) {
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
   	this.cargarMalla    = function(TFichero fich) {}
	this.beginDraw      = function() {}
	this.endDraw        = function() {}
}

function TMalla () {
<<<<<<< HEAD
	this.malla = new TRecursoMalla();
=======
 	this.malla = new TRecursoMalla();
>>>>>>> 4eb59acac1d42806412bed59c672f8ce9bdfa0f6
}

function TTransf () {

	this.identidad = function() {}
	this.cargar    = function() {}
	this.trasponer = function() {}
	this.trasladar = function(float x, float y, float z) {}
	this.rotar     = function(float x, float y, float z) {}
	this.beginDraw = function() {}
	this.endDraw   = function() {}
}

//Herencia
TLuz.prototype = new TEntidad();
TCamara.prototype = new TEntidad();
TMalla.prototype = new TEntidad();
TTransf.prototype = new TEntidad();





