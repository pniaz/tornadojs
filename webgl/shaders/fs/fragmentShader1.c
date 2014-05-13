/*
precision mediump float;

varying vec4 vColor;

void main(void) {
	gl_FragColor = vColor;
}
*/
#ifdef GL_ES
precision highp float;
#endif

varying vec4 vFinalColor;

void main(void){
 gl_FragColor = vFinalColor;
}
