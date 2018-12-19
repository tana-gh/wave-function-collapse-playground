varying vec4 v_color;

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    v_color = gl_Position * 0.5 + 0.5;
}
