/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	window.common = __webpack_require__(96).default;
	__webpack_require__(465);

/***/ },

/***/ 92:
/***/ function(module, exports, __webpack_require__) {

	;(function (root, factory) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(93));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {

		(function (Math) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var Hasher = C_lib.Hasher;
		    var C_algo = C.algo;

		    // Constants table
		    var T = [];

		    // Compute constants
		    (function () {
		        for (var i = 0; i < 64; i++) {
		            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
		        }
		    }());

		    /**
		     * MD5 hash algorithm.
		     */
		    var MD5 = C_algo.MD5 = Hasher.extend({
		        _doReset: function () {
		            this._hash = new WordArray.init([
		                0x67452301, 0xefcdab89,
		                0x98badcfe, 0x10325476
		            ]);
		        },

		        _doProcessBlock: function (M, offset) {
		            // Swap endian
		            for (var i = 0; i < 16; i++) {
		                // Shortcuts
		                var offset_i = offset + i;
		                var M_offset_i = M[offset_i];

		                M[offset_i] = (
		                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
		                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
		                );
		            }

		            // Shortcuts
		            var H = this._hash.words;

		            var M_offset_0  = M[offset + 0];
		            var M_offset_1  = M[offset + 1];
		            var M_offset_2  = M[offset + 2];
		            var M_offset_3  = M[offset + 3];
		            var M_offset_4  = M[offset + 4];
		            var M_offset_5  = M[offset + 5];
		            var M_offset_6  = M[offset + 6];
		            var M_offset_7  = M[offset + 7];
		            var M_offset_8  = M[offset + 8];
		            var M_offset_9  = M[offset + 9];
		            var M_offset_10 = M[offset + 10];
		            var M_offset_11 = M[offset + 11];
		            var M_offset_12 = M[offset + 12];
		            var M_offset_13 = M[offset + 13];
		            var M_offset_14 = M[offset + 14];
		            var M_offset_15 = M[offset + 15];

		            // Working varialbes
		            var a = H[0];
		            var b = H[1];
		            var c = H[2];
		            var d = H[3];

		            // Computation
		            a = FF(a, b, c, d, M_offset_0,  7,  T[0]);
		            d = FF(d, a, b, c, M_offset_1,  12, T[1]);
		            c = FF(c, d, a, b, M_offset_2,  17, T[2]);
		            b = FF(b, c, d, a, M_offset_3,  22, T[3]);
		            a = FF(a, b, c, d, M_offset_4,  7,  T[4]);
		            d = FF(d, a, b, c, M_offset_5,  12, T[5]);
		            c = FF(c, d, a, b, M_offset_6,  17, T[6]);
		            b = FF(b, c, d, a, M_offset_7,  22, T[7]);
		            a = FF(a, b, c, d, M_offset_8,  7,  T[8]);
		            d = FF(d, a, b, c, M_offset_9,  12, T[9]);
		            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
		            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
		            a = FF(a, b, c, d, M_offset_12, 7,  T[12]);
		            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
		            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
		            b = FF(b, c, d, a, M_offset_15, 22, T[15]);

		            a = GG(a, b, c, d, M_offset_1,  5,  T[16]);
		            d = GG(d, a, b, c, M_offset_6,  9,  T[17]);
		            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
		            b = GG(b, c, d, a, M_offset_0,  20, T[19]);
		            a = GG(a, b, c, d, M_offset_5,  5,  T[20]);
		            d = GG(d, a, b, c, M_offset_10, 9,  T[21]);
		            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
		            b = GG(b, c, d, a, M_offset_4,  20, T[23]);
		            a = GG(a, b, c, d, M_offset_9,  5,  T[24]);
		            d = GG(d, a, b, c, M_offset_14, 9,  T[25]);
		            c = GG(c, d, a, b, M_offset_3,  14, T[26]);
		            b = GG(b, c, d, a, M_offset_8,  20, T[27]);
		            a = GG(a, b, c, d, M_offset_13, 5,  T[28]);
		            d = GG(d, a, b, c, M_offset_2,  9,  T[29]);
		            c = GG(c, d, a, b, M_offset_7,  14, T[30]);
		            b = GG(b, c, d, a, M_offset_12, 20, T[31]);

		            a = HH(a, b, c, d, M_offset_5,  4,  T[32]);
		            d = HH(d, a, b, c, M_offset_8,  11, T[33]);
		            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
		            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
		            a = HH(a, b, c, d, M_offset_1,  4,  T[36]);
		            d = HH(d, a, b, c, M_offset_4,  11, T[37]);
		            c = HH(c, d, a, b, M_offset_7,  16, T[38]);
		            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
		            a = HH(a, b, c, d, M_offset_13, 4,  T[40]);
		            d = HH(d, a, b, c, M_offset_0,  11, T[41]);
		            c = HH(c, d, a, b, M_offset_3,  16, T[42]);
		            b = HH(b, c, d, a, M_offset_6,  23, T[43]);
		            a = HH(a, b, c, d, M_offset_9,  4,  T[44]);
		            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
		            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
		            b = HH(b, c, d, a, M_offset_2,  23, T[47]);

		            a = II(a, b, c, d, M_offset_0,  6,  T[48]);
		            d = II(d, a, b, c, M_offset_7,  10, T[49]);
		            c = II(c, d, a, b, M_offset_14, 15, T[50]);
		            b = II(b, c, d, a, M_offset_5,  21, T[51]);
		            a = II(a, b, c, d, M_offset_12, 6,  T[52]);
		            d = II(d, a, b, c, M_offset_3,  10, T[53]);
		            c = II(c, d, a, b, M_offset_10, 15, T[54]);
		            b = II(b, c, d, a, M_offset_1,  21, T[55]);
		            a = II(a, b, c, d, M_offset_8,  6,  T[56]);
		            d = II(d, a, b, c, M_offset_15, 10, T[57]);
		            c = II(c, d, a, b, M_offset_6,  15, T[58]);
		            b = II(b, c, d, a, M_offset_13, 21, T[59]);
		            a = II(a, b, c, d, M_offset_4,  6,  T[60]);
		            d = II(d, a, b, c, M_offset_11, 10, T[61]);
		            c = II(c, d, a, b, M_offset_2,  15, T[62]);
		            b = II(b, c, d, a, M_offset_9,  21, T[63]);

		            // Intermediate hash value
		            H[0] = (H[0] + a) | 0;
		            H[1] = (H[1] + b) | 0;
		            H[2] = (H[2] + c) | 0;
		            H[3] = (H[3] + d) | 0;
		        },

		        _doFinalize: function () {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;

		            var nBitsTotal = this._nDataBytes * 8;
		            var nBitsLeft = data.sigBytes * 8;

		            // Add padding
		            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);

		            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
		            var nBitsTotalL = nBitsTotal;
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
		                (((nBitsTotalH << 8)  | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
		                (((nBitsTotalH << 24) | (nBitsTotalH >>> 8))  & 0xff00ff00)
		            );
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
		                (((nBitsTotalL << 8)  | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
		                (((nBitsTotalL << 24) | (nBitsTotalL >>> 8))  & 0xff00ff00)
		            );

		            data.sigBytes = (dataWords.length + 1) * 4;

		            // Hash final blocks
		            this._process();

		            // Shortcuts
		            var hash = this._hash;
		            var H = hash.words;

		            // Swap endian
		            for (var i = 0; i < 4; i++) {
		                // Shortcut
		                var H_i = H[i];

		                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
		                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
		            }

		            // Return final computed hash
		            return hash;
		        },

		        clone: function () {
		            var clone = Hasher.clone.call(this);
		            clone._hash = this._hash.clone();

		            return clone;
		        }
		    });

		    function FF(a, b, c, d, x, s, t) {
		        var n = a + ((b & c) | (~b & d)) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }

		    function GG(a, b, c, d, x, s, t) {
		        var n = a + ((b & d) | (c & ~d)) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }

		    function HH(a, b, c, d, x, s, t) {
		        var n = a + (b ^ c ^ d) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }

		    function II(a, b, c, d, x, s, t) {
		        var n = a + (c ^ (b | ~d)) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }

		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.MD5('message');
		     *     var hash = CryptoJS.MD5(wordArray);
		     */
		    C.MD5 = Hasher._createHelper(MD5);

		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacMD5(message, key);
		     */
		    C.HmacMD5 = Hasher._createHmacHelper(MD5);
		}(Math));


		return CryptoJS.MD5;

	}));

/***/ },

