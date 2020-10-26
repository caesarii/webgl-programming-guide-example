// HelloPint2.js (c) 2012 matsuda
var VSHADER_SOURCE = 
`
  // 顶点着色器中声明 attribute 变量, 约定以 a_ 开头表明是 
  // attribute 只能在顶点着色器中使用, 每个顶点不同, 必须是全局变量, 从外部接受数据
  
  attribute vec4 a_Position; 
  attribute float a_PointSize; 
  void main() {
    gl_Position = a_Position;
    gl_PointSize = a_PointSize;
  }
`
var FSHADER_SOURCE = 
`
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
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

  // 获取 attribute 变量
  // gl.getAttribLocation(program, name)
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // 向 attribute 变量传递数据
  // gl.vertexAttrib3f(location, v0, v1, v2)
  gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
  // 函数族
  // vertexAttrib1f

  var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
  if(a_PointSize < 0) {
    console.log('Failed to get the storage location of a_PointSize');
    return;
  }
  gl.vertexAttrib1f(a_PointSize, 20.0);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  gl.clear(gl.COLOR_BUFFER_BIT);
    
  gl.drawArrays(gl.POINTS, 0, 1);
}
