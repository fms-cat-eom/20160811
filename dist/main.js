(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/Yutaka/Dropbox/pro/_Projects/_eom/20160811/src/script/glcat.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

var GLCat = function () {
	function GLCat(_gl) {
		_classCallCheck(this, GLCat);

		this.gl = _gl;
		var it = this;
		var gl = it.gl;

		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

		gl.getExtension('OES_texture_float');
		gl.getExtension('OES_float_linear');
		gl.getExtension('OES_half_float_linear');

		it.program = null;
	}

	_createClass(GLCat, [{
		key: 'createProgram',
		value: function createProgram(_vert, _frag, _onError) {

			var it = this;
			var gl = it.gl;

			var error = void 0;
			if (typeof _onError === 'function') {
				error = _onError;
			} else {
				error = function error(_str) {
					console.error(_str);
				};
			}

			var vert = gl.createShader(gl.VERTEX_SHADER);
			gl.shaderSource(vert, _vert);
			gl.compileShader(vert);
			if (!gl.getShaderParameter(vert, gl.COMPILE_STATUS)) {
				error(gl.getShaderInfoLog(vert));
				return null;
			}

			var frag = gl.createShader(gl.FRAGMENT_SHADER);
			gl.shaderSource(frag, _frag);
			gl.compileShader(frag);
			if (!gl.getShaderParameter(frag, gl.COMPILE_STATUS)) {
				error(gl.getShaderInfoLog(frag));
				return null;
			}

			var program = gl.createProgram();
			gl.attachShader(program, vert);
			gl.attachShader(program, frag);
			gl.linkProgram(program);
			if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
				program.locations = {};
				return program;
			} else {
				error(gl.getProgramInfoLog(program));
				return null;
			}
		}
	}, {
		key: 'useProgram',
		value: function useProgram(_program) {

			var it = this;
			var gl = it.gl;

			gl.useProgram(_program);
			it.program = _program;
		}
	}, {
		key: 'createVertexbuffer',
		value: function createVertexbuffer(_array) {

			var it = this;
			var gl = it.gl;

			var buffer = gl.createBuffer();

			gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_array), gl.STATIC_DRAW);
			gl.bindBuffer(gl.ARRAY_BUFFER, null);

			buffer.length = _array.length;
			return buffer;
		}
	}, {
		key: 'createIndexbuffer',
		value: function createIndexbuffer(_array) {

			var it = this;
			var gl = it.gl;

			var buffer = gl.createBuffer();

			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(_array), gl.STATIC_DRAW);
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

			buffer.length = _array.length;
			return buffer;
		}
	}, {
		key: 'attribute',
		value: function attribute(_name, _buffer, _stride) {

			var it = this;
			var gl = it.gl;

			var location = void 0;
			if (it.program.locations[_name]) {
				location = it.program.locations[_name];
			} else {
				location = gl.getAttribLocation(it.program, _name);
				it.program.locations[_name] = location;
			}

			gl.bindBuffer(gl.ARRAY_BUFFER, _buffer);
			gl.enableVertexAttribArray(location);
			gl.vertexAttribPointer(location, _stride, gl.FLOAT, false, 0, 0);

			gl.bindBuffer(gl.ARRAY_BUFFER, null);
		}
	}, {
		key: 'getUniformLocation',
		value: function getUniformLocation(_name) {

			var it = this;
			var gl = it.gl;

			var location = void 0;

			if (it.program.locations[_name]) {
				location = it.program.locations[_name];
			} else {
				location = gl.getUniformLocation(it.program, _name);
				it.program.locations[_name] = location;
			}

			return location;
		}
	}, {
		key: 'uniform1i',
		value: function uniform1i(_name, _value) {

			var it = this;
			var gl = it.gl;

			var location = it.getUniformLocation(_name);
			gl.uniform1i(location, _value);
		}
	}, {
		key: 'uniform1f',
		value: function uniform1f(_name, _value) {

			var it = this;
			var gl = it.gl;

			var location = it.getUniformLocation(_name);
			gl.uniform1f(location, _value);
		}
	}, {
		key: 'uniform2fv',
		value: function uniform2fv(_name, _value) {

			var it = this;
			var gl = it.gl;

			var location = it.getUniformLocation(_name);
			gl.uniform2fv(location, _value);
		}
	}, {
		key: 'uniform3fv',
		value: function uniform3fv(_name, _value) {

			var it = this;
			var gl = it.gl;

			var location = it.getUniformLocation(_name);
			gl.uniform3fv(location, _value);
		}
	}, {
		key: 'uniformCubemap',
		value: function uniformCubemap(_name, _texture, _number) {

			var it = this;
			var gl = it.gl;

			var location = it.getUniformLocation(_name);
			gl.activeTexture(gl.TEXTURE0 + _number);
			gl.bindTexture(gl.TEXTURE_CUBE_MAP, _texture);
			gl.uniform1i(location, _number);
		}
	}, {
		key: 'uniformTexture',
		value: function uniformTexture(_name, _texture, _number) {

			var it = this;
			var gl = it.gl;

			var location = it.getUniformLocation(_name);
			gl.activeTexture(gl.TEXTURE0 + _number);
			gl.bindTexture(gl.TEXTURE_2D, _texture);
			gl.uniform1i(location, _number);
		}
	}, {
		key: 'createTexture',
		value: function createTexture() {

			var it = this;
			var gl = it.gl;

			var texture = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, texture);
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.bindTexture(gl.TEXTURE_2D, null);

			return texture;
		}
	}, {
		key: 'textureFilter',
		value: function textureFilter(_texture, _filter) {

			var it = this;
			var gl = it.gl;

			gl.bindTexture(gl.TEXTURE_2D, _texture);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, _filter);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, _filter);
			gl.bindTexture(gl.TEXTURE_2D, null);
		}
	}, {
		key: 'textureWrap',
		value: function textureWrap(_texture, _wrap) {

			var it = this;
			var gl = it.gl;

			gl.bindTexture(gl.TEXTURE_2D, _texture);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, _wrap);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, _wrap);
			gl.bindTexture(gl.TEXTURE_2D, null);
		}
	}, {
		key: 'setTexture',
		value: function setTexture(_texture, _image) {

			var it = this;
			var gl = it.gl;

			gl.bindTexture(gl.TEXTURE_2D, _texture);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, _image);
			gl.bindTexture(gl.TEXTURE_2D, null);
		}
	}, {
		key: 'setTextureFromArray',
		value: function setTextureFromArray(_texture, _width, _height, _array) {

			var it = this;
			var gl = it.gl;

			gl.bindTexture(gl.TEXTURE_2D, _texture);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, _width, _height, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(_array));
			gl.bindTexture(gl.TEXTURE_2D, null);
		}
	}, {
		key: 'setTextureFromFloatArray',
		value: function setTextureFromFloatArray(_texture, _width, _height, _array) {

			var it = this;
			var gl = it.gl;

			gl.bindTexture(gl.TEXTURE_2D, _texture);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, _width, _height, 0, gl.RGBA, gl.FLOAT, new Float32Array(_array));
			gl.bindTexture(gl.TEXTURE_2D, null);
		}
	}, {
		key: 'copyTexture',
		value: function copyTexture(_texture, _width, _height) {

			var it = this;
			var gl = it.gl;

			gl.bindTexture(gl.TEXTURE_2D, _texture);
			gl.copyTexImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 0, 0, _width, _height, 0);
			gl.bindTexture(gl.TEXTURE_2D, null);
		}
	}, {
		key: 'createCubemap',
		value: function createCubemap(_arrayOfImage) {

			var it = this;
			var gl = it.gl;

			// order : X+, X-, Y+, Y-, Z+, Z-
			var texture = gl.createTexture();

			gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
			for (var i = 0; i < 6; i++) {
				gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, _arrayOfImage[i]);
			}
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);

			return texture;
		}
	}, {
		key: 'createFramebuffer',
		value: function createFramebuffer(_width, _height) {

			var it = this;
			var gl = it.gl;

			var framebuffer = gl.createFramebuffer();
			gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

			framebuffer.depth = gl.createRenderbuffer();
			gl.bindRenderbuffer(gl.RENDERBUFFER, framebuffer.depth);
			gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, _width, _height);
			gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, framebuffer.depth);

			framebuffer.texture = it.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, framebuffer.texture);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, _width, _height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
			gl.bindTexture(gl.TEXTURE_2D, null);

			gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, framebuffer.texture, 0);
			gl.bindFramebuffer(gl.FRAMEBUFFER, null);

			return framebuffer;
		}
	}, {
		key: 'resizeFramebuffer',
		value: function resizeFramebuffer(_framebuffer, _width, _height) {

			var it = this;
			var gl = it.gl;

			gl.bindFramebuffer(gl.FRAMEBUFFER, _framebuffer);
			gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, _width, _height);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, _width, _height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
			gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		}
	}, {
		key: 'createFloatFramebuffer',
		value: function createFloatFramebuffer(_width, _height) {

			var it = this;
			var gl = it.gl;

			var framebuffer = gl.createFramebuffer();
			gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

			framebuffer.depth = gl.createRenderbuffer();
			gl.bindRenderbuffer(gl.RENDERBUFFER, framebuffer.depth);
			gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, _width, _height);
			gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, framebuffer.depth);

			framebuffer.texture = it.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, framebuffer.texture);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, _width, _height, 0, gl.RGBA, gl.FLOAT, null);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
			gl.bindTexture(gl.TEXTURE_2D, null);

			gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, framebuffer.texture, 0);
			gl.bindFramebuffer(gl.FRAMEBUFFER, null);

			return framebuffer;
		}
	}, {
		key: 'resizeFloatFramebuffer',
		value: function resizeFloatFramebuffer(_framebuffer, _width, _height) {

			var it = this;
			var gl = it.gl;

			gl.bindFramebuffer(gl.FRAMEBUFFER, _framebuffer);
			gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, _width, _height);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, _width, _height, 0, gl.RGBA, gl.FLOAT, null);
			gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		}
	}, {
		key: 'clear',
		value: function clear(_r, _g, _b, _a, _d) {

			var it = this;
			var gl = it.gl;

			var r = _r || 0.0;
			var g = _g || 0.0;
			var b = _b || 0.0;
			var a = typeof _a === 'number' ? _a : 1.0;
			var d = typeof _d === 'number' ? _d : 1.0;

			gl.clearColor(r, g, b, a);
			gl.clearDepth(d);
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		}
	}]);

	return GLCat;
}();

