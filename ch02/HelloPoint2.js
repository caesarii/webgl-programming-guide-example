// HelloPint2.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE = 
`
  // 顶点着色器中声明 attribute 变量, 以 a_ 开头
  // attribute 只能在顶点着色器中使用, 每个顶点不同, 必须是全局变量, 从外部接受数据
  
  attribute vec4 a_Position; 
  attribute float a_PointSize; 
  void main() {
    gl_Position = a_Position;
    gl_PointSize = a_PointSize;
  }
`

// Fragment shader program
var FSHADER_SOURCE = 
`
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`

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

  // 获取 attribute 变量
  // gl.getAttribLocation(program, name)
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // 向 attribute 变量传递数据
  // gl.vertexAttrib3f(location, v0, v1, v2)
  // 函数族
  gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
  // vertexAttrib1f

  var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
  if(a_PointSize < 0) {
    console.log('Failed to get the storage location of a_PointSize');
    return;
  }
  gl.vertexAttrib1f(a_PointSize, 20.0);

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
    
  // Draw
  gl.drawArrays(gl.POINTS, 0, 1);
}
