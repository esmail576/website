const vertexShaderSource = `#version 300 es
layout(location = 0) in vec4 a_position;

void main() {
  gl_Position = a_position;
}
`;

type UniformValue = number | number[] | boolean;

function createShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(
  gl: WebGL2RenderingContext,
  vertexSource: string,
  fragmentSource: string,
) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    return null;
  }

  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  return program;
}

export class ShaderMount {
  private canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram | null = null;
  private uniformLocations: Record<string, WebGLUniformLocation | null> = {};
  private rafId: number | null = null;
  private lastFrameTime = 0;
  private totalAnimationTime = 0;
  private speed = 1;
  private providedUniforms: Record<string, UniformValue>;
  private hasBeenDisposed = false;
  private resolutionChanged = true;
  private resizeObserver: ResizeObserver | null = null;

  constructor(
    canvas: HTMLCanvasElement,
    private fragmentShader: string,
    uniforms: Record<string, UniformValue> = {},
    speed = 1,
    seed = 0,
  ) {
    this.canvas = canvas;
    this.providedUniforms = uniforms;
    this.totalAnimationTime = seed;

    const gl = canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: true });
    if (!gl) {
      throw new Error("WebGL2 is not supported");
    }
    this.gl = gl;

    this.initWebGL();
    this.setupResizeObserver();
    this.setSpeed(speed);
  }

  private initWebGL() {
    const program = createProgram(this.gl, vertexShaderSource, this.fragmentShader);
    if (!program) return;

    this.program = program;
    this.setupPositionAttribute();
    this.setupUniforms();
  }

  private setupPositionAttribute() {
    if (!this.program) return;

    const positionAttributeLocation = this.gl.getAttribLocation(this.program, "a_position");
    const positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      this.gl.STATIC_DRAW,
    );
    this.gl.enableVertexAttribArray(positionAttributeLocation);
    this.gl.vertexAttribPointer(positionAttributeLocation, 2, this.gl.FLOAT, false, 0, 0);
  }

  private setupUniforms() {
    if (!this.program) return;

    this.uniformLocations = {
      u_time: this.gl.getUniformLocation(this.program, "u_time"),
      u_pixelRatio: this.gl.getUniformLocation(this.program, "u_pixelRatio"),
      u_resolution: this.gl.getUniformLocation(this.program, "u_resolution"),
      ...Object.fromEntries(
        Object.keys(this.providedUniforms).map((key) => [
          key,
          this.gl.getUniformLocation(this.program!, key),
        ]),
      ),
    };
  }

  private setupResizeObserver() {
    this.resizeObserver = new ResizeObserver(() => this.handleResize());
    this.resizeObserver.observe(this.canvas);
    this.handleResize();
  }

  private handleResize() {
    const pixelRatio = window.devicePixelRatio;
    const newWidth = Math.max(1, Math.floor(this.canvas.clientWidth * pixelRatio));
    const newHeight = Math.max(1, Math.floor(this.canvas.clientHeight * pixelRatio));

    if (this.canvas.width !== newWidth || this.canvas.height !== newHeight) {
      this.canvas.width = newWidth;
      this.canvas.height = newHeight;
      this.resolutionChanged = true;
      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
      this.render(performance.now());
    }
  }

  private render = (currentTime: number) => {
    if (this.hasBeenDisposed || !this.program) return;

    const dt = currentTime - this.lastFrameTime;
    this.lastFrameTime = currentTime;

    if (this.speed !== 0) {
      this.totalAnimationTime += dt * this.speed;
    }

    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.useProgram(this.program);

    const timeLocation = this.uniformLocations.u_time;
    if (timeLocation) {
      this.gl.uniform1f(timeLocation, this.totalAnimationTime * 0.001);
    }

    if (this.resolutionChanged) {
      const resolutionLocation = this.uniformLocations.u_resolution;
      const pixelRatioLocation = this.uniformLocations.u_pixelRatio;
      if (resolutionLocation) {
        this.gl.uniform2f(resolutionLocation, this.canvas.width, this.canvas.height);
      }
      if (pixelRatioLocation) {
        this.gl.uniform1f(pixelRatioLocation, window.devicePixelRatio);
      }
      this.resolutionChanged = false;
    }

    this.updateProvidedUniforms();
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);

    if (this.speed !== 0) {
      this.requestRender();
    } else {
      this.rafId = null;
    }
  };

  private requestRender() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
    this.rafId = requestAnimationFrame(this.render);
  }

  private updateProvidedUniforms() {
    if (!this.program) return;

    this.gl.useProgram(this.program);

    Object.entries(this.providedUniforms).forEach(([key, value]) => {
      const location = this.uniformLocations[key];
      if (!location) return;

      if (Array.isArray(value)) {
        switch (value.length) {
          case 2:
            this.gl.uniform2fv(location, value);
            break;
          case 3:
            this.gl.uniform3fv(location, value);
            break;
          case 4:
            this.gl.uniform4fv(location, value);
            break;
          default:
            break;
        }
      } else if (typeof value === "number") {
        this.gl.uniform1f(location, value);
      } else if (typeof value === "boolean") {
        this.gl.uniform1i(location, value ? 1 : 0);
      }
    });
  }

  setSpeed(newSpeed = 1) {
    this.speed = newSpeed;

    if (this.rafId === null && newSpeed !== 0) {
      this.lastFrameTime = performance.now();
      this.rafId = requestAnimationFrame(this.render);
    }

    if (this.rafId !== null && newSpeed === 0) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  setUniforms(newUniforms: Record<string, UniformValue>) {
    this.providedUniforms = { ...this.providedUniforms, ...newUniforms };
    this.updateProvidedUniforms();
    this.render(performance.now());
  }

  dispose() {
    this.hasBeenDisposed = true;

    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    if (this.program) {
      this.gl.deleteProgram(this.program);
      this.program = null;
    }

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }

    this.uniformLocations = {};
  }
}