exports.default = GLCat;

},{}],"/Users/Yutaka/Dropbox/pro/_Projects/_eom/20160811/src/script/main.js":[function(require,module,exports){
'use strict';

var _xorshift = require('./xorshift');

var _xorshift2 = _interopRequireDefault(_xorshift);

var _glcat = require('./glcat');

var _glcat2 = _interopRequireDefault(_glcat);

var _triangulation = require('./triangulation');

var _triangulation2 = _interopRequireDefault(_triangulation);

var _triangulationDrawer = require('./triangulation-drawer');

var _triangulationDrawer2 = _interopRequireDefault(_triangulationDrawer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _xorshift2.default)(43235);


// ------

var clamp = function clamp(v, b, t) {
  return Math.min(Math.max(v, b), t);
};
var saturate = function saturate(v) {
  return clamp(v, 0.0, 1.0);
};

// ------

var width = canvas.width = 300;
var height = canvas.height = 300;
var context = canvas.getContext('2d');

var frame = 0;
var time = 0.0;
var deltaTime = 0.0;

var step = 1;

// ------

var HOLE_L = 0.45;
var HOLE_R = 0.65;
var HOLE_H = 0.05;
var EDGE = 0.1;

var letters = [[0, 0, 1, 0, 1, 1.5, 3.5, 1.5, 3.5, 2.5, 1, 2.5, 1, 4, 4, 4, 4, 0, 5, 0, 5, 4.5, 4.5, 5, 0.5, 5, 0, 4.5], [0, 0, 4.5, 0, 5, 0.5, 5, 2, 4.5, 2.5, 5, 3, 5, 4.5, 4.5, 5, 0, 5, 0, 4, 4, 4, 4, 3, 1.5, 3, 1.5, 2, 4, 2, 4, 1, 1, 1, 1, 3.5, 0, 3.5], [0, 0.5, 0.5, 0, 5, 0, 5, 1, 1, 1, 1, 4, 5, 4, 5, 5, 0.5, 5, 0, 4.5], [0, 0, 4.5, 0, 5, 0.5, 5, 4.5, 4.5, 5, 0, 5, 0, 4, 4, 4, 4, 1, 1, 1, 1, 3.5, 0, 3.5], [0, 0.5, 0.5, 0, 5, 0, 5, 1, 1, 1, 1, 2, 5, 2, 5, 3, 1, 3, 1, 4, 5, 4, 5, 5, 0.5, 5, 0, 4.5], [0, 0, 1, 0, 1, 2, 5, 2, 5, 3, 1, 3, 1, 4, 5, 4, 5, 5, 0.5, 5, 0, 4.5], [0, 0.5, 0.5, 0, 5, 0, 5, 2, 4, 2, 4, 1, 1, 1, 1, 4, 5, 4, 5, 5, 0.5, 5, 0, 4.5], [0, 0, 1, 0, 1, 2, 4, 2, 4, 0, 5, 0, 5, 5, 4, 5, 4, 3, 1, 3, 1, 5, 0, 5], [2, 0, 3, 0, 3, 5, 2, 5], [0, 0.5, 0.5, 0, 4.5, 0, 5, 0.5, 5, 5, 4, 5, 4, 1, 1, 1, 1, 2, 0, 2], [0, 0, 1, 0, 1, 2, 4, 2, 4, 0, 5, 0, 5, 2.5, 4.5, 3, 4, 3, 5, 5, 4, 5, 3, 3, 1, 3, 1, 5, 0, 5], [0, 0, 5, 0, 5, 1, 1, 1, 1, 5, 0, 5], [0, 0, 1, 0, 1, 4, 2, 4, 2, 0, 3, 0, 3, 4, 4, 4, 4, 0, 5, 0, 5, 4.5, 4.5, 5, 0, 5], [0, 0, 1, 0, 1, 4, 4, 4, 4, 0, 5, 0, 5, 4.5, 4.5, 5, 0, 5], [0, 3.5, 0, 0.5, 0.5, 0, 4.5, 0, 5, 0.5, 5, 4.5, 4.5, 5, 0.5, 5, 0, 4.5, 0, 4, 4, 4, 4, 1, 1, 1, 1, 3.5], [0, 0, 1, 0, 1, 4, 4, 4, 4, 3, 1.5, 3, 1.5, 2, 4.5, 2, 5, 2.5, 5, 4.5, 4.5, 5, 0, 5], [0, 0.5, 0.5, 0, 5, 0, 5, 0.5, 4.5, 1, 1, 1, 1, 4, 4, 4, 4, 1.5, 5, 1.5, 5, 4.5, 4.5, 5, 0.5, 5, 0, 4.5], [0, 0, 1, 0, 1, 4, 4, 4, 4, 3, 1.5, 3, 1.5, 2, 3, 2, 4, 0, 5, 0, 4, 2, 4.5, 2, 5, 2.5, 5, 4.5, 4.5, 5, 0, 5], [0, 0, 4.5, 0, 5, 0.5, 5, 2.5, 4.5, 3, 1, 3, 1, 4, 5, 4, 5, 5, 0.5, 5, 0, 4.5, 0, 2.5, 0.5, 2, 4, 2, 4, 1, 0, 1], [2, 0, 3, 0, 3, 4, 5, 4, 5, 5, 0, 5, 0, 4, 2, 4], [0, 0.5, 0.5, 0, 4.5, 0, 5, 0.5, 5, 5, 4, 5, 4, 1, 1, 1, 1, 5, 0, 5], [0, 5, 0, 0, 4.5, 0, 5, 0.5, 5, 5, 4, 5, 4, 1, 1, 1, 1, 5], [0, 0.5, 0.5, 0, 4.5, 0, 5, 0.5, 5, 5, 4, 5, 4, 1, 3, 1, 3, 5, 2, 5, 2, 1, 1, 1, 1, 5, 0, 5], [0, 0, 1, 0, 1, 2, 4, 2, 4, 0, 5, 0, 5, 2, 4.5, 2.5, 5, 3, 5, 5, 4, 5, 4, 3, 1, 3, 1, 5, 0, 5, 0, 3, 0.5, 2.5, 0, 2], [0, 5, 0, 2.5, 0.5, 2, 4, 2, 4, 1, 0, 1, 0, 0, 4.5, 0, 5, 0.5, 5, 5, 4, 5, 4, 3, 1, 3, 1, 5], [0, 0, 5, 0, 5, 1, 1, 1, 1, 2, 4.5, 2, 5, 2.5, 5, 5, 0, 5, 0, 4, 4, 4, 4, 3, 0.5, 3, 0, 2.5]];

var tris = [];
var tridraws = [];
var iTri = 0;

letters.map(function (_v) {
  var tri = new _triangulation2.default(_v);
  tris.push(tri);

  var tridraw = new _triangulationDrawer2.default(tri, canvas);
  tridraw.range(0, 5, 5, 0, 20, 280, 20, 280);
  tridraws.push(tridraw);
});

// ------

var renderA = document.createElement('a');

var saveFrame = function saveFrame() {
  renderA.href = canvas.toDataURL();
  renderA.download = ('0000' + frame).slice(-5) + '.png';
  renderA.click();
};

// ------

var update = function update() {
  if (!checkboxPlay.checked) {
    setTimeout(update, 100);
    return;
  }

  if (tris.length === iTri) {
    for (var i = 0; i < tris.length; i++) {
      tris[i].reset();
    }
    iTri = 0;
  }

  tridraws[iTri].getCurrent();

  if (!tris[iTri].finished) {
    tris[iTri].step();
  }

  context.fillStyle = 'rgb( 30, 30, 30 )';
  context.fillRect(0, 0, width, height);

  tridraws[iTri].draw();

  if (tris[iTri].finished) {
    iTri++;
  }

  if (checkboxSave.checked) {
    saveFrame();
  }
  frame = frame + 1;

  setTimeout(update, 40);
};
update();

window.addEventListener('keydown', function (_e) {
  if (_e.which === 27) {
    checkboxPlay.checked = false;
  }
});

},{"./glcat":"/Users/Yutaka/Dropbox/pro/_Projects/_eom/20160811/src/script/glcat.js","./triangulation":"/Users/Yutaka/Dropbox/pro/_Projects/_eom/20160811/src/script/triangulation.js","./triangulation-drawer":"/Users/Yutaka/Dropbox/pro/_Projects/_eom/20160811/src/script/triangulation-drawer.js","./xorshift":"/Users/Yutaka/Dropbox/pro/_Projects/_eom/20160811/src/script/xorshift.js"}],"/Users/Yutaka/Dropbox/pro/_Projects/_eom/20160811/src/script/triangulation-drawer.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TriangulationDrawer = function () {
  function TriangulationDrawer(_tri, _canvas) {
    _classCallCheck(this, TriangulationDrawer);

    var it = this;

    it.tri = _tri;

    it.canvas = _canvas;
    it.context = it.canvas.getContext('2d');

    it.rmx = 0.0;
    it.rox = 0.0;
    it.rmy = 0.0;
    it.roy = 0.0;

    it.currentA = null;
    it.currentB = null;
  }

  _createClass(TriangulationDrawer, [{
    key: 'range',
    value: function range(_ibx, _itx, _iby, _ity, _obx, _otx, _oby, _oty) {
      var it = this;

      it.rmx = (_otx - _obx) / (_itx - _ibx);
      it.rox = _ibx * it.rmx - _obx;
      it.rmy = (_oty - _oby) / (_ity - _iby);
      it.roy = _iby * it.rmy - _oby;
    }
  }, {
    key: 'drawVert',
    value: function drawVert(_index) {
      var it = this;

      var a = it.tri.getVert(_index);
      var b = it.tri.getVert(_index + 1);
      it.context.beginPath();
      it.context.moveTo(a.x * it.rmx - it.rox, a.y * it.rmy - it.roy);
      it.context.lineTo(b.x * it.rmx - it.rox, b.y * it.rmy - it.roy);
      it.context.stroke();
    }
  }, {
    key: 'drawTri',
    value: function drawTri(_index) {
      var it = this;

      var tri = it.tri.getTri(_index);
      it.context.beginPath();
      it.context.moveTo(tri.x1 * it.rmx - it.rox, tri.y1 * it.rmy - it.roy);
      it.context.lineTo(tri.x2 * it.rmx - it.rox, tri.y2 * it.rmy - it.roy);
      it.context.lineTo(tri.x3 * it.rmx - it.rox, tri.y3 * it.rmy - it.roy);
      it.context.closePath();
      it.context.fill();
      it.context.stroke();
    }
  }, {
    key: 'drawCurrent',
    value: function drawCurrent() {
      var it = this;

      if (!it.currentA || !it.currentB) {
        return;
      }

      it.context.beginPath();
      it.context.moveTo(it.currentA.x * it.rmx - it.rox, it.currentA.y * it.rmy - it.roy);
      it.context.lineTo(it.currentB.x * it.rmx - it.rox, it.currentB.y * it.rmy - it.roy);
      it.context.stroke();
    }
  }, {
    key: 'getCurrent',
    value: function getCurrent() {
      var it = this;

      it.currentA = it.tri.getVert(it.tri.vertIndex - 1);
      it.currentB = it.tri.getVert(it.tri.vertIndex + 1);
    }
  }, {
    key: 'draw',
    value: function draw() {
      var it = this;

      it.context.save();

      it.context.lineCap = 'round';
      it.context.lineJoin = 'round';

      it.context.lineWidth = 1;
      it.context.fillStyle = 'rgb( 220, 220, 220 )';
      it.context.strokeStyle = 'rgb( 30, 30, 30 )';
      for (var i = 0; i < it.tri.tri.length / 6; i++) {
        it.drawTri(i);
      }

      it.context.lineWidth = 2;
      it.context.strokeStyle = 'rgb( 0, 255, 90 )';
      for (var _i = 0; _i < it.tri.vert.length / 2; _i++) {
        it.drawVert(_i);
      }

      it.context.strokeStyle = 'rgb( 255, 0, 90 )';
      it.drawCurrent();

      it.context.restore();
    }
  }]);

  return TriangulationDrawer;
}();

