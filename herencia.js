function Gato () 
{
  	this.ojos = 2;
    this.piernas = 4;
	
	this.getOjos = function() {
    	alert("El gato come y tiene "+ this.ojos + " ojos");
	}
}

function Siames () {
    this.color = "blanco";
    this.color_ojos = "azul";
}

Siames.prototype = new Gato();

var Catboy = new Siames();

alert(Catboy.ojos);

alert(Catboy.getOjos());