/***/ 93:
/***/ function(module, exports, __webpack_require__) {

	;(function (root, factory) {
		if (true) {
			// CommonJS
			module.exports = exports = factory();
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define([], factory);
		}
		else {
			// Global (browser)
			root.CryptoJS = factory();
		}
	}(this, function () {

		/**
		 * CryptoJS core components.
		 */
		var CryptoJS = CryptoJS || (function (Math, undefined) {
		    /*
		     * Local polyfil of Object.create
		     */
		    var create = Object.create || (function () {
		        function F() {};

		        return function (obj) {
		            var subtype;

		            F.prototype = obj;

		            subtype = new F();

		            F.prototype = null;

		            return subtype;
		        };
		    }())

		    /**
		     * CryptoJS namespace.
		     */
		    var C = {};

		    /**
		     * Library namespace.
		     */
		    var C_lib = C.lib = {};

		    /**
		     * Base object for prototypal inheritance.
		     */
		    var Base = C_lib.Base = (function () {


		        return {
		            /**
		             * Creates a new object that inherits from this object.
		             *
		             * @param {Object} overrides Properties to copy into the new object.
		             *
		             * @return {Object} The new object.
		             *
		             * @static
		             *
		             * @example
		             *
		             *     var MyType = CryptoJS.lib.Base.extend({
		             *         field: 'value',
		             *
		             *         method: function () {
		             *         }
		             *     });
		             */
		            extend: function (overrides) {
		                // Spawn
		                var subtype = create(this);

		                // Augment
		                if (overrides) {
		                    subtype.mixIn(overrides);
		                }

		                // Create default initializer
		                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
		                    subtype.init = function () {
		                        subtype.$super.init.apply(this, arguments);
		                    };
		                }

		                // Initializer's prototype is the subtype object
		                subtype.init.prototype = subtype;

		                // Reference supertype
		                subtype.$super = this;

		                return subtype;
		            },

		            /**
		             * Extends this object and runs the init method.
		             * Arguments to create() will be passed to init().
		             *
		             * @return {Object} The new object.
		             *
		             * @static
		             *
		             * @example
		             *
		             *     var instance = MyType.create();
		             */
		            create: function () {
		                var instance = this.extend();
		                instance.init.apply(instance, arguments);

		                return instance;
		            },

		            /**
		             * Initializes a newly created object.
		             * Override this method to add some logic when your objects are created.
		             *
		             * @example
		             *
		             *     var MyType = CryptoJS.lib.Base.extend({
		             *         init: function () {
		             *             // ...
		             *         }
		             *     });
		             */
		            init: function () {
		            },

		            /**
		             * Copies properties into this object.
		             *
		             * @param {Object} properties The properties to mix in.
		             *
		             * @example
		             *
		             *     MyType.mixIn({
		             *         field: 'value'
		             *     });
		             */
		            mixIn: function (properties) {
		                for (var propertyName in properties) {
		                    if (properties.hasOwnProperty(propertyName)) {
		                        this[propertyName] = properties[propertyName];
		                    }
		                }

		                // IE won't copy toString using the loop above
		                if (properties.hasOwnProperty('toString')) {
		                    this.toString = properties.toString;
		                }
		            },

		            /**
		             * Creates a copy of this object.
		             *
		             * @return {Object} The clone.
		             *
		             * @example
		             *
		             *     var clone = instance.clone();
		             */
		            clone: function () {
		                return this.init.prototype.extend(this);
		            }
		        };
		    }());

		    /**
		     * An array of 32-bit words.
		     *
		     * @property {Array} words The array of 32-bit words.
		     * @property {number} sigBytes The number of significant bytes in this word array.
		     */
		    var WordArray = C_lib.WordArray = Base.extend({
		        /**
		         * Initializes a newly created word array.
		         *
		         * @param {Array} words (Optional) An array of 32-bit words.
		         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.lib.WordArray.create();
		         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
		         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
		         */
		        init: function (words, sigBytes) {
		            words = this.words = words || [];

		            if (sigBytes != undefined) {
		                this.sigBytes = sigBytes;
		            } else {
		                this.sigBytes = words.length * 4;
		            }
		        },

		        /**
		         * Converts this word array to a string.
		         *
		         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
		         *
		         * @return {string} The stringified word array.
		         *
		         * @example
		         *
		         *     var string = wordArray + '';
		         *     var string = wordArray.toString();
		         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
		         */
		        toString: function (encoder) {
		            return (encoder || Hex).stringify(this);
		        },

		        /**
		         * Concatenates a word array to this word array.
		         *
		         * @param {WordArray} wordArray The word array to append.
		         *
		         * @return {WordArray} This word array.
		         *
		         * @example
		         *
		         *     wordArray1.concat(wordArray2);
		         */
		        concat: function (wordArray) {
		            // Shortcuts
		            var thisWords = this.words;
		            var thatWords = wordArray.words;
		            var thisSigBytes = this.sigBytes;
		            var thatSigBytes = wordArray.sigBytes;

		            // Clamp excess bits
		            this.clamp();

		            // Concat
		            if (thisSigBytes % 4) {
		                // Copy one byte at a time
		                for (var i = 0; i < thatSigBytes; i++) {
		                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
		                }
		            } else {
		                // Copy one word at a time
		                for (var i = 0; i < thatSigBytes; i += 4) {
		                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
		                }
		            }
		            this.sigBytes += thatSigBytes;

		            // Chainable
		            return this;
		        },

		        /**
		         * Removes insignificant bits.
		         *
		         * @example
		         *
		         *     wordArray.clamp();
		         */
		        clamp: function () {
		            // Shortcuts
		            var words = this.words;
		            var sigBytes = this.sigBytes;

		            // Clamp
		            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
		            words.length = Math.ceil(sigBytes / 4);
		        },

		        /**
		         * Creates a copy of this word array.
		         *
		         * @return {WordArray} The clone.
		         *
		         * @example
		         *
		         *     var clone = wordArray.clone();
		         */
		        clone: function () {
		            var clone = Base.clone.call(this);
		            clone.words = this.words.slice(0);

		            return clone;
		        },

		        /**
		         * Creates a word array filled with random bytes.
		         *
		         * @param {number} nBytes The number of random bytes to generate.
		         *
		         * @return {WordArray} The random word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.lib.WordArray.random(16);
		         */
		        random: function (nBytes) {
		            var words = [];

		            var r = (function (m_w) {
		                var m_w = m_w;
		                var m_z = 0x3ade68b1;
		                var mask = 0xffffffff;

		                return function () {
		                    m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
		                    m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
		                    var result = ((m_z << 0x10) + m_w) & mask;
		                    result /= 0x100000000;
		                    result += 0.5;
		                    return result * (Math.random() > .5 ? 1 : -1);
		                }
		            });

		            for (var i = 0, rcache; i < nBytes; i += 4) {
		                var _r = r((rcache || Math.random()) * 0x100000000);

		                rcache = _r() * 0x3ade67b7;
		                words.push((_r() * 0x100000000) | 0);
		            }

		            return new WordArray.init(words, nBytes);
		        }
		    });

		    /**
		     * Encoder namespace.
		     */
		    var C_enc = C.enc = {};

		    /**
		     * Hex encoding strategy.
		     */
		    var Hex = C_enc.Hex = {
		        /**
		         * Converts a word array to a hex string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The hex string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;

		            // Convert
		            var hexChars = [];
		            for (var i = 0; i < sigBytes; i++) {
		                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		                hexChars.push((bite >>> 4).toString(16));
		                hexChars.push((bite & 0x0f).toString(16));
		            }

		            return hexChars.join('');
		        },

		        /**
		         * Converts a hex string to a word array.
		         *
		         * @param {string} hexStr The hex string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
		         */
		        parse: function (hexStr) {
		            // Shortcut
		            var hexStrLength = hexStr.length;

		            // Convert
		            var words = [];
		            for (var i = 0; i < hexStrLength; i += 2) {
		                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
		            }

		            return new WordArray.init(words, hexStrLength / 2);
		        }
		    };

		    /**
		     * Latin1 encoding strategy.
		     */
		    var Latin1 = C_enc.Latin1 = {
		        /**
		         * Converts a word array to a Latin1 string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The Latin1 string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;

		            // Convert
		            var latin1Chars = [];
		            for (var i = 0; i < sigBytes; i++) {
		                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		                latin1Chars.push(String.fromCharCode(bite));
		            }

		            return latin1Chars.join('');
		        },

		        /**
		         * Converts a Latin1 string to a word array.
		         *
		         * @param {string} latin1Str The Latin1 string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
		         */
		        parse: function (latin1Str) {
		            // Shortcut
		            var latin1StrLength = latin1Str.length;

		            // Convert
		            var words = [];
		            for (var i = 0; i < latin1StrLength; i++) {
		                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
		            }

		            return new WordArray.init(words, latin1StrLength);
		        }
		    };

		    /**
		     * UTF-8 encoding strategy.
		     */
		    var Utf8 = C_enc.Utf8 = {
		        /**
		         * Converts a word array to a UTF-8 string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The UTF-8 string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            try {
		                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
		            } catch (e) {
		                throw new Error('Malformed UTF-8 data');
		            }
		        },

		        /**
		         * Converts a UTF-8 string to a word array.
		         *
		         * @param {string} utf8Str The UTF-8 string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
		         */
		        parse: function (utf8Str) {
		            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
		        }
		    };

		    /**
		     * Abstract buffered block algorithm template.
		     *
		     * The property blockSize must be implemented in a concrete subtype.
		     *
		     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
		     */
		    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
		        /**
		         * Resets this block algorithm's data buffer to its initial state.
		         *
		         * @example
		         *
		         *     bufferedBlockAlgorithm.reset();
		         */
		        reset: function () {
		            // Initial values
		            this._data = new WordArray.init();
		            this._nDataBytes = 0;
		        },

		        /**
		         * Adds new data to this block algorithm's buffer.
		         *
		         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
		         *
		         * @example
		         *
		         *     bufferedBlockAlgorithm._append('data');
		         *     bufferedBlockAlgorithm._append(wordArray);
		         */
		        _append: function (data) {
		            // Convert string to WordArray, else assume WordArray already
		            if (typeof data == 'string') {
		                data = Utf8.parse(data);
		            }

		            // Append
		            this._data.concat(data);
		            this._nDataBytes += data.sigBytes;
		        },

		        /**
		         * Processes available data blocks.
		         *
		         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
		         *
		         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
		         *
		         * @return {WordArray} The processed data.
		         *
		         * @example
		         *
		         *     var processedData = bufferedBlockAlgorithm._process();
		         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
		         */
		        _process: function (doFlush) {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;
		            var dataSigBytes = data.sigBytes;
		            var blockSize = this.blockSize;
		            var blockSizeBytes = blockSize * 4;

		            // Count blocks ready
		            var nBlocksReady = dataSigBytes / blockSizeBytes;
		            if (doFlush) {
		                // Round up to include partial blocks
		                nBlocksReady = Math.ceil(nBlocksReady);
		            } else {
		                // Round down to include only full blocks,
		                // less the number of blocks that must remain in the buffer
		                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
		            }

		            // Count words ready
		            var nWordsReady = nBlocksReady * blockSize;

		            // Count bytes ready
		            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

		            // Process blocks
		            if (nWordsReady) {
		                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
		                    // Perform concrete-algorithm logic
		                    this._doProcessBlock(dataWords, offset);
		                }

		                // Remove processed words
		                var processedWords = dataWords.splice(0, nWordsReady);
		                data.sigBytes -= nBytesReady;
		            }

		            // Return processed words
		            return new WordArray.init(processedWords, nBytesReady);
		        },

		        /**
		         * Creates a copy of this object.
		         *
		         * @return {Object} The clone.
		         *
		         * @example
		         *
		         *     var clone = bufferedBlockAlgorithm.clone();
		         */
		        clone: function () {
		            var clone = Base.clone.call(this);
		            clone._data = this._data.clone();

		            return clone;
		        },

		        _minBufferSize: 0
		    });

		    /**
		     * Abstract hasher template.
		     *
		     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
		     */
		    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
		        /**
		         * Configuration options.
		         */
		        cfg: Base.extend(),

		        /**
		         * Initializes a newly created hasher.
		         *
		         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
		         *
		         * @example
		         *
		         *     var hasher = CryptoJS.algo.SHA256.create();
		         */
		        init: function (cfg) {
		            // Apply config defaults
		            this.cfg = this.cfg.extend(cfg);

		            // Set initial values
		            this.reset();
		        },

		        /**
		         * Resets this hasher to its initial state.
		         *
		         * @example
		         *
		         *     hasher.reset();
		         */
		        reset: function () {
		            // Reset data buffer
		            BufferedBlockAlgorithm.reset.call(this);

		            // Perform concrete-hasher logic
		            this._doReset();
		        },

		        /**
		         * Updates this hasher with a message.
		         *
		         * @param {WordArray|string} messageUpdate The message to append.
		         *
		         * @return {Hasher} This hasher.
		         *
		         * @example
		         *
		         *     hasher.update('message');
		         *     hasher.update(wordArray);
		         */
		        update: function (messageUpdate) {
		            // Append
		            this._append(messageUpdate);

		            // Update the hash
		            this._process();

		            // Chainable
		            return this;
		        },

		        /**
		         * Finalizes the hash computation.
		         * Note that the finalize operation is effectively a destructive, read-once operation.
		         *
		         * @param {WordArray|string} messageUpdate (Optional) A final message update.
		         *
		         * @return {WordArray} The hash.
		         *
		         * @example
		         *
		         *     var hash = hasher.finalize();
		         *     var hash = hasher.finalize('message');
		         *     var hash = hasher.finalize(wordArray);
		         */
		        finalize: function (messageUpdate) {
		            // Final message update
		            if (messageUpdate) {
		                this._append(messageUpdate);
		            }

		            // Perform concrete-hasher logic
		            var hash = this._doFinalize();

		            return hash;
		        },

		        blockSize: 512/32,

		        /**
		         * Creates a shortcut function to a hasher's object interface.
		         *
		         * @param {Hasher} hasher The hasher to create a helper for.
		         *
		         * @return {Function} The shortcut function.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
		         */
		        _createHelper: function (hasher) {
		            return function (message, cfg) {
		                return new hasher.init(cfg).finalize(message);
		            };
		        },

		        /**
		         * Creates a shortcut function to the HMAC's object interface.
		         *
		         * @param {Hasher} hasher The hasher to use in this HMAC helper.
		         *
		         * @return {Function} The shortcut function.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
		         */
		        _createHmacHelper: function (hasher) {
		            return function (message, key) {
		                return new C_algo.HMAC.init(hasher, key).finalize(message);
		            };
		        }
		    });

		    /**
		     * Algorithm namespace.
		     */
		    var C_algo = C.algo = {};

		    return C;
		}(Math));


		return CryptoJS;

	}));

