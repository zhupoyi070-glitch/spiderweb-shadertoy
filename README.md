# SpiderWeb — Shadertoy 4fc3zf 本地复现

原作者:**middle**
原作地址:https://www.shadertoy.com/view/4fc3zf
授权:Shadertoy 默认 **CC BY-NC-SA 3.0**(以原作者页面标注为准),本目录仅用于本地学习/研究。

一只白蜘蛛挂在物理模拟的蛛网上。蛛网是真正的**布料物理**:10×7 节点网格做
Verlet 积分,胡克定律弹簧约束,带重力、摩擦、回弹;蜘蛛的 8 只脚被弹簧拉向身体质心。
**按住鼠标拖动可以拉扯蛛网和蜘蛛**。全部由 GPU 着色器实时计算,无外部资源。

## 怎么运行

**方式一(最简单):双击 `index.html`** —— 着色器已内嵌,单文件运行,无需服务器。

**方式二:** 双击 `start.bat`(或 `python -m http.server 8767` 后打开 http://localhost:8767/)。

## 操作

- **按住鼠标拖动:拉扯蛛网**(原作交互,基于 Shadertoy 的 iMouse 点击语义)
- 空格:暂停 / 继续
- R 或「重置」:重置物理模拟
- P:参数面板开关

## 参数面板

- **模拟步速(步/帧)**:物理子步数,调大可让物理更细腻/时间更快。
- **渲染精度**:降低可提速(会重置模拟)。
- **浮点缓冲**:Verlet 积分需要精确的"上一帧位置"来算速度,8 位缓冲会量化毁掉物理,
  因此默认 RGBA16F(需 `EXT_color_buffer_float`,自动请求)。勾掉可观察退化。

## 技术说明

- 三个 pass:**Buffer A**(Verlet 物理,自反馈 ping-pong)+ **Image**(画蛛网线段与蜘蛛)+
  **Common**(共享宏:网格尺寸、弹簧系数 K、摩擦、重力、蛛脚位置表)。
  本运行页已支持 Common 注入(拼接到每个 pass 前面)。
- 节点状态存于 Buffer A 纹理:xy = 当前位置,zw = 上一帧位置(Verlet 求速度用),
  因此**必须浮点缓冲**。
- 稳健性修复(不影响视觉):
  - `HukeLaw` 中 `length(AB)` 加下限,防止两节点重合时 0/0=NaN 污染整个状态纹理;
  - 位置 `clamp(±5)`,防止激振后发散;
  - 运行页对 `iTimeDelta` 钳制 50ms 上限,防止标签页节流后首帧大 dt 引爆重力项。
- 物理量级:节点间距 `R1=0.02`,弹簧 `K=0.05`,摩擦 0.03,重力 `(0,-3)`。

## 文件清单

- `index.html` —— 单文件运行版(双击即玩)
- `index.template.html` —— 运行时模板(不含着色器源码)
- `shaders/image.frag` / `shaders/bufferA.frag` / `shaders/common.frag` —— 原作源码
- `_shader.json` —— Shadertoy 官方接口原始数据留档
- `build.py` —— 重建脚本:`python build.py`
- `start.bat` —— 可选的本地服务启动脚本

## 修改记录

- **v1**(2026-09-17):数据提取 + 支持 Common 注入的 ping-pong 运行页;
  浮点缓冲与三项稳健性修复(NaN 防护、位置钳制、dt 钳制)。
