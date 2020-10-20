// RotatedTriangle_Matrix.js (c) matsuda
// Vertex shader program
var VSHADER_SOURCE =
`
  attribute vec4 a_Position;
  uniform mat4 u_xformMatrixRotate;
  uniform mat4 u_xformMatrixTranslate;
  void main() {
    gl_Position = u_xformMatrixTranslate * u_xformMatrixRotate * a_Position;
  }
`

// Fragment shader program
var FSHADER_SOURCE =
`
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`

// The rotation angle
var ANGLE = 90.0;

var Tx = 0.5, Ty = 0.5, Tz = 0.0;

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }
 
  // Write the positions of vertices to a vertex shader
  var n = initVertexBuffers(gl);
  if (n < 0) {
    console.log('Failed to set the positions of the vertices');
    return;
  }

  // Create a rotation matrix
  var radian = Math.PI * ANGLE / 180.0; // Convert to radians
  var cosB = Math.cos(radian), sinB = Math.sin(radian);

  // Note: WebGL is column major order
  var xformMatrixRotate = new Float32Array([
     cosB, sinB, 0.0, 0.0,
    -sinB, cosB, 0.0, 0.0,
      0.0,  0.0, 1.0, 0.0,
      0.0,  0.0, 0.0, 1.0
  ]);

  var xformMatrixTranslate = new Float32Array([
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0,  0.0, 1.0, 0.0,
    Tx,  Ty, Tz, 1.0
  ]);

  // Pass the rotation matrix to the vertex shader
  var u_xformMatrixRotate = gl.getUniformLocation(gl.program, 'u_xformMatrixRotate');
  if (!u_xformMatrixRotate) {
    console.log('Failed to get the storage location of u_xformMatrixRotate');
    return;
  }
  gl.uniformMatrix4fv(u_xformMatrixRotate, false, xformMatrixRotate);

  var u_xformMatrixTranslate = gl.getUniformLocation(gl.program, 'u_xformMatrixTranslate');
  if (!u_xformMatrixTranslate) {
    console.log('Failed to get the storage location of u_xformMatrixTranslate');
    return;
  }
  gl.uniformMatrix4fv(u_xformMatrixTranslate, false, xformMatrixTranslate);

  // Specify the color for clearing <canvas>
  gl.clearColor(0, 0, 0, 1);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw the rectangle
  gl.drawArrays(gl.TRIANGLES, 0, n);
}

function initVertexBuffers(gl) {
  var vertices = new Float32Array([
    0, 0.5,   -0.5, -0.5,   0.5, -0.5
  ]);
  var n = 3; // The number of vertices

  // Create a buffer object
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return false;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  return n;
}