/***/ },

/***/ 96:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _md = __webpack_require__(92);

	var _md2 = _interopRequireDefault(_md);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var strSign = function strSign(str, flag) {
	    var obj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    var strObj = sortObj(str, flag, obj); //字符串 传入当前的信息名称
	    var str = ''; //重新获取编译后的字符串
	    for (var i in strObj) {
	        //变成键值对的形式
	        str += i + '=' + strObj[i] + '&';
	    }
	    return strObj;
	}; // var crypto = require('crypto')


	var sortObj = function sortObj(dataVersion, flag) {
	    var obj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    //传入当前的信息名称 如feed
	    var string = '';
	    var strObj = {};
	    var t = null;
	    var tValue = null;
	    var arrKey = ['shop_url', 'sess_key', 'device_token', 'format', 'ts', 'osv', 'wh', 'data_version']; //需要上传的参数

	    /**
	     * 获取当前的版本号信息,如果没有取0
	     */
	    var osv = "web_h5_*_*";
	    if (window.Units && Units.isApp() && Units.isIOS()) {
	        osv = "web_ios_*_*";
	    }
	    if (window.Units && Units.isApp() && Units.isAndroid()) {
	        osv = "web_android_*_*";
	    }
	    var arrValue = [];
	    if (flag && !window.isPrivateMode) {
	        arrValue = [location.host, document.cookie.split(';').filter(function (x) {
	            return x.indexOf("dvdsid") > -1;
	        })[0] ? document.cookie.split(';').filter(function (x) {
	            return x.indexOf("dvdsid") > -1;
	        })[0].split("=")[1] : 0, "", 'json', new Date().getTime(), osv, '750_1334', 0];
	    } else {
	        // log('this is isPrivateMode or flag is false')
	        arrValue = [location.host, document.cookie.split(';').filter(function (x) {
	            return x.indexOf("dvdsid") > -1;
	        })[0] ? document.cookie.split(';').filter(function (x) {
	            return x.indexOf("dvdsid") > -1;
	        })[0].split("=")[1] : 0, "", 'json', new Date().getTime(), osv, '750_1334', 0];
	    }

	    for (var item in obj) {
	        arrKey.push(item.toString());
	        arrValue.push(obj[item]);
	    }

	    for (var i = 0; i < arrKey.length; i++) {
	        for (var j = 0; j < arrKey.length - i - 1; j++) {
	            if (arrKey[j] > arrKey[j + 1]) {
	                t = arrKey[j + 1];
	                arrKey[j + 1] = arrKey[j];
	                arrKey[j] = t;

	                tValue = arrValue[j + 1];
	                arrValue[j + 1] = arrValue[j];
	                arrValue[j] = tValue;
	            }
	        }
	    }
	    for (var _i = 0; _i < arrKey.length; _i++) {
	        strObj[arrKey[_i]] = arrValue[_i];
	    }
	    for (var p in strObj) {
	        string += p + '=' + strObj[p];
	    }
	    var sign = md5(string).toUpperCase();
	    strObj.sign = sign;
	    return strObj;
	};

	// let md5 = (str="") => crypto.createHash('md5').update(str, 'utf8').digest('hex')
	var md5 = function md5() {
	    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	    return (0, _md2.default)(str).toString().toUpperCase();
	};

	var dataVersion = function dataVersion(str) {
	    var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    // 信息名称 以及该信息下的所有需要上传的信息
	    if (obj.data_version && !window.isPrivateMode) {
	        //如果数据版本号不为0
	        if (sessionStorage.getItem('dataVersion')) {
	            //如果缓存中有版本号
	            var o = JSON.parse(sessionStorage.getItem('dataVersion'));
	            o[str] = obj.data_version;
	            sessionStorage.setItem('dataVersion', JSON.stringify(o)); //改变当前的所需要信息的版本号 其余的版本号不变
	        } else {
	            var o = {};
	            o[str] = obj.data_version;
	            sessionStorage.setItem('dataVersion', JSON.stringify(o));
	        }
	    }
	};

	var getDataWithSign = function getDataWithSign(opt) {
	    log("get Data WithSign, opt is");
	    log(opt);

	    opt.updata = opt.updata || opt.data || {};

	    if (window.isPrivateMode) {
	        log('您现在在用隐身模式访问接口，请切换到常规模式');
	    }
	    var flag = opt.flag || 0;
	    var dataurl = opt.url + "?t=" + Date.now();
	    if (!opt.url) {
	        console.warn('缺少必要url参数');
	        return;
	    }
	    var keyName = opt.keyName || md5LocalKey(opt.url, opt.updata);
	    var success1 = opt.success;
	    var data = "";
	    var error1 = opt.error;
	    var obj = opt.updata;

	    obj = obj || {};
	    for (var i = 0, d; d = ["rp", 'rl', 'logDp', 'dp'][i++];) {
	        var tmp_value = window.Units && Units.getQuery(d);
	        if (tmp_value) {
	            obj[d] = tmp_value;
	        }
	    }

	    var updatas = strSign(keyName, flag, obj);
	    log('ajax－>', dataurl);

	    $.ajax({
	        type: "POST",
	        url: dataurl, //数据地址
	        data: updatas, //获得了所有信息 店铺地址 版本号 等 flag来确定是否传入版本号
	        dataType: 'json',
	        success: function success(result) {
	            // data.data = false;
	            if (!window.isPrivateMode) {
	                //如果不是隐身模式，能在本地存储
	                //如果版本号相同，取本地的数据，下拉的时候每次的版本号都不一样 不走这一步
	                // if (sessionStorage.getItem('dataVersion') && JSON.parse(sessionStorage.getItem('dataVersion'))[keyName] && (result.data_version === JSON.parse(sessionStorage.getItem('dataVersion'))[keyName])) {
	                //     if (flag) {//如果万一 下拉数据的版本号一样 不取本地的数据 下拉false 不是下拉 true
	                //         data = JSON.parse(localStorage.getItem(keyName))
	                //     }else{
	                //         data = result
	                //     }
	                // } else {//如果版本号不一样
	                data = result; //取最新的数据
	                if (flag) {
	                    //不是下拉的时候 在本地存储
	                    localStorage.setItem(keyName, JSON.stringify(result));
	                }
	                // localStorage.setItem(keyName, JSON.stringify(result))
	                // }
	            } else {
	                data = result;
	            }
	            // dataVersion(keyName, result);//在缓存中放入最新的该链接取得数据的版本号
	            success1(data);
	            log("getDataWithSign " + dataurl + " success :");
	            log(data);
	        },
	        error: function error(e) {
	            error1(e);
	            log("getDataWithSign " + dataurl + " err :");
	            log(e);
	        }
	    });
	};

	var postStatisticsData = function postStatisticsData(opt, productionData, callback) {
	    var baseStatisticsData = {
	        "ip": "", //ip
	        "nxtime": "", //ng时间
	        "timestamp": Date.now(), //日志时间
	        "production": '1', //业务线 数据字典稍后定
	        "log_source": '1', //日志来源 数据字典稍后定
	        "user_agent": navigator.userAgent, //浏览器UA
	        "market": "", //来源市场
	        "uid": getUid(), //用户id
	        "session": getSession(), //session id
	        "status": getVisitorStatus(), //卖家状态 (0：游客 1:买家 3:卖家)
	        "device": "", //设备类型
	        "device_id": "", //设备号
	        "sys_version": "", //设备版本号
	        "resolution": window.screen.width + '*' + window.screen.height, //分辨率
	        "location": "", //当前位置
	        "app_version": "", //APP版本号
	        "action": '1', //操作action 数据字典稍后定，click，view，
	        "action_type": "1", //操作类型（元素）
	        "object_id": "", //操作对象id（url）
	        "production_data": {}
	    };
	    for (var i in opt) {
	        baseStatisticsData[i] = opt[i];
	    }
	    baseStatisticsData['production_data'] = productionData;
	    $.ajax({
	        url: '/appapi',
	        type: "post",
	        data: JSON.stringify(baseStatisticsData),
	        success: function success(result) {
	            if (result == "success_1") {
	                callback && callback();
	            }
	        }, error: function error() {}
	    });
	};

	var getDvdsid = function getDvdsid() {
	    var result = "",
	        list = document.cookie.split(";").filter(function (x) {
	        return x.indexOf("dvdsid") > -1;
	    });
	    if (list.length) {
	        result = list[0].split("=")[1];
	    }
	    return result;
	};

	var getSession = function getSession() {
	    var dvdsid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getDvdsid();
	    return dvdsid ? dvdsid.substr(0, 32) : dvdsid;
	};

	var getUid = function getUid() {
	    var dvdsid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getDvdsid();
	    return dvdsid ? Number('0x' + dvdsid.substr(32, 7)) + "" : dvdsid;
	};

	var getVisitorStatus = function getVisitorStatus() {
	    var dvdsid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getDvdsid();
	    return ["0", "1", "3"][dvdsid ? dvdsid.substr(39, 1) : 1];
	};

	var baseJumpUrl = function baseJumpUrl() {
	    return {
	        courseHomePage: "/course.html",
	        courseIntroducePage: function courseIntroducePage(id) {
	            return "/course-" + id + ".html";
	        },
	        coursePage: function coursePage(id) {
	            return "/course_room-" + id + ".html";
	        }
	    };
	};
	var md5LocalKey = function md5LocalKey(url) {
	    var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    var str = ''; //获取请求接口和业务参数的字符串
	    //排除翻页游标导致的key值不一样
	    var strObj = JSON.stringify(obj);
	    var objStr = JSON.parse(strObj);

	    if (objStr["pageIndex"]) {
	        objStr["pageIndex"] = 0;
	    }
	    for (var i in objStr) {
	        str += i + '=' + objStr[i] + '&';
	    }
	    str = str + url;
	    str = md5(str);
	    log(str);
	    return str;
	};

	var log = function log() {
	    var href = location.href,
	        dev = href.indexOf("bravetime.net") > -1,
	        prod = href.indexOf("davdian.com") > -1;

	    for (var _len = arguments.length, obj = Array(_len), _key = 0; _key < _len; _key++) {
	        obj[_key] = arguments[_key];
	    }

	    if (dev) {
	        console.log(obj);
	    } else if (prod) {
	        if (window.logInfo) {
	            window.logInfo.push(obj);
	        } else {
	            window.logInfo = [obj];
	        }
	    }
	};

	var initShare = function initShare() {
	    var share_source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	    window.tlShareCallback = function () {
	        postStatisticsData({ action_type: "0", production: "5" }, { share_source: share_source + "", source_url: location.href, share_type: "1" });
	    };
	    window.sendShareCallback = function () {
	        postStatisticsData({ action_type: "0", production: "5" }, { share_source: share_source + "", source_url: location.href, share_type: "2" });
	    };
	    window.QQShareCallback = function () {
	        postStatisticsData({ action_type: "0", production: "5" }, { share_source: share_source + "", source_url: location.href, share_type: "3" });
	    };
	    window.qZoneShareCallbackCancel = function () {
	        postStatisticsData({ action_type: "0", production: "5" }, { share_source: share_source + "", source_url: location.href, share_type: "4" });
	    };
	};

	var common = {
	    getDataWithSign: getDataWithSign,
	    sortObj: sortObj,
	    strSign: strSign,
	    dataVersion: dataVersion,
	    baseJumpUrl: baseJumpUrl,
	    postStatisticsData: postStatisticsData,
	    md5: md5,
	    md5LocalKey: md5LocalKey,
	    getUid: getUid,
	    getDvdsid: getDvdsid,
	    log: log,
	    initShare: initShare
	};
	exports.default = common;

