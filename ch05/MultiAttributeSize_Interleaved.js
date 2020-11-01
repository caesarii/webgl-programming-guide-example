// MultiAttributeSize_Interleaved.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
`
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

  gl.drawArrays(gl.POINTS, 0, n);
}

function initVertexBuffers(gl) {
  // 顶点与 pointSize 混合数组
  var verticesSizes = new Float32Array([
     0.0,  0.5,  10.0,  // the 1st point
    -0.5, -0.5,  20.0,  // the 2nd point
     0.5, -0.5,  30.0   // the 3rd point
  ]);
  var n = 3; 
  // The number of vertices

  // 声明一个 buffer
  var vertexSizeBuffer = gl.createBuffer();  
  if (!vertexSizeBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexSizeBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesSizes, gl.STATIC_DRAW);

  // 类型化数组 api: 每个元素的字节数
  var FSIZE = verticesSizes.BYTES_PER_ELEMENT;

  // 从混合数组中读取数据分别传递给两个变量


  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }

  // stride: 步进, 两个顶点数据之间间隔的字节数, 即单个顶点数据的长度
  // 为什么只有顶点坐标一种数据时是 0: 可以根据 size * type 算出来
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 3, 0);
  gl.enableVertexAttribArray(a_Position); 

  var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
  if(a_PointSize < 0) {
    console.log('Failed to get the storage location of a_PointSize');
    return -1;
  }
  // offset: 起始内存地址偏移量, 数组从 0 开始取, 还是从 index 开始取
  gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, FSIZE * 3, FSIZE * 2);
  gl.enableVertexAttribArray(a_PointSize);  // Enable buffer allocation

  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return n;
}
