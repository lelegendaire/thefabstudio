export const vertexShader = `
  varying vec2 vUv;

  attribute float aIndex;
  attribute vec4 aTextureCoords;

  uniform float uPageThickness;
  uniform float uPageWidth;
  uniform float uPageHeight;
  uniform float uMeshCount;
  uniform float uTime;
  uniform float uProgress;
  uniform float uSplitProgress;
  uniform float uPageSpacing;
  uniform float uScrollY;
  uniform float uSpeedY;

  varying vec4 vTextureCoords;
  varying float vIndex;
  varying float vRotationProgress;

  mat3 getYrotationMatrix(float angle) {
    return mat3(
      cos(angle), 0.0, sin(angle),
      0.0, 1.0, 0.0,
      -sin(angle), 0.0, cos(angle)
    );
  }
  mat3 getXrotationMatrix(float angle) {
    return mat3(
      1.0, 0.0, 0.0,
      0.0, cos(angle), -sin(angle),
      0.0, sin(angle), cos(angle)
    );
  }
  float remap(float value, float originMin, float originMax) {
    return clamp((value - originMin) / (originMax - originMin), 0., 1.);
  }

  void main() {
    float PI = 3.14159265359;

    vec3 rotationCenter = vec3(-uPageWidth * 0.5, 0.0, 0.0);
    vec3 translatedPosition = position - rotationCenter;

    float rotationAcclerationProgress = remap(uProgress, 0., 0.3);
    float delayBeforeStart = aIndex / uMeshCount;
    float localRotAccelerationProgress = clamp(rotationAcclerationProgress - delayBeforeStart, 0.0, 1.0);

    float yAngle = -(position.x * 0.2 * smoothstep(0., 0.3, rotationAcclerationProgress)
      - rotationAcclerationProgress * 2. * PI
      - localRotAccelerationProgress * 2. * PI);

    float fullSpeedRotationAngle = remap(uProgress, 0.3, 0.7);
    yAngle += fullSpeedRotationAngle * 4.2 * PI;

    float stackingAngle = remap(uProgress, 0.7, 1.);
    yAngle += position.x * 0.2 * stackingAngle
      + (1. - localRotAccelerationProgress) * 2. * PI * stackingAngle
      + PI * 1.7 * stackingAngle;

    float pageCrumple = (aIndex - (uMeshCount - 1.) * 0.5)
      * smoothstep(0.8, 1., stackingAngle)
      * ((uPageWidth - translatedPosition.x - 1.) * 0.01);
    translatedPosition.z += pageCrumple * (1. - uSplitProgress);

    float pageCrumpleAngle = (aIndex - (uMeshCount - 1.) * 0.5)
      * smoothstep(0.8, 1., stackingAngle)
      * ((-pow(translatedPosition.x, 2.)) * 0.002);
    yAngle += pageCrumpleAngle;

    float stackingPages = (uMeshCount - aIndex) * uPageThickness * smoothstep(0.8, 1., stackingAngle);
    translatedPosition.z += stackingPages * (1. - uSplitProgress);

    yAngle -= pageCrumpleAngle * uSplitProgress;
    yAngle -= uSplitProgress * PI * 0.4;
    translatedPosition.z += uSplitProgress * uPageSpacing * (-(aIndex - (uMeshCount - 1.) * 0.5));

    // ── Scroll / Z wrapping — wave supprimée ──────────────────────────────────
    float boxCenterZ = uPageSpacing * (-(aIndex - (uMeshCount - 1.) * 0.5));
    float maxZ = uMeshCount * (uPageSpacing + uPageThickness) * 0.5;
    float centerZProgress = boxCenterZ - uScrollY;
    float wrappedCenterZ = mod(centerZProgress + maxZ, 2.0 * maxZ) - maxZ;
    // (getXwave * uSpeedY supprimé ici)
    float zOffset = wrappedCenterZ - boxCenterZ;
    translatedPosition.z += zOffset;

    vec3 rotatedPosition = getYrotationMatrix(yAngle) * translatedPosition;
    rotatedPosition.z -= uSplitProgress;

    float initialRotationProgress = remap(uProgress, 0., 0.15);
    rotatedPosition += rotationCenter;
    rotatedPosition.x += initialRotationProgress * uPageWidth * 0.5;

    float xAngle = -PI * 0.2 * initialRotationProgress;
    xAngle += uSplitProgress * PI * 0.2;

    vec3 newPosition = getXrotationMatrix(xAngle) * rotatedPosition;

    vec4 modelPosition = modelMatrix * instanceMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;

    vUv = uv;
    vTextureCoords = aTextureCoords;
    vIndex = aIndex;
    vRotationProgress = localRotAccelerationProgress;
  }
`;

// ─── FRAGMENT SHADER ───────────────────────────────────────────────────────────
export const fragmentShader = `
  varying vec2 vUv;
  varying vec4 vTextureCoords;
  uniform sampler2D uAtlas;
  varying float vIndex;
  varying float vRotationProgress;

  void main() {
    if (vRotationProgress == 0. && vIndex != 0.) discard;

    vec2 atlasUV = vec2(
      mix(vTextureCoords.x, vTextureCoords.y, vUv.x),
      mix(vTextureCoords.z, vTextureCoords.w, 1. - vUv.y)
    );
    gl_FragColor = texture2D(uAtlas, atlasUV);
  }
`;
