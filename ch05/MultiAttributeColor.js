// MultiAttributeColor.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
`
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  // varying 变量
  // 之前使用 uniform 变量向片元着色器传递数据, uniform 变量对于所有顶点都是一致的, 也就是不是逐顶点的
  // 但这里我们是逐顶点的指定顶点的颜色的, 所以需要一个逐顶点的变量, 同时将数据从顶点着色器传递到片元着色器(逐顶点的数据只能在顶点着色器获取, 再传递到片元着色器)
  varying vec4 v_Color; 
  void main() {
    gl_Position = a_Position;
    gl_PointSize = 10.0;
    v_Color = a_Color;\ // Pass the data to the fragment shader
  }
`

// Fragment shader program
var FSHADER_SOURCE =
`
  precision mediump float; // Precision qualifier (See Chapter 6)
  varying vec4 v_Color;\   // Receive the data from the vertex shader
  void main() {
    gl_FragColor = v_Color;
  }
`

function main() {
  var canvas = document.getElementById('webgl');

  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  var n = initVertexBuffers(gl);
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.POINTS, 0, n); // TRIANGLES
}

function initVertexBuffers(gl) {
  // 顶点与颜色混合坐标
  var verticesColors = new Float32Array([
     0.0,  0.5,  1.0,  0.0,  0.0, 
    -0.5, -0.5,  0.0,  1.0,  0.0, 
     0.5, -0.5,  0.0,  0.0,  1.0, 
  ]);
  var n = 3; // The number of vertices

  var vertexColorBuffer = gl.createBuffer();  
  if (!vertexColorBuffer) {
    console.log('Failed to create the buffer object');
    return false;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

  var FSIZE = verticesColors.BYTES_PER_ELEMENT;

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  // stride: FSIZE * 5
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0);
  gl.enableVertexAttribArray(a_Position);  // Enable the assignment of the buffer object

  var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  if(a_Color < 0) {
    console.log('Failed to get the storage location of a_Color');
    return -1;
  }
  // offset: FSIZE * 2
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
  gl.enableVertexAttribArray(a_Color);  // Enable the assignment of the buffer object

  return n;
}
