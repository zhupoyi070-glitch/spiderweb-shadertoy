#define GridSize ivec2(10,7)
#define Sqrt2 1.41421
#define F00 ivec2(0,0)
#define F01 ivec2(0,1)
#define R iResolution.xy
#define PI 3.141592654
#define K 0.05
#define Friction 0.03
#define Gravity vec2(0.,-3.)
#define spiderf ivec2[] (ivec2(0,2),ivec2(9,1),ivec2(7,1),ivec2(1,2),ivec2(5,2),ivec2(4,1),ivec2(2,1),ivec2(6,2));
#define spidert ivec2[] (ivec2(0,1),ivec2(8,1),ivec2(6,2),ivec2(1,1),ivec2(5,3),ivec2(5,2),ivec2(2,0),ivec2(6,3));
#define MouseForce (iMouse.xy/R-vec2(0.7,0.5))*0.4