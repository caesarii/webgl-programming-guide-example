// HelloCanvas.js (c) 2012 matsuda

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = canvas.getContext('webgl');
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  canvas.onmousedown = function () {
    const color = [Math.random(), Math.random(), Math.random(), 1.0]
    console.log('color', color);
    gl.clearColor(...color);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  // Set clear color
  // 指定背景颜色: 一次指定, 一直存在
  // 色值: rgba
  gl.clearColor(1.0, 0.0, 0.0, 0.5);

  // Clear <canvas>
  // 使用指定颜色擦除已绘制的内容
  // 参数: 颜色缓冲区, 内存区域
  gl.clear(gl.COLOR_BUFFER_BIT);

  // webgl/opengl 基本api使用模式: 声明数据, 初始化数据, 申请内存, 数据写入指定内存, 使用内存中的数据

  // demo: HelloCanvasClick
}
