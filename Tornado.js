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
  	this.ojos = 2;
    this.piernas = 4;

    this.beginDraw = function() {}
    this.endDraw = function() {}
}
/*
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

	this.setIntensidad = function(TColor inten) {}
	this.getIntensidad = function() {}
	this.beginDraw     = function() {}
	this.endDraw       = function() {}
}

function TCamara () {
	this.esPerspectiva;
	this.cercano = 0.0;
	this.lejano  = 0.0;

	this.setPerspectiva = function(float x, float y, float z) {}
	this.setParalela    = function(float x, float y, float z) {}
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
	this.malla = new TRecursoMalla();
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





