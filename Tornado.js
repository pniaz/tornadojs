function TEntidad () 
{
  	this.ojos = 2;
    this.piernas = 4;

    this.beginDraw = function() {}
    this.endDraw = function() {}
}

function TNodo (padre) {
	
	this.entidad = new TEntidad();
	this.hijos   = new array();
	this.padre   = padre;

	this.addHijo    = function(nodo) {this.hijos.push(nodo);}
	this.remHijo    = function(index) {this.entidad = ent}
	this.setEntidad = function(enti) {this.entidad = ent}
	this.getEntidad = function() {return this.entidad}
	this.getPadre   = function() {return this.padre}
	this.draw       = function() {}
}

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


