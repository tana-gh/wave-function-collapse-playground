uniform vec4 penColor;
varying vec4 v_color;

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    v_color.rgb = gl_Position.xyz * 0.5 + 0.5 + penColor.rgb * penColor.a;
    v_color.a   = 1.0;
}
