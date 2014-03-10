var WIDTH = window.innerWidth; // Ancho de pantalla
var HEIGHT = window.innerHeight; // Alto de pantalla
  
// Lienzo u objeto encargado del renderizado
var lienzo = new THREE.WebGLRenderer();
  
// Establecemos las dimensiones del lienzo
lienzo.setSize(
	WIDTH,
	HEIGHT
);
  
// Añadimos el lienzo a la página
document.body.appendChild(lienzo.domElement);

// Creamos la escena
var escena = new THREE.Scene;

// Creamos un prisma
var geometriaCubo = new THREE.CubeGeometry(
	100, // Dimensiones en eje X
	140, // Dimensiones en eje Y
	100 // Dimensiones en eje Z
);
  
// Creamos una apariencia (de lila claro)
var aparienciaLila = new THREE.MeshLambertMaterial({
	color: 0x9999FF // Color hexadecimal
});
  
// Generamos el prisma y le aplicamos la apariencia
var cubo = new THREE.Mesh(geometriaCubo, aparienciaLila);

// Añadimos el cubo a la escena
escena.add(cubo);

// Creamos una par de focos de luz
var luz1 = new THREE.PointLight(0xff0044); // Rojizo
luz1.position.set(
	120, // Posición en eje X
	260, // Posición en eje Y
	100 // Posición en eje Z
);
  
var luz2 = new THREE.PointLight(0x4499ff); // Azulado
luz2.position.set(
	-100, // Posición en eje X
	100, // Posición en eje Y
	200 // Posición en eje Z
);
  
// Añadimos las luces
escena.add(luz1);
escena.add(luz2);

// Generamos la cámara
var camara = new THREE.PerspectiveCamera(
	45, // Campo de visión
	(WIDTH / HEIGHT), // Proporcion
	0.1,
	10000 // Campo de visión
);
  
// Situamos la cámara
camara.position.y = 160; // Elevamos la cámara
camara.position.z = 400; // Alejamos la cámara

// Centramos la vista en el cubo
camara.lookAt(cubo.position);
  
// Añadimos la cámara a la escena
escena.add(camara);

// Renderizamos la escena
lienzo.render(escena, camara);