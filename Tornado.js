function TEntidad () 
{
    this.beginDraw = function() {}
    this.endDraw = function() {}
}

function TNodo (padre) {
	
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
	this.getEntidad = function() {return this.entidad}
	this.getPadre   = function() {return this.}
	this.draw       = function() {}
}

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





