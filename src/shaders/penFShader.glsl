precision mediump float;

uniform vec4 penColor;
varying vec2 v_coord;

void main() {
    float l = length(v_coord);
    float s = smoothstep(0.0, 1.0, 1.0 - l);
    gl_FragColor = vec4(penColor.rgb * penColor.a * s, 1.0);
}