/***/ },

/***/ 465:
/***/ function(module, exports) {

	$(function(){
	    //去掉价格后面的0
	    function removeZero(price) {
	      var regs = /\.[1-9]0$/ig;
	      var oldPrice = price.toFixed(2);
	      var newPrice = 0;

	      if (oldPrice.indexOf('.00') > -1) {
	        newPrice = parseInt(oldPrice);
	      } else if (regs.test(oldPrice)) {
	        newPrice = oldPrice.substring(0,oldPrice.length - 1);
	      } else {
	        newPrice = oldPrice;
	      }

	      return newPrice;
	    }

	    var password = null,commissionNumber = 0;

	    // 选择身份证信息返回来刷新页面
	    //获取身份证添加页面的cookie
	    var idcardreload=sessionStorage.getItem('checkout_cookie');
	    if(idcardreload=='checkout_idcard'){
	        sessionStorage.removeItem('checkout_cookie');
	        location.reload();
	    }

	    // 切换身份证信息
	    $(".idcard").click(function () {
	        if($(".change_address_container").length){
	            var Addressee= $.trim($(".change_address_container .name").html());
	            sessionStorage.setItem("Addressee",Addressee);
	        }
	        if(window.Units && Units.isApp()){
	            appdata();
	        }else {
	            location.href=window.idcardListUrl;
	        }
	    });

	    function appdata() {
	        var callback=function (result) {
	            if(window.__DEBUG){
	                alert("call");
	            }

	            if(+result.code){
	                var Addressee=sessionStorage.getItem("Addressee");
	                bravetime.addLoader({little: true});
	                common.getDataWithSign({
	                    url: window.idcardCheckoutUrl,
	                    type: "POST",
	                    dataType: 'json',
	                    updata: {
	                        id: result.id,
	                        cardName:Addressee
	                    },
	                    success: function (result) {
	                        bravetime.removeLoader();
	                        if(window.__DEBUG) {
	                            alert("result" + JSON.stringify(result));
	                        }
	                        if(result.code){
	                            bravetime.info(result.data.msg);
	                        }
	                        else {
	                            //选择证件信息成功后去掉收货人姓名
	                            sessionStorage.removeItem("Addressee");
	                            //记录被选中,在订单确认页获取,如果有就刷新订单确认页面
	                            // sessionStorage.setItem("idcard","idcardcheck");
	                            location.reload();
	                        }
	                    },
	                    error: function () {
	                        if(window.__DEBUG) {
	                            alert("error");
	                        }
	                        bravetime.removeLoader();
	                        bravetime.info("网络异常，请稍后重试");
	                    }
	                });
	            }else{
	                if(window.__DEBUG) {
	                    alert("code :" + result.code);
	                }
	                bravetime.removeLoader();
	                location.reload();
	            }
	        };
	        var mincallback=function () {
	            location.href=window.idcardListUrl;
	        };
	        window.bravetime.selectIdentity(callback,mincallback);
	    };

	    // 更换身份证信息从列表页返回来刷新页面,清空cookie
	    var checkout=sessionStorage.getItem("idcard");
	    if(checkout=="idcardcheck"){
	        sessionStorage.removeItem("idcard");
	        location.reload();
	    }

	    var cartConfirmContainer = $(".cart_confirm_container");
	    if (cartConfirmContainer && cartConfirmContainer.length) {
	        var page = window.page || "订单确认页", scroller, bounsId = defaultBonusId || 0,
	            line_price = window.line_price||59,
	            orderAmount = window.orderAmount || 0,fee = +window.fee_price||0;
	        // 重新加载
	        reload();

	        //// 提示输入身份证
	        //cartConfirmContainer.find(".other_address").find(".icon").click(function (event) {
	        //    window.bravetime.newConfirm("<span style='color:#666;text-align:left;'>您的订单中包含跨境商品，需要办理正常的清关手续，请填写与收货人姓名一致的身份证号和邮编信息，否则无法办理清关手续，影响您及时收货。</span>", {
	        //        okText: "新技能get",
	        //        hideCancel: true
	        //    });
	        //});

	        var bonus_cart = $(".js-to-hide-cart");
	        var bonus_b = $(".js-to-hide-bonus");
	        var commission = $(".js-to-hide-commission");
	        var no_bonus = bonus_b.find(".not_used_red");
	        var no_bonus_flag = no_bonus.find(".selected_state_small_default");
	        var bonus_list = bonus_b.find(".bouns_item");
	        var bonus_list_flags = bonus_list.find(".selected_state_default");
	        var bonus_text = bonus_cart.find(".bonus_num");

	        // 红包
	        $(".bouns_con").click(function () {
	            bonus_cart.addClass("hide");
	            bonus_b.removeClass("hide");
	            history.pushState("__virtual__page__bonus", "????");
	        });

	        window.onpopstate = function (event) {
	            showCart();
	        };

	        function showCart() {
	            //TODO 在红包列表页和订单确认页之间切换时会带着滚动
	            //TODO 在红包返回时会莫名其妙刷新，什么时候刷新呀 也没有注释fffff
	            bonus_cart.removeClass("hide");
	            bonus_b.addClass("hide");
	            commission.addClass("hide");
	        }

	        // 返现
	        $(".commission_con").click(function () {
	            // 已经使用返现就展示不用返现
	            var alreadyUse = $(this).hasClass("already_use");

	            $(".no_commission").toggleClass("hide",!alreadyUse);
	            $(".enter_password_con").toggleClass("hide",alreadyUse);

	            $(".enter_password_input").val("");
	            bonus_cart.addClass("hide");
	            bonus_b.addClass("hide");
	            commission.removeClass("hide");
	            $("body").addClass("commission_use");
	            history.pushState("__virtual__page__commission", "????");
	        });

	        // 点击不使用返现
	        $(".no_commission").click(function () {
	            password = null;
	            $(".password").html("输密码可使用").addClass("enter_password").removeClass("commission_num");
	            $("#brokerage").html('-￥0');
	            $(".commission_con").removeClass("already_use");
	            var numStr = $("#reduce_bouns").html(),num;
	            if(numStr){
	                num=+numStr.replace("-￥","");// 获取红包
	            }else {
	                num = 0;
	            }
	            if(orderAmount-num>=line_price){
	                var postFee = 0;
	            }else{
	                var postFee = fee;
	            }

	            // 修改邮费 removeZero
	            // $(".price_add").find(".item_num").html('￥'+postFee.toFixed(2));
	            $(".price_add").find(".item_num").html('￥'+removeZero(postFee));
	            // 改应付金额
	            // $("#all_price_reduce_bouns").html("￥" + (orderAmount - num+postFee).toFixed(2));
	            $("#all_price_reduce_bouns").html("￥" + removeZero(orderAmount - num+postFee));

	            commissionNumber=0;
	            history.back();
	        });

	        window.onpopstate = function (event) {
	            hideCommission();
	        };

	        function hideCommission() {
	            //TODO 在红包列表页和订单确认页之间切换时会带着滚动
	            //TODO 在红包返回时会莫名其妙刷新，什么时候刷新呀 也没有注释fffff
	            bonus_cart.removeClass("hide");
	            bonus_b.addClass("hide");
	            commission.addClass("hide");
	            $("body").removeClass("commission_use");
	        }

	        // 点击确认使用
	        $(".sure_use").click(function(){
	            var payPassword= $(".enter_password_input").val();
	            $.ajax({
	                url: payPasswordUrl,
	                type: 'POST',
	                dataType: 'json',
	                data: {
	                    password: payPassword
	                },
	                success: function (result) {
	                    if (result.code == 0) {
	                        password = payPassword;
	                        var be_usable=+$(".be_usable").html().replace("元","");
	                        // $(".password").html((be_usable).toFixed(2)+"元").removeClass("enter_password").addClass("commission_num");
	                        $(".password").html(removeZero(be_usable)+"元").removeClass("enter_password").addClass("commission_num");
	                        // $("#brokerage").html('-￥'+ (be_usable).toFixed(2));
	                        $("#brokerage").html('-￥'+ removeZero(be_usable));
	                        $(".commission_con").addClass("already_use");

	                        history.back();
	                        var numStr = $("#reduce_bouns").html(),num;
	                        if(numStr){
	                            num=+numStr.replace("-￥","");// 获取红包 removeZero
	                        }else {
	                            num = 0;
	                        }

	                        if(orderAmount-num>=line_price){
	                            var postFee = 0;
	                        }else{
	                            var postFee = fee;
	                        }


	                        // 修改邮费
	                        // $(".price_add").find(".item_num").html('￥'+(postFee).toFixed(2));
	                        $(".price_add").find(".item_num").html('￥'+removeZero(postFee));
	                        // 改应付金额
	                        // $("#all_price_reduce_bouns").html("￥" + (orderAmount - num - be_usable+postFee).toFixed(2));
	                        $("#all_price_reduce_bouns").html("￥" + removeZero(orderAmount - num - be_usable+postFee));

	                        commissionNumber = be_usable;
	                    } else {
	                        bravetime.info(result.msg);
	                    }
	                },
	                error: function () {
	                    bravetime.info("网络错误,请重试");
	                }
	            });
	        });

	        // 选择暂时不用红包
	        no_bonus.click(function () {
	            no_bonus_flag.addClass("selected_state_red");
	            bounsId = 0;
	            bonus_list_flags.removeClass("selected_state_selected");
	            bonus_text.html("暂不使用红包").addClass("enter_password");
	            cartConfirmContainer.find(".bouns_title").find(".bouns_number").html("0元");
	            $("#reduce_bouns").html("-￥0");

	            if(orderAmount>=line_price){
	                var postFee = 0;
	            }else{
	                var postFee = fee;
	            }


	            //removeZero
	            // $(".price_add").find(".item_num").html('￥'+(postFee).toFixed(2));
	            $(".price_add").find(".item_num").html('￥'+removeZero(postFee));

	            // 重新计算返现金额
	            commissionNumber = Math.min(window.maxUseIncome,(orderAmount+postFee)*commissionRate);
	            // 改应付金额
	            var payAmount =orderAmount-commissionNumber*(+(!!password)) +postFee;
	            // $("#all_price_reduce_bouns").html("￥" + (payAmount).toFixed(2));
	            $("#all_price_reduce_bouns").html("￥" + removeZero(payAmount));

	            // $(".be_usable").html(commissionNumber.toFixed(2)+"元");
	            // $(".commission_num").html(commissionNumber.toFixed(2)+"元");
	            // $("#brokerage").html("-￥"+(commissionNumber*(+(!!password))).toFixed(2));
	            $("#brokerage").html("-￥"+removeZero(commissionNumber*(+(!!password))));
	            $(".be_usable").html(removeZero(commissionNumber)+"元");
	            $(".commission_num").html(removeZero(commissionNumber)+"元");
	            history.back();
	            showCart();
	            $.ajax({
	                url: window.changeUrl,
	                data: {bonus_id: 0},
	                success: function () {
	                    bravetime.removeLoader();
	                },
	                error: function () {
	                    bravetime.removeLoader();
	                }
	            });
	        });

	        // 选择一个红包的时候 removeZero
	        bonus_list.click(function () {
	            var minAmount = $(this).attr("data-for-min-amount");
	            var num = +$(this).attr("data-for-num");
	            var tmp_bonus_id = $(this).attr("data-for-id");
	            // var numTxt = num.toFixed(2);
	            var numTxt = removeZero(num);

	            if ($(this).hasClass("bouns_pink")) {
	                bravetime.newAlert("此红包满" + minAmount + "元才能使用");
	                return false;
	            } else if ($(this).hasClass("bouns_red")) {
	                no_bonus_flag.removeClass("selected_state_red");
	                bonus_list_flags.removeClass("selected_state_selected");
	                $(this).find(".selected_state_default").addClass("selected_state_selected");
	                bonus_text.html(num + "元").removeClass("enter_password");
	                bounsId = tmp_bonus_id;
	                changeOtherHtml();
	                history.back();
	                showCart();
	                bravetime.addLoader({little: true});
	                $.ajax({
	                    url: window.changeUrl,
	                    data: {bonus_id: bounsId},
	                    success: function () {
	                        bravetime.removeLoader();
	                    },
	                    error: function () {
	                        bravetime.removeLoader();
	                    }
	                });
	            }

	            function changeOtherHtml() {
	                if (orderAmount >= minAmount) {
	                    $("#reduce_bouns").html("-￥" + numTxt);

	                    if(orderAmount-num>=line_price){
	                        var postFee = 0;
	                    }else{
	                        var postFee = fee;
	                    }

	                    // 修改邮费 removeZero
	                    // $(".price_add").find(".item_num").html('￥'+(postFee).toFixed(2));
	                    $(".price_add").find(".item_num").html('￥'+removeZero(postFee));
	                    // 重新计算返现金额
	                    commissionNumber = Math.min(window.maxUseIncome,(orderAmount+postFee- num)*commissionRate);
	                    // 改应付金额
	                    var payAmount = orderAmount - num - (commissionNumber*(+(!!password)))+postFee;
	                    // $("#all_price_reduce_bouns").html("￥" + (payAmount).toFixed(2));
	                    $("#all_price_reduce_bouns").html("￥" + removeZero(payAmount));

	                    // $(".be_usable").html(commissionNumber.toFixed(2)+"元");
	                    // $(".commission_num").html(commissionNumber.toFixed(2)+"元");
	                    // $("#brokerage").html("-￥"+(commissionNumber*(+(!!password))).toFixed(2));
	                    $("#brokerage").html("-￥"+removeZero(commissionNumber*(+(!!password))));
	                    $(".be_usable").html(removeZero(commissionNumber)+"元");
	                    $(".commission_num").html(removeZero(commissionNumber)+"元");
	                    // commission_num
	                } else {
	                    window.bravetime.newAlert("您选择的红包金额过大");
	                }
	            }

	        });


	        function oldBonus() {
	            var items = cartConfirmContainer.find(".b_item");
	            var bounsNum = items.length; // 红包数量
	            if (bounsNum) {
	                $(".bouns_scroll").css("width", 170 * items.length + "px");
	                var myScroll = new IScroll('#fffuc', {
	                    scrollX: true,
	                    scrollY: false,
	                    mouseWheel: true,
	                    tap: true,
	                    preventDefaultException: false,
	                    preventDefaultException: {tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|DIV)$/}
	                });
	                scroller = myScroll;
	                cartConfirmContainer.find(".choice_bouns").on("click", function () {
	                    var me = $(this);
	                    if ($(".bouns_container").hasClass('hide')) {
	                        $(".bouns_container").removeClass("hide");
	                        me.find(".icon").removeClass('down');
	                    } else {

	                        $(".bouns_container").addClass("hide");
	                        me.find(".icon").addClass("down");
	                    }
	                });
	                var tmpBonusId = false;
	                for (var i = 0; i < items.length; i++) {
	                    $(items.get(i)).click(function () {
	                        selectBonus(this);
	                    });
	                    if ((!bounsId) && (orderAmount > +$(items.get(i)).attr("data-for-num"))) {
	                        selectBonus(items.get(i), true);
	                        tmpBonusId = true;

	                    } else if (!bounsId) {
	                        $(items.get(i)).addClass("big");
	                    } else {
	                        if ($(items.get(i)).attr("data-for-id") == bounsId) {
	                            selectBonus(items.get(i), true);
	                            tmpBonusId = true;
	                        }
	                    }
	                }

	                if (!bounsId) {
	                    selectBonus(false);
	                } else {
	                    if (!tmpBonusId) {
	                        selectBonus(false);
	                    }
	                }

	                $(".cancel_bouns").click(function () {
	                    selectBonus(false);
	                });

	                function selectBonus(el, flag) {
	                    if (el) {
	                        var num = +$(el).attr("data-for-num");
	                        var id = $(el).attr("data-for-id");
	                    } else {
	                        var num = 0;
	                        var id = null;
	                        items.removeClass('selected');
	                    }
	                    //removeZero
	                    // var numTxt = num.toFixed(2);
	                    var numTxt = removeZero(num);
	                    if (orderAmount > num) {
	                        items.removeClass('selected');
	                        $(el).addClass("selected");
	                        cartConfirmContainer.find(".bouns_title").find(".bouns_number").html(numTxt + "元");
	                        $("#reduce_bouns").html("-￥" + numTxt);
	                        // $("#all_price_reduce_bouns").html("￥" + (orderAmount - num).toFixed(2));
	                        $("#all_price_reduce_bouns").html("￥" + removeZero(orderAmount - num));
	                        if (!flag) {

	                            $(".bouns_container").addClass("hide");
	                            cartConfirmContainer.find(".choice_bouns").find("i").addClass("down");
	                        } else {
	                            scroller.scrollToElement(el);
	                        }

	                    } else {
	                        window.bravetime.newAlert("您选择的红包金额过大");
	                    }

	                    bounsId = id;
	                }
	            } else {
	                // 没有红包直接
	            }
	        }


	        // 底部支付
	        // $(".cart_confirm_bottom_container").find(".buy").click(pay);
	        $(".cart_confirm_bottom_container").find(".newConfirm_right").click(pay);

	        // 返回
	        $(".cart_confirm_bottom_container").find(".back").click(function () {
	            history.back();
	        });


	      // 切换地址统计
	      cartConfirmContainer.find(".change_address_container").find("a").click(function (event) {
	        /* Act on the event */
	        window.iii = setInterval(
	          function () {
	            reload();
	          }, 100
	        );

	        var url = location.href;
	        if (url.indexOf('abct=') > -1) {
	          url = url.replace(/t=[\d]+/g, 't=' + Date.now());
	        } else if (url.indexOf('?') > -1) {
	          url += '&abct=' + Date.now();
	        } else {
	          url += '?abct=' + Date.now();
	        }
	        history.replaceState(null,document.title,url)

	        window.open($(this).attr("href"), "_self");
	        event.preventDefault();
	        return false;
	      });


	        // ios fix

	        window.inputFocusFixFunction = function () {
	            $(".cart_confirm_bottom_container").addClass('nofixed');
	            $(".top0").addClass('nofixed');
	            $("body").addClass('pb300');
	        };
	        window.inputBlurFixFunction = function () {
	            $(".cart_confirm_bottom_container").removeClass('nofixed');
	            $(".top0").removeClass('nofixed');
	            $("body").removeClass('pb300');
	        }
	    } else {
	        window.inputFocusFixFunction = function () {
	            $(".top0").addClass('nofixed');
	        };
	        window.inputBlurFixFunction = function () {
	            $(".top0").removeClass('nofixed');
	        }
	    }


	    // 地址列表页
	    var addressList = $(".wd_address_list");
	    if (addressList && addressList.length) {
	        var page = window.page || "地址列表页";
	        $.cookie("dvd_cart_to_confirm", 1);
	        $.cookie('PassOrderDetail', 1);
	        var addressLink = addressList.find(".address");
	        addressLink.each(function (index, el) {
	            var address_id = $(el).attr("data-for");
	            $(el).find("a.show").click(function (event) {
	                /* Act on the event */
	                addressLink.removeClass('current');
	                $(el).addClass('current');

	                $.ajax({
	                    url: setCurrentUrl,
	                    type: 'POST',
	                    dataType: 'json',
	                    data: {
	                        address_id: address_id
	                    },
	                    success: function (result) {
	                        if (result["error"] == 0) {

	                            history.back();
	                        } else {
	                            bravetime.newAlert(result["msg"]);
	                        }
	                    },
	                    error: function () {
	                        bravetime.ajaxError(7)
	                    }
	                });
	                return false;
	            });
	            $(el).find(".default_switcher").click(function (event) {
	                /* Act on the event */
	                addressLink.find(".default_switcher").removeClass('default');
	                $(this).addClass('default');
	                $.ajax({
	                    url: setDefaultUrl,
	                    data: {
	                        address_id: address_id
	                    },
	                    error: function () {
	                        bravetime.ajaxError(8);
	                    }

	                });
	            });
	        });


	        // 删除地址
	        $(".delete").each(function (index, el) {

	            $(el).click(function () {
	                var address_id = $(el).parents(".address").attr("data-for");
	                window.bravetime.newConfirm("您确定要删除改地址么？", {
	                    okLink: function () {
	                        window.bravetime.newInfo("地址删除中");
	                        $.ajax({
	                            url: deleteUrl,
	                            type: 'POST',
	                            dataType: 'json',
	                            data: {
	                                address_id: address_id
	                            },
	                            success: function (result) {
	                                if (result["error"] == 0) {
	                                    location.reload();
	                                } else {
	                                    var msg = result["msg"] || "后台接口问题？？";
	                                    bravetime.newAlert(msg);
	                                }
	                            },
	                            error: function () {
	                                bravetime.ajaxError(9);
	                            }
	                        });
	                    }, cancelLink: function () {

	                    }
	                });
	                return false;
	            })
	        });


	    }


	    function reload() {
	        if ($.cookie("set_from_mobile")) {

	            location.reload();
	            // locationSub.reload();
	        }
	        if ($.cookie("dvd_cart_to_confirm")||$.cookie("set_from_mobile")) {
	            clearInterval(window.iii);
	            $.removeCookie("dvd_cart_to_confirm");
	            $.cookie("no_refresh",1);
	            var url = location.href;
	            if (url.indexOf('abct=') > -1) {
	                url = url.replace(/t=[\d]+/g, 't=' + Date.now());
	            } else if (url.indexOf('?') > -1) {
	                url += '&abct=' + Date.now();
	            } else {
	                url += '?abct=' + Date.now();
	            }
	            //
	            // if (url.indexOf('goods') > -1) {
	            //   var locationIdx = url.indexOf('?'),
	            //     url = url.substring(0,locationIdx);
	            // }
	            location.replace(url);
	        }
	    }

	    function changeObj(str) {
	      var numbers = str.split("&");
	      var obj = {},isNum = true;
	      numbers.map(function(item) {
	        var idx = item.indexOf("=");
	        var num = item.slice(idx+1);
	        // if (isNum) {
	        //   obj["id"] = num;
	        //   isNum = false;
	        // } else {
	        //   obj["number"] = num;
	        //   isNum = true;
	        // }
	        var subStr = item.slice(8).match(/\[(\S*)\]/ig)[0],
	            subStrLen = subStr.length;
	        obj[subStr.slice(1,subStrLen-1)] = num;
	      })

	      return JSON.stringify(obj);
	    }

	    function pay() {
	        var payData = {}, el;


	        // 校验身份证
	        if ($("#idcard").length) {
	            var idcard = window.idcard_id;

	            if(!idcard){
	                bravetime.newAlert("请选择身份证");
	                return;
	            }

	            payData['idcard'] = idcard;
	        }

	        // 校验邮编 
	        if ($("#zipcode").length) {
	            var zipcode = $("#zipcode").val();
	            if (!Units.isZipcode(zipcode)) {
	                bravetime.newAlert("请填写正确的邮编");
	                return;
	            }
	            payData['zipcode'] = zipcode;
	        }
	        //如果order_id不为空，传order_id，为空传goods.
	        // payData["order_id"] = $("#order_id").attr("value");
	        payData["order_id"] = $("#order_id").attr("value");
	        var goodsId = $("#goods").attr("value");
	        // if (goodsId) {
	        //   payData["goods"] = goodsId;
	        // }

	        payData["note"] = $("#note").val();
	        payData["bonus_id"] = bounsId || 0;
	        payData["address_id"] = window.addressId;
	        payData['password'] = password;
	        payData['commission'] = commissionNumber;

	        var successFunction = function (data) {
	            if (typeof data === "string") {
	                data = JSON.parse(data);
	            }
	            if (data["status"] == 0) {

	                window.bravetime.nativePay(data["url"],function (flag,order_id) {
	                    if(flag){
	                        // 支付成功
	                        $.cookie("dvd_cart_to_confirm", 1);
	                        history.back();
	                    }else{
	                        // 支付失败
	                        location.replace('/o-'+order_id+'.html');
	                    }
	                });
	                $.cookie("dvd_cart_to_confirm", 1);
	                // window.bravetime.goto(data["url"]);
	            }  else if(data["status"]== -3){
	                location.replace(data["url"]);
	            } 
	            else if (data["status"] == -10) {
	                window.bravetime.newAlert(data["msg"], function () {
	                    window.bravetime.goto(data["url"]);
	                });
	            } else {
	                window.bravetime.newAlert(data["msg"]);
	            }
	            $(".cart_confirm_bottom_container").removeClass('hide');
	        };
	        var errorFunction = function (result) {
	            bravetime.hideNew();
	            bravetime.ajaxError(10);
	            $(".cart_confirm_bottom_container").removeClass('hide');
	        };

	        window.bravetime.newInfo("正在连接安全支付...");
	        $(".cart_confirm_bottom_container").addClass('hide');

	      if (goodsId) {
	        $.ajax({
	          url: payActionUrl +'&'+ goodsId,
	          data: payData,
	          success: successFunction,
	          error: errorFunction
	        });
	      } else {
	        $.ajax({
	          url: payActionUrl,
	          data: payData,
	          success: successFunction,
	          error: errorFunction
	        });
	      }
	    }

	    window.submitConfirm = function () {

	        var maybeError = false; // 收货人可能是错的
	        var consignee = $("#consignee").val();
	        var maybeArray = ["先生", "女士", "小姐"];
	        for (var index = 0, maybeStr; maybeStr = maybeArray[index++];) {
	            if (consignee.indexOf(maybeStr) > -1) {
	                maybeError = true;
	            }
	        }
	        if(consignee.search(/[^\u4E00-\u9FA5]/) > -1){
	            maybeError = true;
	        }



	        if (!consignee.length) {
	            bravetime.newAlert("请填写收货人姓名");
	            return false;
	        }
	        if (consignee.length >16){
	            bravetime.newAlert("收货人姓名过长");
	            return false;
	        }

	        var tel = $("#mobile").val();
	        if (!Units.isTel(tel)) {
	            bravetime.newAlert("请填写正确的电话号码");
	            return false;
	        }

	        var selProvincesValue = $("#selProvinces").val();
	        if (selProvincesValue == 0) {
	            bravetime.newAlert("请选择省份");
	            return false;
	        }

	        var selCitiesValue = $("#selCities").val();
	        if (selCitiesValue == 0) {
	            bravetime.newAlert("请选择城市");
	            return false;
	        }

	        var selDistrictsValue = $("#selDistricts").val();
	        if (selDistrictsValue == 0) {
	            bravetime.newAlert("请选择地区");
	            return false;
	        }

	        var address = $("#address").val();
	        if (!address.length) {
	            bravetime.newAlert("请输入详细地址");
	            return false;
	        }

	        if ($("#idcard").length) {
	            var id = $("#idcard").html();
	            if (!Units.isIdcard(id)) {
	                bravetime.newAlert("请填写正确的身份证号码");
	                return false;
	            }
	        }
	        if ($("#zipcode").length) {
	            var zipcode = $("#zipcode").val();
	            if (!Units.isZipcode(zipcode)) {
	                bravetime.newAlert("请填写正确的邮政编码");
	                return false;
	            }
	        }

	        var idCardContainer = $("#idcard");
	        if(idCardContainer.length && maybeError){
	            bravetime.newConfirm("您确定身份证号<br/>"+id+"<br/>对应的姓名为 <span class='dav-red'>"+consignee+"</span> 么?",{
	                cancelText:"再改下",
	                okLink: function () {
	                    submitFunction();
	                }
	            })
	        }else{
	            submitFunction();
	        }

	        function submitFunction(){
	            var btn = $("#consigneeForm").find(".dav-btn");

	            btn.addClass("btn-disable").find("span.text").html("提交中...");

	            bravetime.info("地址提交中...");

	            $("#consigneeForm").ajaxSubmit({
	                success: function (result) {
	                    btn.removeClass("btn-disable").find("span.text").html("确认");
	                    if (typeof result == "string") {
	                        result = JSON.parse(result);
	                    }
	                    if (result["error"] == 0) {
	                        if (!window.isPrivateMode && window.sessionStorage) {
	                            sessionStorage.setItem('share_get_flag',1);
	                        }
	                        $.cookie('share_get_flag',1);
	                        eval(result["callbackStr"]);
	                    } else if (result["error"] == "-2") {
	                        window.bravetime.newAlert(result["msg"], function () {
	                            eval(result["callbackStr"]);
	                        });
	                    }
	                    else {
	                        bravetime.newAlert(result["msg"]);
	                    }
	                },
	                error: function (error) {
	                    btn.removeClass("btn-disable").find("span.text").html("确认");
	                    bravetime.ajaxError(11);
	                }
	            });
	        }


	    };


	    var addressData,proContainer =$("#selProvinces"), cityContainer = $("#selCities"), disContainer = $("#selDistricts");
	    if (window.addressStaticDataUrl) {
	        var isReady = false, isError = false, currentCityList = [], currentDisList = [];
	        regionHandler(function () {
	// 初始化的东西
	            // 如果有已经选中的
	            var proIndex= proContainer.val(),cityIndex = cityContainer.val();
	            if(proIndex){
	                selectProvince(proIndex,true);
	            }
	            if(cityIndex){
	                selectCity(cityIndex,true);
	            }
	        });
	        $(".input_wrap select").change(function () {
	            console.log(this["selectedIndex"], addressData);
	            var name = $(this).attr("name"), index = $(this).val();
	            if (name == "province" && index > 0) {
	                selectProvince(index);
	            } else if (name == "city" && index > 0) {
	                selectCity(index);
	            }
	        });



	        function selectProvince(index,initFlag){
	            if (isError) {
	                bravetime.info("地址列表数据获取异常,请刷新重试");
	            } else if (!isReady) {
	                bravetime.info("地址列表数据获取中,请稍后");
	            } else {
	                for (var i = 0, d; d = addressData[i++];) {
	                    if (d[0] == index) {
	                        currentCityList = d[2];
	                        break;
	                    }
	                }
	            }
	            if(initFlag&&cityContainer.val()){
	                return false;
	            }
	            cityContainer.empty();
	            disContainer.empty();
	            var opt = $("<option></option>").text("请选择区").val(0);
	            disContainer.append(opt);
	            var opt = $("<option></option>").text("请选择市").val(0);
	            cityContainer.append(opt);
	            for (var i = 0, d; d = currentCityList[i++];) {
	                var opt = $("<option></option>").text(d[1]).val(d[0]);
	                cityContainer.append(opt);
	            }
	        }

	        function selectCity(index,initFlag){
	            for (var i = 0, d; d = currentCityList[i++];) {
	                if (d[0] == index) {
	                    currentDisList = d[2];
	                    break;
	                }
	            }
	            if(initFlag&&disContainer.val()){
	                return false;
	            }
	            disContainer.empty();
	            var opt = $("<option></option>").text("请选择区").val(0);
	            disContainer.append(opt);
	            for (var i = 0, d; d = currentDisList[i++];) {
	                var opt = $("<option></option>").text(d[1]).val(d[0]);
	                disContainer.append(opt);
	            }
	        }
	    }

	    function regionHandler(callback) {

	        $.ajax({
	            url: window.addressStaticDataUrl,
	            dataType: "json",
	            success: function (result) {
	                isReady = true;
	                addressData = result;
	                if(typeof callback=="function"){
	                    callback();
	                }
	            },
	            error: function () {
	                $.ajax({
	                    url: window.addressStaticDataUrl.replace("fe.","fe6.").replace("fe2.","fe6.").replace("fe3.","fe6."),
	                    dataType: "json",
	                    success: function (result) {
	                        isReady = true;
	                        addressData = result;
	                        if(typeof callback=="function"){
	                            callback();
	                        }
	                        bravetime.tj.evSend({category: tj_path, action: "address_tj", label: "address_ok", value: 1, nodeid: tj_id});
	                    },
	                    error: function () {

	                        isError = true;
	                        bravetime.tj.evSend({category: tj_path, action: "address_tj", label: "address_error", value: 1, nodeid: tj_id});
	                    }
	                });
	            }
	        });
	    }

	    //订单确认页,监听邮编输入
	    if($(".cart_confirm_zipcode").length){
	        public_changse();
	        $(".cart_confirm_zipcode").on("input propertychange",function(){
	            var zipcode=$("#zipcode").val();
	            public_changse();
	        });
	    }

	    //订单确认页,监听邮编输入
	    if($("#idcard").length){
	        public_changse();
	    }

	    //如果身份证或邮编为空,支付按钮不可以点击
	    function public_changse(){
	        var idcard=$("#idcard").html();
	        var zipcode=$("#zipcode").val();
	        if(zipcode==""||idcard==""){
	            $(".newConfirm_right").addClass('disableGray');
	            // $(".buy").removeClass("btn-red");
	            // $(".buy").addClass("btn-disable")
	        }else {
	            $(".newConfirm_right").removeClass('disableGray');
	            // $(".buy").addClass("btn-red");
	            // $(".buy").removeClass("btn-disable")
	        }
	    }

	});



/***/ }

/******/ });