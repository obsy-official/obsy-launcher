var D$ = { LEFT: 0, MIDDLE: 1, RIGHT: 2, ROTATE: 0, DOLLY: 1, PAN: 2 },
  O$ = { ROTATE: 0, PAN: 1, DOLLY_PAN: 2, DOLLY_ROTATE: 3 };
var h8 = 0;
var n5 = 2;
var N7 = 0;
var F7 = 303;
var u6 = 1003;
var R7 = 1015,
  D7 = 1016;
class J$ {
  addEventListener($, J) {
    if (this._listeners === void 0) this._listeners = {};
    let Z = this._listeners;
    if (Z[$] === void 0) Z[$] = [];
    if (Z[$].indexOf(J) === -1) Z[$].push(J);
  }
  hasEventListener($, J) {
    if (this._listeners === void 0) return !1;
    let Z = this._listeners;
    return Z[$] !== void 0 && Z[$].indexOf(J) !== -1;
  }
  removeEventListener($, J) {
    if (this._listeners === void 0) return;
    let Q = this._listeners[$];
    if (Q !== void 0) {
      let W = Q.indexOf(J);
      if (W !== -1) Q.splice(W, 1);
    }
  }
  dispatchEvent($) {
    if (this._listeners === void 0) return;
    let Z = this._listeners[$.type];
    if (Z !== void 0) {
      $.target = this;
      let Q = Z.slice(0);
      for (let W = 0, Y = Q.length; W < Y; W++) Q[W].call(this, $);
      $.target = null;
    }
  }
}
var V6 = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "0a",
    "0b",
    "0c",
    "0d",
    "0e",
    "0f",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "1a",
    "1b",
    "1c",
    "1d",
    "1e",
    "1f",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "2a",
    "2b",
    "2c",
    "2d",
    "2e",
    "2f",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "3a",
    "3b",
    "3c",
    "3d",
    "3e",
    "3f",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "4a",
    "4b",
    "4c",
    "4d",
    "4e",
    "4f",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
    "5a",
    "5b",
    "5c",
    "5d",
    "5e",
    "5f",
    "60",
    "61",
    "62",
    "63",
    "64",
    "65",
    "66",
    "67",
    "68",
    "69",
    "6a",
    "6b",
    "6c",
    "6d",
    "6e",
    "6f",
    "70",
    "71",
    "72",
    "73",
    "74",
    "75",
    "76",
    "77",
    "78",
    "79",
    "7a",
    "7b",
    "7c",
    "7d",
    "7e",
    "7f",
    "80",
    "81",
    "82",
    "83",
    "84",
    "85",
    "86",
    "87",
    "88",
    "89",
    "8a",
    "8b",
    "8c",
    "8d",
    "8e",
    "8f",
    "90",
    "91",
    "92",
    "93",
    "94",
    "95",
    "96",
    "97",
    "98",
    "99",
    "9a",
    "9b",
    "9c",
    "9d",
    "9e",
    "9f",
    "a0",
    "a1",
    "a2",
    "a3",
    "a4",
    "a5",
    "a6",
    "a7",
    "a8",
    "a9",
    "aa",
    "ab",
    "ac",
    "ad",
    "ae",
    "af",
    "b0",
    "b1",
    "b2",
    "b3",
    "b4",
    "b5",
    "b6",
    "b7",
    "b8",
    "b9",
    "ba",
    "bb",
    "bc",
    "bd",
    "be",
    "bf",
    "c0",
    "c1",
    "c2",
    "c3",
    "c4",
    "c5",
    "c6",
    "c7",
    "c8",
    "c9",
    "ca",
    "cb",
    "cc",
    "cd",
    "ce",
    "cf",
    "d0",
    "d1",
    "d2",
    "d3",
    "d4",
    "d5",
    "d6",
    "d7",
    "d8",
    "d9",
    "da",
    "db",
    "dc",
    "dd",
    "de",
    "df",
    "e0",
    "e1",
    "e2",
    "e3",
    "e4",
    "e5",
    "e6",
    "e7",
    "e8",
    "e9",
    "ea",
    "eb",
    "ec",
    "ed",
    "ee",
    "ef",
    "f0",
    "f1",
    "f2",
    "f3",
    "f4",
    "f5",
    "f6",
    "f7",
    "f8",
    "f9",
    "fa",
    "fb",
    "fc",
    "fd",
    "fe",
    "ff",
  ],
  wJ = 1234567,
  X5 = Math.PI / 180,
  G5 = 180 / Math.PI;
function $$() {
  let $ = (Math.random() * 4294967295) | 0,
    J = (Math.random() * 4294967295) | 0,
    Z = (Math.random() * 4294967295) | 0,
    Q = (Math.random() * 4294967295) | 0;
  return (
    V6[$ & 255] +
    V6[($ >> 8) & 255] +
    V6[($ >> 16) & 255] +
    V6[($ >> 24) & 255] +
    "-" +
    V6[J & 255] +
    V6[(J >> 8) & 255] +
    "-" +
    V6[((J >> 16) & 15) | 64] +
    V6[(J >> 24) & 255] +
    "-" +
    V6[(Z & 63) | 128] +
    V6[(Z >> 8) & 255] +
    "-" +
    V6[(Z >> 16) & 255] +
    V6[(Z >> 24) & 255] +
    V6[Q & 255] +
    V6[(Q >> 8) & 255] +
    V6[(Q >> 16) & 255] +
    V6[(Q >> 24) & 255]
  ).toLowerCase();
}
function F6($, J, Z) {
  return Math.max(J, Math.min(Z, $));
}
function g8($, J) {
  return (($ % J) + J) % J;
}
function M9($, J, Z, Q, W) {
  return Q + (($ - J) * (W - Q)) / (Z - J);
}
function k9($, J, Z) {
  if ($ !== J) return (Z - $) / (J - $);
  else return 0;
}
function K5($, J, Z) {
  return (1 - Z) * $ + Z * J;
}
function B9($, J, Z, Q) {
  return K5($, J, 1 - Math.exp(-Z * Q));
}
function w9($, J = 1) {
  return J - Math.abs(g8($, J * 2) - J);
}
function L9($, J, Z) {
  if ($ <= J) return 0;
  if ($ >= Z) return 1;
  return (($ = ($ - J) / (Z - J)), $ * $ * (3 - 2 * $));
}
function A9($, J, Z) {
  if ($ <= J) return 0;
  if ($ >= Z) return 1;
  return (($ = ($ - J) / (Z - J)), $ * $ * $ * ($ * ($ * 6 - 15) + 10));
}
function P9($, J) {
  return $ + Math.floor(Math.random() * (J - $ + 1));
}
function T9($, J) {
  return $ + Math.random() * (J - $);
}
function S9($) {
  return $ * (0.5 - Math.random());
}
function f9($) {
  if ($ !== void 0) wJ = $;
  let J = (wJ += 1831565813);
  return (
    (J = Math.imul(J ^ (J >>> 15), J | 1)),
    (J ^= J + Math.imul(J ^ (J >>> 7), J | 61)),
    ((J ^ (J >>> 14)) >>> 0) / 4294967296
  );
}
function b9($) {
  return $ * X5;
}
function j9($) {
  return $ * G5;
}
function y8($) {
  return ($ & ($ - 1)) === 0 && $ !== 0;
}
function y9($) {
  return Math.pow(2, Math.ceil(Math.log($) / Math.LN2));
}
function l5($) {
  return Math.pow(2, Math.floor(Math.log($) / Math.LN2));
}
function x9($, J, Z, Q, W) {
  let { cos: Y, sin: K } = Math,
    X = Y(Z / 2),
    H = K(Z / 2),
    q = Y((J + Q) / 2),
    U = K((J + Q) / 2),
    G = Y((J - Q) / 2),
    E = K((J - Q) / 2),
    F = Y((Q - J) / 2),
    O = K((Q - J) / 2);
  switch (W) {
    case "XYX":
      $.set(X * U, H * G, H * E, X * q);
      break;
    case "YZY":
      $.set(H * E, X * U, H * G, X * q);
      break;
    case "ZXZ":
      $.set(H * G, H * E, X * U, X * q);
      break;
    case "XZX":
      $.set(X * U, H * O, H * F, X * q);
      break;
    case "YXY":
      $.set(H * F, X * U, H * O, X * q);
      break;
    case "ZYZ":
      $.set(H * O, H * F, X * U, X * q);
      break;
    default:
      console.warn(
        "THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " +
          W,
      );
  }
}
function p6($, J) {
  switch (J.constructor) {
    case Float32Array:
      return $;
    case Uint32Array:
      return $ / 4294967295;
    case Uint16Array:
      return $ / 65535;
    case Uint8Array:
      return $ / 255;
    case Int32Array:
      return Math.max($ / 2147483647, -1);
    case Int16Array:
      return Math.max($ / 32767, -1);
    case Int8Array:
      return Math.max($ / 127, -1);
    default:
      throw Error("Invalid component type.");
  }
}
function l0($, J) {
  switch (J.constructor) {
    case Float32Array:
      return $;
    case Uint32Array:
      return Math.round($ * 4294967295);
    case Uint16Array:
      return Math.round($ * 65535);
    case Uint8Array:
      return Math.round($ * 255);
    case Int32Array:
      return Math.round($ * 2147483647);
    case Int16Array:
      return Math.round($ * 32767);
    case Int8Array:
      return Math.round($ * 127);
    default:
      throw Error("Invalid component type.");
  }
}
var O7 = {
  DEG2RAD: X5,
  RAD2DEG: G5,
  generateUUID: $$,
  clamp: F6,
  euclideanModulo: g8,
  mapLinear: M9,
  inverseLerp: k9,
  lerp: K5,
  damp: B9,
  pingpong: w9,
  smoothstep: L9,
  smootherstep: A9,
  randInt: P9,
  randFloat: T9,
  randFloatSpread: S9,
  seededRandom: f9,
  degToRad: b9,
  radToDeg: j9,
  isPowerOfTwo: y8,
  ceilPowerOfTwo: y9,
  floorPowerOfTwo: l5,
  setQuaternionFromProperEuler: x9,
  normalize: l0,
  denormalize: p6,
};
class R0 {
  constructor($ = 0, J = 0) {
    ((R0.prototype.isVector2 = !0), (this.x = $), (this.y = J));
  }
  get width() {
    return this.x;
  }
  set width($) {
    this.x = $;
  }
  get height() {
    return this.y;
  }
  set height($) {
    this.y = $;
  }
  set($, J) {
    return ((this.x = $), (this.y = J), this);
  }
  setScalar($) {
    return ((this.x = $), (this.y = $), this);
  }
  setX($) {
    return ((this.x = $), this);
  }
  setY($) {
    return ((this.y = $), this);
  }
  setComponent($, J) {
    switch ($) {
      case 0:
        this.x = J;
        break;
      case 1:
        this.y = J;
        break;
      default:
        throw Error("index is out of range: " + $);
    }
    return this;
  }
  getComponent($) {
    switch ($) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw Error("index is out of range: " + $);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy($) {
    return ((this.x = $.x), (this.y = $.y), this);
  }
  add($) {
    return ((this.x += $.x), (this.y += $.y), this);
  }
  addScalar($) {
    return ((this.x += $), (this.y += $), this);
  }
  addVectors($, J) {
    return ((this.x = $.x + J.x), (this.y = $.y + J.y), this);
  }
  addScaledVector($, J) {
    return ((this.x += $.x * J), (this.y += $.y * J), this);
  }
  sub($) {
    return ((this.x -= $.x), (this.y -= $.y), this);
  }
  subScalar($) {
    return ((this.x -= $), (this.y -= $), this);
  }
  subVectors($, J) {
    return ((this.x = $.x - J.x), (this.y = $.y - J.y), this);
  }
  multiply($) {
    return ((this.x *= $.x), (this.y *= $.y), this);
  }
  multiplyScalar($) {
    return ((this.x *= $), (this.y *= $), this);
  }
  divide($) {
    return ((this.x /= $.x), (this.y /= $.y), this);
  }
  divideScalar($) {
    return this.multiplyScalar(1 / $);
  }
  applyMatrix3($) {
    let J = this.x,
      Z = this.y,
      Q = $.elements;
    return (
      (this.x = Q[0] * J + Q[3] * Z + Q[6]),
      (this.y = Q[1] * J + Q[4] * Z + Q[7]),
      this
    );
  }
  min($) {
    return (
      (this.x = Math.min(this.x, $.x)),
      (this.y = Math.min(this.y, $.y)),
      this
    );
  }
  max($) {
    return (
      (this.x = Math.max(this.x, $.x)),
      (this.y = Math.max(this.y, $.y)),
      this
    );
  }
  clamp($, J) {
    return (
      (this.x = Math.max($.x, Math.min(J.x, this.x))),
      (this.y = Math.max($.y, Math.min(J.y, this.y))),
      this
    );
  }
  clampScalar($, J) {
    return (
      (this.x = Math.max($, Math.min(J, this.x))),
      (this.y = Math.max($, Math.min(J, this.y))),
      this
    );
  }
  clampLength($, J) {
    let Z = this.length();
    return this.divideScalar(Z || 1).multiplyScalar(
      Math.max($, Math.min(J, Z)),
    );
  }
  floor() {
    return ((this.x = Math.floor(this.x)), (this.y = Math.floor(this.y)), this);
  }
  ceil() {
    return ((this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), this);
  }
  round() {
    return ((this.x = Math.round(this.x)), (this.y = Math.round(this.y)), this);
  }
  roundToZero() {
    return ((this.x = Math.trunc(this.x)), (this.y = Math.trunc(this.y)), this);
  }
  negate() {
    return ((this.x = -this.x), (this.y = -this.y), this);
  }
  dot($) {
    return this.x * $.x + this.y * $.y;
  }
  cross($) {
    return this.x * $.y - this.y * $.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo($) {
    let J = Math.sqrt(this.lengthSq() * $.lengthSq());
    if (J === 0) return Math.PI / 2;
    let Z = this.dot($) / J;
    return Math.acos(F6(Z, -1, 1));
  }
  distanceTo($) {
    return Math.sqrt(this.distanceToSquared($));
  }
  distanceToSquared($) {
    let J = this.x - $.x,
      Z = this.y - $.y;
    return J * J + Z * Z;
  }
  manhattanDistanceTo($) {
    return Math.abs(this.x - $.x) + Math.abs(this.y - $.y);
  }
  setLength($) {
    return this.normalize().multiplyScalar($);
  }
  lerp($, J) {
    return (
      (this.x += ($.x - this.x) * J),
      (this.y += ($.y - this.y) * J),
      this
    );
  }
  lerpVectors($, J, Z) {
    return (
      (this.x = $.x + (J.x - $.x) * Z),
      (this.y = $.y + (J.y - $.y) * Z),
      this
    );
  }
  equals($) {
    return $.x === this.x && $.y === this.y;
  }
  fromArray($, J = 0) {
    return ((this.x = $[J]), (this.y = $[J + 1]), this);
  }
  toArray($ = [], J = 0) {
    return (($[J] = this.x), ($[J + 1] = this.y), $);
  }
  fromBufferAttribute($, J) {
    return ((this.x = $.getX(J)), (this.y = $.getY(J)), this);
  }
  rotateAround($, J) {
    let Z = Math.cos(J),
      Q = Math.sin(J),
      W = this.x - $.x,
      Y = this.y - $.y;
    return (
      (this.x = W * Z - Y * Q + $.x),
      (this.y = W * Q + Y * Z + $.y),
      this
    );
  }
  random() {
    return ((this.x = Math.random()), (this.y = Math.random()), this);
  }
  *[Symbol.iterator]() {
    (yield this.x, yield this.y);
  }
}
class f0 {
  constructor($, J, Z, Q, W, Y, K, X, H) {
    if (
      ((f0.prototype.isMatrix3 = !0),
      (this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1]),
      $ !== void 0)
    )
      this.set($, J, Z, Q, W, Y, K, X, H);
  }
  set($, J, Z, Q, W, Y, K, X, H) {
    let q = this.elements;
    return (
      (q[0] = $),
      (q[1] = Q),
      (q[2] = K),
      (q[3] = J),
      (q[4] = W),
      (q[5] = X),
      (q[6] = Z),
      (q[7] = Y),
      (q[8] = H),
      this
    );
  }
  identity() {
    return (this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this);
  }
  copy($) {
    let J = this.elements,
      Z = $.elements;
    return (
      (J[0] = Z[0]),
      (J[1] = Z[1]),
      (J[2] = Z[2]),
      (J[3] = Z[3]),
      (J[4] = Z[4]),
      (J[5] = Z[5]),
      (J[6] = Z[6]),
      (J[7] = Z[7]),
      (J[8] = Z[8]),
      this
    );
  }
  extractBasis($, J, Z) {
    return (
      $.setFromMatrix3Column(this, 0),
      J.setFromMatrix3Column(this, 1),
      Z.setFromMatrix3Column(this, 2),
      this
    );
  }
  setFromMatrix4($) {
    let J = $.elements;
    return (
      this.set(J[0], J[4], J[8], J[1], J[5], J[9], J[2], J[6], J[10]),
      this
    );
  }
  multiply($) {
    return this.multiplyMatrices(this, $);
  }
  premultiply($) {
    return this.multiplyMatrices($, this);
  }
  multiplyMatrices($, J) {
    let Z = $.elements,
      Q = J.elements,
      W = this.elements,
      Y = Z[0],
      K = Z[3],
      X = Z[6],
      H = Z[1],
      q = Z[4],
      U = Z[7],
      G = Z[2],
      E = Z[5],
      F = Z[8],
      O = Q[0],
      _ = Q[3],
      N = Q[6],
      V = Q[1],
      k = Q[4],
      M = Q[7],
      A = Q[2],
      L = Q[5],
      C = Q[8];
    return (
      (W[0] = Y * O + K * V + X * A),
      (W[3] = Y * _ + K * k + X * L),
      (W[6] = Y * N + K * M + X * C),
      (W[1] = H * O + q * V + U * A),
      (W[4] = H * _ + q * k + U * L),
      (W[7] = H * N + q * M + U * C),
      (W[2] = G * O + E * V + F * A),
      (W[5] = G * _ + E * k + F * L),
      (W[8] = G * N + E * M + F * C),
      this
    );
  }
  multiplyScalar($) {
    let J = this.elements;
    return (
      (J[0] *= $),
      (J[3] *= $),
      (J[6] *= $),
      (J[1] *= $),
      (J[4] *= $),
      (J[7] *= $),
      (J[2] *= $),
      (J[5] *= $),
      (J[8] *= $),
      this
    );
  }
  determinant() {
    let $ = this.elements,
      J = $[0],
      Z = $[1],
      Q = $[2],
      W = $[3],
      Y = $[4],
      K = $[5],
      X = $[6],
      H = $[7],
      q = $[8];
    return (
      J * Y * q - J * K * H - Z * W * q + Z * K * X + Q * W * H - Q * Y * X
    );
  }
  invert() {
    let $ = this.elements,
      J = $[0],
      Z = $[1],
      Q = $[2],
      W = $[3],
      Y = $[4],
      K = $[5],
      X = $[6],
      H = $[7],
      q = $[8],
      U = q * Y - K * H,
      G = K * X - q * W,
      E = H * W - Y * X,
      F = J * U + Z * G + Q * E;
    if (F === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    let O = 1 / F;
    return (
      ($[0] = U * O),
      ($[1] = (Q * H - q * Z) * O),
      ($[2] = (K * Z - Q * Y) * O),
      ($[3] = G * O),
      ($[4] = (q * J - Q * X) * O),
      ($[5] = (Q * W - K * J) * O),
      ($[6] = E * O),
      ($[7] = (Z * X - H * J) * O),
      ($[8] = (Y * J - Z * W) * O),
      this
    );
  }
  transpose() {
    let $,
      J = this.elements;
    return (
      ($ = J[1]),
      (J[1] = J[3]),
      (J[3] = $),
      ($ = J[2]),
      (J[2] = J[6]),
      (J[6] = $),
      ($ = J[5]),
      (J[5] = J[7]),
      (J[7] = $),
      this
    );
  }
  getNormalMatrix($) {
    return this.setFromMatrix4($).invert().transpose();
  }
  transposeIntoArray($) {
    let J = this.elements;
    return (
      ($[0] = J[0]),
      ($[1] = J[3]),
      ($[2] = J[6]),
      ($[3] = J[1]),
      ($[4] = J[4]),
      ($[5] = J[7]),
      ($[6] = J[2]),
      ($[7] = J[5]),
      ($[8] = J[8]),
      this
    );
  }
  setUvTransform($, J, Z, Q, W, Y, K) {
    let X = Math.cos(W),
      H = Math.sin(W);
    return (
      this.set(
        Z * X,
        Z * H,
        -Z * (X * Y + H * K) + Y + $,
        -Q * H,
        Q * X,
        -Q * (-H * Y + X * K) + K + J,
        0,
        0,
        1,
      ),
      this
    );
  }
  scale($, J) {
    return (this.premultiply(E8.makeScale($, J)), this);
  }
  rotate($) {
    return (this.premultiply(E8.makeRotation(-$)), this);
  }
  translate($, J) {
    return (this.premultiply(E8.makeTranslation($, J)), this);
  }
  makeTranslation($, J) {
    if ($.isVector2) this.set(1, 0, $.x, 0, 1, $.y, 0, 0, 1);
    else this.set(1, 0, $, 0, 1, J, 0, 0, 1);
    return this;
  }
  makeRotation($) {
    let J = Math.cos($),
      Z = Math.sin($);
    return (this.set(J, -Z, 0, Z, J, 0, 0, 0, 1), this);
  }
  makeScale($, J) {
    return (this.set($, 0, 0, 0, J, 0, 0, 0, 1), this);
  }
  equals($) {
    let J = this.elements,
      Z = $.elements;
    for (let Q = 0; Q < 9; Q++) if (J[Q] !== Z[Q]) return !1;
    return !0;
  }
  fromArray($, J = 0) {
    for (let Z = 0; Z < 9; Z++) this.elements[Z] = $[Z + J];
    return this;
  }
  toArray($ = [], J = 0) {
    let Z = this.elements;
    return (
      ($[J] = Z[0]),
      ($[J + 1] = Z[1]),
      ($[J + 2] = Z[2]),
      ($[J + 3] = Z[3]),
      ($[J + 4] = Z[4]),
      ($[J + 5] = Z[5]),
      ($[J + 6] = Z[6]),
      ($[J + 7] = Z[7]),
      ($[J + 8] = Z[8]),
      $
    );
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
var E8 = new f0();
function _7($) {
  for (let J = $.length - 1; J >= 0; --J) if ($[J] >= 65535) return !0;
  return !1;
}
function d5($) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", $);
}
function v9() {
  let $ = d5("canvas");
  return (($.style.display = "block"), $);
}
var LJ = {};
function H5($) {
  if ($ in LJ) return;
  ((LJ[$] = !0), console.warn($));
}
function d$($) {
  return $ < 0.04045
    ? $ * 0.0773993808
    : Math.pow($ * 0.9478672986 + 0.0521327014, 2.4);
}
function V8($) {
  return $ < 0.0031308 ? $ * 12.92 : 1.055 * Math.pow($, 0.41666) - 0.055;
}
var h9 = new f0().fromArray([
    0.8224621, 0.0331941, 0.0170827, 0.177538, 0.9668058, 0.0723974, -0.0000001,
    0.0000001, 0.9105199,
  ]),
  g9 = new f0().fromArray([
    1.2249401, -0.0420569, -0.0196376, -0.2249404, 1.0420571, -0.0786361,
    0.0000001, 0, 1.0982735,
  ]);
function m9($) {
  return $.convertSRGBToLinear().applyMatrix3(g9);
}
function p9($) {
  return $.applyMatrix3(h9).convertLinearToSRGB();
}
var u9 = {
    ["srgb-linear"]: ($) => $,
    ["srgb"]: ($) => $.convertSRGBToLinear(),
    ["display-p3"]: m9,
  },
  l9 = {
    ["srgb-linear"]: ($) => $,
    ["srgb"]: ($) => $.convertLinearToSRGB(),
    ["display-p3"]: p9,
  },
  w6 = {
    enabled: !0,
    get legacyMode() {
      return (
        console.warn(
          "THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150.",
        ),
        !this.enabled
      );
    },
    set legacyMode($) {
      (console.warn(
        "THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150.",
      ),
        (this.enabled = !$));
    },
    get workingColorSpace() {
      return "srgb-linear";
    },
    set workingColorSpace($) {
      console.warn("THREE.ColorManagement: .workingColorSpace is readonly.");
    },
    convert: function ($, J, Z) {
      if (this.enabled === !1 || J === Z || !J || !Z) return $;
      let Q = u9[J],
        W = l9[Z];
      if (Q === void 0 || W === void 0)
        throw Error(`Unsupported color space conversion, "${J}" to "${Z}".`);
      return W(Q($));
    },
    fromWorkingColorSpace: function ($, J) {
      return this.convert($, this.workingColorSpace, J);
    },
    toWorkingColorSpace: function ($, J) {
      return this.convert($, J, this.workingColorSpace);
    },
  },
  M$;
class m8 {
  static getDataURL($) {
    if (/^data:/i.test($.src)) return $.src;
    if (typeof HTMLCanvasElement > "u") return $.src;
    let J;
    if ($ instanceof HTMLCanvasElement) J = $;
    else {
      if (M$ === void 0) M$ = d5("canvas");
      ((M$.width = $.width), (M$.height = $.height));
      let Z = M$.getContext("2d");
      if ($ instanceof ImageData) Z.putImageData($, 0, 0);
      else Z.drawImage($, 0, 0, $.width, $.height);
      J = M$;
    }
    if (J.width > 2048 || J.height > 2048)
      return (
        console.warn(
          "THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",
          $,
        ),
        J.toDataURL("image/jpeg", 0.6)
      );
    else return J.toDataURL("image/png");
  }
  static sRGBToLinear($) {
    if (
      (typeof HTMLImageElement < "u" && $ instanceof HTMLImageElement) ||
      (typeof HTMLCanvasElement < "u" && $ instanceof HTMLCanvasElement) ||
      (typeof ImageBitmap < "u" && $ instanceof ImageBitmap)
    ) {
      let J = d5("canvas");
      ((J.width = $.width), (J.height = $.height));
      let Z = J.getContext("2d");
      Z.drawImage($, 0, 0, $.width, $.height);
      let Q = Z.getImageData(0, 0, $.width, $.height),
        W = Q.data;
      for (let Y = 0; Y < W.length; Y++) W[Y] = d$(W[Y] / 255) * 255;
      return (Z.putImageData(Q, 0, 0), J);
    } else if ($.data) {
      let J = $.data.slice(0);
      for (let Z = 0; Z < J.length; Z++)
        if (J instanceof Uint8Array || J instanceof Uint8ClampedArray)
          J[Z] = Math.floor(d$(J[Z] / 255) * 255);
        else J[Z] = d$(J[Z]);
      return { data: J, width: $.width, height: $.height };
    } else
      return (
        console.warn(
          "THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.",
        ),
        $
      );
  }
}
var d9 = 0;
class p8 {
  constructor($ = null) {
    ((this.isSource = !0),
      Object.defineProperty(this, "id", { value: d9++ }),
      (this.uuid = $$()),
      (this.data = $),
      (this.version = 0));
  }
  set needsUpdate($) {
    if ($ === !0) this.version++;
  }
  toJSON($) {
    let J = $ === void 0 || typeof $ === "string";
    if (!J && $.images[this.uuid] !== void 0) return $.images[this.uuid];
    let Z = { uuid: this.uuid, url: "" },
      Q = this.data;
    if (Q !== null) {
      let W;
      if (Array.isArray(Q)) {
        W = [];
        for (let Y = 0, K = Q.length; Y < K; Y++)
          if (Q[Y].isDataTexture) W.push(N8(Q[Y].image));
          else W.push(N8(Q[Y]));
      } else W = N8(Q);
      Z.url = W;
    }
    if (!J) $.images[this.uuid] = Z;
    return Z;
  }
}
function N8($) {
  if (
    (typeof HTMLImageElement < "u" && $ instanceof HTMLImageElement) ||
    (typeof HTMLCanvasElement < "u" && $ instanceof HTMLCanvasElement) ||
    (typeof ImageBitmap < "u" && $ instanceof ImageBitmap)
  )
    return m8.getDataURL($);
  else if ($.data)
    return {
      data: Array.from($.data),
      width: $.width,
      height: $.height,
      type: $.data.constructor.name,
    };
  else return (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
var c9 = 0;
class U6 extends J$ {
  constructor(
    $ = U6.DEFAULT_IMAGE,
    J = U6.DEFAULT_MAPPING,
    Z = 1001,
    Q = 1001,
    W = 1006,
    Y = 1008,
    K = 1023,
    X = 1009,
    H = U6.DEFAULT_ANISOTROPY,
    q = "",
  ) {
    super();
    if (
      ((this.isTexture = !0),
      Object.defineProperty(this, "id", { value: c9++ }),
      (this.uuid = $$()),
      (this.name = ""),
      (this.source = new p8($)),
      (this.mipmaps = []),
      (this.mapping = J),
      (this.channel = 0),
      (this.wrapS = Z),
      (this.wrapT = Q),
      (this.magFilter = W),
      (this.minFilter = Y),
      (this.anisotropy = H),
      (this.format = K),
      (this.internalFormat = null),
      (this.type = X),
      (this.offset = new R0(0, 0)),
      (this.repeat = new R0(1, 1)),
      (this.center = new R0(0, 0)),
      (this.rotation = 0),
      (this.matrixAutoUpdate = !0),
      (this.matrix = new f0()),
      (this.generateMipmaps = !0),
      (this.premultiplyAlpha = !1),
      (this.flipY = !0),
      (this.unpackAlignment = 4),
      typeof q === "string")
    )
      this.colorSpace = q;
    else
      (H5(
        "THREE.Texture: Property .encoding has been replaced by .colorSpace.",
      ),
        (this.colorSpace = q === 3001 ? "srgb" : ""));
    ((this.userData = {}),
      (this.version = 0),
      (this.onUpdate = null),
      (this.isRenderTargetTexture = !1),
      (this.needsPMREMUpdate = !1));
  }
  get image() {
    return this.source.data;
  }
  set image($ = null) {
    this.source.data = $;
  }
  updateMatrix() {
    this.matrix.setUvTransform(
      this.offset.x,
      this.offset.y,
      this.repeat.x,
      this.repeat.y,
      this.rotation,
      this.center.x,
      this.center.y,
    );
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy($) {
    return (
      (this.name = $.name),
      (this.source = $.source),
      (this.mipmaps = $.mipmaps.slice(0)),
      (this.mapping = $.mapping),
      (this.channel = $.channel),
      (this.wrapS = $.wrapS),
      (this.wrapT = $.wrapT),
      (this.magFilter = $.magFilter),
      (this.minFilter = $.minFilter),
      (this.anisotropy = $.anisotropy),
      (this.format = $.format),
      (this.internalFormat = $.internalFormat),
      (this.type = $.type),
      this.offset.copy($.offset),
      this.repeat.copy($.repeat),
      this.center.copy($.center),
      (this.rotation = $.rotation),
      (this.matrixAutoUpdate = $.matrixAutoUpdate),
      this.matrix.copy($.matrix),
      (this.generateMipmaps = $.generateMipmaps),
      (this.premultiplyAlpha = $.premultiplyAlpha),
      (this.flipY = $.flipY),
      (this.unpackAlignment = $.unpackAlignment),
      (this.colorSpace = $.colorSpace),
      (this.userData = JSON.parse(JSON.stringify($.userData))),
      (this.needsUpdate = !0),
      this
    );
  }
  toJSON($) {
    let J = $ === void 0 || typeof $ === "string";
    if (!J && $.textures[this.uuid] !== void 0) return $.textures[this.uuid];
    let Z = {
      metadata: { version: 4.6, type: "Texture", generator: "Texture.toJSON" },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON($).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment,
    };
    if (Object.keys(this.userData).length > 0) Z.userData = this.userData;
    if (!J) $.textures[this.uuid] = Z;
    return Z;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv($) {
    if (this.mapping !== 300) return $;
    if (($.applyMatrix3(this.matrix), $.x < 0 || $.x > 1))
      switch (this.wrapS) {
        case 1000:
          $.x = $.x - Math.floor($.x);
          break;
        case 1001:
          $.x = $.x < 0 ? 0 : 1;
          break;
        case 1002:
          if (Math.abs(Math.floor($.x) % 2) === 1) $.x = Math.ceil($.x) - $.x;
          else $.x = $.x - Math.floor($.x);
          break;
      }
    if ($.y < 0 || $.y > 1)
      switch (this.wrapT) {
        case 1000:
          $.y = $.y - Math.floor($.y);
          break;
        case 1001:
          $.y = $.y < 0 ? 0 : 1;
          break;
        case 1002:
          if (Math.abs(Math.floor($.y) % 2) === 1) $.y = Math.ceil($.y) - $.y;
          else $.y = $.y - Math.floor($.y);
          break;
      }
    if (this.flipY) $.y = 1 - $.y;
    return $;
  }
  set needsUpdate($) {
    if ($ === !0) (this.version++, (this.source.needsUpdate = !0));
  }
  get encoding() {
    return (
      H5("THREE.Texture: Property .encoding has been replaced by .colorSpace."),
      this.colorSpace === "srgb" ? 3001 : 3000
    );
  }
  set encoding($) {
    (H5("THREE.Texture: Property .encoding has been replaced by .colorSpace."),
      (this.colorSpace = $ === 3001 ? "srgb" : ""));
  }
}
U6.DEFAULT_IMAGE = null;
U6.DEFAULT_MAPPING = 300;
U6.DEFAULT_ANISOTROPY = 1;
class i0 {
  constructor($ = 0, J = 0, Z = 0, Q = 1) {
    ((i0.prototype.isVector4 = !0),
      (this.x = $),
      (this.y = J),
      (this.z = Z),
      (this.w = Q));
  }
  get width() {
    return this.z;
  }
  set width($) {
    this.z = $;
  }
  get height() {
    return this.w;
  }
  set height($) {
    this.w = $;
  }
  set($, J, Z, Q) {
    return ((this.x = $), (this.y = J), (this.z = Z), (this.w = Q), this);
  }
  setScalar($) {
    return ((this.x = $), (this.y = $), (this.z = $), (this.w = $), this);
  }
  setX($) {
    return ((this.x = $), this);
  }
  setY($) {
    return ((this.y = $), this);
  }
  setZ($) {
    return ((this.z = $), this);
  }
  setW($) {
    return ((this.w = $), this);
  }
  setComponent($, J) {
    switch ($) {
      case 0:
        this.x = J;
        break;
      case 1:
        this.y = J;
        break;
      case 2:
        this.z = J;
        break;
      case 3:
        this.w = J;
        break;
      default:
        throw Error("index is out of range: " + $);
    }
    return this;
  }
  getComponent($) {
    switch ($) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw Error("index is out of range: " + $);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy($) {
    return (
      (this.x = $.x),
      (this.y = $.y),
      (this.z = $.z),
      (this.w = $.w !== void 0 ? $.w : 1),
      this
    );
  }
  add($) {
    return (
      (this.x += $.x),
      (this.y += $.y),
      (this.z += $.z),
      (this.w += $.w),
      this
    );
  }
  addScalar($) {
    return ((this.x += $), (this.y += $), (this.z += $), (this.w += $), this);
  }
  addVectors($, J) {
    return (
      (this.x = $.x + J.x),
      (this.y = $.y + J.y),
      (this.z = $.z + J.z),
      (this.w = $.w + J.w),
      this
    );
  }
  addScaledVector($, J) {
    return (
      (this.x += $.x * J),
      (this.y += $.y * J),
      (this.z += $.z * J),
      (this.w += $.w * J),
      this
    );
  }
  sub($) {
    return (
      (this.x -= $.x),
      (this.y -= $.y),
      (this.z -= $.z),
      (this.w -= $.w),
      this
    );
  }
  subScalar($) {
    return ((this.x -= $), (this.y -= $), (this.z -= $), (this.w -= $), this);
  }
  subVectors($, J) {
    return (
      (this.x = $.x - J.x),
      (this.y = $.y - J.y),
      (this.z = $.z - J.z),
      (this.w = $.w - J.w),
      this
    );
  }
  multiply($) {
    return (
      (this.x *= $.x),
      (this.y *= $.y),
      (this.z *= $.z),
      (this.w *= $.w),
      this
    );
  }
  multiplyScalar($) {
    return ((this.x *= $), (this.y *= $), (this.z *= $), (this.w *= $), this);
  }
  applyMatrix4($) {
    let J = this.x,
      Z = this.y,
      Q = this.z,
      W = this.w,
      Y = $.elements;
    return (
      (this.x = Y[0] * J + Y[4] * Z + Y[8] * Q + Y[12] * W),
      (this.y = Y[1] * J + Y[5] * Z + Y[9] * Q + Y[13] * W),
      (this.z = Y[2] * J + Y[6] * Z + Y[10] * Q + Y[14] * W),
      (this.w = Y[3] * J + Y[7] * Z + Y[11] * Q + Y[15] * W),
      this
    );
  }
  divideScalar($) {
    return this.multiplyScalar(1 / $);
  }
  setAxisAngleFromQuaternion($) {
    this.w = 2 * Math.acos($.w);
    let J = Math.sqrt(1 - $.w * $.w);
    if (J < 0.0001) ((this.x = 1), (this.y = 0), (this.z = 0));
    else ((this.x = $.x / J), (this.y = $.y / J), (this.z = $.z / J));
    return this;
  }
  setAxisAngleFromRotationMatrix($) {
    let J,
      Z,
      Q,
      W,
      Y = 0.01,
      K = 0.1,
      X = $.elements,
      H = X[0],
      q = X[4],
      U = X[8],
      G = X[1],
      E = X[5],
      F = X[9],
      O = X[2],
      _ = X[6],
      N = X[10];
    if (
      Math.abs(q - G) < 0.01 &&
      Math.abs(U - O) < 0.01 &&
      Math.abs(F - _) < 0.01
    ) {
      if (
        Math.abs(q + G) < 0.1 &&
        Math.abs(U + O) < 0.1 &&
        Math.abs(F + _) < 0.1 &&
        Math.abs(H + E + N - 3) < 0.1
      )
        return (this.set(1, 0, 0, 0), this);
      J = Math.PI;
      let k = (H + 1) / 2,
        M = (E + 1) / 2,
        A = (N + 1) / 2,
        L = (q + G) / 4,
        C = (U + O) / 4,
        g = (F + _) / 4;
      if (k > M && k > A)
        if (k < 0.01) ((Z = 0), (Q = 0.707106781), (W = 0.707106781));
        else ((Z = Math.sqrt(k)), (Q = L / Z), (W = C / Z));
      else if (M > A)
        if (M < 0.01) ((Z = 0.707106781), (Q = 0), (W = 0.707106781));
        else ((Q = Math.sqrt(M)), (Z = L / Q), (W = g / Q));
      else if (A < 0.01) ((Z = 0.707106781), (Q = 0.707106781), (W = 0));
      else ((W = Math.sqrt(A)), (Z = C / W), (Q = g / W));
      return (this.set(Z, Q, W, J), this);
    }
    let V = Math.sqrt(
      (_ - F) * (_ - F) + (U - O) * (U - O) + (G - q) * (G - q),
    );
    if (Math.abs(V) < 0.001) V = 1;
    return (
      (this.x = (_ - F) / V),
      (this.y = (U - O) / V),
      (this.z = (G - q) / V),
      (this.w = Math.acos((H + E + N - 1) / 2)),
      this
    );
  }
  min($) {
    return (
      (this.x = Math.min(this.x, $.x)),
      (this.y = Math.min(this.y, $.y)),
      (this.z = Math.min(this.z, $.z)),
      (this.w = Math.min(this.w, $.w)),
      this
    );
  }
  max($) {
    return (
      (this.x = Math.max(this.x, $.x)),
      (this.y = Math.max(this.y, $.y)),
      (this.z = Math.max(this.z, $.z)),
      (this.w = Math.max(this.w, $.w)),
      this
    );
  }
  clamp($, J) {
    return (
      (this.x = Math.max($.x, Math.min(J.x, this.x))),
      (this.y = Math.max($.y, Math.min(J.y, this.y))),
      (this.z = Math.max($.z, Math.min(J.z, this.z))),
      (this.w = Math.max($.w, Math.min(J.w, this.w))),
      this
    );
  }
  clampScalar($, J) {
    return (
      (this.x = Math.max($, Math.min(J, this.x))),
      (this.y = Math.max($, Math.min(J, this.y))),
      (this.z = Math.max($, Math.min(J, this.z))),
      (this.w = Math.max($, Math.min(J, this.w))),
      this
    );
  }
  clampLength($, J) {
    let Z = this.length();
    return this.divideScalar(Z || 1).multiplyScalar(
      Math.max($, Math.min(J, Z)),
    );
  }
  floor() {
    return (
      (this.x = Math.floor(this.x)),
      (this.y = Math.floor(this.y)),
      (this.z = Math.floor(this.z)),
      (this.w = Math.floor(this.w)),
      this
    );
  }
  ceil() {
    return (
      (this.x = Math.ceil(this.x)),
      (this.y = Math.ceil(this.y)),
      (this.z = Math.ceil(this.z)),
      (this.w = Math.ceil(this.w)),
      this
    );
  }
  round() {
    return (
      (this.x = Math.round(this.x)),
      (this.y = Math.round(this.y)),
      (this.z = Math.round(this.z)),
      (this.w = Math.round(this.w)),
      this
    );
  }
  roundToZero() {
    return (
      (this.x = Math.trunc(this.x)),
      (this.y = Math.trunc(this.y)),
      (this.z = Math.trunc(this.z)),
      (this.w = Math.trunc(this.w)),
      this
    );
  }
  negate() {
    return (
      (this.x = -this.x),
      (this.y = -this.y),
      (this.z = -this.z),
      (this.w = -this.w),
      this
    );
  }
  dot($) {
    return this.x * $.x + this.y * $.y + this.z * $.z + this.w * $.w;
  }
  lengthSq() {
    return (
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    );
  }
  length() {
    return Math.sqrt(
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w,
    );
  }
  manhattanLength() {
    return (
      Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
    );
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength($) {
    return this.normalize().multiplyScalar($);
  }
  lerp($, J) {
    return (
      (this.x += ($.x - this.x) * J),
      (this.y += ($.y - this.y) * J),
      (this.z += ($.z - this.z) * J),
      (this.w += ($.w - this.w) * J),
      this
    );
  }
  lerpVectors($, J, Z) {
    return (
      (this.x = $.x + (J.x - $.x) * Z),
      (this.y = $.y + (J.y - $.y) * Z),
      (this.z = $.z + (J.z - $.z) * Z),
      (this.w = $.w + (J.w - $.w) * Z),
      this
    );
  }
  equals($) {
    return $.x === this.x && $.y === this.y && $.z === this.z && $.w === this.w;
  }
  fromArray($, J = 0) {
    return (
      (this.x = $[J]),
      (this.y = $[J + 1]),
      (this.z = $[J + 2]),
      (this.w = $[J + 3]),
      this
    );
  }
  toArray($ = [], J = 0) {
    return (
      ($[J] = this.x),
      ($[J + 1] = this.y),
      ($[J + 2] = this.z),
      ($[J + 3] = this.w),
      $
    );
  }
  fromBufferAttribute($, J) {
    return (
      (this.x = $.getX(J)),
      (this.y = $.getY(J)),
      (this.z = $.getZ(J)),
      (this.w = $.getW(J)),
      this
    );
  }
  random() {
    return (
      (this.x = Math.random()),
      (this.y = Math.random()),
      (this.z = Math.random()),
      (this.w = Math.random()),
      this
    );
  }
  *[Symbol.iterator]() {
    (yield this.x, yield this.y, yield this.z, yield this.w);
  }
}
class z7 extends J$ {
  constructor($ = 1, J = 1, Z = {}) {
    super();
    ((this.isRenderTarget = !0),
      (this.width = $),
      (this.height = J),
      (this.depth = 1),
      (this.scissor = new i0(0, 0, $, J)),
      (this.scissorTest = !1),
      (this.viewport = new i0(0, 0, $, J)));
    let Q = { width: $, height: J, depth: 1 };
    if (Z.encoding !== void 0)
      (H5(
        "THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace.",
      ),
        (Z.colorSpace = Z.encoding === 3001 ? "srgb" : ""));
    ((this.texture = new U6(
      Q,
      Z.mapping,
      Z.wrapS,
      Z.wrapT,
      Z.magFilter,
      Z.minFilter,
      Z.format,
      Z.type,
      Z.anisotropy,
      Z.colorSpace,
    )),
      (this.texture.isRenderTargetTexture = !0),
      (this.texture.flipY = !1),
      (this.texture.generateMipmaps =
        Z.generateMipmaps !== void 0 ? Z.generateMipmaps : !1),
      (this.texture.internalFormat =
        Z.internalFormat !== void 0 ? Z.internalFormat : null),
      (this.texture.minFilter = Z.minFilter !== void 0 ? Z.minFilter : 1006),
      (this.depthBuffer = Z.depthBuffer !== void 0 ? Z.depthBuffer : !0),
      (this.stencilBuffer = Z.stencilBuffer !== void 0 ? Z.stencilBuffer : !1),
      (this.depthTexture = Z.depthTexture !== void 0 ? Z.depthTexture : null),
      (this.samples = Z.samples !== void 0 ? Z.samples : 0));
  }
  setSize($, J, Z = 1) {
    if (this.width !== $ || this.height !== J || this.depth !== Z)
      ((this.width = $),
        (this.height = J),
        (this.depth = Z),
        (this.texture.image.width = $),
        (this.texture.image.height = J),
        (this.texture.image.depth = Z),
        this.dispose());
    (this.viewport.set(0, 0, $, J), this.scissor.set(0, 0, $, J));
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy($) {
    ((this.width = $.width),
      (this.height = $.height),
      (this.depth = $.depth),
      this.scissor.copy($.scissor),
      (this.scissorTest = $.scissorTest),
      this.viewport.copy($.viewport),
      (this.texture = $.texture.clone()),
      (this.texture.isRenderTargetTexture = !0));
    let J = Object.assign({}, $.texture.image);
    if (
      ((this.texture.source = new p8(J)),
      (this.depthBuffer = $.depthBuffer),
      (this.stencilBuffer = $.stencilBuffer),
      $.depthTexture !== null)
    )
      this.depthTexture = $.depthTexture.clone();
    return ((this.samples = $.samples), this);
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class S6 extends z7 {
  constructor($ = 1, J = 1, Z = {}) {
    super($, J, Z);
    this.isWebGLRenderTarget = !0;
  }
}
class u8 extends U6 {
  constructor($ = null, J = 1, Z = 1, Q = 1) {
    super(null);
    ((this.isDataArrayTexture = !0),
      (this.image = { data: $, width: J, height: Z, depth: Q }),
      (this.magFilter = 1003),
      (this.minFilter = 1003),
      (this.wrapR = 1001),
      (this.generateMipmaps = !1),
      (this.flipY = !1),
      (this.unpackAlignment = 1));
  }
}
class I7 extends U6 {
  constructor($ = null, J = 1, Z = 1, Q = 1) {
    super(null);
    ((this.isData3DTexture = !0),
      (this.image = { data: $, width: J, height: Z, depth: Q }),
      (this.magFilter = 1003),
      (this.minFilter = 1003),
      (this.wrapR = 1001),
      (this.generateMipmaps = !1),
      (this.flipY = !1),
      (this.unpackAlignment = 1));
  }
}
class l6 {
  constructor($ = 0, J = 0, Z = 0, Q = 1) {
    ((this.isQuaternion = !0),
      (this._x = $),
      (this._y = J),
      (this._z = Z),
      (this._w = Q));
  }
  static slerpFlat($, J, Z, Q, W, Y, K) {
    let X = Z[Q + 0],
      H = Z[Q + 1],
      q = Z[Q + 2],
      U = Z[Q + 3],
      G = W[Y + 0],
      E = W[Y + 1],
      F = W[Y + 2],
      O = W[Y + 3];
    if (K === 0) {
      (($[J + 0] = X), ($[J + 1] = H), ($[J + 2] = q), ($[J + 3] = U));
      return;
    }
    if (K === 1) {
      (($[J + 0] = G), ($[J + 1] = E), ($[J + 2] = F), ($[J + 3] = O));
      return;
    }
    if (U !== O || X !== G || H !== E || q !== F) {
      let _ = 1 - K,
        N = X * G + H * E + q * F + U * O,
        V = N >= 0 ? 1 : -1,
        k = 1 - N * N;
      if (k > Number.EPSILON) {
        let A = Math.sqrt(k),
          L = Math.atan2(A, N * V);
        ((_ = Math.sin(_ * L) / A), (K = Math.sin(K * L) / A));
      }
      let M = K * V;
      if (
        ((X = X * _ + G * M),
        (H = H * _ + E * M),
        (q = q * _ + F * M),
        (U = U * _ + O * M),
        _ === 1 - K)
      ) {
        let A = 1 / Math.sqrt(X * X + H * H + q * q + U * U);
        ((X *= A), (H *= A), (q *= A), (U *= A));
      }
    }
    (($[J] = X), ($[J + 1] = H), ($[J + 2] = q), ($[J + 3] = U));
  }
  static multiplyQuaternionsFlat($, J, Z, Q, W, Y) {
    let K = Z[Q],
      X = Z[Q + 1],
      H = Z[Q + 2],
      q = Z[Q + 3],
      U = W[Y],
      G = W[Y + 1],
      E = W[Y + 2],
      F = W[Y + 3];
    return (
      ($[J] = K * F + q * U + X * E - H * G),
      ($[J + 1] = X * F + q * G + H * U - K * E),
      ($[J + 2] = H * F + q * E + K * G - X * U),
      ($[J + 3] = q * F - K * U - X * G - H * E),
      $
    );
  }
  get x() {
    return this._x;
  }
  set x($) {
    ((this._x = $), this._onChangeCallback());
  }
  get y() {
    return this._y;
  }
  set y($) {
    ((this._y = $), this._onChangeCallback());
  }
  get z() {
    return this._z;
  }
  set z($) {
    ((this._z = $), this._onChangeCallback());
  }
  get w() {
    return this._w;
  }
  set w($) {
    ((this._w = $), this._onChangeCallback());
  }
  set($, J, Z, Q) {
    return (
      (this._x = $),
      (this._y = J),
      (this._z = Z),
      (this._w = Q),
      this._onChangeCallback(),
      this
    );
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy($) {
    return (
      (this._x = $.x),
      (this._y = $.y),
      (this._z = $.z),
      (this._w = $.w),
      this._onChangeCallback(),
      this
    );
  }
  setFromEuler($, J) {
    let { _x: Z, _y: Q, _z: W, _order: Y } = $,
      K = Math.cos,
      X = Math.sin,
      H = K(Z / 2),
      q = K(Q / 2),
      U = K(W / 2),
      G = X(Z / 2),
      E = X(Q / 2),
      F = X(W / 2);
    switch (Y) {
      case "XYZ":
        ((this._x = G * q * U + H * E * F),
          (this._y = H * E * U - G * q * F),
          (this._z = H * q * F + G * E * U),
          (this._w = H * q * U - G * E * F));
        break;
      case "YXZ":
        ((this._x = G * q * U + H * E * F),
          (this._y = H * E * U - G * q * F),
          (this._z = H * q * F - G * E * U),
          (this._w = H * q * U + G * E * F));
        break;
      case "ZXY":
        ((this._x = G * q * U - H * E * F),
          (this._y = H * E * U + G * q * F),
          (this._z = H * q * F + G * E * U),
          (this._w = H * q * U - G * E * F));
        break;
      case "ZYX":
        ((this._x = G * q * U - H * E * F),
          (this._y = H * E * U + G * q * F),
          (this._z = H * q * F - G * E * U),
          (this._w = H * q * U + G * E * F));
        break;
      case "YZX":
        ((this._x = G * q * U + H * E * F),
          (this._y = H * E * U + G * q * F),
          (this._z = H * q * F - G * E * U),
          (this._w = H * q * U - G * E * F));
        break;
      case "XZY":
        ((this._x = G * q * U - H * E * F),
          (this._y = H * E * U - G * q * F),
          (this._z = H * q * F + G * E * U),
          (this._w = H * q * U + G * E * F));
        break;
      default:
        console.warn(
          "THREE.Quaternion: .setFromEuler() encountered an unknown order: " +
            Y,
        );
    }
    if (J !== !1) this._onChangeCallback();
    return this;
  }
  setFromAxisAngle($, J) {
    let Z = J / 2,
      Q = Math.sin(Z);
    return (
      (this._x = $.x * Q),
      (this._y = $.y * Q),
      (this._z = $.z * Q),
      (this._w = Math.cos(Z)),
      this._onChangeCallback(),
      this
    );
  }
  setFromRotationMatrix($) {
    let J = $.elements,
      Z = J[0],
      Q = J[4],
      W = J[8],
      Y = J[1],
      K = J[5],
      X = J[9],
      H = J[2],
      q = J[6],
      U = J[10],
      G = Z + K + U;
    if (G > 0) {
      let E = 0.5 / Math.sqrt(G + 1);
      ((this._w = 0.25 / E),
        (this._x = (q - X) * E),
        (this._y = (W - H) * E),
        (this._z = (Y - Q) * E));
    } else if (Z > K && Z > U) {
      let E = 2 * Math.sqrt(1 + Z - K - U);
      ((this._w = (q - X) / E),
        (this._x = 0.25 * E),
        (this._y = (Q + Y) / E),
        (this._z = (W + H) / E));
    } else if (K > U) {
      let E = 2 * Math.sqrt(1 + K - Z - U);
      ((this._w = (W - H) / E),
        (this._x = (Q + Y) / E),
        (this._y = 0.25 * E),
        (this._z = (X + q) / E));
    } else {
      let E = 2 * Math.sqrt(1 + U - Z - K);
      ((this._w = (Y - Q) / E),
        (this._x = (W + H) / E),
        (this._y = (X + q) / E),
        (this._z = 0.25 * E));
    }
    return (this._onChangeCallback(), this);
  }
  setFromUnitVectors($, J) {
    let Z = $.dot(J) + 1;
    if (Z < Number.EPSILON)
      if (((Z = 0), Math.abs($.x) > Math.abs($.z)))
        ((this._x = -$.y), (this._y = $.x), (this._z = 0), (this._w = Z));
      else ((this._x = 0), (this._y = -$.z), (this._z = $.y), (this._w = Z));
    else
      ((this._x = $.y * J.z - $.z * J.y),
        (this._y = $.z * J.x - $.x * J.z),
        (this._z = $.x * J.y - $.y * J.x),
        (this._w = Z));
    return this.normalize();
  }
  angleTo($) {
    return 2 * Math.acos(Math.abs(F6(this.dot($), -1, 1)));
  }
  rotateTowards($, J) {
    let Z = this.angleTo($);
    if (Z === 0) return this;
    let Q = Math.min(1, J / Z);
    return (this.slerp($, Q), this);
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return (
      (this._x *= -1),
      (this._y *= -1),
      (this._z *= -1),
      this._onChangeCallback(),
      this
    );
  }
  dot($) {
    return this._x * $._x + this._y * $._y + this._z * $._z + this._w * $._w;
  }
  lengthSq() {
    return (
      this._x * this._x +
      this._y * this._y +
      this._z * this._z +
      this._w * this._w
    );
  }
  length() {
    return Math.sqrt(
      this._x * this._x +
        this._y * this._y +
        this._z * this._z +
        this._w * this._w,
    );
  }
  normalize() {
    let $ = this.length();
    if ($ === 0) ((this._x = 0), (this._y = 0), (this._z = 0), (this._w = 1));
    else
      (($ = 1 / $),
        (this._x = this._x * $),
        (this._y = this._y * $),
        (this._z = this._z * $),
        (this._w = this._w * $));
    return (this._onChangeCallback(), this);
  }
  multiply($) {
    return this.multiplyQuaternions(this, $);
  }
  premultiply($) {
    return this.multiplyQuaternions($, this);
  }
  multiplyQuaternions($, J) {
    let { _x: Z, _y: Q, _z: W, _w: Y } = $,
      K = J._x,
      X = J._y,
      H = J._z,
      q = J._w;
    return (
      (this._x = Z * q + Y * K + Q * H - W * X),
      (this._y = Q * q + Y * X + W * K - Z * H),
      (this._z = W * q + Y * H + Z * X - Q * K),
      (this._w = Y * q - Z * K - Q * X - W * H),
      this._onChangeCallback(),
      this
    );
  }
  slerp($, J) {
    if (J === 0) return this;
    if (J === 1) return this.copy($);
    let Z = this._x,
      Q = this._y,
      W = this._z,
      Y = this._w,
      K = Y * $._w + Z * $._x + Q * $._y + W * $._z;
    if (K < 0)
      ((this._w = -$._w),
        (this._x = -$._x),
        (this._y = -$._y),
        (this._z = -$._z),
        (K = -K));
    else this.copy($);
    if (K >= 1)
      return ((this._w = Y), (this._x = Z), (this._y = Q), (this._z = W), this);
    let X = 1 - K * K;
    if (X <= Number.EPSILON) {
      let E = 1 - J;
      return (
        (this._w = E * Y + J * this._w),
        (this._x = E * Z + J * this._x),
        (this._y = E * Q + J * this._y),
        (this._z = E * W + J * this._z),
        this.normalize(),
        this._onChangeCallback(),
        this
      );
    }
    let H = Math.sqrt(X),
      q = Math.atan2(H, K),
      U = Math.sin((1 - J) * q) / H,
      G = Math.sin(J * q) / H;
    return (
      (this._w = Y * U + this._w * G),
      (this._x = Z * U + this._x * G),
      (this._y = Q * U + this._y * G),
      (this._z = W * U + this._z * G),
      this._onChangeCallback(),
      this
    );
  }
  slerpQuaternions($, J, Z) {
    return this.copy($).slerp(J, Z);
  }
  random() {
    let $ = Math.random(),
      J = Math.sqrt(1 - $),
      Z = Math.sqrt($),
      Q = 2 * Math.PI * Math.random(),
      W = 2 * Math.PI * Math.random();
    return this.set(
      J * Math.cos(Q),
      Z * Math.sin(W),
      Z * Math.cos(W),
      J * Math.sin(Q),
    );
  }
  equals($) {
    return (
      $._x === this._x &&
      $._y === this._y &&
      $._z === this._z &&
      $._w === this._w
    );
  }
  fromArray($, J = 0) {
    return (
      (this._x = $[J]),
      (this._y = $[J + 1]),
      (this._z = $[J + 2]),
      (this._w = $[J + 3]),
      this._onChangeCallback(),
      this
    );
  }
  toArray($ = [], J = 0) {
    return (
      ($[J] = this._x),
      ($[J + 1] = this._y),
      ($[J + 2] = this._z),
      ($[J + 3] = this._w),
      $
    );
  }
  fromBufferAttribute($, J) {
    return (
      (this._x = $.getX(J)),
      (this._y = $.getY(J)),
      (this._z = $.getZ(J)),
      (this._w = $.getW(J)),
      this
    );
  }
  toJSON() {
    return this.toArray();
  }
  _onChange($) {
    return ((this._onChangeCallback = $), this);
  }
  _onChangeCallback() {}
  *[Symbol.iterator]() {
    (yield this._x, yield this._y, yield this._z, yield this._w);
  }
}
class S {
  constructor($ = 0, J = 0, Z = 0) {
    ((S.prototype.isVector3 = !0), (this.x = $), (this.y = J), (this.z = Z));
  }
  set($, J, Z) {
    if (Z === void 0) Z = this.z;
    return ((this.x = $), (this.y = J), (this.z = Z), this);
  }
  setScalar($) {
    return ((this.x = $), (this.y = $), (this.z = $), this);
  }
  setX($) {
    return ((this.x = $), this);
  }
  setY($) {
    return ((this.y = $), this);
  }
  setZ($) {
    return ((this.z = $), this);
  }
  setComponent($, J) {
    switch ($) {
      case 0:
        this.x = J;
        break;
      case 1:
        this.y = J;
        break;
      case 2:
        this.z = J;
        break;
      default:
        throw Error("index is out of range: " + $);
    }
    return this;
  }
  getComponent($) {
    switch ($) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw Error("index is out of range: " + $);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy($) {
    return ((this.x = $.x), (this.y = $.y), (this.z = $.z), this);
  }
  add($) {
    return ((this.x += $.x), (this.y += $.y), (this.z += $.z), this);
  }
  addScalar($) {
    return ((this.x += $), (this.y += $), (this.z += $), this);
  }
  addVectors($, J) {
    return (
      (this.x = $.x + J.x),
      (this.y = $.y + J.y),
      (this.z = $.z + J.z),
      this
    );
  }
  addScaledVector($, J) {
    return (
      (this.x += $.x * J),
      (this.y += $.y * J),
      (this.z += $.z * J),
      this
    );
  }
  sub($) {
    return ((this.x -= $.x), (this.y -= $.y), (this.z -= $.z), this);
  }
  subScalar($) {
    return ((this.x -= $), (this.y -= $), (this.z -= $), this);
  }
  subVectors($, J) {
    return (
      (this.x = $.x - J.x),
      (this.y = $.y - J.y),
      (this.z = $.z - J.z),
      this
    );
  }
  multiply($) {
    return ((this.x *= $.x), (this.y *= $.y), (this.z *= $.z), this);
  }
  multiplyScalar($) {
    return ((this.x *= $), (this.y *= $), (this.z *= $), this);
  }
  multiplyVectors($, J) {
    return (
      (this.x = $.x * J.x),
      (this.y = $.y * J.y),
      (this.z = $.z * J.z),
      this
    );
  }
  applyEuler($) {
    return this.applyQuaternion(AJ.setFromEuler($));
  }
  applyAxisAngle($, J) {
    return this.applyQuaternion(AJ.setFromAxisAngle($, J));
  }
  applyMatrix3($) {
    let J = this.x,
      Z = this.y,
      Q = this.z,
      W = $.elements;
    return (
      (this.x = W[0] * J + W[3] * Z + W[6] * Q),
      (this.y = W[1] * J + W[4] * Z + W[7] * Q),
      (this.z = W[2] * J + W[5] * Z + W[8] * Q),
      this
    );
  }
  applyNormalMatrix($) {
    return this.applyMatrix3($).normalize();
  }
  applyMatrix4($) {
    let J = this.x,
      Z = this.y,
      Q = this.z,
      W = $.elements,
      Y = 1 / (W[3] * J + W[7] * Z + W[11] * Q + W[15]);
    return (
      (this.x = (W[0] * J + W[4] * Z + W[8] * Q + W[12]) * Y),
      (this.y = (W[1] * J + W[5] * Z + W[9] * Q + W[13]) * Y),
      (this.z = (W[2] * J + W[6] * Z + W[10] * Q + W[14]) * Y),
      this
    );
  }
  applyQuaternion($) {
    let J = this.x,
      Z = this.y,
      Q = this.z,
      W = $.x,
      Y = $.y,
      K = $.z,
      X = $.w,
      H = X * J + Y * Q - K * Z,
      q = X * Z + K * J - W * Q,
      U = X * Q + W * Z - Y * J,
      G = -W * J - Y * Z - K * Q;
    return (
      (this.x = H * X + G * -W + q * -K - U * -Y),
      (this.y = q * X + G * -Y + U * -W - H * -K),
      (this.z = U * X + G * -K + H * -Y - q * -W),
      this
    );
  }
  project($) {
    return this.applyMatrix4($.matrixWorldInverse).applyMatrix4(
      $.projectionMatrix,
    );
  }
  unproject($) {
    return this.applyMatrix4($.projectionMatrixInverse).applyMatrix4(
      $.matrixWorld,
    );
  }
  transformDirection($) {
    let J = this.x,
      Z = this.y,
      Q = this.z,
      W = $.elements;
    return (
      (this.x = W[0] * J + W[4] * Z + W[8] * Q),
      (this.y = W[1] * J + W[5] * Z + W[9] * Q),
      (this.z = W[2] * J + W[6] * Z + W[10] * Q),
      this.normalize()
    );
  }
  divide($) {
    return ((this.x /= $.x), (this.y /= $.y), (this.z /= $.z), this);
  }
  divideScalar($) {
    return this.multiplyScalar(1 / $);
  }
  min($) {
    return (
      (this.x = Math.min(this.x, $.x)),
      (this.y = Math.min(this.y, $.y)),
      (this.z = Math.min(this.z, $.z)),
      this
    );
  }
  max($) {
    return (
      (this.x = Math.max(this.x, $.x)),
      (this.y = Math.max(this.y, $.y)),
      (this.z = Math.max(this.z, $.z)),
      this
    );
  }
  clamp($, J) {
    return (
      (this.x = Math.max($.x, Math.min(J.x, this.x))),
      (this.y = Math.max($.y, Math.min(J.y, this.y))),
      (this.z = Math.max($.z, Math.min(J.z, this.z))),
      this
    );
  }
  clampScalar($, J) {
    return (
      (this.x = Math.max($, Math.min(J, this.x))),
      (this.y = Math.max($, Math.min(J, this.y))),
      (this.z = Math.max($, Math.min(J, this.z))),
      this
    );
  }
  clampLength($, J) {
    let Z = this.length();
    return this.divideScalar(Z || 1).multiplyScalar(
      Math.max($, Math.min(J, Z)),
    );
  }
  floor() {
    return (
      (this.x = Math.floor(this.x)),
      (this.y = Math.floor(this.y)),
      (this.z = Math.floor(this.z)),
      this
    );
  }
  ceil() {
    return (
      (this.x = Math.ceil(this.x)),
      (this.y = Math.ceil(this.y)),
      (this.z = Math.ceil(this.z)),
      this
    );
  }
  round() {
    return (
      (this.x = Math.round(this.x)),
      (this.y = Math.round(this.y)),
      (this.z = Math.round(this.z)),
      this
    );
  }
  roundToZero() {
    return (
      (this.x = Math.trunc(this.x)),
      (this.y = Math.trunc(this.y)),
      (this.z = Math.trunc(this.z)),
      this
    );
  }
  negate() {
    return ((this.x = -this.x), (this.y = -this.y), (this.z = -this.z), this);
  }
  dot($) {
    return this.x * $.x + this.y * $.y + this.z * $.z;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength($) {
    return this.normalize().multiplyScalar($);
  }
  lerp($, J) {
    return (
      (this.x += ($.x - this.x) * J),
      (this.y += ($.y - this.y) * J),
      (this.z += ($.z - this.z) * J),
      this
    );
  }
  lerpVectors($, J, Z) {
    return (
      (this.x = $.x + (J.x - $.x) * Z),
      (this.y = $.y + (J.y - $.y) * Z),
      (this.z = $.z + (J.z - $.z) * Z),
      this
    );
  }
  cross($) {
    return this.crossVectors(this, $);
  }
  crossVectors($, J) {
    let { x: Z, y: Q, z: W } = $,
      Y = J.x,
      K = J.y,
      X = J.z;
    return (
      (this.x = Q * X - W * K),
      (this.y = W * Y - Z * X),
      (this.z = Z * K - Q * Y),
      this
    );
  }
  projectOnVector($) {
    let J = $.lengthSq();
    if (J === 0) return this.set(0, 0, 0);
    let Z = $.dot(this) / J;
    return this.copy($).multiplyScalar(Z);
  }
  projectOnPlane($) {
    return (F8.copy(this).projectOnVector($), this.sub(F8));
  }
  reflect($) {
    return this.sub(F8.copy($).multiplyScalar(2 * this.dot($)));
  }
  angleTo($) {
    let J = Math.sqrt(this.lengthSq() * $.lengthSq());
    if (J === 0) return Math.PI / 2;
    let Z = this.dot($) / J;
    return Math.acos(F6(Z, -1, 1));
  }
  distanceTo($) {
    return Math.sqrt(this.distanceToSquared($));
  }
  distanceToSquared($) {
    let J = this.x - $.x,
      Z = this.y - $.y,
      Q = this.z - $.z;
    return J * J + Z * Z + Q * Q;
  }
  manhattanDistanceTo($) {
    return (
      Math.abs(this.x - $.x) + Math.abs(this.y - $.y) + Math.abs(this.z - $.z)
    );
  }
  setFromSpherical($) {
    return this.setFromSphericalCoords($.radius, $.phi, $.theta);
  }
  setFromSphericalCoords($, J, Z) {
    let Q = Math.sin(J) * $;
    return (
      (this.x = Q * Math.sin(Z)),
      (this.y = Math.cos(J) * $),
      (this.z = Q * Math.cos(Z)),
      this
    );
  }
  setFromCylindrical($) {
    return this.setFromCylindricalCoords($.radius, $.theta, $.y);
  }
  setFromCylindricalCoords($, J, Z) {
    return (
      (this.x = $ * Math.sin(J)),
      (this.y = Z),
      (this.z = $ * Math.cos(J)),
      this
    );
  }
  setFromMatrixPosition($) {
    let J = $.elements;
    return ((this.x = J[12]), (this.y = J[13]), (this.z = J[14]), this);
  }
  setFromMatrixScale($) {
    let J = this.setFromMatrixColumn($, 0).length(),
      Z = this.setFromMatrixColumn($, 1).length(),
      Q = this.setFromMatrixColumn($, 2).length();
    return ((this.x = J), (this.y = Z), (this.z = Q), this);
  }
  setFromMatrixColumn($, J) {
    return this.fromArray($.elements, J * 4);
  }
  setFromMatrix3Column($, J) {
    return this.fromArray($.elements, J * 3);
  }
  setFromEuler($) {
    return ((this.x = $._x), (this.y = $._y), (this.z = $._z), this);
  }
  setFromColor($) {
    return ((this.x = $.r), (this.y = $.g), (this.z = $.b), this);
  }
  equals($) {
    return $.x === this.x && $.y === this.y && $.z === this.z;
  }
  fromArray($, J = 0) {
    return ((this.x = $[J]), (this.y = $[J + 1]), (this.z = $[J + 2]), this);
  }
  toArray($ = [], J = 0) {
    return (($[J] = this.x), ($[J + 1] = this.y), ($[J + 2] = this.z), $);
  }
  fromBufferAttribute($, J) {
    return (
      (this.x = $.getX(J)),
      (this.y = $.getY(J)),
      (this.z = $.getZ(J)),
      this
    );
  }
  random() {
    return (
      (this.x = Math.random()),
      (this.y = Math.random()),
      (this.z = Math.random()),
      this
    );
  }
  randomDirection() {
    let $ = (Math.random() - 0.5) * 2,
      J = Math.random() * Math.PI * 2,
      Z = Math.sqrt(1 - $ ** 2);
    return (
      (this.x = Z * Math.cos(J)),
      (this.y = Z * Math.sin(J)),
      (this.z = $),
      this
    );
  }
  *[Symbol.iterator]() {
    (yield this.x, yield this.y, yield this.z);
  }
}
var F8 = new S(),
  AJ = new l6();
class n$ {
  constructor(
    $ = new S(1 / 0, 1 / 0, 1 / 0),
    J = new S(-1 / 0, -1 / 0, -1 / 0),
  ) {
    ((this.isBox3 = !0), (this.min = $), (this.max = J));
  }
  set($, J) {
    return (this.min.copy($), this.max.copy(J), this);
  }
  setFromArray($) {
    this.makeEmpty();
    for (let J = 0, Z = $.length; J < Z; J += 3)
      this.expandByPoint(o6.fromArray($, J));
    return this;
  }
  setFromBufferAttribute($) {
    this.makeEmpty();
    for (let J = 0, Z = $.count; J < Z; J++)
      this.expandByPoint(o6.fromBufferAttribute($, J));
    return this;
  }
  setFromPoints($) {
    this.makeEmpty();
    for (let J = 0, Z = $.length; J < Z; J++) this.expandByPoint($[J]);
    return this;
  }
  setFromCenterAndSize($, J) {
    let Z = o6.copy(J).multiplyScalar(0.5);
    return (this.min.copy($).sub(Z), this.max.copy($).add(Z), this);
  }
  setFromObject($, J = !1) {
    return (this.makeEmpty(), this.expandByObject($, J));
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy($) {
    return (this.min.copy($.min), this.max.copy($.max), this);
  }
  makeEmpty() {
    return (
      (this.min.x = this.min.y = this.min.z = 1 / 0),
      (this.max.x = this.max.y = this.max.z = -1 / 0),
      this
    );
  }
  isEmpty() {
    return (
      this.max.x < this.min.x ||
      this.max.y < this.min.y ||
      this.max.z < this.min.z
    );
  }
  getCenter($) {
    return this.isEmpty()
      ? $.set(0, 0, 0)
      : $.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize($) {
    return this.isEmpty() ? $.set(0, 0, 0) : $.subVectors(this.max, this.min);
  }
  expandByPoint($) {
    return (this.min.min($), this.max.max($), this);
  }
  expandByVector($) {
    return (this.min.sub($), this.max.add($), this);
  }
  expandByScalar($) {
    return (this.min.addScalar(-$), this.max.addScalar($), this);
  }
  expandByObject($, J = !1) {
    if (($.updateWorldMatrix(!1, !1), $.boundingBox !== void 0)) {
      if ($.boundingBox === null) $.computeBoundingBox();
      (k$.copy($.boundingBox), k$.applyMatrix4($.matrixWorld), this.union(k$));
    } else {
      let Q = $.geometry;
      if (Q !== void 0)
        if (J && Q.attributes !== void 0 && Q.attributes.position !== void 0) {
          let W = Q.attributes.position;
          for (let Y = 0, K = W.count; Y < K; Y++)
            (o6.fromBufferAttribute(W, Y).applyMatrix4($.matrixWorld),
              this.expandByPoint(o6));
        } else {
          if (Q.boundingBox === null) Q.computeBoundingBox();
          (k$.copy(Q.boundingBox),
            k$.applyMatrix4($.matrixWorld),
            this.union(k$));
        }
    }
    let Z = $.children;
    for (let Q = 0, W = Z.length; Q < W; Q++) this.expandByObject(Z[Q], J);
    return this;
  }
  containsPoint($) {
    return $.x < this.min.x ||
      $.x > this.max.x ||
      $.y < this.min.y ||
      $.y > this.max.y ||
      $.z < this.min.z ||
      $.z > this.max.z
      ? !1
      : !0;
  }
  containsBox($) {
    return (
      this.min.x <= $.min.x &&
      $.max.x <= this.max.x &&
      this.min.y <= $.min.y &&
      $.max.y <= this.max.y &&
      this.min.z <= $.min.z &&
      $.max.z <= this.max.z
    );
  }
  getParameter($, J) {
    return J.set(
      ($.x - this.min.x) / (this.max.x - this.min.x),
      ($.y - this.min.y) / (this.max.y - this.min.y),
      ($.z - this.min.z) / (this.max.z - this.min.z),
    );
  }
  intersectsBox($) {
    return $.max.x < this.min.x ||
      $.min.x > this.max.x ||
      $.max.y < this.min.y ||
      $.min.y > this.max.y ||
      $.max.z < this.min.z ||
      $.min.z > this.max.z
      ? !1
      : !0;
  }
  intersectsSphere($) {
    return (
      this.clampPoint($.center, o6),
      o6.distanceToSquared($.center) <= $.radius * $.radius
    );
  }
  intersectsPlane($) {
    let J, Z;
    if ($.normal.x > 0)
      ((J = $.normal.x * this.min.x), (Z = $.normal.x * this.max.x));
    else ((J = $.normal.x * this.max.x), (Z = $.normal.x * this.min.x));
    if ($.normal.y > 0)
      ((J += $.normal.y * this.min.y), (Z += $.normal.y * this.max.y));
    else ((J += $.normal.y * this.max.y), (Z += $.normal.y * this.min.y));
    if ($.normal.z > 0)
      ((J += $.normal.z * this.min.z), (Z += $.normal.z * this.max.z));
    else ((J += $.normal.z * this.max.z), (Z += $.normal.z * this.min.z));
    return J <= -$.constant && Z >= -$.constant;
  }
  intersectsTriangle($) {
    if (this.isEmpty()) return !1;
    (this.getCenter(a$),
      O5.subVectors(this.max, a$),
      B$.subVectors($.a, a$),
      w$.subVectors($.b, a$),
      L$.subVectors($.c, a$),
      Z$.subVectors(w$, B$),
      Q$.subVectors(L$, w$),
      U$.subVectors(B$, L$));
    let J = [
      0,
      -Z$.z,
      Z$.y,
      0,
      -Q$.z,
      Q$.y,
      0,
      -U$.z,
      U$.y,
      Z$.z,
      0,
      -Z$.x,
      Q$.z,
      0,
      -Q$.x,
      U$.z,
      0,
      -U$.x,
      -Z$.y,
      Z$.x,
      0,
      -Q$.y,
      Q$.x,
      0,
      -U$.y,
      U$.x,
      0,
    ];
    if (!R8(J, B$, w$, L$, O5)) return !1;
    if (((J = [1, 0, 0, 0, 1, 0, 0, 0, 1]), !R8(J, B$, w$, L$, O5))) return !1;
    return (
      _5.crossVectors(Z$, Q$),
      (J = [_5.x, _5.y, _5.z]),
      R8(J, B$, w$, L$, O5)
    );
  }
  clampPoint($, J) {
    return J.copy($).clamp(this.min, this.max);
  }
  distanceToPoint($) {
    return this.clampPoint($, o6).distanceTo($);
  }
  getBoundingSphere($) {
    if (this.isEmpty()) $.makeEmpty();
    else
      (this.getCenter($.center), ($.radius = this.getSize(o6).length() * 0.5));
    return $;
  }
  intersect($) {
    if ((this.min.max($.min), this.max.min($.max), this.isEmpty()))
      this.makeEmpty();
    return this;
  }
  union($) {
    return (this.min.min($.min), this.max.max($.max), this);
  }
  applyMatrix4($) {
    if (this.isEmpty()) return this;
    return (
      i6[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4($),
      i6[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4($),
      i6[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4($),
      i6[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4($),
      i6[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4($),
      i6[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4($),
      i6[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4($),
      i6[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4($),
      this.setFromPoints(i6),
      this
    );
  }
  translate($) {
    return (this.min.add($), this.max.add($), this);
  }
  equals($) {
    return $.min.equals(this.min) && $.max.equals(this.max);
  }
}
var i6 = [
    new S(),
    new S(),
    new S(),
    new S(),
    new S(),
    new S(),
    new S(),
    new S(),
  ],
  o6 = new S(),
  k$ = new n$(),
  B$ = new S(),
  w$ = new S(),
  L$ = new S(),
  Z$ = new S(),
  Q$ = new S(),
  U$ = new S(),
  a$ = new S(),
  O5 = new S(),
  _5 = new S(),
  E$ = new S();
function R8($, J, Z, Q, W) {
  for (let Y = 0, K = $.length - 3; Y <= K; Y += 3) {
    E$.fromArray($, Y);
    let X = W.x * Math.abs(E$.x) + W.y * Math.abs(E$.y) + W.z * Math.abs(E$.z),
      H = J.dot(E$),
      q = Z.dot(E$),
      U = Q.dot(E$);
    if (Math.max(-Math.max(H, q, U), Math.min(H, q, U)) > X) return !1;
  }
  return !0;
}
var n9 = new n$(),
  t$ = new S(),
  D8 = new S();
class s5 {
  constructor($ = new S(), J = -1) {
    ((this.center = $), (this.radius = J));
  }
  set($, J) {
    return (this.center.copy($), (this.radius = J), this);
  }
  setFromPoints($, J) {
    let Z = this.center;
    if (J !== void 0) Z.copy(J);
    else n9.setFromPoints($).getCenter(Z);
    let Q = 0;
    for (let W = 0, Y = $.length; W < Y; W++)
      Q = Math.max(Q, Z.distanceToSquared($[W]));
    return ((this.radius = Math.sqrt(Q)), this);
  }
  copy($) {
    return (this.center.copy($.center), (this.radius = $.radius), this);
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return (this.center.set(0, 0, 0), (this.radius = -1), this);
  }
  containsPoint($) {
    return $.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint($) {
    return $.distanceTo(this.center) - this.radius;
  }
  intersectsSphere($) {
    let J = this.radius + $.radius;
    return $.center.distanceToSquared(this.center) <= J * J;
  }
  intersectsBox($) {
    return $.intersectsSphere(this);
  }
  intersectsPlane($) {
    return Math.abs($.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint($, J) {
    let Z = this.center.distanceToSquared($);
    if ((J.copy($), Z > this.radius * this.radius))
      (J.sub(this.center).normalize(),
        J.multiplyScalar(this.radius).add(this.center));
    return J;
  }
  getBoundingBox($) {
    if (this.isEmpty()) return ($.makeEmpty(), $);
    return ($.set(this.center, this.center), $.expandByScalar(this.radius), $);
  }
  applyMatrix4($) {
    return (
      this.center.applyMatrix4($),
      (this.radius = this.radius * $.getMaxScaleOnAxis()),
      this
    );
  }
  translate($) {
    return (this.center.add($), this);
  }
  expandByPoint($) {
    if (this.isEmpty()) return (this.center.copy($), (this.radius = 0), this);
    t$.subVectors($, this.center);
    let J = t$.lengthSq();
    if (J > this.radius * this.radius) {
      let Z = Math.sqrt(J),
        Q = (Z - this.radius) * 0.5;
      (this.center.addScaledVector(t$, Q / Z), (this.radius += Q));
    }
    return this;
  }
  union($) {
    if ($.isEmpty()) return this;
    if (this.isEmpty()) return (this.copy($), this);
    if (this.center.equals($.center) === !0)
      this.radius = Math.max(this.radius, $.radius);
    else
      (D8.subVectors($.center, this.center).setLength($.radius),
        this.expandByPoint(t$.copy($.center).add(D8)),
        this.expandByPoint(t$.copy($.center).sub(D8)));
    return this;
  }
  equals($) {
    return $.center.equals(this.center) && $.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
var r6 = new S(),
  O8 = new S(),
  z5 = new S(),
  W$ = new S(),
  _8 = new S(),
  I5 = new S(),
  z8 = new S();
class i5 {
  constructor($ = new S(), J = new S(0, 0, -1)) {
    ((this.origin = $), (this.direction = J));
  }
  set($, J) {
    return (this.origin.copy($), this.direction.copy(J), this);
  }
  copy($) {
    return (this.origin.copy($.origin), this.direction.copy($.direction), this);
  }
  at($, J) {
    return J.copy(this.origin).addScaledVector(this.direction, $);
  }
  lookAt($) {
    return (this.direction.copy($).sub(this.origin).normalize(), this);
  }
  recast($) {
    return (this.origin.copy(this.at($, r6)), this);
  }
  closestPointToPoint($, J) {
    J.subVectors($, this.origin);
    let Z = J.dot(this.direction);
    if (Z < 0) return J.copy(this.origin);
    return J.copy(this.origin).addScaledVector(this.direction, Z);
  }
  distanceToPoint($) {
    return Math.sqrt(this.distanceSqToPoint($));
  }
  distanceSqToPoint($) {
    let J = r6.subVectors($, this.origin).dot(this.direction);
    if (J < 0) return this.origin.distanceToSquared($);
    return (
      r6.copy(this.origin).addScaledVector(this.direction, J),
      r6.distanceToSquared($)
    );
  }
  distanceSqToSegment($, J, Z, Q) {
    (O8.copy($).add(J).multiplyScalar(0.5),
      z5.copy(J).sub($).normalize(),
      W$.copy(this.origin).sub(O8));
    let W = $.distanceTo(J) * 0.5,
      Y = -this.direction.dot(z5),
      K = W$.dot(this.direction),
      X = -W$.dot(z5),
      H = W$.lengthSq(),
      q = Math.abs(1 - Y * Y),
      U,
      G,
      E,
      F;
    if (q > 0)
      if (((U = Y * X - K), (G = Y * K - X), (F = W * q), U >= 0))
        if (G >= -F)
          if (G <= F) {
            let O = 1 / q;
            ((U *= O),
              (G *= O),
              (E = U * (U + Y * G + 2 * K) + G * (Y * U + G + 2 * X) + H));
          } else
            ((G = W),
              (U = Math.max(0, -(Y * G + K))),
              (E = -U * U + G * (G + 2 * X) + H));
        else
          ((G = -W),
            (U = Math.max(0, -(Y * G + K))),
            (E = -U * U + G * (G + 2 * X) + H));
      else if (G <= -F)
        ((U = Math.max(0, -(-Y * W + K))),
          (G = U > 0 ? -W : Math.min(Math.max(-W, -X), W)),
          (E = -U * U + G * (G + 2 * X) + H));
      else if (G <= F)
        ((U = 0),
          (G = Math.min(Math.max(-W, -X), W)),
          (E = G * (G + 2 * X) + H));
      else
        ((U = Math.max(0, -(Y * W + K))),
          (G = U > 0 ? W : Math.min(Math.max(-W, -X), W)),
          (E = -U * U + G * (G + 2 * X) + H));
    else
      ((G = Y > 0 ? -W : W),
        (U = Math.max(0, -(Y * G + K))),
        (E = -U * U + G * (G + 2 * X) + H));
    if (Z) Z.copy(this.origin).addScaledVector(this.direction, U);
    if (Q) Q.copy(O8).addScaledVector(z5, G);
    return E;
  }
  intersectSphere($, J) {
    r6.subVectors($.center, this.origin);
    let Z = r6.dot(this.direction),
      Q = r6.dot(r6) - Z * Z,
      W = $.radius * $.radius;
    if (Q > W) return null;
    let Y = Math.sqrt(W - Q),
      K = Z - Y,
      X = Z + Y;
    if (X < 0) return null;
    if (K < 0) return this.at(X, J);
    return this.at(K, J);
  }
  intersectsSphere($) {
    return this.distanceSqToPoint($.center) <= $.radius * $.radius;
  }
  distanceToPlane($) {
    let J = $.normal.dot(this.direction);
    if (J === 0) {
      if ($.distanceToPoint(this.origin) === 0) return 0;
      return null;
    }
    let Z = -(this.origin.dot($.normal) + $.constant) / J;
    return Z >= 0 ? Z : null;
  }
  intersectPlane($, J) {
    let Z = this.distanceToPlane($);
    if (Z === null) return null;
    return this.at(Z, J);
  }
  intersectsPlane($) {
    let J = $.distanceToPoint(this.origin);
    if (J === 0) return !0;
    if ($.normal.dot(this.direction) * J < 0) return !0;
    return !1;
  }
  intersectBox($, J) {
    let Z,
      Q,
      W,
      Y,
      K,
      X,
      H = 1 / this.direction.x,
      q = 1 / this.direction.y,
      U = 1 / this.direction.z,
      G = this.origin;
    if (H >= 0) ((Z = ($.min.x - G.x) * H), (Q = ($.max.x - G.x) * H));
    else ((Z = ($.max.x - G.x) * H), (Q = ($.min.x - G.x) * H));
    if (q >= 0) ((W = ($.min.y - G.y) * q), (Y = ($.max.y - G.y) * q));
    else ((W = ($.max.y - G.y) * q), (Y = ($.min.y - G.y) * q));
    if (Z > Y || W > Q) return null;
    if (W > Z || isNaN(Z)) Z = W;
    if (Y < Q || isNaN(Q)) Q = Y;
    if (U >= 0) ((K = ($.min.z - G.z) * U), (X = ($.max.z - G.z) * U));
    else ((K = ($.max.z - G.z) * U), (X = ($.min.z - G.z) * U));
    if (Z > X || K > Q) return null;
    if (K > Z || Z !== Z) Z = K;
    if (X < Q || Q !== Q) Q = X;
    if (Q < 0) return null;
    return this.at(Z >= 0 ? Z : Q, J);
  }
  intersectsBox($) {
    return this.intersectBox($, r6) !== null;
  }
  intersectTriangle($, J, Z, Q, W) {
    (_8.subVectors(J, $), I5.subVectors(Z, $), z8.crossVectors(_8, I5));
    let Y = this.direction.dot(z8),
      K;
    if (Y > 0) {
      if (Q) return null;
      K = 1;
    } else if (Y < 0) ((K = -1), (Y = -Y));
    else return null;
    W$.subVectors(this.origin, $);
    let X = K * this.direction.dot(I5.crossVectors(W$, I5));
    if (X < 0) return null;
    let H = K * this.direction.dot(_8.cross(W$));
    if (H < 0) return null;
    if (X + H > Y) return null;
    let q = -K * W$.dot(z8);
    if (q < 0) return null;
    return this.at(q / Y, W);
  }
  applyMatrix4($) {
    return (
      this.origin.applyMatrix4($),
      this.direction.transformDirection($),
      this
    );
  }
  equals($) {
    return $.origin.equals(this.origin) && $.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class $6 {
  constructor($, J, Z, Q, W, Y, K, X, H, q, U, G, E, F, O, _) {
    if (
      (($6.prototype.isMatrix4 = !0),
      (this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
      $ !== void 0)
    )
      this.set($, J, Z, Q, W, Y, K, X, H, q, U, G, E, F, O, _);
  }
  set($, J, Z, Q, W, Y, K, X, H, q, U, G, E, F, O, _) {
    let N = this.elements;
    return (
      (N[0] = $),
      (N[4] = J),
      (N[8] = Z),
      (N[12] = Q),
      (N[1] = W),
      (N[5] = Y),
      (N[9] = K),
      (N[13] = X),
      (N[2] = H),
      (N[6] = q),
      (N[10] = U),
      (N[14] = G),
      (N[3] = E),
      (N[7] = F),
      (N[11] = O),
      (N[15] = _),
      this
    );
  }
  identity() {
    return (this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this);
  }
  clone() {
    return new $6().fromArray(this.elements);
  }
  copy($) {
    let J = this.elements,
      Z = $.elements;
    return (
      (J[0] = Z[0]),
      (J[1] = Z[1]),
      (J[2] = Z[2]),
      (J[3] = Z[3]),
      (J[4] = Z[4]),
      (J[5] = Z[5]),
      (J[6] = Z[6]),
      (J[7] = Z[7]),
      (J[8] = Z[8]),
      (J[9] = Z[9]),
      (J[10] = Z[10]),
      (J[11] = Z[11]),
      (J[12] = Z[12]),
      (J[13] = Z[13]),
      (J[14] = Z[14]),
      (J[15] = Z[15]),
      this
    );
  }
  copyPosition($) {
    let J = this.elements,
      Z = $.elements;
    return ((J[12] = Z[12]), (J[13] = Z[13]), (J[14] = Z[14]), this);
  }
  setFromMatrix3($) {
    let J = $.elements;
    return (
      this.set(
        J[0],
        J[3],
        J[6],
        0,
        J[1],
        J[4],
        J[7],
        0,
        J[2],
        J[5],
        J[8],
        0,
        0,
        0,
        0,
        1,
      ),
      this
    );
  }
  extractBasis($, J, Z) {
    return (
      $.setFromMatrixColumn(this, 0),
      J.setFromMatrixColumn(this, 1),
      Z.setFromMatrixColumn(this, 2),
      this
    );
  }
  makeBasis($, J, Z) {
    return (
      this.set(
        $.x,
        J.x,
        Z.x,
        0,
        $.y,
        J.y,
        Z.y,
        0,
        $.z,
        J.z,
        Z.z,
        0,
        0,
        0,
        0,
        1,
      ),
      this
    );
  }
  extractRotation($) {
    let J = this.elements,
      Z = $.elements,
      Q = 1 / A$.setFromMatrixColumn($, 0).length(),
      W = 1 / A$.setFromMatrixColumn($, 1).length(),
      Y = 1 / A$.setFromMatrixColumn($, 2).length();
    return (
      (J[0] = Z[0] * Q),
      (J[1] = Z[1] * Q),
      (J[2] = Z[2] * Q),
      (J[3] = 0),
      (J[4] = Z[4] * W),
      (J[5] = Z[5] * W),
      (J[6] = Z[6] * W),
      (J[7] = 0),
      (J[8] = Z[8] * Y),
      (J[9] = Z[9] * Y),
      (J[10] = Z[10] * Y),
      (J[11] = 0),
      (J[12] = 0),
      (J[13] = 0),
      (J[14] = 0),
      (J[15] = 1),
      this
    );
  }
  makeRotationFromEuler($) {
    let J = this.elements,
      Z = $.x,
      Q = $.y,
      W = $.z,
      Y = Math.cos(Z),
      K = Math.sin(Z),
      X = Math.cos(Q),
      H = Math.sin(Q),
      q = Math.cos(W),
      U = Math.sin(W);
    if ($.order === "XYZ") {
      let G = Y * q,
        E = Y * U,
        F = K * q,
        O = K * U;
      ((J[0] = X * q),
        (J[4] = -X * U),
        (J[8] = H),
        (J[1] = E + F * H),
        (J[5] = G - O * H),
        (J[9] = -K * X),
        (J[2] = O - G * H),
        (J[6] = F + E * H),
        (J[10] = Y * X));
    } else if ($.order === "YXZ") {
      let G = X * q,
        E = X * U,
        F = H * q,
        O = H * U;
      ((J[0] = G + O * K),
        (J[4] = F * K - E),
        (J[8] = Y * H),
        (J[1] = Y * U),
        (J[5] = Y * q),
        (J[9] = -K),
        (J[2] = E * K - F),
        (J[6] = O + G * K),
        (J[10] = Y * X));
    } else if ($.order === "ZXY") {
      let G = X * q,
        E = X * U,
        F = H * q,
        O = H * U;
      ((J[0] = G - O * K),
        (J[4] = -Y * U),
        (J[8] = F + E * K),
        (J[1] = E + F * K),
        (J[5] = Y * q),
        (J[9] = O - G * K),
        (J[2] = -Y * H),
        (J[6] = K),
        (J[10] = Y * X));
    } else if ($.order === "ZYX") {
      let G = Y * q,
        E = Y * U,
        F = K * q,
        O = K * U;
      ((J[0] = X * q),
        (J[4] = F * H - E),
        (J[8] = G * H + O),
        (J[1] = X * U),
        (J[5] = O * H + G),
        (J[9] = E * H - F),
        (J[2] = -H),
        (J[6] = K * X),
        (J[10] = Y * X));
    } else if ($.order === "YZX") {
      let G = Y * X,
        E = Y * H,
        F = K * X,
        O = K * H;
      ((J[0] = X * q),
        (J[4] = O - G * U),
        (J[8] = F * U + E),
        (J[1] = U),
        (J[5] = Y * q),
        (J[9] = -K * q),
        (J[2] = -H * q),
        (J[6] = E * U + F),
        (J[10] = G - O * U));
    } else if ($.order === "XZY") {
      let G = Y * X,
        E = Y * H,
        F = K * X,
        O = K * H;
      ((J[0] = X * q),
        (J[4] = -U),
        (J[8] = H * q),
        (J[1] = G * U + O),
        (J[5] = Y * q),
        (J[9] = E * U - F),
        (J[2] = F * U - E),
        (J[6] = K * q),
        (J[10] = O * U + G));
    }
    return (
      (J[3] = 0),
      (J[7] = 0),
      (J[11] = 0),
      (J[12] = 0),
      (J[13] = 0),
      (J[14] = 0),
      (J[15] = 1),
      this
    );
  }
  makeRotationFromQuaternion($) {
    return this.compose(s9, $, i9);
  }
  lookAt($, J, Z) {
    let Q = this.elements;
    if ((k6.subVectors($, J), k6.lengthSq() === 0)) k6.z = 1;
    if ((k6.normalize(), Y$.crossVectors(Z, k6), Y$.lengthSq() === 0)) {
      if (Math.abs(Z.z) === 1) k6.x += 0.0001;
      else k6.z += 0.0001;
      (k6.normalize(), Y$.crossVectors(Z, k6));
    }
    return (
      Y$.normalize(),
      C5.crossVectors(k6, Y$),
      (Q[0] = Y$.x),
      (Q[4] = C5.x),
      (Q[8] = k6.x),
      (Q[1] = Y$.y),
      (Q[5] = C5.y),
      (Q[9] = k6.y),
      (Q[2] = Y$.z),
      (Q[6] = C5.z),
      (Q[10] = k6.z),
      this
    );
  }
  multiply($) {
    return this.multiplyMatrices(this, $);
  }
  premultiply($) {
    return this.multiplyMatrices($, this);
  }
  multiplyMatrices($, J) {
    let Z = $.elements,
      Q = J.elements,
      W = this.elements,
      Y = Z[0],
      K = Z[4],
      X = Z[8],
      H = Z[12],
      q = Z[1],
      U = Z[5],
      G = Z[9],
      E = Z[13],
      F = Z[2],
      O = Z[6],
      _ = Z[10],
      N = Z[14],
      V = Z[3],
      k = Z[7],
      M = Z[11],
      A = Z[15],
      L = Q[0],
      C = Q[4],
      g = Q[8],
      d = Q[12],
      R = Q[1],
      w = Q[5],
      s = Q[9],
      W0 = Q[13],
      h = Q[2],
      y = Q[6],
      l = Q[10],
      r = Q[14],
      c = Q[3],
      u = Q[7],
      i = Q[11],
      T = Q[15];
    return (
      (W[0] = Y * L + K * R + X * h + H * c),
      (W[4] = Y * C + K * w + X * y + H * u),
      (W[8] = Y * g + K * s + X * l + H * i),
      (W[12] = Y * d + K * W0 + X * r + H * T),
      (W[1] = q * L + U * R + G * h + E * c),
      (W[5] = q * C + U * w + G * y + E * u),
      (W[9] = q * g + U * s + G * l + E * i),
      (W[13] = q * d + U * W0 + G * r + E * T),
      (W[2] = F * L + O * R + _ * h + N * c),
      (W[6] = F * C + O * w + _ * y + N * u),
      (W[10] = F * g + O * s + _ * l + N * i),
      (W[14] = F * d + O * W0 + _ * r + N * T),
      (W[3] = V * L + k * R + M * h + A * c),
      (W[7] = V * C + k * w + M * y + A * u),
      (W[11] = V * g + k * s + M * l + A * i),
      (W[15] = V * d + k * W0 + M * r + A * T),
      this
    );
  }
  multiplyScalar($) {
    let J = this.elements;
    return (
      (J[0] *= $),
      (J[4] *= $),
      (J[8] *= $),
      (J[12] *= $),
      (J[1] *= $),
      (J[5] *= $),
      (J[9] *= $),
      (J[13] *= $),
      (J[2] *= $),
      (J[6] *= $),
      (J[10] *= $),
      (J[14] *= $),
      (J[3] *= $),
      (J[7] *= $),
      (J[11] *= $),
      (J[15] *= $),
      this
    );
  }
  determinant() {
    let $ = this.elements,
      J = $[0],
      Z = $[4],
      Q = $[8],
      W = $[12],
      Y = $[1],
      K = $[5],
      X = $[9],
      H = $[13],
      q = $[2],
      U = $[6],
      G = $[10],
      E = $[14],
      F = $[3],
      O = $[7],
      _ = $[11],
      N = $[15];
    return (
      F *
        (+W * X * U -
          Q * H * U -
          W * K * G +
          Z * H * G +
          Q * K * E -
          Z * X * E) +
      O *
        (+J * X * E -
          J * H * G +
          W * Y * G -
          Q * Y * E +
          Q * H * q -
          W * X * q) +
      _ *
        (+J * H * U -
          J * K * E -
          W * Y * U +
          Z * Y * E +
          W * K * q -
          Z * H * q) +
      N *
        (-Q * K * q - J * X * U + J * K * G + Q * Y * U - Z * Y * G + Z * X * q)
    );
  }
  transpose() {
    let $ = this.elements,
      J;
    return (
      (J = $[1]),
      ($[1] = $[4]),
      ($[4] = J),
      (J = $[2]),
      ($[2] = $[8]),
      ($[8] = J),
      (J = $[6]),
      ($[6] = $[9]),
      ($[9] = J),
      (J = $[3]),
      ($[3] = $[12]),
      ($[12] = J),
      (J = $[7]),
      ($[7] = $[13]),
      ($[13] = J),
      (J = $[11]),
      ($[11] = $[14]),
      ($[14] = J),
      this
    );
  }
  setPosition($, J, Z) {
    let Q = this.elements;
    if ($.isVector3) ((Q[12] = $.x), (Q[13] = $.y), (Q[14] = $.z));
    else ((Q[12] = $), (Q[13] = J), (Q[14] = Z));
    return this;
  }
  invert() {
    let $ = this.elements,
      J = $[0],
      Z = $[1],
      Q = $[2],
      W = $[3],
      Y = $[4],
      K = $[5],
      X = $[6],
      H = $[7],
      q = $[8],
      U = $[9],
      G = $[10],
      E = $[11],
      F = $[12],
      O = $[13],
      _ = $[14],
      N = $[15],
      V = U * _ * H - O * G * H + O * X * E - K * _ * E - U * X * N + K * G * N,
      k = F * G * H - q * _ * H - F * X * E + Y * _ * E + q * X * N - Y * G * N,
      M = q * O * H - F * U * H + F * K * E - Y * O * E - q * K * N + Y * U * N,
      A = F * U * X - q * O * X - F * K * G + Y * O * G + q * K * _ - Y * U * _,
      L = J * V + Z * k + Q * M + W * A;
    if (L === 0)
      return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    let C = 1 / L;
    return (
      ($[0] = V * C),
      ($[1] =
        (O * G * W -
          U * _ * W -
          O * Q * E +
          Z * _ * E +
          U * Q * N -
          Z * G * N) *
        C),
      ($[2] =
        (K * _ * W -
          O * X * W +
          O * Q * H -
          Z * _ * H -
          K * Q * N +
          Z * X * N) *
        C),
      ($[3] =
        (U * X * W -
          K * G * W -
          U * Q * H +
          Z * G * H +
          K * Q * E -
          Z * X * E) *
        C),
      ($[4] = k * C),
      ($[5] =
        (q * _ * W -
          F * G * W +
          F * Q * E -
          J * _ * E -
          q * Q * N +
          J * G * N) *
        C),
      ($[6] =
        (F * X * W -
          Y * _ * W -
          F * Q * H +
          J * _ * H +
          Y * Q * N -
          J * X * N) *
        C),
      ($[7] =
        (Y * G * W -
          q * X * W +
          q * Q * H -
          J * G * H -
          Y * Q * E +
          J * X * E) *
        C),
      ($[8] = M * C),
      ($[9] =
        (F * U * W -
          q * O * W -
          F * Z * E +
          J * O * E +
          q * Z * N -
          J * U * N) *
        C),
      ($[10] =
        (Y * O * W -
          F * K * W +
          F * Z * H -
          J * O * H -
          Y * Z * N +
          J * K * N) *
        C),
      ($[11] =
        (q * K * W -
          Y * U * W -
          q * Z * H +
          J * U * H +
          Y * Z * E -
          J * K * E) *
        C),
      ($[12] = A * C),
      ($[13] =
        (q * O * Q -
          F * U * Q +
          F * Z * G -
          J * O * G -
          q * Z * _ +
          J * U * _) *
        C),
      ($[14] =
        (F * K * Q -
          Y * O * Q -
          F * Z * X +
          J * O * X +
          Y * Z * _ -
          J * K * _) *
        C),
      ($[15] =
        (Y * U * Q -
          q * K * Q +
          q * Z * X -
          J * U * X -
          Y * Z * G +
          J * K * G) *
        C),
      this
    );
  }
  scale($) {
    let J = this.elements,
      Z = $.x,
      Q = $.y,
      W = $.z;
    return (
      (J[0] *= Z),
      (J[4] *= Q),
      (J[8] *= W),
      (J[1] *= Z),
      (J[5] *= Q),
      (J[9] *= W),
      (J[2] *= Z),
      (J[6] *= Q),
      (J[10] *= W),
      (J[3] *= Z),
      (J[7] *= Q),
      (J[11] *= W),
      this
    );
  }
  getMaxScaleOnAxis() {
    let $ = this.elements,
      J = $[0] * $[0] + $[1] * $[1] + $[2] * $[2],
      Z = $[4] * $[4] + $[5] * $[5] + $[6] * $[6],
      Q = $[8] * $[8] + $[9] * $[9] + $[10] * $[10];
    return Math.sqrt(Math.max(J, Z, Q));
  }
  makeTranslation($, J, Z) {
    if ($.isVector3)
      this.set(1, 0, 0, $.x, 0, 1, 0, $.y, 0, 0, 1, $.z, 0, 0, 0, 1);
    else this.set(1, 0, 0, $, 0, 1, 0, J, 0, 0, 1, Z, 0, 0, 0, 1);
    return this;
  }
  makeRotationX($) {
    let J = Math.cos($),
      Z = Math.sin($);
    return (this.set(1, 0, 0, 0, 0, J, -Z, 0, 0, Z, J, 0, 0, 0, 0, 1), this);
  }
  makeRotationY($) {
    let J = Math.cos($),
      Z = Math.sin($);
    return (this.set(J, 0, Z, 0, 0, 1, 0, 0, -Z, 0, J, 0, 0, 0, 0, 1), this);
  }
  makeRotationZ($) {
    let J = Math.cos($),
      Z = Math.sin($);
    return (this.set(J, -Z, 0, 0, Z, J, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this);
  }
  makeRotationAxis($, J) {
    let Z = Math.cos(J),
      Q = Math.sin(J),
      W = 1 - Z,
      Y = $.x,
      K = $.y,
      X = $.z,
      H = W * Y,
      q = W * K;
    return (
      this.set(
        H * Y + Z,
        H * K - Q * X,
        H * X + Q * K,
        0,
        H * K + Q * X,
        q * K + Z,
        q * X - Q * Y,
        0,
        H * X - Q * K,
        q * X + Q * Y,
        W * X * X + Z,
        0,
        0,
        0,
        0,
        1,
      ),
      this
    );
  }
  makeScale($, J, Z) {
    return (this.set($, 0, 0, 0, 0, J, 0, 0, 0, 0, Z, 0, 0, 0, 0, 1), this);
  }
  makeShear($, J, Z, Q, W, Y) {
    return (this.set(1, Z, W, 0, $, 1, Y, 0, J, Q, 1, 0, 0, 0, 0, 1), this);
  }
  compose($, J, Z) {
    let Q = this.elements,
      W = J._x,
      Y = J._y,
      K = J._z,
      X = J._w,
      H = W + W,
      q = Y + Y,
      U = K + K,
      G = W * H,
      E = W * q,
      F = W * U,
      O = Y * q,
      _ = Y * U,
      N = K * U,
      V = X * H,
      k = X * q,
      M = X * U,
      A = Z.x,
      L = Z.y,
      C = Z.z;
    return (
      (Q[0] = (1 - (O + N)) * A),
      (Q[1] = (E + M) * A),
      (Q[2] = (F - k) * A),
      (Q[3] = 0),
      (Q[4] = (E - M) * L),
      (Q[5] = (1 - (G + N)) * L),
      (Q[6] = (_ + V) * L),
      (Q[7] = 0),
      (Q[8] = (F + k) * C),
      (Q[9] = (_ - V) * C),
      (Q[10] = (1 - (G + O)) * C),
      (Q[11] = 0),
      (Q[12] = $.x),
      (Q[13] = $.y),
      (Q[14] = $.z),
      (Q[15] = 1),
      this
    );
  }
  decompose($, J, Z) {
    let Q = this.elements,
      W = A$.set(Q[0], Q[1], Q[2]).length(),
      Y = A$.set(Q[4], Q[5], Q[6]).length(),
      K = A$.set(Q[8], Q[9], Q[10]).length();
    if (this.determinant() < 0) W = -W;
    (($.x = Q[12]), ($.y = Q[13]), ($.z = Q[14]), b6.copy(this));
    let H = 1 / W,
      q = 1 / Y,
      U = 1 / K;
    return (
      (b6.elements[0] *= H),
      (b6.elements[1] *= H),
      (b6.elements[2] *= H),
      (b6.elements[4] *= q),
      (b6.elements[5] *= q),
      (b6.elements[6] *= q),
      (b6.elements[8] *= U),
      (b6.elements[9] *= U),
      (b6.elements[10] *= U),
      J.setFromRotationMatrix(b6),
      (Z.x = W),
      (Z.y = Y),
      (Z.z = K),
      this
    );
  }
  makePerspective($, J, Z, Q, W, Y, K = 2000) {
    let X = this.elements,
      H = (2 * W) / (J - $),
      q = (2 * W) / (Z - Q),
      U = (J + $) / (J - $),
      G = (Z + Q) / (Z - Q),
      E,
      F;
    if (K === 2000) ((E = -(Y + W) / (Y - W)), (F = (-2 * Y * W) / (Y - W)));
    else if (K === 2001) ((E = -Y / (Y - W)), (F = (-Y * W) / (Y - W)));
    else
      throw Error(
        "THREE.Matrix4.makePerspective(): Invalid coordinate system: " + K,
      );
    return (
      (X[0] = H),
      (X[4] = 0),
      (X[8] = U),
      (X[12] = 0),
      (X[1] = 0),
      (X[5] = q),
      (X[9] = G),
      (X[13] = 0),
      (X[2] = 0),
      (X[6] = 0),
      (X[10] = E),
      (X[14] = F),
      (X[3] = 0),
      (X[7] = 0),
      (X[11] = -1),
      (X[15] = 0),
      this
    );
  }
  makeOrthographic($, J, Z, Q, W, Y, K = 2000) {
    let X = this.elements,
      H = 1 / (J - $),
      q = 1 / (Z - Q),
      U = 1 / (Y - W),
      G = (J + $) * H,
      E = (Z + Q) * q,
      F,
      O;
    if (K === 2000) ((F = (Y + W) * U), (O = -2 * U));
    else if (K === 2001) ((F = W * U), (O = -1 * U));
    else
      throw Error(
        "THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + K,
      );
    return (
      (X[0] = 2 * H),
      (X[4] = 0),
      (X[8] = 0),
      (X[12] = -G),
      (X[1] = 0),
      (X[5] = 2 * q),
      (X[9] = 0),
      (X[13] = -E),
      (X[2] = 0),
      (X[6] = 0),
      (X[10] = O),
      (X[14] = -F),
      (X[3] = 0),
      (X[7] = 0),
      (X[11] = 0),
      (X[15] = 1),
      this
    );
  }
  equals($) {
    let J = this.elements,
      Z = $.elements;
    for (let Q = 0; Q < 16; Q++) if (J[Q] !== Z[Q]) return !1;
    return !0;
  }
  fromArray($, J = 0) {
    for (let Z = 0; Z < 16; Z++) this.elements[Z] = $[Z + J];
    return this;
  }
  toArray($ = [], J = 0) {
    let Z = this.elements;
    return (
      ($[J] = Z[0]),
      ($[J + 1] = Z[1]),
      ($[J + 2] = Z[2]),
      ($[J + 3] = Z[3]),
      ($[J + 4] = Z[4]),
      ($[J + 5] = Z[5]),
      ($[J + 6] = Z[6]),
      ($[J + 7] = Z[7]),
      ($[J + 8] = Z[8]),
      ($[J + 9] = Z[9]),
      ($[J + 10] = Z[10]),
      ($[J + 11] = Z[11]),
      ($[J + 12] = Z[12]),
      ($[J + 13] = Z[13]),
      ($[J + 14] = Z[14]),
      ($[J + 15] = Z[15]),
      $
    );
  }
}
var A$ = new S(),
  b6 = new $6(),
  s9 = new S(0, 0, 0),
  i9 = new S(1, 1, 1),
  Y$ = new S(),
  C5 = new S(),
  k6 = new S(),
  PJ = new $6(),
  TJ = new l6();
class o5 {
  constructor($ = 0, J = 0, Z = 0, Q = o5.DEFAULT_ORDER) {
    ((this.isEuler = !0),
      (this._x = $),
      (this._y = J),
      (this._z = Z),
      (this._order = Q));
  }
  get x() {
    return this._x;
  }
  set x($) {
    ((this._x = $), this._onChangeCallback());
  }
  get y() {
    return this._y;
  }
  set y($) {
    ((this._y = $), this._onChangeCallback());
  }
  get z() {
    return this._z;
  }
  set z($) {
    ((this._z = $), this._onChangeCallback());
  }
  get order() {
    return this._order;
  }
  set order($) {
    ((this._order = $), this._onChangeCallback());
  }
  set($, J, Z, Q = this._order) {
    return (
      (this._x = $),
      (this._y = J),
      (this._z = Z),
      (this._order = Q),
      this._onChangeCallback(),
      this
    );
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy($) {
    return (
      (this._x = $._x),
      (this._y = $._y),
      (this._z = $._z),
      (this._order = $._order),
      this._onChangeCallback(),
      this
    );
  }
  setFromRotationMatrix($, J = this._order, Z = !0) {
    let Q = $.elements,
      W = Q[0],
      Y = Q[4],
      K = Q[8],
      X = Q[1],
      H = Q[5],
      q = Q[9],
      U = Q[2],
      G = Q[6],
      E = Q[10];
    switch (J) {
      case "XYZ":
        if (((this._y = Math.asin(F6(K, -1, 1))), Math.abs(K) < 0.9999999))
          ((this._x = Math.atan2(-q, E)), (this._z = Math.atan2(-Y, W)));
        else ((this._x = Math.atan2(G, H)), (this._z = 0));
        break;
      case "YXZ":
        if (((this._x = Math.asin(-F6(q, -1, 1))), Math.abs(q) < 0.9999999))
          ((this._y = Math.atan2(K, E)), (this._z = Math.atan2(X, H)));
        else ((this._y = Math.atan2(-U, W)), (this._z = 0));
        break;
      case "ZXY":
        if (((this._x = Math.asin(F6(G, -1, 1))), Math.abs(G) < 0.9999999))
          ((this._y = Math.atan2(-U, E)), (this._z = Math.atan2(-Y, H)));
        else ((this._y = 0), (this._z = Math.atan2(X, W)));
        break;
      case "ZYX":
        if (((this._y = Math.asin(-F6(U, -1, 1))), Math.abs(U) < 0.9999999))
          ((this._x = Math.atan2(G, E)), (this._z = Math.atan2(X, W)));
        else ((this._x = 0), (this._z = Math.atan2(-Y, H)));
        break;
      case "YZX":
        if (((this._z = Math.asin(F6(X, -1, 1))), Math.abs(X) < 0.9999999))
          ((this._x = Math.atan2(-q, H)), (this._y = Math.atan2(-U, W)));
        else ((this._x = 0), (this._y = Math.atan2(K, E)));
        break;
      case "XZY":
        if (((this._z = Math.asin(-F6(Y, -1, 1))), Math.abs(Y) < 0.9999999))
          ((this._x = Math.atan2(G, H)), (this._y = Math.atan2(K, W)));
        else ((this._x = Math.atan2(-q, E)), (this._y = 0));
        break;
      default:
        console.warn(
          "THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " +
            J,
        );
    }
    if (((this._order = J), Z === !0)) this._onChangeCallback();
    return this;
  }
  setFromQuaternion($, J, Z) {
    return (
      PJ.makeRotationFromQuaternion($),
      this.setFromRotationMatrix(PJ, J, Z)
    );
  }
  setFromVector3($, J = this._order) {
    return this.set($.x, $.y, $.z, J);
  }
  reorder($) {
    return (TJ.setFromEuler(this), this.setFromQuaternion(TJ, $));
  }
  equals($) {
    return (
      $._x === this._x &&
      $._y === this._y &&
      $._z === this._z &&
      $._order === this._order
    );
  }
  fromArray($) {
    if (((this._x = $[0]), (this._y = $[1]), (this._z = $[2]), $[3] !== void 0))
      this._order = $[3];
    return (this._onChangeCallback(), this);
  }
  toArray($ = [], J = 0) {
    return (
      ($[J] = this._x),
      ($[J + 1] = this._y),
      ($[J + 2] = this._z),
      ($[J + 3] = this._order),
      $
    );
  }
  _onChange($) {
    return ((this._onChangeCallback = $), this);
  }
  _onChangeCallback() {}
  *[Symbol.iterator]() {
    (yield this._x, yield this._y, yield this._z, yield this._order);
  }
}
o5.DEFAULT_ORDER = "XYZ";
class l8 {
  constructor() {
    this.mask = 1;
  }
  set($) {
    this.mask = ((1 << $) | 0) >>> 0;
  }
  enable($) {
    this.mask |= (1 << $) | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle($) {
    this.mask ^= (1 << $) | 0;
  }
  disable($) {
    this.mask &= ~((1 << $) | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test($) {
    return (this.mask & $.mask) !== 0;
  }
  isEnabled($) {
    return (this.mask & ((1 << $) | 0)) !== 0;
  }
}
var o9 = 0,
  SJ = new S(),
  P$ = new l6(),
  a6 = new $6(),
  M5 = new S(),
  e$ = new S(),
  r9 = new S(),
  a9 = new l6(),
  fJ = new S(1, 0, 0),
  bJ = new S(0, 1, 0),
  jJ = new S(0, 0, 1),
  t9 = { type: "added" },
  e9 = { type: "removed" };
class E6 extends J$ {
  constructor() {
    super();
    ((this.isObject3D = !0),
      Object.defineProperty(this, "id", { value: o9++ }),
      (this.uuid = $$()),
      (this.name = ""),
      (this.type = "Object3D"),
      (this.parent = null),
      (this.children = []),
      (this.up = E6.DEFAULT_UP.clone()));
    let $ = new S(),
      J = new o5(),
      Z = new l6(),
      Q = new S(1, 1, 1);
    function W() {
      Z.setFromEuler(J, !1);
    }
    function Y() {
      J.setFromQuaternion(Z, void 0, !1);
    }
    (J._onChange(W),
      Z._onChange(Y),
      Object.defineProperties(this, {
        position: { configurable: !0, enumerable: !0, value: $ },
        rotation: { configurable: !0, enumerable: !0, value: J },
        quaternion: { configurable: !0, enumerable: !0, value: Z },
        scale: { configurable: !0, enumerable: !0, value: Q },
        modelViewMatrix: { value: new $6() },
        normalMatrix: { value: new f0() },
      }),
      (this.matrix = new $6()),
      (this.matrixWorld = new $6()),
      (this.matrixAutoUpdate = E6.DEFAULT_MATRIX_AUTO_UPDATE),
      (this.matrixWorldNeedsUpdate = !1),
      (this.matrixWorldAutoUpdate = E6.DEFAULT_MATRIX_WORLD_AUTO_UPDATE),
      (this.layers = new l8()),
      (this.visible = !0),
      (this.castShadow = !1),
      (this.receiveShadow = !1),
      (this.frustumCulled = !0),
      (this.renderOrder = 0),
      (this.animations = []),
      (this.userData = {}));
  }
  onBeforeRender() {}
  onAfterRender() {}
  applyMatrix4($) {
    if (this.matrixAutoUpdate) this.updateMatrix();
    (this.matrix.premultiply($),
      this.matrix.decompose(this.position, this.quaternion, this.scale));
  }
  applyQuaternion($) {
    return (this.quaternion.premultiply($), this);
  }
  setRotationFromAxisAngle($, J) {
    this.quaternion.setFromAxisAngle($, J);
  }
  setRotationFromEuler($) {
    this.quaternion.setFromEuler($, !0);
  }
  setRotationFromMatrix($) {
    this.quaternion.setFromRotationMatrix($);
  }
  setRotationFromQuaternion($) {
    this.quaternion.copy($);
  }
  rotateOnAxis($, J) {
    return (P$.setFromAxisAngle($, J), this.quaternion.multiply(P$), this);
  }
  rotateOnWorldAxis($, J) {
    return (P$.setFromAxisAngle($, J), this.quaternion.premultiply(P$), this);
  }
  rotateX($) {
    return this.rotateOnAxis(fJ, $);
  }
  rotateY($) {
    return this.rotateOnAxis(bJ, $);
  }
  rotateZ($) {
    return this.rotateOnAxis(jJ, $);
  }
  translateOnAxis($, J) {
    return (
      SJ.copy($).applyQuaternion(this.quaternion),
      this.position.add(SJ.multiplyScalar(J)),
      this
    );
  }
  translateX($) {
    return this.translateOnAxis(fJ, $);
  }
  translateY($) {
    return this.translateOnAxis(bJ, $);
  }
  translateZ($) {
    return this.translateOnAxis(jJ, $);
  }
  localToWorld($) {
    return (this.updateWorldMatrix(!0, !1), $.applyMatrix4(this.matrixWorld));
  }
  worldToLocal($) {
    return (
      this.updateWorldMatrix(!0, !1),
      $.applyMatrix4(a6.copy(this.matrixWorld).invert())
    );
  }
  lookAt($, J, Z) {
    if ($.isVector3) M5.copy($);
    else M5.set($, J, Z);
    let Q = this.parent;
    if (
      (this.updateWorldMatrix(!0, !1),
      e$.setFromMatrixPosition(this.matrixWorld),
      this.isCamera || this.isLight)
    )
      a6.lookAt(e$, M5, this.up);
    else a6.lookAt(M5, e$, this.up);
    if ((this.quaternion.setFromRotationMatrix(a6), Q))
      (a6.extractRotation(Q.matrixWorld),
        P$.setFromRotationMatrix(a6),
        this.quaternion.premultiply(P$.invert()));
  }
  add($) {
    if (arguments.length > 1) {
      for (let J = 0; J < arguments.length; J++) this.add(arguments[J]);
      return this;
    }
    if ($ === this)
      return (
        console.error(
          "THREE.Object3D.add: object can't be added as a child of itself.",
          $,
        ),
        this
      );
    if ($ && $.isObject3D) {
      if ($.parent !== null) $.parent.remove($);
      (($.parent = this), this.children.push($), $.dispatchEvent(t9));
    } else
      console.error(
        "THREE.Object3D.add: object not an instance of THREE.Object3D.",
        $,
      );
    return this;
  }
  remove($) {
    if (arguments.length > 1) {
      for (let Z = 0; Z < arguments.length; Z++) this.remove(arguments[Z]);
      return this;
    }
    let J = this.children.indexOf($);
    if (J !== -1)
      (($.parent = null), this.children.splice(J, 1), $.dispatchEvent(e9));
    return this;
  }
  removeFromParent() {
    let $ = this.parent;
    if ($ !== null) $.remove(this);
    return this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach($) {
    if (
      (this.updateWorldMatrix(!0, !1),
      a6.copy(this.matrixWorld).invert(),
      $.parent !== null)
    )
      ($.parent.updateWorldMatrix(!0, !1), a6.multiply($.parent.matrixWorld));
    return ($.applyMatrix4(a6), this.add($), $.updateWorldMatrix(!1, !0), this);
  }
  getObjectById($) {
    return this.getObjectByProperty("id", $);
  }
  getObjectByName($) {
    return this.getObjectByProperty("name", $);
  }
  getObjectByProperty($, J) {
    if (this[$] === J) return this;
    for (let Z = 0, Q = this.children.length; Z < Q; Z++) {
      let Y = this.children[Z].getObjectByProperty($, J);
      if (Y !== void 0) return Y;
    }
    return;
  }
  getObjectsByProperty($, J) {
    let Z = [];
    if (this[$] === J) Z.push(this);
    for (let Q = 0, W = this.children.length; Q < W; Q++) {
      let Y = this.children[Q].getObjectsByProperty($, J);
      if (Y.length > 0) Z = Z.concat(Y);
    }
    return Z;
  }
  getWorldPosition($) {
    return (
      this.updateWorldMatrix(!0, !1),
      $.setFromMatrixPosition(this.matrixWorld)
    );
  }
  getWorldQuaternion($) {
    return (
      this.updateWorldMatrix(!0, !1),
      this.matrixWorld.decompose(e$, $, r9),
      $
    );
  }
  getWorldScale($) {
    return (
      this.updateWorldMatrix(!0, !1),
      this.matrixWorld.decompose(e$, a9, $),
      $
    );
  }
  getWorldDirection($) {
    this.updateWorldMatrix(!0, !1);
    let J = this.matrixWorld.elements;
    return $.set(J[8], J[9], J[10]).normalize();
  }
  raycast() {}
  traverse($) {
    $(this);
    let J = this.children;
    for (let Z = 0, Q = J.length; Z < Q; Z++) J[Z].traverse($);
  }
  traverseVisible($) {
    if (this.visible === !1) return;
    $(this);
    let J = this.children;
    for (let Z = 0, Q = J.length; Z < Q; Z++) J[Z].traverseVisible($);
  }
  traverseAncestors($) {
    let J = this.parent;
    if (J !== null) ($(J), J.traverseAncestors($));
  }
  updateMatrix() {
    (this.matrix.compose(this.position, this.quaternion, this.scale),
      (this.matrixWorldNeedsUpdate = !0));
  }
  updateMatrixWorld($) {
    if (this.matrixAutoUpdate) this.updateMatrix();
    if (this.matrixWorldNeedsUpdate || $) {
      if (this.parent === null) this.matrixWorld.copy(this.matrix);
      else
        this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
      ((this.matrixWorldNeedsUpdate = !1), ($ = !0));
    }
    let J = this.children;
    for (let Z = 0, Q = J.length; Z < Q; Z++) {
      let W = J[Z];
      if (W.matrixWorldAutoUpdate === !0 || $ === !0) W.updateMatrixWorld($);
    }
  }
  updateWorldMatrix($, J) {
    let Z = this.parent;
    if ($ === !0 && Z !== null && Z.matrixWorldAutoUpdate === !0)
      Z.updateWorldMatrix(!0, !1);
    if (this.matrixAutoUpdate) this.updateMatrix();
    if (this.parent === null) this.matrixWorld.copy(this.matrix);
    else
      this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
    if (J === !0) {
      let Q = this.children;
      for (let W = 0, Y = Q.length; W < Y; W++) {
        let K = Q[W];
        if (K.matrixWorldAutoUpdate === !0) K.updateWorldMatrix(!1, !0);
      }
    }
  }
  toJSON($) {
    let J = $ === void 0 || typeof $ === "string",
      Z = {};
    if (J)
      (($ = {
        geometries: {},
        materials: {},
        textures: {},
        images: {},
        shapes: {},
        skeletons: {},
        animations: {},
        nodes: {},
      }),
        (Z.metadata = {
          version: 4.6,
          type: "Object",
          generator: "Object3D.toJSON",
        }));
    let Q = {};
    if (((Q.uuid = this.uuid), (Q.type = this.type), this.name !== ""))
      Q.name = this.name;
    if (this.castShadow === !0) Q.castShadow = !0;
    if (this.receiveShadow === !0) Q.receiveShadow = !0;
    if (this.visible === !1) Q.visible = !1;
    if (this.frustumCulled === !1) Q.frustumCulled = !1;
    if (this.renderOrder !== 0) Q.renderOrder = this.renderOrder;
    if (Object.keys(this.userData).length > 0) Q.userData = this.userData;
    if (
      ((Q.layers = this.layers.mask),
      (Q.matrix = this.matrix.toArray()),
      (Q.up = this.up.toArray()),
      this.matrixAutoUpdate === !1)
    )
      Q.matrixAutoUpdate = !1;
    if (this.isInstancedMesh) {
      if (
        ((Q.type = "InstancedMesh"),
        (Q.count = this.count),
        (Q.instanceMatrix = this.instanceMatrix.toJSON()),
        this.instanceColor !== null)
      )
        Q.instanceColor = this.instanceColor.toJSON();
    }
    function W(K, X) {
      if (K[X.uuid] === void 0) K[X.uuid] = X.toJSON($);
      return X.uuid;
    }
    if (this.isScene) {
      if (this.background) {
        if (this.background.isColor) Q.background = this.background.toJSON();
        else if (this.background.isTexture)
          Q.background = this.background.toJSON($).uuid;
      }
      if (
        this.environment &&
        this.environment.isTexture &&
        this.environment.isRenderTargetTexture !== !0
      )
        Q.environment = this.environment.toJSON($).uuid;
    } else if (this.isMesh || this.isLine || this.isPoints) {
      Q.geometry = W($.geometries, this.geometry);
      let K = this.geometry.parameters;
      if (K !== void 0 && K.shapes !== void 0) {
        let X = K.shapes;
        if (Array.isArray(X))
          for (let H = 0, q = X.length; H < q; H++) {
            let U = X[H];
            W($.shapes, U);
          }
        else W($.shapes, X);
      }
    }
    if (this.isSkinnedMesh) {
      if (
        ((Q.bindMode = this.bindMode),
        (Q.bindMatrix = this.bindMatrix.toArray()),
        this.skeleton !== void 0)
      )
        (W($.skeletons, this.skeleton), (Q.skeleton = this.skeleton.uuid));
    }
    if (this.material !== void 0)
      if (Array.isArray(this.material)) {
        let K = [];
        for (let X = 0, H = this.material.length; X < H; X++)
          K.push(W($.materials, this.material[X]));
        Q.material = K;
      } else Q.material = W($.materials, this.material);
    if (this.children.length > 0) {
      Q.children = [];
      for (let K = 0; K < this.children.length; K++)
        Q.children.push(this.children[K].toJSON($).object);
    }
    if (this.animations.length > 0) {
      Q.animations = [];
      for (let K = 0; K < this.animations.length; K++) {
        let X = this.animations[K];
        Q.animations.push(W($.animations, X));
      }
    }
    if (J) {
      let K = Y($.geometries),
        X = Y($.materials),
        H = Y($.textures),
        q = Y($.images),
        U = Y($.shapes),
        G = Y($.skeletons),
        E = Y($.animations),
        F = Y($.nodes);
      if (K.length > 0) Z.geometries = K;
      if (X.length > 0) Z.materials = X;
      if (H.length > 0) Z.textures = H;
      if (q.length > 0) Z.images = q;
      if (U.length > 0) Z.shapes = U;
      if (G.length > 0) Z.skeletons = G;
      if (E.length > 0) Z.animations = E;
      if (F.length > 0) Z.nodes = F;
    }
    return ((Z.object = Q), Z);
    function Y(K) {
      let X = [];
      for (let H in K) {
        let q = K[H];
        (delete q.metadata, X.push(q));
      }
      return X;
    }
  }
  clone($) {
    return new this.constructor().copy(this, $);
  }
  copy($, J = !0) {
    if (
      ((this.name = $.name),
      this.up.copy($.up),
      this.position.copy($.position),
      (this.rotation.order = $.rotation.order),
      this.quaternion.copy($.quaternion),
      this.scale.copy($.scale),
      this.matrix.copy($.matrix),
      this.matrixWorld.copy($.matrixWorld),
      (this.matrixAutoUpdate = $.matrixAutoUpdate),
      (this.matrixWorldNeedsUpdate = $.matrixWorldNeedsUpdate),
      (this.matrixWorldAutoUpdate = $.matrixWorldAutoUpdate),
      (this.layers.mask = $.layers.mask),
      (this.visible = $.visible),
      (this.castShadow = $.castShadow),
      (this.receiveShadow = $.receiveShadow),
      (this.frustumCulled = $.frustumCulled),
      (this.renderOrder = $.renderOrder),
      (this.animations = $.animations.slice()),
      (this.userData = JSON.parse(JSON.stringify($.userData))),
      J === !0)
    )
      for (let Z = 0; Z < $.children.length; Z++) {
        let Q = $.children[Z];
        this.add(Q.clone());
      }
    return this;
  }
}
E6.DEFAULT_UP = new S(0, 1, 0);
E6.DEFAULT_MATRIX_AUTO_UPDATE = !0;
E6.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
var j6 = new S(),
  t6 = new S(),
  I8 = new S(),
  e6 = new S(),
  T$ = new S(),
  S$ = new S(),
  yJ = new S(),
  C8 = new S(),
  M8 = new S(),
  k8 = new S(),
  k5 = !1;
class T6 {
  constructor($ = new S(), J = new S(), Z = new S()) {
    ((this.a = $), (this.b = J), (this.c = Z));
  }
  static getNormal($, J, Z, Q) {
    (Q.subVectors(Z, J), j6.subVectors($, J), Q.cross(j6));
    let W = Q.lengthSq();
    if (W > 0) return Q.multiplyScalar(1 / Math.sqrt(W));
    return Q.set(0, 0, 0);
  }
  static getBarycoord($, J, Z, Q, W) {
    (j6.subVectors(Q, J), t6.subVectors(Z, J), I8.subVectors($, J));
    let Y = j6.dot(j6),
      K = j6.dot(t6),
      X = j6.dot(I8),
      H = t6.dot(t6),
      q = t6.dot(I8),
      U = Y * H - K * K;
    if (U === 0) return W.set(-2, -1, -1);
    let G = 1 / U,
      E = (H * X - K * q) * G,
      F = (Y * q - K * X) * G;
    return W.set(1 - E - F, F, E);
  }
  static containsPoint($, J, Z, Q) {
    return (
      this.getBarycoord($, J, Z, Q, e6),
      e6.x >= 0 && e6.y >= 0 && e6.x + e6.y <= 1
    );
  }
  static getUV($, J, Z, Q, W, Y, K, X) {
    if (k5 === !1)
      (console.warn(
        "THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation().",
      ),
        (k5 = !0));
    return this.getInterpolation($, J, Z, Q, W, Y, K, X);
  }
  static getInterpolation($, J, Z, Q, W, Y, K, X) {
    return (
      this.getBarycoord($, J, Z, Q, e6),
      X.setScalar(0),
      X.addScaledVector(W, e6.x),
      X.addScaledVector(Y, e6.y),
      X.addScaledVector(K, e6.z),
      X
    );
  }
  static isFrontFacing($, J, Z, Q) {
    return (
      j6.subVectors(Z, J),
      t6.subVectors($, J),
      j6.cross(t6).dot(Q) < 0 ? !0 : !1
    );
  }
  set($, J, Z) {
    return (this.a.copy($), this.b.copy(J), this.c.copy(Z), this);
  }
  setFromPointsAndIndices($, J, Z, Q) {
    return (this.a.copy($[J]), this.b.copy($[Z]), this.c.copy($[Q]), this);
  }
  setFromAttributeAndIndices($, J, Z, Q) {
    return (
      this.a.fromBufferAttribute($, J),
      this.b.fromBufferAttribute($, Z),
      this.c.fromBufferAttribute($, Q),
      this
    );
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy($) {
    return (this.a.copy($.a), this.b.copy($.b), this.c.copy($.c), this);
  }
  getArea() {
    return (
      j6.subVectors(this.c, this.b),
      t6.subVectors(this.a, this.b),
      j6.cross(t6).length() * 0.5
    );
  }
  getMidpoint($) {
    return $.addVectors(this.a, this.b)
      .add(this.c)
      .multiplyScalar(0.3333333333333333);
  }
  getNormal($) {
    return T6.getNormal(this.a, this.b, this.c, $);
  }
  getPlane($) {
    return $.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord($, J) {
    return T6.getBarycoord($, this.a, this.b, this.c, J);
  }
  getUV($, J, Z, Q, W) {
    if (k5 === !1)
      (console.warn(
        "THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation().",
      ),
        (k5 = !0));
    return T6.getInterpolation($, this.a, this.b, this.c, J, Z, Q, W);
  }
  getInterpolation($, J, Z, Q, W) {
    return T6.getInterpolation($, this.a, this.b, this.c, J, Z, Q, W);
  }
  containsPoint($) {
    return T6.containsPoint($, this.a, this.b, this.c);
  }
  isFrontFacing($) {
    return T6.isFrontFacing(this.a, this.b, this.c, $);
  }
  intersectsBox($) {
    return $.intersectsTriangle(this);
  }
  closestPointToPoint($, J) {
    let Z = this.a,
      Q = this.b,
      W = this.c,
      Y,
      K;
    (T$.subVectors(Q, Z), S$.subVectors(W, Z), C8.subVectors($, Z));
    let X = T$.dot(C8),
      H = S$.dot(C8);
    if (X <= 0 && H <= 0) return J.copy(Z);
    M8.subVectors($, Q);
    let q = T$.dot(M8),
      U = S$.dot(M8);
    if (q >= 0 && U <= q) return J.copy(Q);
    let G = X * U - q * H;
    if (G <= 0 && X >= 0 && q <= 0)
      return ((Y = X / (X - q)), J.copy(Z).addScaledVector(T$, Y));
    k8.subVectors($, W);
    let E = T$.dot(k8),
      F = S$.dot(k8);
    if (F >= 0 && E <= F) return J.copy(W);
    let O = E * H - X * F;
    if (O <= 0 && H >= 0 && F <= 0)
      return ((K = H / (H - F)), J.copy(Z).addScaledVector(S$, K));
    let _ = q * F - E * U;
    if (_ <= 0 && U - q >= 0 && E - F >= 0)
      return (
        yJ.subVectors(W, Q),
        (K = (U - q) / (U - q + (E - F))),
        J.copy(Q).addScaledVector(yJ, K)
      );
    let N = 1 / (_ + O + G);
    return (
      (Y = O * N),
      (K = G * N),
      J.copy(Z).addScaledVector(T$, Y).addScaledVector(S$, K)
    );
  }
  equals($) {
    return $.a.equals(this.a) && $.b.equals(this.b) && $.c.equals(this.c);
  }
}
var $Z = 0;
class _$ extends J$ {
  constructor() {
    super();
    ((this.isMaterial = !0),
      Object.defineProperty(this, "id", { value: $Z++ }),
      (this.uuid = $$()),
      (this.name = ""),
      (this.type = "Material"),
      (this.blending = 1),
      (this.side = 0),
      (this.vertexColors = !1),
      (this.opacity = 1),
      (this.transparent = !1),
      (this.alphaHash = !1),
      (this.blendSrc = 204),
      (this.blendDst = 205),
      (this.blendEquation = 100),
      (this.blendSrcAlpha = null),
      (this.blendDstAlpha = null),
      (this.blendEquationAlpha = null),
      (this.depthFunc = 3),
      (this.depthTest = !0),
      (this.depthWrite = !0),
      (this.stencilWriteMask = 255),
      (this.stencilFunc = 519),
      (this.stencilRef = 0),
      (this.stencilFuncMask = 255),
      (this.stencilFail = 7680),
      (this.stencilZFail = 7680),
      (this.stencilZPass = 7680),
      (this.stencilWrite = !1),
      (this.clippingPlanes = null),
      (this.clipIntersection = !1),
      (this.clipShadows = !1),
      (this.shadowSide = null),
      (this.colorWrite = !0),
      (this.precision = null),
      (this.polygonOffset = !1),
      (this.polygonOffsetFactor = 0),
      (this.polygonOffsetUnits = 0),
      (this.dithering = !1),
      (this.alphaToCoverage = !1),
      (this.premultipliedAlpha = !1),
      (this.forceSinglePass = !1),
      (this.visible = !0),
      (this.toneMapped = !0),
      (this.userData = {}),
      (this.version = 0),
      (this._alphaTest = 0));
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest($) {
    if (this._alphaTest > 0 !== $ > 0) this.version++;
    this._alphaTest = $;
  }
  onBuild() {}
  onBeforeRender() {}
  onBeforeCompile() {}
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues($) {
    if ($ === void 0) return;
    for (let J in $) {
      let Z = $[J];
      if (Z === void 0) {
        console.warn(
          `THREE.Material: parameter '${J}' has value of undefined.`,
        );
        continue;
      }
      let Q = this[J];
      if (Q === void 0) {
        console.warn(
          `THREE.Material: '${J}' is not a property of THREE.${this.type}.`,
        );
        continue;
      }
      if (Q && Q.isColor) Q.set(Z);
      else if (Q && Q.isVector3 && Z && Z.isVector3) Q.copy(Z);
      else this[J] = Z;
    }
  }
  toJSON($) {
    let J = $ === void 0 || typeof $ === "string";
    if (J) $ = { textures: {}, images: {} };
    let Z = {
      metadata: {
        version: 4.6,
        type: "Material",
        generator: "Material.toJSON",
      },
    };
    if (((Z.uuid = this.uuid), (Z.type = this.type), this.name !== ""))
      Z.name = this.name;
    if (this.color && this.color.isColor) Z.color = this.color.getHex();
    if (this.roughness !== void 0) Z.roughness = this.roughness;
    if (this.metalness !== void 0) Z.metalness = this.metalness;
    if (this.sheen !== void 0) Z.sheen = this.sheen;
    if (this.sheenColor && this.sheenColor.isColor)
      Z.sheenColor = this.sheenColor.getHex();
    if (this.sheenRoughness !== void 0) Z.sheenRoughness = this.sheenRoughness;
    if (this.emissive && this.emissive.isColor)
      Z.emissive = this.emissive.getHex();
    if (this.emissiveIntensity && this.emissiveIntensity !== 1)
      Z.emissiveIntensity = this.emissiveIntensity;
    if (this.specular && this.specular.isColor)
      Z.specular = this.specular.getHex();
    if (this.specularIntensity !== void 0)
      Z.specularIntensity = this.specularIntensity;
    if (this.specularColor && this.specularColor.isColor)
      Z.specularColor = this.specularColor.getHex();
    if (this.shininess !== void 0) Z.shininess = this.shininess;
    if (this.clearcoat !== void 0) Z.clearcoat = this.clearcoat;
    if (this.clearcoatRoughness !== void 0)
      Z.clearcoatRoughness = this.clearcoatRoughness;
    if (this.clearcoatMap && this.clearcoatMap.isTexture)
      Z.clearcoatMap = this.clearcoatMap.toJSON($).uuid;
    if (this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture)
      Z.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON($).uuid;
    if (this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture)
      ((Z.clearcoatNormalMap = this.clearcoatNormalMap.toJSON($).uuid),
        (Z.clearcoatNormalScale = this.clearcoatNormalScale.toArray()));
    if (this.iridescence !== void 0) Z.iridescence = this.iridescence;
    if (this.iridescenceIOR !== void 0) Z.iridescenceIOR = this.iridescenceIOR;
    if (this.iridescenceThicknessRange !== void 0)
      Z.iridescenceThicknessRange = this.iridescenceThicknessRange;
    if (this.iridescenceMap && this.iridescenceMap.isTexture)
      Z.iridescenceMap = this.iridescenceMap.toJSON($).uuid;
    if (this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture)
      Z.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON($).uuid;
    if (this.anisotropy !== void 0) Z.anisotropy = this.anisotropy;
    if (this.anisotropyRotation !== void 0)
      Z.anisotropyRotation = this.anisotropyRotation;
    if (this.anisotropyMap && this.anisotropyMap.isTexture)
      Z.anisotropyMap = this.anisotropyMap.toJSON($).uuid;
    if (this.map && this.map.isTexture) Z.map = this.map.toJSON($).uuid;
    if (this.matcap && this.matcap.isTexture)
      Z.matcap = this.matcap.toJSON($).uuid;
    if (this.alphaMap && this.alphaMap.isTexture)
      Z.alphaMap = this.alphaMap.toJSON($).uuid;
    if (this.lightMap && this.lightMap.isTexture)
      ((Z.lightMap = this.lightMap.toJSON($).uuid),
        (Z.lightMapIntensity = this.lightMapIntensity));
    if (this.aoMap && this.aoMap.isTexture)
      ((Z.aoMap = this.aoMap.toJSON($).uuid),
        (Z.aoMapIntensity = this.aoMapIntensity));
    if (this.bumpMap && this.bumpMap.isTexture)
      ((Z.bumpMap = this.bumpMap.toJSON($).uuid),
        (Z.bumpScale = this.bumpScale));
    if (this.normalMap && this.normalMap.isTexture)
      ((Z.normalMap = this.normalMap.toJSON($).uuid),
        (Z.normalMapType = this.normalMapType),
        (Z.normalScale = this.normalScale.toArray()));
    if (this.displacementMap && this.displacementMap.isTexture)
      ((Z.displacementMap = this.displacementMap.toJSON($).uuid),
        (Z.displacementScale = this.displacementScale),
        (Z.displacementBias = this.displacementBias));
    if (this.roughnessMap && this.roughnessMap.isTexture)
      Z.roughnessMap = this.roughnessMap.toJSON($).uuid;
    if (this.metalnessMap && this.metalnessMap.isTexture)
      Z.metalnessMap = this.metalnessMap.toJSON($).uuid;
    if (this.emissiveMap && this.emissiveMap.isTexture)
      Z.emissiveMap = this.emissiveMap.toJSON($).uuid;
    if (this.specularMap && this.specularMap.isTexture)
      Z.specularMap = this.specularMap.toJSON($).uuid;
    if (this.specularIntensityMap && this.specularIntensityMap.isTexture)
      Z.specularIntensityMap = this.specularIntensityMap.toJSON($).uuid;
    if (this.specularColorMap && this.specularColorMap.isTexture)
      Z.specularColorMap = this.specularColorMap.toJSON($).uuid;
    if (this.envMap && this.envMap.isTexture) {
      if (((Z.envMap = this.envMap.toJSON($).uuid), this.combine !== void 0))
        Z.combine = this.combine;
    }
    if (this.envMapIntensity !== void 0)
      Z.envMapIntensity = this.envMapIntensity;
    if (this.reflectivity !== void 0) Z.reflectivity = this.reflectivity;
    if (this.refractionRatio !== void 0)
      Z.refractionRatio = this.refractionRatio;
    if (this.gradientMap && this.gradientMap.isTexture)
      Z.gradientMap = this.gradientMap.toJSON($).uuid;
    if (this.transmission !== void 0) Z.transmission = this.transmission;
    if (this.transmissionMap && this.transmissionMap.isTexture)
      Z.transmissionMap = this.transmissionMap.toJSON($).uuid;
    if (this.thickness !== void 0) Z.thickness = this.thickness;
    if (this.thicknessMap && this.thicknessMap.isTexture)
      Z.thicknessMap = this.thicknessMap.toJSON($).uuid;
    if (
      this.attenuationDistance !== void 0 &&
      this.attenuationDistance !== 1 / 0
    )
      Z.attenuationDistance = this.attenuationDistance;
    if (this.attenuationColor !== void 0)
      Z.attenuationColor = this.attenuationColor.getHex();
    if (this.size !== void 0) Z.size = this.size;
    if (this.shadowSide !== null) Z.shadowSide = this.shadowSide;
    if (this.sizeAttenuation !== void 0)
      Z.sizeAttenuation = this.sizeAttenuation;
    if (this.blending !== 1) Z.blending = this.blending;
    if (this.side !== 0) Z.side = this.side;
    if (this.vertexColors) Z.vertexColors = !0;
    if (this.opacity < 1) Z.opacity = this.opacity;
    if (this.transparent === !0) Z.transparent = this.transparent;
    if (
      ((Z.depthFunc = this.depthFunc),
      (Z.depthTest = this.depthTest),
      (Z.depthWrite = this.depthWrite),
      (Z.colorWrite = this.colorWrite),
      (Z.stencilWrite = this.stencilWrite),
      (Z.stencilWriteMask = this.stencilWriteMask),
      (Z.stencilFunc = this.stencilFunc),
      (Z.stencilRef = this.stencilRef),
      (Z.stencilFuncMask = this.stencilFuncMask),
      (Z.stencilFail = this.stencilFail),
      (Z.stencilZFail = this.stencilZFail),
      (Z.stencilZPass = this.stencilZPass),
      this.rotation !== void 0 && this.rotation !== 0)
    )
      Z.rotation = this.rotation;
    if (this.polygonOffset === !0) Z.polygonOffset = !0;
    if (this.polygonOffsetFactor !== 0)
      Z.polygonOffsetFactor = this.polygonOffsetFactor;
    if (this.polygonOffsetUnits !== 0)
      Z.polygonOffsetUnits = this.polygonOffsetUnits;
    if (this.linewidth !== void 0 && this.linewidth !== 1)
      Z.linewidth = this.linewidth;
    if (this.dashSize !== void 0) Z.dashSize = this.dashSize;
    if (this.gapSize !== void 0) Z.gapSize = this.gapSize;
    if (this.scale !== void 0) Z.scale = this.scale;
    if (this.dithering === !0) Z.dithering = !0;
    if (this.alphaTest > 0) Z.alphaTest = this.alphaTest;
    if (this.alphaHash === !0) Z.alphaHash = this.alphaHash;
    if (this.alphaToCoverage === !0) Z.alphaToCoverage = this.alphaToCoverage;
    if (this.premultipliedAlpha === !0)
      Z.premultipliedAlpha = this.premultipliedAlpha;
    if (this.forceSinglePass === !0) Z.forceSinglePass = this.forceSinglePass;
    if (this.wireframe === !0) Z.wireframe = this.wireframe;
    if (this.wireframeLinewidth > 1)
      Z.wireframeLinewidth = this.wireframeLinewidth;
    if (this.wireframeLinecap !== "round")
      Z.wireframeLinecap = this.wireframeLinecap;
    if (this.wireframeLinejoin !== "round")
      Z.wireframeLinejoin = this.wireframeLinejoin;
    if (this.flatShading === !0) Z.flatShading = this.flatShading;
    if (this.visible === !1) Z.visible = !1;
    if (this.toneMapped === !1) Z.toneMapped = !1;
    if (this.fog === !1) Z.fog = !1;
    if (Object.keys(this.userData).length > 0) Z.userData = this.userData;
    function Q(W) {
      let Y = [];
      for (let K in W) {
        let X = W[K];
        (delete X.metadata, Y.push(X));
      }
      return Y;
    }
    if (J) {
      let W = Q($.textures),
        Y = Q($.images);
      if (W.length > 0) Z.textures = W;
      if (Y.length > 0) Z.images = Y;
    }
    return Z;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy($) {
    ((this.name = $.name),
      (this.blending = $.blending),
      (this.side = $.side),
      (this.vertexColors = $.vertexColors),
      (this.opacity = $.opacity),
      (this.transparent = $.transparent),
      (this.blendSrc = $.blendSrc),
      (this.blendDst = $.blendDst),
      (this.blendEquation = $.blendEquation),
      (this.blendSrcAlpha = $.blendSrcAlpha),
      (this.blendDstAlpha = $.blendDstAlpha),
      (this.blendEquationAlpha = $.blendEquationAlpha),
      (this.depthFunc = $.depthFunc),
      (this.depthTest = $.depthTest),
      (this.depthWrite = $.depthWrite),
      (this.stencilWriteMask = $.stencilWriteMask),
      (this.stencilFunc = $.stencilFunc),
      (this.stencilRef = $.stencilRef),
      (this.stencilFuncMask = $.stencilFuncMask),
      (this.stencilFail = $.stencilFail),
      (this.stencilZFail = $.stencilZFail),
      (this.stencilZPass = $.stencilZPass),
      (this.stencilWrite = $.stencilWrite));
    let J = $.clippingPlanes,
      Z = null;
    if (J !== null) {
      let Q = J.length;
      Z = Array(Q);
      for (let W = 0; W !== Q; ++W) Z[W] = J[W].clone();
    }
    return (
      (this.clippingPlanes = Z),
      (this.clipIntersection = $.clipIntersection),
      (this.clipShadows = $.clipShadows),
      (this.shadowSide = $.shadowSide),
      (this.colorWrite = $.colorWrite),
      (this.precision = $.precision),
      (this.polygonOffset = $.polygonOffset),
      (this.polygonOffsetFactor = $.polygonOffsetFactor),
      (this.polygonOffsetUnits = $.polygonOffsetUnits),
      (this.dithering = $.dithering),
      (this.alphaTest = $.alphaTest),
      (this.alphaHash = $.alphaHash),
      (this.alphaToCoverage = $.alphaToCoverage),
      (this.premultipliedAlpha = $.premultipliedAlpha),
      (this.forceSinglePass = $.forceSinglePass),
      (this.visible = $.visible),
      (this.toneMapped = $.toneMapped),
      (this.userData = JSON.parse(JSON.stringify($.userData))),
      this
    );
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate($) {
    if ($ === !0) this.version++;
  }
}
var C7 = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074,
  },
  y6 = { h: 0, s: 0, l: 0 },
  B5 = { h: 0, s: 0, l: 0 };
function B8($, J, Z) {
  if (Z < 0) Z += 1;
  if (Z > 1) Z -= 1;
  if (Z < 0.16666666666666666) return $ + (J - $) * 6 * Z;
  if (Z < 0.5) return J;
  if (Z < 0.6666666666666666) return $ + (J - $) * 6 * (0.6666666666666666 - Z);
  return $;
}
class h0 {
  constructor($, J, Z) {
    return (
      (this.isColor = !0),
      (this.r = 1),
      (this.g = 1),
      (this.b = 1),
      this.set($, J, Z)
    );
  }
  set($, J, Z) {
    if (J === void 0 && Z === void 0) {
      let Q = $;
      if (Q && Q.isColor) this.copy(Q);
      else if (typeof Q === "number") this.setHex(Q);
      else if (typeof Q === "string") this.setStyle(Q);
    } else this.setRGB($, J, Z);
    return this;
  }
  setScalar($) {
    return ((this.r = $), (this.g = $), (this.b = $), this);
  }
  setHex($, J = "srgb") {
    return (
      ($ = Math.floor($)),
      (this.r = (($ >> 16) & 255) / 255),
      (this.g = (($ >> 8) & 255) / 255),
      (this.b = ($ & 255) / 255),
      w6.toWorkingColorSpace(this, J),
      this
    );
  }
  setRGB($, J, Z, Q = w6.workingColorSpace) {
    return (
      (this.r = $),
      (this.g = J),
      (this.b = Z),
      w6.toWorkingColorSpace(this, Q),
      this
    );
  }
  setHSL($, J, Z, Q = w6.workingColorSpace) {
    if ((($ = g8($, 1)), (J = F6(J, 0, 1)), (Z = F6(Z, 0, 1)), J === 0))
      this.r = this.g = this.b = Z;
    else {
      let W = Z <= 0.5 ? Z * (1 + J) : Z + J - Z * J,
        Y = 2 * Z - W;
      ((this.r = B8(Y, W, $ + 0.3333333333333333)),
        (this.g = B8(Y, W, $)),
        (this.b = B8(Y, W, $ - 0.3333333333333333)));
    }
    return (w6.toWorkingColorSpace(this, Q), this);
  }
  setStyle($, J = "srgb") {
    function Z(W) {
      if (W === void 0) return;
      if (parseFloat(W) < 1)
        console.warn(
          "THREE.Color: Alpha component of " + $ + " will be ignored.",
        );
    }
    let Q;
    if ((Q = /^(\w+)\(([^\)]*)\)/.exec($))) {
      let W,
        Y = Q[1],
        K = Q[2];
      switch (Y) {
        case "rgb":
        case "rgba":
          if (
            (W =
              /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
                K,
              ))
          )
            return (
              Z(W[4]),
              this.setRGB(
                Math.min(255, parseInt(W[1], 10)) / 255,
                Math.min(255, parseInt(W[2], 10)) / 255,
                Math.min(255, parseInt(W[3], 10)) / 255,
                J,
              )
            );
          if (
            (W =
              /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
                K,
              ))
          )
            return (
              Z(W[4]),
              this.setRGB(
                Math.min(100, parseInt(W[1], 10)) / 100,
                Math.min(100, parseInt(W[2], 10)) / 100,
                Math.min(100, parseInt(W[3], 10)) / 100,
                J,
              )
            );
          break;
        case "hsl":
        case "hsla":
          if (
            (W =
              /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
                K,
              ))
          )
            return (
              Z(W[4]),
              this.setHSL(
                parseFloat(W[1]) / 360,
                parseFloat(W[2]) / 100,
                parseFloat(W[3]) / 100,
                J,
              )
            );
          break;
        default:
          console.warn("THREE.Color: Unknown color model " + $);
      }
    } else if ((Q = /^\#([A-Fa-f\d]+)$/.exec($))) {
      let W = Q[1],
        Y = W.length;
      if (Y === 3)
        return this.setRGB(
          parseInt(W.charAt(0), 16) / 15,
          parseInt(W.charAt(1), 16) / 15,
          parseInt(W.charAt(2), 16) / 15,
          J,
        );
      else if (Y === 6) return this.setHex(parseInt(W, 16), J);
      else console.warn("THREE.Color: Invalid hex color " + $);
    } else if ($ && $.length > 0) return this.setColorName($, J);
    return this;
  }
  setColorName($, J = "srgb") {
    let Z = C7[$.toLowerCase()];
    if (Z !== void 0) this.setHex(Z, J);
    else console.warn("THREE.Color: Unknown color " + $);
    return this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy($) {
    return ((this.r = $.r), (this.g = $.g), (this.b = $.b), this);
  }
  copySRGBToLinear($) {
    return ((this.r = d$($.r)), (this.g = d$($.g)), (this.b = d$($.b)), this);
  }
  copyLinearToSRGB($) {
    return ((this.r = V8($.r)), (this.g = V8($.g)), (this.b = V8($.b)), this);
  }
  convertSRGBToLinear() {
    return (this.copySRGBToLinear(this), this);
  }
  convertLinearToSRGB() {
    return (this.copyLinearToSRGB(this), this);
  }
  getHex($ = "srgb") {
    return (
      w6.fromWorkingColorSpace(N6.copy(this), $),
      Math.round(F6(N6.r * 255, 0, 255)) * 65536 +
        Math.round(F6(N6.g * 255, 0, 255)) * 256 +
        Math.round(F6(N6.b * 255, 0, 255))
    );
  }
  getHexString($ = "srgb") {
    return ("000000" + this.getHex($).toString(16)).slice(-6);
  }
  getHSL($, J = w6.workingColorSpace) {
    w6.fromWorkingColorSpace(N6.copy(this), J);
    let { r: Z, g: Q, b: W } = N6,
      Y = Math.max(Z, Q, W),
      K = Math.min(Z, Q, W),
      X,
      H,
      q = (K + Y) / 2;
    if (K === Y) ((X = 0), (H = 0));
    else {
      let U = Y - K;
      switch (((H = q <= 0.5 ? U / (Y + K) : U / (2 - Y - K)), Y)) {
        case Z:
          X = (Q - W) / U + (Q < W ? 6 : 0);
          break;
        case Q:
          X = (W - Z) / U + 2;
          break;
        case W:
          X = (Z - Q) / U + 4;
          break;
      }
      X /= 6;
    }
    return (($.h = X), ($.s = H), ($.l = q), $);
  }
  getRGB($, J = w6.workingColorSpace) {
    return (
      w6.fromWorkingColorSpace(N6.copy(this), J),
      ($.r = N6.r),
      ($.g = N6.g),
      ($.b = N6.b),
      $
    );
  }
  getStyle($ = "srgb") {
    w6.fromWorkingColorSpace(N6.copy(this), $);
    let { r: J, g: Z, b: Q } = N6;
    if ($ !== "srgb")
      return `color(${$} ${J.toFixed(3)} ${Z.toFixed(3)} ${Q.toFixed(3)})`;
    return `rgb(${Math.round(J * 255)},${Math.round(Z * 255)},${Math.round(Q * 255)})`;
  }
  offsetHSL($, J, Z) {
    return (
      this.getHSL(y6),
      (y6.h += $),
      (y6.s += J),
      (y6.l += Z),
      this.setHSL(y6.h, y6.s, y6.l),
      this
    );
  }
  add($) {
    return ((this.r += $.r), (this.g += $.g), (this.b += $.b), this);
  }
  addColors($, J) {
    return (
      (this.r = $.r + J.r),
      (this.g = $.g + J.g),
      (this.b = $.b + J.b),
      this
    );
  }
  addScalar($) {
    return ((this.r += $), (this.g += $), (this.b += $), this);
  }
  sub($) {
    return (
      (this.r = Math.max(0, this.r - $.r)),
      (this.g = Math.max(0, this.g - $.g)),
      (this.b = Math.max(0, this.b - $.b)),
      this
    );
  }
  multiply($) {
    return ((this.r *= $.r), (this.g *= $.g), (this.b *= $.b), this);
  }
  multiplyScalar($) {
    return ((this.r *= $), (this.g *= $), (this.b *= $), this);
  }
  lerp($, J) {
    return (
      (this.r += ($.r - this.r) * J),
      (this.g += ($.g - this.g) * J),
      (this.b += ($.b - this.b) * J),
      this
    );
  }
  lerpColors($, J, Z) {
    return (
      (this.r = $.r + (J.r - $.r) * Z),
      (this.g = $.g + (J.g - $.g) * Z),
      (this.b = $.b + (J.b - $.b) * Z),
      this
    );
  }
  lerpHSL($, J) {
    (this.getHSL(y6), $.getHSL(B5));
    let Z = K5(y6.h, B5.h, J),
      Q = K5(y6.s, B5.s, J),
      W = K5(y6.l, B5.l, J);
    return (this.setHSL(Z, Q, W), this);
  }
  setFromVector3($) {
    return ((this.r = $.x), (this.g = $.y), (this.b = $.z), this);
  }
  applyMatrix3($) {
    let J = this.r,
      Z = this.g,
      Q = this.b,
      W = $.elements;
    return (
      (this.r = W[0] * J + W[3] * Z + W[6] * Q),
      (this.g = W[1] * J + W[4] * Z + W[7] * Q),
      (this.b = W[2] * J + W[5] * Z + W[8] * Q),
      this
    );
  }
  equals($) {
    return $.r === this.r && $.g === this.g && $.b === this.b;
  }
  fromArray($, J = 0) {
    return ((this.r = $[J]), (this.g = $[J + 1]), (this.b = $[J + 2]), this);
  }
  toArray($ = [], J = 0) {
    return (($[J] = this.r), ($[J + 1] = this.g), ($[J + 2] = this.b), $);
  }
  fromBufferAttribute($, J) {
    return (
      (this.r = $.getX(J)),
      (this.g = $.getY(J)),
      (this.b = $.getZ(J)),
      this
    );
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    (yield this.r, yield this.g, yield this.b);
  }
}
var N6 = new h0();
h0.NAMES = C7;
class d8 extends _$ {
  constructor($) {
    super();
    ((this.isMeshBasicMaterial = !0),
      (this.type = "MeshBasicMaterial"),
      (this.color = new h0(16777215)),
      (this.map = null),
      (this.lightMap = null),
      (this.lightMapIntensity = 1),
      (this.aoMap = null),
      (this.aoMapIntensity = 1),
      (this.specularMap = null),
      (this.alphaMap = null),
      (this.envMap = null),
      (this.combine = 0),
      (this.reflectivity = 1),
      (this.refractionRatio = 0.98),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.wireframeLinecap = "round"),
      (this.wireframeLinejoin = "round"),
      (this.fog = !0),
      this.setValues($));
  }
  copy($) {
    return (
      super.copy($),
      this.color.copy($.color),
      (this.map = $.map),
      (this.lightMap = $.lightMap),
      (this.lightMapIntensity = $.lightMapIntensity),
      (this.aoMap = $.aoMap),
      (this.aoMapIntensity = $.aoMapIntensity),
      (this.specularMap = $.specularMap),
      (this.alphaMap = $.alphaMap),
      (this.envMap = $.envMap),
      (this.combine = $.combine),
      (this.reflectivity = $.reflectivity),
      (this.refractionRatio = $.refractionRatio),
      (this.wireframe = $.wireframe),
      (this.wireframeLinewidth = $.wireframeLinewidth),
      (this.wireframeLinecap = $.wireframeLinecap),
      (this.wireframeLinejoin = $.wireframeLinejoin),
      (this.fog = $.fog),
      this
    );
  }
}
var Q6 = new S(),
  w5 = new R0();
class L6 {
  constructor($, J, Z = !1) {
    if (Array.isArray($))
      throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    ((this.isBufferAttribute = !0),
      (this.name = ""),
      (this.array = $),
      (this.itemSize = J),
      (this.count = $ !== void 0 ? $.length / J : 0),
      (this.normalized = Z),
      (this.usage = 35044),
      (this.updateRange = { offset: 0, count: -1 }),
      (this.gpuType = 1015),
      (this.version = 0));
  }
  onUploadCallback() {}
  set needsUpdate($) {
    if ($ === !0) this.version++;
  }
  setUsage($) {
    return ((this.usage = $), this);
  }
  copy($) {
    return (
      (this.name = $.name),
      (this.array = new $.array.constructor($.array)),
      (this.itemSize = $.itemSize),
      (this.count = $.count),
      (this.normalized = $.normalized),
      (this.usage = $.usage),
      (this.gpuType = $.gpuType),
      this
    );
  }
  copyAt($, J, Z) {
    (($ *= this.itemSize), (Z *= J.itemSize));
    for (let Q = 0, W = this.itemSize; Q < W; Q++)
      this.array[$ + Q] = J.array[Z + Q];
    return this;
  }
  copyArray($) {
    return (this.array.set($), this);
  }
  applyMatrix3($) {
    if (this.itemSize === 2)
      for (let J = 0, Z = this.count; J < Z; J++)
        (w5.fromBufferAttribute(this, J),
          w5.applyMatrix3($),
          this.setXY(J, w5.x, w5.y));
    else if (this.itemSize === 3)
      for (let J = 0, Z = this.count; J < Z; J++)
        (Q6.fromBufferAttribute(this, J),
          Q6.applyMatrix3($),
          this.setXYZ(J, Q6.x, Q6.y, Q6.z));
    return this;
  }
  applyMatrix4($) {
    for (let J = 0, Z = this.count; J < Z; J++)
      (Q6.fromBufferAttribute(this, J),
        Q6.applyMatrix4($),
        this.setXYZ(J, Q6.x, Q6.y, Q6.z));
    return this;
  }
  applyNormalMatrix($) {
    for (let J = 0, Z = this.count; J < Z; J++)
      (Q6.fromBufferAttribute(this, J),
        Q6.applyNormalMatrix($),
        this.setXYZ(J, Q6.x, Q6.y, Q6.z));
    return this;
  }
  transformDirection($) {
    for (let J = 0, Z = this.count; J < Z; J++)
      (Q6.fromBufferAttribute(this, J),
        Q6.transformDirection($),
        this.setXYZ(J, Q6.x, Q6.y, Q6.z));
    return this;
  }
  set($, J = 0) {
    return (this.array.set($, J), this);
  }
  getComponent($, J) {
    let Z = this.array[$ * this.itemSize + J];
    if (this.normalized) Z = p6(Z, this.array);
    return Z;
  }
  setComponent($, J, Z) {
    if (this.normalized) Z = l0(Z, this.array);
    return ((this.array[$ * this.itemSize + J] = Z), this);
  }
  getX($) {
    let J = this.array[$ * this.itemSize];
    if (this.normalized) J = p6(J, this.array);
    return J;
  }
  setX($, J) {
    if (this.normalized) J = l0(J, this.array);
    return ((this.array[$ * this.itemSize] = J), this);
  }
  getY($) {
    let J = this.array[$ * this.itemSize + 1];
    if (this.normalized) J = p6(J, this.array);
    return J;
  }
  setY($, J) {
    if (this.normalized) J = l0(J, this.array);
    return ((this.array[$ * this.itemSize + 1] = J), this);
  }
  getZ($) {
    let J = this.array[$ * this.itemSize + 2];
    if (this.normalized) J = p6(J, this.array);
    return J;
  }
  setZ($, J) {
    if (this.normalized) J = l0(J, this.array);
    return ((this.array[$ * this.itemSize + 2] = J), this);
  }
  getW($) {
    let J = this.array[$ * this.itemSize + 3];
    if (this.normalized) J = p6(J, this.array);
    return J;
  }
  setW($, J) {
    if (this.normalized) J = l0(J, this.array);
    return ((this.array[$ * this.itemSize + 3] = J), this);
  }
  setXY($, J, Z) {
    if ((($ *= this.itemSize), this.normalized))
      ((J = l0(J, this.array)), (Z = l0(Z, this.array)));
    return ((this.array[$ + 0] = J), (this.array[$ + 1] = Z), this);
  }
  setXYZ($, J, Z, Q) {
    if ((($ *= this.itemSize), this.normalized))
      ((J = l0(J, this.array)),
        (Z = l0(Z, this.array)),
        (Q = l0(Q, this.array)));
    return (
      (this.array[$ + 0] = J),
      (this.array[$ + 1] = Z),
      (this.array[$ + 2] = Q),
      this
    );
  }
  setXYZW($, J, Z, Q, W) {
    if ((($ *= this.itemSize), this.normalized))
      ((J = l0(J, this.array)),
        (Z = l0(Z, this.array)),
        (Q = l0(Q, this.array)),
        (W = l0(W, this.array)));
    return (
      (this.array[$ + 0] = J),
      (this.array[$ + 1] = Z),
      (this.array[$ + 2] = Q),
      (this.array[$ + 3] = W),
      this
    );
  }
  onUpload($) {
    return ((this.onUploadCallback = $), this);
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    let $ = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized,
    };
    if (this.name !== "") $.name = this.name;
    if (this.usage !== 35044) $.usage = this.usage;
    if (this.updateRange.offset !== 0 || this.updateRange.count !== -1)
      $.updateRange = this.updateRange;
    return $;
  }
}
class c8 extends L6 {
  constructor($, J, Z) {
    super(new Uint16Array($), J, Z);
  }
}
class n8 extends L6 {
  constructor($, J, Z) {
    super(new Uint32Array($), J, Z);
  }
}
class x6 extends L6 {
  constructor($, J, Z) {
    super(new Float32Array($), J, Z);
  }
}
var JZ = 0,
  P6 = new $6(),
  w8 = new E6(),
  f$ = new S(),
  B6 = new n$(),
  $5 = new n$(),
  G6 = new S();
class d6 extends J$ {
  constructor() {
    super();
    ((this.isBufferGeometry = !0),
      Object.defineProperty(this, "id", { value: JZ++ }),
      (this.uuid = $$()),
      (this.name = ""),
      (this.type = "BufferGeometry"),
      (this.index = null),
      (this.attributes = {}),
      (this.morphAttributes = {}),
      (this.morphTargetsRelative = !1),
      (this.groups = []),
      (this.boundingBox = null),
      (this.boundingSphere = null),
      (this.drawRange = { start: 0, count: 1 / 0 }),
      (this.userData = {}));
  }
  getIndex() {
    return this.index;
  }
  setIndex($) {
    if (Array.isArray($)) this.index = new (_7($) ? n8 : c8)($, 1);
    else this.index = $;
    return this;
  }
  getAttribute($) {
    return this.attributes[$];
  }
  setAttribute($, J) {
    return ((this.attributes[$] = J), this);
  }
  deleteAttribute($) {
    return (delete this.attributes[$], this);
  }
  hasAttribute($) {
    return this.attributes[$] !== void 0;
  }
  addGroup($, J, Z = 0) {
    this.groups.push({ start: $, count: J, materialIndex: Z });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange($, J) {
    ((this.drawRange.start = $), (this.drawRange.count = J));
  }
  applyMatrix4($) {
    let J = this.attributes.position;
    if (J !== void 0) (J.applyMatrix4($), (J.needsUpdate = !0));
    let Z = this.attributes.normal;
    if (Z !== void 0) {
      let W = new f0().getNormalMatrix($);
      (Z.applyNormalMatrix(W), (Z.needsUpdate = !0));
    }
    let Q = this.attributes.tangent;
    if (Q !== void 0) (Q.transformDirection($), (Q.needsUpdate = !0));
    if (this.boundingBox !== null) this.computeBoundingBox();
    if (this.boundingSphere !== null) this.computeBoundingSphere();
    return this;
  }
  applyQuaternion($) {
    return (P6.makeRotationFromQuaternion($), this.applyMatrix4(P6), this);
  }
  rotateX($) {
    return (P6.makeRotationX($), this.applyMatrix4(P6), this);
  }
  rotateY($) {
    return (P6.makeRotationY($), this.applyMatrix4(P6), this);
  }
  rotateZ($) {
    return (P6.makeRotationZ($), this.applyMatrix4(P6), this);
  }
  translate($, J, Z) {
    return (P6.makeTranslation($, J, Z), this.applyMatrix4(P6), this);
  }
  scale($, J, Z) {
    return (P6.makeScale($, J, Z), this.applyMatrix4(P6), this);
  }
  lookAt($) {
    return (
      w8.lookAt($),
      w8.updateMatrix(),
      this.applyMatrix4(w8.matrix),
      this
    );
  }
  center() {
    return (
      this.computeBoundingBox(),
      this.boundingBox.getCenter(f$).negate(),
      this.translate(f$.x, f$.y, f$.z),
      this
    );
  }
  setFromPoints($) {
    let J = [];
    for (let Z = 0, Q = $.length; Z < Q; Z++) {
      let W = $[Z];
      J.push(W.x, W.y, W.z || 0);
    }
    return (this.setAttribute("position", new x6(J, 3)), this);
  }
  computeBoundingBox() {
    if (this.boundingBox === null) this.boundingBox = new n$();
    let $ = this.attributes.position,
      J = this.morphAttributes.position;
    if ($ && $.isGLBufferAttribute) {
      (console.error(
        'THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',
        this,
      ),
        this.boundingBox.set(
          new S(-1 / 0, -1 / 0, -1 / 0),
          new S(1 / 0, 1 / 0, 1 / 0),
        ));
      return;
    }
    if ($ !== void 0) {
      if ((this.boundingBox.setFromBufferAttribute($), J))
        for (let Z = 0, Q = J.length; Z < Q; Z++) {
          let W = J[Z];
          if ((B6.setFromBufferAttribute(W), this.morphTargetsRelative))
            (G6.addVectors(this.boundingBox.min, B6.min),
              this.boundingBox.expandByPoint(G6),
              G6.addVectors(this.boundingBox.max, B6.max),
              this.boundingBox.expandByPoint(G6));
          else
            (this.boundingBox.expandByPoint(B6.min),
              this.boundingBox.expandByPoint(B6.max));
        }
    } else this.boundingBox.makeEmpty();
    if (
      isNaN(this.boundingBox.min.x) ||
      isNaN(this.boundingBox.min.y) ||
      isNaN(this.boundingBox.min.z)
    )
      console.error(
        'THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',
        this,
      );
  }
  computeBoundingSphere() {
    if (this.boundingSphere === null) this.boundingSphere = new s5();
    let $ = this.attributes.position,
      J = this.morphAttributes.position;
    if ($ && $.isGLBufferAttribute) {
      (console.error(
        'THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',
        this,
      ),
        this.boundingSphere.set(new S(), 1 / 0));
      return;
    }
    if ($) {
      let Z = this.boundingSphere.center;
      if ((B6.setFromBufferAttribute($), J))
        for (let W = 0, Y = J.length; W < Y; W++) {
          let K = J[W];
          if (($5.setFromBufferAttribute(K), this.morphTargetsRelative))
            (G6.addVectors(B6.min, $5.min),
              B6.expandByPoint(G6),
              G6.addVectors(B6.max, $5.max),
              B6.expandByPoint(G6));
          else (B6.expandByPoint($5.min), B6.expandByPoint($5.max));
        }
      B6.getCenter(Z);
      let Q = 0;
      for (let W = 0, Y = $.count; W < Y; W++)
        (G6.fromBufferAttribute($, W),
          (Q = Math.max(Q, Z.distanceToSquared(G6))));
      if (J)
        for (let W = 0, Y = J.length; W < Y; W++) {
          let K = J[W],
            X = this.morphTargetsRelative;
          for (let H = 0, q = K.count; H < q; H++) {
            if ((G6.fromBufferAttribute(K, H), X))
              (f$.fromBufferAttribute($, H), G6.add(f$));
            Q = Math.max(Q, Z.distanceToSquared(G6));
          }
        }
      if (
        ((this.boundingSphere.radius = Math.sqrt(Q)),
        isNaN(this.boundingSphere.radius))
      )
        console.error(
          'THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',
          this,
        );
    }
  }
  computeTangents() {
    let $ = this.index,
      J = this.attributes;
    if (
      $ === null ||
      J.position === void 0 ||
      J.normal === void 0 ||
      J.uv === void 0
    ) {
      console.error(
        "THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)",
      );
      return;
    }
    let Z = $.array,
      Q = J.position.array,
      W = J.normal.array,
      Y = J.uv.array,
      K = Q.length / 3;
    if (this.hasAttribute("tangent") === !1)
      this.setAttribute("tangent", new L6(new Float32Array(4 * K), 4));
    let X = this.getAttribute("tangent").array,
      H = [],
      q = [];
    for (let R = 0; R < K; R++) ((H[R] = new S()), (q[R] = new S()));
    let U = new S(),
      G = new S(),
      E = new S(),
      F = new R0(),
      O = new R0(),
      _ = new R0(),
      N = new S(),
      V = new S();
    function k(R, w, s) {
      (U.fromArray(Q, R * 3),
        G.fromArray(Q, w * 3),
        E.fromArray(Q, s * 3),
        F.fromArray(Y, R * 2),
        O.fromArray(Y, w * 2),
        _.fromArray(Y, s * 2),
        G.sub(U),
        E.sub(U),
        O.sub(F),
        _.sub(F));
      let W0 = 1 / (O.x * _.y - _.x * O.y);
      if (!isFinite(W0)) return;
      (N.copy(G)
        .multiplyScalar(_.y)
        .addScaledVector(E, -O.y)
        .multiplyScalar(W0),
        V.copy(E)
          .multiplyScalar(O.x)
          .addScaledVector(G, -_.x)
          .multiplyScalar(W0),
        H[R].add(N),
        H[w].add(N),
        H[s].add(N),
        q[R].add(V),
        q[w].add(V),
        q[s].add(V));
    }
    let M = this.groups;
    if (M.length === 0) M = [{ start: 0, count: Z.length }];
    for (let R = 0, w = M.length; R < w; ++R) {
      let s = M[R],
        W0 = s.start,
        h = s.count;
      for (let y = W0, l = W0 + h; y < l; y += 3)
        k(Z[y + 0], Z[y + 1], Z[y + 2]);
    }
    let A = new S(),
      L = new S(),
      C = new S(),
      g = new S();
    function d(R) {
      (C.fromArray(W, R * 3), g.copy(C));
      let w = H[R];
      (A.copy(w),
        A.sub(C.multiplyScalar(C.dot(w))).normalize(),
        L.crossVectors(g, w));
      let W0 = L.dot(q[R]) < 0 ? -1 : 1;
      ((X[R * 4] = A.x),
        (X[R * 4 + 1] = A.y),
        (X[R * 4 + 2] = A.z),
        (X[R * 4 + 3] = W0));
    }
    for (let R = 0, w = M.length; R < w; ++R) {
      let s = M[R],
        W0 = s.start,
        h = s.count;
      for (let y = W0, l = W0 + h; y < l; y += 3)
        (d(Z[y + 0]), d(Z[y + 1]), d(Z[y + 2]));
    }
  }
  computeVertexNormals() {
    let $ = this.index,
      J = this.getAttribute("position");
    if (J !== void 0) {
      let Z = this.getAttribute("normal");
      if (Z === void 0)
        ((Z = new L6(new Float32Array(J.count * 3), 3)),
          this.setAttribute("normal", Z));
      else for (let G = 0, E = Z.count; G < E; G++) Z.setXYZ(G, 0, 0, 0);
      let Q = new S(),
        W = new S(),
        Y = new S(),
        K = new S(),
        X = new S(),
        H = new S(),
        q = new S(),
        U = new S();
      if ($)
        for (let G = 0, E = $.count; G < E; G += 3) {
          let F = $.getX(G + 0),
            O = $.getX(G + 1),
            _ = $.getX(G + 2);
          (Q.fromBufferAttribute(J, F),
            W.fromBufferAttribute(J, O),
            Y.fromBufferAttribute(J, _),
            q.subVectors(Y, W),
            U.subVectors(Q, W),
            q.cross(U),
            K.fromBufferAttribute(Z, F),
            X.fromBufferAttribute(Z, O),
            H.fromBufferAttribute(Z, _),
            K.add(q),
            X.add(q),
            H.add(q),
            Z.setXYZ(F, K.x, K.y, K.z),
            Z.setXYZ(O, X.x, X.y, X.z),
            Z.setXYZ(_, H.x, H.y, H.z));
        }
      else
        for (let G = 0, E = J.count; G < E; G += 3)
          (Q.fromBufferAttribute(J, G + 0),
            W.fromBufferAttribute(J, G + 1),
            Y.fromBufferAttribute(J, G + 2),
            q.subVectors(Y, W),
            U.subVectors(Q, W),
            q.cross(U),
            Z.setXYZ(G + 0, q.x, q.y, q.z),
            Z.setXYZ(G + 1, q.x, q.y, q.z),
            Z.setXYZ(G + 2, q.x, q.y, q.z));
      (this.normalizeNormals(), (Z.needsUpdate = !0));
    }
  }
  normalizeNormals() {
    let $ = this.attributes.normal;
    for (let J = 0, Z = $.count; J < Z; J++)
      (G6.fromBufferAttribute($, J),
        G6.normalize(),
        $.setXYZ(J, G6.x, G6.y, G6.z));
  }
  toNonIndexed() {
    function $(K, X) {
      let { array: H, itemSize: q, normalized: U } = K,
        G = new H.constructor(X.length * q),
        E = 0,
        F = 0;
      for (let O = 0, _ = X.length; O < _; O++) {
        if (K.isInterleavedBufferAttribute) E = X[O] * K.data.stride + K.offset;
        else E = X[O] * q;
        for (let N = 0; N < q; N++) G[F++] = H[E++];
      }
      return new L6(G, q, U);
    }
    if (this.index === null)
      return (
        console.warn(
          "THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.",
        ),
        this
      );
    let J = new d6(),
      Z = this.index.array,
      Q = this.attributes;
    for (let K in Q) {
      let X = Q[K],
        H = $(X, Z);
      J.setAttribute(K, H);
    }
    let W = this.morphAttributes;
    for (let K in W) {
      let X = [],
        H = W[K];
      for (let q = 0, U = H.length; q < U; q++) {
        let G = H[q],
          E = $(G, Z);
        X.push(E);
      }
      J.morphAttributes[K] = X;
    }
    J.morphTargetsRelative = this.morphTargetsRelative;
    let Y = this.groups;
    for (let K = 0, X = Y.length; K < X; K++) {
      let H = Y[K];
      J.addGroup(H.start, H.count, H.materialIndex);
    }
    return J;
  }
  toJSON() {
    let $ = {
      metadata: {
        version: 4.6,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON",
      },
    };
    if ((($.uuid = this.uuid), ($.type = this.type), this.name !== ""))
      $.name = this.name;
    if (Object.keys(this.userData).length > 0) $.userData = this.userData;
    if (this.parameters !== void 0) {
      let X = this.parameters;
      for (let H in X) if (X[H] !== void 0) $[H] = X[H];
      return $;
    }
    $.data = { attributes: {} };
    let J = this.index;
    if (J !== null)
      $.data.index = {
        type: J.array.constructor.name,
        array: Array.prototype.slice.call(J.array),
      };
    let Z = this.attributes;
    for (let X in Z) {
      let H = Z[X];
      $.data.attributes[X] = H.toJSON($.data);
    }
    let Q = {},
      W = !1;
    for (let X in this.morphAttributes) {
      let H = this.morphAttributes[X],
        q = [];
      for (let U = 0, G = H.length; U < G; U++) {
        let E = H[U];
        q.push(E.toJSON($.data));
      }
      if (q.length > 0) ((Q[X] = q), (W = !0));
    }
    if (W)
      (($.data.morphAttributes = Q),
        ($.data.morphTargetsRelative = this.morphTargetsRelative));
    let Y = this.groups;
    if (Y.length > 0) $.data.groups = JSON.parse(JSON.stringify(Y));
    let K = this.boundingSphere;
    if (K !== null)
      $.data.boundingSphere = { center: K.center.toArray(), radius: K.radius };
    return $;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy($) {
    ((this.index = null),
      (this.attributes = {}),
      (this.morphAttributes = {}),
      (this.groups = []),
      (this.boundingBox = null),
      (this.boundingSphere = null));
    let J = {};
    this.name = $.name;
    let Z = $.index;
    if (Z !== null) this.setIndex(Z.clone(J));
    let Q = $.attributes;
    for (let H in Q) {
      let q = Q[H];
      this.setAttribute(H, q.clone(J));
    }
    let W = $.morphAttributes;
    for (let H in W) {
      let q = [],
        U = W[H];
      for (let G = 0, E = U.length; G < E; G++) q.push(U[G].clone(J));
      this.morphAttributes[H] = q;
    }
    this.morphTargetsRelative = $.morphTargetsRelative;
    let Y = $.groups;
    for (let H = 0, q = Y.length; H < q; H++) {
      let U = Y[H];
      this.addGroup(U.start, U.count, U.materialIndex);
    }
    let K = $.boundingBox;
    if (K !== null) this.boundingBox = K.clone();
    let X = $.boundingSphere;
    if (X !== null) this.boundingSphere = X.clone();
    return (
      (this.drawRange.start = $.drawRange.start),
      (this.drawRange.count = $.drawRange.count),
      (this.userData = $.userData),
      this
    );
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
var xJ = new $6(),
  V$ = new i5(),
  L5 = new s5(),
  vJ = new S(),
  b$ = new S(),
  j$ = new S(),
  y$ = new S(),
  L8 = new S(),
  A5 = new S(),
  P5 = new R0(),
  T5 = new R0(),
  S5 = new R0(),
  hJ = new S(),
  gJ = new S(),
  mJ = new S(),
  f5 = new S(),
  b5 = new S();
class u0 extends E6 {
  constructor($ = new d6(), J = new d8()) {
    super();
    ((this.isMesh = !0),
      (this.type = "Mesh"),
      (this.geometry = $),
      (this.material = J),
      this.updateMorphTargets());
  }
  copy($, J) {
    if ((super.copy($, J), $.morphTargetInfluences !== void 0))
      this.morphTargetInfluences = $.morphTargetInfluences.slice();
    if ($.morphTargetDictionary !== void 0)
      this.morphTargetDictionary = Object.assign({}, $.morphTargetDictionary);
    return (
      (this.material = Array.isArray($.material)
        ? $.material.slice()
        : $.material),
      (this.geometry = $.geometry),
      this
    );
  }
  updateMorphTargets() {
    let J = this.geometry.morphAttributes,
      Z = Object.keys(J);
    if (Z.length > 0) {
      let Q = J[Z[0]];
      if (Q !== void 0) {
        ((this.morphTargetInfluences = []), (this.morphTargetDictionary = {}));
        for (let W = 0, Y = Q.length; W < Y; W++) {
          let K = Q[W].name || String(W);
          (this.morphTargetInfluences.push(0),
            (this.morphTargetDictionary[K] = W));
        }
      }
    }
  }
  getVertexPosition($, J) {
    let Z = this.geometry,
      Q = Z.attributes.position,
      W = Z.morphAttributes.position,
      Y = Z.morphTargetsRelative;
    J.fromBufferAttribute(Q, $);
    let K = this.morphTargetInfluences;
    if (W && K) {
      A5.set(0, 0, 0);
      for (let X = 0, H = W.length; X < H; X++) {
        let q = K[X],
          U = W[X];
        if (q === 0) continue;
        if ((L8.fromBufferAttribute(U, $), Y)) A5.addScaledVector(L8, q);
        else A5.addScaledVector(L8.sub(J), q);
      }
      J.add(A5);
    }
    return J;
  }
  raycast($, J) {
    let Z = this.geometry,
      Q = this.material,
      W = this.matrixWorld;
    if (Q === void 0) return;
    if (Z.boundingSphere === null) Z.computeBoundingSphere();
    if (
      (L5.copy(Z.boundingSphere),
      L5.applyMatrix4(W),
      V$.copy($.ray).recast($.near),
      L5.containsPoint(V$.origin) === !1)
    ) {
      if (V$.intersectSphere(L5, vJ) === null) return;
      if (V$.origin.distanceToSquared(vJ) > ($.far - $.near) ** 2) return;
    }
    if (
      (xJ.copy(W).invert(),
      V$.copy($.ray).applyMatrix4(xJ),
      Z.boundingBox !== null)
    ) {
      if (V$.intersectsBox(Z.boundingBox) === !1) return;
    }
    this._computeIntersections($, J, V$);
  }
  _computeIntersections($, J, Z) {
    let Q,
      W = this.geometry,
      Y = this.material,
      K = W.index,
      X = W.attributes.position,
      H = W.attributes.uv,
      q = W.attributes.uv1,
      U = W.attributes.normal,
      G = W.groups,
      E = W.drawRange;
    if (K !== null)
      if (Array.isArray(Y))
        for (let F = 0, O = G.length; F < O; F++) {
          let _ = G[F],
            N = Y[_.materialIndex],
            V = Math.max(_.start, E.start),
            k = Math.min(
              K.count,
              Math.min(_.start + _.count, E.start + E.count),
            );
          for (let M = V, A = k; M < A; M += 3) {
            let L = K.getX(M),
              C = K.getX(M + 1),
              g = K.getX(M + 2);
            if (((Q = j5(this, N, $, Z, H, q, U, L, C, g)), Q))
              ((Q.faceIndex = Math.floor(M / 3)),
                (Q.face.materialIndex = _.materialIndex),
                J.push(Q));
          }
        }
      else {
        let F = Math.max(0, E.start),
          O = Math.min(K.count, E.start + E.count);
        for (let _ = F, N = O; _ < N; _ += 3) {
          let V = K.getX(_),
            k = K.getX(_ + 1),
            M = K.getX(_ + 2);
          if (((Q = j5(this, Y, $, Z, H, q, U, V, k, M)), Q))
            ((Q.faceIndex = Math.floor(_ / 3)), J.push(Q));
        }
      }
    else if (X !== void 0)
      if (Array.isArray(Y))
        for (let F = 0, O = G.length; F < O; F++) {
          let _ = G[F],
            N = Y[_.materialIndex],
            V = Math.max(_.start, E.start),
            k = Math.min(
              X.count,
              Math.min(_.start + _.count, E.start + E.count),
            );
          for (let M = V, A = k; M < A; M += 3) {
            let L = M,
              C = M + 1,
              g = M + 2;
            if (((Q = j5(this, N, $, Z, H, q, U, L, C, g)), Q))
              ((Q.faceIndex = Math.floor(M / 3)),
                (Q.face.materialIndex = _.materialIndex),
                J.push(Q));
          }
        }
      else {
        let F = Math.max(0, E.start),
          O = Math.min(X.count, E.start + E.count);
        for (let _ = F, N = O; _ < N; _ += 3) {
          let V = _,
            k = _ + 1,
            M = _ + 2;
          if (((Q = j5(this, Y, $, Z, H, q, U, V, k, M)), Q))
            ((Q.faceIndex = Math.floor(_ / 3)), J.push(Q));
        }
      }
  }
}
function ZZ($, J, Z, Q, W, Y, K, X) {
  let H;
  if (J.side === 1) H = Q.intersectTriangle(K, Y, W, !0, X);
  else H = Q.intersectTriangle(W, Y, K, J.side === 0, X);
  if (H === null) return null;
  (b5.copy(X), b5.applyMatrix4($.matrixWorld));
  let q = Z.ray.origin.distanceTo(b5);
  if (q < Z.near || q > Z.far) return null;
  return { distance: q, point: b5.clone(), object: $ };
}
function j5($, J, Z, Q, W, Y, K, X, H, q) {
  ($.getVertexPosition(X, b$),
    $.getVertexPosition(H, j$),
    $.getVertexPosition(q, y$));
  let U = ZZ($, J, Z, Q, b$, j$, y$, f5);
  if (U) {
    if (W)
      (P5.fromBufferAttribute(W, X),
        T5.fromBufferAttribute(W, H),
        S5.fromBufferAttribute(W, q),
        (U.uv = T6.getInterpolation(f5, b$, j$, y$, P5, T5, S5, new R0())));
    if (Y)
      (P5.fromBufferAttribute(Y, X),
        T5.fromBufferAttribute(Y, H),
        S5.fromBufferAttribute(Y, q),
        (U.uv1 = T6.getInterpolation(f5, b$, j$, y$, P5, T5, S5, new R0())),
        (U.uv2 = U.uv1));
    if (K) {
      if (
        (hJ.fromBufferAttribute(K, X),
        gJ.fromBufferAttribute(K, H),
        mJ.fromBufferAttribute(K, q),
        (U.normal = T6.getInterpolation(f5, b$, j$, y$, hJ, gJ, mJ, new S())),
        U.normal.dot(Q.direction) > 0)
      )
        U.normal.multiplyScalar(-1);
    }
    let G = { a: X, b: H, c: q, normal: new S(), materialIndex: 0 };
    (T6.getNormal(b$, j$, y$, G.normal), (U.face = G));
  }
  return U;
}
class t0 extends d6 {
  constructor($ = 1, J = 1, Z = 1, Q = 1, W = 1, Y = 1) {
    super();
    ((this.type = "BoxGeometry"),
      (this.parameters = {
        width: $,
        height: J,
        depth: Z,
        widthSegments: Q,
        heightSegments: W,
        depthSegments: Y,
      }));
    let K = this;
    ((Q = Math.floor(Q)), (W = Math.floor(W)), (Y = Math.floor(Y)));
    let X = [],
      H = [],
      q = [],
      U = [],
      G = 0,
      E = 0;
    (F("z", "y", "x", -1, -1, Z, J, $, Y, W, 0),
      F("z", "y", "x", 1, -1, Z, J, -$, Y, W, 1),
      F("x", "z", "y", 1, 1, $, Z, J, Q, Y, 2),
      F("x", "z", "y", 1, -1, $, Z, -J, Q, Y, 3),
      F("x", "y", "z", 1, -1, $, J, Z, Q, W, 4),
      F("x", "y", "z", -1, -1, $, J, -Z, Q, W, 5),
      this.setIndex(X),
      this.setAttribute("position", new x6(H, 3)),
      this.setAttribute("normal", new x6(q, 3)),
      this.setAttribute("uv", new x6(U, 2)));
    function F(O, _, N, V, k, M, A, L, C, g, d) {
      let R = M / C,
        w = A / g,
        s = M / 2,
        W0 = A / 2,
        h = L / 2,
        y = C + 1,
        l = g + 1,
        r = 0,
        c = 0,
        u = new S();
      for (let i = 0; i < l; i++) {
        let T = i * w - W0;
        for (let n = 0; n < y; n++) {
          let J0 = n * R - s;
          ((u[O] = J0 * V),
            (u[_] = T * k),
            (u[N] = h),
            H.push(u.x, u.y, u.z),
            (u[O] = 0),
            (u[_] = 0),
            (u[N] = L > 0 ? 1 : -1),
            q.push(u.x, u.y, u.z),
            U.push(n / C),
            U.push(1 - i / g),
            (r += 1));
        }
      }
      for (let i = 0; i < g; i++)
        for (let T = 0; T < C; T++) {
          let n = G + T + y * i,
            J0 = G + T + y * (i + 1),
            E0 = G + (T + 1) + y * (i + 1),
            G0 = G + (T + 1) + y * i;
          (X.push(n, J0, G0), X.push(J0, E0, G0), (c += 6));
        }
      (K.addGroup(E, c, d), (E += c), (G += r));
    }
  }
  copy($) {
    return (
      super.copy($),
      (this.parameters = Object.assign({}, $.parameters)),
      this
    );
  }
  static fromJSON($) {
    return new t0(
      $.width,
      $.height,
      $.depth,
      $.widthSegments,
      $.heightSegments,
      $.depthSegments,
    );
  }
}
function c$($) {
  let J = {};
  for (let Z in $) {
    J[Z] = {};
    for (let Q in $[Z]) {
      let W = $[Z][Q];
      if (
        W &&
        (W.isColor ||
          W.isMatrix3 ||
          W.isMatrix4 ||
          W.isVector2 ||
          W.isVector3 ||
          W.isVector4 ||
          W.isTexture ||
          W.isQuaternion)
      )
        if (W.isRenderTargetTexture)
          (console.warn(
            "UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().",
          ),
            (J[Z][Q] = null));
        else J[Z][Q] = W.clone();
      else if (Array.isArray(W)) J[Z][Q] = W.slice();
      else J[Z][Q] = W;
    }
  }
  return J;
}
function z6($) {
  let J = {};
  for (let Z = 0; Z < $.length; Z++) {
    let Q = c$($[Z]);
    for (let W in Q) J[W] = Q[W];
  }
  return J;
}
function QZ($) {
  let J = [];
  for (let Z = 0; Z < $.length; Z++) J.push($[Z].clone());
  return J;
}
function M7($) {
  if ($.getRenderTarget() === null) return $.outputColorSpace;
  return "srgb-linear";
}
var s8 = { clone: c$, merge: z6 },
  WZ = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,
  YZ = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class v6 extends _$ {
  constructor($) {
    super();
    if (
      ((this.isShaderMaterial = !0),
      (this.type = "ShaderMaterial"),
      (this.defines = {}),
      (this.uniforms = {}),
      (this.uniformsGroups = []),
      (this.vertexShader = WZ),
      (this.fragmentShader = YZ),
      (this.linewidth = 1),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.fog = !1),
      (this.lights = !1),
      (this.clipping = !1),
      (this.forceSinglePass = !0),
      (this.extensions = {
        derivatives: !1,
        fragDepth: !1,
        drawBuffers: !1,
        shaderTextureLOD: !1,
      }),
      (this.defaultAttributeValues = {
        color: [1, 1, 1],
        uv: [0, 0],
        uv1: [0, 0],
      }),
      (this.index0AttributeName = void 0),
      (this.uniformsNeedUpdate = !1),
      (this.glslVersion = null),
      $ !== void 0)
    )
      this.setValues($);
  }
  copy($) {
    return (
      super.copy($),
      (this.fragmentShader = $.fragmentShader),
      (this.vertexShader = $.vertexShader),
      (this.uniforms = c$($.uniforms)),
      (this.uniformsGroups = QZ($.uniformsGroups)),
      (this.defines = Object.assign({}, $.defines)),
      (this.wireframe = $.wireframe),
      (this.wireframeLinewidth = $.wireframeLinewidth),
      (this.fog = $.fog),
      (this.lights = $.lights),
      (this.clipping = $.clipping),
      (this.extensions = Object.assign({}, $.extensions)),
      (this.glslVersion = $.glslVersion),
      this
    );
  }
  toJSON($) {
    let J = super.toJSON($);
    ((J.glslVersion = this.glslVersion), (J.uniforms = {}));
    for (let Q in this.uniforms) {
      let Y = this.uniforms[Q].value;
      if (Y && Y.isTexture)
        J.uniforms[Q] = { type: "t", value: Y.toJSON($).uuid };
      else if (Y && Y.isColor) J.uniforms[Q] = { type: "c", value: Y.getHex() };
      else if (Y && Y.isVector2)
        J.uniforms[Q] = { type: "v2", value: Y.toArray() };
      else if (Y && Y.isVector3)
        J.uniforms[Q] = { type: "v3", value: Y.toArray() };
      else if (Y && Y.isVector4)
        J.uniforms[Q] = { type: "v4", value: Y.toArray() };
      else if (Y && Y.isMatrix3)
        J.uniforms[Q] = { type: "m3", value: Y.toArray() };
      else if (Y && Y.isMatrix4)
        J.uniforms[Q] = { type: "m4", value: Y.toArray() };
      else J.uniforms[Q] = { value: Y };
    }
    if (Object.keys(this.defines).length > 0) J.defines = this.defines;
    ((J.vertexShader = this.vertexShader),
      (J.fragmentShader = this.fragmentShader),
      (J.lights = this.lights),
      (J.clipping = this.clipping));
    let Z = {};
    for (let Q in this.extensions) if (this.extensions[Q] === !0) Z[Q] = !0;
    if (Object.keys(Z).length > 0) J.extensions = Z;
    return J;
  }
}
class i8 extends E6 {
  constructor() {
    super();
    ((this.isCamera = !0),
      (this.type = "Camera"),
      (this.matrixWorldInverse = new $6()),
      (this.projectionMatrix = new $6()),
      (this.projectionMatrixInverse = new $6()),
      (this.coordinateSystem = 2000));
  }
  copy($, J) {
    return (
      super.copy($, J),
      this.matrixWorldInverse.copy($.matrixWorldInverse),
      this.projectionMatrix.copy($.projectionMatrix),
      this.projectionMatrixInverse.copy($.projectionMatrixInverse),
      (this.coordinateSystem = $.coordinateSystem),
      this
    );
  }
  getWorldDirection($) {
    this.updateWorldMatrix(!0, !1);
    let J = this.matrixWorld.elements;
    return $.set(-J[8], -J[9], -J[10]).normalize();
  }
  updateMatrixWorld($) {
    (super.updateMatrixWorld($),
      this.matrixWorldInverse.copy(this.matrixWorld).invert());
  }
  updateWorldMatrix($, J) {
    (super.updateWorldMatrix($, J),
      this.matrixWorldInverse.copy(this.matrixWorld).invert());
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class I6 extends i8 {
  constructor($ = 50, J = 1, Z = 0.1, Q = 2000) {
    super();
    ((this.isPerspectiveCamera = !0),
      (this.type = "PerspectiveCamera"),
      (this.fov = $),
      (this.zoom = 1),
      (this.near = Z),
      (this.far = Q),
      (this.focus = 10),
      (this.aspect = J),
      (this.view = null),
      (this.filmGauge = 35),
      (this.filmOffset = 0),
      this.updateProjectionMatrix());
  }
  copy($, J) {
    return (
      super.copy($, J),
      (this.fov = $.fov),
      (this.zoom = $.zoom),
      (this.near = $.near),
      (this.far = $.far),
      (this.focus = $.focus),
      (this.aspect = $.aspect),
      (this.view = $.view === null ? null : Object.assign({}, $.view)),
      (this.filmGauge = $.filmGauge),
      (this.filmOffset = $.filmOffset),
      this
    );
  }
  setFocalLength($) {
    let J = (0.5 * this.getFilmHeight()) / $;
    ((this.fov = G5 * 2 * Math.atan(J)), this.updateProjectionMatrix());
  }
  getFocalLength() {
    let $ = Math.tan(X5 * 0.5 * this.fov);
    return (0.5 * this.getFilmHeight()) / $;
  }
  getEffectiveFOV() {
    return G5 * 2 * Math.atan(Math.tan(X5 * 0.5 * this.fov) / this.zoom);
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  setViewOffset($, J, Z, Q, W, Y) {
    if (((this.aspect = $ / J), this.view === null))
      this.view = {
        enabled: !0,
        fullWidth: 1,
        fullHeight: 1,
        offsetX: 0,
        offsetY: 0,
        width: 1,
        height: 1,
      };
    ((this.view.enabled = !0),
      (this.view.fullWidth = $),
      (this.view.fullHeight = J),
      (this.view.offsetX = Z),
      (this.view.offsetY = Q),
      (this.view.width = W),
      (this.view.height = Y),
      this.updateProjectionMatrix());
  }
  clearViewOffset() {
    if (this.view !== null) this.view.enabled = !1;
    this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    let $ = this.near,
      J = ($ * Math.tan(X5 * 0.5 * this.fov)) / this.zoom,
      Z = 2 * J,
      Q = this.aspect * Z,
      W = -0.5 * Q,
      Y = this.view;
    if (this.view !== null && this.view.enabled) {
      let { fullWidth: X, fullHeight: H } = Y;
      ((W += (Y.offsetX * Q) / X),
        (J -= (Y.offsetY * Z) / H),
        (Q *= Y.width / X),
        (Z *= Y.height / H));
    }
    let K = this.filmOffset;
    if (K !== 0) W += ($ * K) / this.getFilmWidth();
    (this.projectionMatrix.makePerspective(
      W,
      W + Q,
      J,
      J - Z,
      $,
      this.far,
      this.coordinateSystem,
    ),
      this.projectionMatrixInverse.copy(this.projectionMatrix).invert());
  }
  toJSON($) {
    let J = super.toJSON($);
    if (
      ((J.object.fov = this.fov),
      (J.object.zoom = this.zoom),
      (J.object.near = this.near),
      (J.object.far = this.far),
      (J.object.focus = this.focus),
      (J.object.aspect = this.aspect),
      this.view !== null)
    )
      J.object.view = Object.assign({}, this.view);
    return (
      (J.object.filmGauge = this.filmGauge),
      (J.object.filmOffset = this.filmOffset),
      J
    );
  }
}
var x$ = -90,
  v$ = 1;
class k7 extends E6 {
  constructor($, J, Z) {
    super();
    ((this.type = "CubeCamera"),
      (this.renderTarget = Z),
      (this.coordinateSystem = null));
    let Q = new I6(x$, v$, $, J);
    ((Q.layers = this.layers), this.add(Q));
    let W = new I6(x$, v$, $, J);
    ((W.layers = this.layers), this.add(W));
    let Y = new I6(x$, v$, $, J);
    ((Y.layers = this.layers), this.add(Y));
    let K = new I6(x$, v$, $, J);
    ((K.layers = this.layers), this.add(K));
    let X = new I6(x$, v$, $, J);
    ((X.layers = this.layers), this.add(X));
    let H = new I6(x$, v$, $, J);
    ((H.layers = this.layers), this.add(H));
  }
  updateCoordinateSystem() {
    let $ = this.coordinateSystem,
      J = this.children.concat(),
      [Z, Q, W, Y, K, X] = J;
    for (let H of J) this.remove(H);
    if ($ === 2000)
      (Z.up.set(0, 1, 0),
        Z.lookAt(1, 0, 0),
        Q.up.set(0, 1, 0),
        Q.lookAt(-1, 0, 0),
        W.up.set(0, 0, -1),
        W.lookAt(0, 1, 0),
        Y.up.set(0, 0, 1),
        Y.lookAt(0, -1, 0),
        K.up.set(0, 1, 0),
        K.lookAt(0, 0, 1),
        X.up.set(0, 1, 0),
        X.lookAt(0, 0, -1));
    else if ($ === 2001)
      (Z.up.set(0, -1, 0),
        Z.lookAt(-1, 0, 0),
        Q.up.set(0, -1, 0),
        Q.lookAt(1, 0, 0),
        W.up.set(0, 0, 1),
        W.lookAt(0, 1, 0),
        Y.up.set(0, 0, -1),
        Y.lookAt(0, -1, 0),
        K.up.set(0, -1, 0),
        K.lookAt(0, 0, 1),
        X.up.set(0, -1, 0),
        X.lookAt(0, 0, -1));
    else
      throw Error(
        "THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " +
          $,
      );
    for (let H of J) (this.add(H), H.updateMatrixWorld());
  }
  update($, J) {
    if (this.parent === null) this.updateMatrixWorld();
    let Z = this.renderTarget;
    if (this.coordinateSystem !== $.coordinateSystem)
      ((this.coordinateSystem = $.coordinateSystem),
        this.updateCoordinateSystem());
    let [Q, W, Y, K, X, H] = this.children,
      q = $.getRenderTarget(),
      U = $.xr.enabled;
    $.xr.enabled = !1;
    let G = Z.texture.generateMipmaps;
    ((Z.texture.generateMipmaps = !1),
      $.setRenderTarget(Z, 0),
      $.render(J, Q),
      $.setRenderTarget(Z, 1),
      $.render(J, W),
      $.setRenderTarget(Z, 2),
      $.render(J, Y),
      $.setRenderTarget(Z, 3),
      $.render(J, K),
      $.setRenderTarget(Z, 4),
      $.render(J, X),
      (Z.texture.generateMipmaps = G),
      $.setRenderTarget(Z, 5),
      $.render(J, H),
      $.setRenderTarget(q),
      ($.xr.enabled = U),
      (Z.texture.needsPMREMUpdate = !0));
  }
}
class o8 extends U6 {
  constructor($, J, Z, Q, W, Y, K, X, H, q) {
    (($ = $ !== void 0 ? $ : []), (J = J !== void 0 ? J : 301));
    super($, J, Z, Q, W, Y, K, X, H, q);
    ((this.isCubeTexture = !0), (this.flipY = !1));
  }
  get images() {
    return this.image;
  }
  set images($) {
    this.image = $;
  }
}
class B7 extends S6 {
  constructor($ = 1, J = {}) {
    super($, $, J);
    this.isWebGLCubeRenderTarget = !0;
    let Z = { width: $, height: $, depth: 1 },
      Q = [Z, Z, Z, Z, Z, Z];
    if (J.encoding !== void 0)
      (H5(
        "THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace.",
      ),
        (J.colorSpace = J.encoding === 3001 ? "srgb" : ""));
    ((this.texture = new o8(
      Q,
      J.mapping,
      J.wrapS,
      J.wrapT,
      J.magFilter,
      J.minFilter,
      J.format,
      J.type,
      J.anisotropy,
      J.colorSpace,
    )),
      (this.texture.isRenderTargetTexture = !0),
      (this.texture.generateMipmaps =
        J.generateMipmaps !== void 0 ? J.generateMipmaps : !1),
      (this.texture.minFilter = J.minFilter !== void 0 ? J.minFilter : 1006));
  }
  fromEquirectangularTexture($, J) {
    ((this.texture.type = J.type),
      (this.texture.colorSpace = J.colorSpace),
      (this.texture.generateMipmaps = J.generateMipmaps),
      (this.texture.minFilter = J.minFilter),
      (this.texture.magFilter = J.magFilter));
    let Z = {
        uniforms: { tEquirect: { value: null } },
        vertexShader: `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,
        fragmentShader: `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`,
      },
      Q = new t0(5, 5, 5),
      W = new v6({
        name: "CubemapFromEquirect",
        uniforms: c$(Z.uniforms),
        vertexShader: Z.vertexShader,
        fragmentShader: Z.fragmentShader,
        side: 1,
        blending: 0,
      });
    W.uniforms.tEquirect.value = J;
    let Y = new u0(Q, W),
      K = J.minFilter;
    if (J.minFilter === 1008) J.minFilter = 1006;
    return (
      new k7(1, 10, this).update($, Y),
      (J.minFilter = K),
      Y.geometry.dispose(),
      Y.material.dispose(),
      this
    );
  }
  clear($, J, Z, Q) {
    let W = $.getRenderTarget();
    for (let Y = 0; Y < 6; Y++) ($.setRenderTarget(this, Y), $.clear(J, Z, Q));
    $.setRenderTarget(W);
  }
}
var A8 = new S(),
  XZ = new S(),
  KZ = new f0();
class g6 {
  constructor($ = new S(1, 0, 0), J = 0) {
    ((this.isPlane = !0), (this.normal = $), (this.constant = J));
  }
  set($, J) {
    return (this.normal.copy($), (this.constant = J), this);
  }
  setComponents($, J, Z, Q) {
    return (this.normal.set($, J, Z), (this.constant = Q), this);
  }
  setFromNormalAndCoplanarPoint($, J) {
    return (this.normal.copy($), (this.constant = -J.dot(this.normal)), this);
  }
  setFromCoplanarPoints($, J, Z) {
    let Q = A8.subVectors(Z, J).cross(XZ.subVectors($, J)).normalize();
    return (this.setFromNormalAndCoplanarPoint(Q, $), this);
  }
  copy($) {
    return (this.normal.copy($.normal), (this.constant = $.constant), this);
  }
  normalize() {
    let $ = 1 / this.normal.length();
    return (this.normal.multiplyScalar($), (this.constant *= $), this);
  }
  negate() {
    return ((this.constant *= -1), this.normal.negate(), this);
  }
  distanceToPoint($) {
    return this.normal.dot($) + this.constant;
  }
  distanceToSphere($) {
    return this.distanceToPoint($.center) - $.radius;
  }
  projectPoint($, J) {
    return J.copy($).addScaledVector(this.normal, -this.distanceToPoint($));
  }
  intersectLine($, J) {
    let Z = $.delta(A8),
      Q = this.normal.dot(Z);
    if (Q === 0) {
      if (this.distanceToPoint($.start) === 0) return J.copy($.start);
      return null;
    }
    let W = -($.start.dot(this.normal) + this.constant) / Q;
    if (W < 0 || W > 1) return null;
    return J.copy($.start).addScaledVector(Z, W);
  }
  intersectsLine($) {
    let J = this.distanceToPoint($.start),
      Z = this.distanceToPoint($.end);
    return (J < 0 && Z > 0) || (Z < 0 && J > 0);
  }
  intersectsBox($) {
    return $.intersectsPlane(this);
  }
  intersectsSphere($) {
    return $.intersectsPlane(this);
  }
  coplanarPoint($) {
    return $.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4($, J) {
    let Z = J || KZ.getNormalMatrix($),
      Q = this.coplanarPoint(A8).applyMatrix4($),
      W = this.normal.applyMatrix3(Z).normalize();
    return ((this.constant = -Q.dot(W)), this);
  }
  translate($) {
    return ((this.constant -= $.dot(this.normal)), this);
  }
  equals($) {
    return $.normal.equals(this.normal) && $.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
var N$ = new s5(),
  y5 = new S();
class r5 {
  constructor(
    $ = new g6(),
    J = new g6(),
    Z = new g6(),
    Q = new g6(),
    W = new g6(),
    Y = new g6(),
  ) {
    this.planes = [$, J, Z, Q, W, Y];
  }
  set($, J, Z, Q, W, Y) {
    let K = this.planes;
    return (
      K[0].copy($),
      K[1].copy(J),
      K[2].copy(Z),
      K[3].copy(Q),
      K[4].copy(W),
      K[5].copy(Y),
      this
    );
  }
  copy($) {
    let J = this.planes;
    for (let Z = 0; Z < 6; Z++) J[Z].copy($.planes[Z]);
    return this;
  }
  setFromProjectionMatrix($, J = 2000) {
    let Z = this.planes,
      Q = $.elements,
      W = Q[0],
      Y = Q[1],
      K = Q[2],
      X = Q[3],
      H = Q[4],
      q = Q[5],
      U = Q[6],
      G = Q[7],
      E = Q[8],
      F = Q[9],
      O = Q[10],
      _ = Q[11],
      N = Q[12],
      V = Q[13],
      k = Q[14],
      M = Q[15];
    if (
      (Z[0].setComponents(X - W, G - H, _ - E, M - N).normalize(),
      Z[1].setComponents(X + W, G + H, _ + E, M + N).normalize(),
      Z[2].setComponents(X + Y, G + q, _ + F, M + V).normalize(),
      Z[3].setComponents(X - Y, G - q, _ - F, M - V).normalize(),
      Z[4].setComponents(X - K, G - U, _ - O, M - k).normalize(),
      J === 2000)
    )
      Z[5].setComponents(X + K, G + U, _ + O, M + k).normalize();
    else if (J === 2001) Z[5].setComponents(K, U, O, k).normalize();
    else
      throw Error(
        "THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " +
          J,
      );
    return this;
  }
  intersectsObject($) {
    if ($.boundingSphere !== void 0) {
      if ($.boundingSphere === null) $.computeBoundingSphere();
      N$.copy($.boundingSphere).applyMatrix4($.matrixWorld);
    } else {
      let J = $.geometry;
      if (J.boundingSphere === null) J.computeBoundingSphere();
      N$.copy(J.boundingSphere).applyMatrix4($.matrixWorld);
    }
    return this.intersectsSphere(N$);
  }
  intersectsSprite($) {
    return (
      N$.center.set(0, 0, 0),
      (N$.radius = 0.7071067811865476),
      N$.applyMatrix4($.matrixWorld),
      this.intersectsSphere(N$)
    );
  }
  intersectsSphere($) {
    let J = this.planes,
      Z = $.center,
      Q = -$.radius;
    for (let W = 0; W < 6; W++) if (J[W].distanceToPoint(Z) < Q) return !1;
    return !0;
  }
  intersectsBox($) {
    let J = this.planes;
    for (let Z = 0; Z < 6; Z++) {
      let Q = J[Z];
      if (
        ((y5.x = Q.normal.x > 0 ? $.max.x : $.min.x),
        (y5.y = Q.normal.y > 0 ? $.max.y : $.min.y),
        (y5.z = Q.normal.z > 0 ? $.max.z : $.min.z),
        Q.distanceToPoint(y5) < 0)
      )
        return !1;
    }
    return !0;
  }
  containsPoint($) {
    let J = this.planes;
    for (let Z = 0; Z < 6; Z++) if (J[Z].distanceToPoint($) < 0) return !1;
    return !0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
function w7() {
  let $ = null,
    J = !1,
    Z = null,
    Q = null;
  function W(Y, K) {
    (Z(Y, K), (Q = $.requestAnimationFrame(W)));
  }
  return {
    start: function () {
      if (J === !0) return;
      if (Z === null) return;
      ((Q = $.requestAnimationFrame(W)), (J = !0));
    },
    stop: function () {
      ($.cancelAnimationFrame(Q), (J = !1));
    },
    setAnimationLoop: function (Y) {
      Z = Y;
    },
    setContext: function (Y) {
      $ = Y;
    },
  };
}
function HZ($, J) {
  let Z = J.isWebGL2,
    Q = new WeakMap();
  function W(q, U) {
    let { array: G, usage: E } = q,
      F = $.createBuffer();
    ($.bindBuffer(U, F), $.bufferData(U, G, E), q.onUploadCallback());
    let O;
    if (G instanceof Float32Array) O = $.FLOAT;
    else if (G instanceof Uint16Array)
      if (q.isFloat16BufferAttribute)
        if (Z) O = $.HALF_FLOAT;
        else
          throw Error(
            "THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.",
          );
      else O = $.UNSIGNED_SHORT;
    else if (G instanceof Int16Array) O = $.SHORT;
    else if (G instanceof Uint32Array) O = $.UNSIGNED_INT;
    else if (G instanceof Int32Array) O = $.INT;
    else if (G instanceof Int8Array) O = $.BYTE;
    else if (G instanceof Uint8Array) O = $.UNSIGNED_BYTE;
    else if (G instanceof Uint8ClampedArray) O = $.UNSIGNED_BYTE;
    else
      throw Error(
        "THREE.WebGLAttributes: Unsupported buffer data format: " + G,
      );
    return {
      buffer: F,
      type: O,
      bytesPerElement: G.BYTES_PER_ELEMENT,
      version: q.version,
    };
  }
  function Y(q, U, G) {
    let { array: E, updateRange: F } = U;
    if (($.bindBuffer(G, q), F.count === -1)) $.bufferSubData(G, 0, E);
    else {
      if (Z)
        $.bufferSubData(
          G,
          F.offset * E.BYTES_PER_ELEMENT,
          E,
          F.offset,
          F.count,
        );
      else
        $.bufferSubData(
          G,
          F.offset * E.BYTES_PER_ELEMENT,
          E.subarray(F.offset, F.offset + F.count),
        );
      F.count = -1;
    }
    U.onUploadCallback();
  }
  function K(q) {
    if (q.isInterleavedBufferAttribute) q = q.data;
    return Q.get(q);
  }
  function X(q) {
    if (q.isInterleavedBufferAttribute) q = q.data;
    let U = Q.get(q);
    if (U) ($.deleteBuffer(U.buffer), Q.delete(q));
  }
  function H(q, U) {
    if (q.isGLBufferAttribute) {
      let E = Q.get(q);
      if (!E || E.version < q.version)
        Q.set(q, {
          buffer: q.buffer,
          type: q.type,
          bytesPerElement: q.elementSize,
          version: q.version,
        });
      return;
    }
    if (q.isInterleavedBufferAttribute) q = q.data;
    let G = Q.get(q);
    if (G === void 0) Q.set(q, W(q, U));
    else if (G.version < q.version)
      (Y(G.buffer, q, U), (G.version = q.version));
  }
  return { get: K, remove: X, update: H };
}
class r8 extends d6 {
  constructor($ = 1, J = 1, Z = 1, Q = 1) {
    super();
    ((this.type = "PlaneGeometry"),
      (this.parameters = {
        width: $,
        height: J,
        widthSegments: Z,
        heightSegments: Q,
      }));
    let W = $ / 2,
      Y = J / 2,
      K = Math.floor(Z),
      X = Math.floor(Q),
      H = K + 1,
      q = X + 1,
      U = $ / K,
      G = J / X,
      E = [],
      F = [],
      O = [],
      _ = [];
    for (let N = 0; N < q; N++) {
      let V = N * G - Y;
      for (let k = 0; k < H; k++) {
        let M = k * U - W;
        (F.push(M, -V, 0), O.push(0, 0, 1), _.push(k / K), _.push(1 - N / X));
      }
    }
    for (let N = 0; N < X; N++)
      for (let V = 0; V < K; V++) {
        let k = V + H * N,
          M = V + H * (N + 1),
          A = V + 1 + H * (N + 1),
          L = V + 1 + H * N;
        (E.push(k, M, L), E.push(M, A, L));
      }
    (this.setIndex(E),
      this.setAttribute("position", new x6(F, 3)),
      this.setAttribute("normal", new x6(O, 3)),
      this.setAttribute("uv", new x6(_, 2)));
  }
  copy($) {
    return (
      super.copy($),
      (this.parameters = Object.assign({}, $.parameters)),
      this
    );
  }
  static fromJSON($) {
    return new r8($.width, $.height, $.widthSegments, $.heightSegments);
  }
}
var qZ = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,
  GZ = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,
  UZ = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,
  EZ = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,
  VZ = `#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,
  NZ = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,
  FZ = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,
  RZ = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,
  DZ = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,
  OZ = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,
  _Z = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,
  zZ = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,
  IZ = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = dFdx( surf_pos.xyz );
		vec3 vSigmaY = dFdy( surf_pos.xyz );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,
  CZ = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,
  MZ = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,
  kZ = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,
  BZ = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,
  wZ = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,
  LZ = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,
  AZ = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,
  PZ = `#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,
  TZ = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,
  SZ = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,
  fZ = `vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,
  bZ = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,
  jZ = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,
  yZ = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,
  xZ = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,
  vZ = "gl_FragColor = linearToOutputTexel( gl_FragColor );",
  hZ = `vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,
  gZ = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,
  mZ = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,
  pZ = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,
  uZ = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,
  lZ = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,
  dZ = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,
  cZ = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`,
  nZ = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,
  sZ = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,
  iZ = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,
  oZ = `#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,
  rZ = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,
  aZ = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,
  tZ = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,
  eZ = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,
  $Q = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,
  JQ = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,
  ZQ = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,
  QQ = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,
  WQ = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,
  YQ = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	anisotropyV /= material.anisotropy;
	material.anisotropy = saturate( material.anisotropy );
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x - tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x + tbn[ 0 ] * anisotropyV.y;
#endif`,
  XQ = `struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,
  KQ = `
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometry.viewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometry, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,
  HQ = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometry.viewDir, geometry.normal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,
  qQ = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,
  GQ = `#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,
  UQ = `#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,
  EQ = `#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,
  VQ = `#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,
  NQ = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,
  FQ = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`,
  RQ = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,
  DQ = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,
  OQ = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,
  _Q = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,
  zQ = `#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,
  IQ = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,
  CQ = `#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,
  MQ = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,
  kQ = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 geometryNormal = normal;`,
  BQ = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,
  wQ = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,
  LQ = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,
  AQ = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,
  PQ = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,
  TQ = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,
  SQ = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,
  fQ = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,
  bQ = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,
  jQ = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,
  yQ = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,
  xQ = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,
  vQ = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,
  hQ = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,
  gQ = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,
  mQ = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,
  pQ = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,
  uQ = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,
  lQ = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,
  dQ = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,
  cQ = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,
  nQ = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,
  sQ = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,
  iQ = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,
  oQ = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,
  rQ = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,
  aQ = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,
  tQ = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,
  eQ = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,
  $W = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,
  JW = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,
  ZW = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,
  QW = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,
  WW = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,
  YW = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,
  XW = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,
  KW = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  HW = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,
  qW = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  GW = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,
  UW = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  EW = `#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,
  VW = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,
  NW = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,
  FW = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,
  RW = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,
  DW = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  OW = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,
  _W = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
  zW = `#include <common>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,
  IW = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  CW = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  MW = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  kW = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,
  BW = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  wW = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,
  LW = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,
  AW = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  PW = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  TW = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,
  SW = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  fW = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  bW = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  jW = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,
  yW = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
  xW = `#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  vW = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,
  hW = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,
  gW = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,
  A0 = {
    alphahash_fragment: qZ,
    alphahash_pars_fragment: GZ,
    alphamap_fragment: UZ,
    alphamap_pars_fragment: EZ,
    alphatest_fragment: VZ,
    alphatest_pars_fragment: NZ,
    aomap_fragment: FZ,
    aomap_pars_fragment: RZ,
    begin_vertex: DZ,
    beginnormal_vertex: OZ,
    bsdfs: _Z,
    iridescence_fragment: zZ,
    bumpmap_pars_fragment: IZ,
    clipping_planes_fragment: CZ,
    clipping_planes_pars_fragment: MZ,
    clipping_planes_pars_vertex: kZ,
    clipping_planes_vertex: BZ,
    color_fragment: wZ,
    color_pars_fragment: LZ,
    color_pars_vertex: AZ,
    color_vertex: PZ,
    common: TZ,
    cube_uv_reflection_fragment: SZ,
    defaultnormal_vertex: fZ,
    displacementmap_pars_vertex: bZ,
    displacementmap_vertex: jZ,
    emissivemap_fragment: yZ,
    emissivemap_pars_fragment: xZ,
    colorspace_fragment: vZ,
    colorspace_pars_fragment: hZ,
    envmap_fragment: gZ,
    envmap_common_pars_fragment: mZ,
    envmap_pars_fragment: pZ,
    envmap_pars_vertex: uZ,
    envmap_physical_pars_fragment: $Q,
    envmap_vertex: lZ,
    fog_vertex: dZ,
    fog_pars_vertex: cZ,
    fog_fragment: nZ,
    fog_pars_fragment: sZ,
    gradientmap_pars_fragment: iZ,
    lightmap_fragment: oZ,
    lightmap_pars_fragment: rZ,
    lights_lambert_fragment: aZ,
    lights_lambert_pars_fragment: tZ,
    lights_pars_begin: eZ,
    lights_toon_fragment: JQ,
    lights_toon_pars_fragment: ZQ,
    lights_phong_fragment: QQ,
    lights_phong_pars_fragment: WQ,
    lights_physical_fragment: YQ,
    lights_physical_pars_fragment: XQ,
    lights_fragment_begin: KQ,
    lights_fragment_maps: HQ,
    lights_fragment_end: qQ,
    logdepthbuf_fragment: GQ,
    logdepthbuf_pars_fragment: UQ,
    logdepthbuf_pars_vertex: EQ,
    logdepthbuf_vertex: VQ,
    map_fragment: NQ,
    map_pars_fragment: FQ,
    map_particle_fragment: RQ,
    map_particle_pars_fragment: DQ,
    metalnessmap_fragment: OQ,
    metalnessmap_pars_fragment: _Q,
    morphcolor_vertex: zQ,
    morphnormal_vertex: IQ,
    morphtarget_pars_vertex: CQ,
    morphtarget_vertex: MQ,
    normal_fragment_begin: kQ,
    normal_fragment_maps: BQ,
    normal_pars_fragment: wQ,
    normal_pars_vertex: LQ,
    normal_vertex: AQ,
    normalmap_pars_fragment: PQ,
    clearcoat_normal_fragment_begin: TQ,
    clearcoat_normal_fragment_maps: SQ,
    clearcoat_pars_fragment: fQ,
    iridescence_pars_fragment: bQ,
    opaque_fragment: jQ,
    packing: yQ,
    premultiplied_alpha_fragment: xQ,
    project_vertex: vQ,
    dithering_fragment: hQ,
    dithering_pars_fragment: gQ,
    roughnessmap_fragment: mQ,
    roughnessmap_pars_fragment: pQ,
    shadowmap_pars_fragment: uQ,
    shadowmap_pars_vertex: lQ,
    shadowmap_vertex: dQ,
    shadowmask_pars_fragment: cQ,
    skinbase_vertex: nQ,
    skinning_pars_vertex: sQ,
    skinning_vertex: iQ,
    skinnormal_vertex: oQ,
    specularmap_fragment: rQ,
    specularmap_pars_fragment: aQ,
    tonemapping_fragment: tQ,
    tonemapping_pars_fragment: eQ,
    transmission_fragment: $W,
    transmission_pars_fragment: JW,
    uv_pars_fragment: ZW,
    uv_pars_vertex: QW,
    uv_vertex: WW,
    worldpos_vertex: YW,
    background_vert: XW,
    background_frag: KW,
    backgroundCube_vert: HW,
    backgroundCube_frag: qW,
    cube_vert: GW,
    cube_frag: UW,
    depth_vert: EW,
    depth_frag: VW,
    distanceRGBA_vert: NW,
    distanceRGBA_frag: FW,
    equirect_vert: RW,
    equirect_frag: DW,
    linedashed_vert: OW,
    linedashed_frag: _W,
    meshbasic_vert: zW,
    meshbasic_frag: IW,
    meshlambert_vert: CW,
    meshlambert_frag: MW,
    meshmatcap_vert: kW,
    meshmatcap_frag: BW,
    meshnormal_vert: wW,
    meshnormal_frag: LW,
    meshphong_vert: AW,
    meshphong_frag: PW,
    meshphysical_vert: TW,
    meshphysical_frag: SW,
    meshtoon_vert: fW,
    meshtoon_frag: bW,
    points_vert: jW,
    points_frag: yW,
    shadow_vert: xW,
    shadow_frag: vW,
    sprite_vert: hW,
    sprite_frag: gW,
  },
  X0 = {
    common: {
      diffuse: { value: new h0(16777215) },
      opacity: { value: 1 },
      map: { value: null },
      mapTransform: { value: new f0() },
      alphaMap: { value: null },
      alphaMapTransform: { value: new f0() },
      alphaTest: { value: 0 },
    },
    specularmap: {
      specularMap: { value: null },
      specularMapTransform: { value: new f0() },
    },
    envmap: {
      envMap: { value: null },
      flipEnvMap: { value: -1 },
      reflectivity: { value: 1 },
      ior: { value: 1.5 },
      refractionRatio: { value: 0.98 },
    },
    aomap: {
      aoMap: { value: null },
      aoMapIntensity: { value: 1 },
      aoMapTransform: { value: new f0() },
    },
    lightmap: {
      lightMap: { value: null },
      lightMapIntensity: { value: 1 },
      lightMapTransform: { value: new f0() },
    },
    bumpmap: {
      bumpMap: { value: null },
      bumpMapTransform: { value: new f0() },
      bumpScale: { value: 1 },
    },
    normalmap: {
      normalMap: { value: null },
      normalMapTransform: { value: new f0() },
      normalScale: { value: new R0(1, 1) },
    },
    displacementmap: {
      displacementMap: { value: null },
      displacementMapTransform: { value: new f0() },
      displacementScale: { value: 1 },
      displacementBias: { value: 0 },
    },
    emissivemap: {
      emissiveMap: { value: null },
      emissiveMapTransform: { value: new f0() },
    },
    metalnessmap: {
      metalnessMap: { value: null },
      metalnessMapTransform: { value: new f0() },
    },
    roughnessmap: {
      roughnessMap: { value: null },
      roughnessMapTransform: { value: new f0() },
    },
    gradientmap: { gradientMap: { value: null } },
    fog: {
      fogDensity: { value: 0.00025 },
      fogNear: { value: 1 },
      fogFar: { value: 2000 },
      fogColor: { value: new h0(16777215) },
    },
    lights: {
      ambientLightColor: { value: [] },
      lightProbe: { value: [] },
      directionalLights: {
        value: [],
        properties: { direction: {}, color: {} },
      },
      directionalLightShadows: {
        value: [],
        properties: {
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {},
        },
      },
      directionalShadowMap: { value: [] },
      directionalShadowMatrix: { value: [] },
      spotLights: {
        value: [],
        properties: {
          color: {},
          position: {},
          direction: {},
          distance: {},
          coneCos: {},
          penumbraCos: {},
          decay: {},
        },
      },
      spotLightShadows: {
        value: [],
        properties: {
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {},
        },
      },
      spotLightMap: { value: [] },
      spotShadowMap: { value: [] },
      spotLightMatrix: { value: [] },
      pointLights: {
        value: [],
        properties: { color: {}, position: {}, decay: {}, distance: {} },
      },
      pointLightShadows: {
        value: [],
        properties: {
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {},
          shadowCameraNear: {},
          shadowCameraFar: {},
        },
      },
      pointShadowMap: { value: [] },
      pointShadowMatrix: { value: [] },
      hemisphereLights: {
        value: [],
        properties: { direction: {}, skyColor: {}, groundColor: {} },
      },
      rectAreaLights: {
        value: [],
        properties: { color: {}, position: {}, width: {}, height: {} },
      },
      ltc_1: { value: null },
      ltc_2: { value: null },
    },
    points: {
      diffuse: { value: new h0(16777215) },
      opacity: { value: 1 },
      size: { value: 1 },
      scale: { value: 1 },
      map: { value: null },
      alphaMap: { value: null },
      alphaMapTransform: { value: new f0() },
      alphaTest: { value: 0 },
      uvTransform: { value: new f0() },
    },
    sprite: {
      diffuse: { value: new h0(16777215) },
      opacity: { value: 1 },
      center: { value: new R0(0.5, 0.5) },
      rotation: { value: 0 },
      map: { value: null },
      mapTransform: { value: new f0() },
      alphaMap: { value: null },
      alphaMapTransform: { value: new f0() },
      alphaTest: { value: 0 },
    },
  },
  m6 = {
    basic: {
      uniforms: z6([
        X0.common,
        X0.specularmap,
        X0.envmap,
        X0.aomap,
        X0.lightmap,
        X0.fog,
      ]),
      vertexShader: A0.meshbasic_vert,
      fragmentShader: A0.meshbasic_frag,
    },
    lambert: {
      uniforms: z6([
        X0.common,
        X0.specularmap,
        X0.envmap,
        X0.aomap,
        X0.lightmap,
        X0.emissivemap,
        X0.bumpmap,
        X0.normalmap,
        X0.displacementmap,
        X0.fog,
        X0.lights,
        { emissive: { value: new h0(0) } },
      ]),
      vertexShader: A0.meshlambert_vert,
      fragmentShader: A0.meshlambert_frag,
    },
    phong: {
      uniforms: z6([
        X0.common,
        X0.specularmap,
        X0.envmap,
        X0.aomap,
        X0.lightmap,
        X0.emissivemap,
        X0.bumpmap,
        X0.normalmap,
        X0.displacementmap,
        X0.fog,
        X0.lights,
        {
          emissive: { value: new h0(0) },
          specular: { value: new h0(1118481) },
          shininess: { value: 30 },
        },
      ]),
      vertexShader: A0.meshphong_vert,
      fragmentShader: A0.meshphong_frag,
    },
    standard: {
      uniforms: z6([
        X0.common,
        X0.envmap,
        X0.aomap,
        X0.lightmap,
        X0.emissivemap,
        X0.bumpmap,
        X0.normalmap,
        X0.displacementmap,
        X0.roughnessmap,
        X0.metalnessmap,
        X0.fog,
        X0.lights,
        {
          emissive: { value: new h0(0) },
          roughness: { value: 1 },
          metalness: { value: 0 },
          envMapIntensity: { value: 1 },
        },
      ]),
      vertexShader: A0.meshphysical_vert,
      fragmentShader: A0.meshphysical_frag,
    },
    toon: {
      uniforms: z6([
        X0.common,
        X0.aomap,
        X0.lightmap,
        X0.emissivemap,
        X0.bumpmap,
        X0.normalmap,
        X0.displacementmap,
        X0.gradientmap,
        X0.fog,
        X0.lights,
        { emissive: { value: new h0(0) } },
      ]),
      vertexShader: A0.meshtoon_vert,
      fragmentShader: A0.meshtoon_frag,
    },
    matcap: {
      uniforms: z6([
        X0.common,
        X0.bumpmap,
        X0.normalmap,
        X0.displacementmap,
        X0.fog,
        { matcap: { value: null } },
      ]),
      vertexShader: A0.meshmatcap_vert,
      fragmentShader: A0.meshmatcap_frag,
    },
    points: {
      uniforms: z6([X0.points, X0.fog]),
      vertexShader: A0.points_vert,
      fragmentShader: A0.points_frag,
    },
    dashed: {
      uniforms: z6([
        X0.common,
        X0.fog,
        {
          scale: { value: 1 },
          dashSize: { value: 1 },
          totalSize: { value: 2 },
        },
      ]),
      vertexShader: A0.linedashed_vert,
      fragmentShader: A0.linedashed_frag,
    },
    depth: {
      uniforms: z6([X0.common, X0.displacementmap]),
      vertexShader: A0.depth_vert,
      fragmentShader: A0.depth_frag,
    },
    normal: {
      uniforms: z6([
        X0.common,
        X0.bumpmap,
        X0.normalmap,
        X0.displacementmap,
        { opacity: { value: 1 } },
      ]),
      vertexShader: A0.meshnormal_vert,
      fragmentShader: A0.meshnormal_frag,
    },
    sprite: {
      uniforms: z6([X0.sprite, X0.fog]),
      vertexShader: A0.sprite_vert,
      fragmentShader: A0.sprite_frag,
    },
    background: {
      uniforms: {
        uvTransform: { value: new f0() },
        t2D: { value: null },
        backgroundIntensity: { value: 1 },
      },
      vertexShader: A0.background_vert,
      fragmentShader: A0.background_frag,
    },
    backgroundCube: {
      uniforms: {
        envMap: { value: null },
        flipEnvMap: { value: -1 },
        backgroundBlurriness: { value: 0 },
        backgroundIntensity: { value: 1 },
      },
      vertexShader: A0.backgroundCube_vert,
      fragmentShader: A0.backgroundCube_frag,
    },
    cube: {
      uniforms: {
        tCube: { value: null },
        tFlip: { value: -1 },
        opacity: { value: 1 },
      },
      vertexShader: A0.cube_vert,
      fragmentShader: A0.cube_frag,
    },
    equirect: {
      uniforms: { tEquirect: { value: null } },
      vertexShader: A0.equirect_vert,
      fragmentShader: A0.equirect_frag,
    },
    distanceRGBA: {
      uniforms: z6([
        X0.common,
        X0.displacementmap,
        {
          referencePosition: { value: new S() },
          nearDistance: { value: 1 },
          farDistance: { value: 1000 },
        },
      ]),
      vertexShader: A0.distanceRGBA_vert,
      fragmentShader: A0.distanceRGBA_frag,
    },
    shadow: {
      uniforms: z6([
        X0.lights,
        X0.fog,
        { color: { value: new h0(0) }, opacity: { value: 1 } },
      ]),
      vertexShader: A0.shadow_vert,
      fragmentShader: A0.shadow_frag,
    },
  };
m6.physical = {
  uniforms: z6([
    m6.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: new f0() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: new f0() },
      clearcoatNormalScale: { value: new R0(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: new f0() },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: new f0() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: new f0() },
      sheen: { value: 0 },
      sheenColor: { value: new h0(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: new f0() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: new f0() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: new f0() },
      transmissionSamplerSize: { value: new R0() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: new f0() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: new h0(0) },
      specularColor: { value: new h0(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: new f0() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: new f0() },
      anisotropyVector: { value: new R0() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: new f0() },
    },
  ]),
  vertexShader: A0.meshphysical_vert,
  fragmentShader: A0.meshphysical_frag,
};
var x5 = { r: 0, b: 0, g: 0 };
function mW($, J, Z, Q, W, Y, K) {
  let X = new h0(0),
    H = Y === !0 ? 0 : 1,
    q,
    U,
    G = null,
    E = 0,
    F = null;
  function O(N, V) {
    let k = !1,
      M = V.isScene === !0 ? V.background : null;
    if (M && M.isTexture) M = (V.backgroundBlurriness > 0 ? Z : J).get(M);
    if (M === null) _(X, H);
    else if (M && M.isColor) (_(M, 1), (k = !0));
    let A = $.xr.getEnvironmentBlendMode();
    if (A === "additive") Q.buffers.color.setClear(0, 0, 0, 1, K);
    else if (A === "alpha-blend") Q.buffers.color.setClear(0, 0, 0, 0, K);
    if ($.autoClear || k)
      $.clear($.autoClearColor, $.autoClearDepth, $.autoClearStencil);
    if (M && (M.isCubeTexture || M.mapping === 306)) {
      if (U === void 0)
        ((U = new u0(
          new t0(1, 1, 1),
          new v6({
            name: "BackgroundCubeMaterial",
            uniforms: c$(m6.backgroundCube.uniforms),
            vertexShader: m6.backgroundCube.vertexShader,
            fragmentShader: m6.backgroundCube.fragmentShader,
            side: 1,
            depthTest: !1,
            depthWrite: !1,
            fog: !1,
          }),
        )),
          U.geometry.deleteAttribute("normal"),
          U.geometry.deleteAttribute("uv"),
          (U.onBeforeRender = function (L, C, g) {
            this.matrixWorld.copyPosition(g.matrixWorld);
          }),
          Object.defineProperty(U.material, "envMap", {
            get: function () {
              return this.uniforms.envMap.value;
            },
          }),
          W.update(U));
      if (
        ((U.material.uniforms.envMap.value = M),
        (U.material.uniforms.flipEnvMap.value =
          M.isCubeTexture && M.isRenderTargetTexture === !1 ? -1 : 1),
        (U.material.uniforms.backgroundBlurriness.value =
          V.backgroundBlurriness),
        (U.material.uniforms.backgroundIntensity.value = V.backgroundIntensity),
        (U.material.toneMapped = M.colorSpace === "srgb" ? !1 : !0),
        G !== M || E !== M.version || F !== $.toneMapping)
      )
        ((U.material.needsUpdate = !0),
          (G = M),
          (E = M.version),
          (F = $.toneMapping));
      (U.layers.enableAll(), N.unshift(U, U.geometry, U.material, 0, 0, null));
    } else if (M && M.isTexture) {
      if (q === void 0)
        ((q = new u0(
          new r8(2, 2),
          new v6({
            name: "BackgroundMaterial",
            uniforms: c$(m6.background.uniforms),
            vertexShader: m6.background.vertexShader,
            fragmentShader: m6.background.fragmentShader,
            side: 0,
            depthTest: !1,
            depthWrite: !1,
            fog: !1,
          }),
        )),
          q.geometry.deleteAttribute("normal"),
          Object.defineProperty(q.material, "map", {
            get: function () {
              return this.uniforms.t2D.value;
            },
          }),
          W.update(q));
      if (
        ((q.material.uniforms.t2D.value = M),
        (q.material.uniforms.backgroundIntensity.value = V.backgroundIntensity),
        (q.material.toneMapped = M.colorSpace === "srgb" ? !1 : !0),
        M.matrixAutoUpdate === !0)
      )
        M.updateMatrix();
      if (
        (q.material.uniforms.uvTransform.value.copy(M.matrix),
        G !== M || E !== M.version || F !== $.toneMapping)
      )
        ((q.material.needsUpdate = !0),
          (G = M),
          (E = M.version),
          (F = $.toneMapping));
      (q.layers.enableAll(), N.unshift(q, q.geometry, q.material, 0, 0, null));
    }
  }
  function _(N, V) {
    (N.getRGB(x5, M7($)), Q.buffers.color.setClear(x5.r, x5.g, x5.b, V, K));
  }
  return {
    getClearColor: function () {
      return X;
    },
    setClearColor: function (N, V = 1) {
      (X.set(N), (H = V), _(X, H));
    },
    getClearAlpha: function () {
      return H;
    },
    setClearAlpha: function (N) {
      ((H = N), _(X, H));
    },
    render: O,
  };
}
function pW($, J, Z, Q) {
  let W = $.getParameter($.MAX_VERTEX_ATTRIBS),
    Y = Q.isWebGL2 ? null : J.get("OES_vertex_array_object"),
    K = Q.isWebGL2 || Y !== null,
    X = {},
    H = N(null),
    q = H,
    U = !1;
  function G(y, l, r, c, u) {
    let i = !1;
    if (K) {
      let T = _(c, r, l);
      if (q !== T) ((q = T), F(q.object));
      if (((i = V(y, c, r, u)), i)) k(y, c, r, u);
    } else {
      let T = l.wireframe === !0;
      if (q.geometry !== c.id || q.program !== r.id || q.wireframe !== T)
        ((q.geometry = c.id), (q.program = r.id), (q.wireframe = T), (i = !0));
    }
    if (u !== null) Z.update(u, $.ELEMENT_ARRAY_BUFFER);
    if (i || U) {
      if (((U = !1), d(y, l, r, c), u !== null))
        $.bindBuffer($.ELEMENT_ARRAY_BUFFER, Z.get(u).buffer);
    }
  }
  function E() {
    if (Q.isWebGL2) return $.createVertexArray();
    return Y.createVertexArrayOES();
  }
  function F(y) {
    if (Q.isWebGL2) return $.bindVertexArray(y);
    return Y.bindVertexArrayOES(y);
  }
  function O(y) {
    if (Q.isWebGL2) return $.deleteVertexArray(y);
    return Y.deleteVertexArrayOES(y);
  }
  function _(y, l, r) {
    let c = r.wireframe === !0,
      u = X[y.id];
    if (u === void 0) ((u = {}), (X[y.id] = u));
    let i = u[l.id];
    if (i === void 0) ((i = {}), (u[l.id] = i));
    let T = i[c];
    if (T === void 0) ((T = N(E())), (i[c] = T));
    return T;
  }
  function N(y) {
    let l = [],
      r = [],
      c = [];
    for (let u = 0; u < W; u++) ((l[u] = 0), (r[u] = 0), (c[u] = 0));
    return {
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: l,
      enabledAttributes: r,
      attributeDivisors: c,
      object: y,
      attributes: {},
      index: null,
    };
  }
  function V(y, l, r, c) {
    let u = q.attributes,
      i = l.attributes,
      T = 0,
      n = r.getAttributes();
    for (let J0 in n)
      if (n[J0].location >= 0) {
        let G0 = u[J0],
          V0 = i[J0];
        if (V0 === void 0) {
          if (J0 === "instanceMatrix" && y.instanceMatrix)
            V0 = y.instanceMatrix;
          if (J0 === "instanceColor" && y.instanceColor) V0 = y.instanceColor;
        }
        if (G0 === void 0) return !0;
        if (G0.attribute !== V0) return !0;
        if (V0 && G0.data !== V0.data) return !0;
        T++;
      }
    if (q.attributesNum !== T) return !0;
    if (q.index !== c) return !0;
    return !1;
  }
  function k(y, l, r, c) {
    let u = {},
      i = l.attributes,
      T = 0,
      n = r.getAttributes();
    for (let J0 in n)
      if (n[J0].location >= 0) {
        let G0 = i[J0];
        if (G0 === void 0) {
          if (J0 === "instanceMatrix" && y.instanceMatrix)
            G0 = y.instanceMatrix;
          if (J0 === "instanceColor" && y.instanceColor) G0 = y.instanceColor;
        }
        let V0 = {};
        if (((V0.attribute = G0), G0 && G0.data)) V0.data = G0.data;
        ((u[J0] = V0), T++);
      }
    ((q.attributes = u), (q.attributesNum = T), (q.index = c));
  }
  function M() {
    let y = q.newAttributes;
    for (let l = 0, r = y.length; l < r; l++) y[l] = 0;
  }
  function A(y) {
    L(y, 0);
  }
  function L(y, l) {
    let { newAttributes: r, enabledAttributes: c, attributeDivisors: u } = q;
    if (((r[y] = 1), c[y] === 0)) ($.enableVertexAttribArray(y), (c[y] = 1));
    if (u[y] !== l)
      ((Q.isWebGL2 ? $ : J.get("ANGLE_instanced_arrays"))[
        Q.isWebGL2 ? "vertexAttribDivisor" : "vertexAttribDivisorANGLE"
      ](y, l),
        (u[y] = l));
  }
  function C() {
    let { newAttributes: y, enabledAttributes: l } = q;
    for (let r = 0, c = l.length; r < c; r++)
      if (l[r] !== y[r]) ($.disableVertexAttribArray(r), (l[r] = 0));
  }
  function g(y, l, r, c, u, i, T) {
    if (T === !0) $.vertexAttribIPointer(y, l, r, u, i);
    else $.vertexAttribPointer(y, l, r, c, u, i);
  }
  function d(y, l, r, c) {
    if (
      Q.isWebGL2 === !1 &&
      (y.isInstancedMesh || c.isInstancedBufferGeometry)
    ) {
      if (J.get("ANGLE_instanced_arrays") === null) return;
    }
    M();
    let u = c.attributes,
      i = r.getAttributes(),
      T = l.defaultAttributeValues;
    for (let n in i) {
      let J0 = i[n];
      if (J0.location >= 0) {
        let E0 = u[n];
        if (E0 === void 0) {
          if (n === "instanceMatrix" && y.instanceMatrix) E0 = y.instanceMatrix;
          if (n === "instanceColor" && y.instanceColor) E0 = y.instanceColor;
        }
        if (E0 !== void 0) {
          let { normalized: G0, itemSize: V0 } = E0,
            v0 = Z.get(E0);
          if (v0 === void 0) continue;
          let { buffer: e, type: z0, bytesPerElement: g0 } = v0,
            Y6 =
              Q.isWebGL2 === !0 &&
              (z0 === $.INT || z0 === $.UNSIGNED_INT || E0.gpuType === 1013);
          if (E0.isInterleavedBufferAttribute) {
            let f = E0.data,
              o0 = f.stride,
              b0 = E0.offset;
            if (f.isInstancedInterleavedBuffer) {
              for (let O0 = 0; O0 < J0.locationSize; O0++)
                L(J0.location + O0, f.meshPerAttribute);
              if (y.isInstancedMesh !== !0 && c._maxInstanceCount === void 0)
                c._maxInstanceCount = f.meshPerAttribute * f.count;
            } else
              for (let O0 = 0; O0 < J0.locationSize; O0++) A(J0.location + O0);
            $.bindBuffer($.ARRAY_BUFFER, e);
            for (let O0 = 0; O0 < J0.locationSize; O0++)
              g(
                J0.location + O0,
                V0 / J0.locationSize,
                z0,
                G0,
                o0 * g0,
                (b0 + (V0 / J0.locationSize) * O0) * g0,
                Y6,
              );
          } else {
            if (E0.isInstancedBufferAttribute) {
              for (let f = 0; f < J0.locationSize; f++)
                L(J0.location + f, E0.meshPerAttribute);
              if (y.isInstancedMesh !== !0 && c._maxInstanceCount === void 0)
                c._maxInstanceCount = E0.meshPerAttribute * E0.count;
            } else for (let f = 0; f < J0.locationSize; f++) A(J0.location + f);
            $.bindBuffer($.ARRAY_BUFFER, e);
            for (let f = 0; f < J0.locationSize; f++)
              g(
                J0.location + f,
                V0 / J0.locationSize,
                z0,
                G0,
                V0 * g0,
                (V0 / J0.locationSize) * f * g0,
                Y6,
              );
          }
        } else if (T !== void 0) {
          let G0 = T[n];
          if (G0 !== void 0)
            switch (G0.length) {
              case 2:
                $.vertexAttrib2fv(J0.location, G0);
                break;
              case 3:
                $.vertexAttrib3fv(J0.location, G0);
                break;
              case 4:
                $.vertexAttrib4fv(J0.location, G0);
                break;
              default:
                $.vertexAttrib1fv(J0.location, G0);
            }
        }
      }
    }
    C();
  }
  function R() {
    W0();
    for (let y in X) {
      let l = X[y];
      for (let r in l) {
        let c = l[r];
        for (let u in c) (O(c[u].object), delete c[u]);
        delete l[r];
      }
      delete X[y];
    }
  }
  function w(y) {
    if (X[y.id] === void 0) return;
    let l = X[y.id];
    for (let r in l) {
      let c = l[r];
      for (let u in c) (O(c[u].object), delete c[u]);
      delete l[r];
    }
    delete X[y.id];
  }
  function s(y) {
    for (let l in X) {
      let r = X[l];
      if (r[y.id] === void 0) continue;
      let c = r[y.id];
      for (let u in c) (O(c[u].object), delete c[u]);
      delete r[y.id];
    }
  }
  function W0() {
    if ((h(), (U = !0), q === H)) return;
    ((q = H), F(q.object));
  }
  function h() {
    ((H.geometry = null), (H.program = null), (H.wireframe = !1));
  }
  return {
    setup: G,
    reset: W0,
    resetDefaultState: h,
    dispose: R,
    releaseStatesOfGeometry: w,
    releaseStatesOfProgram: s,
    initAttributes: M,
    enableAttribute: A,
    disableUnusedAttributes: C,
  };
}
function uW($, J, Z, Q) {
  let W = Q.isWebGL2,
    Y;
  function K(q) {
    Y = q;
  }
  function X(q, U) {
    ($.drawArrays(Y, q, U), Z.update(U, Y, 1));
  }
  function H(q, U, G) {
    if (G === 0) return;
    let E, F;
    if (W) ((E = $), (F = "drawArraysInstanced"));
    else if (
      ((E = J.get("ANGLE_instanced_arrays")),
      (F = "drawArraysInstancedANGLE"),
      E === null)
    ) {
      console.error(
        "THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.",
      );
      return;
    }
    (E[F](Y, q, U, G), Z.update(U, Y, G));
  }
  ((this.setMode = K), (this.render = X), (this.renderInstances = H));
}
function lW($, J, Z) {
  let Q;
  function W() {
    if (Q !== void 0) return Q;
    if (J.has("EXT_texture_filter_anisotropic") === !0) {
      let g = J.get("EXT_texture_filter_anisotropic");
      Q = $.getParameter(g.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else Q = 0;
    return Q;
  }
  function Y(g) {
    if (g === "highp") {
      if (
        $.getShaderPrecisionFormat($.VERTEX_SHADER, $.HIGH_FLOAT).precision >
          0 &&
        $.getShaderPrecisionFormat($.FRAGMENT_SHADER, $.HIGH_FLOAT).precision >
          0
      )
        return "highp";
      g = "mediump";
    }
    if (g === "mediump") {
      if (
        $.getShaderPrecisionFormat($.VERTEX_SHADER, $.MEDIUM_FLOAT).precision >
          0 &&
        $.getShaderPrecisionFormat($.FRAGMENT_SHADER, $.MEDIUM_FLOAT)
          .precision > 0
      )
        return "mediump";
    }
    return "lowp";
  }
  let K =
      typeof WebGL2RenderingContext < "u" &&
      $.constructor.name === "WebGL2RenderingContext",
    X = Z.precision !== void 0 ? Z.precision : "highp",
    H = Y(X);
  if (H !== X)
    (console.warn(
      "THREE.WebGLRenderer:",
      X,
      "not supported, using",
      H,
      "instead.",
    ),
      (X = H));
  let q = K || J.has("WEBGL_draw_buffers"),
    U = Z.logarithmicDepthBuffer === !0,
    G = $.getParameter($.MAX_TEXTURE_IMAGE_UNITS),
    E = $.getParameter($.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
    F = $.getParameter($.MAX_TEXTURE_SIZE),
    O = $.getParameter($.MAX_CUBE_MAP_TEXTURE_SIZE),
    _ = $.getParameter($.MAX_VERTEX_ATTRIBS),
    N = $.getParameter($.MAX_VERTEX_UNIFORM_VECTORS),
    V = $.getParameter($.MAX_VARYING_VECTORS),
    k = $.getParameter($.MAX_FRAGMENT_UNIFORM_VECTORS),
    M = E > 0,
    A = K || J.has("OES_texture_float"),
    L = M && A,
    C = K ? $.getParameter($.MAX_SAMPLES) : 0;
  return {
    isWebGL2: K,
    drawBuffers: q,
    getMaxAnisotropy: W,
    getMaxPrecision: Y,
    precision: X,
    logarithmicDepthBuffer: U,
    maxTextures: G,
    maxVertexTextures: E,
    maxTextureSize: F,
    maxCubemapSize: O,
    maxAttributes: _,
    maxVertexUniforms: N,
    maxVaryings: V,
    maxFragmentUniforms: k,
    vertexTextures: M,
    floatFragmentTextures: A,
    floatVertexTextures: L,
    maxSamples: C,
  };
}
function dW($) {
  let J = this,
    Z = null,
    Q = 0,
    W = !1,
    Y = !1,
    K = new g6(),
    X = new f0(),
    H = { value: null, needsUpdate: !1 };
  ((this.uniform = H),
    (this.numPlanes = 0),
    (this.numIntersection = 0),
    (this.init = function (G, E) {
      let F = G.length !== 0 || E || Q !== 0 || W;
      return ((W = E), (Q = G.length), F);
    }),
    (this.beginShadows = function () {
      ((Y = !0), U(null));
    }),
    (this.endShadows = function () {
      Y = !1;
    }),
    (this.setGlobalState = function (G, E) {
      Z = U(G, E, 0);
    }),
    (this.setState = function (G, E, F) {
      let { clippingPlanes: O, clipIntersection: _, clipShadows: N } = G,
        V = $.get(G);
      if (!W || O === null || O.length === 0 || (Y && !N))
        if (Y) U(null);
        else q();
      else {
        let k = Y ? 0 : Q,
          M = k * 4,
          A = V.clippingState || null;
        ((H.value = A), (A = U(O, E, M, F)));
        for (let L = 0; L !== M; ++L) A[L] = Z[L];
        ((V.clippingState = A),
          (this.numIntersection = _ ? this.numPlanes : 0),
          (this.numPlanes += k));
      }
    }));
  function q() {
    if (H.value !== Z) ((H.value = Z), (H.needsUpdate = Q > 0));
    ((J.numPlanes = Q), (J.numIntersection = 0));
  }
  function U(G, E, F, O) {
    let _ = G !== null ? G.length : 0,
      N = null;
    if (_ !== 0) {
      if (((N = H.value), O !== !0 || N === null)) {
        let V = F + _ * 4,
          k = E.matrixWorldInverse;
        if ((X.getNormalMatrix(k), N === null || N.length < V))
          N = new Float32Array(V);
        for (let M = 0, A = F; M !== _; ++M, A += 4)
          (K.copy(G[M]).applyMatrix4(k, X),
            K.normal.toArray(N, A),
            (N[A + 3] = K.constant));
      }
      ((H.value = N), (H.needsUpdate = !0));
    }
    return ((J.numPlanes = _), (J.numIntersection = 0), N);
  }
}
function cW($) {
  let J = new WeakMap();
  function Z(K, X) {
    if (X === 303) K.mapping = 301;
    else if (X === 304) K.mapping = 302;
    return K;
  }
  function Q(K) {
    if (K && K.isTexture && K.isRenderTargetTexture === !1) {
      let X = K.mapping;
      if (X === 303 || X === 304)
        if (J.has(K)) {
          let H = J.get(K).texture;
          return Z(H, K.mapping);
        } else {
          let H = K.image;
          if (H && H.height > 0) {
            let q = new B7(H.height / 2);
            return (
              q.fromEquirectangularTexture($, K),
              J.set(K, q),
              K.addEventListener("dispose", W),
              Z(q.texture, K.mapping)
            );
          } else return null;
        }
    }
    return K;
  }
  function W(K) {
    let X = K.target;
    X.removeEventListener("dispose", W);
    let H = J.get(X);
    if (H !== void 0) (J.delete(X), H.dispose());
  }
  function Y() {
    J = new WeakMap();
  }
  return { get: Q, dispose: Y };
}
class a5 extends i8 {
  constructor($ = -1, J = 1, Z = 1, Q = -1, W = 0.1, Y = 2000) {
    super();
    ((this.isOrthographicCamera = !0),
      (this.type = "OrthographicCamera"),
      (this.zoom = 1),
      (this.view = null),
      (this.left = $),
      (this.right = J),
      (this.top = Z),
      (this.bottom = Q),
      (this.near = W),
      (this.far = Y),
      this.updateProjectionMatrix());
  }
  copy($, J) {
    return (
      super.copy($, J),
      (this.left = $.left),
      (this.right = $.right),
      (this.top = $.top),
      (this.bottom = $.bottom),
      (this.near = $.near),
      (this.far = $.far),
      (this.zoom = $.zoom),
      (this.view = $.view === null ? null : Object.assign({}, $.view)),
      this
    );
  }
  setViewOffset($, J, Z, Q, W, Y) {
    if (this.view === null)
      this.view = {
        enabled: !0,
        fullWidth: 1,
        fullHeight: 1,
        offsetX: 0,
        offsetY: 0,
        width: 1,
        height: 1,
      };
    ((this.view.enabled = !0),
      (this.view.fullWidth = $),
      (this.view.fullHeight = J),
      (this.view.offsetX = Z),
      (this.view.offsetY = Q),
      (this.view.width = W),
      (this.view.height = Y),
      this.updateProjectionMatrix());
  }
  clearViewOffset() {
    if (this.view !== null) this.view.enabled = !1;
    this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    let $ = (this.right - this.left) / (2 * this.zoom),
      J = (this.top - this.bottom) / (2 * this.zoom),
      Z = (this.right + this.left) / 2,
      Q = (this.top + this.bottom) / 2,
      W = Z - $,
      Y = Z + $,
      K = Q + J,
      X = Q - J;
    if (this.view !== null && this.view.enabled) {
      let H = (this.right - this.left) / this.view.fullWidth / this.zoom,
        q = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      ((W += H * this.view.offsetX),
        (Y = W + H * this.view.width),
        (K -= q * this.view.offsetY),
        (X = K - q * this.view.height));
    }
    (this.projectionMatrix.makeOrthographic(
      W,
      Y,
      K,
      X,
      this.near,
      this.far,
      this.coordinateSystem,
    ),
      this.projectionMatrixInverse.copy(this.projectionMatrix).invert());
  }
  toJSON($) {
    let J = super.toJSON($);
    if (
      ((J.object.zoom = this.zoom),
      (J.object.left = this.left),
      (J.object.right = this.right),
      (J.object.top = this.top),
      (J.object.bottom = this.bottom),
      (J.object.near = this.near),
      (J.object.far = this.far),
      this.view !== null)
    )
      J.object.view = Object.assign({}, this.view);
    return J;
  }
}
var l$ = 4,
  pJ = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582],
  R$ = 20,
  P8 = new a5(),
  uJ = new h0(),
  T8 = null,
  F$ = (1 + Math.sqrt(5)) / 2,
  h$ = 1 / F$,
  lJ = [
    new S(1, 1, 1),
    new S(-1, 1, 1),
    new S(1, 1, -1),
    new S(-1, 1, -1),
    new S(0, F$, h$),
    new S(0, F$, -h$),
    new S(h$, 0, F$),
    new S(-h$, 0, F$),
    new S(F$, h$, 0),
    new S(-F$, h$, 0),
  ];
class x8 {
  constructor($) {
    ((this._renderer = $),
      (this._pingPongRenderTarget = null),
      (this._lodMax = 0),
      (this._cubeSize = 0),
      (this._lodPlanes = []),
      (this._sizeLods = []),
      (this._sigmas = []),
      (this._blurMaterial = null),
      (this._cubemapMaterial = null),
      (this._equirectMaterial = null),
      this._compileMaterial(this._blurMaterial));
  }
  fromScene($, J = 0, Z = 0.1, Q = 100) {
    ((T8 = this._renderer.getRenderTarget()), this._setSize(256));
    let W = this._allocateTargets();
    if (((W.depthBuffer = !0), this._sceneToCubeUV($, Z, Q, W), J > 0))
      this._blur(W, 0, 0, J);
    return (this._applyPMREM(W), this._cleanup(W), W);
  }
  fromEquirectangular($, J = null) {
    return this._fromTexture($, J);
  }
  fromCubemap($, J = null) {
    return this._fromTexture($, J);
  }
  compileCubemapShader() {
    if (this._cubemapMaterial === null)
      ((this._cubemapMaterial = nJ()),
        this._compileMaterial(this._cubemapMaterial));
  }
  compileEquirectangularShader() {
    if (this._equirectMaterial === null)
      ((this._equirectMaterial = cJ()),
        this._compileMaterial(this._equirectMaterial));
  }
  dispose() {
    if ((this._dispose(), this._cubemapMaterial !== null))
      this._cubemapMaterial.dispose();
    if (this._equirectMaterial !== null) this._equirectMaterial.dispose();
  }
  _setSize($) {
    ((this._lodMax = Math.floor(Math.log2($))),
      (this._cubeSize = Math.pow(2, this._lodMax)));
  }
  _dispose() {
    if (this._blurMaterial !== null) this._blurMaterial.dispose();
    if (this._pingPongRenderTarget !== null)
      this._pingPongRenderTarget.dispose();
    for (let $ = 0; $ < this._lodPlanes.length; $++)
      this._lodPlanes[$].dispose();
  }
  _cleanup($) {
    (this._renderer.setRenderTarget(T8),
      ($.scissorTest = !1),
      v5($, 0, 0, $.width, $.height));
  }
  _fromTexture($, J) {
    if ($.mapping === 301 || $.mapping === 302)
      this._setSize(
        $.image.length === 0 ? 16 : $.image[0].width || $.image[0].image.width,
      );
    else this._setSize($.image.width / 4);
    T8 = this._renderer.getRenderTarget();
    let Z = J || this._allocateTargets();
    return (
      this._textureToCubeUV($, Z),
      this._applyPMREM(Z),
      this._cleanup(Z),
      Z
    );
  }
  _allocateTargets() {
    let $ = 3 * Math.max(this._cubeSize, 112),
      J = 4 * this._cubeSize,
      Z = {
        magFilter: 1006,
        minFilter: 1006,
        generateMipmaps: !1,
        type: 1016,
        format: 1023,
        colorSpace: "srgb-linear",
        depthBuffer: !1,
      },
      Q = dJ($, J, Z);
    if (
      this._pingPongRenderTarget === null ||
      this._pingPongRenderTarget.width !== $ ||
      this._pingPongRenderTarget.height !== J
    ) {
      if (this._pingPongRenderTarget !== null) this._dispose();
      this._pingPongRenderTarget = dJ($, J, Z);
      let { _lodMax: W } = this;
      (({
        sizeLods: this._sizeLods,
        lodPlanes: this._lodPlanes,
        sigmas: this._sigmas,
      } = nW(W)),
        (this._blurMaterial = sW(W, $, J)));
    }
    return Q;
  }
  _compileMaterial($) {
    let J = new u0(this._lodPlanes[0], $);
    this._renderer.compile(J, P8);
  }
  _sceneToCubeUV($, J, Z, Q) {
    let K = new I6(90, 1, J, Z),
      X = [1, -1, 1, 1, 1, 1],
      H = [1, 1, 1, -1, -1, -1],
      q = this._renderer,
      U = q.autoClear,
      G = q.toneMapping;
    (q.getClearColor(uJ), (q.toneMapping = 0), (q.autoClear = !1));
    let E = new d8({
        name: "PMREM.Background",
        side: 1,
        depthWrite: !1,
        depthTest: !1,
      }),
      F = new u0(new t0(), E),
      O = !1,
      _ = $.background;
    if (_) {
      if (_.isColor) (E.color.copy(_), ($.background = null), (O = !0));
    } else (E.color.copy(uJ), (O = !0));
    for (let N = 0; N < 6; N++) {
      let V = N % 3;
      if (V === 0) (K.up.set(0, X[N], 0), K.lookAt(H[N], 0, 0));
      else if (V === 1) (K.up.set(0, 0, X[N]), K.lookAt(0, H[N], 0));
      else (K.up.set(0, X[N], 0), K.lookAt(0, 0, H[N]));
      let k = this._cubeSize;
      if ((v5(Q, V * k, N > 2 ? k : 0, k, k), q.setRenderTarget(Q), O))
        q.render(F, K);
      q.render($, K);
    }
    (F.geometry.dispose(),
      F.material.dispose(),
      (q.toneMapping = G),
      (q.autoClear = U),
      ($.background = _));
  }
  _textureToCubeUV($, J) {
    let Z = this._renderer,
      Q = $.mapping === 301 || $.mapping === 302;
    if (Q) {
      if (this._cubemapMaterial === null) this._cubemapMaterial = nJ();
      this._cubemapMaterial.uniforms.flipEnvMap.value =
        $.isRenderTargetTexture === !1 ? -1 : 1;
    } else if (this._equirectMaterial === null) this._equirectMaterial = cJ();
    let W = Q ? this._cubemapMaterial : this._equirectMaterial,
      Y = new u0(this._lodPlanes[0], W),
      K = W.uniforms;
    K.envMap.value = $;
    let X = this._cubeSize;
    (v5(J, 0, 0, 3 * X, 2 * X), Z.setRenderTarget(J), Z.render(Y, P8));
  }
  _applyPMREM($) {
    let J = this._renderer,
      Z = J.autoClear;
    J.autoClear = !1;
    for (let Q = 1; Q < this._lodPlanes.length; Q++) {
      let W = Math.sqrt(
          this._sigmas[Q] * this._sigmas[Q] -
            this._sigmas[Q - 1] * this._sigmas[Q - 1],
        ),
        Y = lJ[(Q - 1) % lJ.length];
      this._blur($, Q - 1, Q, W, Y);
    }
    J.autoClear = Z;
  }
  _blur($, J, Z, Q, W) {
    let Y = this._pingPongRenderTarget;
    (this._halfBlur($, Y, J, Z, Q, "latitudinal", W),
      this._halfBlur(Y, $, Z, Z, Q, "longitudinal", W));
  }
  _halfBlur($, J, Z, Q, W, Y, K) {
    let X = this._renderer,
      H = this._blurMaterial;
    if (Y !== "latitudinal" && Y !== "longitudinal")
      console.error(
        "blur direction must be either latitudinal or longitudinal!",
      );
    let q = 3,
      U = new u0(this._lodPlanes[Q], H),
      G = H.uniforms,
      E = this._sizeLods[Z] - 1,
      F = isFinite(W) ? Math.PI / (2 * E) : (2 * Math.PI) / (2 * R$ - 1),
      O = W / F,
      _ = isFinite(W) ? 1 + Math.floor(q * O) : R$;
    if (_ > R$)
      console.warn(
        `sigmaRadians, ${W}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${R$}`,
      );
    let N = [],
      V = 0;
    for (let C = 0; C < R$; ++C) {
      let g = C / O,
        d = Math.exp((-g * g) / 2);
      if ((N.push(d), C === 0)) V += d;
      else if (C < _) V += 2 * d;
    }
    for (let C = 0; C < N.length; C++) N[C] = N[C] / V;
    if (
      ((G.envMap.value = $.texture),
      (G.samples.value = _),
      (G.weights.value = N),
      (G.latitudinal.value = Y === "latitudinal"),
      K)
    )
      G.poleAxis.value = K;
    let { _lodMax: k } = this;
    ((G.dTheta.value = F), (G.mipInt.value = k - Z));
    let M = this._sizeLods[Q],
      A = 3 * M * (Q > k - l$ ? Q - k + l$ : 0),
      L = 4 * (this._cubeSize - M);
    (v5(J, A, L, 3 * M, 2 * M), X.setRenderTarget(J), X.render(U, P8));
  }
}
function nW($) {
  let J = [],
    Z = [],
    Q = [],
    W = $,
    Y = $ - l$ + 1 + pJ.length;
  for (let K = 0; K < Y; K++) {
    let X = Math.pow(2, W);
    Z.push(X);
    let H = 1 / X;
    if (K > $ - l$) H = pJ[K - $ + l$ - 1];
    else if (K === 0) H = 0;
    Q.push(H);
    let q = 1 / (X - 2),
      U = -q,
      G = 1 + q,
      E = [U, U, G, U, G, G, U, U, G, G, U, G],
      F = 6,
      O = 6,
      _ = 3,
      N = 2,
      V = 1,
      k = new Float32Array(_ * O * F),
      M = new Float32Array(N * O * F),
      A = new Float32Array(V * O * F);
    for (let C = 0; C < F; C++) {
      let g = ((C % 3) * 2) / 3 - 1,
        d = C > 2 ? 0 : -1,
        R = [
          g,
          d,
          0,
          g + 0.6666666666666666,
          d,
          0,
          g + 0.6666666666666666,
          d + 1,
          0,
          g,
          d,
          0,
          g + 0.6666666666666666,
          d + 1,
          0,
          g,
          d + 1,
          0,
        ];
      (k.set(R, _ * O * C), M.set(E, N * O * C));
      let w = [C, C, C, C, C, C];
      A.set(w, V * O * C);
    }
    let L = new d6();
    if (
      (L.setAttribute("position", new L6(k, _)),
      L.setAttribute("uv", new L6(M, N)),
      L.setAttribute("faceIndex", new L6(A, V)),
      J.push(L),
      W > l$)
    )
      W--;
  }
  return { lodPlanes: J, sizeLods: Z, sigmas: Q };
}
function dJ($, J, Z) {
  let Q = new S6($, J, Z);
  return (
    (Q.texture.mapping = 306),
    (Q.texture.name = "PMREM.cubeUv"),
    (Q.scissorTest = !0),
    Q
  );
}
function v5($, J, Z, Q, W) {
  ($.viewport.set(J, Z, Q, W), $.scissor.set(J, Z, Q, W));
}
function sW($, J, Z) {
  let Q = new Float32Array(R$),
    W = new S(0, 1, 0);
  return new v6({
    name: "SphericalGaussianBlur",
    defines: {
      n: R$,
      CUBEUV_TEXEL_WIDTH: 1 / J,
      CUBEUV_TEXEL_HEIGHT: 1 / Z,
      CUBEUV_MAX_MIP: `${$}.0`,
    },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: Q },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: W },
    },
    vertexShader: a8(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,
    blending: 0,
    depthTest: !1,
    depthWrite: !1,
  });
}
function cJ() {
  return new v6({
    name: "EquirectangularToCubeUV",
    uniforms: { envMap: { value: null } },
    vertexShader: a8(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,
    blending: 0,
    depthTest: !1,
    depthWrite: !1,
  });
}
function nJ() {
  return new v6({
    name: "CubemapToCubeUV",
    uniforms: { envMap: { value: null }, flipEnvMap: { value: -1 } },
    vertexShader: a8(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,
    blending: 0,
    depthTest: !1,
    depthWrite: !1,
  });
}
function a8() {
  return `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`;
}
function iW($) {
  let J = new WeakMap(),
    Z = null;
  function Q(X) {
    if (X && X.isTexture) {
      let H = X.mapping,
        q = H === 303 || H === 304,
        U = H === 301 || H === 302;
      if (q || U)
        if (X.isRenderTargetTexture && X.needsPMREMUpdate === !0) {
          X.needsPMREMUpdate = !1;
          let G = J.get(X);
          if (Z === null) Z = new x8($);
          return (
            (G = q ? Z.fromEquirectangular(X, G) : Z.fromCubemap(X, G)),
            J.set(X, G),
            G.texture
          );
        } else if (J.has(X)) return J.get(X).texture;
        else {
          let G = X.image;
          if ((q && G && G.height > 0) || (U && G && W(G))) {
            if (Z === null) Z = new x8($);
            let E = q ? Z.fromEquirectangular(X) : Z.fromCubemap(X);
            return (J.set(X, E), X.addEventListener("dispose", Y), E.texture);
          } else return null;
        }
    }
    return X;
  }
  function W(X) {
    let H = 0,
      q = 6;
    for (let U = 0; U < q; U++) if (X[U] !== void 0) H++;
    return H === q;
  }
  function Y(X) {
    let H = X.target;
    H.removeEventListener("dispose", Y);
    let q = J.get(H);
    if (q !== void 0) (J.delete(H), q.dispose());
  }
  function K() {
    if (((J = new WeakMap()), Z !== null)) (Z.dispose(), (Z = null));
  }
  return { get: Q, dispose: K };
}
function oW($) {
  let J = {};
  function Z(Q) {
    if (J[Q] !== void 0) return J[Q];
    let W;
    switch (Q) {
      case "WEBGL_depth_texture":
        W =
          $.getExtension("WEBGL_depth_texture") ||
          $.getExtension("MOZ_WEBGL_depth_texture") ||
          $.getExtension("WEBKIT_WEBGL_depth_texture");
        break;
      case "EXT_texture_filter_anisotropic":
        W =
          $.getExtension("EXT_texture_filter_anisotropic") ||
          $.getExtension("MOZ_EXT_texture_filter_anisotropic") ||
          $.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
        break;
      case "WEBGL_compressed_texture_s3tc":
        W =
          $.getExtension("WEBGL_compressed_texture_s3tc") ||
          $.getExtension("MOZ_WEBGL_compressed_texture_s3tc") ||
          $.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        break;
      case "WEBGL_compressed_texture_pvrtc":
        W =
          $.getExtension("WEBGL_compressed_texture_pvrtc") ||
          $.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
        break;
      default:
        W = $.getExtension(Q);
    }
    return ((J[Q] = W), W);
  }
  return {
    has: function (Q) {
      return Z(Q) !== null;
    },
    init: function (Q) {
      if (Q.isWebGL2) Z("EXT_color_buffer_float");
      else
        (Z("WEBGL_depth_texture"),
          Z("OES_texture_float"),
          Z("OES_texture_half_float"),
          Z("OES_texture_half_float_linear"),
          Z("OES_standard_derivatives"),
          Z("OES_element_index_uint"),
          Z("OES_vertex_array_object"),
          Z("ANGLE_instanced_arrays"));
      (Z("OES_texture_float_linear"),
        Z("EXT_color_buffer_half_float"),
        Z("WEBGL_multisampled_render_to_texture"));
    },
    get: function (Q) {
      let W = Z(Q);
      if (W === null)
        console.warn("THREE.WebGLRenderer: " + Q + " extension not supported.");
      return W;
    },
  };
}
function rW($, J, Z, Q) {
  let W = {},
    Y = new WeakMap();
  function K(G) {
    let E = G.target;
    if (E.index !== null) J.remove(E.index);
    for (let O in E.attributes) J.remove(E.attributes[O]);
    for (let O in E.morphAttributes) {
      let _ = E.morphAttributes[O];
      for (let N = 0, V = _.length; N < V; N++) J.remove(_[N]);
    }
    (E.removeEventListener("dispose", K), delete W[E.id]);
    let F = Y.get(E);
    if (F) (J.remove(F), Y.delete(E));
    if ((Q.releaseStatesOfGeometry(E), E.isInstancedBufferGeometry === !0))
      delete E._maxInstanceCount;
    Z.memory.geometries--;
  }
  function X(G, E) {
    if (W[E.id] === !0) return E;
    return (
      E.addEventListener("dispose", K),
      (W[E.id] = !0),
      Z.memory.geometries++,
      E
    );
  }
  function H(G) {
    let E = G.attributes;
    for (let O in E) J.update(E[O], $.ARRAY_BUFFER);
    let F = G.morphAttributes;
    for (let O in F) {
      let _ = F[O];
      for (let N = 0, V = _.length; N < V; N++) J.update(_[N], $.ARRAY_BUFFER);
    }
  }
  function q(G) {
    let E = [],
      F = G.index,
      O = G.attributes.position,
      _ = 0;
    if (F !== null) {
      let k = F.array;
      _ = F.version;
      for (let M = 0, A = k.length; M < A; M += 3) {
        let L = k[M + 0],
          C = k[M + 1],
          g = k[M + 2];
        E.push(L, C, C, g, g, L);
      }
    } else if (O !== void 0) {
      let k = O.array;
      _ = O.version;
      for (let M = 0, A = k.length / 3 - 1; M < A; M += 3) {
        let L = M + 0,
          C = M + 1,
          g = M + 2;
        E.push(L, C, C, g, g, L);
      }
    } else return;
    let N = new (_7(E) ? n8 : c8)(E, 1);
    N.version = _;
    let V = Y.get(G);
    if (V) J.remove(V);
    Y.set(G, N);
  }
  function U(G) {
    let E = Y.get(G);
    if (E) {
      let F = G.index;
      if (F !== null) {
        if (E.version < F.version) q(G);
      }
    } else q(G);
    return Y.get(G);
  }
  return { get: X, update: H, getWireframeAttribute: U };
}
function aW($, J, Z, Q) {
  let W = Q.isWebGL2,
    Y;
  function K(E) {
    Y = E;
  }
  let X, H;
  function q(E) {
    ((X = E.type), (H = E.bytesPerElement));
  }
  function U(E, F) {
    ($.drawElements(Y, F, X, E * H), Z.update(F, Y, 1));
  }
  function G(E, F, O) {
    if (O === 0) return;
    let _, N;
    if (W) ((_ = $), (N = "drawElementsInstanced"));
    else if (
      ((_ = J.get("ANGLE_instanced_arrays")),
      (N = "drawElementsInstancedANGLE"),
      _ === null)
    ) {
      console.error(
        "THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.",
      );
      return;
    }
    (_[N](Y, F, X, E * H, O), Z.update(F, Y, O));
  }
  ((this.setMode = K),
    (this.setIndex = q),
    (this.render = U),
    (this.renderInstances = G));
}
function tW($) {
  let J = { geometries: 0, textures: 0 },
    Z = { frame: 0, calls: 0, triangles: 0, points: 0, lines: 0 };
  function Q(Y, K, X) {
    switch ((Z.calls++, K)) {
      case $.TRIANGLES:
        Z.triangles += X * (Y / 3);
        break;
      case $.LINES:
        Z.lines += X * (Y / 2);
        break;
      case $.LINE_STRIP:
        Z.lines += X * (Y - 1);
        break;
      case $.LINE_LOOP:
        Z.lines += X * Y;
        break;
      case $.POINTS:
        Z.points += X * Y;
        break;
      default:
        console.error("THREE.WebGLInfo: Unknown draw mode:", K);
        break;
    }
  }
  function W() {
    ((Z.calls = 0), (Z.triangles = 0), (Z.points = 0), (Z.lines = 0));
  }
  return {
    memory: J,
    render: Z,
    programs: null,
    autoReset: !0,
    reset: W,
    update: Q,
  };
}
function eW($, J) {
  return $[0] - J[0];
}
function $Y($, J) {
  return Math.abs(J[1]) - Math.abs($[1]);
}
function JY($, J, Z) {
  let Q = {},
    W = new Float32Array(8),
    Y = new WeakMap(),
    K = new i0(),
    X = [];
  for (let q = 0; q < 8; q++) X[q] = [q, 0];
  function H(q, U, G) {
    let E = q.morphTargetInfluences;
    if (J.isWebGL2 === !0) {
      let F =
          U.morphAttributes.position ||
          U.morphAttributes.normal ||
          U.morphAttributes.color,
        O = F !== void 0 ? F.length : 0,
        _ = Y.get(U);
      if (_ === void 0 || _.count !== O) {
        let y = function () {
          (W0.dispose(), Y.delete(U), U.removeEventListener("dispose", y));
        };
        if (_ !== void 0) _.texture.dispose();
        let k = U.morphAttributes.position !== void 0,
          M = U.morphAttributes.normal !== void 0,
          A = U.morphAttributes.color !== void 0,
          L = U.morphAttributes.position || [],
          C = U.morphAttributes.normal || [],
          g = U.morphAttributes.color || [],
          d = 0;
        if (k === !0) d = 1;
        if (M === !0) d = 2;
        if (A === !0) d = 3;
        let R = U.attributes.position.count * d,
          w = 1;
        if (R > J.maxTextureSize)
          ((w = Math.ceil(R / J.maxTextureSize)), (R = J.maxTextureSize));
        let s = new Float32Array(R * w * 4 * O),
          W0 = new u8(s, R, w, O);
        ((W0.type = 1015), (W0.needsUpdate = !0));
        let h = d * 4;
        for (let l = 0; l < O; l++) {
          let r = L[l],
            c = C[l],
            u = g[l],
            i = R * w * 4 * l;
          for (let T = 0; T < r.count; T++) {
            let n = T * h;
            if (k === !0)
              (K.fromBufferAttribute(r, T),
                (s[i + n + 0] = K.x),
                (s[i + n + 1] = K.y),
                (s[i + n + 2] = K.z),
                (s[i + n + 3] = 0));
            if (M === !0)
              (K.fromBufferAttribute(c, T),
                (s[i + n + 4] = K.x),
                (s[i + n + 5] = K.y),
                (s[i + n + 6] = K.z),
                (s[i + n + 7] = 0));
            if (A === !0)
              (K.fromBufferAttribute(u, T),
                (s[i + n + 8] = K.x),
                (s[i + n + 9] = K.y),
                (s[i + n + 10] = K.z),
                (s[i + n + 11] = u.itemSize === 4 ? K.w : 1));
          }
        }
        ((_ = { count: O, texture: W0, size: new R0(R, w) }),
          Y.set(U, _),
          U.addEventListener("dispose", y));
      }
      let N = 0;
      for (let k = 0; k < E.length; k++) N += E[k];
      let V = U.morphTargetsRelative ? 1 : 1 - N;
      (G.getUniforms().setValue($, "morphTargetBaseInfluence", V),
        G.getUniforms().setValue($, "morphTargetInfluences", E),
        G.getUniforms().setValue($, "morphTargetsTexture", _.texture, Z),
        G.getUniforms().setValue($, "morphTargetsTextureSize", _.size));
    } else {
      let F = E === void 0 ? 0 : E.length,
        O = Q[U.id];
      if (O === void 0 || O.length !== F) {
        O = [];
        for (let M = 0; M < F; M++) O[M] = [M, 0];
        Q[U.id] = O;
      }
      for (let M = 0; M < F; M++) {
        let A = O[M];
        ((A[0] = M), (A[1] = E[M]));
      }
      O.sort($Y);
      for (let M = 0; M < 8; M++)
        if (M < F && O[M][1]) ((X[M][0] = O[M][0]), (X[M][1] = O[M][1]));
        else ((X[M][0] = Number.MAX_SAFE_INTEGER), (X[M][1] = 0));
      X.sort(eW);
      let _ = U.morphAttributes.position,
        N = U.morphAttributes.normal,
        V = 0;
      for (let M = 0; M < 8; M++) {
        let A = X[M],
          L = A[0],
          C = A[1];
        if (L !== Number.MAX_SAFE_INTEGER && C) {
          if (_ && U.getAttribute("morphTarget" + M) !== _[L])
            U.setAttribute("morphTarget" + M, _[L]);
          if (N && U.getAttribute("morphNormal" + M) !== N[L])
            U.setAttribute("morphNormal" + M, N[L]);
          ((W[M] = C), (V += C));
        } else {
          if (_ && U.hasAttribute("morphTarget" + M) === !0)
            U.deleteAttribute("morphTarget" + M);
          if (N && U.hasAttribute("morphNormal" + M) === !0)
            U.deleteAttribute("morphNormal" + M);
          W[M] = 0;
        }
      }
      let k = U.morphTargetsRelative ? 1 : 1 - V;
      (G.getUniforms().setValue($, "morphTargetBaseInfluence", k),
        G.getUniforms().setValue($, "morphTargetInfluences", W));
    }
  }
  return { update: H };
}
function ZY($, J, Z, Q) {
  let W = new WeakMap();
  function Y(H) {
    let q = Q.render.frame,
      U = H.geometry,
      G = J.get(H, U);
    if (W.get(G) !== q) (J.update(G), W.set(G, q));
    if (H.isInstancedMesh) {
      if (H.hasEventListener("dispose", X) === !1)
        H.addEventListener("dispose", X);
      if (W.get(H) !== q) {
        if (
          (Z.update(H.instanceMatrix, $.ARRAY_BUFFER), H.instanceColor !== null)
        )
          Z.update(H.instanceColor, $.ARRAY_BUFFER);
        W.set(H, q);
      }
    }
    if (H.isSkinnedMesh) {
      let E = H.skeleton;
      if (W.get(E) !== q) (E.update(), W.set(E, q));
    }
    return G;
  }
  function K() {
    W = new WeakMap();
  }
  function X(H) {
    let q = H.target;
    if (
      (q.removeEventListener("dispose", X),
      Z.remove(q.instanceMatrix),
      q.instanceColor !== null)
    )
      Z.remove(q.instanceColor);
  }
  return { update: Y, dispose: K };
}
var L7 = new U6(),
  A7 = new u8(),
  P7 = new I7(),
  T7 = new o8(),
  sJ = [],
  iJ = [],
  oJ = new Float32Array(16),
  rJ = new Float32Array(9),
  aJ = new Float32Array(4);
function s$($, J, Z) {
  let Q = $[0];
  if (Q <= 0 || Q > 0) return $;
  let W = J * Z,
    Y = sJ[W];
  if (Y === void 0) ((Y = new Float32Array(W)), (sJ[W] = Y));
  if (J !== 0) {
    Q.toArray(Y, 0);
    for (let K = 1, X = 0; K !== J; ++K) ((X += Z), $[K].toArray(Y, X));
  }
  return Y;
}
function K6($, J) {
  if ($.length !== J.length) return !1;
  for (let Z = 0, Q = $.length; Z < Q; Z++) if ($[Z] !== J[Z]) return !1;
  return !0;
}
function H6($, J) {
  for (let Z = 0, Q = J.length; Z < Q; Z++) $[Z] = J[Z];
}
function t5($, J) {
  let Z = iJ[J];
  if (Z === void 0) ((Z = new Int32Array(J)), (iJ[J] = Z));
  for (let Q = 0; Q !== J; ++Q) Z[Q] = $.allocateTextureUnit();
  return Z;
}
function QY($, J) {
  let Z = this.cache;
  if (Z[0] === J) return;
  ($.uniform1f(this.addr, J), (Z[0] = J));
}
function WY($, J) {
  let Z = this.cache;
  if (J.x !== void 0) {
    if (Z[0] !== J.x || Z[1] !== J.y)
      ($.uniform2f(this.addr, J.x, J.y), (Z[0] = J.x), (Z[1] = J.y));
  } else {
    if (K6(Z, J)) return;
    ($.uniform2fv(this.addr, J), H6(Z, J));
  }
}
function YY($, J) {
  let Z = this.cache;
  if (J.x !== void 0) {
    if (Z[0] !== J.x || Z[1] !== J.y || Z[2] !== J.z)
      ($.uniform3f(this.addr, J.x, J.y, J.z),
        (Z[0] = J.x),
        (Z[1] = J.y),
        (Z[2] = J.z));
  } else if (J.r !== void 0) {
    if (Z[0] !== J.r || Z[1] !== J.g || Z[2] !== J.b)
      ($.uniform3f(this.addr, J.r, J.g, J.b),
        (Z[0] = J.r),
        (Z[1] = J.g),
        (Z[2] = J.b));
  } else {
    if (K6(Z, J)) return;
    ($.uniform3fv(this.addr, J), H6(Z, J));
  }
}
function XY($, J) {
  let Z = this.cache;
  if (J.x !== void 0) {
    if (Z[0] !== J.x || Z[1] !== J.y || Z[2] !== J.z || Z[3] !== J.w)
      ($.uniform4f(this.addr, J.x, J.y, J.z, J.w),
        (Z[0] = J.x),
        (Z[1] = J.y),
        (Z[2] = J.z),
        (Z[3] = J.w));
  } else {
    if (K6(Z, J)) return;
    ($.uniform4fv(this.addr, J), H6(Z, J));
  }
}
function KY($, J) {
  let Z = this.cache,
    Q = J.elements;
  if (Q === void 0) {
    if (K6(Z, J)) return;
    ($.uniformMatrix2fv(this.addr, !1, J), H6(Z, J));
  } else {
    if (K6(Z, Q)) return;
    (aJ.set(Q), $.uniformMatrix2fv(this.addr, !1, aJ), H6(Z, Q));
  }
}
function HY($, J) {
  let Z = this.cache,
    Q = J.elements;
  if (Q === void 0) {
    if (K6(Z, J)) return;
    ($.uniformMatrix3fv(this.addr, !1, J), H6(Z, J));
  } else {
    if (K6(Z, Q)) return;
    (rJ.set(Q), $.uniformMatrix3fv(this.addr, !1, rJ), H6(Z, Q));
  }
}
function qY($, J) {
  let Z = this.cache,
    Q = J.elements;
  if (Q === void 0) {
    if (K6(Z, J)) return;
    ($.uniformMatrix4fv(this.addr, !1, J), H6(Z, J));
  } else {
    if (K6(Z, Q)) return;
    (oJ.set(Q), $.uniformMatrix4fv(this.addr, !1, oJ), H6(Z, Q));
  }
}
function GY($, J) {
  let Z = this.cache;
  if (Z[0] === J) return;
  ($.uniform1i(this.addr, J), (Z[0] = J));
}
function UY($, J) {
  let Z = this.cache;
  if (J.x !== void 0) {
    if (Z[0] !== J.x || Z[1] !== J.y)
      ($.uniform2i(this.addr, J.x, J.y), (Z[0] = J.x), (Z[1] = J.y));
  } else {
    if (K6(Z, J)) return;
    ($.uniform2iv(this.addr, J), H6(Z, J));
  }
}
function EY($, J) {
  let Z = this.cache;
  if (J.x !== void 0) {
    if (Z[0] !== J.x || Z[1] !== J.y || Z[2] !== J.z)
      ($.uniform3i(this.addr, J.x, J.y, J.z),
        (Z[0] = J.x),
        (Z[1] = J.y),
        (Z[2] = J.z));
  } else {
    if (K6(Z, J)) return;
    ($.uniform3iv(this.addr, J), H6(Z, J));
  }
}
function VY($, J) {
  let Z = this.cache;
  if (J.x !== void 0) {
    if (Z[0] !== J.x || Z[1] !== J.y || Z[2] !== J.z || Z[3] !== J.w)
      ($.uniform4i(this.addr, J.x, J.y, J.z, J.w),
        (Z[0] = J.x),
        (Z[1] = J.y),
        (Z[2] = J.z),
        (Z[3] = J.w));
  } else {
    if (K6(Z, J)) return;
    ($.uniform4iv(this.addr, J), H6(Z, J));
  }
}
function NY($, J) {
  let Z = this.cache;
  if (Z[0] === J) return;
  ($.uniform1ui(this.addr, J), (Z[0] = J));
}
function FY($, J) {
  let Z = this.cache;
  if (J.x !== void 0) {
    if (Z[0] !== J.x || Z[1] !== J.y)
      ($.uniform2ui(this.addr, J.x, J.y), (Z[0] = J.x), (Z[1] = J.y));
  } else {
    if (K6(Z, J)) return;
    ($.uniform2uiv(this.addr, J), H6(Z, J));
  }
}
function RY($, J) {
  let Z = this.cache;
  if (J.x !== void 0) {
    if (Z[0] !== J.x || Z[1] !== J.y || Z[2] !== J.z)
      ($.uniform3ui(this.addr, J.x, J.y, J.z),
        (Z[0] = J.x),
        (Z[1] = J.y),
        (Z[2] = J.z));
  } else {
    if (K6(Z, J)) return;
    ($.uniform3uiv(this.addr, J), H6(Z, J));
  }
}
function DY($, J) {
  let Z = this.cache;
  if (J.x !== void 0) {
    if (Z[0] !== J.x || Z[1] !== J.y || Z[2] !== J.z || Z[3] !== J.w)
      ($.uniform4ui(this.addr, J.x, J.y, J.z, J.w),
        (Z[0] = J.x),
        (Z[1] = J.y),
        (Z[2] = J.z),
        (Z[3] = J.w));
  } else {
    if (K6(Z, J)) return;
    ($.uniform4uiv(this.addr, J), H6(Z, J));
  }
}
function OY($, J, Z) {
  let Q = this.cache,
    W = Z.allocateTextureUnit();
  if (Q[0] !== W) ($.uniform1i(this.addr, W), (Q[0] = W));
  Z.setTexture2D(J || L7, W);
}
function _Y($, J, Z) {
  let Q = this.cache,
    W = Z.allocateTextureUnit();
  if (Q[0] !== W) ($.uniform1i(this.addr, W), (Q[0] = W));
  Z.setTexture3D(J || P7, W);
}
function zY($, J, Z) {
  let Q = this.cache,
    W = Z.allocateTextureUnit();
  if (Q[0] !== W) ($.uniform1i(this.addr, W), (Q[0] = W));
  Z.setTextureCube(J || T7, W);
}
function IY($, J, Z) {
  let Q = this.cache,
    W = Z.allocateTextureUnit();
  if (Q[0] !== W) ($.uniform1i(this.addr, W), (Q[0] = W));
  Z.setTexture2DArray(J || A7, W);
}
function CY($) {
  switch ($) {
    case 5126:
      return QY;
    case 35664:
      return WY;
    case 35665:
      return YY;
    case 35666:
      return XY;
    case 35674:
      return KY;
    case 35675:
      return HY;
    case 35676:
      return qY;
    case 5124:
    case 35670:
      return GY;
    case 35667:
    case 35671:
      return UY;
    case 35668:
    case 35672:
      return EY;
    case 35669:
    case 35673:
      return VY;
    case 5125:
      return NY;
    case 36294:
      return FY;
    case 36295:
      return RY;
    case 36296:
      return DY;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return OY;
    case 35679:
    case 36299:
    case 36307:
      return _Y;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return zY;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return IY;
  }
}
function MY($, J) {
  $.uniform1fv(this.addr, J);
}
function kY($, J) {
  let Z = s$(J, this.size, 2);
  $.uniform2fv(this.addr, Z);
}
function BY($, J) {
  let Z = s$(J, this.size, 3);
  $.uniform3fv(this.addr, Z);
}
function wY($, J) {
  let Z = s$(J, this.size, 4);
  $.uniform4fv(this.addr, Z);
}
function LY($, J) {
  let Z = s$(J, this.size, 4);
  $.uniformMatrix2fv(this.addr, !1, Z);
}
function AY($, J) {
  let Z = s$(J, this.size, 9);
  $.uniformMatrix3fv(this.addr, !1, Z);
}
function PY($, J) {
  let Z = s$(J, this.size, 16);
  $.uniformMatrix4fv(this.addr, !1, Z);
}
function TY($, J) {
  $.uniform1iv(this.addr, J);
}
function SY($, J) {
  $.uniform2iv(this.addr, J);
}
function fY($, J) {
  $.uniform3iv(this.addr, J);
}
function bY($, J) {
  $.uniform4iv(this.addr, J);
}
function jY($, J) {
  $.uniform1uiv(this.addr, J);
}
function yY($, J) {
  $.uniform2uiv(this.addr, J);
}
function xY($, J) {
  $.uniform3uiv(this.addr, J);
}
function vY($, J) {
  $.uniform4uiv(this.addr, J);
}
function hY($, J, Z) {
  let Q = this.cache,
    W = J.length,
    Y = t5(Z, W);
  if (!K6(Q, Y)) ($.uniform1iv(this.addr, Y), H6(Q, Y));
  for (let K = 0; K !== W; ++K) Z.setTexture2D(J[K] || L7, Y[K]);
}
function gY($, J, Z) {
  let Q = this.cache,
    W = J.length,
    Y = t5(Z, W);
  if (!K6(Q, Y)) ($.uniform1iv(this.addr, Y), H6(Q, Y));
  for (let K = 0; K !== W; ++K) Z.setTexture3D(J[K] || P7, Y[K]);
}
function mY($, J, Z) {
  let Q = this.cache,
    W = J.length,
    Y = t5(Z, W);
  if (!K6(Q, Y)) ($.uniform1iv(this.addr, Y), H6(Q, Y));
  for (let K = 0; K !== W; ++K) Z.setTextureCube(J[K] || T7, Y[K]);
}
function pY($, J, Z) {
  let Q = this.cache,
    W = J.length,
    Y = t5(Z, W);
  if (!K6(Q, Y)) ($.uniform1iv(this.addr, Y), H6(Q, Y));
  for (let K = 0; K !== W; ++K) Z.setTexture2DArray(J[K] || A7, Y[K]);
}
function uY($) {
  switch ($) {
    case 5126:
      return MY;
    case 35664:
      return kY;
    case 35665:
      return BY;
    case 35666:
      return wY;
    case 35674:
      return LY;
    case 35675:
      return AY;
    case 35676:
      return PY;
    case 5124:
    case 35670:
      return TY;
    case 35667:
    case 35671:
      return SY;
    case 35668:
    case 35672:
      return fY;
    case 35669:
    case 35673:
      return bY;
    case 5125:
      return jY;
    case 36294:
      return yY;
    case 36295:
      return xY;
    case 36296:
      return vY;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return hY;
    case 35679:
    case 36299:
    case 36307:
      return gY;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return mY;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return pY;
  }
}
class S7 {
  constructor($, J, Z) {
    ((this.id = $),
      (this.addr = Z),
      (this.cache = []),
      (this.setValue = CY(J.type)));
  }
}
class f7 {
  constructor($, J, Z) {
    ((this.id = $),
      (this.addr = Z),
      (this.cache = []),
      (this.size = J.size),
      (this.setValue = uY(J.type)));
  }
}
class b7 {
  constructor($) {
    ((this.id = $), (this.seq = []), (this.map = {}));
  }
  setValue($, J, Z) {
    let Q = this.seq;
    for (let W = 0, Y = Q.length; W !== Y; ++W) {
      let K = Q[W];
      K.setValue($, J[K.id], Z);
    }
  }
}
var S8 = /(\w+)(\])?(\[|\.)?/g;
function tJ($, J) {
  ($.seq.push(J), ($.map[J.id] = J));
}
function lY($, J, Z) {
  let Q = $.name,
    W = Q.length;
  S8.lastIndex = 0;
  while (!0) {
    let Y = S8.exec(Q),
      K = S8.lastIndex,
      X = Y[1],
      H = Y[2] === "]",
      q = Y[3];
    if (H) X = X | 0;
    if (q === void 0 || (q === "[" && K + 2 === W)) {
      tJ(Z, q === void 0 ? new S7(X, $, J) : new f7(X, $, J));
      break;
    } else {
      let G = Z.map[X];
      if (G === void 0) ((G = new b7(X)), tJ(Z, G));
      Z = G;
    }
  }
}
class q5 {
  constructor($, J) {
    ((this.seq = []), (this.map = {}));
    let Z = $.getProgramParameter(J, $.ACTIVE_UNIFORMS);
    for (let Q = 0; Q < Z; ++Q) {
      let W = $.getActiveUniform(J, Q),
        Y = $.getUniformLocation(J, W.name);
      lY(W, Y, this);
    }
  }
  setValue($, J, Z, Q) {
    let W = this.map[J];
    if (W !== void 0) W.setValue($, Z, Q);
  }
  setOptional($, J, Z) {
    let Q = J[Z];
    if (Q !== void 0) this.setValue($, Z, Q);
  }
  static upload($, J, Z, Q) {
    for (let W = 0, Y = J.length; W !== Y; ++W) {
      let K = J[W],
        X = Z[K.id];
      if (X.needsUpdate !== !1) K.setValue($, X.value, Q);
    }
  }
  static seqWithValue($, J) {
    let Z = [];
    for (let Q = 0, W = $.length; Q !== W; ++Q) {
      let Y = $[Q];
      if (Y.id in J) Z.push(Y);
    }
    return Z;
  }
}
function eJ($, J, Z) {
  let Q = $.createShader(J);
  return ($.shaderSource(Q, Z), $.compileShader(Q), Q);
}
var dY = 0;
function cY($, J) {
  let Z = $.split(`
`),
    Q = [],
    W = Math.max(J - 6, 0),
    Y = Math.min(J + 6, Z.length);
  for (let K = W; K < Y; K++) {
    let X = K + 1;
    Q.push(`${X === J ? ">" : " "} ${X}: ${Z[K]}`);
  }
  return Q.join(`
`);
}
function nY($) {
  switch ($) {
    case "srgb-linear":
      return ["Linear", "( value )"];
    case "srgb":
      return ["sRGB", "( value )"];
    default:
      return (
        console.warn("THREE.WebGLProgram: Unsupported color space:", $),
        ["Linear", "( value )"]
      );
  }
}
function $7($, J, Z) {
  let Q = $.getShaderParameter(J, $.COMPILE_STATUS),
    W = $.getShaderInfoLog(J).trim();
  if (Q && W === "") return "";
  let Y = /ERROR: 0:(\d+)/.exec(W);
  if (Y) {
    let K = parseInt(Y[1]);
    return (
      Z.toUpperCase() +
      `

` +
      W +
      `

` +
      cY($.getShaderSource(J), K)
    );
  } else return W;
}
function sY($, J) {
  let Z = nY(J);
  return "vec4 " + $ + "( vec4 value ) { return LinearTo" + Z[0] + Z[1] + "; }";
}
function iY($, J) {
  let Z;
  switch (J) {
    case 1:
      Z = "Linear";
      break;
    case 2:
      Z = "Reinhard";
      break;
    case 3:
      Z = "OptimizedCineon";
      break;
    case 4:
      Z = "ACESFilmic";
      break;
    case 5:
      Z = "Custom";
      break;
    default:
      (console.warn("THREE.WebGLProgram: Unsupported toneMapping:", J),
        (Z = "Linear"));
  }
  return (
    "vec3 " + $ + "( vec3 color ) { return " + Z + "ToneMapping( color ); }"
  );
}
function oY($) {
  return [
    $.extensionDerivatives ||
    !!$.envMapCubeUVHeight ||
    $.bumpMap ||
    $.normalMapTangentSpace ||
    $.clearcoatNormalMap ||
    $.flatShading ||
    $.shaderID === "physical"
      ? "#extension GL_OES_standard_derivatives : enable"
      : "",
    ($.extensionFragDepth || $.logarithmicDepthBuffer) &&
    $.rendererExtensionFragDepth
      ? "#extension GL_EXT_frag_depth : enable"
      : "",
    $.extensionDrawBuffers && $.rendererExtensionDrawBuffers
      ? "#extension GL_EXT_draw_buffers : require"
      : "",
    ($.extensionShaderTextureLOD || $.envMap || $.transmission) &&
    $.rendererExtensionShaderTextureLod
      ? "#extension GL_EXT_shader_texture_lod : enable"
      : "",
  ].filter(Y5).join(`
`);
}
function rY($) {
  let J = [];
  for (let Z in $) {
    let Q = $[Z];
    if (Q === !1) continue;
    J.push("#define " + Z + " " + Q);
  }
  return J.join(`
`);
}
function aY($, J) {
  let Z = {},
    Q = $.getProgramParameter(J, $.ACTIVE_ATTRIBUTES);
  for (let W = 0; W < Q; W++) {
    let Y = $.getActiveAttrib(J, W),
      K = Y.name,
      X = 1;
    if (Y.type === $.FLOAT_MAT2) X = 2;
    if (Y.type === $.FLOAT_MAT3) X = 3;
    if (Y.type === $.FLOAT_MAT4) X = 4;
    Z[K] = {
      type: Y.type,
      location: $.getAttribLocation(J, K),
      locationSize: X,
    };
  }
  return Z;
}
function Y5($) {
  return $ !== "";
}
function J7($, J) {
  let Z =
    J.numSpotLightShadows + J.numSpotLightMaps - J.numSpotLightShadowsWithMaps;
  return $.replace(/NUM_DIR_LIGHTS/g, J.numDirLights)
    .replace(/NUM_SPOT_LIGHTS/g, J.numSpotLights)
    .replace(/NUM_SPOT_LIGHT_MAPS/g, J.numSpotLightMaps)
    .replace(/NUM_SPOT_LIGHT_COORDS/g, Z)
    .replace(/NUM_RECT_AREA_LIGHTS/g, J.numRectAreaLights)
    .replace(/NUM_POINT_LIGHTS/g, J.numPointLights)
    .replace(/NUM_HEMI_LIGHTS/g, J.numHemiLights)
    .replace(/NUM_DIR_LIGHT_SHADOWS/g, J.numDirLightShadows)
    .replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, J.numSpotLightShadowsWithMaps)
    .replace(/NUM_SPOT_LIGHT_SHADOWS/g, J.numSpotLightShadows)
    .replace(/NUM_POINT_LIGHT_SHADOWS/g, J.numPointLightShadows);
}
function Z7($, J) {
  return $.replace(/NUM_CLIPPING_PLANES/g, J.numClippingPlanes).replace(
    /UNION_CLIPPING_PLANES/g,
    J.numClippingPlanes - J.numClipIntersection,
  );
}
var tY = /^[ \t]*#include +<([\w\d./]+)>/gm;
function v8($) {
  return $.replace(tY, $4);
}
var eY = new Map([
  ["encodings_fragment", "colorspace_fragment"],
  ["encodings_pars_fragment", "colorspace_pars_fragment"],
  ["output_fragment", "opaque_fragment"],
]);
function $4($, J) {
  let Z = A0[J];
  if (Z === void 0) {
    let Q = eY.get(J);
    if (Q !== void 0)
      ((Z = A0[Q]),
        console.warn(
          'THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',
          J,
          Q,
        ));
    else throw Error("Can not resolve #include <" + J + ">");
  }
  return v8(Z);
}
var J4 =
  /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function Q7($) {
  return $.replace(J4, Z4);
}
function Z4($, J, Z, Q) {
  let W = "";
  for (let Y = parseInt(J); Y < parseInt(Z); Y++)
    W += Q.replace(/\[\s*i\s*\]/g, "[ " + Y + " ]").replace(
      /UNROLLED_LOOP_INDEX/g,
      Y,
    );
  return W;
}
function W7($) {
  let J =
    "precision " +
    $.precision +
    ` float;
precision ` +
    $.precision +
    " int;";
  if ($.precision === "highp")
    J += `
#define HIGH_PRECISION`;
  else if ($.precision === "mediump")
    J += `
#define MEDIUM_PRECISION`;
  else if ($.precision === "lowp")
    J += `
#define LOW_PRECISION`;
  return J;
}
function Q4($) {
  let J = "SHADOWMAP_TYPE_BASIC";
  if ($.shadowMapType === 1) J = "SHADOWMAP_TYPE_PCF";
  else if ($.shadowMapType === 2) J = "SHADOWMAP_TYPE_PCF_SOFT";
  else if ($.shadowMapType === 3) J = "SHADOWMAP_TYPE_VSM";
  return J;
}
function W4($) {
  let J = "ENVMAP_TYPE_CUBE";
  if ($.envMap)
    switch ($.envMapMode) {
      case 301:
      case 302:
        J = "ENVMAP_TYPE_CUBE";
        break;
      case 306:
        J = "ENVMAP_TYPE_CUBE_UV";
        break;
    }
  return J;
}
function Y4($) {
  let J = "ENVMAP_MODE_REFLECTION";
  if ($.envMap)
    switch ($.envMapMode) {
      case 302:
        J = "ENVMAP_MODE_REFRACTION";
        break;
    }
  return J;
}
function X4($) {
  let J = "ENVMAP_BLENDING_NONE";
  if ($.envMap)
    switch ($.combine) {
      case 0:
        J = "ENVMAP_BLENDING_MULTIPLY";
        break;
      case 1:
        J = "ENVMAP_BLENDING_MIX";
        break;
      case 2:
        J = "ENVMAP_BLENDING_ADD";
        break;
    }
  return J;
}
function K4($) {
  let J = $.envMapCubeUVHeight;
  if (J === null) return null;
  let Z = Math.log2(J) - 2,
    Q = 1 / J;
  return {
    texelWidth: 1 / (3 * Math.max(Math.pow(2, Z), 112)),
    texelHeight: Q,
    maxMip: Z,
  };
}
function H4($, J, Z, Q) {
  let W = $.getContext(),
    Y = Z.defines,
    K = Z.vertexShader,
    X = Z.fragmentShader,
    H = Q4(Z),
    q = W4(Z),
    U = Y4(Z),
    G = X4(Z),
    E = K4(Z),
    F = Z.isWebGL2 ? "" : oY(Z),
    O = rY(Y),
    _ = W.createProgram(),
    N,
    V,
    k = Z.glslVersion
      ? "#version " +
        Z.glslVersion +
        `
`
      : "";
  if (Z.isRawShaderMaterial) {
    if (
      ((N = [
        "#define SHADER_TYPE " + Z.shaderType,
        "#define SHADER_NAME " + Z.shaderName,
        O,
      ].filter(Y5).join(`
`)),
      N.length > 0)
    )
      N += `
`;
    if (
      ((V = [
        F,
        "#define SHADER_TYPE " + Z.shaderType,
        "#define SHADER_NAME " + Z.shaderName,
        O,
      ].filter(Y5).join(`
`)),
      V.length > 0)
    )
      V += `
`;
  } else
    ((N = [
      W7(Z),
      "#define SHADER_TYPE " + Z.shaderType,
      "#define SHADER_NAME " + Z.shaderName,
      O,
      Z.instancing ? "#define USE_INSTANCING" : "",
      Z.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
      Z.useFog && Z.fog ? "#define USE_FOG" : "",
      Z.useFog && Z.fogExp2 ? "#define FOG_EXP2" : "",
      Z.map ? "#define USE_MAP" : "",
      Z.envMap ? "#define USE_ENVMAP" : "",
      Z.envMap ? "#define " + U : "",
      Z.lightMap ? "#define USE_LIGHTMAP" : "",
      Z.aoMap ? "#define USE_AOMAP" : "",
      Z.bumpMap ? "#define USE_BUMPMAP" : "",
      Z.normalMap ? "#define USE_NORMALMAP" : "",
      Z.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
      Z.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
      Z.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
      Z.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
      Z.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
      Z.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
      Z.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
      Z.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
      Z.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
      Z.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
      Z.specularMap ? "#define USE_SPECULARMAP" : "",
      Z.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
      Z.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
      Z.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
      Z.metalnessMap ? "#define USE_METALNESSMAP" : "",
      Z.alphaMap ? "#define USE_ALPHAMAP" : "",
      Z.alphaHash ? "#define USE_ALPHAHASH" : "",
      Z.transmission ? "#define USE_TRANSMISSION" : "",
      Z.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
      Z.thicknessMap ? "#define USE_THICKNESSMAP" : "",
      Z.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
      Z.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
      Z.mapUv ? "#define MAP_UV " + Z.mapUv : "",
      Z.alphaMapUv ? "#define ALPHAMAP_UV " + Z.alphaMapUv : "",
      Z.lightMapUv ? "#define LIGHTMAP_UV " + Z.lightMapUv : "",
      Z.aoMapUv ? "#define AOMAP_UV " + Z.aoMapUv : "",
      Z.emissiveMapUv ? "#define EMISSIVEMAP_UV " + Z.emissiveMapUv : "",
      Z.bumpMapUv ? "#define BUMPMAP_UV " + Z.bumpMapUv : "",
      Z.normalMapUv ? "#define NORMALMAP_UV " + Z.normalMapUv : "",
      Z.displacementMapUv
        ? "#define DISPLACEMENTMAP_UV " + Z.displacementMapUv
        : "",
      Z.metalnessMapUv ? "#define METALNESSMAP_UV " + Z.metalnessMapUv : "",
      Z.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + Z.roughnessMapUv : "",
      Z.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + Z.anisotropyMapUv : "",
      Z.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + Z.clearcoatMapUv : "",
      Z.clearcoatNormalMapUv
        ? "#define CLEARCOAT_NORMALMAP_UV " + Z.clearcoatNormalMapUv
        : "",
      Z.clearcoatRoughnessMapUv
        ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + Z.clearcoatRoughnessMapUv
        : "",
      Z.iridescenceMapUv
        ? "#define IRIDESCENCEMAP_UV " + Z.iridescenceMapUv
        : "",
      Z.iridescenceThicknessMapUv
        ? "#define IRIDESCENCE_THICKNESSMAP_UV " + Z.iridescenceThicknessMapUv
        : "",
      Z.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + Z.sheenColorMapUv : "",
      Z.sheenRoughnessMapUv
        ? "#define SHEEN_ROUGHNESSMAP_UV " + Z.sheenRoughnessMapUv
        : "",
      Z.specularMapUv ? "#define SPECULARMAP_UV " + Z.specularMapUv : "",
      Z.specularColorMapUv
        ? "#define SPECULAR_COLORMAP_UV " + Z.specularColorMapUv
        : "",
      Z.specularIntensityMapUv
        ? "#define SPECULAR_INTENSITYMAP_UV " + Z.specularIntensityMapUv
        : "",
      Z.transmissionMapUv
        ? "#define TRANSMISSIONMAP_UV " + Z.transmissionMapUv
        : "",
      Z.thicknessMapUv ? "#define THICKNESSMAP_UV " + Z.thicknessMapUv : "",
      Z.vertexTangents && Z.flatShading === !1 ? "#define USE_TANGENT" : "",
      Z.vertexColors ? "#define USE_COLOR" : "",
      Z.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
      Z.vertexUv1s ? "#define USE_UV1" : "",
      Z.vertexUv2s ? "#define USE_UV2" : "",
      Z.vertexUv3s ? "#define USE_UV3" : "",
      Z.pointsUvs ? "#define USE_POINTS_UV" : "",
      Z.flatShading ? "#define FLAT_SHADED" : "",
      Z.skinning ? "#define USE_SKINNING" : "",
      Z.morphTargets ? "#define USE_MORPHTARGETS" : "",
      Z.morphNormals && Z.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
      Z.morphColors && Z.isWebGL2 ? "#define USE_MORPHCOLORS" : "",
      Z.morphTargetsCount > 0 && Z.isWebGL2
        ? "#define MORPHTARGETS_TEXTURE"
        : "",
      Z.morphTargetsCount > 0 && Z.isWebGL2
        ? "#define MORPHTARGETS_TEXTURE_STRIDE " + Z.morphTextureStride
        : "",
      Z.morphTargetsCount > 0 && Z.isWebGL2
        ? "#define MORPHTARGETS_COUNT " + Z.morphTargetsCount
        : "",
      Z.doubleSided ? "#define DOUBLE_SIDED" : "",
      Z.flipSided ? "#define FLIP_SIDED" : "",
      Z.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
      Z.shadowMapEnabled ? "#define " + H : "",
      Z.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
      Z.useLegacyLights ? "#define LEGACY_LIGHTS" : "",
      Z.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
      Z.logarithmicDepthBuffer && Z.rendererExtensionFragDepth
        ? "#define USE_LOGDEPTHBUF_EXT"
        : "",
      "uniform mat4 modelMatrix;",
      "uniform mat4 modelViewMatrix;",
      "uniform mat4 projectionMatrix;",
      "uniform mat4 viewMatrix;",
      "uniform mat3 normalMatrix;",
      "uniform vec3 cameraPosition;",
      "uniform bool isOrthographic;",
      "#ifdef USE_INSTANCING",
      "\tattribute mat4 instanceMatrix;",
      "#endif",
      "#ifdef USE_INSTANCING_COLOR",
      "\tattribute vec3 instanceColor;",
      "#endif",
      "attribute vec3 position;",
      "attribute vec3 normal;",
      "attribute vec2 uv;",
      "#ifdef USE_UV1",
      "\tattribute vec2 uv1;",
      "#endif",
      "#ifdef USE_UV2",
      "\tattribute vec2 uv2;",
      "#endif",
      "#ifdef USE_UV3",
      "\tattribute vec2 uv3;",
      "#endif",
      "#ifdef USE_TANGENT",
      "\tattribute vec4 tangent;",
      "#endif",
      "#if defined( USE_COLOR_ALPHA )",
      "\tattribute vec4 color;",
      "#elif defined( USE_COLOR )",
      "\tattribute vec3 color;",
      "#endif",
      "#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )",
      "\tattribute vec3 morphTarget0;",
      "\tattribute vec3 morphTarget1;",
      "\tattribute vec3 morphTarget2;",
      "\tattribute vec3 morphTarget3;",
      "\t#ifdef USE_MORPHNORMALS",
      "\t\tattribute vec3 morphNormal0;",
      "\t\tattribute vec3 morphNormal1;",
      "\t\tattribute vec3 morphNormal2;",
      "\t\tattribute vec3 morphNormal3;",
      "\t#else",
      "\t\tattribute vec3 morphTarget4;",
      "\t\tattribute vec3 morphTarget5;",
      "\t\tattribute vec3 morphTarget6;",
      "\t\tattribute vec3 morphTarget7;",
      "\t#endif",
      "#endif",
      "#ifdef USE_SKINNING",
      "\tattribute vec4 skinIndex;",
      "\tattribute vec4 skinWeight;",
      "#endif",
      `
`,
    ].filter(Y5).join(`
`)),
      (V = [
        F,
        W7(Z),
        "#define SHADER_TYPE " + Z.shaderType,
        "#define SHADER_NAME " + Z.shaderName,
        O,
        Z.useFog && Z.fog ? "#define USE_FOG" : "",
        Z.useFog && Z.fogExp2 ? "#define FOG_EXP2" : "",
        Z.map ? "#define USE_MAP" : "",
        Z.matcap ? "#define USE_MATCAP" : "",
        Z.envMap ? "#define USE_ENVMAP" : "",
        Z.envMap ? "#define " + q : "",
        Z.envMap ? "#define " + U : "",
        Z.envMap ? "#define " + G : "",
        E ? "#define CUBEUV_TEXEL_WIDTH " + E.texelWidth : "",
        E ? "#define CUBEUV_TEXEL_HEIGHT " + E.texelHeight : "",
        E ? "#define CUBEUV_MAX_MIP " + E.maxMip + ".0" : "",
        Z.lightMap ? "#define USE_LIGHTMAP" : "",
        Z.aoMap ? "#define USE_AOMAP" : "",
        Z.bumpMap ? "#define USE_BUMPMAP" : "",
        Z.normalMap ? "#define USE_NORMALMAP" : "",
        Z.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
        Z.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
        Z.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
        Z.anisotropy ? "#define USE_ANISOTROPY" : "",
        Z.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
        Z.clearcoat ? "#define USE_CLEARCOAT" : "",
        Z.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
        Z.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
        Z.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
        Z.iridescence ? "#define USE_IRIDESCENCE" : "",
        Z.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
        Z.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
        Z.specularMap ? "#define USE_SPECULARMAP" : "",
        Z.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
        Z.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
        Z.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
        Z.metalnessMap ? "#define USE_METALNESSMAP" : "",
        Z.alphaMap ? "#define USE_ALPHAMAP" : "",
        Z.alphaTest ? "#define USE_ALPHATEST" : "",
        Z.alphaHash ? "#define USE_ALPHAHASH" : "",
        Z.sheen ? "#define USE_SHEEN" : "",
        Z.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
        Z.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
        Z.transmission ? "#define USE_TRANSMISSION" : "",
        Z.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
        Z.thicknessMap ? "#define USE_THICKNESSMAP" : "",
        Z.vertexTangents && Z.flatShading === !1 ? "#define USE_TANGENT" : "",
        Z.vertexColors || Z.instancingColor ? "#define USE_COLOR" : "",
        Z.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
        Z.vertexUv1s ? "#define USE_UV1" : "",
        Z.vertexUv2s ? "#define USE_UV2" : "",
        Z.vertexUv3s ? "#define USE_UV3" : "",
        Z.pointsUvs ? "#define USE_POINTS_UV" : "",
        Z.gradientMap ? "#define USE_GRADIENTMAP" : "",
        Z.flatShading ? "#define FLAT_SHADED" : "",
        Z.doubleSided ? "#define DOUBLE_SIDED" : "",
        Z.flipSided ? "#define FLIP_SIDED" : "",
        Z.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
        Z.shadowMapEnabled ? "#define " + H : "",
        Z.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
        Z.useLegacyLights ? "#define LEGACY_LIGHTS" : "",
        Z.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
        Z.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
        Z.logarithmicDepthBuffer && Z.rendererExtensionFragDepth
          ? "#define USE_LOGDEPTHBUF_EXT"
          : "",
        "uniform mat4 viewMatrix;",
        "uniform vec3 cameraPosition;",
        "uniform bool isOrthographic;",
        Z.toneMapping !== 0 ? "#define TONE_MAPPING" : "",
        Z.toneMapping !== 0 ? A0.tonemapping_pars_fragment : "",
        Z.toneMapping !== 0 ? iY("toneMapping", Z.toneMapping) : "",
        Z.dithering ? "#define DITHERING" : "",
        Z.opaque ? "#define OPAQUE" : "",
        A0.colorspace_pars_fragment,
        sY("linearToOutputTexel", Z.outputColorSpace),
        Z.useDepthPacking ? "#define DEPTH_PACKING " + Z.depthPacking : "",
        `
`,
      ].filter(Y5).join(`
`)));
  if (
    ((K = v8(K)),
    (K = J7(K, Z)),
    (K = Z7(K, Z)),
    (X = v8(X)),
    (X = J7(X, Z)),
    (X = Z7(X, Z)),
    (K = Q7(K)),
    (X = Q7(X)),
    Z.isWebGL2 && Z.isRawShaderMaterial !== !0)
  )
    ((k = `#version 300 es
`),
      (N =
        [
          "precision mediump sampler2DArray;",
          "#define attribute in",
          "#define varying out",
          "#define texture2D texture",
        ].join(`
`) +
        `
` +
        N),
      (V =
        [
          "#define varying in",
          Z.glslVersion === "300 es"
            ? ""
            : "layout(location = 0) out highp vec4 pc_fragColor;",
          Z.glslVersion === "300 es" ? "" : "#define gl_FragColor pc_fragColor",
          "#define gl_FragDepthEXT gl_FragDepth",
          "#define texture2D texture",
          "#define textureCube texture",
          "#define texture2DProj textureProj",
          "#define texture2DLodEXT textureLod",
          "#define texture2DProjLodEXT textureProjLod",
          "#define textureCubeLodEXT textureLod",
          "#define texture2DGradEXT textureGrad",
          "#define texture2DProjGradEXT textureProjGrad",
          "#define textureCubeGradEXT textureGrad",
        ].join(`
`) +
        `
` +
        V));
  let M = k + N + K,
    A = k + V + X,
    L = eJ(W, W.VERTEX_SHADER, M),
    C = eJ(W, W.FRAGMENT_SHADER, A);
  if (
    (W.attachShader(_, L),
    W.attachShader(_, C),
    Z.index0AttributeName !== void 0)
  )
    W.bindAttribLocation(_, 0, Z.index0AttributeName);
  else if (Z.morphTargets === !0) W.bindAttribLocation(_, 0, "position");
  if ((W.linkProgram(_), $.debug.checkShaderErrors)) {
    let R = W.getProgramInfoLog(_).trim(),
      w = W.getShaderInfoLog(L).trim(),
      s = W.getShaderInfoLog(C).trim(),
      W0 = !0,
      h = !0;
    if (W.getProgramParameter(_, W.LINK_STATUS) === !1)
      if (((W0 = !1), typeof $.debug.onShaderError === "function"))
        $.debug.onShaderError(W, _, L, C);
      else {
        let y = $7(W, L, "vertex"),
          l = $7(W, C, "fragment");
        console.error(
          "THREE.WebGLProgram: Shader Error " +
            W.getError() +
            " - VALIDATE_STATUS " +
            W.getProgramParameter(_, W.VALIDATE_STATUS) +
            `

Program Info Log: ` +
            R +
            `
` +
            y +
            `
` +
            l,
        );
      }
    else if (R !== "") console.warn("THREE.WebGLProgram: Program Info Log:", R);
    else if (w === "" || s === "") h = !1;
    if (h)
      this.diagnostics = {
        runnable: W0,
        programLog: R,
        vertexShader: { log: w, prefix: N },
        fragmentShader: { log: s, prefix: V },
      };
  }
  (W.deleteShader(L), W.deleteShader(C));
  let g;
  this.getUniforms = function () {
    if (g === void 0) g = new q5(W, _);
    return g;
  };
  let d;
  return (
    (this.getAttributes = function () {
      if (d === void 0) d = aY(W, _);
      return d;
    }),
    (this.destroy = function () {
      (Q.releaseStatesOfProgram(this),
        W.deleteProgram(_),
        (this.program = void 0));
    }),
    (this.type = Z.shaderType),
    (this.name = Z.shaderName),
    (this.id = dY++),
    (this.cacheKey = J),
    (this.usedTimes = 1),
    (this.program = _),
    (this.vertexShader = L),
    (this.fragmentShader = C),
    this
  );
}
var q4 = 0;
class j7 {
  constructor() {
    ((this.shaderCache = new Map()), (this.materialCache = new Map()));
  }
  update($) {
    let { vertexShader: J, fragmentShader: Z } = $,
      Q = this._getShaderStage(J),
      W = this._getShaderStage(Z),
      Y = this._getShaderCacheForMaterial($);
    if (Y.has(Q) === !1) (Y.add(Q), Q.usedTimes++);
    if (Y.has(W) === !1) (Y.add(W), W.usedTimes++);
    return this;
  }
  remove($) {
    let J = this.materialCache.get($);
    for (let Z of J)
      if ((Z.usedTimes--, Z.usedTimes === 0)) this.shaderCache.delete(Z.code);
    return (this.materialCache.delete($), this);
  }
  getVertexShaderID($) {
    return this._getShaderStage($.vertexShader).id;
  }
  getFragmentShaderID($) {
    return this._getShaderStage($.fragmentShader).id;
  }
  dispose() {
    (this.shaderCache.clear(), this.materialCache.clear());
  }
  _getShaderCacheForMaterial($) {
    let J = this.materialCache,
      Z = J.get($);
    if (Z === void 0) ((Z = new Set()), J.set($, Z));
    return Z;
  }
  _getShaderStage($) {
    let J = this.shaderCache,
      Z = J.get($);
    if (Z === void 0) ((Z = new y7($)), J.set($, Z));
    return Z;
  }
}
class y7 {
  constructor($) {
    ((this.id = q4++), (this.code = $), (this.usedTimes = 0));
  }
}
function G4($, J, Z, Q, W, Y, K) {
  let X = new l8(),
    H = new j7(),
    q = [],
    U = W.isWebGL2,
    G = W.logarithmicDepthBuffer,
    E = W.vertexTextures,
    F = W.precision,
    O = {
      MeshDepthMaterial: "depth",
      MeshDistanceMaterial: "distanceRGBA",
      MeshNormalMaterial: "normal",
      MeshBasicMaterial: "basic",
      MeshLambertMaterial: "lambert",
      MeshPhongMaterial: "phong",
      MeshToonMaterial: "toon",
      MeshStandardMaterial: "physical",
      MeshPhysicalMaterial: "physical",
      MeshMatcapMaterial: "matcap",
      LineBasicMaterial: "basic",
      LineDashedMaterial: "dashed",
      PointsMaterial: "points",
      ShadowMaterial: "shadow",
      SpriteMaterial: "sprite",
    };
  function _(R) {
    if (R === 0) return "uv";
    return `uv${R}`;
  }
  function N(R, w, s, W0, h) {
    let y = W0.fog,
      l = h.geometry,
      r = R.isMeshStandardMaterial ? W0.environment : null,
      c = (R.isMeshStandardMaterial ? Z : J).get(R.envMap || r),
      u = !!c && c.mapping === 306 ? c.image.height : null,
      i = O[R.type];
    if (R.precision !== null) {
      if (((F = W.getMaxPrecision(R.precision)), F !== R.precision))
        console.warn(
          "THREE.WebGLProgram.getParameters:",
          R.precision,
          "not supported, using",
          F,
          "instead.",
        );
    }
    let T =
        l.morphAttributes.position ||
        l.morphAttributes.normal ||
        l.morphAttributes.color,
      n = T !== void 0 ? T.length : 0,
      J0 = 0;
    if (l.morphAttributes.position !== void 0) J0 = 1;
    if (l.morphAttributes.normal !== void 0) J0 = 2;
    if (l.morphAttributes.color !== void 0) J0 = 3;
    let E0, G0, V0, v0;
    if (i) {
      let s0 = m6[i];
      ((E0 = s0.vertexShader), (G0 = s0.fragmentShader));
    } else
      ((E0 = R.vertexShader),
        (G0 = R.fragmentShader),
        H.update(R),
        (V0 = H.getVertexShaderID(R)),
        (v0 = H.getFragmentShaderID(R)));
    let e = $.getRenderTarget(),
      z0 = h.isInstancedMesh === !0,
      g0 = !!R.map,
      Y6 = !!R.matcap,
      f = !!c,
      o0 = !!R.aoMap,
      b0 = !!R.lightMap,
      O0 = !!R.bumpMap,
      C0 = !!R.normalMap,
      n0 = !!R.displacementMap,
      P0 = !!R.emissiveMap,
      y0 = !!R.metalnessMap,
      c0 = !!R.roughnessMap,
      p0 = R.anisotropy > 0,
      q6 = R.clearcoat > 0,
      R6 = R.iridescence > 0,
      B = R.sheen > 0,
      D = R.transmission > 0,
      v = p0 && !!R.anisotropyMap,
      Z0 = q6 && !!R.clearcoatMap,
      a = q6 && !!R.clearcoatNormalMap,
      t = q6 && !!R.clearcoatRoughnessMap,
      _0 = R6 && !!R.iridescenceMap,
      Q0 = R6 && !!R.iridescenceThicknessMap,
      z = B && !!R.sheenColorMap,
      o = B && !!R.sheenRoughnessMap,
      q0 = !!R.specularMap,
      Y0 = !!R.specularColorMap,
      U0 = !!R.specularIntensityMap,
      N0 = D && !!R.transmissionMap,
      w0 = D && !!R.thicknessMap,
      T0 = !!R.gradientMap,
      P = !!R.alphaMap,
      K0 = R.alphaTest > 0,
      x = !!R.alphaHash,
      $0 = !!R.extensions,
      H0 = !!l.attributes.uv1,
      S0 = !!l.attributes.uv2,
      m0 = !!l.attributes.uv3,
      r0 = 0;
    if (R.toneMapped) {
      if (e === null || e.isXRRenderTarget === !0) r0 = $.toneMapping;
    }
    return {
      isWebGL2: U,
      shaderID: i,
      shaderType: R.type,
      shaderName: R.name,
      vertexShader: E0,
      fragmentShader: G0,
      defines: R.defines,
      customVertexShaderID: V0,
      customFragmentShaderID: v0,
      isRawShaderMaterial: R.isRawShaderMaterial === !0,
      glslVersion: R.glslVersion,
      precision: F,
      instancing: z0,
      instancingColor: z0 && h.instanceColor !== null,
      supportsVertexTextures: E,
      outputColorSpace:
        e === null
          ? $.outputColorSpace
          : e.isXRRenderTarget === !0
            ? e.texture.colorSpace
            : "srgb-linear",
      map: g0,
      matcap: Y6,
      envMap: f,
      envMapMode: f && c.mapping,
      envMapCubeUVHeight: u,
      aoMap: o0,
      lightMap: b0,
      bumpMap: O0,
      normalMap: C0,
      displacementMap: E && n0,
      emissiveMap: P0,
      normalMapObjectSpace: C0 && R.normalMapType === 1,
      normalMapTangentSpace: C0 && R.normalMapType === 0,
      metalnessMap: y0,
      roughnessMap: c0,
      anisotropy: p0,
      anisotropyMap: v,
      clearcoat: q6,
      clearcoatMap: Z0,
      clearcoatNormalMap: a,
      clearcoatRoughnessMap: t,
      iridescence: R6,
      iridescenceMap: _0,
      iridescenceThicknessMap: Q0,
      sheen: B,
      sheenColorMap: z,
      sheenRoughnessMap: o,
      specularMap: q0,
      specularColorMap: Y0,
      specularIntensityMap: U0,
      transmission: D,
      transmissionMap: N0,
      thicknessMap: w0,
      gradientMap: T0,
      opaque: R.transparent === !1 && R.blending === 1,
      alphaMap: P,
      alphaTest: K0,
      alphaHash: x,
      combine: R.combine,
      mapUv: g0 && _(R.map.channel),
      aoMapUv: o0 && _(R.aoMap.channel),
      lightMapUv: b0 && _(R.lightMap.channel),
      bumpMapUv: O0 && _(R.bumpMap.channel),
      normalMapUv: C0 && _(R.normalMap.channel),
      displacementMapUv: n0 && _(R.displacementMap.channel),
      emissiveMapUv: P0 && _(R.emissiveMap.channel),
      metalnessMapUv: y0 && _(R.metalnessMap.channel),
      roughnessMapUv: c0 && _(R.roughnessMap.channel),
      anisotropyMapUv: v && _(R.anisotropyMap.channel),
      clearcoatMapUv: Z0 && _(R.clearcoatMap.channel),
      clearcoatNormalMapUv: a && _(R.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: t && _(R.clearcoatRoughnessMap.channel),
      iridescenceMapUv: _0 && _(R.iridescenceMap.channel),
      iridescenceThicknessMapUv: Q0 && _(R.iridescenceThicknessMap.channel),
      sheenColorMapUv: z && _(R.sheenColorMap.channel),
      sheenRoughnessMapUv: o && _(R.sheenRoughnessMap.channel),
      specularMapUv: q0 && _(R.specularMap.channel),
      specularColorMapUv: Y0 && _(R.specularColorMap.channel),
      specularIntensityMapUv: U0 && _(R.specularIntensityMap.channel),
      transmissionMapUv: N0 && _(R.transmissionMap.channel),
      thicknessMapUv: w0 && _(R.thicknessMap.channel),
      alphaMapUv: P && _(R.alphaMap.channel),
      vertexTangents: !!l.attributes.tangent && (C0 || p0),
      vertexColors: R.vertexColors,
      vertexAlphas:
        R.vertexColors === !0 &&
        !!l.attributes.color &&
        l.attributes.color.itemSize === 4,
      vertexUv1s: H0,
      vertexUv2s: S0,
      vertexUv3s: m0,
      pointsUvs: h.isPoints === !0 && !!l.attributes.uv && (g0 || P),
      fog: !!y,
      useFog: R.fog === !0,
      fogExp2: y && y.isFogExp2,
      flatShading: R.flatShading === !0,
      sizeAttenuation: R.sizeAttenuation === !0,
      logarithmicDepthBuffer: G,
      skinning: h.isSkinnedMesh === !0,
      morphTargets: l.morphAttributes.position !== void 0,
      morphNormals: l.morphAttributes.normal !== void 0,
      morphColors: l.morphAttributes.color !== void 0,
      morphTargetsCount: n,
      morphTextureStride: J0,
      numDirLights: w.directional.length,
      numPointLights: w.point.length,
      numSpotLights: w.spot.length,
      numSpotLightMaps: w.spotLightMap.length,
      numRectAreaLights: w.rectArea.length,
      numHemiLights: w.hemi.length,
      numDirLightShadows: w.directionalShadowMap.length,
      numPointLightShadows: w.pointShadowMap.length,
      numSpotLightShadows: w.spotShadowMap.length,
      numSpotLightShadowsWithMaps: w.numSpotLightShadowsWithMaps,
      numClippingPlanes: K.numPlanes,
      numClipIntersection: K.numIntersection,
      dithering: R.dithering,
      shadowMapEnabled: $.shadowMap.enabled && s.length > 0,
      shadowMapType: $.shadowMap.type,
      toneMapping: r0,
      useLegacyLights: $._useLegacyLights,
      decodeVideoTexture:
        g0 && R.map.isVideoTexture === !0 && R.map.colorSpace === "srgb",
      premultipliedAlpha: R.premultipliedAlpha,
      doubleSided: R.side === 2,
      flipSided: R.side === 1,
      useDepthPacking: R.depthPacking >= 0,
      depthPacking: R.depthPacking || 0,
      index0AttributeName: R.index0AttributeName,
      extensionDerivatives: $0 && R.extensions.derivatives === !0,
      extensionFragDepth: $0 && R.extensions.fragDepth === !0,
      extensionDrawBuffers: $0 && R.extensions.drawBuffers === !0,
      extensionShaderTextureLOD: $0 && R.extensions.shaderTextureLOD === !0,
      rendererExtensionFragDepth: U || Q.has("EXT_frag_depth"),
      rendererExtensionDrawBuffers: U || Q.has("WEBGL_draw_buffers"),
      rendererExtensionShaderTextureLod: U || Q.has("EXT_shader_texture_lod"),
      customProgramCacheKey: R.customProgramCacheKey(),
    };
  }
  function V(R) {
    let w = [];
    if (R.shaderID) w.push(R.shaderID);
    else (w.push(R.customVertexShaderID), w.push(R.customFragmentShaderID));
    if (R.defines !== void 0)
      for (let s in R.defines) (w.push(s), w.push(R.defines[s]));
    if (R.isRawShaderMaterial === !1)
      (k(w, R), M(w, R), w.push($.outputColorSpace));
    return (w.push(R.customProgramCacheKey), w.join());
  }
  function k(R, w) {
    (R.push(w.precision),
      R.push(w.outputColorSpace),
      R.push(w.envMapMode),
      R.push(w.envMapCubeUVHeight),
      R.push(w.mapUv),
      R.push(w.alphaMapUv),
      R.push(w.lightMapUv),
      R.push(w.aoMapUv),
      R.push(w.bumpMapUv),
      R.push(w.normalMapUv),
      R.push(w.displacementMapUv),
      R.push(w.emissiveMapUv),
      R.push(w.metalnessMapUv),
      R.push(w.roughnessMapUv),
      R.push(w.anisotropyMapUv),
      R.push(w.clearcoatMapUv),
      R.push(w.clearcoatNormalMapUv),
      R.push(w.clearcoatRoughnessMapUv),
      R.push(w.iridescenceMapUv),
      R.push(w.iridescenceThicknessMapUv),
      R.push(w.sheenColorMapUv),
      R.push(w.sheenRoughnessMapUv),
      R.push(w.specularMapUv),
      R.push(w.specularColorMapUv),
      R.push(w.specularIntensityMapUv),
      R.push(w.transmissionMapUv),
      R.push(w.thicknessMapUv),
      R.push(w.combine),
      R.push(w.fogExp2),
      R.push(w.sizeAttenuation),
      R.push(w.morphTargetsCount),
      R.push(w.morphAttributeCount),
      R.push(w.numDirLights),
      R.push(w.numPointLights),
      R.push(w.numSpotLights),
      R.push(w.numSpotLightMaps),
      R.push(w.numHemiLights),
      R.push(w.numRectAreaLights),
      R.push(w.numDirLightShadows),
      R.push(w.numPointLightShadows),
      R.push(w.numSpotLightShadows),
      R.push(w.numSpotLightShadowsWithMaps),
      R.push(w.shadowMapType),
      R.push(w.toneMapping),
      R.push(w.numClippingPlanes),
      R.push(w.numClipIntersection),
      R.push(w.depthPacking));
  }
  function M(R, w) {
    if ((X.disableAll(), w.isWebGL2)) X.enable(0);
    if (w.supportsVertexTextures) X.enable(1);
    if (w.instancing) X.enable(2);
    if (w.instancingColor) X.enable(3);
    if (w.matcap) X.enable(4);
    if (w.envMap) X.enable(5);
    if (w.normalMapObjectSpace) X.enable(6);
    if (w.normalMapTangentSpace) X.enable(7);
    if (w.clearcoat) X.enable(8);
    if (w.iridescence) X.enable(9);
    if (w.alphaTest) X.enable(10);
    if (w.vertexColors) X.enable(11);
    if (w.vertexAlphas) X.enable(12);
    if (w.vertexUv1s) X.enable(13);
    if (w.vertexUv2s) X.enable(14);
    if (w.vertexUv3s) X.enable(15);
    if (w.vertexTangents) X.enable(16);
    if (w.anisotropy) X.enable(17);
    if ((R.push(X.mask), X.disableAll(), w.fog)) X.enable(0);
    if (w.useFog) X.enable(1);
    if (w.flatShading) X.enable(2);
    if (w.logarithmicDepthBuffer) X.enable(3);
    if (w.skinning) X.enable(4);
    if (w.morphTargets) X.enable(5);
    if (w.morphNormals) X.enable(6);
    if (w.morphColors) X.enable(7);
    if (w.premultipliedAlpha) X.enable(8);
    if (w.shadowMapEnabled) X.enable(9);
    if (w.useLegacyLights) X.enable(10);
    if (w.doubleSided) X.enable(11);
    if (w.flipSided) X.enable(12);
    if (w.useDepthPacking) X.enable(13);
    if (w.dithering) X.enable(14);
    if (w.transmission) X.enable(15);
    if (w.sheen) X.enable(16);
    if (w.opaque) X.enable(17);
    if (w.pointsUvs) X.enable(18);
    if (w.decodeVideoTexture) X.enable(19);
    R.push(X.mask);
  }
  function A(R) {
    let w = O[R.type],
      s;
    if (w) {
      let W0 = m6[w];
      s = s8.clone(W0.uniforms);
    } else s = R.uniforms;
    return s;
  }
  function L(R, w) {
    let s;
    for (let W0 = 0, h = q.length; W0 < h; W0++) {
      let y = q[W0];
      if (y.cacheKey === w) {
        ((s = y), ++s.usedTimes);
        break;
      }
    }
    if (s === void 0) ((s = new H4($, w, R, Y)), q.push(s));
    return s;
  }
  function C(R) {
    if (--R.usedTimes === 0) {
      let w = q.indexOf(R);
      ((q[w] = q[q.length - 1]), q.pop(), R.destroy());
    }
  }
  function g(R) {
    H.remove(R);
  }
  function d() {
    H.dispose();
  }
  return {
    getParameters: N,
    getProgramCacheKey: V,
    getUniforms: A,
    acquireProgram: L,
    releaseProgram: C,
    releaseShaderCache: g,
    programs: q,
    dispose: d,
  };
}
function U4() {
  let $ = new WeakMap();
  function J(Y) {
    let K = $.get(Y);
    if (K === void 0) ((K = {}), $.set(Y, K));
    return K;
  }
  function Z(Y) {
    $.delete(Y);
  }
  function Q(Y, K, X) {
    $.get(Y)[K] = X;
  }
  function W() {
    $ = new WeakMap();
  }
  return { get: J, remove: Z, update: Q, dispose: W };
}
function E4($, J) {
  if ($.groupOrder !== J.groupOrder) return $.groupOrder - J.groupOrder;
  else if ($.renderOrder !== J.renderOrder)
    return $.renderOrder - J.renderOrder;
  else if ($.material.id !== J.material.id)
    return $.material.id - J.material.id;
  else if ($.z !== J.z) return $.z - J.z;
  else return $.id - J.id;
}
function Y7($, J) {
  if ($.groupOrder !== J.groupOrder) return $.groupOrder - J.groupOrder;
  else if ($.renderOrder !== J.renderOrder)
    return $.renderOrder - J.renderOrder;
  else if ($.z !== J.z) return J.z - $.z;
  else return $.id - J.id;
}
function X7() {
  let $ = [],
    J = 0,
    Z = [],
    Q = [],
    W = [];
  function Y() {
    ((J = 0), (Z.length = 0), (Q.length = 0), (W.length = 0));
  }
  function K(G, E, F, O, _, N) {
    let V = $[J];
    if (V === void 0)
      ((V = {
        id: G.id,
        object: G,
        geometry: E,
        material: F,
        groupOrder: O,
        renderOrder: G.renderOrder,
        z: _,
        group: N,
      }),
        ($[J] = V));
    else
      ((V.id = G.id),
        (V.object = G),
        (V.geometry = E),
        (V.material = F),
        (V.groupOrder = O),
        (V.renderOrder = G.renderOrder),
        (V.z = _),
        (V.group = N));
    return (J++, V);
  }
  function X(G, E, F, O, _, N) {
    let V = K(G, E, F, O, _, N);
    if (F.transmission > 0) Q.push(V);
    else if (F.transparent === !0) W.push(V);
    else Z.push(V);
  }
  function H(G, E, F, O, _, N) {
    let V = K(G, E, F, O, _, N);
    if (F.transmission > 0) Q.unshift(V);
    else if (F.transparent === !0) W.unshift(V);
    else Z.unshift(V);
  }
  function q(G, E) {
    if (Z.length > 1) Z.sort(G || E4);
    if (Q.length > 1) Q.sort(E || Y7);
    if (W.length > 1) W.sort(E || Y7);
  }
  function U() {
    for (let G = J, E = $.length; G < E; G++) {
      let F = $[G];
      if (F.id === null) break;
      ((F.id = null),
        (F.object = null),
        (F.geometry = null),
        (F.material = null),
        (F.group = null));
    }
  }
  return {
    opaque: Z,
    transmissive: Q,
    transparent: W,
    init: Y,
    push: X,
    unshift: H,
    finish: U,
    sort: q,
  };
}
function V4() {
  let $ = new WeakMap();
  function J(Q, W) {
    let Y = $.get(Q),
      K;
    if (Y === void 0) ((K = new X7()), $.set(Q, [K]));
    else if (W >= Y.length) ((K = new X7()), Y.push(K));
    else K = Y[W];
    return K;
  }
  function Z() {
    $ = new WeakMap();
  }
  return { get: J, dispose: Z };
}
function N4() {
  let $ = {};
  return {
    get: function (J) {
      if ($[J.id] !== void 0) return $[J.id];
      let Z;
      switch (J.type) {
        case "DirectionalLight":
          Z = { direction: new S(), color: new h0() };
          break;
        case "SpotLight":
          Z = {
            position: new S(),
            direction: new S(),
            color: new h0(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0,
          };
          break;
        case "PointLight":
          Z = { position: new S(), color: new h0(), distance: 0, decay: 0 };
          break;
        case "HemisphereLight":
          Z = { direction: new S(), skyColor: new h0(), groundColor: new h0() };
          break;
        case "RectAreaLight":
          Z = {
            color: new h0(),
            position: new S(),
            halfWidth: new S(),
            halfHeight: new S(),
          };
          break;
      }
      return (($[J.id] = Z), Z);
    },
  };
}
function F4() {
  let $ = {};
  return {
    get: function (J) {
      if ($[J.id] !== void 0) return $[J.id];
      let Z;
      switch (J.type) {
        case "DirectionalLight":
          Z = {
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new R0(),
          };
          break;
        case "SpotLight":
          Z = {
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new R0(),
          };
          break;
        case "PointLight":
          Z = {
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new R0(),
            shadowCameraNear: 1,
            shadowCameraFar: 1000,
          };
          break;
      }
      return (($[J.id] = Z), Z);
    },
  };
}
var R4 = 0;
function D4($, J) {
  return (
    (J.castShadow ? 2 : 0) -
    ($.castShadow ? 2 : 0) +
    (J.map ? 1 : 0) -
    ($.map ? 1 : 0)
  );
}
function O4($, J) {
  let Z = new N4(),
    Q = F4(),
    W = {
      version: 0,
      hash: {
        directionalLength: -1,
        pointLength: -1,
        spotLength: -1,
        rectAreaLength: -1,
        hemiLength: -1,
        numDirectionalShadows: -1,
        numPointShadows: -1,
        numSpotShadows: -1,
        numSpotMaps: -1,
      },
      ambient: [0, 0, 0],
      probe: [],
      directional: [],
      directionalShadow: [],
      directionalShadowMap: [],
      directionalShadowMatrix: [],
      spot: [],
      spotLightMap: [],
      spotShadow: [],
      spotShadowMap: [],
      spotLightMatrix: [],
      rectArea: [],
      rectAreaLTC1: null,
      rectAreaLTC2: null,
      point: [],
      pointShadow: [],
      pointShadowMap: [],
      pointShadowMatrix: [],
      hemi: [],
      numSpotLightShadowsWithMaps: 0,
    };
  for (let U = 0; U < 9; U++) W.probe.push(new S());
  let Y = new S(),
    K = new $6(),
    X = new $6();
  function H(U, G) {
    let E = 0,
      F = 0,
      O = 0;
    for (let s = 0; s < 9; s++) W.probe[s].set(0, 0, 0);
    let _ = 0,
      N = 0,
      V = 0,
      k = 0,
      M = 0,
      A = 0,
      L = 0,
      C = 0,
      g = 0,
      d = 0;
    U.sort(D4);
    let R = G === !0 ? Math.PI : 1;
    for (let s = 0, W0 = U.length; s < W0; s++) {
      let h = U[s],
        y = h.color,
        l = h.intensity,
        r = h.distance,
        c = h.shadow && h.shadow.map ? h.shadow.map.texture : null;
      if (h.isAmbientLight)
        ((E += y.r * l * R), (F += y.g * l * R), (O += y.b * l * R));
      else if (h.isLightProbe)
        for (let u = 0; u < 9; u++)
          W.probe[u].addScaledVector(h.sh.coefficients[u], l);
      else if (h.isDirectionalLight) {
        let u = Z.get(h);
        if (
          (u.color.copy(h.color).multiplyScalar(h.intensity * R), h.castShadow)
        ) {
          let i = h.shadow,
            T = Q.get(h);
          ((T.shadowBias = i.bias),
            (T.shadowNormalBias = i.normalBias),
            (T.shadowRadius = i.radius),
            (T.shadowMapSize = i.mapSize),
            (W.directionalShadow[_] = T),
            (W.directionalShadowMap[_] = c),
            (W.directionalShadowMatrix[_] = h.shadow.matrix),
            A++);
        }
        ((W.directional[_] = u), _++);
      } else if (h.isSpotLight) {
        let u = Z.get(h);
        (u.position.setFromMatrixPosition(h.matrixWorld),
          u.color.copy(y).multiplyScalar(l * R),
          (u.distance = r),
          (u.coneCos = Math.cos(h.angle)),
          (u.penumbraCos = Math.cos(h.angle * (1 - h.penumbra))),
          (u.decay = h.decay),
          (W.spot[V] = u));
        let i = h.shadow;
        if (h.map) {
          if (
            ((W.spotLightMap[g] = h.map),
            g++,
            i.updateMatrices(h),
            h.castShadow)
          )
            d++;
        }
        if (((W.spotLightMatrix[V] = i.matrix), h.castShadow)) {
          let T = Q.get(h);
          ((T.shadowBias = i.bias),
            (T.shadowNormalBias = i.normalBias),
            (T.shadowRadius = i.radius),
            (T.shadowMapSize = i.mapSize),
            (W.spotShadow[V] = T),
            (W.spotShadowMap[V] = c),
            C++);
        }
        V++;
      } else if (h.isRectAreaLight) {
        let u = Z.get(h);
        (u.color.copy(y).multiplyScalar(l),
          u.halfWidth.set(h.width * 0.5, 0, 0),
          u.halfHeight.set(0, h.height * 0.5, 0),
          (W.rectArea[k] = u),
          k++);
      } else if (h.isPointLight) {
        let u = Z.get(h);
        if (
          (u.color.copy(h.color).multiplyScalar(h.intensity * R),
          (u.distance = h.distance),
          (u.decay = h.decay),
          h.castShadow)
        ) {
          let i = h.shadow,
            T = Q.get(h);
          ((T.shadowBias = i.bias),
            (T.shadowNormalBias = i.normalBias),
            (T.shadowRadius = i.radius),
            (T.shadowMapSize = i.mapSize),
            (T.shadowCameraNear = i.camera.near),
            (T.shadowCameraFar = i.camera.far),
            (W.pointShadow[N] = T),
            (W.pointShadowMap[N] = c),
            (W.pointShadowMatrix[N] = h.shadow.matrix),
            L++);
        }
        ((W.point[N] = u), N++);
      } else if (h.isHemisphereLight) {
        let u = Z.get(h);
        (u.skyColor.copy(h.color).multiplyScalar(l * R),
          u.groundColor.copy(h.groundColor).multiplyScalar(l * R),
          (W.hemi[M] = u),
          M++);
      }
    }
    if (k > 0)
      if (J.isWebGL2)
        ((W.rectAreaLTC1 = X0.LTC_FLOAT_1), (W.rectAreaLTC2 = X0.LTC_FLOAT_2));
      else if ($.has("OES_texture_float_linear") === !0)
        ((W.rectAreaLTC1 = X0.LTC_FLOAT_1), (W.rectAreaLTC2 = X0.LTC_FLOAT_2));
      else if ($.has("OES_texture_half_float_linear") === !0)
        ((W.rectAreaLTC1 = X0.LTC_HALF_1), (W.rectAreaLTC2 = X0.LTC_HALF_2));
      else
        console.error(
          "THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.",
        );
    ((W.ambient[0] = E), (W.ambient[1] = F), (W.ambient[2] = O));
    let w = W.hash;
    if (
      w.directionalLength !== _ ||
      w.pointLength !== N ||
      w.spotLength !== V ||
      w.rectAreaLength !== k ||
      w.hemiLength !== M ||
      w.numDirectionalShadows !== A ||
      w.numPointShadows !== L ||
      w.numSpotShadows !== C ||
      w.numSpotMaps !== g
    )
      ((W.directional.length = _),
        (W.spot.length = V),
        (W.rectArea.length = k),
        (W.point.length = N),
        (W.hemi.length = M),
        (W.directionalShadow.length = A),
        (W.directionalShadowMap.length = A),
        (W.pointShadow.length = L),
        (W.pointShadowMap.length = L),
        (W.spotShadow.length = C),
        (W.spotShadowMap.length = C),
        (W.directionalShadowMatrix.length = A),
        (W.pointShadowMatrix.length = L),
        (W.spotLightMatrix.length = C + g - d),
        (W.spotLightMap.length = g),
        (W.numSpotLightShadowsWithMaps = d),
        (w.directionalLength = _),
        (w.pointLength = N),
        (w.spotLength = V),
        (w.rectAreaLength = k),
        (w.hemiLength = M),
        (w.numDirectionalShadows = A),
        (w.numPointShadows = L),
        (w.numSpotShadows = C),
        (w.numSpotMaps = g),
        (W.version = R4++));
  }
  function q(U, G) {
    let E = 0,
      F = 0,
      O = 0,
      _ = 0,
      N = 0,
      V = G.matrixWorldInverse;
    for (let k = 0, M = U.length; k < M; k++) {
      let A = U[k];
      if (A.isDirectionalLight) {
        let L = W.directional[E];
        (L.direction.setFromMatrixPosition(A.matrixWorld),
          Y.setFromMatrixPosition(A.target.matrixWorld),
          L.direction.sub(Y),
          L.direction.transformDirection(V),
          E++);
      } else if (A.isSpotLight) {
        let L = W.spot[O];
        (L.position.setFromMatrixPosition(A.matrixWorld),
          L.position.applyMatrix4(V),
          L.direction.setFromMatrixPosition(A.matrixWorld),
          Y.setFromMatrixPosition(A.target.matrixWorld),
          L.direction.sub(Y),
          L.direction.transformDirection(V),
          O++);
      } else if (A.isRectAreaLight) {
        let L = W.rectArea[_];
        (L.position.setFromMatrixPosition(A.matrixWorld),
          L.position.applyMatrix4(V),
          X.identity(),
          K.copy(A.matrixWorld),
          K.premultiply(V),
          X.extractRotation(K),
          L.halfWidth.set(A.width * 0.5, 0, 0),
          L.halfHeight.set(0, A.height * 0.5, 0),
          L.halfWidth.applyMatrix4(X),
          L.halfHeight.applyMatrix4(X),
          _++);
      } else if (A.isPointLight) {
        let L = W.point[F];
        (L.position.setFromMatrixPosition(A.matrixWorld),
          L.position.applyMatrix4(V),
          F++);
      } else if (A.isHemisphereLight) {
        let L = W.hemi[N];
        (L.direction.setFromMatrixPosition(A.matrixWorld),
          L.direction.transformDirection(V),
          N++);
      }
    }
  }
  return { setup: H, setupView: q, state: W };
}
function K7($, J) {
  let Z = new O4($, J),
    Q = [],
    W = [];
  function Y() {
    ((Q.length = 0), (W.length = 0));
  }
  function K(G) {
    Q.push(G);
  }
  function X(G) {
    W.push(G);
  }
  function H(G) {
    Z.setup(Q, G);
  }
  function q(G) {
    Z.setupView(Q, G);
  }
  return {
    init: Y,
    state: { lightsArray: Q, shadowsArray: W, lights: Z },
    setupLights: H,
    setupLightsView: q,
    pushLight: K,
    pushShadow: X,
  };
}
function _4($, J) {
  let Z = new WeakMap();
  function Q(Y, K = 0) {
    let X = Z.get(Y),
      H;
    if (X === void 0) ((H = new K7($, J)), Z.set(Y, [H]));
    else if (K >= X.length) ((H = new K7($, J)), X.push(H));
    else H = X[K];
    return H;
  }
  function W() {
    Z = new WeakMap();
  }
  return { get: Q, dispose: W };
}
class x7 extends _$ {
  constructor($) {
    super();
    ((this.isMeshDepthMaterial = !0),
      (this.type = "MeshDepthMaterial"),
      (this.depthPacking = 3200),
      (this.map = null),
      (this.alphaMap = null),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      this.setValues($));
  }
  copy($) {
    return (
      super.copy($),
      (this.depthPacking = $.depthPacking),
      (this.map = $.map),
      (this.alphaMap = $.alphaMap),
      (this.displacementMap = $.displacementMap),
      (this.displacementScale = $.displacementScale),
      (this.displacementBias = $.displacementBias),
      (this.wireframe = $.wireframe),
      (this.wireframeLinewidth = $.wireframeLinewidth),
      this
    );
  }
}
class v7 extends _$ {
  constructor($) {
    super();
    ((this.isMeshDistanceMaterial = !0),
      (this.type = "MeshDistanceMaterial"),
      (this.map = null),
      (this.alphaMap = null),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      this.setValues($));
  }
  copy($) {
    return (
      super.copy($),
      (this.map = $.map),
      (this.alphaMap = $.alphaMap),
      (this.displacementMap = $.displacementMap),
      (this.displacementScale = $.displacementScale),
      (this.displacementBias = $.displacementBias),
      this
    );
  }
}
var z4 = `void main() {
	gl_Position = vec4( position, 1.0 );
}`,
  I4 = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;
function C4($, J, Z) {
  let Q = new r5(),
    W = new R0(),
    Y = new R0(),
    K = new i0(),
    X = new x7({ depthPacking: 3201 }),
    H = new v7(),
    q = {},
    U = Z.maxTextureSize,
    G = { [0]: 1, [1]: 0, [2]: 2 },
    E = new v6({
      defines: { VSM_SAMPLES: 8 },
      uniforms: {
        shadow_pass: { value: null },
        resolution: { value: new R0() },
        radius: { value: 4 },
      },
      vertexShader: z4,
      fragmentShader: I4,
    }),
    F = E.clone();
  F.defines.HORIZONTAL_PASS = 1;
  let O = new d6();
  O.setAttribute(
    "position",
    new L6(new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]), 3),
  );
  let _ = new u0(O, E),
    N = this;
  ((this.enabled = !1),
    (this.autoUpdate = !0),
    (this.needsUpdate = !1),
    (this.type = 1));
  let V = this.type;
  this.render = function (L, C, g) {
    if (N.enabled === !1) return;
    if (N.autoUpdate === !1 && N.needsUpdate === !1) return;
    if (L.length === 0) return;
    let d = $.getRenderTarget(),
      R = $.getActiveCubeFace(),
      w = $.getActiveMipmapLevel(),
      s = $.state;
    (s.setBlending(0),
      s.buffers.color.setClear(1, 1, 1, 1),
      s.buffers.depth.setTest(!0),
      s.setScissorTest(!1));
    let W0 = V !== 3 && this.type === 3,
      h = V === 3 && this.type !== 3;
    for (let y = 0, l = L.length; y < l; y++) {
      let r = L[y],
        c = r.shadow;
      if (c === void 0) {
        console.warn("THREE.WebGLShadowMap:", r, "has no shadow.");
        continue;
      }
      if (c.autoUpdate === !1 && c.needsUpdate === !1) continue;
      W.copy(c.mapSize);
      let u = c.getFrameExtents();
      if ((W.multiply(u), Y.copy(c.mapSize), W.x > U || W.y > U)) {
        if (W.x > U)
          ((Y.x = Math.floor(U / u.x)), (W.x = Y.x * u.x), (c.mapSize.x = Y.x));
        if (W.y > U)
          ((Y.y = Math.floor(U / u.y)), (W.y = Y.y * u.y), (c.mapSize.y = Y.y));
      }
      if (c.map === null || W0 === !0 || h === !0) {
        let T = this.type !== 3 ? { minFilter: 1003, magFilter: 1003 } : {};
        if (c.map !== null) c.map.dispose();
        ((c.map = new S6(W.x, W.y, T)),
          (c.map.texture.name = r.name + ".shadowMap"),
          c.camera.updateProjectionMatrix());
      }
      ($.setRenderTarget(c.map), $.clear());
      let i = c.getViewportCount();
      for (let T = 0; T < i; T++) {
        let n = c.getViewport(T);
        (K.set(Y.x * n.x, Y.y * n.y, Y.x * n.z, Y.y * n.w),
          s.viewport(K),
          c.updateMatrices(r, T),
          (Q = c.getFrustum()),
          A(C, g, c.camera, r, this.type));
      }
      if (c.isPointLightShadow !== !0 && this.type === 3) k(c, g);
      c.needsUpdate = !1;
    }
    ((V = this.type), (N.needsUpdate = !1), $.setRenderTarget(d, R, w));
  };
  function k(L, C) {
    let g = J.update(_);
    if (E.defines.VSM_SAMPLES !== L.blurSamples)
      ((E.defines.VSM_SAMPLES = L.blurSamples),
        (F.defines.VSM_SAMPLES = L.blurSamples),
        (E.needsUpdate = !0),
        (F.needsUpdate = !0));
    if (L.mapPass === null) L.mapPass = new S6(W.x, W.y);
    ((E.uniforms.shadow_pass.value = L.map.texture),
      (E.uniforms.resolution.value = L.mapSize),
      (E.uniforms.radius.value = L.radius),
      $.setRenderTarget(L.mapPass),
      $.clear(),
      $.renderBufferDirect(C, null, g, E, _, null),
      (F.uniforms.shadow_pass.value = L.mapPass.texture),
      (F.uniforms.resolution.value = L.mapSize),
      (F.uniforms.radius.value = L.radius),
      $.setRenderTarget(L.map),
      $.clear(),
      $.renderBufferDirect(C, null, g, F, _, null));
  }
  function M(L, C, g, d) {
    let R = null,
      w =
        g.isPointLight === !0
          ? L.customDistanceMaterial
          : L.customDepthMaterial;
    if (w !== void 0) R = w;
    else if (
      ((R = g.isPointLight === !0 ? H : X),
      ($.localClippingEnabled &&
        C.clipShadows === !0 &&
        Array.isArray(C.clippingPlanes) &&
        C.clippingPlanes.length !== 0) ||
        (C.displacementMap && C.displacementScale !== 0) ||
        (C.alphaMap && C.alphaTest > 0) ||
        (C.map && C.alphaTest > 0))
    ) {
      let s = R.uuid,
        W0 = C.uuid,
        h = q[s];
      if (h === void 0) ((h = {}), (q[s] = h));
      let y = h[W0];
      if (y === void 0) ((y = R.clone()), (h[W0] = y));
      R = y;
    }
    if (((R.visible = C.visible), (R.wireframe = C.wireframe), d === 3))
      R.side = C.shadowSide !== null ? C.shadowSide : C.side;
    else R.side = C.shadowSide !== null ? C.shadowSide : G[C.side];
    if (
      ((R.alphaMap = C.alphaMap),
      (R.alphaTest = C.alphaTest),
      (R.map = C.map),
      (R.clipShadows = C.clipShadows),
      (R.clippingPlanes = C.clippingPlanes),
      (R.clipIntersection = C.clipIntersection),
      (R.displacementMap = C.displacementMap),
      (R.displacementScale = C.displacementScale),
      (R.displacementBias = C.displacementBias),
      (R.wireframeLinewidth = C.wireframeLinewidth),
      (R.linewidth = C.linewidth),
      g.isPointLight === !0 && R.isMeshDistanceMaterial === !0)
    ) {
      let s = $.properties.get(R);
      s.light = g;
    }
    return R;
  }
  function A(L, C, g, d, R) {
    if (L.visible === !1) return;
    if (L.layers.test(C.layers) && (L.isMesh || L.isLine || L.isPoints)) {
      if (
        (L.castShadow || (L.receiveShadow && R === 3)) &&
        (!L.frustumCulled || Q.intersectsObject(L))
      ) {
        L.modelViewMatrix.multiplyMatrices(g.matrixWorldInverse, L.matrixWorld);
        let W0 = J.update(L),
          h = L.material;
        if (Array.isArray(h)) {
          let y = W0.groups;
          for (let l = 0, r = y.length; l < r; l++) {
            let c = y[l],
              u = h[c.materialIndex];
            if (u && u.visible) {
              let i = M(L, u, d, R);
              $.renderBufferDirect(g, null, W0, i, L, c);
            }
          }
        } else if (h.visible) {
          let y = M(L, h, d, R);
          $.renderBufferDirect(g, null, W0, y, L, null);
        }
      }
    }
    let s = L.children;
    for (let W0 = 0, h = s.length; W0 < h; W0++) A(s[W0], C, g, d, R);
  }
}
function M4($, J, Z) {
  let Q = Z.isWebGL2;
  function W() {
    let P = !1,
      K0 = new i0(),
      x = null,
      $0 = new i0(0, 0, 0, 0);
    return {
      setMask: function (H0) {
        if (x !== H0 && !P) ($.colorMask(H0, H0, H0, H0), (x = H0));
      },
      setLocked: function (H0) {
        P = H0;
      },
      setClear: function (H0, S0, m0, r0, n6) {
        if (n6 === !0) ((H0 *= r0), (S0 *= r0), (m0 *= r0));
        if ((K0.set(H0, S0, m0, r0), $0.equals(K0) === !1))
          ($.clearColor(H0, S0, m0, r0), $0.copy(K0));
      },
      reset: function () {
        ((P = !1), (x = null), $0.set(-1, 0, 0, 0));
      },
    };
  }
  function Y() {
    let P = !1,
      K0 = null,
      x = null,
      $0 = null;
    return {
      setTest: function (H0) {
        if (H0) e($.DEPTH_TEST);
        else z0($.DEPTH_TEST);
      },
      setMask: function (H0) {
        if (K0 !== H0 && !P) ($.depthMask(H0), (K0 = H0));
      },
      setFunc: function (H0) {
        if (x !== H0) {
          switch (H0) {
            case 0:
              $.depthFunc($.NEVER);
              break;
            case 1:
              $.depthFunc($.ALWAYS);
              break;
            case 2:
              $.depthFunc($.LESS);
              break;
            case 3:
              $.depthFunc($.LEQUAL);
              break;
            case 4:
              $.depthFunc($.EQUAL);
              break;
            case 5:
              $.depthFunc($.GEQUAL);
              break;
            case 6:
              $.depthFunc($.GREATER);
              break;
            case 7:
              $.depthFunc($.NOTEQUAL);
              break;
            default:
              $.depthFunc($.LEQUAL);
          }
          x = H0;
        }
      },
      setLocked: function (H0) {
        P = H0;
      },
      setClear: function (H0) {
        if ($0 !== H0) ($.clearDepth(H0), ($0 = H0));
      },
      reset: function () {
        ((P = !1), (K0 = null), (x = null), ($0 = null));
      },
    };
  }
  function K() {
    let P = !1,
      K0 = null,
      x = null,
      $0 = null,
      H0 = null,
      S0 = null,
      m0 = null,
      r0 = null,
      n6 = null;
    return {
      setTest: function (s0) {
        if (!P)
          if (s0) e($.STENCIL_TEST);
          else z0($.STENCIL_TEST);
      },
      setMask: function (s0) {
        if (K0 !== s0 && !P) ($.stencilMask(s0), (K0 = s0));
      },
      setFunc: function (s0, D6, h6) {
        if (x !== s0 || $0 !== D6 || H0 !== h6)
          ($.stencilFunc(s0, D6, h6), (x = s0), ($0 = D6), (H0 = h6));
      },
      setOp: function (s0, D6, h6) {
        if (S0 !== s0 || m0 !== D6 || r0 !== h6)
          ($.stencilOp(s0, D6, h6), (S0 = s0), (m0 = D6), (r0 = h6));
      },
      setLocked: function (s0) {
        P = s0;
      },
      setClear: function (s0) {
        if (n6 !== s0) ($.clearStencil(s0), (n6 = s0));
      },
      reset: function () {
        ((P = !1),
          (K0 = null),
          (x = null),
          ($0 = null),
          (H0 = null),
          (S0 = null),
          (m0 = null),
          (r0 = null),
          (n6 = null));
      },
    };
  }
  let X = new W(),
    H = new Y(),
    q = new K(),
    U = new WeakMap(),
    G = new WeakMap(),
    E = {},
    F = {},
    O = new WeakMap(),
    _ = [],
    N = null,
    V = !1,
    k = null,
    M = null,
    A = null,
    L = null,
    C = null,
    g = null,
    d = null,
    R = !1,
    w = null,
    s = null,
    W0 = null,
    h = null,
    y = null,
    l = $.getParameter($.MAX_COMBINED_TEXTURE_IMAGE_UNITS),
    r = !1,
    c = 0,
    u = $.getParameter($.VERSION);
  if (u.indexOf("WebGL") !== -1)
    ((c = parseFloat(/^WebGL (\d)/.exec(u)[1])), (r = c >= 1));
  else if (u.indexOf("OpenGL ES") !== -1)
    ((c = parseFloat(/^OpenGL ES (\d)/.exec(u)[1])), (r = c >= 2));
  let i = null,
    T = {},
    n = $.getParameter($.SCISSOR_BOX),
    J0 = $.getParameter($.VIEWPORT),
    E0 = new i0().fromArray(n),
    G0 = new i0().fromArray(J0);
  function V0(P, K0, x, $0) {
    let H0 = new Uint8Array(4),
      S0 = $.createTexture();
    ($.bindTexture(P, S0),
      $.texParameteri(P, $.TEXTURE_MIN_FILTER, $.NEAREST),
      $.texParameteri(P, $.TEXTURE_MAG_FILTER, $.NEAREST));
    for (let m0 = 0; m0 < x; m0++)
      if (Q && (P === $.TEXTURE_3D || P === $.TEXTURE_2D_ARRAY))
        $.texImage3D(K0, 0, $.RGBA, 1, 1, $0, 0, $.RGBA, $.UNSIGNED_BYTE, H0);
      else
        $.texImage2D(K0 + m0, 0, $.RGBA, 1, 1, 0, $.RGBA, $.UNSIGNED_BYTE, H0);
    return S0;
  }
  let v0 = {};
  if (
    ((v0[$.TEXTURE_2D] = V0($.TEXTURE_2D, $.TEXTURE_2D, 1)),
    (v0[$.TEXTURE_CUBE_MAP] = V0(
      $.TEXTURE_CUBE_MAP,
      $.TEXTURE_CUBE_MAP_POSITIVE_X,
      6,
    )),
    Q)
  )
    ((v0[$.TEXTURE_2D_ARRAY] = V0(
      $.TEXTURE_2D_ARRAY,
      $.TEXTURE_2D_ARRAY,
      1,
      1,
    )),
      (v0[$.TEXTURE_3D] = V0($.TEXTURE_3D, $.TEXTURE_3D, 1, 1)));
  (X.setClear(0, 0, 0, 1),
    H.setClear(1),
    q.setClear(0),
    e($.DEPTH_TEST),
    H.setFunc(3),
    n0(!1),
    P0(1),
    e($.CULL_FACE),
    O0(0));
  function e(P) {
    if (E[P] !== !0) ($.enable(P), (E[P] = !0));
  }
  function z0(P) {
    if (E[P] !== !1) ($.disable(P), (E[P] = !1));
  }
  function g0(P, K0) {
    if (F[P] !== K0) {
      if (($.bindFramebuffer(P, K0), (F[P] = K0), Q)) {
        if (P === $.DRAW_FRAMEBUFFER) F[$.FRAMEBUFFER] = K0;
        if (P === $.FRAMEBUFFER) F[$.DRAW_FRAMEBUFFER] = K0;
      }
      return !0;
    }
    return !1;
  }
  function Y6(P, K0) {
    let x = _,
      $0 = !1;
    if (P) {
      if (((x = O.get(K0)), x === void 0)) ((x = []), O.set(K0, x));
      if (P.isWebGLMultipleRenderTargets) {
        let H0 = P.texture;
        if (x.length !== H0.length || x[0] !== $.COLOR_ATTACHMENT0) {
          for (let S0 = 0, m0 = H0.length; S0 < m0; S0++)
            x[S0] = $.COLOR_ATTACHMENT0 + S0;
          ((x.length = H0.length), ($0 = !0));
        }
      } else if (x[0] !== $.COLOR_ATTACHMENT0)
        ((x[0] = $.COLOR_ATTACHMENT0), ($0 = !0));
    } else if (x[0] !== $.BACK) ((x[0] = $.BACK), ($0 = !0));
    if ($0)
      if (Z.isWebGL2) $.drawBuffers(x);
      else J.get("WEBGL_draw_buffers").drawBuffersWEBGL(x);
  }
  function f(P) {
    if (N !== P) return ($.useProgram(P), (N = P), !0);
    return !1;
  }
  let o0 = {
    [100]: $.FUNC_ADD,
    [101]: $.FUNC_SUBTRACT,
    [102]: $.FUNC_REVERSE_SUBTRACT,
  };
  if (Q) ((o0[103] = $.MIN), (o0[104] = $.MAX));
  else {
    let P = J.get("EXT_blend_minmax");
    if (P !== null) ((o0[103] = P.MIN_EXT), (o0[104] = P.MAX_EXT));
  }
  let b0 = {
    [200]: $.ZERO,
    [201]: $.ONE,
    [202]: $.SRC_COLOR,
    [204]: $.SRC_ALPHA,
    [210]: $.SRC_ALPHA_SATURATE,
    [208]: $.DST_COLOR,
    [206]: $.DST_ALPHA,
    [203]: $.ONE_MINUS_SRC_COLOR,
    [205]: $.ONE_MINUS_SRC_ALPHA,
    [209]: $.ONE_MINUS_DST_COLOR,
    [207]: $.ONE_MINUS_DST_ALPHA,
  };
  function O0(P, K0, x, $0, H0, S0, m0, r0) {
    if (P === 0) {
      if (V === !0) (z0($.BLEND), (V = !1));
      return;
    }
    if (V === !1) (e($.BLEND), (V = !0));
    if (P !== 5) {
      if (P !== k || r0 !== R) {
        if (M !== 100 || C !== 100)
          ($.blendEquation($.FUNC_ADD), (M = 100), (C = 100));
        if (r0)
          switch (P) {
            case 1:
              $.blendFuncSeparate(
                $.ONE,
                $.ONE_MINUS_SRC_ALPHA,
                $.ONE,
                $.ONE_MINUS_SRC_ALPHA,
              );
              break;
            case 2:
              $.blendFunc($.ONE, $.ONE);
              break;
            case 3:
              $.blendFuncSeparate($.ZERO, $.ONE_MINUS_SRC_COLOR, $.ZERO, $.ONE);
              break;
            case 4:
              $.blendFuncSeparate($.ZERO, $.SRC_COLOR, $.ZERO, $.SRC_ALPHA);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", P);
              break;
          }
        else
          switch (P) {
            case 1:
              $.blendFuncSeparate(
                $.SRC_ALPHA,
                $.ONE_MINUS_SRC_ALPHA,
                $.ONE,
                $.ONE_MINUS_SRC_ALPHA,
              );
              break;
            case 2:
              $.blendFunc($.SRC_ALPHA, $.ONE);
              break;
            case 3:
              $.blendFuncSeparate($.ZERO, $.ONE_MINUS_SRC_COLOR, $.ZERO, $.ONE);
              break;
            case 4:
              $.blendFunc($.ZERO, $.SRC_COLOR);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", P);
              break;
          }
        ((A = null), (L = null), (g = null), (d = null), (k = P), (R = r0));
      }
      return;
    }
    if (
      ((H0 = H0 || K0), (S0 = S0 || x), (m0 = m0 || $0), K0 !== M || H0 !== C)
    )
      ($.blendEquationSeparate(o0[K0], o0[H0]), (M = K0), (C = H0));
    if (x !== A || $0 !== L || S0 !== g || m0 !== d)
      ($.blendFuncSeparate(b0[x], b0[$0], b0[S0], b0[m0]),
        (A = x),
        (L = $0),
        (g = S0),
        (d = m0));
    ((k = P), (R = !1));
  }
  function C0(P, K0) {
    P.side === 2 ? z0($.CULL_FACE) : e($.CULL_FACE);
    let x = P.side === 1;
    if (K0) x = !x;
    (n0(x),
      P.blending === 1 && P.transparent === !1
        ? O0(0)
        : O0(
            P.blending,
            P.blendEquation,
            P.blendSrc,
            P.blendDst,
            P.blendEquationAlpha,
            P.blendSrcAlpha,
            P.blendDstAlpha,
            P.premultipliedAlpha,
          ),
      H.setFunc(P.depthFunc),
      H.setTest(P.depthTest),
      H.setMask(P.depthWrite),
      X.setMask(P.colorWrite));
    let $0 = P.stencilWrite;
    if ((q.setTest($0), $0))
      (q.setMask(P.stencilWriteMask),
        q.setFunc(P.stencilFunc, P.stencilRef, P.stencilFuncMask),
        q.setOp(P.stencilFail, P.stencilZFail, P.stencilZPass));
    (c0(P.polygonOffset, P.polygonOffsetFactor, P.polygonOffsetUnits),
      P.alphaToCoverage === !0
        ? e($.SAMPLE_ALPHA_TO_COVERAGE)
        : z0($.SAMPLE_ALPHA_TO_COVERAGE));
  }
  function n0(P) {
    if (w !== P) {
      if (P) $.frontFace($.CW);
      else $.frontFace($.CCW);
      w = P;
    }
  }
  function P0(P) {
    if (P !== 0) {
      if ((e($.CULL_FACE), P !== s))
        if (P === 1) $.cullFace($.BACK);
        else if (P === 2) $.cullFace($.FRONT);
        else $.cullFace($.FRONT_AND_BACK);
    } else z0($.CULL_FACE);
    s = P;
  }
  function y0(P) {
    if (P !== W0) {
      if (r) $.lineWidth(P);
      W0 = P;
    }
  }
  function c0(P, K0, x) {
    if (P) {
      if ((e($.POLYGON_OFFSET_FILL), h !== K0 || y !== x))
        ($.polygonOffset(K0, x), (h = K0), (y = x));
    } else z0($.POLYGON_OFFSET_FILL);
  }
  function p0(P) {
    if (P) e($.SCISSOR_TEST);
    else z0($.SCISSOR_TEST);
  }
  function q6(P) {
    if (P === void 0) P = $.TEXTURE0 + l - 1;
    if (i !== P) ($.activeTexture(P), (i = P));
  }
  function R6(P, K0, x) {
    if (x === void 0)
      if (i === null) x = $.TEXTURE0 + l - 1;
      else x = i;
    let $0 = T[x];
    if ($0 === void 0) (($0 = { type: void 0, texture: void 0 }), (T[x] = $0));
    if ($0.type !== P || $0.texture !== K0) {
      if (i !== x) ($.activeTexture(x), (i = x));
      ($.bindTexture(P, K0 || v0[P]), ($0.type = P), ($0.texture = K0));
    }
  }
  function B() {
    let P = T[i];
    if (P !== void 0 && P.type !== void 0)
      ($.bindTexture(P.type, null), (P.type = void 0), (P.texture = void 0));
  }
  function D() {
    try {
      $.compressedTexImage2D.apply($, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function v() {
    try {
      $.compressedTexImage3D.apply($, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function Z0() {
    try {
      $.texSubImage2D.apply($, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function a() {
    try {
      $.texSubImage3D.apply($, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function t() {
    try {
      $.compressedTexSubImage2D.apply($, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function _0() {
    try {
      $.compressedTexSubImage3D.apply($, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function Q0() {
    try {
      $.texStorage2D.apply($, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function z() {
    try {
      $.texStorage3D.apply($, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function o() {
    try {
      $.texImage2D.apply($, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function q0() {
    try {
      $.texImage3D.apply($, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function Y0(P) {
    if (E0.equals(P) === !1) ($.scissor(P.x, P.y, P.z, P.w), E0.copy(P));
  }
  function U0(P) {
    if (G0.equals(P) === !1) ($.viewport(P.x, P.y, P.z, P.w), G0.copy(P));
  }
  function N0(P, K0) {
    let x = G.get(K0);
    if (x === void 0) ((x = new WeakMap()), G.set(K0, x));
    let $0 = x.get(P);
    if ($0 === void 0)
      (($0 = $.getUniformBlockIndex(K0, P.name)), x.set(P, $0));
  }
  function w0(P, K0) {
    let $0 = G.get(K0).get(P);
    if (U.get(K0) !== $0)
      ($.uniformBlockBinding(K0, $0, P.__bindingPointIndex), U.set(K0, $0));
  }
  function T0() {
    if (
      ($.disable($.BLEND),
      $.disable($.CULL_FACE),
      $.disable($.DEPTH_TEST),
      $.disable($.POLYGON_OFFSET_FILL),
      $.disable($.SCISSOR_TEST),
      $.disable($.STENCIL_TEST),
      $.disable($.SAMPLE_ALPHA_TO_COVERAGE),
      $.blendEquation($.FUNC_ADD),
      $.blendFunc($.ONE, $.ZERO),
      $.blendFuncSeparate($.ONE, $.ZERO, $.ONE, $.ZERO),
      $.colorMask(!0, !0, !0, !0),
      $.clearColor(0, 0, 0, 0),
      $.depthMask(!0),
      $.depthFunc($.LESS),
      $.clearDepth(1),
      $.stencilMask(4294967295),
      $.stencilFunc($.ALWAYS, 0, 4294967295),
      $.stencilOp($.KEEP, $.KEEP, $.KEEP),
      $.clearStencil(0),
      $.cullFace($.BACK),
      $.frontFace($.CCW),
      $.polygonOffset(0, 0),
      $.activeTexture($.TEXTURE0),
      $.bindFramebuffer($.FRAMEBUFFER, null),
      Q === !0)
    )
      ($.bindFramebuffer($.DRAW_FRAMEBUFFER, null),
        $.bindFramebuffer($.READ_FRAMEBUFFER, null));
    ($.useProgram(null),
      $.lineWidth(1),
      $.scissor(0, 0, $.canvas.width, $.canvas.height),
      $.viewport(0, 0, $.canvas.width, $.canvas.height),
      (E = {}),
      (i = null),
      (T = {}),
      (F = {}),
      (O = new WeakMap()),
      (_ = []),
      (N = null),
      (V = !1),
      (k = null),
      (M = null),
      (A = null),
      (L = null),
      (C = null),
      (g = null),
      (d = null),
      (R = !1),
      (w = null),
      (s = null),
      (W0 = null),
      (h = null),
      (y = null),
      E0.set(0, 0, $.canvas.width, $.canvas.height),
      G0.set(0, 0, $.canvas.width, $.canvas.height),
      X.reset(),
      H.reset(),
      q.reset());
  }
  return {
    buffers: { color: X, depth: H, stencil: q },
    enable: e,
    disable: z0,
    bindFramebuffer: g0,
    drawBuffers: Y6,
    useProgram: f,
    setBlending: O0,
    setMaterial: C0,
    setFlipSided: n0,
    setCullFace: P0,
    setLineWidth: y0,
    setPolygonOffset: c0,
    setScissorTest: p0,
    activeTexture: q6,
    bindTexture: R6,
    unbindTexture: B,
    compressedTexImage2D: D,
    compressedTexImage3D: v,
    texImage2D: o,
    texImage3D: q0,
    updateUBOMapping: N0,
    uniformBlockBinding: w0,
    texStorage2D: Q0,
    texStorage3D: z,
    texSubImage2D: Z0,
    texSubImage3D: a,
    compressedTexSubImage2D: t,
    compressedTexSubImage3D: _0,
    scissor: Y0,
    viewport: U0,
    reset: T0,
  };
}
function k4($, J, Z, Q, W, Y, K) {
  let {
      isWebGL2: X,
      maxTextures: H,
      maxCubemapSize: q,
      maxTextureSize: U,
      maxSamples: G,
    } = W,
    E = J.has("WEBGL_multisampled_render_to_texture")
      ? J.get("WEBGL_multisampled_render_to_texture")
      : null,
    F =
      typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent),
    O = new WeakMap(),
    _,
    N = new WeakMap(),
    V = !1;
  try {
    V =
      typeof OffscreenCanvas < "u" &&
      new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch (B) {}
  function k(B, D) {
    return V ? new OffscreenCanvas(B, D) : d5("canvas");
  }
  function M(B, D, v, Z0) {
    let a = 1;
    if (B.width > Z0 || B.height > Z0) a = Z0 / Math.max(B.width, B.height);
    if (a < 1 || D === !0)
      if (
        (typeof HTMLImageElement < "u" && B instanceof HTMLImageElement) ||
        (typeof HTMLCanvasElement < "u" && B instanceof HTMLCanvasElement) ||
        (typeof ImageBitmap < "u" && B instanceof ImageBitmap)
      ) {
        let t = D ? l5 : Math.floor,
          _0 = t(a * B.width),
          Q0 = t(a * B.height);
        if (_ === void 0) _ = k(_0, Q0);
        let z = v ? k(_0, Q0) : _;
        return (
          (z.width = _0),
          (z.height = Q0),
          z.getContext("2d").drawImage(B, 0, 0, _0, Q0),
          console.warn(
            "THREE.WebGLRenderer: Texture has been resized from (" +
              B.width +
              "x" +
              B.height +
              ") to (" +
              _0 +
              "x" +
              Q0 +
              ").",
          ),
          z
        );
      } else {
        if ("data" in B)
          console.warn(
            "THREE.WebGLRenderer: Image in DataTexture is too big (" +
              B.width +
              "x" +
              B.height +
              ").",
          );
        return B;
      }
    return B;
  }
  function A(B) {
    return y8(B.width) && y8(B.height);
  }
  function L(B) {
    if (X) return !1;
    return (
      B.wrapS !== 1001 ||
      B.wrapT !== 1001 ||
      (B.minFilter !== 1003 && B.minFilter !== 1006)
    );
  }
  function C(B, D) {
    return (
      B.generateMipmaps && D && B.minFilter !== 1003 && B.minFilter !== 1006
    );
  }
  function g(B) {
    $.generateMipmap(B);
  }
  function d(B, D, v, Z0, a = !1) {
    if (X === !1) return D;
    if (B !== null) {
      if ($[B] !== void 0) return $[B];
      console.warn(
        "THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" +
          B +
          "'",
      );
    }
    let t = D;
    if (D === $.RED) {
      if (v === $.FLOAT) t = $.R32F;
      if (v === $.HALF_FLOAT) t = $.R16F;
      if (v === $.UNSIGNED_BYTE) t = $.R8;
    }
    if (D === $.RED_INTEGER) {
      if (v === $.UNSIGNED_BYTE) t = $.R8UI;
      if (v === $.UNSIGNED_SHORT) t = $.R16UI;
      if (v === $.UNSIGNED_INT) t = $.R32UI;
      if (v === $.BYTE) t = $.R8I;
      if (v === $.SHORT) t = $.R16I;
      if (v === $.INT) t = $.R32I;
    }
    if (D === $.RG) {
      if (v === $.FLOAT) t = $.RG32F;
      if (v === $.HALF_FLOAT) t = $.RG16F;
      if (v === $.UNSIGNED_BYTE) t = $.RG8;
    }
    if (D === $.RGBA) {
      if (v === $.FLOAT) t = $.RGBA32F;
      if (v === $.HALF_FLOAT) t = $.RGBA16F;
      if (v === $.UNSIGNED_BYTE)
        t = Z0 === "srgb" && a === !1 ? $.SRGB8_ALPHA8 : $.RGBA8;
      if (v === $.UNSIGNED_SHORT_4_4_4_4) t = $.RGBA4;
      if (v === $.UNSIGNED_SHORT_5_5_5_1) t = $.RGB5_A1;
    }
    if (
      t === $.R16F ||
      t === $.R32F ||
      t === $.RG16F ||
      t === $.RG32F ||
      t === $.RGBA16F ||
      t === $.RGBA32F
    )
      J.get("EXT_color_buffer_float");
    return t;
  }
  function R(B, D, v) {
    if (
      C(B, v) === !0 ||
      (B.isFramebufferTexture && B.minFilter !== 1003 && B.minFilter !== 1006)
    )
      return Math.log2(Math.max(D.width, D.height)) + 1;
    else if (B.mipmaps !== void 0 && B.mipmaps.length > 0)
      return B.mipmaps.length;
    else if (B.isCompressedTexture && Array.isArray(B.image))
      return D.mipmaps.length;
    else return 1;
  }
  function w(B) {
    if (B === 1003 || B === 1004 || B === 1005) return $.NEAREST;
    return $.LINEAR;
  }
  function s(B) {
    let D = B.target;
    if ((D.removeEventListener("dispose", s), h(D), D.isVideoTexture))
      O.delete(D);
  }
  function W0(B) {
    let D = B.target;
    (D.removeEventListener("dispose", W0), l(D));
  }
  function h(B) {
    let D = Q.get(B);
    if (D.__webglInit === void 0) return;
    let v = B.source,
      Z0 = N.get(v);
    if (Z0) {
      let a = Z0[D.__cacheKey];
      if ((a.usedTimes--, a.usedTimes === 0)) y(B);
      if (Object.keys(Z0).length === 0) N.delete(v);
    }
    Q.remove(B);
  }
  function y(B) {
    let D = Q.get(B);
    $.deleteTexture(D.__webglTexture);
    let v = B.source,
      Z0 = N.get(v);
    (delete Z0[D.__cacheKey], K.memory.textures--);
  }
  function l(B) {
    let D = B.texture,
      v = Q.get(B),
      Z0 = Q.get(D);
    if (Z0.__webglTexture !== void 0)
      ($.deleteTexture(Z0.__webglTexture), K.memory.textures--);
    if (B.depthTexture) B.depthTexture.dispose();
    if (B.isWebGLCubeRenderTarget)
      for (let a = 0; a < 6; a++) {
        if (Array.isArray(v.__webglFramebuffer[a]))
          for (let t = 0; t < v.__webglFramebuffer[a].length; t++)
            $.deleteFramebuffer(v.__webglFramebuffer[a][t]);
        else $.deleteFramebuffer(v.__webglFramebuffer[a]);
        if (v.__webglDepthbuffer) $.deleteRenderbuffer(v.__webglDepthbuffer[a]);
      }
    else {
      if (Array.isArray(v.__webglFramebuffer))
        for (let a = 0; a < v.__webglFramebuffer.length; a++)
          $.deleteFramebuffer(v.__webglFramebuffer[a]);
      else $.deleteFramebuffer(v.__webglFramebuffer);
      if (v.__webglDepthbuffer) $.deleteRenderbuffer(v.__webglDepthbuffer);
      if (v.__webglMultisampledFramebuffer)
        $.deleteFramebuffer(v.__webglMultisampledFramebuffer);
      if (v.__webglColorRenderbuffer) {
        for (let a = 0; a < v.__webglColorRenderbuffer.length; a++)
          if (v.__webglColorRenderbuffer[a])
            $.deleteRenderbuffer(v.__webglColorRenderbuffer[a]);
      }
      if (v.__webglDepthRenderbuffer)
        $.deleteRenderbuffer(v.__webglDepthRenderbuffer);
    }
    if (B.isWebGLMultipleRenderTargets)
      for (let a = 0, t = D.length; a < t; a++) {
        let _0 = Q.get(D[a]);
        if (_0.__webglTexture)
          ($.deleteTexture(_0.__webglTexture), K.memory.textures--);
        Q.remove(D[a]);
      }
    (Q.remove(D), Q.remove(B));
  }
  let r = 0;
  function c() {
    r = 0;
  }
  function u() {
    let B = r;
    if (B >= H)
      console.warn(
        "THREE.WebGLTextures: Trying to use " +
          B +
          " texture units while this GPU supports only " +
          H,
      );
    return ((r += 1), B);
  }
  function i(B) {
    let D = [];
    return (
      D.push(B.wrapS),
      D.push(B.wrapT),
      D.push(B.wrapR || 0),
      D.push(B.magFilter),
      D.push(B.minFilter),
      D.push(B.anisotropy),
      D.push(B.internalFormat),
      D.push(B.format),
      D.push(B.type),
      D.push(B.generateMipmaps),
      D.push(B.premultiplyAlpha),
      D.push(B.flipY),
      D.push(B.unpackAlignment),
      D.push(B.colorSpace),
      D.join()
    );
  }
  function T(B, D) {
    let v = Q.get(B);
    if (B.isVideoTexture) q6(B);
    if (
      B.isRenderTargetTexture === !1 &&
      B.version > 0 &&
      v.__version !== B.version
    ) {
      let Z0 = B.image;
      if (Z0 === null)
        console.warn(
          "THREE.WebGLRenderer: Texture marked for update but no image data found.",
        );
      else if (Z0.complete === !1)
        console.warn(
          "THREE.WebGLRenderer: Texture marked for update but image is incomplete",
        );
      else {
        g0(v, B, D);
        return;
      }
    }
    Z.bindTexture($.TEXTURE_2D, v.__webglTexture, $.TEXTURE0 + D);
  }
  function n(B, D) {
    let v = Q.get(B);
    if (B.version > 0 && v.__version !== B.version) {
      g0(v, B, D);
      return;
    }
    Z.bindTexture($.TEXTURE_2D_ARRAY, v.__webglTexture, $.TEXTURE0 + D);
  }
  function J0(B, D) {
    let v = Q.get(B);
    if (B.version > 0 && v.__version !== B.version) {
      g0(v, B, D);
      return;
    }
    Z.bindTexture($.TEXTURE_3D, v.__webglTexture, $.TEXTURE0 + D);
  }
  function E0(B, D) {
    let v = Q.get(B);
    if (B.version > 0 && v.__version !== B.version) {
      Y6(v, B, D);
      return;
    }
    Z.bindTexture($.TEXTURE_CUBE_MAP, v.__webglTexture, $.TEXTURE0 + D);
  }
  let G0 = {
      [1000]: $.REPEAT,
      [1001]: $.CLAMP_TO_EDGE,
      [1002]: $.MIRRORED_REPEAT,
    },
    V0 = {
      [1003]: $.NEAREST,
      [1004]: $.NEAREST_MIPMAP_NEAREST,
      [1005]: $.NEAREST_MIPMAP_LINEAR,
      [1006]: $.LINEAR,
      [1007]: $.LINEAR_MIPMAP_NEAREST,
      [1008]: $.LINEAR_MIPMAP_LINEAR,
    },
    v0 = {
      [512]: $.NEVER,
      [519]: $.ALWAYS,
      [513]: $.LESS,
      [515]: $.LEQUAL,
      [514]: $.EQUAL,
      [518]: $.GEQUAL,
      [516]: $.GREATER,
      [517]: $.NOTEQUAL,
    };
  function e(B, D, v) {
    if (v) {
      if (
        ($.texParameteri(B, $.TEXTURE_WRAP_S, G0[D.wrapS]),
        $.texParameteri(B, $.TEXTURE_WRAP_T, G0[D.wrapT]),
        B === $.TEXTURE_3D || B === $.TEXTURE_2D_ARRAY)
      )
        $.texParameteri(B, $.TEXTURE_WRAP_R, G0[D.wrapR]);
      ($.texParameteri(B, $.TEXTURE_MAG_FILTER, V0[D.magFilter]),
        $.texParameteri(B, $.TEXTURE_MIN_FILTER, V0[D.minFilter]));
    } else {
      if (
        ($.texParameteri(B, $.TEXTURE_WRAP_S, $.CLAMP_TO_EDGE),
        $.texParameteri(B, $.TEXTURE_WRAP_T, $.CLAMP_TO_EDGE),
        B === $.TEXTURE_3D || B === $.TEXTURE_2D_ARRAY)
      )
        $.texParameteri(B, $.TEXTURE_WRAP_R, $.CLAMP_TO_EDGE);
      if (D.wrapS !== 1001 || D.wrapT !== 1001)
        console.warn(
          "THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.",
        );
      if (
        ($.texParameteri(B, $.TEXTURE_MAG_FILTER, w(D.magFilter)),
        $.texParameteri(B, $.TEXTURE_MIN_FILTER, w(D.minFilter)),
        D.minFilter !== 1003 && D.minFilter !== 1006)
      )
        console.warn(
          "THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.",
        );
    }
    if (D.compareFunction)
      ($.texParameteri(B, $.TEXTURE_COMPARE_MODE, $.COMPARE_REF_TO_TEXTURE),
        $.texParameteri(B, $.TEXTURE_COMPARE_FUNC, v0[D.compareFunction]));
    if (J.has("EXT_texture_filter_anisotropic") === !0) {
      let Z0 = J.get("EXT_texture_filter_anisotropic");
      if (D.magFilter === 1003) return;
      if (D.minFilter !== 1005 && D.minFilter !== 1008) return;
      if (D.type === 1015 && J.has("OES_texture_float_linear") === !1) return;
      if (
        X === !1 &&
        D.type === 1016 &&
        J.has("OES_texture_half_float_linear") === !1
      )
        return;
      if (D.anisotropy > 1 || Q.get(D).__currentAnisotropy)
        ($.texParameterf(
          B,
          Z0.TEXTURE_MAX_ANISOTROPY_EXT,
          Math.min(D.anisotropy, W.getMaxAnisotropy()),
        ),
          (Q.get(D).__currentAnisotropy = D.anisotropy));
    }
  }
  function z0(B, D) {
    let v = !1;
    if (B.__webglInit === void 0)
      ((B.__webglInit = !0), D.addEventListener("dispose", s));
    let Z0 = D.source,
      a = N.get(Z0);
    if (a === void 0) ((a = {}), N.set(Z0, a));
    let t = i(D);
    if (t !== B.__cacheKey) {
      if (a[t] === void 0)
        ((a[t] = { texture: $.createTexture(), usedTimes: 0 }),
          K.memory.textures++,
          (v = !0));
      a[t].usedTimes++;
      let _0 = a[B.__cacheKey];
      if (_0 !== void 0) {
        if ((a[B.__cacheKey].usedTimes--, _0.usedTimes === 0)) y(D);
      }
      ((B.__cacheKey = t), (B.__webglTexture = a[t].texture));
    }
    return v;
  }
  function g0(B, D, v) {
    let Z0 = $.TEXTURE_2D;
    if (D.isDataArrayTexture || D.isCompressedArrayTexture)
      Z0 = $.TEXTURE_2D_ARRAY;
    if (D.isData3DTexture) Z0 = $.TEXTURE_3D;
    let a = z0(B, D),
      t = D.source;
    Z.bindTexture(Z0, B.__webglTexture, $.TEXTURE0 + v);
    let _0 = Q.get(t);
    if (t.version !== _0.__version || a === !0) {
      (Z.activeTexture($.TEXTURE0 + v),
        $.pixelStorei($.UNPACK_FLIP_Y_WEBGL, D.flipY),
        $.pixelStorei($.UNPACK_PREMULTIPLY_ALPHA_WEBGL, D.premultiplyAlpha),
        $.pixelStorei($.UNPACK_ALIGNMENT, D.unpackAlignment),
        $.pixelStorei($.UNPACK_COLORSPACE_CONVERSION_WEBGL, $.NONE));
      let Q0 = L(D) && A(D.image) === !1,
        z = M(D.image, Q0, !1, U);
      z = R6(D, z);
      let o = A(z) || X,
        q0 = Y.convert(D.format, D.colorSpace),
        Y0 = Y.convert(D.type),
        U0 = d(D.internalFormat, q0, Y0, D.colorSpace, D.isVideoTexture);
      e(Z0, D, o);
      let N0,
        w0 = D.mipmaps,
        T0 = X && D.isVideoTexture !== !0,
        P = _0.__version === void 0 || a === !0,
        K0 = R(D, z, o);
      if (D.isDepthTexture) {
        if (((U0 = $.DEPTH_COMPONENT), X))
          if (D.type === 1015) U0 = $.DEPTH_COMPONENT32F;
          else if (D.type === 1014) U0 = $.DEPTH_COMPONENT24;
          else if (D.type === 1020) U0 = $.DEPTH24_STENCIL8;
          else U0 = $.DEPTH_COMPONENT16;
        else if (D.type === 1015)
          console.error(
            "WebGLRenderer: Floating point depth texture requires WebGL2.",
          );
        if (D.format === 1026 && U0 === $.DEPTH_COMPONENT) {
          if (D.type !== 1012 && D.type !== 1014)
            (console.warn(
              "THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture.",
            ),
              (D.type = 1014),
              (Y0 = Y.convert(D.type)));
        }
        if (D.format === 1027 && U0 === $.DEPTH_COMPONENT) {
          if (((U0 = $.DEPTH_STENCIL), D.type !== 1020))
            (console.warn(
              "THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture.",
            ),
              (D.type = 1020),
              (Y0 = Y.convert(D.type)));
        }
        if (P)
          if (T0) Z.texStorage2D($.TEXTURE_2D, 1, U0, z.width, z.height);
          else
            Z.texImage2D(
              $.TEXTURE_2D,
              0,
              U0,
              z.width,
              z.height,
              0,
              q0,
              Y0,
              null,
            );
      } else if (D.isDataTexture)
        if (w0.length > 0 && o) {
          if (T0 && P)
            Z.texStorage2D($.TEXTURE_2D, K0, U0, w0[0].width, w0[0].height);
          for (let x = 0, $0 = w0.length; x < $0; x++)
            if (((N0 = w0[x]), T0))
              Z.texSubImage2D(
                $.TEXTURE_2D,
                x,
                0,
                0,
                N0.width,
                N0.height,
                q0,
                Y0,
                N0.data,
              );
            else
              Z.texImage2D(
                $.TEXTURE_2D,
                x,
                U0,
                N0.width,
                N0.height,
                0,
                q0,
                Y0,
                N0.data,
              );
          D.generateMipmaps = !1;
        } else if (T0) {
          if (P) Z.texStorage2D($.TEXTURE_2D, K0, U0, z.width, z.height);
          Z.texSubImage2D(
            $.TEXTURE_2D,
            0,
            0,
            0,
            z.width,
            z.height,
            q0,
            Y0,
            z.data,
          );
        } else
          Z.texImage2D(
            $.TEXTURE_2D,
            0,
            U0,
            z.width,
            z.height,
            0,
            q0,
            Y0,
            z.data,
          );
      else if (D.isCompressedTexture)
        if (D.isCompressedArrayTexture) {
          if (T0 && P)
            Z.texStorage3D(
              $.TEXTURE_2D_ARRAY,
              K0,
              U0,
              w0[0].width,
              w0[0].height,
              z.depth,
            );
          for (let x = 0, $0 = w0.length; x < $0; x++)
            if (((N0 = w0[x]), D.format !== 1023))
              if (q0 !== null)
                if (T0)
                  Z.compressedTexSubImage3D(
                    $.TEXTURE_2D_ARRAY,
                    x,
                    0,
                    0,
                    0,
                    N0.width,
                    N0.height,
                    z.depth,
                    q0,
                    N0.data,
                    0,
                    0,
                  );
                else
                  Z.compressedTexImage3D(
                    $.TEXTURE_2D_ARRAY,
                    x,
                    U0,
                    N0.width,
                    N0.height,
                    z.depth,
                    0,
                    N0.data,
                    0,
                    0,
                  );
              else
                console.warn(
                  "THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()",
                );
            else if (T0)
              Z.texSubImage3D(
                $.TEXTURE_2D_ARRAY,
                x,
                0,
                0,
                0,
                N0.width,
                N0.height,
                z.depth,
                q0,
                Y0,
                N0.data,
              );
            else
              Z.texImage3D(
                $.TEXTURE_2D_ARRAY,
                x,
                U0,
                N0.width,
                N0.height,
                z.depth,
                0,
                q0,
                Y0,
                N0.data,
              );
        } else {
          if (T0 && P)
            Z.texStorage2D($.TEXTURE_2D, K0, U0, w0[0].width, w0[0].height);
          for (let x = 0, $0 = w0.length; x < $0; x++)
            if (((N0 = w0[x]), D.format !== 1023))
              if (q0 !== null)
                if (T0)
                  Z.compressedTexSubImage2D(
                    $.TEXTURE_2D,
                    x,
                    0,
                    0,
                    N0.width,
                    N0.height,
                    q0,
                    N0.data,
                  );
                else
                  Z.compressedTexImage2D(
                    $.TEXTURE_2D,
                    x,
                    U0,
                    N0.width,
                    N0.height,
                    0,
                    N0.data,
                  );
              else
                console.warn(
                  "THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()",
                );
            else if (T0)
              Z.texSubImage2D(
                $.TEXTURE_2D,
                x,
                0,
                0,
                N0.width,
                N0.height,
                q0,
                Y0,
                N0.data,
              );
            else
              Z.texImage2D(
                $.TEXTURE_2D,
                x,
                U0,
                N0.width,
                N0.height,
                0,
                q0,
                Y0,
                N0.data,
              );
        }
      else if (D.isDataArrayTexture)
        if (T0) {
          if (P)
            Z.texStorage3D(
              $.TEXTURE_2D_ARRAY,
              K0,
              U0,
              z.width,
              z.height,
              z.depth,
            );
          Z.texSubImage3D(
            $.TEXTURE_2D_ARRAY,
            0,
            0,
            0,
            0,
            z.width,
            z.height,
            z.depth,
            q0,
            Y0,
            z.data,
          );
        } else
          Z.texImage3D(
            $.TEXTURE_2D_ARRAY,
            0,
            U0,
            z.width,
            z.height,
            z.depth,
            0,
            q0,
            Y0,
            z.data,
          );
      else if (D.isData3DTexture)
        if (T0) {
          if (P)
            Z.texStorage3D($.TEXTURE_3D, K0, U0, z.width, z.height, z.depth);
          Z.texSubImage3D(
            $.TEXTURE_3D,
            0,
            0,
            0,
            0,
            z.width,
            z.height,
            z.depth,
            q0,
            Y0,
            z.data,
          );
        } else
          Z.texImage3D(
            $.TEXTURE_3D,
            0,
            U0,
            z.width,
            z.height,
            z.depth,
            0,
            q0,
            Y0,
            z.data,
          );
      else if (D.isFramebufferTexture) {
        if (P)
          if (T0) Z.texStorage2D($.TEXTURE_2D, K0, U0, z.width, z.height);
          else {
            let { width: x, height: $0 } = z;
            for (let H0 = 0; H0 < K0; H0++)
              (Z.texImage2D($.TEXTURE_2D, H0, U0, x, $0, 0, q0, Y0, null),
                (x >>= 1),
                ($0 >>= 1));
          }
      } else if (w0.length > 0 && o) {
        if (T0 && P)
          Z.texStorage2D($.TEXTURE_2D, K0, U0, w0[0].width, w0[0].height);
        for (let x = 0, $0 = w0.length; x < $0; x++)
          if (((N0 = w0[x]), T0))
            Z.texSubImage2D($.TEXTURE_2D, x, 0, 0, q0, Y0, N0);
          else Z.texImage2D($.TEXTURE_2D, x, U0, q0, Y0, N0);
        D.generateMipmaps = !1;
      } else if (T0) {
        if (P) Z.texStorage2D($.TEXTURE_2D, K0, U0, z.width, z.height);
        Z.texSubImage2D($.TEXTURE_2D, 0, 0, 0, q0, Y0, z);
      } else Z.texImage2D($.TEXTURE_2D, 0, U0, q0, Y0, z);
      if (C(D, o)) g(Z0);
      if (((_0.__version = t.version), D.onUpdate)) D.onUpdate(D);
    }
    B.__version = D.version;
  }
  function Y6(B, D, v) {
    if (D.image.length !== 6) return;
    let Z0 = z0(B, D),
      a = D.source;
    Z.bindTexture($.TEXTURE_CUBE_MAP, B.__webglTexture, $.TEXTURE0 + v);
    let t = Q.get(a);
    if (a.version !== t.__version || Z0 === !0) {
      (Z.activeTexture($.TEXTURE0 + v),
        $.pixelStorei($.UNPACK_FLIP_Y_WEBGL, D.flipY),
        $.pixelStorei($.UNPACK_PREMULTIPLY_ALPHA_WEBGL, D.premultiplyAlpha),
        $.pixelStorei($.UNPACK_ALIGNMENT, D.unpackAlignment),
        $.pixelStorei($.UNPACK_COLORSPACE_CONVERSION_WEBGL, $.NONE));
      let _0 = D.isCompressedTexture || D.image[0].isCompressedTexture,
        Q0 = D.image[0] && D.image[0].isDataTexture,
        z = [];
      for (let x = 0; x < 6; x++) {
        if (!_0 && !Q0) z[x] = M(D.image[x], !1, !0, q);
        else z[x] = Q0 ? D.image[x].image : D.image[x];
        z[x] = R6(D, z[x]);
      }
      let o = z[0],
        q0 = A(o) || X,
        Y0 = Y.convert(D.format, D.colorSpace),
        U0 = Y.convert(D.type),
        N0 = d(D.internalFormat, Y0, U0, D.colorSpace),
        w0 = X && D.isVideoTexture !== !0,
        T0 = t.__version === void 0 || Z0 === !0,
        P = R(D, o, q0);
      e($.TEXTURE_CUBE_MAP, D, q0);
      let K0;
      if (_0) {
        if (w0 && T0)
          Z.texStorage2D($.TEXTURE_CUBE_MAP, P, N0, o.width, o.height);
        for (let x = 0; x < 6; x++) {
          K0 = z[x].mipmaps;
          for (let $0 = 0; $0 < K0.length; $0++) {
            let H0 = K0[$0];
            if (D.format !== 1023)
              if (Y0 !== null)
                if (w0)
                  Z.compressedTexSubImage2D(
                    $.TEXTURE_CUBE_MAP_POSITIVE_X + x,
                    $0,
                    0,
                    0,
                    H0.width,
                    H0.height,
                    Y0,
                    H0.data,
                  );
                else
                  Z.compressedTexImage2D(
                    $.TEXTURE_CUBE_MAP_POSITIVE_X + x,
                    $0,
                    N0,
                    H0.width,
                    H0.height,
                    0,
                    H0.data,
                  );
              else
                console.warn(
                  "THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()",
                );
            else if (w0)
              Z.texSubImage2D(
                $.TEXTURE_CUBE_MAP_POSITIVE_X + x,
                $0,
                0,
                0,
                H0.width,
                H0.height,
                Y0,
                U0,
                H0.data,
              );
            else
              Z.texImage2D(
                $.TEXTURE_CUBE_MAP_POSITIVE_X + x,
                $0,
                N0,
                H0.width,
                H0.height,
                0,
                Y0,
                U0,
                H0.data,
              );
          }
        }
      } else {
        if (((K0 = D.mipmaps), w0 && T0)) {
          if (K0.length > 0) P++;
          Z.texStorage2D($.TEXTURE_CUBE_MAP, P, N0, z[0].width, z[0].height);
        }
        for (let x = 0; x < 6; x++)
          if (Q0) {
            if (w0)
              Z.texSubImage2D(
                $.TEXTURE_CUBE_MAP_POSITIVE_X + x,
                0,
                0,
                0,
                z[x].width,
                z[x].height,
                Y0,
                U0,
                z[x].data,
              );
            else
              Z.texImage2D(
                $.TEXTURE_CUBE_MAP_POSITIVE_X + x,
                0,
                N0,
                z[x].width,
                z[x].height,
                0,
                Y0,
                U0,
                z[x].data,
              );
            for (let $0 = 0; $0 < K0.length; $0++) {
              let S0 = K0[$0].image[x].image;
              if (w0)
                Z.texSubImage2D(
                  $.TEXTURE_CUBE_MAP_POSITIVE_X + x,
                  $0 + 1,
                  0,
                  0,
                  S0.width,
                  S0.height,
                  Y0,
                  U0,
                  S0.data,
                );
              else
                Z.texImage2D(
                  $.TEXTURE_CUBE_MAP_POSITIVE_X + x,
                  $0 + 1,
                  N0,
                  S0.width,
                  S0.height,
                  0,
                  Y0,
                  U0,
                  S0.data,
                );
            }
          } else {
            if (w0)
              Z.texSubImage2D(
                $.TEXTURE_CUBE_MAP_POSITIVE_X + x,
                0,
                0,
                0,
                Y0,
                U0,
                z[x],
              );
            else
              Z.texImage2D(
                $.TEXTURE_CUBE_MAP_POSITIVE_X + x,
                0,
                N0,
                Y0,
                U0,
                z[x],
              );
            for (let $0 = 0; $0 < K0.length; $0++) {
              let H0 = K0[$0];
              if (w0)
                Z.texSubImage2D(
                  $.TEXTURE_CUBE_MAP_POSITIVE_X + x,
                  $0 + 1,
                  0,
                  0,
                  Y0,
                  U0,
                  H0.image[x],
                );
              else
                Z.texImage2D(
                  $.TEXTURE_CUBE_MAP_POSITIVE_X + x,
                  $0 + 1,
                  N0,
                  Y0,
                  U0,
                  H0.image[x],
                );
            }
          }
      }
      if (C(D, q0)) g($.TEXTURE_CUBE_MAP);
      if (((t.__version = a.version), D.onUpdate)) D.onUpdate(D);
    }
    B.__version = D.version;
  }
  function f(B, D, v, Z0, a, t) {
    let _0 = Y.convert(v.format, v.colorSpace),
      Q0 = Y.convert(v.type),
      z = d(v.internalFormat, _0, Q0, v.colorSpace);
    if (!Q.get(D).__hasExternalTextures) {
      let q0 = Math.max(1, D.width >> t),
        Y0 = Math.max(1, D.height >> t);
      if (a === $.TEXTURE_3D || a === $.TEXTURE_2D_ARRAY)
        Z.texImage3D(a, t, z, q0, Y0, D.depth, 0, _0, Q0, null);
      else Z.texImage2D(a, t, z, q0, Y0, 0, _0, Q0, null);
    }
    if ((Z.bindFramebuffer($.FRAMEBUFFER, B), p0(D)))
      E.framebufferTexture2DMultisampleEXT(
        $.FRAMEBUFFER,
        Z0,
        a,
        Q.get(v).__webglTexture,
        0,
        c0(D),
      );
    else if (
      a === $.TEXTURE_2D ||
      (a >= $.TEXTURE_CUBE_MAP_POSITIVE_X && a <= $.TEXTURE_CUBE_MAP_NEGATIVE_Z)
    )
      $.framebufferTexture2D($.FRAMEBUFFER, Z0, a, Q.get(v).__webglTexture, t);
    Z.bindFramebuffer($.FRAMEBUFFER, null);
  }
  function o0(B, D, v) {
    if (
      ($.bindRenderbuffer($.RENDERBUFFER, B), D.depthBuffer && !D.stencilBuffer)
    ) {
      let Z0 = $.DEPTH_COMPONENT16;
      if (v || p0(D)) {
        let a = D.depthTexture;
        if (a && a.isDepthTexture) {
          if (a.type === 1015) Z0 = $.DEPTH_COMPONENT32F;
          else if (a.type === 1014) Z0 = $.DEPTH_COMPONENT24;
        }
        let t = c0(D);
        if (p0(D))
          E.renderbufferStorageMultisampleEXT(
            $.RENDERBUFFER,
            t,
            Z0,
            D.width,
            D.height,
          );
        else
          $.renderbufferStorageMultisample(
            $.RENDERBUFFER,
            t,
            Z0,
            D.width,
            D.height,
          );
      } else $.renderbufferStorage($.RENDERBUFFER, Z0, D.width, D.height);
      $.framebufferRenderbuffer(
        $.FRAMEBUFFER,
        $.DEPTH_ATTACHMENT,
        $.RENDERBUFFER,
        B,
      );
    } else if (D.depthBuffer && D.stencilBuffer) {
      let Z0 = c0(D);
      if (v && p0(D) === !1)
        $.renderbufferStorageMultisample(
          $.RENDERBUFFER,
          Z0,
          $.DEPTH24_STENCIL8,
          D.width,
          D.height,
        );
      else if (p0(D))
        E.renderbufferStorageMultisampleEXT(
          $.RENDERBUFFER,
          Z0,
          $.DEPTH24_STENCIL8,
          D.width,
          D.height,
        );
      else
        $.renderbufferStorage(
          $.RENDERBUFFER,
          $.DEPTH_STENCIL,
          D.width,
          D.height,
        );
      $.framebufferRenderbuffer(
        $.FRAMEBUFFER,
        $.DEPTH_STENCIL_ATTACHMENT,
        $.RENDERBUFFER,
        B,
      );
    } else {
      let Z0 = D.isWebGLMultipleRenderTargets === !0 ? D.texture : [D.texture];
      for (let a = 0; a < Z0.length; a++) {
        let t = Z0[a],
          _0 = Y.convert(t.format, t.colorSpace),
          Q0 = Y.convert(t.type),
          z = d(t.internalFormat, _0, Q0, t.colorSpace),
          o = c0(D);
        if (v && p0(D) === !1)
          $.renderbufferStorageMultisample(
            $.RENDERBUFFER,
            o,
            z,
            D.width,
            D.height,
          );
        else if (p0(D))
          E.renderbufferStorageMultisampleEXT(
            $.RENDERBUFFER,
            o,
            z,
            D.width,
            D.height,
          );
        else $.renderbufferStorage($.RENDERBUFFER, z, D.width, D.height);
      }
    }
    $.bindRenderbuffer($.RENDERBUFFER, null);
  }
  function b0(B, D) {
    if (D && D.isWebGLCubeRenderTarget)
      throw Error("Depth Texture with cube render targets is not supported");
    if (
      (Z.bindFramebuffer($.FRAMEBUFFER, B),
      !(D.depthTexture && D.depthTexture.isDepthTexture))
    )
      throw Error(
        "renderTarget.depthTexture must be an instance of THREE.DepthTexture",
      );
    if (
      !Q.get(D.depthTexture).__webglTexture ||
      D.depthTexture.image.width !== D.width ||
      D.depthTexture.image.height !== D.height
    )
      ((D.depthTexture.image.width = D.width),
        (D.depthTexture.image.height = D.height),
        (D.depthTexture.needsUpdate = !0));
    T(D.depthTexture, 0);
    let Z0 = Q.get(D.depthTexture).__webglTexture,
      a = c0(D);
    if (D.depthTexture.format === 1026)
      if (p0(D))
        E.framebufferTexture2DMultisampleEXT(
          $.FRAMEBUFFER,
          $.DEPTH_ATTACHMENT,
          $.TEXTURE_2D,
          Z0,
          0,
          a,
        );
      else
        $.framebufferTexture2D(
          $.FRAMEBUFFER,
          $.DEPTH_ATTACHMENT,
          $.TEXTURE_2D,
          Z0,
          0,
        );
    else if (D.depthTexture.format === 1027)
      if (p0(D))
        E.framebufferTexture2DMultisampleEXT(
          $.FRAMEBUFFER,
          $.DEPTH_STENCIL_ATTACHMENT,
          $.TEXTURE_2D,
          Z0,
          0,
          a,
        );
      else
        $.framebufferTexture2D(
          $.FRAMEBUFFER,
          $.DEPTH_STENCIL_ATTACHMENT,
          $.TEXTURE_2D,
          Z0,
          0,
        );
    else throw Error("Unknown depthTexture format");
  }
  function O0(B) {
    let D = Q.get(B),
      v = B.isWebGLCubeRenderTarget === !0;
    if (B.depthTexture && !D.__autoAllocateDepthBuffer) {
      if (v)
        throw Error("target.depthTexture not supported in Cube render targets");
      b0(D.__webglFramebuffer, B);
    } else if (v) {
      D.__webglDepthbuffer = [];
      for (let Z0 = 0; Z0 < 6; Z0++)
        (Z.bindFramebuffer($.FRAMEBUFFER, D.__webglFramebuffer[Z0]),
          (D.__webglDepthbuffer[Z0] = $.createRenderbuffer()),
          o0(D.__webglDepthbuffer[Z0], B, !1));
    } else
      (Z.bindFramebuffer($.FRAMEBUFFER, D.__webglFramebuffer),
        (D.__webglDepthbuffer = $.createRenderbuffer()),
        o0(D.__webglDepthbuffer, B, !1));
    Z.bindFramebuffer($.FRAMEBUFFER, null);
  }
  function C0(B, D, v) {
    let Z0 = Q.get(B);
    if (D !== void 0)
      f(
        Z0.__webglFramebuffer,
        B,
        B.texture,
        $.COLOR_ATTACHMENT0,
        $.TEXTURE_2D,
        0,
      );
    if (v !== void 0) O0(B);
  }
  function n0(B) {
    let D = B.texture,
      v = Q.get(B),
      Z0 = Q.get(D);
    if (
      (B.addEventListener("dispose", W0), B.isWebGLMultipleRenderTargets !== !0)
    ) {
      if (Z0.__webglTexture === void 0) Z0.__webglTexture = $.createTexture();
      ((Z0.__version = D.version), K.memory.textures++);
    }
    let a = B.isWebGLCubeRenderTarget === !0,
      t = B.isWebGLMultipleRenderTargets === !0,
      _0 = A(B) || X;
    if (a) {
      v.__webglFramebuffer = [];
      for (let Q0 = 0; Q0 < 6; Q0++)
        if (X && D.mipmaps && D.mipmaps.length > 0) {
          v.__webglFramebuffer[Q0] = [];
          for (let z = 0; z < D.mipmaps.length; z++)
            v.__webglFramebuffer[Q0][z] = $.createFramebuffer();
        } else v.__webglFramebuffer[Q0] = $.createFramebuffer();
    } else {
      if (X && D.mipmaps && D.mipmaps.length > 0) {
        v.__webglFramebuffer = [];
        for (let Q0 = 0; Q0 < D.mipmaps.length; Q0++)
          v.__webglFramebuffer[Q0] = $.createFramebuffer();
      } else v.__webglFramebuffer = $.createFramebuffer();
      if (t)
        if (W.drawBuffers) {
          let Q0 = B.texture;
          for (let z = 0, o = Q0.length; z < o; z++) {
            let q0 = Q.get(Q0[z]);
            if (q0.__webglTexture === void 0)
              ((q0.__webglTexture = $.createTexture()), K.memory.textures++);
          }
        } else
          console.warn(
            "THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.",
          );
      if (X && B.samples > 0 && p0(B) === !1) {
        let Q0 = t ? D : [D];
        ((v.__webglMultisampledFramebuffer = $.createFramebuffer()),
          (v.__webglColorRenderbuffer = []),
          Z.bindFramebuffer($.FRAMEBUFFER, v.__webglMultisampledFramebuffer));
        for (let z = 0; z < Q0.length; z++) {
          let o = Q0[z];
          ((v.__webglColorRenderbuffer[z] = $.createRenderbuffer()),
            $.bindRenderbuffer($.RENDERBUFFER, v.__webglColorRenderbuffer[z]));
          let q0 = Y.convert(o.format, o.colorSpace),
            Y0 = Y.convert(o.type),
            U0 = d(
              o.internalFormat,
              q0,
              Y0,
              o.colorSpace,
              B.isXRRenderTarget === !0,
            ),
            N0 = c0(B);
          ($.renderbufferStorageMultisample(
            $.RENDERBUFFER,
            N0,
            U0,
            B.width,
            B.height,
          ),
            $.framebufferRenderbuffer(
              $.FRAMEBUFFER,
              $.COLOR_ATTACHMENT0 + z,
              $.RENDERBUFFER,
              v.__webglColorRenderbuffer[z],
            ));
        }
        if (($.bindRenderbuffer($.RENDERBUFFER, null), B.depthBuffer))
          ((v.__webglDepthRenderbuffer = $.createRenderbuffer()),
            o0(v.__webglDepthRenderbuffer, B, !0));
        Z.bindFramebuffer($.FRAMEBUFFER, null);
      }
    }
    if (a) {
      (Z.bindTexture($.TEXTURE_CUBE_MAP, Z0.__webglTexture),
        e($.TEXTURE_CUBE_MAP, D, _0));
      for (let Q0 = 0; Q0 < 6; Q0++)
        if (X && D.mipmaps && D.mipmaps.length > 0)
          for (let z = 0; z < D.mipmaps.length; z++)
            f(
              v.__webglFramebuffer[Q0][z],
              B,
              D,
              $.COLOR_ATTACHMENT0,
              $.TEXTURE_CUBE_MAP_POSITIVE_X + Q0,
              z,
            );
        else
          f(
            v.__webglFramebuffer[Q0],
            B,
            D,
            $.COLOR_ATTACHMENT0,
            $.TEXTURE_CUBE_MAP_POSITIVE_X + Q0,
            0,
          );
      if (C(D, _0)) g($.TEXTURE_CUBE_MAP);
      Z.unbindTexture();
    } else if (t) {
      let Q0 = B.texture;
      for (let z = 0, o = Q0.length; z < o; z++) {
        let q0 = Q0[z],
          Y0 = Q.get(q0);
        if (
          (Z.bindTexture($.TEXTURE_2D, Y0.__webglTexture),
          e($.TEXTURE_2D, q0, _0),
          f(
            v.__webglFramebuffer,
            B,
            q0,
            $.COLOR_ATTACHMENT0 + z,
            $.TEXTURE_2D,
            0,
          ),
          C(q0, _0))
        )
          g($.TEXTURE_2D);
      }
      Z.unbindTexture();
    } else {
      let Q0 = $.TEXTURE_2D;
      if (B.isWebGL3DRenderTarget || B.isWebGLArrayRenderTarget)
        if (X) Q0 = B.isWebGL3DRenderTarget ? $.TEXTURE_3D : $.TEXTURE_2D_ARRAY;
        else
          console.error(
            "THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.",
          );
      if (
        (Z.bindTexture(Q0, Z0.__webglTexture),
        e(Q0, D, _0),
        X && D.mipmaps && D.mipmaps.length > 0)
      )
        for (let z = 0; z < D.mipmaps.length; z++)
          f(v.__webglFramebuffer[z], B, D, $.COLOR_ATTACHMENT0, Q0, z);
      else f(v.__webglFramebuffer, B, D, $.COLOR_ATTACHMENT0, Q0, 0);
      if (C(D, _0)) g(Q0);
      Z.unbindTexture();
    }
    if (B.depthBuffer) O0(B);
  }
  function P0(B) {
    let D = A(B) || X,
      v = B.isWebGLMultipleRenderTargets === !0 ? B.texture : [B.texture];
    for (let Z0 = 0, a = v.length; Z0 < a; Z0++) {
      let t = v[Z0];
      if (C(t, D)) {
        let _0 = B.isWebGLCubeRenderTarget ? $.TEXTURE_CUBE_MAP : $.TEXTURE_2D,
          Q0 = Q.get(t).__webglTexture;
        (Z.bindTexture(_0, Q0), g(_0), Z.unbindTexture());
      }
    }
  }
  function y0(B) {
    if (X && B.samples > 0 && p0(B) === !1) {
      let D = B.isWebGLMultipleRenderTargets ? B.texture : [B.texture],
        v = B.width,
        Z0 = B.height,
        a = $.COLOR_BUFFER_BIT,
        t = [],
        _0 = B.stencilBuffer ? $.DEPTH_STENCIL_ATTACHMENT : $.DEPTH_ATTACHMENT,
        Q0 = Q.get(B),
        z = B.isWebGLMultipleRenderTargets === !0;
      if (z)
        for (let o = 0; o < D.length; o++)
          (Z.bindFramebuffer($.FRAMEBUFFER, Q0.__webglMultisampledFramebuffer),
            $.framebufferRenderbuffer(
              $.FRAMEBUFFER,
              $.COLOR_ATTACHMENT0 + o,
              $.RENDERBUFFER,
              null,
            ),
            Z.bindFramebuffer($.FRAMEBUFFER, Q0.__webglFramebuffer),
            $.framebufferTexture2D(
              $.DRAW_FRAMEBUFFER,
              $.COLOR_ATTACHMENT0 + o,
              $.TEXTURE_2D,
              null,
              0,
            ));
      (Z.bindFramebuffer($.READ_FRAMEBUFFER, Q0.__webglMultisampledFramebuffer),
        Z.bindFramebuffer($.DRAW_FRAMEBUFFER, Q0.__webglFramebuffer));
      for (let o = 0; o < D.length; o++) {
        if ((t.push($.COLOR_ATTACHMENT0 + o), B.depthBuffer)) t.push(_0);
        let q0 =
          Q0.__ignoreDepthValues !== void 0 ? Q0.__ignoreDepthValues : !1;
        if (q0 === !1) {
          if (B.depthBuffer) a |= $.DEPTH_BUFFER_BIT;
          if (B.stencilBuffer) a |= $.STENCIL_BUFFER_BIT;
        }
        if (z)
          $.framebufferRenderbuffer(
            $.READ_FRAMEBUFFER,
            $.COLOR_ATTACHMENT0,
            $.RENDERBUFFER,
            Q0.__webglColorRenderbuffer[o],
          );
        if (q0 === !0)
          ($.invalidateFramebuffer($.READ_FRAMEBUFFER, [_0]),
            $.invalidateFramebuffer($.DRAW_FRAMEBUFFER, [_0]));
        if (z) {
          let Y0 = Q.get(D[o]).__webglTexture;
          $.framebufferTexture2D(
            $.DRAW_FRAMEBUFFER,
            $.COLOR_ATTACHMENT0,
            $.TEXTURE_2D,
            Y0,
            0,
          );
        }
        if (($.blitFramebuffer(0, 0, v, Z0, 0, 0, v, Z0, a, $.NEAREST), F))
          $.invalidateFramebuffer($.READ_FRAMEBUFFER, t);
      }
      if (
        (Z.bindFramebuffer($.READ_FRAMEBUFFER, null),
        Z.bindFramebuffer($.DRAW_FRAMEBUFFER, null),
        z)
      )
        for (let o = 0; o < D.length; o++) {
          (Z.bindFramebuffer($.FRAMEBUFFER, Q0.__webglMultisampledFramebuffer),
            $.framebufferRenderbuffer(
              $.FRAMEBUFFER,
              $.COLOR_ATTACHMENT0 + o,
              $.RENDERBUFFER,
              Q0.__webglColorRenderbuffer[o],
            ));
          let q0 = Q.get(D[o]).__webglTexture;
          (Z.bindFramebuffer($.FRAMEBUFFER, Q0.__webglFramebuffer),
            $.framebufferTexture2D(
              $.DRAW_FRAMEBUFFER,
              $.COLOR_ATTACHMENT0 + o,
              $.TEXTURE_2D,
              q0,
              0,
            ));
        }
      Z.bindFramebuffer($.DRAW_FRAMEBUFFER, Q0.__webglMultisampledFramebuffer);
    }
  }
  function c0(B) {
    return Math.min(G, B.samples);
  }
  function p0(B) {
    let D = Q.get(B);
    return (
      X &&
      B.samples > 0 &&
      J.has("WEBGL_multisampled_render_to_texture") === !0 &&
      D.__useRenderToTexture !== !1
    );
  }
  function q6(B) {
    let D = K.render.frame;
    if (O.get(B) !== D) (O.set(B, D), B.update());
  }
  function R6(B, D) {
    let { colorSpace: v, format: Z0, type: a } = B;
    if (
      B.isCompressedTexture === !0 ||
      B.isVideoTexture === !0 ||
      B.format === 1035
    )
      return D;
    if (v !== "srgb-linear" && v !== "")
      if (v === "srgb" || v === "display-p3") {
        if (X === !1)
          if (J.has("EXT_sRGB") === !0 && Z0 === 1023)
            ((B.format = 1035), (B.minFilter = 1006), (B.generateMipmaps = !1));
          else D = m8.sRGBToLinear(D);
        else if (Z0 !== 1023 || a !== 1009)
          console.warn(
            "THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.",
          );
      } else
        console.error(
          "THREE.WebGLTextures: Unsupported texture color space:",
          v,
        );
    return D;
  }
  ((this.allocateTextureUnit = u),
    (this.resetTextureUnits = c),
    (this.setTexture2D = T),
    (this.setTexture2DArray = n),
    (this.setTexture3D = J0),
    (this.setTextureCube = E0),
    (this.rebindTextures = C0),
    (this.setupRenderTarget = n0),
    (this.updateRenderTargetMipmap = P0),
    (this.updateMultisampleRenderTarget = y0),
    (this.setupDepthRenderbuffer = O0),
    (this.setupFrameBufferTexture = f),
    (this.useMultisampledRTT = p0));
}
var B4 = 0,
  X6 = 1;
function w4($, J, Z) {
  let Q = Z.isWebGL2;
  function W(Y, K = "") {
    let X,
      H = K === "srgb" || K === "display-p3" ? X6 : B4;
    if (Y === 1009) return $.UNSIGNED_BYTE;
    if (Y === 1017) return $.UNSIGNED_SHORT_4_4_4_4;
    if (Y === 1018) return $.UNSIGNED_SHORT_5_5_5_1;
    if (Y === 1010) return $.BYTE;
    if (Y === 1011) return $.SHORT;
    if (Y === 1012) return $.UNSIGNED_SHORT;
    if (Y === 1013) return $.INT;
    if (Y === 1014) return $.UNSIGNED_INT;
    if (Y === 1015) return $.FLOAT;
    if (Y === 1016) {
      if (Q) return $.HALF_FLOAT;
      if (((X = J.get("OES_texture_half_float")), X !== null))
        return X.HALF_FLOAT_OES;
      else return null;
    }
    if (Y === 1021) return $.ALPHA;
    if (Y === 1023) return $.RGBA;
    if (Y === 1024) return $.LUMINANCE;
    if (Y === 1025) return $.LUMINANCE_ALPHA;
    if (Y === 1026) return $.DEPTH_COMPONENT;
    if (Y === 1027) return $.DEPTH_STENCIL;
    if (Y === 1035)
      if (((X = J.get("EXT_sRGB")), X !== null)) return X.SRGB_ALPHA_EXT;
      else return null;
    if (Y === 1028) return $.RED;
    if (Y === 1029) return $.RED_INTEGER;
    if (Y === 1030) return $.RG;
    if (Y === 1031) return $.RG_INTEGER;
    if (Y === 1033) return $.RGBA_INTEGER;
    if (Y === 33776 || Y === 33777 || Y === 33778 || Y === 33779)
      if (H === X6)
        if (((X = J.get("WEBGL_compressed_texture_s3tc_srgb")), X !== null)) {
          if (Y === 33776) return X.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (Y === 33777) return X.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (Y === 33778) return X.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (Y === 33779) return X.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else return null;
      else if (((X = J.get("WEBGL_compressed_texture_s3tc")), X !== null)) {
        if (Y === 33776) return X.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (Y === 33777) return X.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (Y === 33778) return X.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (Y === 33779) return X.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else return null;
    if (Y === 35840 || Y === 35841 || Y === 35842 || Y === 35843)
      if (((X = J.get("WEBGL_compressed_texture_pvrtc")), X !== null)) {
        if (Y === 35840) return X.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (Y === 35841) return X.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (Y === 35842) return X.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (Y === 35843) return X.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else return null;
    if (Y === 36196)
      if (((X = J.get("WEBGL_compressed_texture_etc1")), X !== null))
        return X.COMPRESSED_RGB_ETC1_WEBGL;
      else return null;
    if (Y === 37492 || Y === 37496)
      if (((X = J.get("WEBGL_compressed_texture_etc")), X !== null)) {
        if (Y === 37492)
          return H === X6 ? X.COMPRESSED_SRGB8_ETC2 : X.COMPRESSED_RGB8_ETC2;
        if (Y === 37496)
          return H === X6
            ? X.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC
            : X.COMPRESSED_RGBA8_ETC2_EAC;
      } else return null;
    if (
      Y === 37808 ||
      Y === 37809 ||
      Y === 37810 ||
      Y === 37811 ||
      Y === 37812 ||
      Y === 37813 ||
      Y === 37814 ||
      Y === 37815 ||
      Y === 37816 ||
      Y === 37817 ||
      Y === 37818 ||
      Y === 37819 ||
      Y === 37820 ||
      Y === 37821
    )
      if (((X = J.get("WEBGL_compressed_texture_astc")), X !== null)) {
        if (Y === 37808)
          return H === X6
            ? X.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR
            : X.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (Y === 37809)
          return H === X6
            ? X.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR
            : X.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (Y === 37810)
          return H === X6
            ? X.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR
            : X.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (Y === 37811)
          return H === X6
            ? X.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR
            : X.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (Y === 37812)
          return H === X6
            ? X.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR
            : X.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (Y === 37813)
          return H === X6
            ? X.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR
            : X.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (Y === 37814)
          return H === X6
            ? X.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR
            : X.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (Y === 37815)
          return H === X6
            ? X.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR
            : X.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (Y === 37816)
          return H === X6
            ? X.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR
            : X.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (Y === 37817)
          return H === X6
            ? X.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR
            : X.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (Y === 37818)
          return H === X6
            ? X.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR
            : X.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (Y === 37819)
          return H === X6
            ? X.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR
            : X.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (Y === 37820)
          return H === X6
            ? X.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR
            : X.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (Y === 37821)
          return H === X6
            ? X.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR
            : X.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else return null;
    if (Y === 36492 || Y === 36494 || Y === 36495)
      if (((X = J.get("EXT_texture_compression_bptc")), X !== null)) {
        if (Y === 36492)
          return H === X6
            ? X.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT
            : X.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (Y === 36494) return X.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (Y === 36495) return X.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else return null;
    if (Y === 36283 || Y === 36284 || Y === 36285 || Y === 36286)
      if (((X = J.get("EXT_texture_compression_rgtc")), X !== null)) {
        if (Y === 36492) return X.COMPRESSED_RED_RGTC1_EXT;
        if (Y === 36284) return X.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (Y === 36285) return X.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (Y === 36286) return X.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else return null;
    if (Y === 1020) {
      if (Q) return $.UNSIGNED_INT_24_8;
      if (((X = J.get("WEBGL_depth_texture")), X !== null))
        return X.UNSIGNED_INT_24_8_WEBGL;
      else return null;
    }
    return $[Y] !== void 0 ? $[Y] : null;
  }
  return { convert: W };
}
class h7 extends I6 {
  constructor($ = []) {
    super();
    ((this.isArrayCamera = !0), (this.cameras = $));
  }
}
class W6 extends E6 {
  constructor() {
    super();
    ((this.isGroup = !0), (this.type = "Group"));
  }
}
var L4 = { type: "move" };
class u5 {
  constructor() {
    ((this._targetRay = null), (this._grip = null), (this._hand = null));
  }
  getHandSpace() {
    if (this._hand === null)
      ((this._hand = new W6()),
        (this._hand.matrixAutoUpdate = !1),
        (this._hand.visible = !1),
        (this._hand.joints = {}),
        (this._hand.inputState = { pinching: !1 }));
    return this._hand;
  }
  getTargetRaySpace() {
    if (this._targetRay === null)
      ((this._targetRay = new W6()),
        (this._targetRay.matrixAutoUpdate = !1),
        (this._targetRay.visible = !1),
        (this._targetRay.hasLinearVelocity = !1),
        (this._targetRay.linearVelocity = new S()),
        (this._targetRay.hasAngularVelocity = !1),
        (this._targetRay.angularVelocity = new S()));
    return this._targetRay;
  }
  getGripSpace() {
    if (this._grip === null)
      ((this._grip = new W6()),
        (this._grip.matrixAutoUpdate = !1),
        (this._grip.visible = !1),
        (this._grip.hasLinearVelocity = !1),
        (this._grip.linearVelocity = new S()),
        (this._grip.hasAngularVelocity = !1),
        (this._grip.angularVelocity = new S()));
    return this._grip;
  }
  dispatchEvent($) {
    if (this._targetRay !== null) this._targetRay.dispatchEvent($);
    if (this._grip !== null) this._grip.dispatchEvent($);
    if (this._hand !== null) this._hand.dispatchEvent($);
    return this;
  }
  connect($) {
    if ($ && $.hand) {
      let J = this._hand;
      if (J) for (let Z of $.hand.values()) this._getHandJoint(J, Z);
    }
    return (this.dispatchEvent({ type: "connected", data: $ }), this);
  }
  disconnect($) {
    if (
      (this.dispatchEvent({ type: "disconnected", data: $ }),
      this._targetRay !== null)
    )
      this._targetRay.visible = !1;
    if (this._grip !== null) this._grip.visible = !1;
    if (this._hand !== null) this._hand.visible = !1;
    return this;
  }
  update($, J, Z) {
    let Q = null,
      W = null,
      Y = null,
      K = this._targetRay,
      X = this._grip,
      H = this._hand;
    if ($ && J.session.visibilityState !== "visible-blurred") {
      if (H && $.hand) {
        Y = !0;
        for (let O of $.hand.values()) {
          let _ = J.getJointPose(O, Z),
            N = this._getHandJoint(H, O);
          if (_ !== null)
            (N.matrix.fromArray(_.transform.matrix),
              N.matrix.decompose(N.position, N.rotation, N.scale),
              (N.matrixWorldNeedsUpdate = !0),
              (N.jointRadius = _.radius));
          N.visible = _ !== null;
        }
        let q = H.joints["index-finger-tip"],
          U = H.joints["thumb-tip"],
          G = q.position.distanceTo(U.position),
          E = 0.02,
          F = 0.005;
        if (H.inputState.pinching && G > E + F)
          ((H.inputState.pinching = !1),
            this.dispatchEvent({
              type: "pinchend",
              handedness: $.handedness,
              target: this,
            }));
        else if (!H.inputState.pinching && G <= E - F)
          ((H.inputState.pinching = !0),
            this.dispatchEvent({
              type: "pinchstart",
              handedness: $.handedness,
              target: this,
            }));
      } else if (X !== null && $.gripSpace) {
        if (((W = J.getPose($.gripSpace, Z)), W !== null)) {
          if (
            (X.matrix.fromArray(W.transform.matrix),
            X.matrix.decompose(X.position, X.rotation, X.scale),
            (X.matrixWorldNeedsUpdate = !0),
            W.linearVelocity)
          )
            ((X.hasLinearVelocity = !0),
              X.linearVelocity.copy(W.linearVelocity));
          else X.hasLinearVelocity = !1;
          if (W.angularVelocity)
            ((X.hasAngularVelocity = !0),
              X.angularVelocity.copy(W.angularVelocity));
          else X.hasAngularVelocity = !1;
        }
      }
      if (K !== null) {
        if (((Q = J.getPose($.targetRaySpace, Z)), Q === null && W !== null))
          Q = W;
        if (Q !== null) {
          if (
            (K.matrix.fromArray(Q.transform.matrix),
            K.matrix.decompose(K.position, K.rotation, K.scale),
            (K.matrixWorldNeedsUpdate = !0),
            Q.linearVelocity)
          )
            ((K.hasLinearVelocity = !0),
              K.linearVelocity.copy(Q.linearVelocity));
          else K.hasLinearVelocity = !1;
          if (Q.angularVelocity)
            ((K.hasAngularVelocity = !0),
              K.angularVelocity.copy(Q.angularVelocity));
          else K.hasAngularVelocity = !1;
          this.dispatchEvent(L4);
        }
      }
    }
    if (K !== null) K.visible = Q !== null;
    if (X !== null) X.visible = W !== null;
    if (H !== null) H.visible = Y !== null;
    return this;
  }
  _getHandJoint($, J) {
    if ($.joints[J.jointName] === void 0) {
      let Z = new W6();
      ((Z.matrixAutoUpdate = !1),
        (Z.visible = !1),
        ($.joints[J.jointName] = Z),
        $.add(Z));
    }
    return $.joints[J.jointName];
  }
}
class e5 extends U6 {
  constructor($, J, Z, Q, W, Y, K, X, H, q) {
    if (((q = q !== void 0 ? q : 1026), q !== 1026 && q !== 1027))
      throw Error(
        "DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat",
      );
    if (Z === void 0 && q === 1026) Z = 1014;
    if (Z === void 0 && q === 1027) Z = 1020;
    super(null, Q, W, Y, K, X, q, Z, H);
    ((this.isDepthTexture = !0),
      (this.image = { width: $, height: J }),
      (this.magFilter = K !== void 0 ? K : 1003),
      (this.minFilter = X !== void 0 ? X : 1003),
      (this.flipY = !1),
      (this.generateMipmaps = !1),
      (this.compareFunction = null));
  }
  copy($) {
    return (super.copy($), (this.compareFunction = $.compareFunction), this);
  }
  toJSON($) {
    let J = super.toJSON($);
    if (this.compareFunction !== null) J.compareFunction = this.compareFunction;
    return J;
  }
}
class g7 extends J$ {
  constructor($, J) {
    super();
    let Z = this,
      Q = null,
      W = 1,
      Y = null,
      K = "local-floor",
      X = 1,
      H = null,
      q = null,
      U = null,
      G = null,
      E = null,
      F = null,
      O = J.getContextAttributes(),
      _ = null,
      N = null,
      V = [],
      k = [],
      M = new I6();
    (M.layers.enable(1), (M.viewport = new i0()));
    let A = new I6();
    (A.layers.enable(2), (A.viewport = new i0()));
    let L = [M, A],
      C = new h7();
    (C.layers.enable(1), C.layers.enable(2));
    let g = null,
      d = null;
    ((this.cameraAutoUpdate = !0),
      (this.enabled = !1),
      (this.isPresenting = !1),
      (this.getController = function (T) {
        let n = V[T];
        if (n === void 0) ((n = new u5()), (V[T] = n));
        return n.getTargetRaySpace();
      }),
      (this.getControllerGrip = function (T) {
        let n = V[T];
        if (n === void 0) ((n = new u5()), (V[T] = n));
        return n.getGripSpace();
      }),
      (this.getHand = function (T) {
        let n = V[T];
        if (n === void 0) ((n = new u5()), (V[T] = n));
        return n.getHandSpace();
      }));
    function R(T) {
      let n = k.indexOf(T.inputSource);
      if (n === -1) return;
      let J0 = V[n];
      if (J0 !== void 0)
        (J0.update(T.inputSource, T.frame, H || Y),
          J0.dispatchEvent({ type: T.type, data: T.inputSource }));
    }
    function w() {
      (Q.removeEventListener("select", R),
        Q.removeEventListener("selectstart", R),
        Q.removeEventListener("selectend", R),
        Q.removeEventListener("squeeze", R),
        Q.removeEventListener("squeezestart", R),
        Q.removeEventListener("squeezeend", R),
        Q.removeEventListener("end", w),
        Q.removeEventListener("inputsourceschange", s));
      for (let T = 0; T < V.length; T++) {
        let n = k[T];
        if (n === null) continue;
        ((k[T] = null), V[T].disconnect(n));
      }
      ((g = null),
        (d = null),
        $.setRenderTarget(_),
        (E = null),
        (G = null),
        (U = null),
        (Q = null),
        (N = null),
        i.stop(),
        (Z.isPresenting = !1),
        Z.dispatchEvent({ type: "sessionend" }));
    }
    ((this.setFramebufferScaleFactor = function (T) {
      if (((W = T), Z.isPresenting === !0))
        console.warn(
          "THREE.WebXRManager: Cannot change framebuffer scale while presenting.",
        );
    }),
      (this.setReferenceSpaceType = function (T) {
        if (((K = T), Z.isPresenting === !0))
          console.warn(
            "THREE.WebXRManager: Cannot change reference space type while presenting.",
          );
      }),
      (this.getReferenceSpace = function () {
        return H || Y;
      }),
      (this.setReferenceSpace = function (T) {
        H = T;
      }),
      (this.getBaseLayer = function () {
        return G !== null ? G : E;
      }),
      (this.getBinding = function () {
        return U;
      }),
      (this.getFrame = function () {
        return F;
      }),
      (this.getSession = function () {
        return Q;
      }),
      (this.setSession = async function (T) {
        if (((Q = T), Q !== null)) {
          if (
            ((_ = $.getRenderTarget()),
            Q.addEventListener("select", R),
            Q.addEventListener("selectstart", R),
            Q.addEventListener("selectend", R),
            Q.addEventListener("squeeze", R),
            Q.addEventListener("squeezestart", R),
            Q.addEventListener("squeezeend", R),
            Q.addEventListener("end", w),
            Q.addEventListener("inputsourceschange", s),
            O.xrCompatible !== !0)
          )
            await J.makeXRCompatible();
          if (
            Q.renderState.layers === void 0 ||
            $.capabilities.isWebGL2 === !1
          ) {
            let n = {
              antialias: Q.renderState.layers === void 0 ? O.antialias : !0,
              alpha: !0,
              depth: O.depth,
              stencil: O.stencil,
              framebufferScaleFactor: W,
            };
            ((E = new XRWebGLLayer(Q, J, n)),
              Q.updateRenderState({ baseLayer: E }),
              (N = new S6(E.framebufferWidth, E.framebufferHeight, {
                format: 1023,
                type: 1009,
                colorSpace: $.outputColorSpace,
                stencilBuffer: O.stencil,
              })));
          } else {
            let n = null,
              J0 = null,
              E0 = null;
            if (O.depth)
              ((E0 = O.stencil ? J.DEPTH24_STENCIL8 : J.DEPTH_COMPONENT24),
                (n = O.stencil ? 1027 : 1026),
                (J0 = O.stencil ? 1020 : 1014));
            let G0 = { colorFormat: J.RGBA8, depthFormat: E0, scaleFactor: W };
            ((U = new XRWebGLBinding(Q, J)),
              (G = U.createProjectionLayer(G0)),
              Q.updateRenderState({ layers: [G] }),
              (N = new S6(G.textureWidth, G.textureHeight, {
                format: 1023,
                type: 1009,
                depthTexture: new e5(
                  G.textureWidth,
                  G.textureHeight,
                  J0,
                  void 0,
                  void 0,
                  void 0,
                  void 0,
                  void 0,
                  void 0,
                  n,
                ),
                stencilBuffer: O.stencil,
                colorSpace: $.outputColorSpace,
                samples: O.antialias ? 4 : 0,
              })));
            let V0 = $.properties.get(N);
            V0.__ignoreDepthValues = G.ignoreDepthValues;
          }
          ((N.isXRRenderTarget = !0),
            this.setFoveation(X),
            (H = null),
            (Y = await Q.requestReferenceSpace(K)),
            i.setContext(Q),
            i.start(),
            (Z.isPresenting = !0),
            Z.dispatchEvent({ type: "sessionstart" }));
        }
      }),
      (this.getEnvironmentBlendMode = function () {
        if (Q !== null) return Q.environmentBlendMode;
      }));
    function s(T) {
      for (let n = 0; n < T.removed.length; n++) {
        let J0 = T.removed[n],
          E0 = k.indexOf(J0);
        if (E0 >= 0) ((k[E0] = null), V[E0].disconnect(J0));
      }
      for (let n = 0; n < T.added.length; n++) {
        let J0 = T.added[n],
          E0 = k.indexOf(J0);
        if (E0 === -1) {
          for (let V0 = 0; V0 < V.length; V0++)
            if (V0 >= k.length) {
              (k.push(J0), (E0 = V0));
              break;
            } else if (k[V0] === null) {
              ((k[V0] = J0), (E0 = V0));
              break;
            }
          if (E0 === -1) break;
        }
        let G0 = V[E0];
        if (G0) G0.connect(J0);
      }
    }
    let W0 = new S(),
      h = new S();
    function y(T, n, J0) {
      (W0.setFromMatrixPosition(n.matrixWorld),
        h.setFromMatrixPosition(J0.matrixWorld));
      let E0 = W0.distanceTo(h),
        G0 = n.projectionMatrix.elements,
        V0 = J0.projectionMatrix.elements,
        v0 = G0[14] / (G0[10] - 1),
        e = G0[14] / (G0[10] + 1),
        z0 = (G0[9] + 1) / G0[5],
        g0 = (G0[9] - 1) / G0[5],
        Y6 = (G0[8] - 1) / G0[0],
        f = (V0[8] + 1) / V0[0],
        o0 = v0 * Y6,
        b0 = v0 * f,
        O0 = E0 / (-Y6 + f),
        C0 = O0 * -Y6;
      (n.matrixWorld.decompose(T.position, T.quaternion, T.scale),
        T.translateX(C0),
        T.translateZ(O0),
        T.matrixWorld.compose(T.position, T.quaternion, T.scale),
        T.matrixWorldInverse.copy(T.matrixWorld).invert());
      let n0 = v0 + O0,
        P0 = e + O0,
        y0 = o0 - C0,
        c0 = b0 + (E0 - C0),
        p0 = ((z0 * e) / P0) * n0,
        q6 = ((g0 * e) / P0) * n0;
      (T.projectionMatrix.makePerspective(y0, c0, p0, q6, n0, P0),
        T.projectionMatrixInverse.copy(T.projectionMatrix).invert());
    }
    function l(T, n) {
      if (n === null) T.matrixWorld.copy(T.matrix);
      else T.matrixWorld.multiplyMatrices(n.matrixWorld, T.matrix);
      T.matrixWorldInverse.copy(T.matrixWorld).invert();
    }
    this.updateCamera = function (T) {
      if (Q === null) return;
      if (
        ((C.near = A.near = M.near = T.near),
        (C.far = A.far = M.far = T.far),
        g !== C.near || d !== C.far)
      )
        (Q.updateRenderState({ depthNear: C.near, depthFar: C.far }),
          (g = C.near),
          (d = C.far));
      let n = T.parent,
        J0 = C.cameras;
      l(C, n);
      for (let E0 = 0; E0 < J0.length; E0++) l(J0[E0], n);
      if (J0.length === 2) y(C, M, A);
      else C.projectionMatrix.copy(M.projectionMatrix);
      r(T, C, n);
    };
    function r(T, n, J0) {
      if (J0 === null) T.matrix.copy(n.matrixWorld);
      else
        (T.matrix.copy(J0.matrixWorld),
          T.matrix.invert(),
          T.matrix.multiply(n.matrixWorld));
      if (
        (T.matrix.decompose(T.position, T.quaternion, T.scale),
        T.updateMatrixWorld(!0),
        T.projectionMatrix.copy(n.projectionMatrix),
        T.projectionMatrixInverse.copy(n.projectionMatrixInverse),
        T.isPerspectiveCamera)
      )
        ((T.fov = G5 * 2 * Math.atan(1 / T.projectionMatrix.elements[5])),
          (T.zoom = 1));
    }
    ((this.getCamera = function () {
      return C;
    }),
      (this.getFoveation = function () {
        if (G === null && E === null) return;
        return X;
      }),
      (this.setFoveation = function (T) {
        if (((X = T), G !== null)) G.fixedFoveation = T;
        if (E !== null && E.fixedFoveation !== void 0) E.fixedFoveation = T;
      }));
    let c = null;
    function u(T, n) {
      if (((q = n.getViewerPose(H || Y)), (F = n), q !== null)) {
        let J0 = q.views;
        if (E !== null)
          ($.setRenderTargetFramebuffer(N, E.framebuffer),
            $.setRenderTarget(N));
        let E0 = !1;
        if (J0.length !== C.cameras.length) ((C.cameras.length = 0), (E0 = !0));
        for (let G0 = 0; G0 < J0.length; G0++) {
          let V0 = J0[G0],
            v0 = null;
          if (E !== null) v0 = E.getViewport(V0);
          else {
            let z0 = U.getViewSubImage(G, V0);
            if (((v0 = z0.viewport), G0 === 0))
              ($.setRenderTargetTextures(
                N,
                z0.colorTexture,
                G.ignoreDepthValues ? void 0 : z0.depthStencilTexture,
              ),
                $.setRenderTarget(N));
          }
          let e = L[G0];
          if (e === void 0)
            ((e = new I6()),
              e.layers.enable(G0),
              (e.viewport = new i0()),
              (L[G0] = e));
          if (
            (e.matrix.fromArray(V0.transform.matrix),
            e.matrix.decompose(e.position, e.quaternion, e.scale),
            e.projectionMatrix.fromArray(V0.projectionMatrix),
            e.projectionMatrixInverse.copy(e.projectionMatrix).invert(),
            e.viewport.set(v0.x, v0.y, v0.width, v0.height),
            G0 === 0)
          )
            (C.matrix.copy(e.matrix),
              C.matrix.decompose(C.position, C.quaternion, C.scale));
          if (E0 === !0) C.cameras.push(e);
        }
      }
      for (let J0 = 0; J0 < V.length; J0++) {
        let E0 = k[J0],
          G0 = V[J0];
        if (E0 !== null && G0 !== void 0) G0.update(E0, n, H || Y);
      }
      if (c) c(T, n);
      if (n.detectedPlanes)
        Z.dispatchEvent({ type: "planesdetected", data: n });
      F = null;
    }
    let i = new w7();
    (i.setAnimationLoop(u),
      (this.setAnimationLoop = function (T) {
        c = T;
      }),
      (this.dispose = function () {}));
  }
}
function A4($, J) {
  function Z(N, V) {
    if (N.matrixAutoUpdate === !0) N.updateMatrix();
    V.value.copy(N.matrix);
  }
  function Q(N, V) {
    if ((V.color.getRGB(N.fogColor.value, M7($)), V.isFog))
      ((N.fogNear.value = V.near), (N.fogFar.value = V.far));
    else if (V.isFogExp2) N.fogDensity.value = V.density;
  }
  function W(N, V, k, M, A) {
    if (V.isMeshBasicMaterial) Y(N, V);
    else if (V.isMeshLambertMaterial) Y(N, V);
    else if (V.isMeshToonMaterial) (Y(N, V), G(N, V));
    else if (V.isMeshPhongMaterial) (Y(N, V), U(N, V));
    else if (V.isMeshStandardMaterial) {
      if ((Y(N, V), E(N, V), V.isMeshPhysicalMaterial)) F(N, V, A);
    } else if (V.isMeshMatcapMaterial) (Y(N, V), O(N, V));
    else if (V.isMeshDepthMaterial) Y(N, V);
    else if (V.isMeshDistanceMaterial) (Y(N, V), _(N, V));
    else if (V.isMeshNormalMaterial) Y(N, V);
    else if (V.isLineBasicMaterial) {
      if ((K(N, V), V.isLineDashedMaterial)) X(N, V);
    } else if (V.isPointsMaterial) H(N, V, k, M);
    else if (V.isSpriteMaterial) q(N, V);
    else if (V.isShadowMaterial)
      (N.color.value.copy(V.color), (N.opacity.value = V.opacity));
    else if (V.isShaderMaterial) V.uniformsNeedUpdate = !1;
  }
  function Y(N, V) {
    if (((N.opacity.value = V.opacity), V.color)) N.diffuse.value.copy(V.color);
    if (V.emissive)
      N.emissive.value.copy(V.emissive).multiplyScalar(V.emissiveIntensity);
    if (V.map) ((N.map.value = V.map), Z(V.map, N.mapTransform));
    if (V.alphaMap)
      ((N.alphaMap.value = V.alphaMap), Z(V.alphaMap, N.alphaMapTransform));
    if (V.bumpMap) {
      if (
        ((N.bumpMap.value = V.bumpMap),
        Z(V.bumpMap, N.bumpMapTransform),
        (N.bumpScale.value = V.bumpScale),
        V.side === 1)
      )
        N.bumpScale.value *= -1;
    }
    if (V.normalMap) {
      if (
        ((N.normalMap.value = V.normalMap),
        Z(V.normalMap, N.normalMapTransform),
        N.normalScale.value.copy(V.normalScale),
        V.side === 1)
      )
        N.normalScale.value.negate();
    }
    if (V.displacementMap)
      ((N.displacementMap.value = V.displacementMap),
        Z(V.displacementMap, N.displacementMapTransform),
        (N.displacementScale.value = V.displacementScale),
        (N.displacementBias.value = V.displacementBias));
    if (V.emissiveMap)
      ((N.emissiveMap.value = V.emissiveMap),
        Z(V.emissiveMap, N.emissiveMapTransform));
    if (V.specularMap)
      ((N.specularMap.value = V.specularMap),
        Z(V.specularMap, N.specularMapTransform));
    if (V.alphaTest > 0) N.alphaTest.value = V.alphaTest;
    let k = J.get(V).envMap;
    if (k)
      ((N.envMap.value = k),
        (N.flipEnvMap.value =
          k.isCubeTexture && k.isRenderTargetTexture === !1 ? -1 : 1),
        (N.reflectivity.value = V.reflectivity),
        (N.ior.value = V.ior),
        (N.refractionRatio.value = V.refractionRatio));
    if (V.lightMap) {
      N.lightMap.value = V.lightMap;
      let M = $._useLegacyLights === !0 ? Math.PI : 1;
      ((N.lightMapIntensity.value = V.lightMapIntensity * M),
        Z(V.lightMap, N.lightMapTransform));
    }
    if (V.aoMap)
      ((N.aoMap.value = V.aoMap),
        (N.aoMapIntensity.value = V.aoMapIntensity),
        Z(V.aoMap, N.aoMapTransform));
  }
  function K(N, V) {
    if ((N.diffuse.value.copy(V.color), (N.opacity.value = V.opacity), V.map))
      ((N.map.value = V.map), Z(V.map, N.mapTransform));
  }
  function X(N, V) {
    ((N.dashSize.value = V.dashSize),
      (N.totalSize.value = V.dashSize + V.gapSize),
      (N.scale.value = V.scale));
  }
  function H(N, V, k, M) {
    if (
      (N.diffuse.value.copy(V.color),
      (N.opacity.value = V.opacity),
      (N.size.value = V.size * k),
      (N.scale.value = M * 0.5),
      V.map)
    )
      ((N.map.value = V.map), Z(V.map, N.uvTransform));
    if (V.alphaMap)
      ((N.alphaMap.value = V.alphaMap), Z(V.alphaMap, N.alphaMapTransform));
    if (V.alphaTest > 0) N.alphaTest.value = V.alphaTest;
  }
  function q(N, V) {
    if (
      (N.diffuse.value.copy(V.color),
      (N.opacity.value = V.opacity),
      (N.rotation.value = V.rotation),
      V.map)
    )
      ((N.map.value = V.map), Z(V.map, N.mapTransform));
    if (V.alphaMap)
      ((N.alphaMap.value = V.alphaMap), Z(V.alphaMap, N.alphaMapTransform));
    if (V.alphaTest > 0) N.alphaTest.value = V.alphaTest;
  }
  function U(N, V) {
    (N.specular.value.copy(V.specular),
      (N.shininess.value = Math.max(V.shininess, 0.0001)));
  }
  function G(N, V) {
    if (V.gradientMap) N.gradientMap.value = V.gradientMap;
  }
  function E(N, V) {
    if (((N.metalness.value = V.metalness), V.metalnessMap))
      ((N.metalnessMap.value = V.metalnessMap),
        Z(V.metalnessMap, N.metalnessMapTransform));
    if (((N.roughness.value = V.roughness), V.roughnessMap))
      ((N.roughnessMap.value = V.roughnessMap),
        Z(V.roughnessMap, N.roughnessMapTransform));
    if (J.get(V).envMap) N.envMapIntensity.value = V.envMapIntensity;
  }
  function F(N, V, k) {
    if (((N.ior.value = V.ior), V.sheen > 0)) {
      if (
        (N.sheenColor.value.copy(V.sheenColor).multiplyScalar(V.sheen),
        (N.sheenRoughness.value = V.sheenRoughness),
        V.sheenColorMap)
      )
        ((N.sheenColorMap.value = V.sheenColorMap),
          Z(V.sheenColorMap, N.sheenColorMapTransform));
      if (V.sheenRoughnessMap)
        ((N.sheenRoughnessMap.value = V.sheenRoughnessMap),
          Z(V.sheenRoughnessMap, N.sheenRoughnessMapTransform));
    }
    if (V.clearcoat > 0) {
      if (
        ((N.clearcoat.value = V.clearcoat),
        (N.clearcoatRoughness.value = V.clearcoatRoughness),
        V.clearcoatMap)
      )
        ((N.clearcoatMap.value = V.clearcoatMap),
          Z(V.clearcoatMap, N.clearcoatMapTransform));
      if (V.clearcoatRoughnessMap)
        ((N.clearcoatRoughnessMap.value = V.clearcoatRoughnessMap),
          Z(V.clearcoatRoughnessMap, N.clearcoatRoughnessMapTransform));
      if (V.clearcoatNormalMap) {
        if (
          ((N.clearcoatNormalMap.value = V.clearcoatNormalMap),
          Z(V.clearcoatNormalMap, N.clearcoatNormalMapTransform),
          N.clearcoatNormalScale.value.copy(V.clearcoatNormalScale),
          V.side === 1)
        )
          N.clearcoatNormalScale.value.negate();
      }
    }
    if (V.iridescence > 0) {
      if (
        ((N.iridescence.value = V.iridescence),
        (N.iridescenceIOR.value = V.iridescenceIOR),
        (N.iridescenceThicknessMinimum.value = V.iridescenceThicknessRange[0]),
        (N.iridescenceThicknessMaximum.value = V.iridescenceThicknessRange[1]),
        V.iridescenceMap)
      )
        ((N.iridescenceMap.value = V.iridescenceMap),
          Z(V.iridescenceMap, N.iridescenceMapTransform));
      if (V.iridescenceThicknessMap)
        ((N.iridescenceThicknessMap.value = V.iridescenceThicknessMap),
          Z(V.iridescenceThicknessMap, N.iridescenceThicknessMapTransform));
    }
    if (V.transmission > 0) {
      if (
        ((N.transmission.value = V.transmission),
        (N.transmissionSamplerMap.value = k.texture),
        N.transmissionSamplerSize.value.set(k.width, k.height),
        V.transmissionMap)
      )
        ((N.transmissionMap.value = V.transmissionMap),
          Z(V.transmissionMap, N.transmissionMapTransform));
      if (((N.thickness.value = V.thickness), V.thicknessMap))
        ((N.thicknessMap.value = V.thicknessMap),
          Z(V.thicknessMap, N.thicknessMapTransform));
      ((N.attenuationDistance.value = V.attenuationDistance),
        N.attenuationColor.value.copy(V.attenuationColor));
    }
    if (V.anisotropy > 0) {
      if (
        (N.anisotropyVector.value.set(
          V.anisotropy * Math.cos(V.anisotropyRotation),
          V.anisotropy * Math.sin(V.anisotropyRotation),
        ),
        V.anisotropyMap)
      )
        ((N.anisotropyMap.value = V.anisotropyMap),
          Z(V.anisotropyMap, N.anisotropyMapTransform));
    }
    if (
      ((N.specularIntensity.value = V.specularIntensity),
      N.specularColor.value.copy(V.specularColor),
      V.specularColorMap)
    )
      ((N.specularColorMap.value = V.specularColorMap),
        Z(V.specularColorMap, N.specularColorMapTransform));
    if (V.specularIntensityMap)
      ((N.specularIntensityMap.value = V.specularIntensityMap),
        Z(V.specularIntensityMap, N.specularIntensityMapTransform));
  }
  function O(N, V) {
    if (V.matcap) N.matcap.value = V.matcap;
  }
  function _(N, V) {
    let k = J.get(V).light;
    (N.referencePosition.value.setFromMatrixPosition(k.matrixWorld),
      (N.nearDistance.value = k.shadow.camera.near),
      (N.farDistance.value = k.shadow.camera.far));
  }
  return { refreshFogUniforms: Q, refreshMaterialUniforms: W };
}
function P4($, J, Z, Q) {
  let W = {},
    Y = {},
    K = [],
    X = Z.isWebGL2 ? $.getParameter($.MAX_UNIFORM_BUFFER_BINDINGS) : 0;
  function H(k, M) {
    let A = M.program;
    Q.uniformBlockBinding(k, A);
  }
  function q(k, M) {
    let A = W[k.id];
    if (A === void 0)
      (O(k), (A = U(k)), (W[k.id] = A), k.addEventListener("dispose", N));
    let L = M.program;
    Q.updateUBOMapping(k, L);
    let C = J.render.frame;
    if (Y[k.id] !== C) (E(k), (Y[k.id] = C));
  }
  function U(k) {
    let M = G();
    k.__bindingPointIndex = M;
    let A = $.createBuffer(),
      L = k.__size,
      C = k.usage;
    return (
      $.bindBuffer($.UNIFORM_BUFFER, A),
      $.bufferData($.UNIFORM_BUFFER, L, C),
      $.bindBuffer($.UNIFORM_BUFFER, null),
      $.bindBufferBase($.UNIFORM_BUFFER, M, A),
      A
    );
  }
  function G() {
    for (let k = 0; k < X; k++) if (K.indexOf(k) === -1) return (K.push(k), k);
    return (
      console.error(
        "THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.",
      ),
      0
    );
  }
  function E(k) {
    let M = W[k.id],
      A = k.uniforms,
      L = k.__cache;
    $.bindBuffer($.UNIFORM_BUFFER, M);
    for (let C = 0, g = A.length; C < g; C++) {
      let d = A[C];
      if (F(d, C, L) === !0) {
        let R = d.__offset,
          w = Array.isArray(d.value) ? d.value : [d.value],
          s = 0;
        for (let W0 = 0; W0 < w.length; W0++) {
          let h = w[W0],
            y = _(h);
          if (typeof h === "number")
            ((d.__data[0] = h),
              $.bufferSubData($.UNIFORM_BUFFER, R + s, d.__data));
          else if (h.isMatrix3)
            ((d.__data[0] = h.elements[0]),
              (d.__data[1] = h.elements[1]),
              (d.__data[2] = h.elements[2]),
              (d.__data[3] = h.elements[0]),
              (d.__data[4] = h.elements[3]),
              (d.__data[5] = h.elements[4]),
              (d.__data[6] = h.elements[5]),
              (d.__data[7] = h.elements[0]),
              (d.__data[8] = h.elements[6]),
              (d.__data[9] = h.elements[7]),
              (d.__data[10] = h.elements[8]),
              (d.__data[11] = h.elements[0]));
          else
            (h.toArray(d.__data, s),
              (s += y.storage / Float32Array.BYTES_PER_ELEMENT));
        }
        $.bufferSubData($.UNIFORM_BUFFER, R, d.__data);
      }
    }
    $.bindBuffer($.UNIFORM_BUFFER, null);
  }
  function F(k, M, A) {
    let L = k.value;
    if (A[M] === void 0) {
      if (typeof L === "number") A[M] = L;
      else {
        let C = Array.isArray(L) ? L : [L],
          g = [];
        for (let d = 0; d < C.length; d++) g.push(C[d].clone());
        A[M] = g;
      }
      return !0;
    } else if (typeof L === "number") {
      if (A[M] !== L) return ((A[M] = L), !0);
    } else {
      let C = Array.isArray(A[M]) ? A[M] : [A[M]],
        g = Array.isArray(L) ? L : [L];
      for (let d = 0; d < C.length; d++) {
        let R = C[d];
        if (R.equals(g[d]) === !1) return (R.copy(g[d]), !0);
      }
    }
    return !1;
  }
  function O(k) {
    let M = k.uniforms,
      A = 0,
      L = 16,
      C = 0;
    for (let g = 0, d = M.length; g < d; g++) {
      let R = M[g],
        w = { boundary: 0, storage: 0 },
        s = Array.isArray(R.value) ? R.value : [R.value];
      for (let W0 = 0, h = s.length; W0 < h; W0++) {
        let y = s[W0],
          l = _(y);
        ((w.boundary += l.boundary), (w.storage += l.storage));
      }
      if (
        ((R.__data = new Float32Array(
          w.storage / Float32Array.BYTES_PER_ELEMENT,
        )),
        (R.__offset = A),
        g > 0)
      ) {
        C = A % L;
        let W0 = L - C;
        if (C !== 0 && W0 - w.boundary < 0) ((A += L - C), (R.__offset = A));
      }
      A += w.storage;
    }
    if (((C = A % L), C > 0)) A += L - C;
    return ((k.__size = A), (k.__cache = {}), this);
  }
  function _(k) {
    let M = { boundary: 0, storage: 0 };
    if (typeof k === "number") ((M.boundary = 4), (M.storage = 4));
    else if (k.isVector2) ((M.boundary = 8), (M.storage = 8));
    else if (k.isVector3 || k.isColor) ((M.boundary = 16), (M.storage = 12));
    else if (k.isVector4) ((M.boundary = 16), (M.storage = 16));
    else if (k.isMatrix3) ((M.boundary = 48), (M.storage = 48));
    else if (k.isMatrix4) ((M.boundary = 64), (M.storage = 64));
    else if (k.isTexture)
      console.warn(
        "THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.",
      );
    else
      console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", k);
    return M;
  }
  function N(k) {
    let M = k.target;
    M.removeEventListener("dispose", N);
    let A = K.indexOf(M.__bindingPointIndex);
    (K.splice(A, 1), $.deleteBuffer(W[M.id]), delete W[M.id], delete Y[M.id]);
  }
  function V() {
    for (let k in W) $.deleteBuffer(W[k]);
    ((K = []), (W = {}), (Y = {}));
  }
  return { bind: H, update: q, dispose: V };
}
class $8 {
  constructor($ = {}) {
    let {
      canvas: J = v9(),
      context: Z = null,
      depth: Q = !0,
      stencil: W = !0,
      alpha: Y = !1,
      antialias: K = !1,
      premultipliedAlpha: X = !0,
      preserveDrawingBuffer: H = !1,
      powerPreference: q = "default",
      failIfMajorPerformanceCaveat: U = !1,
    } = $;
    this.isWebGLRenderer = !0;
    let G;
    if (Z !== null) G = Z.getContextAttributes().alpha;
    else G = Y;
    let E = new Uint32Array(4),
      F = new Int32Array(4),
      O = null,
      _ = null,
      N = [],
      V = [];
    ((this.domElement = J),
      (this.debug = { checkShaderErrors: !0, onShaderError: null }),
      (this.autoClear = !0),
      (this.autoClearColor = !0),
      (this.autoClearDepth = !0),
      (this.autoClearStencil = !0),
      (this.sortObjects = !0),
      (this.clippingPlanes = []),
      (this.localClippingEnabled = !1),
      (this.outputColorSpace = "srgb"),
      (this._useLegacyLights = !1),
      (this.toneMapping = 0),
      (this.toneMappingExposure = 1));
    let k = this,
      M = !1,
      A = 0,
      L = 0,
      C = null,
      g = -1,
      d = null,
      R = new i0(),
      w = new i0(),
      s = null,
      W0 = new h0(0),
      h = 0,
      y = J.width,
      l = J.height,
      r = 1,
      c = null,
      u = null,
      i = new i0(0, 0, y, l),
      T = new i0(0, 0, y, l),
      n = !1,
      J0 = new r5(),
      E0 = !1,
      G0 = !1,
      V0 = null,
      v0 = new $6(),
      e = new R0(),
      z0 = new S(),
      g0 = {
        background: null,
        fog: null,
        environment: null,
        overrideMaterial: null,
        isScene: !0,
      };
    function Y6() {
      return C === null ? r : 1;
    }
    let f = Z;
    function o0(I, b) {
      for (let m = 0; m < I.length; m++) {
        let j = I[m],
          p = J.getContext(j, b);
        if (p !== null) return p;
      }
      return null;
    }
    try {
      let I = {
        alpha: !0,
        depth: Q,
        stencil: W,
        antialias: K,
        premultipliedAlpha: X,
        preserveDrawingBuffer: H,
        powerPreference: q,
        failIfMajorPerformanceCaveat: U,
      };
      if ("setAttribute" in J) J.setAttribute("data-engine", "three.js r156");
      if (
        (J.addEventListener("webglcontextlost", P, !1),
        J.addEventListener("webglcontextrestored", K0, !1),
        J.addEventListener("webglcontextcreationerror", x, !1),
        f === null)
      ) {
        let b = ["webgl2", "webgl", "experimental-webgl"];
        if (k.isWebGL1Renderer === !0) b.shift();
        if (((f = o0(b, I)), f === null))
          if (o0(b))
            throw Error(
              "Error creating WebGL context with your selected attributes.",
            );
          else throw Error("Error creating WebGL context.");
      }
      if (
        typeof WebGLRenderingContext < "u" &&
        f instanceof WebGLRenderingContext
      )
        console.warn(
          "THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163.",
        );
      if (f.getShaderPrecisionFormat === void 0)
        f.getShaderPrecisionFormat = function () {
          return { rangeMin: 1, rangeMax: 1, precision: 1 };
        };
    } catch (I) {
      throw (console.error("THREE.WebGLRenderer: " + I.message), I);
    }
    let b0,
      O0,
      C0,
      n0,
      P0,
      y0,
      c0,
      p0,
      q6,
      R6,
      B,
      D,
      v,
      Z0,
      a,
      t,
      _0,
      Q0,
      z,
      o,
      q0,
      Y0,
      U0,
      N0;
    function w0() {
      ((b0 = new oW(f)),
        (O0 = new lW(f, b0, $)),
        b0.init(O0),
        (Y0 = new w4(f, b0, O0)),
        (C0 = new M4(f, b0, O0)),
        (n0 = new tW(f)),
        (P0 = new U4()),
        (y0 = new k4(f, b0, C0, P0, O0, Y0, n0)),
        (c0 = new cW(k)),
        (p0 = new iW(k)),
        (q6 = new HZ(f, O0)),
        (U0 = new pW(f, b0, q6, O0)),
        (R6 = new rW(f, q6, n0, U0)),
        (B = new ZY(f, R6, q6, n0)),
        (z = new JY(f, O0, y0)),
        (t = new dW(P0)),
        (D = new G4(k, c0, p0, b0, O0, U0, t)),
        (v = new A4(k, P0)),
        (Z0 = new V4()),
        (a = new _4(b0, O0)),
        (Q0 = new mW(k, c0, p0, C0, B, G, X)),
        (_0 = new C4(k, B, O0)),
        (N0 = new P4(f, n0, O0, C0)),
        (o = new uW(f, b0, n0, O0)),
        (q0 = new aW(f, b0, n0, O0)),
        (n0.programs = D.programs),
        (k.capabilities = O0),
        (k.extensions = b0),
        (k.properties = P0),
        (k.renderLists = Z0),
        (k.shadowMap = _0),
        (k.state = C0),
        (k.info = n0));
    }
    w0();
    let T0 = new g7(k, f);
    ((this.xr = T0),
      (this.getContext = function () {
        return f;
      }),
      (this.getContextAttributes = function () {
        return f.getContextAttributes();
      }),
      (this.forceContextLoss = function () {
        let I = b0.get("WEBGL_lose_context");
        if (I) I.loseContext();
      }),
      (this.forceContextRestore = function () {
        let I = b0.get("WEBGL_lose_context");
        if (I) I.restoreContext();
      }),
      (this.getPixelRatio = function () {
        return r;
      }),
      (this.setPixelRatio = function (I) {
        if (I === void 0) return;
        ((r = I), this.setSize(y, l, !1));
      }),
      (this.getSize = function (I) {
        return I.set(y, l);
      }),
      (this.setSize = function (I, b, m = !0) {
        if (T0.isPresenting) {
          console.warn(
            "THREE.WebGLRenderer: Can't change size while VR device is presenting.",
          );
          return;
        }
        if (
          ((y = I),
          (l = b),
          (J.width = Math.floor(I * r)),
          (J.height = Math.floor(b * r)),
          m === !0)
        )
          ((J.style.width = I + "px"), (J.style.height = b + "px"));
        this.setViewport(0, 0, I, b);
      }),
      (this.getDrawingBufferSize = function (I) {
        return I.set(y * r, l * r).floor();
      }),
      (this.setDrawingBufferSize = function (I, b, m) {
        ((y = I),
          (l = b),
          (r = m),
          (J.width = Math.floor(I * m)),
          (J.height = Math.floor(b * m)),
          this.setViewport(0, 0, I, b));
      }),
      (this.getCurrentViewport = function (I) {
        return I.copy(R);
      }),
      (this.getViewport = function (I) {
        return I.copy(i);
      }),
      (this.setViewport = function (I, b, m, j) {
        if (I.isVector4) i.set(I.x, I.y, I.z, I.w);
        else i.set(I, b, m, j);
        C0.viewport(R.copy(i).multiplyScalar(r).floor());
      }),
      (this.getScissor = function (I) {
        return I.copy(T);
      }),
      (this.setScissor = function (I, b, m, j) {
        if (I.isVector4) T.set(I.x, I.y, I.z, I.w);
        else T.set(I, b, m, j);
        C0.scissor(w.copy(T).multiplyScalar(r).floor());
      }),
      (this.getScissorTest = function () {
        return n;
      }),
      (this.setScissorTest = function (I) {
        C0.setScissorTest((n = I));
      }),
      (this.setOpaqueSort = function (I) {
        c = I;
      }),
      (this.setTransparentSort = function (I) {
        u = I;
      }),
      (this.getClearColor = function (I) {
        return I.copy(Q0.getClearColor());
      }),
      (this.setClearColor = function () {
        Q0.setClearColor.apply(Q0, arguments);
      }),
      (this.getClearAlpha = function () {
        return Q0.getClearAlpha();
      }),
      (this.setClearAlpha = function () {
        Q0.setClearAlpha.apply(Q0, arguments);
      }),
      (this.clear = function (I = !0, b = !0, m = !0) {
        let j = 0;
        if (I) {
          let p = !1;
          if (C !== null) {
            let F0 = C.texture.format;
            p = F0 === 1033 || F0 === 1031 || F0 === 1029;
          }
          if (p) {
            let F0 = C.texture.type,
              I0 =
                F0 === 1009 ||
                F0 === 1014 ||
                F0 === 1012 ||
                F0 === 1020 ||
                F0 === 1017 ||
                F0 === 1018,
              k0 = Q0.getClearColor(),
              B0 = Q0.getClearAlpha(),
              j0 = k0.r,
              M0 = k0.g,
              L0 = k0.b;
            if (I0)
              ((E[0] = j0),
                (E[1] = M0),
                (E[2] = L0),
                (E[3] = B0),
                f.clearBufferuiv(f.COLOR, 0, E));
            else
              ((F[0] = j0),
                (F[1] = M0),
                (F[2] = L0),
                (F[3] = B0),
                f.clearBufferiv(f.COLOR, 0, F));
          } else j |= f.COLOR_BUFFER_BIT;
        }
        if (b) j |= f.DEPTH_BUFFER_BIT;
        if (m) j |= f.STENCIL_BUFFER_BIT;
        f.clear(j);
      }),
      (this.clearColor = function () {
        this.clear(!0, !1, !1);
      }),
      (this.clearDepth = function () {
        this.clear(!1, !0, !1);
      }),
      (this.clearStencil = function () {
        this.clear(!1, !1, !0);
      }),
      (this.dispose = function () {
        if (
          (J.removeEventListener("webglcontextlost", P, !1),
          J.removeEventListener("webglcontextrestored", K0, !1),
          J.removeEventListener("webglcontextcreationerror", x, !1),
          Z0.dispose(),
          a.dispose(),
          P0.dispose(),
          c0.dispose(),
          p0.dispose(),
          B.dispose(),
          U0.dispose(),
          N0.dispose(),
          D.dispose(),
          T0.dispose(),
          T0.removeEventListener("sessionstart", n6),
          T0.removeEventListener("sessionend", s0),
          V0)
        )
          (V0.dispose(), (V0 = null));
        D6.stop();
      }));
    function P(I) {
      (I.preventDefault(),
        console.log("THREE.WebGLRenderer: Context Lost."),
        (M = !0));
    }
    function K0() {
      (console.log("THREE.WebGLRenderer: Context Restored."), (M = !1));
      let I = n0.autoReset,
        b = _0.enabled,
        m = _0.autoUpdate,
        j = _0.needsUpdate,
        p = _0.type;
      (w0(),
        (n0.autoReset = I),
        (_0.enabled = b),
        (_0.autoUpdate = m),
        (_0.needsUpdate = j),
        (_0.type = p));
    }
    function x(I) {
      console.error(
        "THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",
        I.statusMessage,
      );
    }
    function $0(I) {
      let b = I.target;
      (b.removeEventListener("dispose", $0), H0(b));
    }
    function H0(I) {
      (S0(I), P0.remove(I));
    }
    function S0(I) {
      let b = P0.get(I).programs;
      if (b !== void 0) {
        if (
          (b.forEach(function (m) {
            D.releaseProgram(m);
          }),
          I.isShaderMaterial)
        )
          D.releaseShaderCache(I);
      }
    }
    ((this.renderBufferDirect = function (I, b, m, j, p, F0) {
      if (b === null) b = g0;
      let I0 = p.isMesh && p.matrixWorld.determinant() < 0,
        k0 = _9(I, b, m, j, p);
      C0.setMaterial(j, I0);
      let B0 = m.index,
        j0 = 1;
      if (j.wireframe === !0) {
        if (((B0 = R6.getWireframeAttribute(m)), B0 === void 0)) return;
        j0 = 2;
      }
      let M0 = m.drawRange,
        L0 = m.attributes.position,
        a0 = M0.start * j0,
        e0 = (M0.start + M0.count) * j0;
      if (F0 !== null)
        ((a0 = Math.max(a0, F0.start * j0)),
          (e0 = Math.min(e0, (F0.start + F0.count) * j0)));
      if (B0 !== null) ((a0 = Math.max(a0, 0)), (e0 = Math.min(e0, B0.count)));
      else if (L0 !== void 0 && L0 !== null)
        ((a0 = Math.max(a0, 0)), (e0 = Math.min(e0, L0.count)));
      let A6 = e0 - a0;
      if (A6 < 0 || A6 === 1 / 0) return;
      U0.setup(p, j, k0, m, B0);
      let s6,
        J6 = o;
      if (B0 !== null) ((s6 = q6.get(B0)), (J6 = q0), J6.setIndex(s6));
      if (p.isMesh)
        if (j.wireframe === !0)
          (C0.setLineWidth(j.wireframeLinewidth * Y6()), J6.setMode(f.LINES));
        else J6.setMode(f.TRIANGLES);
      else if (p.isLine) {
        let x0 = j.linewidth;
        if (x0 === void 0) x0 = 1;
        if ((C0.setLineWidth(x0 * Y6()), p.isLineSegments)) J6.setMode(f.LINES);
        else if (p.isLineLoop) J6.setMode(f.LINE_LOOP);
        else J6.setMode(f.LINE_STRIP);
      } else if (p.isPoints) J6.setMode(f.POINTS);
      else if (p.isSprite) J6.setMode(f.TRIANGLES);
      if (p.isInstancedMesh) J6.renderInstances(a0, A6, p.count);
      else if (m.isInstancedBufferGeometry) {
        let x0 = m._maxInstanceCount !== void 0 ? m._maxInstanceCount : 1 / 0,
          H8 = Math.min(m.instanceCount, x0);
        J6.renderInstances(a0, A6, H8);
      } else J6.render(a0, A6);
    }),
      (this.compile = function (I, b) {
        function m(j, p, F0) {
          if (j.transparent === !0 && j.side === 2 && j.forceSinglePass === !1)
            ((j.side = 1),
              (j.needsUpdate = !0),
              D5(j, p, F0),
              (j.side = 0),
              (j.needsUpdate = !0),
              D5(j, p, F0),
              (j.side = 2));
          else D5(j, p, F0);
        }
        ((_ = a.get(I)),
          _.init(),
          V.push(_),
          I.traverseVisible(function (j) {
            if (j.isLight && j.layers.test(b.layers)) {
              if ((_.pushLight(j), j.castShadow)) _.pushShadow(j);
            }
          }),
          _.setupLights(k._useLegacyLights),
          I.traverse(function (j) {
            let p = j.material;
            if (p)
              if (Array.isArray(p))
                for (let F0 = 0; F0 < p.length; F0++) {
                  let I0 = p[F0];
                  m(I0, I, j);
                }
              else m(p, I, j);
          }),
          V.pop(),
          (_ = null));
      }));
    let m0 = null;
    function r0(I) {
      if (m0) m0(I);
    }
    function n6() {
      D6.stop();
    }
    function s0() {
      D6.start();
    }
    let D6 = new w7();
    if ((D6.setAnimationLoop(r0), typeof self < "u")) D6.setContext(self);
    ((this.setAnimationLoop = function (I) {
      ((m0 = I), T0.setAnimationLoop(I), I === null ? D6.stop() : D6.start());
    }),
      T0.addEventListener("sessionstart", n6),
      T0.addEventListener("sessionend", s0),
      (this.render = function (I, b) {
        if (b !== void 0 && b.isCamera !== !0) {
          console.error(
            "THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.",
          );
          return;
        }
        if (M === !0) return;
        if (I.matrixWorldAutoUpdate === !0) I.updateMatrixWorld();
        if (b.parent === null && b.matrixWorldAutoUpdate === !0)
          b.updateMatrixWorld();
        if (T0.enabled === !0 && T0.isPresenting === !0) {
          if (T0.cameraAutoUpdate === !0) T0.updateCamera(b);
          b = T0.getCamera();
        }
        if (I.isScene === !0) I.onBeforeRender(k, I, b, C);
        if (
          ((_ = a.get(I, V.length)),
          _.init(),
          V.push(_),
          v0.multiplyMatrices(b.projectionMatrix, b.matrixWorldInverse),
          J0.setFromProjectionMatrix(v0),
          (G0 = this.localClippingEnabled),
          (E0 = t.init(this.clippingPlanes, G0)),
          (O = Z0.get(I, N.length)),
          O.init(),
          N.push(O),
          h6(I, b, 0, k.sortObjects),
          O.finish(),
          k.sortObjects === !0)
        )
          O.sort(c, u);
        if ((this.info.render.frame++, E0 === !0)) t.beginShadows();
        let m = _.state.shadowsArray;
        if ((_0.render(m, I, b), E0 === !0)) t.endShadows();
        if (this.info.autoReset === !0) this.info.reset();
        if (
          (Q0.render(O, I), _.setupLights(k._useLegacyLights), b.isArrayCamera)
        ) {
          let j = b.cameras;
          for (let p = 0, F0 = j.length; p < F0; p++) {
            let I0 = j[p];
            IJ(O, I, I0, I0.viewport);
          }
        } else IJ(O, I, b);
        if (C !== null)
          (y0.updateMultisampleRenderTarget(C), y0.updateRenderTargetMipmap(C));
        if (I.isScene === !0) I.onAfterRender(k, I, b);
        if (
          (U0.resetDefaultState(), (g = -1), (d = null), V.pop(), V.length > 0)
        )
          _ = V[V.length - 1];
        else _ = null;
        if ((N.pop(), N.length > 0)) O = N[N.length - 1];
        else O = null;
      }));
    function h6(I, b, m, j) {
      if (I.visible === !1) return;
      if (I.layers.test(b.layers)) {
        if (I.isGroup) m = I.renderOrder;
        else if (I.isLOD) {
          if (I.autoUpdate === !0) I.update(b);
        } else if (I.isLight) {
          if ((_.pushLight(I), I.castShadow)) _.pushShadow(I);
        } else if (I.isSprite) {
          if (!I.frustumCulled || J0.intersectsSprite(I)) {
            if (j) z0.setFromMatrixPosition(I.matrixWorld).applyMatrix4(v0);
            let I0 = B.update(I),
              k0 = I.material;
            if (k0.visible) O.push(I, I0, k0, m, z0.z, null);
          }
        } else if (I.isMesh || I.isLine || I.isPoints) {
          if (!I.frustumCulled || J0.intersectsObject(I)) {
            let I0 = B.update(I),
              k0 = I.material;
            if (j) {
              if (I.boundingSphere !== void 0) {
                if (I.boundingSphere === null) I.computeBoundingSphere();
                z0.copy(I.boundingSphere.center);
              } else {
                if (I0.boundingSphere === null) I0.computeBoundingSphere();
                z0.copy(I0.boundingSphere.center);
              }
              z0.applyMatrix4(I.matrixWorld).applyMatrix4(v0);
            }
            if (Array.isArray(k0)) {
              let B0 = I0.groups;
              for (let j0 = 0, M0 = B0.length; j0 < M0; j0++) {
                let L0 = B0[j0],
                  a0 = k0[L0.materialIndex];
                if (a0 && a0.visible) O.push(I, I0, a0, m, z0.z, L0);
              }
            } else if (k0.visible) O.push(I, I0, k0, m, z0.z, null);
          }
        }
      }
      let F0 = I.children;
      for (let I0 = 0, k0 = F0.length; I0 < k0; I0++) h6(F0[I0], b, m, j);
    }
    function IJ(I, b, m, j) {
      let { opaque: p, transmissive: F0, transparent: I0 } = I;
      if ((_.setupLightsView(m), E0 === !0))
        t.setGlobalState(k.clippingPlanes, m);
      if (F0.length > 0) O9(p, F0, b, m);
      if (j) C0.viewport(R.copy(j));
      if (p.length > 0) R5(p, b, m);
      if (F0.length > 0) R5(F0, b, m);
      if (I0.length > 0) R5(I0, b, m);
      (C0.buffers.depth.setTest(!0),
        C0.buffers.depth.setMask(!0),
        C0.buffers.color.setMask(!0),
        C0.setPolygonOffset(!1));
    }
    function O9(I, b, m, j) {
      let p = O0.isWebGL2;
      if (V0 === null)
        V0 = new S6(1, 1, {
          generateMipmaps: !0,
          type: b0.has("EXT_color_buffer_half_float") ? 1016 : 1009,
          minFilter: 1008,
          samples: p ? 4 : 0,
        });
      if ((k.getDrawingBufferSize(e), p)) V0.setSize(e.x, e.y);
      else V0.setSize(l5(e.x), l5(e.y));
      let F0 = k.getRenderTarget();
      if (
        (k.setRenderTarget(V0),
        k.getClearColor(W0),
        (h = k.getClearAlpha()),
        h < 1)
      )
        k.setClearColor(16777215, 0.5);
      k.clear();
      let I0 = k.toneMapping;
      ((k.toneMapping = 0),
        R5(I, m, j),
        y0.updateMultisampleRenderTarget(V0),
        y0.updateRenderTargetMipmap(V0));
      let k0 = !1;
      for (let B0 = 0, j0 = b.length; B0 < j0; B0++) {
        let M0 = b[B0],
          L0 = M0.object,
          a0 = M0.geometry,
          e0 = M0.material,
          A6 = M0.group;
        if (e0.side === 2 && L0.layers.test(j.layers)) {
          let s6 = e0.side;
          ((e0.side = 1),
            (e0.needsUpdate = !0),
            CJ(L0, m, j, a0, e0, A6),
            (e0.side = s6),
            (e0.needsUpdate = !0),
            (k0 = !0));
        }
      }
      if (k0 === !0)
        (y0.updateMultisampleRenderTarget(V0), y0.updateRenderTargetMipmap(V0));
      (k.setRenderTarget(F0), k.setClearColor(W0, h), (k.toneMapping = I0));
    }
    function R5(I, b, m) {
      let j = b.isScene === !0 ? b.overrideMaterial : null;
      for (let p = 0, F0 = I.length; p < F0; p++) {
        let I0 = I[p],
          k0 = I0.object,
          B0 = I0.geometry,
          j0 = j === null ? I0.material : j,
          M0 = I0.group;
        if (k0.layers.test(m.layers)) CJ(k0, b, m, B0, j0, M0);
      }
    }
    function CJ(I, b, m, j, p, F0) {
      if (
        (I.onBeforeRender(k, b, m, j, p, F0),
        I.modelViewMatrix.multiplyMatrices(m.matrixWorldInverse, I.matrixWorld),
        I.normalMatrix.getNormalMatrix(I.modelViewMatrix),
        p.onBeforeRender(k, b, m, j, I, F0),
        p.transparent === !0 && p.side === 2 && p.forceSinglePass === !1)
      )
        ((p.side = 1),
          (p.needsUpdate = !0),
          k.renderBufferDirect(m, b, j, p, I, F0),
          (p.side = 0),
          (p.needsUpdate = !0),
          k.renderBufferDirect(m, b, j, p, I, F0),
          (p.side = 2));
      else k.renderBufferDirect(m, b, j, p, I, F0);
      I.onAfterRender(k, b, m, j, p, F0);
    }
    function D5(I, b, m) {
      if (b.isScene !== !0) b = g0;
      let j = P0.get(I),
        p = _.state.lights,
        F0 = _.state.shadowsArray,
        I0 = p.state.version,
        k0 = D.getParameters(I, p.state, F0, b, m),
        B0 = D.getProgramCacheKey(k0),
        j0 = j.programs;
      if (
        ((j.environment = I.isMeshStandardMaterial ? b.environment : null),
        (j.fog = b.fog),
        (j.envMap = (I.isMeshStandardMaterial ? p0 : c0).get(
          I.envMap || j.environment,
        )),
        j0 === void 0)
      )
        (I.addEventListener("dispose", $0),
          (j0 = new Map()),
          (j.programs = j0));
      let M0 = j0.get(B0);
      if (M0 !== void 0) {
        if (j.currentProgram === M0 && j.lightsStateVersion === I0)
          return (MJ(I, k0), M0);
      } else
        ((k0.uniforms = D.getUniforms(I)),
          I.onBuild(m, k0, k),
          I.onBeforeCompile(k0, k),
          (M0 = D.acquireProgram(k0, B0)),
          j0.set(B0, M0),
          (j.uniforms = k0.uniforms));
      let L0 = j.uniforms;
      if ((!I.isShaderMaterial && !I.isRawShaderMaterial) || I.clipping === !0)
        L0.clippingPlanes = t.uniform;
      if (
        (MJ(I, k0),
        (j.needsLights = I9(I)),
        (j.lightsStateVersion = I0),
        j.needsLights)
      )
        ((L0.ambientLightColor.value = p.state.ambient),
          (L0.lightProbe.value = p.state.probe),
          (L0.directionalLights.value = p.state.directional),
          (L0.directionalLightShadows.value = p.state.directionalShadow),
          (L0.spotLights.value = p.state.spot),
          (L0.spotLightShadows.value = p.state.spotShadow),
          (L0.rectAreaLights.value = p.state.rectArea),
          (L0.ltc_1.value = p.state.rectAreaLTC1),
          (L0.ltc_2.value = p.state.rectAreaLTC2),
          (L0.pointLights.value = p.state.point),
          (L0.pointLightShadows.value = p.state.pointShadow),
          (L0.hemisphereLights.value = p.state.hemi),
          (L0.directionalShadowMap.value = p.state.directionalShadowMap),
          (L0.directionalShadowMatrix.value = p.state.directionalShadowMatrix),
          (L0.spotShadowMap.value = p.state.spotShadowMap),
          (L0.spotLightMatrix.value = p.state.spotLightMatrix),
          (L0.spotLightMap.value = p.state.spotLightMap),
          (L0.pointShadowMap.value = p.state.pointShadowMap),
          (L0.pointShadowMatrix.value = p.state.pointShadowMatrix));
      let a0 = M0.getUniforms(),
        e0 = q5.seqWithValue(a0.seq, L0);
      return ((j.currentProgram = M0), (j.uniformsList = e0), M0);
    }
    function MJ(I, b) {
      let m = P0.get(I);
      ((m.outputColorSpace = b.outputColorSpace),
        (m.instancing = b.instancing),
        (m.instancingColor = b.instancingColor),
        (m.skinning = b.skinning),
        (m.morphTargets = b.morphTargets),
        (m.morphNormals = b.morphNormals),
        (m.morphColors = b.morphColors),
        (m.morphTargetsCount = b.morphTargetsCount),
        (m.numClippingPlanes = b.numClippingPlanes),
        (m.numIntersection = b.numClipIntersection),
        (m.vertexAlphas = b.vertexAlphas),
        (m.vertexTangents = b.vertexTangents),
        (m.toneMapping = b.toneMapping));
    }
    function _9(I, b, m, j, p) {
      if (b.isScene !== !0) b = g0;
      y0.resetTextureUnits();
      let F0 = b.fog,
        I0 = j.isMeshStandardMaterial ? b.environment : null,
        k0 =
          C === null
            ? k.outputColorSpace
            : C.isXRRenderTarget === !0
              ? C.texture.colorSpace
              : "srgb-linear",
        B0 = (j.isMeshStandardMaterial ? p0 : c0).get(j.envMap || I0),
        j0 =
          j.vertexColors === !0 &&
          !!m.attributes.color &&
          m.attributes.color.itemSize === 4,
        M0 = !!m.attributes.tangent && (!!j.normalMap || j.anisotropy > 0),
        L0 = !!m.morphAttributes.position,
        a0 = !!m.morphAttributes.normal,
        e0 = !!m.morphAttributes.color,
        A6 = 0;
      if (j.toneMapped) {
        if (C === null || C.isXRRenderTarget === !0) A6 = k.toneMapping;
      }
      let s6 =
          m.morphAttributes.position ||
          m.morphAttributes.normal ||
          m.morphAttributes.color,
        J6 = s6 !== void 0 ? s6.length : 0,
        x0 = P0.get(j),
        H8 = _.state.lights;
      if (E0 === !0) {
        if (G0 === !0 || I !== d) {
          let M6 = I === d && j.id === g;
          t.setState(j, I, M6);
        }
      }
      let Z6 = !1;
      if (j.version === x0.__version) {
        if (x0.needsLights && x0.lightsStateVersion !== H8.state.version)
          Z6 = !0;
        else if (x0.outputColorSpace !== k0) Z6 = !0;
        else if (p.isInstancedMesh && x0.instancing === !1) Z6 = !0;
        else if (!p.isInstancedMesh && x0.instancing === !0) Z6 = !0;
        else if (p.isSkinnedMesh && x0.skinning === !1) Z6 = !0;
        else if (!p.isSkinnedMesh && x0.skinning === !0) Z6 = !0;
        else if (
          p.isInstancedMesh &&
          x0.instancingColor === !0 &&
          p.instanceColor === null
        )
          Z6 = !0;
        else if (
          p.isInstancedMesh &&
          x0.instancingColor === !1 &&
          p.instanceColor !== null
        )
          Z6 = !0;
        else if (x0.envMap !== B0) Z6 = !0;
        else if (j.fog === !0 && x0.fog !== F0) Z6 = !0;
        else if (
          x0.numClippingPlanes !== void 0 &&
          (x0.numClippingPlanes !== t.numPlanes ||
            x0.numIntersection !== t.numIntersection)
        )
          Z6 = !0;
        else if (x0.vertexAlphas !== j0) Z6 = !0;
        else if (x0.vertexTangents !== M0) Z6 = !0;
        else if (x0.morphTargets !== L0) Z6 = !0;
        else if (x0.morphNormals !== a0) Z6 = !0;
        else if (x0.morphColors !== e0) Z6 = !0;
        else if (x0.toneMapping !== A6) Z6 = !0;
        else if (O0.isWebGL2 === !0 && x0.morphTargetsCount !== J6) Z6 = !0;
      } else ((Z6 = !0), (x0.__version = j.version));
      let q$ = x0.currentProgram;
      if (Z6 === !0) q$ = D5(j, b, p);
      let kJ = !1,
        r$ = !1,
        q8 = !1,
        O6 = q$.getUniforms(),
        G$ = x0.uniforms;
      if (C0.useProgram(q$.program)) ((kJ = !0), (r$ = !0), (q8 = !0));
      if (j.id !== g) ((g = j.id), (r$ = !0));
      if (kJ || d !== I) {
        (O6.setValue(f, "projectionMatrix", I.projectionMatrix),
          O6.setValue(f, "viewMatrix", I.matrixWorldInverse));
        let M6 = O6.map.cameraPosition;
        if (M6 !== void 0)
          M6.setValue(f, z0.setFromMatrixPosition(I.matrixWorld));
        if (O0.logarithmicDepthBuffer)
          O6.setValue(f, "logDepthBufFC", 2 / (Math.log(I.far + 1) / Math.LN2));
        if (
          j.isMeshPhongMaterial ||
          j.isMeshToonMaterial ||
          j.isMeshLambertMaterial ||
          j.isMeshBasicMaterial ||
          j.isMeshStandardMaterial ||
          j.isShaderMaterial
        )
          O6.setValue(f, "isOrthographic", I.isOrthographicCamera === !0);
        if (d !== I) ((d = I), (r$ = !0), (q8 = !0));
      }
      if (p.isSkinnedMesh) {
        (O6.setOptional(f, p, "bindMatrix"),
          O6.setOptional(f, p, "bindMatrixInverse"));
        let M6 = p.skeleton;
        if (M6)
          if (O0.floatVertexTextures) {
            if (M6.boneTexture === null) M6.computeBoneTexture();
            (O6.setValue(f, "boneTexture", M6.boneTexture, y0),
              O6.setValue(f, "boneTextureSize", M6.boneTextureSize));
          } else
            console.warn(
              "THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required.",
            );
      }
      let G8 = m.morphAttributes;
      if (
        G8.position !== void 0 ||
        G8.normal !== void 0 ||
        (G8.color !== void 0 && O0.isWebGL2 === !0)
      )
        z.update(p, m, q$);
      if (r$ || x0.receiveShadow !== p.receiveShadow)
        ((x0.receiveShadow = p.receiveShadow),
          O6.setValue(f, "receiveShadow", p.receiveShadow));
      if (j.isMeshGouraudMaterial && j.envMap !== null)
        ((G$.envMap.value = B0),
          (G$.flipEnvMap.value =
            B0.isCubeTexture && B0.isRenderTargetTexture === !1 ? -1 : 1));
      if (r$) {
        if (
          (O6.setValue(f, "toneMappingExposure", k.toneMappingExposure),
          x0.needsLights)
        )
          z9(G$, q8);
        if (F0 && j.fog === !0) v.refreshFogUniforms(G$, F0);
        (v.refreshMaterialUniforms(G$, j, r, l, V0),
          q5.upload(f, x0.uniformsList, G$, y0));
      }
      if (j.isShaderMaterial && j.uniformsNeedUpdate === !0)
        (q5.upload(f, x0.uniformsList, G$, y0), (j.uniformsNeedUpdate = !1));
      if (j.isSpriteMaterial) O6.setValue(f, "center", p.center);
      if (
        (O6.setValue(f, "modelViewMatrix", p.modelViewMatrix),
        O6.setValue(f, "normalMatrix", p.normalMatrix),
        O6.setValue(f, "modelMatrix", p.matrixWorld),
        j.isShaderMaterial || j.isRawShaderMaterial)
      ) {
        let M6 = j.uniformsGroups;
        for (let U8 = 0, C9 = M6.length; U8 < C9; U8++)
          if (O0.isWebGL2) {
            let BJ = M6[U8];
            (N0.update(BJ, q$), N0.bind(BJ, q$));
          } else
            console.warn(
              "THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.",
            );
      }
      return q$;
    }
    function z9(I, b) {
      ((I.ambientLightColor.needsUpdate = b),
        (I.lightProbe.needsUpdate = b),
        (I.directionalLights.needsUpdate = b),
        (I.directionalLightShadows.needsUpdate = b),
        (I.pointLights.needsUpdate = b),
        (I.pointLightShadows.needsUpdate = b),
        (I.spotLights.needsUpdate = b),
        (I.spotLightShadows.needsUpdate = b),
        (I.rectAreaLights.needsUpdate = b),
        (I.hemisphereLights.needsUpdate = b));
    }
    function I9(I) {
      return (
        I.isMeshLambertMaterial ||
        I.isMeshToonMaterial ||
        I.isMeshPhongMaterial ||
        I.isMeshStandardMaterial ||
        I.isShadowMaterial ||
        (I.isShaderMaterial && I.lights === !0)
      );
    }
    if (
      ((this.getActiveCubeFace = function () {
        return A;
      }),
      (this.getActiveMipmapLevel = function () {
        return L;
      }),
      (this.getRenderTarget = function () {
        return C;
      }),
      (this.setRenderTargetTextures = function (I, b, m) {
        ((P0.get(I.texture).__webglTexture = b),
          (P0.get(I.depthTexture).__webglTexture = m));
        let j = P0.get(I);
        if (((j.__hasExternalTextures = !0), j.__hasExternalTextures)) {
          if (
            ((j.__autoAllocateDepthBuffer = m === void 0),
            !j.__autoAllocateDepthBuffer)
          ) {
            if (b0.has("WEBGL_multisampled_render_to_texture") === !0)
              (console.warn(
                "THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided",
              ),
                (j.__useRenderToTexture = !1));
          }
        }
      }),
      (this.setRenderTargetFramebuffer = function (I, b) {
        let m = P0.get(I);
        ((m.__webglFramebuffer = b),
          (m.__useDefaultFramebuffer = b === void 0));
      }),
      (this.setRenderTarget = function (I, b = 0, m = 0) {
        ((C = I), (A = b), (L = m));
        let j = !0,
          p = null,
          F0 = !1,
          I0 = !1;
        if (I) {
          let B0 = P0.get(I);
          if (B0.__useDefaultFramebuffer !== void 0)
            (C0.bindFramebuffer(f.FRAMEBUFFER, null), (j = !1));
          else if (B0.__webglFramebuffer === void 0) y0.setupRenderTarget(I);
          else if (B0.__hasExternalTextures)
            y0.rebindTextures(
              I,
              P0.get(I.texture).__webglTexture,
              P0.get(I.depthTexture).__webglTexture,
            );
          let j0 = I.texture;
          if (
            j0.isData3DTexture ||
            j0.isDataArrayTexture ||
            j0.isCompressedArrayTexture
          )
            I0 = !0;
          let M0 = P0.get(I).__webglFramebuffer;
          if (I.isWebGLCubeRenderTarget) {
            if (Array.isArray(M0[b])) p = M0[b][m];
            else p = M0[b];
            F0 = !0;
          } else if (
            O0.isWebGL2 &&
            I.samples > 0 &&
            y0.useMultisampledRTT(I) === !1
          )
            p = P0.get(I).__webglMultisampledFramebuffer;
          else if (Array.isArray(M0)) p = M0[m];
          else p = M0;
          (R.copy(I.viewport), w.copy(I.scissor), (s = I.scissorTest));
        } else
          (R.copy(i).multiplyScalar(r).floor(),
            w.copy(T).multiplyScalar(r).floor(),
            (s = n));
        if (C0.bindFramebuffer(f.FRAMEBUFFER, p) && O0.drawBuffers && j)
          C0.drawBuffers(I, p);
        if ((C0.viewport(R), C0.scissor(w), C0.setScissorTest(s), F0)) {
          let B0 = P0.get(I.texture);
          f.framebufferTexture2D(
            f.FRAMEBUFFER,
            f.COLOR_ATTACHMENT0,
            f.TEXTURE_CUBE_MAP_POSITIVE_X + b,
            B0.__webglTexture,
            m,
          );
        } else if (I0) {
          let B0 = P0.get(I.texture),
            j0 = b || 0;
          f.framebufferTextureLayer(
            f.FRAMEBUFFER,
            f.COLOR_ATTACHMENT0,
            B0.__webglTexture,
            m || 0,
            j0,
          );
        }
        g = -1;
      }),
      (this.readRenderTargetPixels = function (I, b, m, j, p, F0, I0) {
        if (!(I && I.isWebGLRenderTarget)) {
          console.error(
            "THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.",
          );
          return;
        }
        let k0 = P0.get(I).__webglFramebuffer;
        if (I.isWebGLCubeRenderTarget && I0 !== void 0) k0 = k0[I0];
        if (k0) {
          C0.bindFramebuffer(f.FRAMEBUFFER, k0);
          try {
            let B0 = I.texture,
              j0 = B0.format,
              M0 = B0.type;
            if (
              j0 !== 1023 &&
              Y0.convert(j0) !==
                f.getParameter(f.IMPLEMENTATION_COLOR_READ_FORMAT)
            ) {
              console.error(
                "THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.",
              );
              return;
            }
            let L0 =
              M0 === 1016 &&
              (b0.has("EXT_color_buffer_half_float") ||
                (O0.isWebGL2 && b0.has("EXT_color_buffer_float")));
            if (
              M0 !== 1009 &&
              Y0.convert(M0) !==
                f.getParameter(f.IMPLEMENTATION_COLOR_READ_TYPE) &&
              !(
                M0 === 1015 &&
                (O0.isWebGL2 ||
                  b0.has("OES_texture_float") ||
                  b0.has("WEBGL_color_buffer_float"))
              ) &&
              !L0
            ) {
              console.error(
                "THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.",
              );
              return;
            }
            if (b >= 0 && b <= I.width - j && m >= 0 && m <= I.height - p)
              f.readPixels(b, m, j, p, Y0.convert(j0), Y0.convert(M0), F0);
          } finally {
            let B0 = C !== null ? P0.get(C).__webglFramebuffer : null;
            C0.bindFramebuffer(f.FRAMEBUFFER, B0);
          }
        }
      }),
      (this.copyFramebufferToTexture = function (I, b, m = 0) {
        let j = Math.pow(2, -m),
          p = Math.floor(b.image.width * j),
          F0 = Math.floor(b.image.height * j);
        (y0.setTexture2D(b, 0),
          f.copyTexSubImage2D(f.TEXTURE_2D, m, 0, 0, I.x, I.y, p, F0),
          C0.unbindTexture());
      }),
      (this.copyTextureToTexture = function (I, b, m, j = 0) {
        let p = b.image.width,
          F0 = b.image.height,
          I0 = Y0.convert(m.format),
          k0 = Y0.convert(m.type);
        if (
          (y0.setTexture2D(m, 0),
          f.pixelStorei(f.UNPACK_FLIP_Y_WEBGL, m.flipY),
          f.pixelStorei(f.UNPACK_PREMULTIPLY_ALPHA_WEBGL, m.premultiplyAlpha),
          f.pixelStorei(f.UNPACK_ALIGNMENT, m.unpackAlignment),
          b.isDataTexture)
        )
          f.texSubImage2D(
            f.TEXTURE_2D,
            j,
            I.x,
            I.y,
            p,
            F0,
            I0,
            k0,
            b.image.data,
          );
        else if (b.isCompressedTexture)
          f.compressedTexSubImage2D(
            f.TEXTURE_2D,
            j,
            I.x,
            I.y,
            b.mipmaps[0].width,
            b.mipmaps[0].height,
            I0,
            b.mipmaps[0].data,
          );
        else f.texSubImage2D(f.TEXTURE_2D, j, I.x, I.y, I0, k0, b.image);
        if (j === 0 && m.generateMipmaps) f.generateMipmap(f.TEXTURE_2D);
        C0.unbindTexture();
      }),
      (this.copyTextureToTexture3D = function (I, b, m, j, p = 0) {
        if (k.isWebGL1Renderer) {
          console.warn(
            "THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.",
          );
          return;
        }
        let F0 = I.max.x - I.min.x + 1,
          I0 = I.max.y - I.min.y + 1,
          k0 = I.max.z - I.min.z + 1,
          B0 = Y0.convert(j.format),
          j0 = Y0.convert(j.type),
          M0;
        if (j.isData3DTexture) (y0.setTexture3D(j, 0), (M0 = f.TEXTURE_3D));
        else if (j.isDataArrayTexture)
          (y0.setTexture2DArray(j, 0), (M0 = f.TEXTURE_2D_ARRAY));
        else {
          console.warn(
            "THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.",
          );
          return;
        }
        (f.pixelStorei(f.UNPACK_FLIP_Y_WEBGL, j.flipY),
          f.pixelStorei(f.UNPACK_PREMULTIPLY_ALPHA_WEBGL, j.premultiplyAlpha),
          f.pixelStorei(f.UNPACK_ALIGNMENT, j.unpackAlignment));
        let L0 = f.getParameter(f.UNPACK_ROW_LENGTH),
          a0 = f.getParameter(f.UNPACK_IMAGE_HEIGHT),
          e0 = f.getParameter(f.UNPACK_SKIP_PIXELS),
          A6 = f.getParameter(f.UNPACK_SKIP_ROWS),
          s6 = f.getParameter(f.UNPACK_SKIP_IMAGES),
          J6 = m.isCompressedTexture ? m.mipmaps[0] : m.image;
        if (
          (f.pixelStorei(f.UNPACK_ROW_LENGTH, J6.width),
          f.pixelStorei(f.UNPACK_IMAGE_HEIGHT, J6.height),
          f.pixelStorei(f.UNPACK_SKIP_PIXELS, I.min.x),
          f.pixelStorei(f.UNPACK_SKIP_ROWS, I.min.y),
          f.pixelStorei(f.UNPACK_SKIP_IMAGES, I.min.z),
          m.isDataTexture || m.isData3DTexture)
        )
          f.texSubImage3D(M0, p, b.x, b.y, b.z, F0, I0, k0, B0, j0, J6.data);
        else if (m.isCompressedArrayTexture)
          (console.warn(
            "THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture.",
          ),
            f.compressedTexSubImage3D(
              M0,
              p,
              b.x,
              b.y,
              b.z,
              F0,
              I0,
              k0,
              B0,
              J6.data,
            ));
        else f.texSubImage3D(M0, p, b.x, b.y, b.z, F0, I0, k0, B0, j0, J6);
        if (
          (f.pixelStorei(f.UNPACK_ROW_LENGTH, L0),
          f.pixelStorei(f.UNPACK_IMAGE_HEIGHT, a0),
          f.pixelStorei(f.UNPACK_SKIP_PIXELS, e0),
          f.pixelStorei(f.UNPACK_SKIP_ROWS, A6),
          f.pixelStorei(f.UNPACK_SKIP_IMAGES, s6),
          p === 0 && j.generateMipmaps)
        )
          f.generateMipmap(M0);
        C0.unbindTexture();
      }),
      (this.initTexture = function (I) {
        if (I.isCubeTexture) y0.setTextureCube(I, 0);
        else if (I.isData3DTexture) y0.setTexture3D(I, 0);
        else if (I.isDataArrayTexture || I.isCompressedArrayTexture)
          y0.setTexture2DArray(I, 0);
        else y0.setTexture2D(I, 0);
        C0.unbindTexture();
      }),
      (this.resetState = function () {
        ((A = 0), (L = 0), (C = null), C0.reset(), U0.reset());
      }),
      typeof __THREE_DEVTOOLS__ < "u")
    )
      __THREE_DEVTOOLS__.dispatchEvent(
        new CustomEvent("observe", { detail: this }),
      );
  }
  get coordinateSystem() {
    return 2000;
  }
  get physicallyCorrectLights() {
    return (
      console.warn(
        "THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead.",
      ),
      !this.useLegacyLights
    );
  }
  set physicallyCorrectLights($) {
    (console.warn(
      "THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead.",
    ),
      (this.useLegacyLights = !$));
  }
  get outputEncoding() {
    return (
      console.warn(
        "THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead.",
      ),
      this.outputColorSpace === "srgb" ? 3001 : 3000
    );
  }
  set outputEncoding($) {
    (console.warn(
      "THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead.",
    ),
      (this.outputColorSpace = $ === 3001 ? "srgb" : "srgb-linear"));
  }
  get useLegacyLights() {
    return (
      console.warn(
        "THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733.",
      ),
      this._useLegacyLights
    );
  }
  set useLegacyLights($) {
    (console.warn(
      "THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733.",
    ),
      (this._useLegacyLights = $));
  }
}
class m7 extends $8 {}
m7.prototype.isWebGL1Renderer = !0;
class t8 extends E6 {
  constructor() {
    super();
    if (
      ((this.isScene = !0),
      (this.type = "Scene"),
      (this.background = null),
      (this.environment = null),
      (this.fog = null),
      (this.backgroundBlurriness = 0),
      (this.backgroundIntensity = 1),
      (this.overrideMaterial = null),
      typeof __THREE_DEVTOOLS__ < "u")
    )
      __THREE_DEVTOOLS__.dispatchEvent(
        new CustomEvent("observe", { detail: this }),
      );
  }
  copy($, J) {
    if ((super.copy($, J), $.background !== null))
      this.background = $.background.clone();
    if ($.environment !== null) this.environment = $.environment.clone();
    if ($.fog !== null) this.fog = $.fog.clone();
    if (
      ((this.backgroundBlurriness = $.backgroundBlurriness),
      (this.backgroundIntensity = $.backgroundIntensity),
      $.overrideMaterial !== null)
    )
      this.overrideMaterial = $.overrideMaterial.clone();
    return ((this.matrixAutoUpdate = $.matrixAutoUpdate), this);
  }
  toJSON($) {
    let J = super.toJSON($);
    if (this.fog !== null) J.object.fog = this.fog.toJSON();
    if (this.backgroundBlurriness > 0)
      J.object.backgroundBlurriness = this.backgroundBlurriness;
    if (this.backgroundIntensity !== 1)
      J.object.backgroundIntensity = this.backgroundIntensity;
    return J;
  }
}
class p7 {
  constructor($, J) {
    ((this.isInterleavedBuffer = !0),
      (this.array = $),
      (this.stride = J),
      (this.count = $ !== void 0 ? $.length / J : 0),
      (this.usage = 35044),
      (this.updateRange = { offset: 0, count: -1 }),
      (this.version = 0),
      (this.uuid = $$()));
  }
  onUploadCallback() {}
  set needsUpdate($) {
    if ($ === !0) this.version++;
  }
  setUsage($) {
    return ((this.usage = $), this);
  }
  copy($) {
    return (
      (this.array = new $.array.constructor($.array)),
      (this.count = $.count),
      (this.stride = $.stride),
      (this.usage = $.usage),
      this
    );
  }
  copyAt($, J, Z) {
    (($ *= this.stride), (Z *= J.stride));
    for (let Q = 0, W = this.stride; Q < W; Q++)
      this.array[$ + Q] = J.array[Z + Q];
    return this;
  }
  set($, J = 0) {
    return (this.array.set($, J), this);
  }
  clone($) {
    if ($.arrayBuffers === void 0) $.arrayBuffers = {};
    if (this.array.buffer._uuid === void 0) this.array.buffer._uuid = $$();
    if ($.arrayBuffers[this.array.buffer._uuid] === void 0)
      $.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer;
    let J = new this.array.constructor($.arrayBuffers[this.array.buffer._uuid]),
      Z = new this.constructor(J, this.stride);
    return (Z.setUsage(this.usage), Z);
  }
  onUpload($) {
    return ((this.onUploadCallback = $), this);
  }
  toJSON($) {
    if ($.arrayBuffers === void 0) $.arrayBuffers = {};
    if (this.array.buffer._uuid === void 0) this.array.buffer._uuid = $$();
    if ($.arrayBuffers[this.array.buffer._uuid] === void 0)
      $.arrayBuffers[this.array.buffer._uuid] = Array.from(
        new Uint32Array(this.array.buffer),
      );
    return {
      uuid: this.uuid,
      buffer: this.array.buffer._uuid,
      type: this.array.constructor.name,
      stride: this.stride,
    };
  }
}
var _6 = new S();
class c5 {
  constructor($, J, Z, Q = !1) {
    ((this.isInterleavedBufferAttribute = !0),
      (this.name = ""),
      (this.data = $),
      (this.itemSize = J),
      (this.offset = Z),
      (this.normalized = Q));
  }
  get count() {
    return this.data.count;
  }
  get array() {
    return this.data.array;
  }
  set needsUpdate($) {
    this.data.needsUpdate = $;
  }
  applyMatrix4($) {
    for (let J = 0, Z = this.data.count; J < Z; J++)
      (_6.fromBufferAttribute(this, J),
        _6.applyMatrix4($),
        this.setXYZ(J, _6.x, _6.y, _6.z));
    return this;
  }
  applyNormalMatrix($) {
    for (let J = 0, Z = this.count; J < Z; J++)
      (_6.fromBufferAttribute(this, J),
        _6.applyNormalMatrix($),
        this.setXYZ(J, _6.x, _6.y, _6.z));
    return this;
  }
  transformDirection($) {
    for (let J = 0, Z = this.count; J < Z; J++)
      (_6.fromBufferAttribute(this, J),
        _6.transformDirection($),
        this.setXYZ(J, _6.x, _6.y, _6.z));
    return this;
  }
  setX($, J) {
    if (this.normalized) J = l0(J, this.array);
    return ((this.data.array[$ * this.data.stride + this.offset] = J), this);
  }
  setY($, J) {
    if (this.normalized) J = l0(J, this.array);
    return (
      (this.data.array[$ * this.data.stride + this.offset + 1] = J),
      this
    );
  }
  setZ($, J) {
    if (this.normalized) J = l0(J, this.array);
    return (
      (this.data.array[$ * this.data.stride + this.offset + 2] = J),
      this
    );
  }
  setW($, J) {
    if (this.normalized) J = l0(J, this.array);
    return (
      (this.data.array[$ * this.data.stride + this.offset + 3] = J),
      this
    );
  }
  getX($) {
    let J = this.data.array[$ * this.data.stride + this.offset];
    if (this.normalized) J = p6(J, this.array);
    return J;
  }
  getY($) {
    let J = this.data.array[$ * this.data.stride + this.offset + 1];
    if (this.normalized) J = p6(J, this.array);
    return J;
  }
  getZ($) {
    let J = this.data.array[$ * this.data.stride + this.offset + 2];
    if (this.normalized) J = p6(J, this.array);
    return J;
  }
  getW($) {
    let J = this.data.array[$ * this.data.stride + this.offset + 3];
    if (this.normalized) J = p6(J, this.array);
    return J;
  }
  setXY($, J, Z) {
    if ((($ = $ * this.data.stride + this.offset), this.normalized))
      ((J = l0(J, this.array)), (Z = l0(Z, this.array)));
    return ((this.data.array[$ + 0] = J), (this.data.array[$ + 1] = Z), this);
  }
  setXYZ($, J, Z, Q) {
    if ((($ = $ * this.data.stride + this.offset), this.normalized))
      ((J = l0(J, this.array)),
        (Z = l0(Z, this.array)),
        (Q = l0(Q, this.array)));
    return (
      (this.data.array[$ + 0] = J),
      (this.data.array[$ + 1] = Z),
      (this.data.array[$ + 2] = Q),
      this
    );
  }
  setXYZW($, J, Z, Q, W) {
    if ((($ = $ * this.data.stride + this.offset), this.normalized))
      ((J = l0(J, this.array)),
        (Z = l0(Z, this.array)),
        (Q = l0(Q, this.array)),
        (W = l0(W, this.array)));
    return (
      (this.data.array[$ + 0] = J),
      (this.data.array[$ + 1] = Z),
      (this.data.array[$ + 2] = Q),
      (this.data.array[$ + 3] = W),
      this
    );
  }
  clone($) {
    if ($ === void 0) {
      console.log(
        "THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.",
      );
      let J = [];
      for (let Z = 0; Z < this.count; Z++) {
        let Q = Z * this.data.stride + this.offset;
        for (let W = 0; W < this.itemSize; W++) J.push(this.data.array[Q + W]);
      }
      return new L6(
        new this.array.constructor(J),
        this.itemSize,
        this.normalized,
      );
    } else {
      if ($.interleavedBuffers === void 0) $.interleavedBuffers = {};
      if ($.interleavedBuffers[this.data.uuid] === void 0)
        $.interleavedBuffers[this.data.uuid] = this.data.clone($);
      return new c5(
        $.interleavedBuffers[this.data.uuid],
        this.itemSize,
        this.offset,
        this.normalized,
      );
    }
  }
  toJSON($) {
    if ($ === void 0) {
      console.log(
        "THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.",
      );
      let J = [];
      for (let Z = 0; Z < this.count; Z++) {
        let Q = Z * this.data.stride + this.offset;
        for (let W = 0; W < this.itemSize; W++) J.push(this.data.array[Q + W]);
      }
      return {
        itemSize: this.itemSize,
        type: this.array.constructor.name,
        array: J,
        normalized: this.normalized,
      };
    } else {
      if ($.interleavedBuffers === void 0) $.interleavedBuffers = {};
      if ($.interleavedBuffers[this.data.uuid] === void 0)
        $.interleavedBuffers[this.data.uuid] = this.data.toJSON($);
      return {
        isInterleavedBufferAttribute: !0,
        itemSize: this.itemSize,
        data: this.data.uuid,
        offset: this.offset,
        normalized: this.normalized,
      };
    }
  }
}
class J8 extends _$ {
  constructor($) {
    super();
    ((this.isSpriteMaterial = !0),
      (this.type = "SpriteMaterial"),
      (this.color = new h0(16777215)),
      (this.map = null),
      (this.alphaMap = null),
      (this.rotation = 0),
      (this.sizeAttenuation = !0),
      (this.transparent = !0),
      (this.fog = !0),
      this.setValues($));
  }
  copy($) {
    return (
      super.copy($),
      this.color.copy($.color),
      (this.map = $.map),
      (this.alphaMap = $.alphaMap),
      (this.rotation = $.rotation),
      (this.sizeAttenuation = $.sizeAttenuation),
      (this.fog = $.fog),
      this
    );
  }
}
var g$,
  J5 = new S(),
  m$ = new S(),
  p$ = new S(),
  u$ = new R0(),
  Z5 = new R0(),
  u7 = new $6(),
  h5 = new S(),
  Q5 = new S(),
  g5 = new S(),
  H7 = new R0(),
  f8 = new R0(),
  q7 = new R0();
class e8 extends E6 {
  constructor($) {
    super();
    if (((this.isSprite = !0), (this.type = "Sprite"), g$ === void 0)) {
      g$ = new d6();
      let J = new Float32Array([
          -0.5, -0.5, 0, 0, 0, 0.5, -0.5, 0, 1, 0, 0.5, 0.5, 0, 1, 1, -0.5, 0.5,
          0, 0, 1,
        ]),
        Z = new p7(J, 5);
      (g$.setIndex([0, 1, 2, 0, 2, 3]),
        g$.setAttribute("position", new c5(Z, 3, 0, !1)),
        g$.setAttribute("uv", new c5(Z, 2, 3, !1)));
    }
    ((this.geometry = g$),
      (this.material = $ !== void 0 ? $ : new J8()),
      (this.center = new R0(0.5, 0.5)));
  }
  raycast($, J) {
    if ($.camera === null)
      console.error(
        'THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.',
      );
    if (
      (m$.setFromMatrixScale(this.matrixWorld),
      u7.copy($.camera.matrixWorld),
      this.modelViewMatrix.multiplyMatrices(
        $.camera.matrixWorldInverse,
        this.matrixWorld,
      ),
      p$.setFromMatrixPosition(this.modelViewMatrix),
      $.camera.isPerspectiveCamera && this.material.sizeAttenuation === !1)
    )
      m$.multiplyScalar(-p$.z);
    let Z = this.material.rotation,
      Q,
      W;
    if (Z !== 0) ((W = Math.cos(Z)), (Q = Math.sin(Z)));
    let Y = this.center;
    (m5(h5.set(-0.5, -0.5, 0), p$, Y, m$, Q, W),
      m5(Q5.set(0.5, -0.5, 0), p$, Y, m$, Q, W),
      m5(g5.set(0.5, 0.5, 0), p$, Y, m$, Q, W),
      H7.set(0, 0),
      f8.set(1, 0),
      q7.set(1, 1));
    let K = $.ray.intersectTriangle(h5, Q5, g5, !1, J5);
    if (K === null) {
      if (
        (m5(Q5.set(-0.5, 0.5, 0), p$, Y, m$, Q, W),
        f8.set(0, 1),
        (K = $.ray.intersectTriangle(h5, g5, Q5, !1, J5)),
        K === null)
      )
        return;
    }
    let X = $.ray.origin.distanceTo(J5);
    if (X < $.near || X > $.far) return;
    J.push({
      distance: X,
      point: J5.clone(),
      uv: T6.getInterpolation(J5, h5, Q5, g5, H7, f8, q7, new R0()),
      face: null,
      object: this,
    });
  }
  copy($, J) {
    if ((super.copy($, J), $.center !== void 0)) this.center.copy($.center);
    return ((this.material = $.material), this);
  }
}
function m5($, J, Z, Q, W, Y) {
  if ((u$.subVectors($, Z).addScalar(0.5).multiply(Q), W !== void 0))
    ((Z5.x = Y * u$.x - W * u$.y), (Z5.y = W * u$.x + Y * u$.y));
  else Z5.copy(u$);
  ($.copy(J), ($.x += Z5.x), ($.y += Z5.y), $.applyMatrix4(u7));
}
class z$ extends U6 {
  constructor($, J, Z, Q, W, Y, K, X, H) {
    super($, J, Z, Q, W, Y, K, X, H);
    ((this.isCanvasTexture = !0), (this.needsUpdate = !0));
  }
}
class I$ extends _$ {
  constructor($) {
    super();
    ((this.isMeshStandardMaterial = !0),
      (this.defines = { STANDARD: "" }),
      (this.type = "MeshStandardMaterial"),
      (this.color = new h0(16777215)),
      (this.roughness = 1),
      (this.metalness = 0),
      (this.map = null),
      (this.lightMap = null),
      (this.lightMapIntensity = 1),
      (this.aoMap = null),
      (this.aoMapIntensity = 1),
      (this.emissive = new h0(0)),
      (this.emissiveIntensity = 1),
      (this.emissiveMap = null),
      (this.bumpMap = null),
      (this.bumpScale = 1),
      (this.normalMap = null),
      (this.normalMapType = 0),
      (this.normalScale = new R0(1, 1)),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.roughnessMap = null),
      (this.metalnessMap = null),
      (this.alphaMap = null),
      (this.envMap = null),
      (this.envMapIntensity = 1),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.wireframeLinecap = "round"),
      (this.wireframeLinejoin = "round"),
      (this.flatShading = !1),
      (this.fog = !0),
      this.setValues($));
  }
  copy($) {
    return (
      super.copy($),
      (this.defines = { STANDARD: "" }),
      this.color.copy($.color),
      (this.roughness = $.roughness),
      (this.metalness = $.metalness),
      (this.map = $.map),
      (this.lightMap = $.lightMap),
      (this.lightMapIntensity = $.lightMapIntensity),
      (this.aoMap = $.aoMap),
      (this.aoMapIntensity = $.aoMapIntensity),
      this.emissive.copy($.emissive),
      (this.emissiveMap = $.emissiveMap),
      (this.emissiveIntensity = $.emissiveIntensity),
      (this.bumpMap = $.bumpMap),
      (this.bumpScale = $.bumpScale),
      (this.normalMap = $.normalMap),
      (this.normalMapType = $.normalMapType),
      this.normalScale.copy($.normalScale),
      (this.displacementMap = $.displacementMap),
      (this.displacementScale = $.displacementScale),
      (this.displacementBias = $.displacementBias),
      (this.roughnessMap = $.roughnessMap),
      (this.metalnessMap = $.metalnessMap),
      (this.alphaMap = $.alphaMap),
      (this.envMap = $.envMap),
      (this.envMapIntensity = $.envMapIntensity),
      (this.wireframe = $.wireframe),
      (this.wireframeLinewidth = $.wireframeLinewidth),
      (this.wireframeLinecap = $.wireframeLinecap),
      (this.wireframeLinejoin = $.wireframeLinejoin),
      (this.flatShading = $.flatShading),
      (this.fog = $.fog),
      this
    );
  }
}
function X$($, J, Z) {
  if (l7($))
    return new $.constructor($.subarray(J, Z !== void 0 ? Z : $.length));
  return $.slice(J, Z);
}
function p5($, J, Z) {
  if (!$ || (!Z && $.constructor === J)) return $;
  if (typeof J.BYTES_PER_ELEMENT === "number") return new J($);
  return Array.prototype.slice.call($);
}
function l7($) {
  return ArrayBuffer.isView($) && !($ instanceof DataView);
}
class U5 {
  constructor($, J, Z, Q) {
    ((this.parameterPositions = $),
      (this._cachedIndex = 0),
      (this.resultBuffer = Q !== void 0 ? Q : new J.constructor(Z)),
      (this.sampleValues = J),
      (this.valueSize = Z),
      (this.settings = null),
      (this.DefaultSettings_ = {}));
  }
  evaluate($) {
    let J = this.parameterPositions,
      Z = this._cachedIndex,
      Q = J[Z],
      W = J[Z - 1];
    Z: {
      $: {
        let Y;
        J: {
          Q: if (!($ < Q)) {
            for (let K = Z + 2; ;) {
              if (Q === void 0) {
                if ($ < W) break Q;
                return (
                  (Z = J.length),
                  (this._cachedIndex = Z),
                  this.copySampleValue_(Z - 1)
                );
              }
              if (Z === K) break;
              if (((W = Q), (Q = J[++Z]), $ < Q)) break $;
            }
            Y = J.length;
            break J;
          }
          if (!($ >= W)) {
            let K = J[1];
            if ($ < K) ((Z = 2), (W = K));
            for (let X = Z - 2; ;) {
              if (W === void 0)
                return ((this._cachedIndex = 0), this.copySampleValue_(0));
              if (Z === X) break;
              if (((Q = W), (W = J[--Z - 1]), $ >= W)) break $;
            }
            ((Y = Z), (Z = 0));
            break J;
          }
          break Z;
        }
        while (Z < Y) {
          let K = (Z + Y) >>> 1;
          if ($ < J[K]) Y = K;
          else Z = K + 1;
        }
        if (((Q = J[Z]), (W = J[Z - 1]), W === void 0))
          return ((this._cachedIndex = 0), this.copySampleValue_(0));
        if (Q === void 0)
          return (
            (Z = J.length),
            (this._cachedIndex = Z),
            this.copySampleValue_(Z - 1)
          );
      }
      ((this._cachedIndex = Z), this.intervalChanged_(Z, W, Q));
    }
    return this.interpolate_(Z, W, $, Q);
  }
  getSettings_() {
    return this.settings || this.DefaultSettings_;
  }
  copySampleValue_($) {
    let J = this.resultBuffer,
      Z = this.sampleValues,
      Q = this.valueSize,
      W = $ * Q;
    for (let Y = 0; Y !== Q; ++Y) J[Y] = Z[W + Y];
    return J;
  }
  interpolate_() {
    throw Error("call to abstract method");
  }
  intervalChanged_() {}
}
class d7 extends U5 {
  constructor($, J, Z, Q) {
    super($, J, Z, Q);
    ((this._weightPrev = -0),
      (this._offsetPrev = -0),
      (this._weightNext = -0),
      (this._offsetNext = -0),
      (this.DefaultSettings_ = { endingStart: 2400, endingEnd: 2400 }));
  }
  intervalChanged_($, J, Z) {
    let Q = this.parameterPositions,
      W = $ - 2,
      Y = $ + 1,
      K = Q[W],
      X = Q[Y];
    if (K === void 0)
      switch (this.getSettings_().endingStart) {
        case 2401:
          ((W = $), (K = 2 * J - Z));
          break;
        case 2402:
          ((W = Q.length - 2), (K = J + Q[W] - Q[W + 1]));
          break;
        default:
          ((W = $), (K = Z));
      }
    if (X === void 0)
      switch (this.getSettings_().endingEnd) {
        case 2401:
          ((Y = $), (X = 2 * Z - J));
          break;
        case 2402:
          ((Y = 1), (X = Z + Q[1] - Q[0]));
          break;
        default:
          ((Y = $ - 1), (X = J));
      }
    let H = (Z - J) * 0.5,
      q = this.valueSize;
    ((this._weightPrev = H / (J - K)),
      (this._weightNext = H / (X - Z)),
      (this._offsetPrev = W * q),
      (this._offsetNext = Y * q));
  }
  interpolate_($, J, Z, Q) {
    let W = this.resultBuffer,
      Y = this.sampleValues,
      K = this.valueSize,
      X = $ * K,
      H = X - K,
      q = this._offsetPrev,
      U = this._offsetNext,
      G = this._weightPrev,
      E = this._weightNext,
      F = (Z - J) / (Q - J),
      O = F * F,
      _ = O * F,
      N = -G * _ + 2 * G * O - G * F,
      V = (1 + G) * _ + (-1.5 - 2 * G) * O + (-0.5 + G) * F + 1,
      k = (-1 - E) * _ + (1.5 + E) * O + 0.5 * F,
      M = E * _ - E * O;
    for (let A = 0; A !== K; ++A)
      W[A] = N * Y[q + A] + V * Y[H + A] + k * Y[X + A] + M * Y[U + A];
    return W;
  }
}
class c7 extends U5 {
  constructor($, J, Z, Q) {
    super($, J, Z, Q);
  }
  interpolate_($, J, Z, Q) {
    let W = this.resultBuffer,
      Y = this.sampleValues,
      K = this.valueSize,
      X = $ * K,
      H = X - K,
      q = (Z - J) / (Q - J),
      U = 1 - q;
    for (let G = 0; G !== K; ++G) W[G] = Y[H + G] * U + Y[X + G] * q;
    return W;
  }
}
class n7 extends U5 {
  constructor($, J, Z, Q) {
    super($, J, Z, Q);
  }
  interpolate_($) {
    return this.copySampleValue_($ - 1);
  }
}
class c6 {
  constructor($, J, Z, Q) {
    if ($ === void 0)
      throw Error("THREE.KeyframeTrack: track name is undefined");
    if (J === void 0 || J.length === 0)
      throw Error("THREE.KeyframeTrack: no keyframes in track named " + $);
    ((this.name = $),
      (this.times = p5(J, this.TimeBufferType)),
      (this.values = p5(Z, this.ValueBufferType)),
      this.setInterpolation(Q || this.DefaultInterpolation));
  }
  static toJSON($) {
    let J = $.constructor,
      Z;
    if (J.toJSON !== this.toJSON) Z = J.toJSON($);
    else {
      Z = {
        name: $.name,
        times: p5($.times, Array),
        values: p5($.values, Array),
      };
      let Q = $.getInterpolation();
      if (Q !== $.DefaultInterpolation) Z.interpolation = Q;
    }
    return ((Z.type = $.ValueTypeName), Z);
  }
  InterpolantFactoryMethodDiscrete($) {
    return new n7(this.times, this.values, this.getValueSize(), $);
  }
  InterpolantFactoryMethodLinear($) {
    return new c7(this.times, this.values, this.getValueSize(), $);
  }
  InterpolantFactoryMethodSmooth($) {
    return new d7(this.times, this.values, this.getValueSize(), $);
  }
  setInterpolation($) {
    let J;
    switch ($) {
      case 2300:
        J = this.InterpolantFactoryMethodDiscrete;
        break;
      case 2301:
        J = this.InterpolantFactoryMethodLinear;
        break;
      case 2302:
        J = this.InterpolantFactoryMethodSmooth;
        break;
    }
    if (J === void 0) {
      let Z =
        "unsupported interpolation for " +
        this.ValueTypeName +
        " keyframe track named " +
        this.name;
      if (this.createInterpolant === void 0)
        if ($ !== this.DefaultInterpolation)
          this.setInterpolation(this.DefaultInterpolation);
        else throw Error(Z);
      return (console.warn("THREE.KeyframeTrack:", Z), this);
    }
    return ((this.createInterpolant = J), this);
  }
  getInterpolation() {
    switch (this.createInterpolant) {
      case this.InterpolantFactoryMethodDiscrete:
        return 2300;
      case this.InterpolantFactoryMethodLinear:
        return 2301;
      case this.InterpolantFactoryMethodSmooth:
        return 2302;
    }
  }
  getValueSize() {
    return this.values.length / this.times.length;
  }
  shift($) {
    if ($ !== 0) {
      let J = this.times;
      for (let Z = 0, Q = J.length; Z !== Q; ++Z) J[Z] += $;
    }
    return this;
  }
  scale($) {
    if ($ !== 1) {
      let J = this.times;
      for (let Z = 0, Q = J.length; Z !== Q; ++Z) J[Z] *= $;
    }
    return this;
  }
  trim($, J) {
    let Z = this.times,
      Q = Z.length,
      W = 0,
      Y = Q - 1;
    while (W !== Q && Z[W] < $) ++W;
    while (Y !== -1 && Z[Y] > J) --Y;
    if ((++Y, W !== 0 || Y !== Q)) {
      if (W >= Y) ((Y = Math.max(Y, 1)), (W = Y - 1));
      let K = this.getValueSize();
      ((this.times = X$(Z, W, Y)),
        (this.values = X$(this.values, W * K, Y * K)));
    }
    return this;
  }
  validate() {
    let $ = !0,
      J = this.getValueSize();
    if (J - Math.floor(J) !== 0)
      (console.error("THREE.KeyframeTrack: Invalid value size in track.", this),
        ($ = !1));
    let Z = this.times,
      Q = this.values,
      W = Z.length;
    if (W === 0)
      (console.error("THREE.KeyframeTrack: Track is empty.", this), ($ = !1));
    let Y = null;
    for (let K = 0; K !== W; K++) {
      let X = Z[K];
      if (typeof X === "number" && isNaN(X)) {
        (console.error(
          "THREE.KeyframeTrack: Time is not a valid number.",
          this,
          K,
          X,
        ),
          ($ = !1));
        break;
      }
      if (Y !== null && Y > X) {
        (console.error(
          "THREE.KeyframeTrack: Out of order keys.",
          this,
          K,
          X,
          Y,
        ),
          ($ = !1));
        break;
      }
      Y = X;
    }
    if (Q !== void 0) {
      if (l7(Q))
        for (let K = 0, X = Q.length; K !== X; ++K) {
          let H = Q[K];
          if (isNaN(H)) {
            (console.error(
              "THREE.KeyframeTrack: Value is not a valid number.",
              this,
              K,
              H,
            ),
              ($ = !1));
            break;
          }
        }
    }
    return $;
  }
  optimize() {
    let $ = X$(this.times),
      J = X$(this.values),
      Z = this.getValueSize(),
      Q = this.getInterpolation() === 2302,
      W = $.length - 1,
      Y = 1;
    for (let K = 1; K < W; ++K) {
      let X = !1,
        H = $[K],
        q = $[K + 1];
      if (H !== q && (K !== 1 || H !== $[0]))
        if (!Q) {
          let U = K * Z,
            G = U - Z,
            E = U + Z;
          for (let F = 0; F !== Z; ++F) {
            let O = J[U + F];
            if (O !== J[G + F] || O !== J[E + F]) {
              X = !0;
              break;
            }
          }
        } else X = !0;
      if (X) {
        if (K !== Y) {
          $[Y] = $[K];
          let U = K * Z,
            G = Y * Z;
          for (let E = 0; E !== Z; ++E) J[G + E] = J[U + E];
        }
        ++Y;
      }
    }
    if (W > 0) {
      $[Y] = $[W];
      for (let K = W * Z, X = Y * Z, H = 0; H !== Z; ++H) J[X + H] = J[K + H];
      ++Y;
    }
    if (Y !== $.length)
      ((this.times = X$($, 0, Y)), (this.values = X$(J, 0, Y * Z)));
    else ((this.times = $), (this.values = J));
    return this;
  }
  clone() {
    let $ = X$(this.times, 0),
      J = X$(this.values, 0),
      Q = new this.constructor(this.name, $, J);
    return ((Q.createInterpolant = this.createInterpolant), Q);
  }
}
c6.prototype.TimeBufferType = Float32Array;
c6.prototype.ValueBufferType = Float32Array;
c6.prototype.DefaultInterpolation = 2301;
class i$ extends c6 {}
i$.prototype.ValueTypeName = "bool";
i$.prototype.ValueBufferType = Array;
i$.prototype.DefaultInterpolation = 2300;
i$.prototype.InterpolantFactoryMethodLinear = void 0;
i$.prototype.InterpolantFactoryMethodSmooth = void 0;
class s7 extends c6 {}
s7.prototype.ValueTypeName = "color";
class i7 extends c6 {}
i7.prototype.ValueTypeName = "number";
class o7 extends U5 {
  constructor($, J, Z, Q) {
    super($, J, Z, Q);
  }
  interpolate_($, J, Z, Q) {
    let W = this.resultBuffer,
      Y = this.sampleValues,
      K = this.valueSize,
      X = (Z - J) / (Q - J),
      H = $ * K;
    for (let q = H + K; H !== q; H += 4) l6.slerpFlat(W, 0, Y, H - K, Y, H, X);
    return W;
  }
}
class Z8 extends c6 {
  InterpolantFactoryMethodLinear($) {
    return new o7(this.times, this.values, this.getValueSize(), $);
  }
}
Z8.prototype.ValueTypeName = "quaternion";
Z8.prototype.DefaultInterpolation = 2301;
Z8.prototype.InterpolantFactoryMethodSmooth = void 0;
class o$ extends c6 {}
o$.prototype.ValueTypeName = "string";
o$.prototype.ValueBufferType = Array;
o$.prototype.DefaultInterpolation = 2300;
o$.prototype.InterpolantFactoryMethodLinear = void 0;
o$.prototype.InterpolantFactoryMethodSmooth = void 0;
class r7 extends c6 {}
r7.prototype.ValueTypeName = "vector";
class a7 {
  constructor($, J, Z) {
    let Q = this,
      W = !1,
      Y = 0,
      K = 0,
      X = void 0,
      H = [];
    ((this.onStart = void 0),
      (this.onLoad = $),
      (this.onProgress = J),
      (this.onError = Z),
      (this.itemStart = function (q) {
        if ((K++, W === !1)) {
          if (Q.onStart !== void 0) Q.onStart(q, Y, K);
        }
        W = !0;
      }),
      (this.itemEnd = function (q) {
        if ((Y++, Q.onProgress !== void 0)) Q.onProgress(q, Y, K);
        if (Y === K) {
          if (((W = !1), Q.onLoad !== void 0)) Q.onLoad();
        }
      }),
      (this.itemError = function (q) {
        if (Q.onError !== void 0) Q.onError(q);
      }),
      (this.resolveURL = function (q) {
        if (X) return X(q);
        return q;
      }),
      (this.setURLModifier = function (q) {
        return ((X = q), this);
      }),
      (this.addHandler = function (q, U) {
        return (H.push(q, U), this);
      }),
      (this.removeHandler = function (q) {
        let U = H.indexOf(q);
        if (U !== -1) H.splice(U, 2);
        return this;
      }),
      (this.getHandler = function (q) {
        for (let U = 0, G = H.length; U < G; U += 2) {
          let E = H[U],
            F = H[U + 1];
          if (E.global) E.lastIndex = 0;
          if (E.test(q)) return F;
        }
        return null;
      }));
  }
}
var T4 = new a7();
class t7 {
  constructor($) {
    ((this.manager = $ !== void 0 ? $ : T4),
      (this.crossOrigin = "anonymous"),
      (this.withCredentials = !1),
      (this.path = ""),
      (this.resourcePath = ""),
      (this.requestHeader = {}));
  }
  load() {}
  loadAsync($, J) {
    let Z = this;
    return new Promise(function (Q, W) {
      Z.load($, Q, J, W);
    });
  }
  parse() {}
  setCrossOrigin($) {
    return ((this.crossOrigin = $), this);
  }
  setWithCredentials($) {
    return ((this.withCredentials = $), this);
  }
  setPath($) {
    return ((this.path = $), this);
  }
  setResourcePath($) {
    return ((this.resourcePath = $), this);
  }
  setRequestHeader($) {
    return ((this.requestHeader = $), this);
  }
}
t7.DEFAULT_MATERIAL_NAME = "__DEFAULT";
class $J extends E6 {
  constructor($, J = 1) {
    super();
    ((this.isLight = !0),
      (this.type = "Light"),
      (this.color = new h0($)),
      (this.intensity = J));
  }
  dispose() {}
  copy($, J) {
    return (
      super.copy($, J),
      this.color.copy($.color),
      (this.intensity = $.intensity),
      this
    );
  }
  toJSON($) {
    let J = super.toJSON($);
    if (
      ((J.object.color = this.color.getHex()),
      (J.object.intensity = this.intensity),
      this.groundColor !== void 0)
    )
      J.object.groundColor = this.groundColor.getHex();
    if (this.distance !== void 0) J.object.distance = this.distance;
    if (this.angle !== void 0) J.object.angle = this.angle;
    if (this.decay !== void 0) J.object.decay = this.decay;
    if (this.penumbra !== void 0) J.object.penumbra = this.penumbra;
    if (this.shadow !== void 0) J.object.shadow = this.shadow.toJSON();
    return J;
  }
}
var b8 = new $6(),
  G7 = new S(),
  U7 = new S();
class e7 {
  constructor($) {
    ((this.camera = $),
      (this.bias = 0),
      (this.normalBias = 0),
      (this.radius = 1),
      (this.blurSamples = 8),
      (this.mapSize = new R0(512, 512)),
      (this.map = null),
      (this.mapPass = null),
      (this.matrix = new $6()),
      (this.autoUpdate = !0),
      (this.needsUpdate = !1),
      (this._frustum = new r5()),
      (this._frameExtents = new R0(1, 1)),
      (this._viewportCount = 1),
      (this._viewports = [new i0(0, 0, 1, 1)]));
  }
  getViewportCount() {
    return this._viewportCount;
  }
  getFrustum() {
    return this._frustum;
  }
  updateMatrices($) {
    let J = this.camera,
      Z = this.matrix;
    (G7.setFromMatrixPosition($.matrixWorld),
      J.position.copy(G7),
      U7.setFromMatrixPosition($.target.matrixWorld),
      J.lookAt(U7),
      J.updateMatrixWorld(),
      b8.multiplyMatrices(J.projectionMatrix, J.matrixWorldInverse),
      this._frustum.setFromProjectionMatrix(b8),
      Z.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1),
      Z.multiply(b8));
  }
  getViewport($) {
    return this._viewports[$];
  }
  getFrameExtents() {
    return this._frameExtents;
  }
  dispose() {
    if (this.map) this.map.dispose();
    if (this.mapPass) this.mapPass.dispose();
  }
  copy($) {
    return (
      (this.camera = $.camera.clone()),
      (this.bias = $.bias),
      (this.radius = $.radius),
      this.mapSize.copy($.mapSize),
      this
    );
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    let $ = {};
    if (this.bias !== 0) $.bias = this.bias;
    if (this.normalBias !== 0) $.normalBias = this.normalBias;
    if (this.radius !== 1) $.radius = this.radius;
    if (this.mapSize.x !== 512 || this.mapSize.y !== 512)
      $.mapSize = this.mapSize.toArray();
    return (
      ($.camera = this.camera.toJSON(!1).object),
      delete $.camera.matrix,
      $
    );
  }
}
var E7 = new $6(),
  W5 = new S(),
  j8 = new S();
class $9 extends e7 {
  constructor() {
    super(new I6(90, 1, 0.5, 500));
    ((this.isPointLightShadow = !0),
      (this._frameExtents = new R0(4, 2)),
      (this._viewportCount = 6),
      (this._viewports = [
        new i0(2, 1, 1, 1),
        new i0(0, 1, 1, 1),
        new i0(3, 1, 1, 1),
        new i0(1, 1, 1, 1),
        new i0(3, 0, 1, 1),
        new i0(1, 0, 1, 1),
      ]),
      (this._cubeDirections = [
        new S(1, 0, 0),
        new S(-1, 0, 0),
        new S(0, 0, 1),
        new S(0, 0, -1),
        new S(0, 1, 0),
        new S(0, -1, 0),
      ]),
      (this._cubeUps = [
        new S(0, 1, 0),
        new S(0, 1, 0),
        new S(0, 1, 0),
        new S(0, 1, 0),
        new S(0, 0, 1),
        new S(0, 0, -1),
      ]));
  }
  updateMatrices($, J = 0) {
    let Z = this.camera,
      Q = this.matrix,
      W = $.distance || Z.far;
    if (W !== Z.far) ((Z.far = W), Z.updateProjectionMatrix());
    (W5.setFromMatrixPosition($.matrixWorld),
      Z.position.copy(W5),
      j8.copy(Z.position),
      j8.add(this._cubeDirections[J]),
      Z.up.copy(this._cubeUps[J]),
      Z.lookAt(j8),
      Z.updateMatrixWorld(),
      Q.makeTranslation(-W5.x, -W5.y, -W5.z),
      E7.multiplyMatrices(Z.projectionMatrix, Z.matrixWorldInverse),
      this._frustum.setFromProjectionMatrix(E7));
  }
}
class JJ extends $J {
  constructor($, J, Z = 0, Q = 2) {
    super($, J);
    ((this.isPointLight = !0),
      (this.type = "PointLight"),
      (this.distance = Z),
      (this.decay = Q),
      (this.shadow = new $9()));
  }
  get power() {
    return this.intensity * 4 * Math.PI;
  }
  set power($) {
    this.intensity = $ / (4 * Math.PI);
  }
  dispose() {
    this.shadow.dispose();
  }
  copy($, J) {
    return (
      super.copy($, J),
      (this.distance = $.distance),
      (this.decay = $.decay),
      (this.shadow = $.shadow.clone()),
      this
    );
  }
}
class ZJ extends $J {
  constructor($, J) {
    super($, J);
    ((this.isAmbientLight = !0), (this.type = "AmbientLight"));
  }
}
class E5 {
  constructor($ = !0) {
    ((this.autoStart = $),
      (this.startTime = 0),
      (this.oldTime = 0),
      (this.elapsedTime = 0),
      (this.running = !1));
  }
  start() {
    ((this.startTime = V7()),
      (this.oldTime = this.startTime),
      (this.elapsedTime = 0),
      (this.running = !0));
  }
  stop() {
    (this.getElapsedTime(), (this.running = !1), (this.autoStart = !1));
  }
  getElapsedTime() {
    return (this.getDelta(), this.elapsedTime);
  }
  getDelta() {
    let $ = 0;
    if (this.autoStart && !this.running) return (this.start(), 0);
    if (this.running) {
      let J = V7();
      (($ = (J - this.oldTime) / 1000),
        (this.oldTime = J),
        (this.elapsedTime += $));
    }
    return $;
  }
}
function V7() {
  return (typeof performance > "u" ? Date : performance).now();
}
var QJ = "\\[\\]\\.:\\/",
  S4 = new RegExp("[" + QJ + "]", "g"),
  WJ = "[^" + QJ + "]",
  f4 = "[^" + QJ.replace("\\.", "") + "]",
  b4 = /((?:WC+[\/:])*)/.source.replace("WC", WJ),
  j4 = /(WCOD+)?/.source.replace("WCOD", f4),
  y4 = /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", WJ),
  x4 = /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", WJ),
  v4 = new RegExp("^" + b4 + j4 + y4 + x4 + "$"),
  h4 = ["material", "materials", "bones", "map"];
class J9 {
  constructor($, J, Z) {
    let Q = Z || d0.parseTrackName(J);
    ((this._targetGroup = $), (this._bindings = $.subscribe_(J, Q)));
  }
  getValue($, J) {
    this.bind();
    let Z = this._targetGroup.nCachedObjects_,
      Q = this._bindings[Z];
    if (Q !== void 0) Q.getValue($, J);
  }
  setValue($, J) {
    let Z = this._bindings;
    for (let Q = this._targetGroup.nCachedObjects_, W = Z.length; Q !== W; ++Q)
      Z[Q].setValue($, J);
  }
  bind() {
    let $ = this._bindings;
    for (let J = this._targetGroup.nCachedObjects_, Z = $.length; J !== Z; ++J)
      $[J].bind();
  }
  unbind() {
    let $ = this._bindings;
    for (let J = this._targetGroup.nCachedObjects_, Z = $.length; J !== Z; ++J)
      $[J].unbind();
  }
}
class d0 {
  constructor($, J, Z) {
    ((this.path = J),
      (this.parsedPath = Z || d0.parseTrackName(J)),
      (this.node = d0.findNode($, this.parsedPath.nodeName)),
      (this.rootNode = $),
      (this.getValue = this._getValue_unbound),
      (this.setValue = this._setValue_unbound));
  }
  static create($, J, Z) {
    if (!($ && $.isAnimationObjectGroup)) return new d0($, J, Z);
    else return new d0.Composite($, J, Z);
  }
  static sanitizeNodeName($) {
    return $.replace(/\s/g, "_").replace(S4, "");
  }
  static parseTrackName($) {
    let J = v4.exec($);
    if (J === null)
      throw Error("PropertyBinding: Cannot parse trackName: " + $);
    let Z = {
        nodeName: J[2],
        objectName: J[3],
        objectIndex: J[4],
        propertyName: J[5],
        propertyIndex: J[6],
      },
      Q = Z.nodeName && Z.nodeName.lastIndexOf(".");
    if (Q !== void 0 && Q !== -1) {
      let W = Z.nodeName.substring(Q + 1);
      if (h4.indexOf(W) !== -1)
        ((Z.nodeName = Z.nodeName.substring(0, Q)), (Z.objectName = W));
    }
    if (Z.propertyName === null || Z.propertyName.length === 0)
      throw Error(
        "PropertyBinding: can not parse propertyName from trackName: " + $,
      );
    return Z;
  }
  static findNode($, J) {
    if (
      J === void 0 ||
      J === "" ||
      J === "." ||
      J === -1 ||
      J === $.name ||
      J === $.uuid
    )
      return $;
    if ($.skeleton) {
      let Z = $.skeleton.getBoneByName(J);
      if (Z !== void 0) return Z;
    }
    if ($.children) {
      let Z = function (W) {
          for (let Y = 0; Y < W.length; Y++) {
            let K = W[Y];
            if (K.name === J || K.uuid === J) return K;
            let X = Z(K.children);
            if (X) return X;
          }
          return null;
        },
        Q = Z($.children);
      if (Q) return Q;
    }
    return null;
  }
  _getValue_unavailable() {}
  _setValue_unavailable() {}
  _getValue_direct($, J) {
    $[J] = this.targetObject[this.propertyName];
  }
  _getValue_array($, J) {
    let Z = this.resolvedProperty;
    for (let Q = 0, W = Z.length; Q !== W; ++Q) $[J++] = Z[Q];
  }
  _getValue_arrayElement($, J) {
    $[J] = this.resolvedProperty[this.propertyIndex];
  }
  _getValue_toArray($, J) {
    this.resolvedProperty.toArray($, J);
  }
  _setValue_direct($, J) {
    this.targetObject[this.propertyName] = $[J];
  }
  _setValue_direct_setNeedsUpdate($, J) {
    ((this.targetObject[this.propertyName] = $[J]),
      (this.targetObject.needsUpdate = !0));
  }
  _setValue_direct_setMatrixWorldNeedsUpdate($, J) {
    ((this.targetObject[this.propertyName] = $[J]),
      (this.targetObject.matrixWorldNeedsUpdate = !0));
  }
  _setValue_array($, J) {
    let Z = this.resolvedProperty;
    for (let Q = 0, W = Z.length; Q !== W; ++Q) Z[Q] = $[J++];
  }
  _setValue_array_setNeedsUpdate($, J) {
    let Z = this.resolvedProperty;
    for (let Q = 0, W = Z.length; Q !== W; ++Q) Z[Q] = $[J++];
    this.targetObject.needsUpdate = !0;
  }
  _setValue_array_setMatrixWorldNeedsUpdate($, J) {
    let Z = this.resolvedProperty;
    for (let Q = 0, W = Z.length; Q !== W; ++Q) Z[Q] = $[J++];
    this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _setValue_arrayElement($, J) {
    this.resolvedProperty[this.propertyIndex] = $[J];
  }
  _setValue_arrayElement_setNeedsUpdate($, J) {
    ((this.resolvedProperty[this.propertyIndex] = $[J]),
      (this.targetObject.needsUpdate = !0));
  }
  _setValue_arrayElement_setMatrixWorldNeedsUpdate($, J) {
    ((this.resolvedProperty[this.propertyIndex] = $[J]),
      (this.targetObject.matrixWorldNeedsUpdate = !0));
  }
  _setValue_fromArray($, J) {
    this.resolvedProperty.fromArray($, J);
  }
  _setValue_fromArray_setNeedsUpdate($, J) {
    (this.resolvedProperty.fromArray($, J),
      (this.targetObject.needsUpdate = !0));
  }
  _setValue_fromArray_setMatrixWorldNeedsUpdate($, J) {
    (this.resolvedProperty.fromArray($, J),
      (this.targetObject.matrixWorldNeedsUpdate = !0));
  }
  _getValue_unbound($, J) {
    (this.bind(), this.getValue($, J));
  }
  _setValue_unbound($, J) {
    (this.bind(), this.setValue($, J));
  }
  bind() {
    let $ = this.node,
      J = this.parsedPath,
      Z = J.objectName,
      Q = J.propertyName,
      W = J.propertyIndex;
    if (!$) (($ = d0.findNode(this.rootNode, J.nodeName)), (this.node = $));
    if (
      ((this.getValue = this._getValue_unavailable),
      (this.setValue = this._setValue_unavailable),
      !$)
    ) {
      console.warn(
        "THREE.PropertyBinding: No target node found for track: " +
          this.path +
          ".",
      );
      return;
    }
    if (Z) {
      let H = J.objectIndex;
      switch (Z) {
        case "materials":
          if (!$.material) {
            console.error(
              "THREE.PropertyBinding: Can not bind to material as node does not have a material.",
              this,
            );
            return;
          }
          if (!$.material.materials) {
            console.error(
              "THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",
              this,
            );
            return;
          }
          $ = $.material.materials;
          break;
        case "bones":
          if (!$.skeleton) {
            console.error(
              "THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",
              this,
            );
            return;
          }
          $ = $.skeleton.bones;
          for (let q = 0; q < $.length; q++)
            if ($[q].name === H) {
              H = q;
              break;
            }
          break;
        case "map":
          if ("map" in $) {
            $ = $.map;
            break;
          }
          if (!$.material) {
            console.error(
              "THREE.PropertyBinding: Can not bind to material as node does not have a material.",
              this,
            );
            return;
          }
          if (!$.material.map) {
            console.error(
              "THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",
              this,
            );
            return;
          }
          $ = $.material.map;
          break;
        default:
          if ($[Z] === void 0) {
            console.error(
              "THREE.PropertyBinding: Can not bind to objectName of node undefined.",
              this,
            );
            return;
          }
          $ = $[Z];
      }
      if (H !== void 0) {
        if ($[H] === void 0) {
          console.error(
            "THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",
            this,
            $,
          );
          return;
        }
        $ = $[H];
      }
    }
    let Y = $[Q];
    if (Y === void 0) {
      let H = J.nodeName;
      console.error(
        "THREE.PropertyBinding: Trying to update property for track: " +
          H +
          "." +
          Q +
          " but it wasn't found.",
        $,
      );
      return;
    }
    let K = this.Versioning.None;
    if (((this.targetObject = $), $.needsUpdate !== void 0))
      K = this.Versioning.NeedsUpdate;
    else if ($.matrixWorldNeedsUpdate !== void 0)
      K = this.Versioning.MatrixWorldNeedsUpdate;
    let X = this.BindingType.Direct;
    if (W !== void 0) {
      if (Q === "morphTargetInfluences") {
        if (!$.geometry) {
          console.error(
            "THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",
            this,
          );
          return;
        }
        if (!$.geometry.morphAttributes) {
          console.error(
            "THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",
            this,
          );
          return;
        }
        if ($.morphTargetDictionary[W] !== void 0)
          W = $.morphTargetDictionary[W];
      }
      ((X = this.BindingType.ArrayElement),
        (this.resolvedProperty = Y),
        (this.propertyIndex = W));
    } else if (Y.fromArray !== void 0 && Y.toArray !== void 0)
      ((X = this.BindingType.HasFromToArray), (this.resolvedProperty = Y));
    else if (Array.isArray(Y))
      ((X = this.BindingType.EntireArray), (this.resolvedProperty = Y));
    else this.propertyName = Q;
    ((this.getValue = this.GetterByBindingType[X]),
      (this.setValue = this.SetterByBindingTypeAndVersioning[X][K]));
  }
  unbind() {
    ((this.node = null),
      (this.getValue = this._getValue_unbound),
      (this.setValue = this._setValue_unbound));
  }
}
d0.Composite = J9;
d0.prototype.BindingType = {
  Direct: 0,
  EntireArray: 1,
  ArrayElement: 2,
  HasFromToArray: 3,
};
d0.prototype.Versioning = {
  None: 0,
  NeedsUpdate: 1,
  MatrixWorldNeedsUpdate: 2,
};
d0.prototype.GetterByBindingType = [
  d0.prototype._getValue_direct,
  d0.prototype._getValue_array,
  d0.prototype._getValue_arrayElement,
  d0.prototype._getValue_toArray,
];
d0.prototype.SetterByBindingTypeAndVersioning = [
  [
    d0.prototype._setValue_direct,
    d0.prototype._setValue_direct_setNeedsUpdate,
    d0.prototype._setValue_direct_setMatrixWorldNeedsUpdate,
  ],
  [
    d0.prototype._setValue_array,
    d0.prototype._setValue_array_setNeedsUpdate,
    d0.prototype._setValue_array_setMatrixWorldNeedsUpdate,
  ],
  [
    d0.prototype._setValue_arrayElement,
    d0.prototype._setValue_arrayElement_setNeedsUpdate,
    d0.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate,
  ],
  [
    d0.prototype._setValue_fromArray,
    d0.prototype._setValue_fromArray_setNeedsUpdate,
    d0.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate,
  ],
];
var i4 = new Float32Array(1);
class Q8 {
  constructor($ = 1, J = 0, Z = 0) {
    return ((this.radius = $), (this.phi = J), (this.theta = Z), this);
  }
  set($, J, Z) {
    return ((this.radius = $), (this.phi = J), (this.theta = Z), this);
  }
  copy($) {
    return (
      (this.radius = $.radius),
      (this.phi = $.phi),
      (this.theta = $.theta),
      this
    );
  }
  makeSafe() {
    return (
      (this.phi = Math.max(0.000001, Math.min(Math.PI - 0.000001, this.phi))),
      this
    );
  }
  setFromVector3($) {
    return this.setFromCartesianCoords($.x, $.y, $.z);
  }
  setFromCartesianCoords($, J, Z) {
    if (((this.radius = Math.sqrt($ * $ + J * J + Z * Z)), this.radius === 0))
      ((this.theta = 0), (this.phi = 0));
    else
      ((this.theta = Math.atan2($, Z)),
        (this.phi = Math.acos(F6(J / this.radius, -1, 1))));
    return this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
if (typeof __THREE_DEVTOOLS__ < "u")
  __THREE_DEVTOOLS__.dispatchEvent(
    new CustomEvent("register", { detail: { revision: "156" } }),
  );
if (typeof window < "u")
  if (window.__THREE__)
    console.warn("WARNING: Multiple instances of Three.js being imported.");
  else window.__THREE__ = "156";
function XJ($, J, Z, Q, W, Y, K, X) {
  let H = (g, d, R, w) => [
      new R0(g / K, 1 - w / X),
      new R0(R / K, 1 - w / X),
      new R0(R / K, 1 - d / X),
      new R0(g / K, 1 - d / X),
    ],
    q = H(J + Y, Z, J + Q + Y, Z + Y),
    U = H(J + Q + Y, Z, J + Q * 2 + Y, Z + Y),
    G = H(J, Z + Y, J + Y, Z + Y + W),
    E = H(J + Y, Z + Y, J + Q + Y, Z + Y + W),
    F = H(J + Q + Y, Z + Y, J + Q + Y * 2, Z + W + Y),
    O = H(J + Q + Y * 2, Z + Y, J + Q * 2 + Y * 2, Z + W + Y),
    _ = $.attributes.uv,
    N = [F[3], F[2], F[0], F[1]],
    V = [G[3], G[2], G[0], G[1]],
    k = [q[3], q[2], q[0], q[1]],
    M = [U[0], U[1], U[3], U[2]],
    A = [E[3], E[2], E[0], E[1]],
    L = [O[3], O[2], O[0], O[1]],
    C = [];
  for (let g of [N, V, k, M, A, L]) for (let d of g) C.push(d.x, d.y);
  (_.set(new Float32Array(C)), (_.needsUpdate = !0));
}
function f6($, J, Z, Q, W, Y) {
  XJ($, J, Z, Q, W, Y, 64, 64);
}
function YJ($, J, Z, Q, W, Y) {
  XJ($, J, Z, Q, W, Y, 64, 32);
}
class K$ extends W6 {
  constructor($, J) {
    super();
    (Object.defineProperty(this, "innerLayer", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: $,
    }),
      Object.defineProperty(this, "outerLayer", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: J,
      }),
      ($.name = "inner"),
      (J.name = "outer"));
  }
}
class Q9 extends W6 {
  constructor() {
    super();
    (Object.defineProperty(this, "head", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0,
    }),
      Object.defineProperty(this, "body", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "rightArm", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "leftArm", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "rightLeg", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "leftLeg", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "modelListeners", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: [],
      }),
      Object.defineProperty(this, "slim", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      }),
      Object.defineProperty(this, "_map", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "layer1Material", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "layer1MaterialBiased", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "layer2Material", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "layer2MaterialBiased", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.layer1Material = new I$({ side: h8 })),
      (this.layer2Material = new I$({
        side: n5,
        transparent: !0,
        alphaTest: 0.00001,
      })),
      (this.layer1MaterialBiased = this.layer1Material.clone()),
      (this.layer1MaterialBiased.polygonOffset = !0),
      (this.layer1MaterialBiased.polygonOffsetFactor = 1),
      (this.layer1MaterialBiased.polygonOffsetUnits = 1),
      (this.layer2MaterialBiased = this.layer2Material.clone()),
      (this.layer2MaterialBiased.polygonOffset = !0),
      (this.layer2MaterialBiased.polygonOffsetFactor = 1),
      (this.layer2MaterialBiased.polygonOffsetUnits = 1));
    let $ = new t0(8, 8, 8);
    f6($, 0, 0, 8, 8, 8);
    let J = new u0($, this.layer1Material),
      Z = new t0(9, 9, 9);
    f6(Z, 32, 0, 8, 8, 8);
    let Q = new u0(Z, this.layer2Material);
    ((this.head = new K$(J, Q)),
      (this.head.name = "head"),
      this.head.add(J, Q),
      (J.position.y = 4),
      (Q.position.y = 4),
      this.add(this.head));
    let W = new t0(8, 12, 4);
    f6(W, 16, 16, 8, 12, 4);
    let Y = new u0(W, this.layer1Material),
      K = new t0(8.5, 12.5, 4.5);
    f6(K, 16, 32, 8, 12, 4);
    let X = new u0(K, this.layer2Material);
    ((this.body = new K$(Y, X)),
      (this.body.name = "body"),
      this.body.add(Y, X),
      (this.body.position.y = -6),
      this.add(this.body));
    let H = new t0(),
      q = new u0(H, this.layer1MaterialBiased);
    this.modelListeners.push(() => {
      ((q.scale.x = this.slim ? 3 : 4),
        (q.scale.y = 12),
        (q.scale.z = 4),
        f6(H, 40, 16, this.slim ? 3 : 4, 12, 4));
    });
    let U = new t0(),
      G = new u0(U, this.layer2MaterialBiased);
    this.modelListeners.push(() => {
      ((G.scale.x = this.slim ? 3.5 : 4.5),
        (G.scale.y = 12.5),
        (G.scale.z = 4.5),
        f6(U, 40, 32, this.slim ? 3 : 4, 12, 4));
    });
    let E = new W6();
    (E.add(q, G),
      this.modelListeners.push(() => {
        E.position.x = this.slim ? -0.5 : -1;
      }),
      (E.position.y = -4),
      (this.rightArm = new K$(q, G)),
      (this.rightArm.name = "rightArm"),
      this.rightArm.add(E),
      (this.rightArm.position.x = -5),
      (this.rightArm.position.y = -2),
      this.add(this.rightArm));
    let F = new t0(),
      O = new u0(F, this.layer1MaterialBiased);
    this.modelListeners.push(() => {
      ((O.scale.x = this.slim ? 3 : 4),
        (O.scale.y = 12),
        (O.scale.z = 4),
        f6(F, 32, 48, this.slim ? 3 : 4, 12, 4));
    });
    let _ = new t0(),
      N = new u0(_, this.layer2MaterialBiased);
    this.modelListeners.push(() => {
      ((N.scale.x = this.slim ? 3.5 : 4.5),
        (N.scale.y = 12.5),
        (N.scale.z = 4.5),
        f6(_, 48, 48, this.slim ? 3 : 4, 12, 4));
    });
    let V = new W6();
    (V.add(O, N),
      this.modelListeners.push(() => {
        V.position.x = this.slim ? 0.5 : 1;
      }),
      (V.position.y = -4),
      (this.leftArm = new K$(O, N)),
      (this.leftArm.name = "leftArm"),
      this.leftArm.add(V),
      (this.leftArm.position.x = 5),
      (this.leftArm.position.y = -2),
      this.add(this.leftArm));
    let k = new t0(4, 12, 4);
    f6(k, 0, 16, 4, 12, 4);
    let M = new u0(k, this.layer1MaterialBiased),
      A = new t0(4.5, 12.5, 4.5);
    f6(A, 0, 32, 4, 12, 4);
    let L = new u0(A, this.layer2MaterialBiased),
      C = new W6();
    (C.add(M, L),
      (C.position.y = -6),
      (this.rightLeg = new K$(M, L)),
      (this.rightLeg.name = "rightLeg"),
      this.rightLeg.add(C),
      (this.rightLeg.position.x = -1.9),
      (this.rightLeg.position.y = -12),
      (this.rightLeg.position.z = -0.1),
      this.add(this.rightLeg));
    let g = new t0(4, 12, 4);
    f6(g, 16, 48, 4, 12, 4);
    let d = new u0(g, this.layer1MaterialBiased),
      R = new t0(4.5, 12.5, 4.5);
    f6(R, 0, 48, 4, 12, 4);
    let w = new u0(R, this.layer2MaterialBiased),
      s = new W6();
    (s.add(d, w),
      (s.position.y = -6),
      (this.leftLeg = new K$(d, w)),
      (this.leftLeg.name = "leftLeg"),
      this.leftLeg.add(s),
      (this.leftLeg.position.x = 1.9),
      (this.leftLeg.position.y = -12),
      (this.leftLeg.position.z = -0.1),
      this.add(this.leftLeg),
      (this.modelType = "default"));
  }
  get map() {
    return this._map;
  }
  set map($) {
    ((this._map = $),
      (this.layer1Material.map = $),
      (this.layer1Material.needsUpdate = !0),
      (this.layer1MaterialBiased.map = $),
      (this.layer1MaterialBiased.needsUpdate = !0),
      (this.layer2Material.map = $),
      (this.layer2Material.needsUpdate = !0),
      (this.layer2MaterialBiased.map = $),
      (this.layer2MaterialBiased.needsUpdate = !0));
  }
  get modelType() {
    return this.slim ? "slim" : "default";
  }
  set modelType($) {
    ((this.slim = $ === "slim"), this.modelListeners.forEach((J) => J()));
  }
  getBodyParts() {
    return this.children.filter(($) => $ instanceof K$);
  }
  setInnerLayerVisible($) {
    this.getBodyParts().forEach((J) => (J.innerLayer.visible = $));
  }
  setOuterLayerVisible($) {
    this.getBodyParts().forEach((J) => (J.outerLayer.visible = $));
  }
  resetJoints() {
    (this.head.rotation.set(0, 0, 0),
      this.leftArm.rotation.set(0, 0, 0),
      this.rightArm.rotation.set(0, 0, 0),
      this.leftLeg.rotation.set(0, 0, 0),
      this.rightLeg.rotation.set(0, 0, 0),
      this.body.rotation.set(0, 0, 0),
      (this.head.position.y = 0),
      (this.body.position.y = -6),
      (this.body.position.z = 0),
      (this.rightArm.position.x = -5),
      (this.rightArm.position.y = -2),
      (this.rightArm.position.z = 0),
      (this.leftArm.position.x = 5),
      (this.leftArm.position.y = -2),
      (this.leftArm.position.z = 0),
      (this.rightLeg.position.x = -1.9),
      (this.rightLeg.position.y = -12),
      (this.rightLeg.position.z = -0.1),
      (this.leftLeg.position.x = 1.9),
      (this.leftLeg.position.y = -12),
      (this.leftLeg.position.z = -0.1));
  }
}
class W9 extends W6 {
  constructor() {
    super();
    (Object.defineProperty(this, "cape", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0,
    }),
      Object.defineProperty(this, "material", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.material = new I$({
        side: n5,
        transparent: !0,
        alphaTest: 0.00001,
      })));
    let $ = new t0(10, 16, 1);
    (YJ($, 0, 0, 10, 16, 1),
      (this.cape = new u0($, this.material)),
      (this.cape.position.y = -8),
      (this.cape.position.z = 0.5),
      this.add(this.cape));
  }
  get map() {
    return this.material.map;
  }
  set map($) {
    ((this.material.map = $), (this.material.needsUpdate = !0));
  }
}
class Y9 extends W6 {
  constructor() {
    super();
    (Object.defineProperty(this, "leftWing", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0,
    }),
      Object.defineProperty(this, "rightWing", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "material", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.material = new I$({
        side: n5,
        transparent: !0,
        alphaTest: 0.00001,
      })));
    let $ = new t0(12, 22, 4);
    YJ($, 22, 0, 10, 20, 2);
    let J = new u0($, this.material);
    ((J.position.x = -5),
      (J.position.y = -10),
      (J.position.z = -1),
      (this.leftWing = new W6()),
      this.leftWing.add(J),
      this.add(this.leftWing));
    let Z = new t0(12, 22, 4);
    YJ(Z, 22, 0, 10, 20, 2);
    let Q = new u0(Z, this.material);
    ((Q.scale.x = -1),
      (Q.position.x = 5),
      (Q.position.y = -10),
      (Q.position.z = -1),
      (this.rightWing = new W6()),
      this.rightWing.add(Q),
      this.add(this.rightWing),
      (this.leftWing.position.x = 5),
      (this.leftWing.rotation.x = 0.2617994),
      this.resetJoints());
  }
  resetJoints() {
    ((this.leftWing.rotation.y = 0.01),
      (this.leftWing.rotation.z = 0.2617994),
      this.updateRightWing());
  }
  updateRightWing() {
    ((this.rightWing.position.x = -this.leftWing.position.x),
      (this.rightWing.position.y = this.leftWing.position.y),
      (this.rightWing.rotation.x = this.leftWing.rotation.x),
      (this.rightWing.rotation.y = -this.leftWing.rotation.y),
      (this.rightWing.rotation.z = -this.leftWing.rotation.z));
  }
  get map() {
    return this.material.map;
  }
  set map($) {
    ((this.material.map = $), (this.material.needsUpdate = !0));
  }
}
class X9 extends W6 {
  constructor() {
    super();
    (Object.defineProperty(this, "rightEar", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0,
    }),
      Object.defineProperty(this, "leftEar", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "material", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.material = new I$({ side: h8 })));
    let $ = new t0(8, 8, 1.3333333333333333);
    (XJ($, 0, 0, 6, 6, 1, 14, 7),
      (this.rightEar = new u0($, this.material)),
      (this.rightEar.name = "rightEar"),
      (this.rightEar.position.x = -6),
      this.add(this.rightEar),
      (this.leftEar = new u0($, this.material)),
      (this.leftEar.name = "leftEar"),
      (this.leftEar.position.x = 6),
      this.add(this.leftEar));
  }
  get map() {
    return this.material.map;
  }
  set map($) {
    ((this.material.map = $), (this.material.needsUpdate = !0));
  }
}
var Z9 = (10.8 * Math.PI) / 180;
class W8 extends W6 {
  constructor() {
    super();
    (Object.defineProperty(this, "skin", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0,
    }),
      Object.defineProperty(this, "cape", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "elytra", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "ears", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.skin = new Q9()),
      (this.skin.name = "skin"),
      (this.skin.position.y = 8),
      this.add(this.skin),
      (this.cape = new W9()),
      (this.cape.name = "cape"),
      (this.cape.position.y = 8),
      (this.cape.position.z = -2),
      (this.cape.rotation.x = Z9),
      (this.cape.rotation.y = Math.PI),
      this.add(this.cape),
      (this.elytra = new Y9()),
      (this.elytra.name = "elytra"),
      (this.elytra.position.y = 8),
      (this.elytra.position.z = -2),
      (this.elytra.visible = !1),
      this.add(this.elytra),
      (this.ears = new X9()),
      (this.ears.name = "ears"),
      (this.ears.position.y = 10),
      (this.ears.position.z = 0.6666666666666666),
      (this.ears.visible = !1),
      this.skin.head.add(this.ears));
  }
  get backEquipment() {
    if (this.cape.visible) return "cape";
    else if (this.elytra.visible) return "elytra";
    else return null;
  }
  set backEquipment($) {
    ((this.cape.visible = $ === "cape"),
      (this.elytra.visible = $ === "elytra"));
  }
  resetJoints() {
    (this.skin.resetJoints(),
      (this.cape.rotation.x = Z9),
      (this.cape.position.y = 8),
      (this.cape.position.z = -2),
      (this.elytra.position.y = 8),
      (this.elytra.position.z = -2),
      (this.elytra.rotation.x = 0),
      this.elytra.resetJoints());
  }
}
function V5($) {
  return (
    $ instanceof HTMLImageElement ||
    $ instanceof HTMLVideoElement ||
    $ instanceof HTMLCanvasElement ||
    (typeof ImageBitmap < "u" && $ instanceof ImageBitmap) ||
    (typeof OffscreenCanvas < "u" && $ instanceof OffscreenCanvas)
  );
}
function KJ($, J, Z, Q, W) {
  let Y = $.getImageData(J, Z, Q, W);
  for (let K = 0; K < Q; K++)
    for (let X = 0; X < W; X++) {
      let H = (K + X * Q) * 4;
      if (Y.data[H + 3] !== 255) return !0;
    }
  return !1;
}
function Y8($) {
  return $ / 64;
}
function K9($, J, Z) {
  if (Z) {
    if (KJ($, 0, 0, J, J)) return;
  } else if (KJ($, 0, 0, J, J / 2)) return;
  let Q = Y8(J),
    W = (Y, K, X, H) => $.clearRect(Y * Q, K * Q, X * Q, H * Q);
  if (
    (W(40, 0, 8, 8),
    W(48, 0, 8, 8),
    W(32, 8, 8, 8),
    W(40, 8, 8, 8),
    W(48, 8, 8, 8),
    W(56, 8, 8, 8),
    Z)
  )
    (W(4, 32, 4, 4),
      W(8, 32, 4, 4),
      W(0, 36, 4, 12),
      W(4, 36, 4, 12),
      W(8, 36, 4, 12),
      W(12, 36, 4, 12),
      W(20, 32, 8, 4),
      W(28, 32, 8, 4),
      W(16, 36, 4, 12),
      W(20, 36, 8, 12),
      W(28, 36, 4, 12),
      W(32, 36, 8, 12),
      W(44, 32, 4, 4),
      W(48, 32, 4, 4),
      W(40, 36, 4, 12),
      W(44, 36, 4, 12),
      W(48, 36, 4, 12),
      W(52, 36, 12, 12),
      W(4, 48, 4, 4),
      W(8, 48, 4, 4),
      W(0, 52, 4, 12),
      W(4, 52, 4, 12),
      W(8, 52, 4, 12),
      W(12, 52, 4, 12),
      W(52, 48, 4, 4),
      W(56, 48, 4, 4),
      W(48, 52, 4, 12),
      W(52, 52, 4, 12),
      W(56, 52, 4, 12),
      W(60, 52, 4, 12));
}
function g4($, J) {
  ($.save(), $.scale(-1, 1));
  let Z = Y8(J),
    Q = (W, Y, K, X, H, q) =>
      $.drawImage(
        $.canvas,
        W * Z,
        Y * Z,
        K * Z,
        X * Z,
        -H * Z,
        q * Z,
        -K * Z,
        X * Z,
      );
  (Q(4, 16, 4, 4, 20, 48),
    Q(8, 16, 4, 4, 24, 48),
    Q(0, 20, 4, 12, 24, 52),
    Q(4, 20, 4, 12, 20, 52),
    Q(8, 20, 4, 12, 16, 52),
    Q(12, 20, 4, 12, 28, 52),
    Q(44, 16, 4, 4, 36, 48),
    Q(48, 16, 4, 4, 40, 48),
    Q(40, 20, 4, 12, 40, 52),
    Q(44, 20, 4, 12, 36, 52),
    Q(48, 20, 4, 12, 32, 52),
    Q(52, 20, 4, 12, 44, 52),
    $.restore());
}
function H9($, J) {
  let Z = !1;
  if (J.width !== J.height)
    if (J.width === 2 * J.height) Z = !0;
    else throw Error(`Bad skin size: ${J.width}x${J.height}`);
  let Q = $.getContext("2d", { willReadFrequently: !0 });
  if (Z) {
    let W = J.width;
    (($.width = W),
      ($.height = W),
      Q.clearRect(0, 0, W, W),
      Q.drawImage(J, 0, 0, W, W / 2),
      g4(Q, W),
      K9(Q, $.width, !1));
  } else
    (($.width = J.width),
      ($.height = J.height),
      Q.clearRect(0, 0, J.width, J.height),
      Q.drawImage(J, 0, 0, $.width, $.height),
      K9(Q, $.width, !0));
}
function m4($) {
  if ($.width === 2 * $.height) return $.width / 64;
  else if ($.width * 17 === $.height * 22) return $.width / 22;
  else if ($.width * 11 === $.height * 23) return $.width / 46;
  else throw Error(`Bad cape size: ${$.width}x${$.height}`);
}
function q9($, J) {
  let Z = m4(J);
  (($.width = 64 * Z), ($.height = 32 * Z));
  let Q = $.getContext("2d", { willReadFrequently: !0 });
  (Q.clearRect(0, 0, $.width, $.height),
    Q.drawImage(J, 0, 0, J.width, J.height));
}
function p4($, J, Z, Q, W) {
  let Y = $.getImageData(J, Z, Q, W);
  for (let K = 0; K < Q; K++)
    for (let X = 0; X < W; X++) {
      let H = (K + X * Q) * 4;
      if (!(
        Y.data[H + 0] === 0 &&
        Y.data[H + 1] === 0 &&
        Y.data[H + 2] === 0 &&
        Y.data[H + 3] === 255
      ))
        return !1;
    }
  return !0;
}
function u4($, J, Z, Q, W) {
  let Y = $.getImageData(J, Z, Q, W);
  for (let K = 0; K < Q; K++)
    for (let X = 0; X < W; X++) {
      let H = (K + X * Q) * 4;
      if (!(
        Y.data[H + 0] === 255 &&
        Y.data[H + 1] === 255 &&
        Y.data[H + 2] === 255 &&
        Y.data[H + 3] === 255
      ))
        return !1;
    }
  return !0;
}
function G9($) {
  let J = Y8($.width),
    Z = $.getContext("2d", { willReadFrequently: !0 }),
    Q = (X, H, q, U) => KJ(Z, X * J, H * J, q * J, U * J),
    W = (X, H, q, U) => p4(Z, X * J, H * J, q * J, U * J),
    Y = (X, H, q, U) => u4(Z, X * J, H * J, q * J, U * J);
  return Q(50, 16, 2, 4) ||
    Q(54, 20, 2, 12) ||
    Q(42, 48, 2, 4) ||
    Q(46, 52, 2, 12) ||
    (W(50, 16, 2, 4) &&
      W(54, 20, 2, 12) &&
      W(42, 48, 2, 4) &&
      W(46, 52, 2, 12)) ||
    (Y(50, 16, 2, 4) && Y(54, 20, 2, 12) && Y(42, 48, 2, 4) && Y(46, 52, 2, 12))
    ? "slim"
    : "default";
}
function l4($) {
  if ($.width === $.height * 2 && $.height % 7 === 0) return $.height / 7;
  else throw Error(`Bad ears size: ${$.width}x${$.height}`);
}
function U9($, J) {
  let Z = l4(J);
  (($.width = 14 * Z), ($.height = 7 * Z));
  let Q = $.getContext("2d", { willReadFrequently: !0 });
  (Q.clearRect(0, 0, $.width, $.height),
    Q.drawImage(J, 0, 0, J.width, J.height));
}
function HJ($, J) {
  if (J.width !== J.height && J.width !== 2 * J.height)
    throw Error(`Bad skin size: ${J.width}x${J.height}`);
  let Z = Y8(J.width),
    Q = 14 * Z,
    W = 7 * Z;
  (($.width = Q), ($.height = W));
  let Y = $.getContext("2d", { willReadFrequently: !0 });
  (Y.clearRect(0, 0, Q, W), Y.drawImage(J, 24 * Z, 0, Q, W, 0, 0, Q, W));
}
async function N5($) {
  let J = document.createElement("img");
  return new Promise((Z, Q) => {
    if (
      ((J.onload = () => Z(J)),
      (J.onerror = Q),
      (J.crossOrigin = "anonymous"),
      typeof $ === "string")
    )
      J.src = $;
    else {
      if ($.crossOrigin !== void 0) J.crossOrigin = $.crossOrigin;
      if ($.referrerPolicy !== void 0) J.referrerPolicy = $.referrerPolicy;
      J.src = $.src;
    }
  });
}
var E9 = { type: "change" },
  qJ = { type: "start" },
  V9 = { type: "end" },
  X8 = new i5(),
  N9 = new g6(),
  d4 = Math.cos(70 * O7.DEG2RAD);
class GJ extends J$ {
  constructor($, J) {
    super();
    ((this.object = $),
      (this.domElement = J),
      (this.domElement.style.touchAction = "none"),
      (this.enabled = !0),
      (this.target = new S()),
      (this.minDistance = 0),
      (this.maxDistance = 1 / 0),
      (this.minZoom = 0),
      (this.maxZoom = 1 / 0),
      (this.minPolarAngle = 0),
      (this.maxPolarAngle = Math.PI),
      (this.minAzimuthAngle = -1 / 0),
      (this.maxAzimuthAngle = 1 / 0),
      (this.enableDamping = !1),
      (this.dampingFactor = 0.05),
      (this.enableZoom = !0),
      (this.zoomSpeed = 1),
      (this.enableRotate = !0),
      (this.rotateSpeed = 1),
      (this.enablePan = !0),
      (this.panSpeed = 1),
      (this.screenSpacePanning = !0),
      (this.keyPanSpeed = 7),
      (this.zoomToCursor = !1),
      (this.autoRotate = !1),
      (this.autoRotateSpeed = 2),
      (this.keys = {
        LEFT: "ArrowLeft",
        UP: "ArrowUp",
        RIGHT: "ArrowRight",
        BOTTOM: "ArrowDown",
      }),
      (this.mouseButtons = {
        LEFT: D$.ROTATE,
        MIDDLE: D$.DOLLY,
        RIGHT: D$.PAN,
      }),
      (this.touches = { ONE: O$.ROTATE, TWO: O$.DOLLY_PAN }),
      (this.target0 = this.target.clone()),
      (this.position0 = this.object.position.clone()),
      (this.zoom0 = this.object.zoom),
      (this._domElementKeyEvents = null),
      (this.getPolarAngle = function () {
        return K.phi;
      }),
      (this.getAzimuthalAngle = function () {
        return K.theta;
      }),
      (this.getDistance = function () {
        return this.object.position.distanceTo(this.target);
      }),
      (this.listenToKeyEvents = function (z) {
        (z.addEventListener("keydown", B), (this._domElementKeyEvents = z));
      }),
      (this.stopListenToKeyEvents = function () {
        (this._domElementKeyEvents.removeEventListener("keydown", B),
          (this._domElementKeyEvents = null));
      }),
      (this.saveState = function () {
        (Z.target0.copy(Z.target),
          Z.position0.copy(Z.object.position),
          (Z.zoom0 = Z.object.zoom));
      }),
      (this.reset = function () {
        (Z.target.copy(Z.target0),
          Z.object.position.copy(Z.position0),
          (Z.object.zoom = Z.zoom0),
          Z.object.updateProjectionMatrix(),
          Z.dispatchEvent(E9),
          Z.update(),
          (W = Q.NONE));
      }),
      (this.update = (function () {
        let z = new S(),
          o = new l6().setFromUnitVectors($.up, new S(0, 1, 0)),
          q0 = o.clone().invert(),
          Y0 = new S(),
          U0 = new l6(),
          N0 = new S(),
          w0 = 2 * Math.PI;
        return function (P = null) {
          let K0 = Z.object.position;
          if (
            (z.copy(K0).sub(Z.target),
            z.applyQuaternion(o),
            K.setFromVector3(z),
            Z.autoRotate && W === Q.NONE)
          )
            w(d(P));
          if (Z.enableDamping)
            ((K.theta += X.theta * Z.dampingFactor),
              (K.phi += X.phi * Z.dampingFactor));
          else ((K.theta += X.theta), (K.phi += X.phi));
          let { minAzimuthAngle: x, maxAzimuthAngle: $0 } = Z;
          if (isFinite(x) && isFinite($0)) {
            if (x < -Math.PI) x += w0;
            else if (x > Math.PI) x -= w0;
            if ($0 < -Math.PI) $0 += w0;
            else if ($0 > Math.PI) $0 -= w0;
            if (x <= $0) K.theta = Math.max(x, Math.min($0, K.theta));
            else
              K.theta =
                K.theta > (x + $0) / 2
                  ? Math.max(x, K.theta)
                  : Math.min($0, K.theta);
          }
          if (
            ((K.phi = Math.max(
              Z.minPolarAngle,
              Math.min(Z.maxPolarAngle, K.phi),
            )),
            K.makeSafe(),
            Z.enableDamping === !0)
          )
            Z.target.addScaledVector(q, Z.dampingFactor);
          else Z.target.add(q);
          if ((Z.zoomToCursor && L) || Z.object.isOrthographicCamera)
            K.radius = u(K.radius);
          else K.radius = u(K.radius * H);
          if (
            (z.setFromSpherical(K),
            z.applyQuaternion(q0),
            K0.copy(Z.target).add(z),
            Z.object.lookAt(Z.target),
            Z.enableDamping === !0)
          )
            ((X.theta *= 1 - Z.dampingFactor),
              (X.phi *= 1 - Z.dampingFactor),
              q.multiplyScalar(1 - Z.dampingFactor));
          else (X.set(0, 0, 0), q.set(0, 0, 0));
          let H0 = !1;
          if (Z.zoomToCursor && L) {
            let S0 = null;
            if (Z.object.isPerspectiveCamera) {
              let m0 = z.length();
              S0 = u(m0 * H);
              let r0 = m0 - S0;
              (Z.object.position.addScaledVector(M, r0),
                Z.object.updateMatrixWorld());
            } else if (Z.object.isOrthographicCamera) {
              let m0 = new S(A.x, A.y, 0);
              (m0.unproject(Z.object),
                (Z.object.zoom = Math.max(
                  Z.minZoom,
                  Math.min(Z.maxZoom, Z.object.zoom / H),
                )),
                Z.object.updateProjectionMatrix(),
                (H0 = !0));
              let r0 = new S(A.x, A.y, 0);
              (r0.unproject(Z.object),
                Z.object.position.sub(r0).add(m0),
                Z.object.updateMatrixWorld(),
                (S0 = z.length()));
            } else
              (console.warn(
                "WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.",
              ),
                (Z.zoomToCursor = !1));
            if (S0 !== null)
              if (this.screenSpacePanning)
                Z.target
                  .set(0, 0, -1)
                  .transformDirection(Z.object.matrix)
                  .multiplyScalar(S0)
                  .add(Z.object.position);
              else if (
                (X8.origin.copy(Z.object.position),
                X8.direction.set(0, 0, -1).transformDirection(Z.object.matrix),
                Math.abs(Z.object.up.dot(X8.direction)) < d4)
              )
                $.lookAt(Z.target);
              else
                (N9.setFromNormalAndCoplanarPoint(Z.object.up, Z.target),
                  X8.intersectPlane(N9, Z.target));
          } else if (Z.object.isOrthographicCamera)
            ((Z.object.zoom = Math.max(
              Z.minZoom,
              Math.min(Z.maxZoom, Z.object.zoom / H),
            )),
              Z.object.updateProjectionMatrix(),
              (H0 = !0));
          if (
            ((H = 1),
            (L = !1),
            H0 ||
              Y0.distanceToSquared(Z.object.position) > Y ||
              8 * (1 - U0.dot(Z.object.quaternion)) > Y ||
              N0.distanceToSquared(Z.target) > 0)
          )
            return (
              Z.dispatchEvent(E9),
              Y0.copy(Z.object.position),
              U0.copy(Z.object.quaternion),
              N0.copy(Z.target),
              (H0 = !1),
              !0
            );
          return !1;
        };
      })()),
      (this.dispose = function () {
        if (
          (Z.domElement.removeEventListener("contextmenu", Z0),
          Z.domElement.removeEventListener("pointerdown", P0),
          Z.domElement.removeEventListener("pointercancel", c0),
          Z.domElement.removeEventListener("wheel", R6),
          Z.domElement.removeEventListener("pointermove", y0),
          Z.domElement.removeEventListener("pointerup", c0),
          Z._domElementKeyEvents !== null)
        )
          (Z._domElementKeyEvents.removeEventListener("keydown", B),
            (Z._domElementKeyEvents = null));
      }));
    let Z = this,
      Q = {
        NONE: -1,
        ROTATE: 0,
        DOLLY: 1,
        PAN: 2,
        TOUCH_ROTATE: 3,
        TOUCH_PAN: 4,
        TOUCH_DOLLY_PAN: 5,
        TOUCH_DOLLY_ROTATE: 6,
      },
      W = Q.NONE,
      Y = 0.000001,
      K = new Q8(),
      X = new Q8(),
      H = 1,
      q = new S(),
      U = new R0(),
      G = new R0(),
      E = new R0(),
      F = new R0(),
      O = new R0(),
      _ = new R0(),
      N = new R0(),
      V = new R0(),
      k = new R0(),
      M = new S(),
      A = new R0(),
      L = !1,
      C = [],
      g = {};
    function d(z) {
      if (z !== null) return ((2 * Math.PI) / 60) * Z.autoRotateSpeed * z;
      else return ((2 * Math.PI) / 60 / 60) * Z.autoRotateSpeed;
    }
    function R() {
      return Math.pow(0.95, Z.zoomSpeed);
    }
    function w(z) {
      X.theta -= z;
    }
    function s(z) {
      X.phi -= z;
    }
    let W0 = (function () {
        let z = new S();
        return function (q0, Y0) {
          (z.setFromMatrixColumn(Y0, 0), z.multiplyScalar(-q0), q.add(z));
        };
      })(),
      h = (function () {
        let z = new S();
        return function (q0, Y0) {
          if (Z.screenSpacePanning === !0) z.setFromMatrixColumn(Y0, 1);
          else (z.setFromMatrixColumn(Y0, 0), z.crossVectors(Z.object.up, z));
          (z.multiplyScalar(q0), q.add(z));
        };
      })(),
      y = (function () {
        let z = new S();
        return function (q0, Y0) {
          let U0 = Z.domElement;
          if (Z.object.isPerspectiveCamera) {
            let N0 = Z.object.position;
            z.copy(N0).sub(Z.target);
            let w0 = z.length();
            ((w0 *= Math.tan(((Z.object.fov / 2) * Math.PI) / 180)),
              W0((2 * q0 * w0) / U0.clientHeight, Z.object.matrix),
              h((2 * Y0 * w0) / U0.clientHeight, Z.object.matrix));
          } else if (Z.object.isOrthographicCamera)
            (W0(
              (q0 * (Z.object.right - Z.object.left)) /
                Z.object.zoom /
                U0.clientWidth,
              Z.object.matrix,
            ),
              h(
                (Y0 * (Z.object.top - Z.object.bottom)) /
                  Z.object.zoom /
                  U0.clientHeight,
                Z.object.matrix,
              ));
          else
            (console.warn(
              "WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.",
            ),
              (Z.enablePan = !1));
        };
      })();
    function l(z) {
      if (Z.object.isPerspectiveCamera || Z.object.isOrthographicCamera) H /= z;
      else
        (console.warn(
          "WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.",
        ),
          (Z.enableZoom = !1));
    }
    function r(z) {
      if (Z.object.isPerspectiveCamera || Z.object.isOrthographicCamera) H *= z;
      else
        (console.warn(
          "WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.",
        ),
          (Z.enableZoom = !1));
    }
    function c(z) {
      if (!Z.zoomToCursor) return;
      L = !0;
      let o = Z.domElement.getBoundingClientRect(),
        q0 = z.clientX - o.left,
        Y0 = z.clientY - o.top,
        U0 = o.width,
        N0 = o.height;
      ((A.x = (q0 / U0) * 2 - 1),
        (A.y = -(Y0 / N0) * 2 + 1),
        M.set(A.x, A.y, 1)
          .unproject(Z.object)
          .sub(Z.object.position)
          .normalize());
    }
    function u(z) {
      return Math.max(Z.minDistance, Math.min(Z.maxDistance, z));
    }
    function i(z) {
      U.set(z.clientX, z.clientY);
    }
    function T(z) {
      (c(z), N.set(z.clientX, z.clientY));
    }
    function n(z) {
      F.set(z.clientX, z.clientY);
    }
    function J0(z) {
      (G.set(z.clientX, z.clientY),
        E.subVectors(G, U).multiplyScalar(Z.rotateSpeed));
      let o = Z.domElement;
      (w((2 * Math.PI * E.x) / o.clientHeight),
        s((2 * Math.PI * E.y) / o.clientHeight),
        U.copy(G),
        Z.update());
    }
    function E0(z) {
      if ((V.set(z.clientX, z.clientY), k.subVectors(V, N), k.y > 0)) l(R());
      else if (k.y < 0) r(R());
      (N.copy(V), Z.update());
    }
    function G0(z) {
      (O.set(z.clientX, z.clientY),
        _.subVectors(O, F).multiplyScalar(Z.panSpeed),
        y(_.x, _.y),
        F.copy(O),
        Z.update());
    }
    function V0(z) {
      if ((c(z), z.deltaY < 0)) r(R());
      else if (z.deltaY > 0) l(R());
      Z.update();
    }
    function v0(z) {
      let o = !1;
      switch (z.code) {
        case Z.keys.UP:
          if (z.ctrlKey || z.metaKey || z.shiftKey)
            s((2 * Math.PI * Z.rotateSpeed) / Z.domElement.clientHeight);
          else y(0, Z.keyPanSpeed);
          o = !0;
          break;
        case Z.keys.BOTTOM:
          if (z.ctrlKey || z.metaKey || z.shiftKey)
            s((-2 * Math.PI * Z.rotateSpeed) / Z.domElement.clientHeight);
          else y(0, -Z.keyPanSpeed);
          o = !0;
          break;
        case Z.keys.LEFT:
          if (z.ctrlKey || z.metaKey || z.shiftKey)
            w((2 * Math.PI * Z.rotateSpeed) / Z.domElement.clientHeight);
          else y(Z.keyPanSpeed, 0);
          o = !0;
          break;
        case Z.keys.RIGHT:
          if (z.ctrlKey || z.metaKey || z.shiftKey)
            w((-2 * Math.PI * Z.rotateSpeed) / Z.domElement.clientHeight);
          else y(-Z.keyPanSpeed, 0);
          o = !0;
          break;
      }
      if (o) (z.preventDefault(), Z.update());
    }
    function e() {
      if (C.length === 1) U.set(C[0].pageX, C[0].pageY);
      else {
        let z = 0.5 * (C[0].pageX + C[1].pageX),
          o = 0.5 * (C[0].pageY + C[1].pageY);
        U.set(z, o);
      }
    }
    function z0() {
      if (C.length === 1) F.set(C[0].pageX, C[0].pageY);
      else {
        let z = 0.5 * (C[0].pageX + C[1].pageX),
          o = 0.5 * (C[0].pageY + C[1].pageY);
        F.set(z, o);
      }
    }
    function g0() {
      let z = C[0].pageX - C[1].pageX,
        o = C[0].pageY - C[1].pageY,
        q0 = Math.sqrt(z * z + o * o);
      N.set(0, q0);
    }
    function Y6() {
      if (Z.enableZoom) g0();
      if (Z.enablePan) z0();
    }
    function f() {
      if (Z.enableZoom) g0();
      if (Z.enableRotate) e();
    }
    function o0(z) {
      if (C.length == 1) G.set(z.pageX, z.pageY);
      else {
        let q0 = Q0(z),
          Y0 = 0.5 * (z.pageX + q0.x),
          U0 = 0.5 * (z.pageY + q0.y);
        G.set(Y0, U0);
      }
      E.subVectors(G, U).multiplyScalar(Z.rotateSpeed);
      let o = Z.domElement;
      (w((2 * Math.PI * E.x) / o.clientHeight),
        s((2 * Math.PI * E.y) / o.clientHeight),
        U.copy(G));
    }
    function b0(z) {
      if (C.length === 1) O.set(z.pageX, z.pageY);
      else {
        let o = Q0(z),
          q0 = 0.5 * (z.pageX + o.x),
          Y0 = 0.5 * (z.pageY + o.y);
        O.set(q0, Y0);
      }
      (_.subVectors(O, F).multiplyScalar(Z.panSpeed), y(_.x, _.y), F.copy(O));
    }
    function O0(z) {
      let o = Q0(z),
        q0 = z.pageX - o.x,
        Y0 = z.pageY - o.y,
        U0 = Math.sqrt(q0 * q0 + Y0 * Y0);
      (V.set(0, U0),
        k.set(0, Math.pow(V.y / N.y, Z.zoomSpeed)),
        l(k.y),
        N.copy(V));
    }
    function C0(z) {
      if (Z.enableZoom) O0(z);
      if (Z.enablePan) b0(z);
    }
    function n0(z) {
      if (Z.enableZoom) O0(z);
      if (Z.enableRotate) o0(z);
    }
    function P0(z) {
      if (Z.enabled === !1) return;
      if (C.length === 0)
        (Z.domElement.setPointerCapture(z.pointerId),
          Z.domElement.addEventListener("pointermove", y0),
          Z.domElement.addEventListener("pointerup", c0));
      if ((a(z), z.pointerType === "touch")) D(z);
      else p0(z);
    }
    function y0(z) {
      if (Z.enabled === !1) return;
      if (z.pointerType === "touch") v(z);
      else q6(z);
    }
    function c0(z) {
      if ((t(z), C.length === 0))
        (Z.domElement.releasePointerCapture(z.pointerId),
          Z.domElement.removeEventListener("pointermove", y0),
          Z.domElement.removeEventListener("pointerup", c0));
      (Z.dispatchEvent(V9), (W = Q.NONE));
    }
    function p0(z) {
      let o;
      switch (z.button) {
        case 0:
          o = Z.mouseButtons.LEFT;
          break;
        case 1:
          o = Z.mouseButtons.MIDDLE;
          break;
        case 2:
          o = Z.mouseButtons.RIGHT;
          break;
        default:
          o = -1;
      }
      switch (o) {
        case D$.DOLLY:
          if (Z.enableZoom === !1) return;
          (T(z), (W = Q.DOLLY));
          break;
        case D$.ROTATE:
          if (z.ctrlKey || z.metaKey || z.shiftKey) {
            if (Z.enablePan === !1) return;
            (n(z), (W = Q.PAN));
          } else {
            if (Z.enableRotate === !1) return;
            (i(z), (W = Q.ROTATE));
          }
          break;
        case D$.PAN:
          if (z.ctrlKey || z.metaKey || z.shiftKey) {
            if (Z.enableRotate === !1) return;
            (i(z), (W = Q.ROTATE));
          } else {
            if (Z.enablePan === !1) return;
            (n(z), (W = Q.PAN));
          }
          break;
        default:
          W = Q.NONE;
      }
      if (W !== Q.NONE) Z.dispatchEvent(qJ);
    }
    function q6(z) {
      switch (W) {
        case Q.ROTATE:
          if (Z.enableRotate === !1) return;
          J0(z);
          break;
        case Q.DOLLY:
          if (Z.enableZoom === !1) return;
          E0(z);
          break;
        case Q.PAN:
          if (Z.enablePan === !1) return;
          G0(z);
          break;
      }
    }
    function R6(z) {
      if (Z.enabled === !1 || Z.enableZoom === !1 || W !== Q.NONE) return;
      (z.preventDefault(), Z.dispatchEvent(qJ), V0(z), Z.dispatchEvent(V9));
    }
    function B(z) {
      if (Z.enabled === !1 || Z.enablePan === !1) return;
      v0(z);
    }
    function D(z) {
      switch ((_0(z), C.length)) {
        case 1:
          switch (Z.touches.ONE) {
            case O$.ROTATE:
              if (Z.enableRotate === !1) return;
              (e(), (W = Q.TOUCH_ROTATE));
              break;
            case O$.PAN:
              if (Z.enablePan === !1) return;
              (z0(), (W = Q.TOUCH_PAN));
              break;
            default:
              W = Q.NONE;
          }
          break;
        case 2:
          switch (Z.touches.TWO) {
            case O$.DOLLY_PAN:
              if (Z.enableZoom === !1 && Z.enablePan === !1) return;
              (Y6(), (W = Q.TOUCH_DOLLY_PAN));
              break;
            case O$.DOLLY_ROTATE:
              if (Z.enableZoom === !1 && Z.enableRotate === !1) return;
              (f(), (W = Q.TOUCH_DOLLY_ROTATE));
              break;
            default:
              W = Q.NONE;
          }
          break;
        default:
          W = Q.NONE;
      }
      if (W !== Q.NONE) Z.dispatchEvent(qJ);
    }
    function v(z) {
      switch ((_0(z), W)) {
        case Q.TOUCH_ROTATE:
          if (Z.enableRotate === !1) return;
          (o0(z), Z.update());
          break;
        case Q.TOUCH_PAN:
          if (Z.enablePan === !1) return;
          (b0(z), Z.update());
          break;
        case Q.TOUCH_DOLLY_PAN:
          if (Z.enableZoom === !1 && Z.enablePan === !1) return;
          (C0(z), Z.update());
          break;
        case Q.TOUCH_DOLLY_ROTATE:
          if (Z.enableZoom === !1 && Z.enableRotate === !1) return;
          (n0(z), Z.update());
          break;
        default:
          W = Q.NONE;
      }
    }
    function Z0(z) {
      if (Z.enabled === !1) return;
      z.preventDefault();
    }
    function a(z) {
      C.push(z);
    }
    function t(z) {
      delete g[z.pointerId];
      for (let o = 0; o < C.length; o++)
        if (C[o].pointerId == z.pointerId) {
          C.splice(o, 1);
          return;
        }
    }
    function _0(z) {
      let o = g[z.pointerId];
      if (o === void 0) ((o = new R0()), (g[z.pointerId] = o));
      o.set(z.pageX, z.pageY);
    }
    function Q0(z) {
      let o = z.pointerId === C[0].pointerId ? C[1] : C[0];
      return g[o.pointerId];
    }
    (Z.domElement.addEventListener("contextmenu", Z0),
      Z.domElement.addEventListener("pointerdown", P0),
      Z.domElement.addEventListener("pointercancel", c0),
      Z.domElement.addEventListener("wheel", R6, { passive: !1 }),
      this.update());
  }
}
var F9 = {
  name: "CopyShader",
  uniforms: { tDiffuse: { value: null }, opacity: { value: 1 } },
  vertexShader: `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
  fragmentShader: `

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`,
};
class H$ {
  constructor() {
    ((this.isPass = !0),
      (this.enabled = !0),
      (this.needsSwap = !0),
      (this.clear = !1),
      (this.renderToScreen = !1));
  }
  setSize() {}
  render() {
    console.error("THREE.Pass: .render() must be implemented in derived pass.");
  }
  dispose() {}
}
var c4 = new a5(-1, 1, 1, -1, 0, 1),
  UJ = new d6();
UJ.setAttribute("position", new x6([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3));
UJ.setAttribute("uv", new x6([0, 2, 0, 0, 2, 0], 2));
class EJ {
  constructor($) {
    this._mesh = new u0(UJ, $);
  }
  dispose() {
    this._mesh.geometry.dispose();
  }
  render($) {
    $.render(this._mesh, c4);
  }
  get material() {
    return this._mesh.material;
  }
  set material($) {
    this._mesh.material = $;
  }
}
class F5 extends H$ {
  constructor($, J) {
    super();
    if (((this.textureID = J !== void 0 ? J : "tDiffuse"), $ instanceof v6))
      ((this.uniforms = $.uniforms), (this.material = $));
    else if ($)
      ((this.uniforms = s8.clone($.uniforms)),
        (this.material = new v6({
          name: $.name !== void 0 ? $.name : "unspecified",
          defines: Object.assign({}, $.defines),
          uniforms: this.uniforms,
          vertexShader: $.vertexShader,
          fragmentShader: $.fragmentShader,
        })));
    this.fsQuad = new EJ(this.material);
  }
  render($, J, Z) {
    if (this.uniforms[this.textureID])
      this.uniforms[this.textureID].value = Z.texture;
    if (((this.fsQuad.material = this.material), this.renderToScreen))
      ($.setRenderTarget(null), this.fsQuad.render($));
    else {
      if (($.setRenderTarget(J), this.clear))
        $.clear($.autoClearColor, $.autoClearDepth, $.autoClearStencil);
      this.fsQuad.render($);
    }
  }
  dispose() {
    (this.material.dispose(), this.fsQuad.dispose());
  }
}
class K8 extends H$ {
  constructor($, J) {
    super();
    ((this.scene = $),
      (this.camera = J),
      (this.clear = !0),
      (this.needsSwap = !1),
      (this.inverse = !1));
  }
  render($, J, Z) {
    let Q = $.getContext(),
      W = $.state;
    (W.buffers.color.setMask(!1),
      W.buffers.depth.setMask(!1),
      W.buffers.color.setLocked(!0),
      W.buffers.depth.setLocked(!0));
    let Y, K;
    if (this.inverse) ((Y = 0), (K = 1));
    else ((Y = 1), (K = 0));
    if (
      (W.buffers.stencil.setTest(!0),
      W.buffers.stencil.setOp(Q.REPLACE, Q.REPLACE, Q.REPLACE),
      W.buffers.stencil.setFunc(Q.ALWAYS, Y, 4294967295),
      W.buffers.stencil.setClear(K),
      W.buffers.stencil.setLocked(!0),
      $.setRenderTarget(Z),
      this.clear)
    )
      $.clear();
    if (($.render(this.scene, this.camera), $.setRenderTarget(J), this.clear))
      $.clear();
    ($.render(this.scene, this.camera),
      W.buffers.color.setLocked(!1),
      W.buffers.depth.setLocked(!1),
      W.buffers.color.setMask(!0),
      W.buffers.depth.setMask(!0),
      W.buffers.stencil.setLocked(!1),
      W.buffers.stencil.setFunc(Q.EQUAL, 1, 4294967295),
      W.buffers.stencil.setOp(Q.KEEP, Q.KEEP, Q.KEEP),
      W.buffers.stencil.setLocked(!0));
  }
}
class VJ extends H$ {
  constructor() {
    super();
    this.needsSwap = !1;
  }
  render($) {
    ($.state.buffers.stencil.setLocked(!1),
      $.state.buffers.stencil.setTest(!1));
  }
}
class NJ {
  constructor($, J) {
    if (
      ((this.renderer = $),
      (this._pixelRatio = $.getPixelRatio()),
      J === void 0)
    ) {
      let Z = $.getSize(new R0());
      ((this._width = Z.width),
        (this._height = Z.height),
        (J = new S6(
          this._width * this._pixelRatio,
          this._height * this._pixelRatio,
          { type: D7 },
        )),
        (J.texture.name = "EffectComposer.rt1"));
    } else ((this._width = J.width), (this._height = J.height));
    ((this.renderTarget1 = J),
      (this.renderTarget2 = J.clone()),
      (this.renderTarget2.texture.name = "EffectComposer.rt2"),
      (this.writeBuffer = this.renderTarget1),
      (this.readBuffer = this.renderTarget2),
      (this.renderToScreen = !0),
      (this.passes = []),
      (this.copyPass = new F5(F9)),
      (this.copyPass.material.blending = N7),
      (this.clock = new E5()));
  }
  swapBuffers() {
    let $ = this.readBuffer;
    ((this.readBuffer = this.writeBuffer), (this.writeBuffer = $));
  }
  addPass($) {
    (this.passes.push($),
      $.setSize(
        this._width * this._pixelRatio,
        this._height * this._pixelRatio,
      ));
  }
  insertPass($, J) {
    (this.passes.splice(J, 0, $),
      $.setSize(
        this._width * this._pixelRatio,
        this._height * this._pixelRatio,
      ));
  }
  removePass($) {
    let J = this.passes.indexOf($);
    if (J !== -1) this.passes.splice(J, 1);
  }
  isLastEnabledPass($) {
    for (let J = $ + 1; J < this.passes.length; J++)
      if (this.passes[J].enabled) return !1;
    return !0;
  }
  render($) {
    if ($ === void 0) $ = this.clock.getDelta();
    let J = this.renderer.getRenderTarget(),
      Z = !1;
    for (let Q = 0, W = this.passes.length; Q < W; Q++) {
      let Y = this.passes[Q];
      if (Y.enabled === !1) continue;
      if (
        ((Y.renderToScreen = this.renderToScreen && this.isLastEnabledPass(Q)),
        Y.render(this.renderer, this.writeBuffer, this.readBuffer, $, Z),
        Y.needsSwap)
      ) {
        if (Z) {
          let K = this.renderer.getContext(),
            X = this.renderer.state.buffers.stencil;
          (X.setFunc(K.NOTEQUAL, 1, 4294967295),
            this.copyPass.render(
              this.renderer,
              this.writeBuffer,
              this.readBuffer,
              $,
            ),
            X.setFunc(K.EQUAL, 1, 4294967295));
        }
        this.swapBuffers();
      }
      if (K8 !== void 0) {
        if (Y instanceof K8) Z = !0;
        else if (Y instanceof VJ) Z = !1;
      }
    }
    this.renderer.setRenderTarget(J);
  }
  reset($) {
    if ($ === void 0) {
      let J = this.renderer.getSize(new R0());
      ((this._pixelRatio = this.renderer.getPixelRatio()),
        (this._width = J.width),
        (this._height = J.height),
        ($ = this.renderTarget1.clone()),
        $.setSize(
          this._width * this._pixelRatio,
          this._height * this._pixelRatio,
        ));
    }
    (this.renderTarget1.dispose(),
      this.renderTarget2.dispose(),
      (this.renderTarget1 = $),
      (this.renderTarget2 = $.clone()),
      (this.writeBuffer = this.renderTarget1),
      (this.readBuffer = this.renderTarget2));
  }
  setSize($, J) {
    ((this._width = $), (this._height = J));
    let Z = this._width * this._pixelRatio,
      Q = this._height * this._pixelRatio;
    (this.renderTarget1.setSize(Z, Q), this.renderTarget2.setSize(Z, Q));
    for (let W = 0; W < this.passes.length; W++) this.passes[W].setSize(Z, Q);
  }
  setPixelRatio($) {
    ((this._pixelRatio = $), this.setSize(this._width, this._height));
  }
  dispose() {
    (this.renderTarget1.dispose(),
      this.renderTarget2.dispose(),
      this.copyPass.dispose());
  }
}
class FJ extends H$ {
  constructor($, J, Z = null, Q = null, W = null) {
    super();
    ((this.scene = $),
      (this.camera = J),
      (this.overrideMaterial = Z),
      (this.clearColor = Q),
      (this.clearAlpha = W),
      (this.clear = !0),
      (this.clearDepth = !1),
      (this.needsSwap = !1),
      (this._oldClearColor = new h0()));
  }
  render($, J, Z) {
    let Q = $.autoClear;
    $.autoClear = !1;
    let W, Y;
    if (this.overrideMaterial !== null)
      ((Y = this.scene.overrideMaterial),
        (this.scene.overrideMaterial = this.overrideMaterial));
    if (this.clearColor !== null)
      ($.getClearColor(this._oldClearColor), $.setClearColor(this.clearColor));
    if (this.clearAlpha !== null)
      ((W = $.getClearAlpha()), $.setClearAlpha(this.clearAlpha));
    if (this.clearDepth == !0) $.clearDepth();
    if (($.setRenderTarget(this.renderToScreen ? null : Z), this.clear === !0))
      $.clear($.autoClearColor, $.autoClearDepth, $.autoClearStencil);
    if (($.render(this.scene, this.camera), this.clearColor !== null))
      $.setClearColor(this._oldClearColor);
    if (this.clearAlpha !== null) $.setClearAlpha(W);
    if (this.overrideMaterial !== null) this.scene.overrideMaterial = Y;
    $.autoClear = Q;
  }
}
var R9 = {
  uniforms: {
    tDiffuse: { value: null },
    resolution: { value: new R0(0.0009765625, 0.001953125) },
  },
  vertexShader: `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
  fragmentShader: `
	precision highp float;

	uniform sampler2D tDiffuse;

	uniform vec2 resolution;

	varying vec2 vUv;

	// FXAA 3.11 implementation by NVIDIA, ported to WebGL by Agost Biro (biro@archilogic.com)

	//----------------------------------------------------------------------------------
	// File:        es3-keplerFXAAassetsshaders/FXAA_DefaultES.frag
	// SDK Version: v3.00
	// Email:       gameworks@nvidia.com
	// Site:        http://developer.nvidia.com/
	//
	// Copyright (c) 2014-2015, NVIDIA CORPORATION. All rights reserved.
	//
	// Redistribution and use in source and binary forms, with or without
	// modification, are permitted provided that the following conditions
	// are met:
	//  * Redistributions of source code must retain the above copyright
	//    notice, this list of conditions and the following disclaimer.
	//  * Redistributions in binary form must reproduce the above copyright
	//    notice, this list of conditions and the following disclaimer in the
	//    documentation and/or other materials provided with the distribution.
	//  * Neither the name of NVIDIA CORPORATION nor the names of its
	//    contributors may be used to endorse or promote products derived
	//    from this software without specific prior written permission.
	//
	// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS ''AS IS'' AND ANY
	// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
	// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
	// PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
	// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
	// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
	// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
	// PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
	// OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
	// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	//
	//----------------------------------------------------------------------------------

	#ifndef FXAA_DISCARD
			//
			// Only valid for PC OpenGL currently.
			// Probably will not work when FXAA_GREEN_AS_LUMA = 1.
			//
			// 1 = Use discard on pixels which don't need AA.
			//     For APIs which enable concurrent TEX+ROP from same surface.
			// 0 = Return unchanged color on pixels which don't need AA.
			//
			#define FXAA_DISCARD 0
	#endif

	/*--------------------------------------------------------------------------*/
	#define FxaaTexTop(t, p) texture2D(t, p, -100.0)
	#define FxaaTexOff(t, p, o, r) texture2D(t, p + (o * r), -100.0)
	/*--------------------------------------------------------------------------*/

	#define NUM_SAMPLES 5

	// assumes colors have premultipliedAlpha, so that the calculated color contrast is scaled by alpha
	float contrast( vec4 a, vec4 b ) {
			vec4 diff = abs( a - b );
			return max( max( max( diff.r, diff.g ), diff.b ), diff.a );
	}

	/*============================================================================

									FXAA3 QUALITY - PC

	============================================================================*/

	/*--------------------------------------------------------------------------*/
	vec4 FxaaPixelShader(
			vec2 posM,
			sampler2D tex,
			vec2 fxaaQualityRcpFrame,
			float fxaaQualityEdgeThreshold,
			float fxaaQualityinvEdgeThreshold
	) {
			vec4 rgbaM = FxaaTexTop(tex, posM);
			vec4 rgbaS = FxaaTexOff(tex, posM, vec2( 0.0, 1.0), fxaaQualityRcpFrame.xy);
			vec4 rgbaE = FxaaTexOff(tex, posM, vec2( 1.0, 0.0), fxaaQualityRcpFrame.xy);
			vec4 rgbaN = FxaaTexOff(tex, posM, vec2( 0.0,-1.0), fxaaQualityRcpFrame.xy);
			vec4 rgbaW = FxaaTexOff(tex, posM, vec2(-1.0, 0.0), fxaaQualityRcpFrame.xy);
			// . S .
			// W M E
			// . N .

			bool earlyExit = max( max( max(
					contrast( rgbaM, rgbaN ),
					contrast( rgbaM, rgbaS ) ),
					contrast( rgbaM, rgbaE ) ),
					contrast( rgbaM, rgbaW ) )
					< fxaaQualityEdgeThreshold;
			// . 0 .
			// 0 0 0
			// . 0 .

			#if (FXAA_DISCARD == 1)
					if(earlyExit) FxaaDiscard;
			#else
					if(earlyExit) return rgbaM;
			#endif

			float contrastN = contrast( rgbaM, rgbaN );
			float contrastS = contrast( rgbaM, rgbaS );
			float contrastE = contrast( rgbaM, rgbaE );
			float contrastW = contrast( rgbaM, rgbaW );

			float relativeVContrast = ( contrastN + contrastS ) - ( contrastE + contrastW );
			relativeVContrast *= fxaaQualityinvEdgeThreshold;

			bool horzSpan = relativeVContrast > 0.;
			// . 1 .
			// 0 0 0
			// . 1 .

			// 45 deg edge detection and corners of objects, aka V/H contrast is too similar
			if( abs( relativeVContrast ) < .3 ) {
					// locate the edge
					vec2 dirToEdge;
					dirToEdge.x = contrastE > contrastW ? 1. : -1.;
					dirToEdge.y = contrastS > contrastN ? 1. : -1.;
					// . 2 .      . 1 .
					// 1 0 2  ~=  0 0 1
					// . 1 .      . 0 .

					// tap 2 pixels and see which ones are "outside" the edge, to
					// determine if the edge is vertical or horizontal

					vec4 rgbaAlongH = FxaaTexOff(tex, posM, vec2( dirToEdge.x, -dirToEdge.y ), fxaaQualityRcpFrame.xy);
					float matchAlongH = contrast( rgbaM, rgbaAlongH );
					// . 1 .
					// 0 0 1
					// . 0 H

					vec4 rgbaAlongV = FxaaTexOff(tex, posM, vec2( -dirToEdge.x, dirToEdge.y ), fxaaQualityRcpFrame.xy);
					float matchAlongV = contrast( rgbaM, rgbaAlongV );
					// V 1 .
					// 0 0 1
					// . 0 .

					relativeVContrast = matchAlongV - matchAlongH;
					relativeVContrast *= fxaaQualityinvEdgeThreshold;

					if( abs( relativeVContrast ) < .3 ) { // 45 deg edge
							// 1 1 .
							// 0 0 1
							// . 0 1

							// do a simple blur
							return mix(
									rgbaM,
									(rgbaN + rgbaS + rgbaE + rgbaW) * .25,
									.4
							);
					}

					horzSpan = relativeVContrast > 0.;
			}

			if(!horzSpan) rgbaN = rgbaW;
			if(!horzSpan) rgbaS = rgbaE;
			// . 0 .      1
			// 1 0 1  ->  0
			// . 0 .      1

			bool pairN = contrast( rgbaM, rgbaN ) > contrast( rgbaM, rgbaS );
			if(!pairN) rgbaN = rgbaS;

			vec2 offNP;
			offNP.x = (!horzSpan) ? 0.0 : fxaaQualityRcpFrame.x;
			offNP.y = ( horzSpan) ? 0.0 : fxaaQualityRcpFrame.y;

			bool doneN = false;
			bool doneP = false;

			float nDist = 0.;
			float pDist = 0.;

			vec2 posN = posM;
			vec2 posP = posM;

			int iterationsUsed = 0;
			int iterationsUsedN = 0;
			int iterationsUsedP = 0;
			for( int i = 0; i < NUM_SAMPLES; i++ ) {
					iterationsUsed = i;

					float increment = float(i + 1);

					if(!doneN) {
							nDist += increment;
							posN = posM + offNP * nDist;
							vec4 rgbaEndN = FxaaTexTop(tex, posN.xy);
							doneN = contrast( rgbaEndN, rgbaM ) > contrast( rgbaEndN, rgbaN );
							iterationsUsedN = i;
					}

					if(!doneP) {
							pDist += increment;
							posP = posM - offNP * pDist;
							vec4 rgbaEndP = FxaaTexTop(tex, posP.xy);
							doneP = contrast( rgbaEndP, rgbaM ) > contrast( rgbaEndP, rgbaN );
							iterationsUsedP = i;
					}

					if(doneN || doneP) break;
			}


			if ( !doneP && !doneN ) return rgbaM; // failed to find end of edge

			float dist = min(
					doneN ? float( iterationsUsedN ) / float( NUM_SAMPLES - 1 ) : 1.,
					doneP ? float( iterationsUsedP ) / float( NUM_SAMPLES - 1 ) : 1.
			);

			// hacky way of reduces blurriness of mostly diagonal edges
			// but reduces AA quality
			dist = pow(dist, .5);

			dist = 1. - dist;

			return mix(
					rgbaM,
					rgbaN,
					dist * .5
			);
	}

	void main() {
			const float edgeDetectionQuality = .2;
			const float invEdgeDetectionQuality = 1. / edgeDetectionQuality;

			gl_FragColor = FxaaPixelShader(
					vUv,
					tDiffuse,
					resolution,
					edgeDetectionQuality, // [0,1] contrast needed, otherwise early discard
					invEdgeDetectionQuality
			);

	}
	`,
};
class RJ {
  constructor() {
    (Object.defineProperty(this, "speed", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 1,
    }),
      Object.defineProperty(this, "paused", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      }),
      Object.defineProperty(this, "progress", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      Object.defineProperty(this, "currentId", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      Object.defineProperty(this, "progress0", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new Map(),
      }),
      Object.defineProperty(this, "animationObjects", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new Map(),
      }));
  }
  update($, J) {
    if (this.paused) return;
    let Z = J * this.speed;
    (this.animate($, Z),
      this.animationObjects.forEach((Q, W) => {
        let Y = this.progress0.get(W);
        Q($, this.progress - Y, W);
      }),
      (this.progress += Z));
  }
  addAnimation($) {
    let J = this.currentId++;
    return (
      this.progress0.set(J, this.progress),
      this.animationObjects.set(J, $),
      J
    );
  }
  removeAnimation($) {
    if ($ != null) (this.animationObjects.delete($), this.progress0.delete($));
  }
}
class DJ extends RJ {
  constructor() {
    super(...arguments);
    Object.defineProperty(this, "headBobbing", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !0,
    });
  }
  animate($) {
    let J = this.progress * 8;
    (($.skin.leftLeg.rotation.x = Math.sin(J) * 0.5),
      ($.skin.rightLeg.rotation.x = Math.sin(J + Math.PI) * 0.5),
      ($.skin.leftArm.rotation.x = Math.sin(J + Math.PI) * 0.5),
      ($.skin.rightArm.rotation.x = Math.sin(J) * 0.5));
    let Z = Math.PI * 0.02;
    if (
      (($.skin.leftArm.rotation.z = Math.cos(J) * 0.03 + Z),
      ($.skin.rightArm.rotation.z = Math.cos(J + Math.PI) * 0.03 - Z),
      this.headBobbing)
    )
      (($.skin.head.rotation.y = Math.sin(J / 4) * 0.2),
        ($.skin.head.rotation.x = Math.sin(J / 5) * 0.1));
    else (($.skin.head.rotation.y = 0), ($.skin.head.rotation.x = 0));
    let Q = Math.PI * 0.06;
    $.cape.rotation.x = Math.sin(J / 1.5) * 0.06 + Q;
  }
}
class OJ extends e8 {
  constructor($ = "", J = {}) {
    let Z = new J8({ transparent: !0, alphaTest: 0.00001 });
    super(Z);
    if (
      (Object.defineProperty(this, "painted", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "text", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "font", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "margin", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "textStyle", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "backgroundStyle", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "height", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "textMaterial", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.textMaterial = Z),
      (this.text = $),
      (this.font = J.font === void 0 ? "48px Minecraft" : J.font),
      (this.margin = J.margin === void 0 ? [5, 10, 5, 10] : J.margin),
      (this.textStyle = J.textStyle === void 0 ? "white" : J.textStyle),
      (this.backgroundStyle =
        J.backgroundStyle === void 0 ? "rgba(0,0,0,.25)" : J.backgroundStyle),
      (this.height = J.height === void 0 ? 4 : J.height),
      (J.repaintAfterLoaded === void 0 ? !0 : J.repaintAfterLoaded) &&
        !document.fonts.check(this.font, this.text))
    )
      (this.paint(), (this.painted = this.loadAndPaint()));
    else (this.paint(), (this.painted = Promise.resolve()));
  }
  async loadAndPaint() {
    (await document.fonts.load(this.font, this.text), this.paint());
  }
  paint() {
    let $ = document.createElement("canvas"),
      J = $.getContext("2d");
    J.font = this.font;
    let Z = J.measureText(this.text);
    (($.width =
      this.margin[3] +
      Z.actualBoundingBoxLeft +
      Z.actualBoundingBoxRight +
      this.margin[1]),
      ($.height =
        this.margin[0] +
        Z.actualBoundingBoxAscent +
        Z.actualBoundingBoxDescent +
        this.margin[2]),
      (J = $.getContext("2d")),
      (J.font = this.font),
      (J.fillStyle = this.backgroundStyle),
      J.fillRect(0, 0, $.width, $.height),
      (J.fillStyle = this.textStyle),
      J.fillText(
        this.text,
        this.margin[3] + Z.actualBoundingBoxLeft,
        this.margin[0] + Z.actualBoundingBoxAscent,
      ));
    let Q = new z$($);
    ((Q.magFilter = u6),
      (Q.minFilter = u6),
      (this.textMaterial.map = Q),
      (this.textMaterial.needsUpdate = !0),
      (this.scale.x = ($.width / $.height) * this.height),
      (this.scale.y = this.height));
  }
}
class _J {
  constructor($ = {}) {
    if (
      (Object.defineProperty(this, "canvas", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "scene", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "camera", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "renderer", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "controls", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "playerObject", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "playerWrapper", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "globalLight", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new ZJ(16777215, 3),
      }),
      Object.defineProperty(this, "cameraLight", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new JJ(16777215, 0.6),
      }),
      Object.defineProperty(this, "composer", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "renderPass", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "fxaaPass", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "skinCanvas", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "capeCanvas", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "earsCanvas", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "skinTexture", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "capeTexture", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "earsTexture", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "backgroundTexture", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "_disposed", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      }),
      Object.defineProperty(this, "_renderPaused", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      }),
      Object.defineProperty(this, "_zoom", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "isUserRotating", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      }),
      Object.defineProperty(this, "autoRotate", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      }),
      Object.defineProperty(this, "autoRotateSpeed", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 1,
      }),
      Object.defineProperty(this, "_animation", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "clock", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "animationID", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "onContextLost", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "onContextRestored", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "_pixelRatio", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "devicePixelRatioQuery", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "onDevicePixelRatioChange", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "_nameTag", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "nameTagYOffset", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 20,
      }),
      (this.canvas =
        $.canvas === void 0 ? document.createElement("canvas") : $.canvas),
      (this.skinCanvas = document.createElement("canvas")),
      (this.capeCanvas = document.createElement("canvas")),
      (this.earsCanvas = document.createElement("canvas")),
      (this.scene = new t8()),
      (this.camera = new I6()),
      this.camera.add(this.cameraLight),
      this.scene.add(this.camera),
      this.scene.add(this.globalLight),
      (w6.enabled = !1),
      (this.renderer = new $8({
        canvas: this.canvas,
        preserveDrawingBuffer: $.preserveDrawingBuffer === !0,
      })),
      (this.onDevicePixelRatioChange = () => {
        if (
          (this.renderer.setPixelRatio(window.devicePixelRatio),
          this.updateComposerSize(),
          this._pixelRatio === "match-device")
        )
          ((this.devicePixelRatioQuery = matchMedia(
            `(resolution: ${window.devicePixelRatio}dppx)`,
          )),
            this.devicePixelRatioQuery.addEventListener(
              "change",
              this.onDevicePixelRatioChange,
              { once: !0 },
            ));
      }),
      $.pixelRatio === void 0 || $.pixelRatio === "match-device")
    )
      ((this._pixelRatio = "match-device"),
        (this.devicePixelRatioQuery = matchMedia(
          `(resolution: ${window.devicePixelRatio}dppx)`,
        )),
        this.devicePixelRatioQuery.addEventListener(
          "change",
          this.onDevicePixelRatioChange,
          { once: !0 },
        ),
        this.renderer.setPixelRatio(window.devicePixelRatio));
    else
      ((this._pixelRatio = $.pixelRatio),
        (this.devicePixelRatioQuery = null),
        this.renderer.setPixelRatio($.pixelRatio));
    this.renderer.setClearColor(0, 0);
    let J;
    if (this.renderer.capabilities.isWebGL2)
      J = new S6(0, 0, { depthTexture: new e5(0, 0, R7) });
    if (
      ((this.composer = new NJ(this.renderer, J)),
      (this.renderPass = new FJ(this.scene, this.camera)),
      (this.fxaaPass = new F5(R9)),
      this.composer.addPass(this.renderPass),
      this.composer.addPass(this.fxaaPass),
      (this.playerObject = new W8()),
      (this.playerObject.name = "player"),
      (this.playerObject.skin.visible = !1),
      (this.playerObject.cape.visible = !1),
      (this.playerWrapper = new W6()),
      this.playerWrapper.add(this.playerObject),
      this.scene.add(this.playerWrapper),
      (this.controls = new GJ(this.camera, this.canvas)),
      (this.controls.enablePan = !1),
      (this.controls.minDistance = 10),
      (this.controls.maxDistance = 256),
      $.enableControls === !1)
    )
      this.controls.enabled = !1;
    if ($.skin !== void 0)
      this.loadSkin($.skin, {
        model: $.model,
        ears: $.ears === "current-skin",
      });
    if ($.cape !== void 0) this.loadCape($.cape);
    if ($.ears !== void 0 && $.ears !== "current-skin")
      this.loadEars($.ears.source, { textureType: $.ears.textureType });
    if ($.width !== void 0) this.width = $.width;
    if ($.height !== void 0) this.height = $.height;
    if ($.background !== void 0) this.background = $.background;
    if ($.panorama !== void 0) this.loadPanorama($.panorama);
    if ($.nameTag !== void 0) this.nameTag = $.nameTag;
    if (
      ((this.camera.position.z = 1),
      (this._zoom = $.zoom === void 0 ? 0.9 : $.zoom),
      (this.fov = $.fov === void 0 ? 50 : $.fov),
      (this._animation = $.animation === void 0 ? null : $.animation),
      (this.clock = new E5()),
      $.renderPaused === !0)
    )
      ((this._renderPaused = !0), (this.animationID = null));
    else this.animationID = window.requestAnimationFrame(() => this.draw());
    ((this.onContextLost = (Z) => {
      if ((Z.preventDefault(), this.animationID !== null))
        (window.cancelAnimationFrame(this.animationID),
          (this.animationID = null));
    }),
      (this.onContextRestored = () => {
        if (
          (this.renderer.setClearColor(0, 0),
          !this._renderPaused && !this._disposed && this.animationID === null)
        )
          this.animationID = window.requestAnimationFrame(() => this.draw());
      }),
      this.canvas.addEventListener("webglcontextlost", this.onContextLost, !1),
      this.canvas.addEventListener(
        "webglcontextrestored",
        this.onContextRestored,
        !1,
      ),
      this.canvas.addEventListener(
        "mousedown",
        () => {
          this.isUserRotating = !0;
        },
        !1,
      ),
      this.canvas.addEventListener(
        "mouseup",
        () => {
          this.isUserRotating = !1;
        },
        !1,
      ),
      this.canvas.addEventListener(
        "touchmove",
        (Z) => {
          if (Z.touches.length === 1) this.isUserRotating = !0;
          else this.isUserRotating = !1;
        },
        !1,
      ),
      this.canvas.addEventListener(
        "touchend",
        () => {
          this.isUserRotating = !1;
        },
        !1,
      ));
  }
  updateComposerSize() {
    this.composer.setSize(this.width, this.height);
    let $ = this.renderer.getPixelRatio();
    (this.composer.setPixelRatio($),
      (this.fxaaPass.material.uniforms.resolution.value.x =
        1 / (this.width * $)),
      (this.fxaaPass.material.uniforms.resolution.value.y =
        1 / (this.height * $)));
  }
  recreateSkinTexture() {
    if (this.skinTexture !== null) this.skinTexture.dispose();
    ((this.skinTexture = new z$(this.skinCanvas)),
      (this.skinTexture.magFilter = u6),
      (this.skinTexture.minFilter = u6),
      (this.playerObject.skin.map = this.skinTexture));
  }
  recreateCapeTexture() {
    if (this.capeTexture !== null) this.capeTexture.dispose();
    ((this.capeTexture = new z$(this.capeCanvas)),
      (this.capeTexture.magFilter = u6),
      (this.capeTexture.minFilter = u6),
      (this.playerObject.cape.map = this.capeTexture),
      (this.playerObject.elytra.map = this.capeTexture));
  }
  recreateEarsTexture() {
    if (this.earsTexture !== null) this.earsTexture.dispose();
    ((this.earsTexture = new z$(this.earsCanvas)),
      (this.earsTexture.magFilter = u6),
      (this.earsTexture.minFilter = u6),
      (this.playerObject.ears.map = this.earsTexture));
  }
  loadSkin($, J = {}) {
    if ($ === null) this.resetSkin();
    else if (V5($)) {
      if (
        (H9(this.skinCanvas, $),
        this.recreateSkinTexture(),
        J.model === void 0 || J.model === "auto-detect")
      )
        this.playerObject.skin.modelType = G9(this.skinCanvas);
      else this.playerObject.skin.modelType = J.model;
      if (J.makeVisible !== !1) this.playerObject.skin.visible = !0;
      if (J.ears === !0 || J.ears == "load-only") {
        if (
          (HJ(this.earsCanvas, $), this.recreateEarsTexture(), J.ears === !0)
        ) {
          if (((this.playerObject.ears.visible = !0), this._nameTag))
            ((this.nameTagYOffset = 25),
              (this._nameTag.position.y = this.nameTagYOffset));
        }
      }
    } else return N5($).then((Z) => this.loadSkin(Z, J));
  }
  resetSkin() {
    if (
      ((this.playerObject.skin.visible = !1),
      (this.playerObject.skin.map = null),
      this.skinTexture !== null)
    )
      (this.skinTexture.dispose(), (this.skinTexture = null));
  }
  loadCape($, J = {}) {
    if ($ === null) this.resetCape();
    else if (V5($)) {
      if (
        (q9(this.capeCanvas, $),
        this.recreateCapeTexture(),
        J.makeVisible !== !1)
      )
        this.playerObject.backEquipment =
          J.backEquipment === void 0 ? "cape" : J.backEquipment;
    } else return N5($).then((Z) => this.loadCape(Z, J));
  }
  resetCape() {
    if (
      ((this.playerObject.backEquipment = null),
      (this.playerObject.cape.map = null),
      (this.playerObject.elytra.map = null),
      this.capeTexture !== null)
    )
      (this.capeTexture.dispose(), (this.capeTexture = null));
  }
  loadEars($, J = {}) {
    if ($ === null) this.resetEars();
    else if (V5($)) {
      if (J.textureType === "skin") HJ(this.earsCanvas, $);
      else U9(this.earsCanvas, $);
      if ((this.recreateEarsTexture(), J.makeVisible !== !1)) {
        if (((this.playerObject.ears.visible = !0), this._nameTag))
          ((this.nameTagYOffset = 25),
            (this._nameTag.position.y = this.nameTagYOffset));
      }
    } else return N5($).then((Z) => this.loadEars(Z, J));
  }
  resetEars() {
    if (((this.playerObject.ears.visible = !1), this._nameTag))
      ((this.nameTagYOffset = 20),
        (this._nameTag.position.y = this.nameTagYOffset));
    if (((this.playerObject.ears.map = null), this.earsTexture !== null))
      (this.earsTexture.dispose(), (this.earsTexture = null));
  }
  loadPanorama($) {
    return this.loadBackground($, F7);
  }
  loadBackground($, J) {
    if (V5($)) {
      if (this.backgroundTexture !== null) this.backgroundTexture.dispose();
      if (
        ((this.backgroundTexture = new U6()),
        (this.backgroundTexture.image = $),
        J !== void 0)
      )
        this.backgroundTexture.mapping = J;
      ((this.backgroundTexture.needsUpdate = !0),
        (this.scene.background = this.backgroundTexture));
    } else return N5($).then((Z) => this.loadBackground(Z, J));
  }
  draw() {
    let $ = this.clock.getDelta();
    if (this._animation !== null) {
      if ((this._animation.update(this.playerObject, $), this._nameTag))
        this._nameTag.position.y =
          this.playerObject.skin.head.getWorldPosition(new S()).y +
          this.nameTagYOffset -
          8;
    }
    if (this.autoRotate) {
      if (!(this.controls.enableRotate && this.isUserRotating))
        this.playerWrapper.rotation.y += $ * this.autoRotateSpeed;
    }
    (this.controls.update(),
      this.render(),
      (this.animationID = window.requestAnimationFrame(() => this.draw())));
  }
  render() {
    this.composer.render();
  }
  setSize($, J) {
    ((this.camera.aspect = $ / J),
      this.camera.updateProjectionMatrix(),
      this.renderer.setSize($, J),
      this.updateComposerSize());
  }
  dispose() {
    if (
      ((this._disposed = !0),
      this.canvas.removeEventListener(
        "webglcontextlost",
        this.onContextLost,
        !1,
      ),
      this.canvas.removeEventListener(
        "webglcontextrestored",
        this.onContextRestored,
        !1,
      ),
      this.devicePixelRatioQuery !== null)
    )
      (this.devicePixelRatioQuery.removeEventListener(
        "change",
        this.onDevicePixelRatioChange,
      ),
        (this.devicePixelRatioQuery = null));
    if (this.animationID !== null)
      (window.cancelAnimationFrame(this.animationID),
        (this.animationID = null));
    (this.controls.dispose(),
      this.renderer.dispose(),
      this.resetSkin(),
      this.resetCape(),
      this.resetEars(),
      (this.background = null),
      this.fxaaPass.fsQuad.dispose());
  }
  get disposed() {
    return this._disposed;
  }
  get renderPaused() {
    return this._renderPaused;
  }
  set renderPaused($) {
    if (
      ((this._renderPaused = $),
      this._renderPaused && this.animationID !== null)
    )
      (window.cancelAnimationFrame(this.animationID),
        (this.animationID = null),
        this.clock.stop(),
        (this.clock.autoStart = !0));
    else if (
      !this._renderPaused &&
      !this._disposed &&
      !this.renderer.getContext().isContextLost() &&
      this.animationID == null
    )
      this.animationID = window.requestAnimationFrame(() => this.draw());
  }
  get width() {
    return this.renderer.getSize(new R0()).width;
  }
  set width($) {
    this.setSize($, this.height);
  }
  get height() {
    return this.renderer.getSize(new R0()).height;
  }
  set height($) {
    this.setSize(this.width, $);
  }
  get background() {
    return this.scene.background;
  }
  set background($) {
    if ($ === null || $ instanceof h0 || $ instanceof U6)
      this.scene.background = $;
    else this.scene.background = new h0($);
    if (this.backgroundTexture !== null && $ !== this.backgroundTexture)
      (this.backgroundTexture.dispose(), (this.backgroundTexture = null));
  }
  adjustCameraDistance() {
    let $ = 4.5 + 16.5 / Math.tan(((this.fov / 180) * Math.PI) / 2) / this.zoom;
    if ($ < 10) $ = 10;
    else if ($ > 256) $ = 256;
    (this.camera.position.multiplyScalar($ / this.camera.position.length()),
      this.camera.updateProjectionMatrix());
  }
  resetCameraPose() {
    (this.camera.position.set(0, 0, 1),
      this.camera.rotation.set(0, 0, 0),
      this.adjustCameraDistance());
  }
  get fov() {
    return this.camera.fov;
  }
  set fov($) {
    ((this.camera.fov = $), this.adjustCameraDistance());
  }
  get zoom() {
    return this._zoom;
  }
  set zoom($) {
    ((this._zoom = $), this.adjustCameraDistance());
  }
  get pixelRatio() {
    return this._pixelRatio;
  }
  set pixelRatio($) {
    if ($ === "match-device") {
      if (this._pixelRatio !== "match-device")
        ((this._pixelRatio = $), this.onDevicePixelRatioChange());
    } else {
      if (
        this._pixelRatio === "match-device" &&
        this.devicePixelRatioQuery !== null
      )
        (this.devicePixelRatioQuery.removeEventListener(
          "change",
          this.onDevicePixelRatioChange,
        ),
          (this.devicePixelRatioQuery = null));
      ((this._pixelRatio = $),
        this.renderer.setPixelRatio($),
        this.updateComposerSize());
    }
  }
  get animation() {
    return this._animation;
  }
  set animation($) {
    if (this._animation !== $) {
      if (
        (this.playerObject.resetJoints(),
        this.playerObject.position.set(0, 0, 0),
        this.playerObject.rotation.set(0, 0, 0),
        this._nameTag)
      )
        this._nameTag.position.y = this.nameTagYOffset;
      (this.clock.stop(), (this.clock.autoStart = !0));
    }
    if ($ !== null) $.progress = 0;
    this._animation = $;
  }
  get nameTag() {
    return this._nameTag;
  }
  set nameTag($) {
    if (this._nameTag !== null) this.playerWrapper.remove(this._nameTag);
    if ($ !== null) {
      if (!($ instanceof E6)) $ = new OJ($);
      (this.playerWrapper.add($),
        (this.nameTagYOffset = this.playerObject.ears.visible ? 25 : 20),
        ($.position.y = this.nameTagYOffset));
    }
    this._nameTag = $;
  }
}
var D0 = window.React,
  { useState: C6, useEffect: C$, useRef: zJ } = D0;
function D9({
  skinUrl: $,
  capeUrl: J,
  slim: Z = !1,
  width: Q = 150,
  height: W = 300,
  className: Y,
  autoRotate: K = !1,
  backView: X = !1,
}) {
  let H = zJ(null),
    q = zJ(null),
    [U, G] = C6(null);
  if (
    (C$(() => {
      let E = !0;
      if (!H.current) return;
      if (!q.current)
        ((q.current = new _J({ canvas: H.current, width: Q, height: W })),
          (q.current.animation = new DJ()));
      if ((G(null), q.current.setSize(Q, W), (q.current.autoRotate = K), X))
        q.current.playerObject.rotation.y = Math.PI;
      else if (!K) q.current.playerObject.rotation.y = 0;
      if (
        (q.current
          .loadSkin($, { model: Z ? "slim" : "auto-detect" })
          .catch((F) => {
            if (E) (console.error("Failed to load skin:", F), G(String(F)));
          }),
        J)
      )
        q.current.loadCape(J).catch((F) => {
          if (E) console.error("Failed to load cape:", F);
        });
      else q.current.resetCape();
      return () => {
        E = !1;
      };
    }, [$, J, Z, Q, W, K, X]),
    C$(() => {
      return () => {
        if (q.current) (q.current.dispose(), (q.current = null));
      };
    }, []),
    U)
  )
    return D0.createElement(
      "div",
      {
        className: Y,
        style: {
          width: Q,
          height: W,
          color: "red",
          fontSize: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        },
      },
      `Skin Error: ${U}`,
    );
  return D0.createElement("canvas", {
    ref: H,
    className: Y,
    style: { display: "block" },
  });
}
function n4({ isOpen: $, onClose: J, activeProfile: Z, store: Q, api: W }) {
  let [Y, K] = C6("skins"),
    [X, H] = C6(null),
    [q, U] = C6([]),
    [G, E] = C6(!1),
    [F, O] = C6(null),
    [_, N] = C6(!1),
    [V, k] = C6(!1),
    [M, A] = C6(!1),
    L = zJ(null),
    C = Q?.wardrobe || [],
    g = window.Obsy,
    {
      Button: d,
      Dialog: R,
      DialogContent: w,
      DialogHeader: s,
      DialogTitle: W0,
      Select: h,
      SelectContent: y,
      SelectItem: l,
      SelectTrigger: r,
      SelectValue: c,
      Tabs: u,
      TabsList: i,
      TabsTrigger: T,
    } = g?.ui || {};
  if (
    (C$(() => {
      if ($ && Z) {
        if ((Q?.fetchWardrobe?.(), Z.microsoft && Q?.getAccountCapes))
          (E(!0),
            Q.getAccountCapes(Z.id)
              .then((e) => {
                U(e || []);
                let z0 = (e || []).find((g0) => g0.state === "ACTIVE");
                if (z0) O(z0);
              })
              .catch(() => U([]))
              .finally(() => E(!1)));
      }
    }, [$, Z?.id]),
    !Z)
  )
    return null;
  let n = async (e) => {
      let z0 = e.target.files?.[0];
      if (!z0) return;
      try {
        let g0 = await z0.arrayBuffer(),
          Y6 = Array.from(new Uint8Array(g0));
        if (Q?.addSkinToWardrobe)
          (await Q.addSkinToWardrobe(Y6, z0.name, V, Z.id),
            W.ui.showToast(`Скин «${z0.name}» добавлен в гардероб`, "success"));
      } catch (g0) {
        W.ui.showToast("Ошибка при загрузке скина", "error");
      }
      if (L.current) L.current.value = "";
    },
    J0 = async () => {
      A(!0);
      try {
        if (X && Q?.applySkin) await Q.applySkin(Z.id, X);
        if (Z.microsoft && Q?.setActiveCape)
          if ((await Q.setActiveCape(Z.id, F?.id || null), F?.base64))
            localStorage.setItem(`obsy_cape_${Z.id}`, F.base64);
          else localStorage.removeItem(`obsy_cape_${Z.id}`);
        (window.dispatchEvent(new CustomEvent("obsy:capeChange")),
          W.ui.showToast("Изменения сохранены", "success"),
          J());
      } catch (e) {
        W.ui.showToast("Не удалось применить скин или плащ", "error");
      } finally {
        A(!1);
      }
    },
    E0 = C.find((e) => e.id === X),
    G0 = E0 ? E0.base64Data : Z.skinPng || "",
    V0 = E0 ? E0.slim : Z.slim,
    v0 = F?.base64 || F?.url || null;
  return D0.createElement(
    R,
    {
      open: $,
      onOpenChange: (e) => {
        if (!e) J();
      },
    },
    D0.createElement(
      w,
      { className: "sm:max-w-4xl" },
      D0.createElement(
        s,
        null,
        D0.createElement(
          "div",
          { className: "flex items-center justify-between pr-6" },
          D0.createElement(W0, null, "Гардероб"),
          D0.createElement(
            u,
            {
              value: Y,
              onValueChange: (e) => {
                (K(e), N(e === "capes"));
              },
            },
            D0.createElement(
              i,
              null,
              D0.createElement(T, { value: "skins" }, "Скины"),
              D0.createElement(T, { value: "capes" }, "Плащи"),
            ),
          ),
        ),
      ),
      D0.createElement(
        "div",
        { className: "flex h-[420px] gap-6" },
        D0.createElement(
          "div",
          { className: "flex min-h-0 flex-1 flex-col gap-3" },
          Y === "skins"
            ? D0.createElement(
                D0.Fragment,
                null,
                D0.createElement(
                  "div",
                  { className: "flex w-full gap-2" },
                  D0.createElement(
                    h,
                    {
                      value: V ? "slim" : "classic",
                      onValueChange: (e) => k(e === "slim"),
                    },
                    D0.createElement(
                      r,
                      { className: "w-[130px]" },
                      D0.createElement(c, null),
                    ),
                    D0.createElement(
                      y,
                      null,
                      D0.createElement(
                        l,
                        { value: "classic" },
                        "Classic (4px)",
                      ),
                      D0.createElement(l, { value: "slim" }, "Slim (3px)"),
                    ),
                  ),
                  D0.createElement("input", {
                    type: "file",
                    accept: "image/png",
                    className: "hidden",
                    ref: L,
                    onChange: n,
                  }),
                  D0.createElement(
                    d,
                    {
                      variant: "secondary",
                      onClick: () => L.current?.click(),
                      className: "flex-1",
                    },
                    "Загрузить скин (PNG)",
                  ),
                ),
                D0.createElement(
                  "div",
                  {
                    className:
                      "border-border/50 bg-muted/20 min-h-0 flex-1 overflow-y-auto rounded-md border p-2",
                  },
                  D0.createElement(
                    "div",
                    { className: "grid grid-cols-3 gap-2" },
                    C.filter((e) => !e.profileId || e.profileId === Z.id).map(
                      (e) => {
                        let z0 = X === e.id;
                        return D0.createElement(
                          "div",
                          {
                            key: e.id,
                            onClick: () => H(e.id),
                            className:
                              "relative aspect-square cursor-pointer overflow-hidden rounded-md border-2 transition-colors duration-300 " +
                              (z0
                                ? "border-primary bg-primary/10 shadow-md"
                                : "border-transparent bg-muted/50 hover:border-primary/50"),
                          },
                          D0.createElement("img", {
                            src: e.base64Data,
                            alt: e.name,
                            style: { imageRendering: "pixelated" },
                            className: "h-full w-full object-contain p-2",
                          }),
                          z0 &&
                            D0.createElement(
                              "div",
                              {
                                className:
                                  "bg-primary text-primary-foreground absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold",
                              },
                              "✓",
                            ),
                          D0.createElement(
                            "div",
                            {
                              className:
                                "from-background/90 absolute inset-x-0 bottom-0 truncate bg-gradient-to-t to-transparent p-1 text-center text-[10px]",
                            },
                            e.name,
                          ),
                        );
                      },
                    ),
                  ),
                ),
              )
            : D0.createElement(
                D0.Fragment,
                null,
                D0.createElement(
                  "div",
                  {
                    className:
                      "text-muted-foreground flex items-center justify-between text-xs",
                  },
                  D0.createElement("span", null, "Официальные плащи Microsoft"),
                  G && D0.createElement("span", null, "Загрузка..."),
                ),
                D0.createElement(
                  "div",
                  {
                    className:
                      "border-border/50 bg-muted/20 min-h-0 flex-1 overflow-y-auto rounded-md border p-2",
                  },
                  D0.createElement(
                    "div",
                    { className: "grid grid-cols-3 gap-2" },
                    D0.createElement(
                      "div",
                      {
                        onClick: () => O(null),
                        className:
                          "relative flex aspect-square cursor-pointer items-center justify-center rounded-md border-2 p-2 text-center text-xs transition-colors duration-300 " +
                          (!F
                            ? "border-primary bg-primary/10 shadow-md"
                            : "border-transparent bg-muted/50 hover:border-primary/50"),
                      },
                      "Без плаща",
                      !F &&
                        D0.createElement(
                          "div",
                          {
                            className:
                              "bg-primary text-primary-foreground absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold",
                          },
                          "✓",
                        ),
                    ),
                    q.map((e) => {
                      let z0 = F?.id === e.id,
                        g0 = e.base64 || e.url;
                      return D0.createElement(
                        "div",
                        {
                          key: e.id,
                          onClick: () => O(e),
                          className:
                            "relative aspect-square cursor-pointer overflow-hidden rounded-md border-2 transition-colors duration-300 " +
                            (z0
                              ? "border-primary bg-primary/10 shadow-md"
                              : "border-transparent bg-muted/50 hover:border-primary/50"),
                        },
                        g0 &&
                          D0.createElement("img", {
                            src: g0,
                            alt: e.alias || "Cape",
                            style: { imageRendering: "pixelated" },
                            className: "h-full w-full object-contain p-2",
                          }),
                        z0 &&
                          D0.createElement(
                            "div",
                            {
                              className:
                                "bg-primary text-primary-foreground absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold",
                            },
                            "✓",
                          ),
                        D0.createElement(
                          "div",
                          {
                            className:
                              "from-background/90 absolute inset-x-0 bottom-0 truncate bg-gradient-to-t to-transparent p-1 text-center text-[10px]",
                          },
                          e.alias || "Плащ",
                        ),
                      );
                    }),
                  ),
                ),
              ),
        ),
        D0.createElement(
          "div",
          {
            className:
              "border-border/50 bg-muted/10 relative flex w-64 flex-col items-center justify-between rounded-md border p-4",
          },
          D0.createElement(
            "div",
            { className: "flex w-full justify-between" },
            D0.createElement(
              d,
              { variant: "outline", size: "xs", onClick: () => N((e) => !e) },
              _ ? "Вид спереди" : "Вид сзади",
            ),
            D0.createElement(
              "span",
              { className: "text-muted-foreground text-xs" },
              V0 ? "Slim" : "Classic",
            ),
          ),
          G0
            ? D0.createElement(D9, {
                skinUrl: G0,
                capeUrl: v0,
                slim: V0,
                width: 180,
                height: 280,
                backView: _,
                autoRotate: !1,
              })
            : D0.createElement(
                "div",
                {
                  className:
                    "text-muted-foreground flex flex-1 items-center text-xs",
                },
                "Нет скина",
              ),
          D0.createElement(
            d,
            { onClick: J0, disabled: M, className: "w-full" },
            M ? "Сохранение..." : "Применить",
          ),
        ),
      ),
    ),
  );
}
function s4({ api: $ }) {
  let J = window.Obsy?.useLauncherStore(),
    Z = J?.state,
    Q = J?.profiles || [],
    W = Z?.selectedProfileId,
    Y = Q.find((k) => k.id === W),
    [K, X] = C6(!1),
    [H, q] = C6(!1),
    [U, G] = C6(160),
    [E, F] = C6(!0),
    [O, _] = C6(null),
    { Button: N } = window.Obsy?.ui || {};
  if (
    (C$(() => {
      if ($?.storage)
        (G($.storage.get("modelWidth", 160)),
          F($.storage.get("showWardrobeButton", !0)));
    }, [$]),
    C$(() => {
      let k = () => {
        let M =
          Y?.capePng ||
          (typeof localStorage < "u" && W
            ? localStorage.getItem(`obsy_cape_${W}`)
            : null);
        _(M);
      };
      return (
        k(),
        window.addEventListener("obsy:capeChange", k),
        () => {
          window.removeEventListener("obsy:capeChange", k);
        }
      );
    }, [W, Y?.capePng]),
    C$(() => {
      if (Y?.microsoft && !Y?.capePng && J?.refreshProfileSkin)
        J.refreshProfileSkin(Y.id);
    }, [Y?.id]),
    C$(() => {
      return $.events.on("addon:skin-3d-viewer:configChange", () => {
        (G($.storage.get("modelWidth", 160)),
          F($.storage.get("showWardrobeButton", !0)));
      });
    }, [$]),
    !Y)
  )
    return null;
  let V = Y.skinPng;
  return D0.createElement(
    "div",
    {
      className:
        "bg-card border-border/50 relative hidden w-64 flex-col items-center justify-between overflow-hidden rounded-xl border p-5 shadow-2xl backdrop-blur-md md:flex animate-in fade-in zoom-in-95 duration-300",
    },
    D0.createElement("div", {
      className:
        "from-primary/5 pointer-events-none absolute inset-0 bg-gradient-to-bl to-transparent",
    }),
    D0.createElement(
      "div",
      {
        className:
          "relative z-10 flex w-full items-center justify-between pb-1",
      },
      D0.createElement(
        "span",
        {
          className:
            "text-muted-foreground max-w-[130px] truncate text-[11px] font-medium",
        },
        Y.username,
      ),
      D0.createElement(
        N,
        {
          variant: "outline",
          size: "xs",
          onClick: () => X((k) => !k),
          title: K ? "Вид спереди" : "Вид сзади (плащ)",
        },
        K ? "Вид спереди" : "Вид сзади",
      ),
    ),
    V
      ? D0.createElement(
          "div",
          {
            className:
              "relative z-10 flex flex-1 items-center justify-center py-2",
          },
          D0.createElement(D9, {
            skinUrl: V,
            capeUrl: O,
            slim: Y.slim,
            width: U,
            height: 260,
            backView: K,
          }),
        )
      : D0.createElement(
          "div",
          {
            className:
              "text-muted-foreground relative z-10 flex w-full flex-1 items-center justify-center py-20 text-center text-xs",
          },
          "Скин не найден",
        ),
    E && Y.microsoft
      ? D0.createElement(
          N,
          {
            variant: "outline",
            onClick: () => q(!0),
            className: "relative z-10 mt-3 w-full",
          },
          "Гардероб",
        )
      : null,
    H
      ? D0.createElement(n4, {
          isOpen: H,
          onClose: () => q(!1),
          activeProfile: Y,
          store: J,
          api: $,
        })
      : null,
  );
}
var sX = {
  manifest: {
    id: "skin-3d-viewer",
    name: "3D Skin Doll & Wardrobe",
    version: "2.4.0",
    description:
      "Интерактивная 3D-модель персонажа с анимацией ходьбы, гардеробом скинов и установкой плащей.",
    author: "Obsy Team",
    category: "customization",
    sizeBytes: 900000,
    permissions: ["ui:slots", "storage:local", "game:profiles"],
    tags: [
      "skin",
      "cape",
      "capes",
      "3d",
      "wardrobe",
      "player",
      "model",
      "animation",
    ],
  },
  activate($) {
    ($.ui.registerSlot("dashboard.side", "skin-doll-widget", s4, 1),
      $.logger.info("3D Skin Doll & Wardrobe addon activated"));
  },
  deactivate($) {
    $.ui.unregisterSlot("skin-doll-widget");
  },
};
export { sX as default };
