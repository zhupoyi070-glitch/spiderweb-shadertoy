#define GridSize ivec2(10,7)
#define Sqrt2 1.41421
#define F00 ivec2(0,0)
#define F01 ivec2(0,1)
#define R iResolution.xy
#define PI 3.141592654
// v2:物理参数改为 uniform,由面板滑杆实时控制(默认值 = 原作常量)
uniform float K;         // 弹簧刚度(原 0.05)
uniform float Friction;  // 摩擦阻尼(原 0.03)
uniform vec2  Gravity;   // 重力(JS 传 (0,-强度),原 (0,-3))
uniform float uMouseK;   // 拉网力度(原 0.4)
#define MouseForce (iMouse.xy/R-vec2(0.7,0.5))*uMouseK
#define spiderf ivec2[] (ivec2(0,2),ivec2(9,1),ivec2(7,1),ivec2(1,2),ivec2(5,2),ivec2(4,1),ivec2(2,1),ivec2(6,2));
#define spidert ivec2[] (ivec2(0,1),ivec2(8,1),ivec2(6,2),ivec2(1,1),ivec2(5,3),ivec2(5,2),ivec2(2,0),ivec2(6,3));