function TEntidad () 
{
  	this.ojos = 2;
    this.piernas = 4;

    this.beginDraw = function() {}
    this.endDraw = function() {}
}

function TNodo () {
	
	this.entidad = new TEntidad();
	this.hijos   = new array();

	this.addHijo    = function(TNodo nodo) {}
	this.remHijo    = function(TNodo nodo) {}
	this.setEntidad = function(TEntidad ent) {}
	this.getEntidad = function() {}
	this.getPadre   = function() {}
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


