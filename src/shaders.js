export const lineVertexShader = `
  varying vec3 vPos;
  void main() {
    vPos = position;
    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;
  }
`;

export const lineFragmentShader = `
  #define PI 3.1415926538
  uniform vec3 origin;
  uniform vec3 color;
  varying vec3 vPos;
  float inverseLerp(float a, float b, float v) {
    return (v-a) / (b-a);
  }
  void main() {
    float angle = atan(vPos.z, vPos.x);
    float opacity = inverseLerp(-PI, PI, angle);
    gl_FragColor = vec4(color, opacity);
  }
`;
