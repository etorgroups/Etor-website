import { useEffect, useRef } from 'react'

// Ported from the original Stitch mockup's WebGL background: a slow flowing
// gradient field between navy / blue / cyan, animated by a single time uniform.
const VERTEX_SRC = `
attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

const FRAGMENT_SRC = `
precision highp float;
uniform float u_time;
varying vec2 v_texCoord;

void main() {
  vec2 uv = v_texCoord;

  float noise1 = sin(uv.x * 3.0 + u_time * 0.2) * 0.5 + 0.5;
  float noise2 = cos(uv.y * 2.0 - u_time * 0.3) * 0.5 + 0.5;

  vec3 color1 = vec3(0.058, 0.09, 0.164);
  vec3 color2 = vec3(0.145, 0.388, 0.921);
  vec3 color3 = vec3(0.023, 0.713, 0.831);

  vec3 finalColor = mix(color1, color2, noise1 * 0.4);
  finalColor = mix(finalColor, color3, noise2 * 0.2);

  float pattern = sin(uv.x * 10.0 + uv.y * 5.0 + u_time * 0.5);
  finalColor += pattern * 0.02;

  gl_FragColor = vec4(finalColor, 1.0);
}
`

function compileShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return shader
}

export default function ShaderBackground({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) return

    function syncSize() {
      const width = canvas.clientWidth || 1280
      const height = canvas.clientHeight || 720
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }
    }

    const resizeObserver = new ResizeObserver(syncSize)
    resizeObserver.observe(canvas)
    syncSize()

    const program = gl.createProgram()
    gl.attachShader(program, compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC))
    gl.attachShader(program, compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC))
    gl.linkProgram(program)
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

    const positionLoc = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(positionLoc)
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0)

    const timeLoc = gl.getUniformLocation(program, 'u_time')

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let frameId
    function render(time) {
      gl.viewport(0, 0, canvas.width, canvas.height)
      if (timeLoc) gl.uniform1f(timeLoc, time * 0.001)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      if (!prefersReducedMotion) frameId = requestAnimationFrame(render)
    }
    frameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      gl.deleteProgram(program)
      gl.deleteBuffer(buffer)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
