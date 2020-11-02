// MultiPoint.js (c) 2012 matsuda
var VSHADER_SOURCE =
`
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = 10.0;
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

  // 使用缓冲区对象
  var n = initVertexBuffers(gl);

  if (n < 0) {
    console.log('Failed to set the positions of the vertices');
    return;
  }

  gl.clearColor(0, 0, 0, 1);

  gl.clear(gl.COLOR_BUFFER_BIT);

  // first 参数
  gl.drawArrays(gl.TRIANGLES, 0, n);
}

function initVertexBuffers(gl) {
  // 顶点数组
  var vertices = new Float32Array([
    0.0, 0.5,   -0.5, -0.5,   0.5, -0.5
  ]);
  // 顶点个数
  var n = 3;

  // 声明缓冲区对象
  // 分配缓冲区对象的名称, 未分配内存, 未初始化
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // 将缓冲区对象名称与实际的缓冲区绑定到一起
  // gl.bindBuffer(target, buffer);
  // 缓冲区根据存储的数据的用途分为多种, 由 target 指定, ARRAY_BUFFER 表示顶点数组
  // buffer 即申请的缓冲区对象名称
  // 这一步将缓冲区对象指向了实际的内存空间, 分配了内存, 但为初始化
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  
  // 将顶点数组写入缓冲区, 初始化
  // // gl.bufferData(target, data, usage);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  // 上面共出现了 缓冲区对象, 缓冲区, 顶点数组三个实体, 缓冲区对象指向特定缓冲区, 缓冲区中包含实际的数据

  // 获取 attribute 变量
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }

  // 将缓冲区对象赋值给 attribute 变量
  // 我们是以一维数组的形式将顶点数组传递给着色器, 着色器一次处理一个顶点, 所以要指定提取顶点的必要数据
  // 我们传递的实际上是内存指针, 所有首先要指定第一个顶点相对内存地址的偏移量, 然后需要顶点坐标的数据类型 type 和维数 size, 这样就能取出第一个顶点
  // 顶点数组中可以顶点与其他数据(比如颜色)混排, 这样需要指定两个顶点之间的间隔大小(type * num), 这样就可以取出之后的数据

  // gl.vertexAttribPointer(location, size, type, normalized, stride, offset)
  // location: 变量地址
  // size: 每个顶点坐标的维数, 如 (x, y, z) 是 3
  // type: 顶点坐标的数据类型
  // normalized: 忽略
  // stride: 两个顶点之间的间隔
  // offset: 起始偏移量
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  // 启用变量
  gl.enableVertexAttribArray(a_Position);

  return n;
}
