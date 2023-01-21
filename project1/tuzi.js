const vert = `#version 300 es
  in vec4 a_position;
  void main () {
    gl_Position = a_position;
  }
`;

const fragPrefix = `#version 300 es
  precision mediump float;

  uniform float iTime;
  uniform vec2 iResolution;
  out vec4 fragColor;
`

const fragTail = `
  void main () {
    mainImage(fragColor, gl_FragCoord.xy);
  }
`
const frag = fragPrefix + `
#define PARTICLE_NUMS 50.0
#define EXPLOSION_NUMS 5.0


vec2 Hash12(float f) {
    float a = fract(sin(f * 3456.12) * 7529.12);
    float b = fract(sin(a + f * 123.789) * 2346.67);
    return vec2(a, b);
}

vec2 Hash12Polar(float f) {
    float rad = fract(sin(f * 3456.12) * 7529.12) * 3.1415926 * 2.0;
    float r = fract(sin((rad + f) * 714.57) * 567.234);

    float x = cos(rad);
    float y = sin(rad);
    return vec2(x, y) * r;

}



float Explosion(vec2 uv, float t) {
    float spark = 0.0;
    vec2 points[69];
    points[0] = vec2(-0.109375, 0.13828125000000002);
    points[1] = vec2(-0.11666666666666664, 0.19765624999999998);
    points[2] = vec2(-0.12395833333333334, 0.24765625000000002);
    points[3] = vec2(-0.12395833333333334, 0.30078125);
    points[4] = vec2(-0.11562499999999998, 0.35234374999999996);
    points[5] = vec2(-0.10312500000000002, 0.40234375);
    points[6] = vec2(-0.08229166666666665, 0.43671875000000004);
    points[7] = vec2(-0.052083333333333315, 0.44765625);
    points[8] = vec2(-0.02395833333333336, 0.42578125);
    points[9] = vec2(-0.016666666666666663, 0.38203125000000004);
    points[10] = vec2(-0.00833333333333336, 0.32734375000000004);
    points[11] = vec2(-0.00833333333333336, 0.27109375);
    points[12] = vec2(-0.010416666666666685, 0.22734374999999996);
    points[13] = vec2(-0.013541666666666674, 0.16953125000000002);
    points[14] = vec2(0.008333333333333304, 0.16484374999999996);
    points[15] = vec2(0.009375000000000022, 0.21015625000000004);
    points[16] = vec2(0.012499999999999956, 0.26328125);
    points[17] = vec2(0.018750000000000044, 0.31171875000000004);
    points[18] = vec2(0.028124999999999956, 0.36015624999999996);
    points[19] = vec2(0.03749999999999998, 0.39296875);
    points[20] = vec2(0.055208333333333304, 0.42734375);
    points[21] = vec2(0.08229166666666665, 0.44453125000000004);
    points[22] = vec2(0.10729166666666667, 0.43515625);
    points[23] = vec2(0.125, 0.38828125);
    points[24] = vec2(0.13124999999999998, 0.33359375);
    points[25] = vec2(0.13020833333333337, 0.28046875000000004);
    points[26] = vec2(0.12395833333333328, 0.23671874999999998);
    points[27] = vec2(0.1177083333333333, 0.19609374999999996);
    points[28] = vec2(0.10520833333333335, 0.15546875000000004);
    points[29] = vec2(0.11979166666666663, 0.13359374999999996);
    points[30] = vec2(0.1479166666666667, 0.10234374999999996);
    points[31] = vec2(0.16562500000000002, 0.06640625);
    points[32] = vec2(0.17604166666666665, 0.024218749999999956);
    points[33] = vec2(0.18437499999999996, -0.025781249999999978);
    points[34] = vec2(0.18541666666666667, -0.07265624999999998);
    points[35] = vec2(0.17395833333333333, -0.11953124999999998);
    points[36] = vec2(0.14166666666666672, -0.20703125);
    points[37] = vec2(0.11145833333333333, -0.23203125000000002);
    points[38] = vec2(0.08125000000000004, -0.25390625);
    points[39] = vec2(0.048958333333333326, -0.26328125);
    points[40] = vec2(0.007291666666666696, -0.26640625);
    points[41] = vec2(-0.04583333333333334, -0.26171875);
    points[42] = vec2(-0.08437499999999998, -0.24921875);
    points[43] = vec2(-0.11249999999999999, -0.23203125000000002);
    points[44] = vec2(-0.13854166666666667, -0.20390625);
    points[45] = vec2(-0.16249999999999998, -0.16015625);
    points[46] = vec2(-0.17708333333333331, -0.11328125);
    points[47] = vec2(-0.18333333333333335, -0.05390624999999999);
    points[48] = vec2(-0.17812499999999998, 0.00390625);
    points[49] = vec2(-0.16666666666666669, 0.04921874999999998);
    points[50] = vec2(-0.14895833333333336, 0.08671874999999996);
    points[51] = vec2(-0.12708333333333333, 0.11640625000000004);
    points[52] = vec2(-0.08750000000000002, -0.07265624999999998);
    points[53] = vec2(-0.09791666666666665, -0.08984375);
    points[54] = vec2(-0.08854166666666669, -0.11015625000000001);
    points[55] = vec2(-0.078125, -0.09609374999999998);
    points[56] = vec2(0.08750000000000002, -0.09453125000000001);
    points[57] = vec2(0.09375, -0.07890625000000001);
    points[58] = vec2(0.10312500000000002, -0.09609374999999998);
    points[59] = vec2(0.09583333333333333, -0.11171874999999998);
    points[60] = vec2(-0.020833333333333315, -0.18671875);
    points[61] = vec2(-0.00833333333333336, -0.19609375);
    points[62] = vec2(0.0010416666666667185, -0.20546874999999998);
    points[63] = vec2(0.013541666666666674, -0.21953125);
    points[64] = vec2(0.019791666666666652, -0.18671875);
    points[65] = vec2(0.01041666666666663, -0.19453125);
    points[66] = vec2(-0.011458333333333348, -0.20703125);
    points[67] = vec2(-0.027083333333333348, -0.21640625000000002);
    points[68] = vec2(0.15937500000000004, -0.1679687);
    for(int i = 0; i < 69; i++) {
        points[i].y /= (960. / 640.);
        vec2 dir = points[i] * 0.8;
        float d = length(uv - dir * t);
        float fi = float(i);
        float brightness = mix(0.001, 0.005, smoothstep(0.05, 0.0, t));
        brightness *= (sin(t * 20. + fi * 68.)) * 0.5 + .5;
        brightness *= smoothstep(1.0, 0.75, t);
        spark += brightness / d;

    }
    return spark;
}
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord.xy - .5 * iResolution.xy) / iResolution.y;
    vec3 col = vec3(0.0);

    
    for (float i = 0.0; i < EXPLOSION_NUMS; i++) {
        float t = iTime * 0.7 + 30.0 + i / EXPLOSION_NUMS;
        float ft = floor(t);
        vec2 offs = Hash12(i + 1.0 + ft * 0.1) - 0.5;
        vec3 color = sin(i + ft * vec3(.34, .56, .45)) * 0.25 + 0.75;
        col += Explosion(uv - offs, fract(t)) * color;
    }
    
    fragColor = vec4(col, 1.0);
}
` + fragTail;
/**
 * @param gl {WebGLRenderingContext}
 * @param vert {string}
 * @param frag {string}
 */