exports.default = TriangulationDrawer;

},{}],"/Users/Yutaka/Dropbox/pro/_Projects/_eom/20160811/src/script/triangulation.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Triangulation = function () {
  function Triangulation(_vert) {
    _classCallCheck(this, Triangulation);

    var it = this;

    it.vert = _vert.concat();
    it.vertOri = it.vert.concat();
    it.vertIndex = 0;
    it.tri = [];

    it.finished = false;
  }

  _createClass(Triangulation, [{
    key: "reset",
    value: function reset() {
      var it = this;

      it.vert = it.vertOri.concat();
      it.vertIndex = 0;
      it.tri = [];

      it.finished = false;
    }
  }, {
    key: "getVert",
    value: function getVert(_index, _array) {
      var it = this;

      var array = _array || it.vert;
      var len = array.length / 2;
      var i = (_index + len) % len;
      return {
        x: array[i * 2],
        y: array[i * 2 + 1]
      };
    }
  }, {
    key: "getTri",
    value: function getTri(_index) {
      var it = this;

      var i = _index;
      return {
        x1: it.tri[i * 6],
        y1: it.tri[i * 6 + 1],
        x2: it.tri[i * 6 + 2],
        y2: it.tri[i * 6 + 3],
        x3: it.tri[i * 6 + 4],
        y3: it.tri[i * 6 + 5]
      };
    }

    // ref: http://qiita.com/ykob/items/ab7f30c43a0ed52d16f2

  }, {
    key: "isIntersect",
    value: function isIntersect(_a, _b, _c, _d) {
      var a = (_c.x - _d.x) * (_a.y - _c.y) + (_c.y - _d.y) * (_c.x - _a.x);
      var b = (_c.x - _d.x) * (_b.y - _c.y) + (_c.y - _d.y) * (_c.x - _b.x);
      var c = (_a.x - _b.x) * (_c.y - _a.y) + (_a.y - _b.y) * (_a.x - _c.x);
      var d = (_a.x - _b.x) * (_d.y - _a.y) + (_a.y - _b.y) * (_a.x - _d.x);

      return c * d < 0 && a * b < 0;
    }
  }, {
    key: "rotate",
    value: function rotate(_v, _r) {
      return {
        x: _v.x * Math.cos(_r) - _v.y * Math.sin(_r),
        y: _v.x * Math.sin(_r) + _v.y * Math.cos(_r)
      };
    }
  }, {
    key: "isConvex",
    value: function isConvex(_a, _b) {
      var it = this;

      var r = Math.atan2(_a.y, _a.x);
      var b = it.rotate(_b, -r);
      return b.y < 0.0;
    }
  }, {
    key: "isContain",
    value: function isContain(_a, _b, _c, _p) {
      var a = (_b.x - _a.x) * (_p.y - _b.y) - (_b.y - _a.y) * (_p.x - _b.x);
      var b = (_c.x - _b.x) * (_p.y - _c.y) - (_c.y - _b.y) * (_p.x - _c.x);
      var c = (_a.x - _c.x) * (_p.y - _a.y) - (_a.y - _c.y) * (_p.x - _a.x);

      if (a === 0 || b === 0 || c === 0) {
        return false;
      }

      return Math.sign(a) === Math.sign(b) && Math.sign(b) === Math.sign(c);
    }
  }, {
    key: "isValid",
    value: function isValid(_index) {
      var it = this;

      // if the vertex is convex
      var va = {
        x: it.getVert(_index - 1).x - it.getVert(_index).x,
        y: it.getVert(_index - 1).y - it.getVert(_index).y
      };
      var vb = {
        x: it.getVert(_index + 1).x - it.getVert(_index).x,
        y: it.getVert(_index + 1).y - it.getVert(_index).y
      };
      if (!it.isConvex(va, vb)) {
        return false;
      }

      // if there are no intersecting vertices
      for (var i = 0; i < it.vertOri.length / 2; i++) {
        var _va = it.getVert(_index - 1);
        var _vb = it.getVert(_index);
        var vc = it.getVert(_index + 1);

        if (i !== _index - 1 || i !== _index || i !== _index + 1) {
          var vp = it.getVert(i);
          if (it.isContain(_va, _vb, vc, vp)) {
            return false;
          }
        }

        if (it.isIntersect(_va, vc, it.getVert(i, it.vertOri), it.getVert(i + 1, it.vertOri))) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "isOnSameLine",
    value: function isOnSameLine(_a, _b, _c) {
      var d = (_c.x - _a.x) * (_b.y - _a.y) - (_c.y - _a.y) * (_b.x - _a.x);
      return Math.abs(d) < 1E-7;
    }
  }, {
    key: "makeTri",
    value: function makeTri(_index) {
      var it = this;

      var a = it.getVert(_index - 1);
      var b = it.getVert(_index);
      var c = it.getVert(_index + 1);
      if (!it.isOnSameLine(a, b, c)) {
        it.tri.push(a.x, a.y, b.x, b.y, c.x, c.y);
      }

      it.vert.splice(_index * 2, 2);
    }
  }, {
    key: "step",
    value: function step() {
      var it = this;

      var valid = it.isValid(it.vertIndex);

      if (it.vert.length === 6) {
        it.makeTri(0);
        it.vert = [];
        it.finished = true;
      } else if (valid) {
        it.makeTri(it.vertIndex);
      } else {
        it.vertIndex++;
      }

      it.vertIndex = it.vertIndex % (it.vert.length / 2.0);
    }
  }]);

  return Triangulation;
}();

exports.default = Triangulation;

},{}],"/Users/Yutaka/Dropbox/pro/_Projects/_eom/20160811/src/script/xorshift.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var seed = void 0;
var xorshift = function xorshift(_seed) {
  seed = _seed || seed || 1;
  seed = seed ^ seed << 13;
  seed = seed ^ seed >>> 17;
  seed = seed ^ seed << 5;
  return seed / Math.pow(2, 32) + 0.5;
};

exports.default = xorshift;

},{}]},{},["/Users/Yutaka/Dropbox/pro/_Projects/_eom/20160811/src/script/main.js"]);
