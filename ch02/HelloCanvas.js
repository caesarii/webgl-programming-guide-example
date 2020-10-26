// HelloCanvas.js (c) 2012 matsuda

function main() {
  var canvas = document.getElementById('webgl');

  // 获取 webgl context
  var gl = canvas.getContext('webgl');
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // webgl/opengl 基本api使用模式: 声明数据, 初始化数据, 申请内存, 数据写入指定内存, 使用内存中的数据
  // 指定背景颜色: 一次指定, 一直存在
  // 色值: rgba
  gl.clearColor(1.0, 0.0, 0.0, 0.5);
  // opengl 中对应的api 
  // glClearColor

  // 使用指定颜色擦除已绘制的内容
  // 参数: 颜色缓冲区, 特定的内存区域
  gl.clear(gl.COLOR_BUFFER_BIT);
}