function initWebGL(gl, vert, frag) {
    const vertShader = gl.createShader(gl.VERTEX_SHADER);
    const fragShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertShader, vert);
    gl.shaderSource(fragShader, frag);
    gl.compileShader(vertShader);
    let sucecess = gl.getShaderParameter(vertShader, gl.COMPILE_STATUS);
    if (!sucecess) {
        console.error(gl.getShaderInfoLog(vertShader));
        gl.deleteShader(vertShader);
        return;
    }

    gl.compileShader(fragShader);
    sucecess = gl.getShaderParameter(fragShader, gl.COMPILE_STATUS);
    if (!sucecess) {
        console.error(gl.getShaderInfoLog(fragShader));
        gl.deleteShader(fragShader);
        return;
    }

    const program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    sucecess = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!sucecess) {
        console.error(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return;
    }
    return program;
}


const canvas = document.getElementById('canvas');
/**
 * @type WebGLRenderingContext
 */
const gl = canvas.getContext('webgl2');

const program = initWebGL(gl, vert, frag);

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

const buffer = gl.createBuffer();
const indicesBuffer = gl.createBuffer();
const vertices = new Float32Array(
    [-1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0]
);

const indices = new Uint16Array(
    [0, 1, 2, 2, 3, 0]
);

gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

gl.useProgram(program);
const a_position = gl.getAttribLocation(program, 'a_position');
gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
gl.enableVertexAttribArray(a_position);

const iTime = gl.getUniformLocation(program, 'iTime');
const iResolution = gl.getUniformLocation(program, 'iResolution');
let time = 0;
function mainLoop(t) {
    if (t === void 0) {
        time += 0.01;
    } else {
        time = t * 0.001;

    }
    gl.uniform1f(iTime, time);
    gl.uniform2f(iResolution, canvas.width, canvas.height);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

    requestAnimationFrame(mainLoop);

}

mainLoop(0);


