// HelloPoint1.js (c) 2012 matsuda
// 着色器
// 类 C 语法, 必须有 main 函数, 没有参数和返回值
// 输出数据通过内置变量, gl_xxx
// 输入数据通过声明与 webgl api 中同名的变量

// 顶点着色器 Vertex shader program
var VSHADER_SOURCE = 
  `void main() {
    gl_Position = vec4(0.0, 0.0, -1.0, 1.0); // 点的坐标, 必须赋值, vec4 类型
    gl_PointSize = 100.0;                    // 点的尺寸, float 类型
   }`;
// api 族
// vec4f
// vec3
// vec2

// 片元着色器 Fragment shader program
// gl_FragColor 内置变量, 颜色
var FSHADER_SOURCE =
  `void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // 点的颜色, 片元着色器内的唯一的内置变量
  }
  `

function main() {
  var canvas = document.getElementById('webgl');

  var gl = getWebGLContext(canvas, true);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // 初始化着色器
  // 准备好两段代码, 等待执行
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  gl.clear(gl.COLOR_BUFFER_BIT);

  // 绘制
  // gl.drawArrays(mode, first, count)
  // 绘制过程: 顶点着色器调用 count 次, 片元着色器绘制次数根据 drawArrays 参数有关(?)
  gl.drawArrays(gl.POINTS, 0, 1);
}
