webpackJsonp([3],{

/***/ 596:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(13);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(25);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(26);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(30);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(55);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _index = __webpack_require__(62);

	var _index2 = _interopRequireDefault(_index);

	var _index3 = __webpack_require__(225);

	var _index4 = _interopRequireDefault(_index3);

	var _react2 = __webpack_require__(63);

	var _react3 = _interopRequireDefault(_react2);

	var _index5 = __webpack_require__(226);

	var _index6 = _interopRequireDefault(_index5);

	var _main = __webpack_require__(411);

	var _radium = __webpack_require__(417);

	var _radium2 = _interopRequireDefault(_radium);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _components = {
		ItemInfo: {
			displayName: 'ItemInfo'
		},
		ImageInfo: {
			displayName: 'ImageInfo'
		},
		_component: {}
	};

	var _homeToyDesktopFuFuzhuangNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
		filename: '/home/toy/Desktop/fu/fuzhuang/src/home/item.jsx',
		components: _components,
		locals: [module],
		imports: [_react3.default]
	});

	var _homeToyDesktopFuFuzhuangNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
		filename: '/home/toy/Desktop/fu/fuzhuang/src/home/item.jsx',
		components: _components,
		locals: [],
		imports: [_react3.default, _index2.default]
	});

	function _wrapComponent(id) {
		return function (Component) {
			return _homeToyDesktopFuFuzhuangNode_modulesReactTransformHmrLibIndexJs2(_homeToyDesktopFuFuzhuangNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
		};
	}

	var ItemInfo = _wrapComponent('ItemInfo')(function (_Component) {
		(0, _inherits3.default)(ItemInfo, _Component);

		function ItemInfo() {
			(0, _classCallCheck3.default)(this, ItemInfo);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ItemInfo).apply(this, arguments));
		}

		(0, _createClass3.default)(ItemInfo, [{
			key: 'render',
			value: function render() {
				return _react3.default.createElement(
					'div',
					{ style: { border: "1px solid " + _main.colors.line, padding: 20 } },
					_react3.default.createElement(
						'div',
						{ style: { marginRight: 20, display: 'inline-block', verticalAlign: "top" } },
						_react3.default.createElement('img', { style: { width: 400, height: 400 }, src: __webpack_require__(468) }),
						_react3.default.createElement(
							'div',
							null,
							_react3.default.createElement('img', { style: { width: 78, height: 78, margin: 10, border: "1px solid" + _main.colors.primary }, src: __webpack_require__(468) }),
							_react3.default.createElement('img', { style: { width: 78, height: 78, margin: 10, border: "1px solid" + _main.colors.primary }, src: __webpack_require__(468) }),
							_react3.default.createElement('img', { style: { width: 78, height: 78, margin: 10, border: "1px solid" + _main.colors.primary }, src: __webpack_require__(468) }),
							_react3.default.createElement('img', { style: { width: 78, height: 78, margin: 10, border: "1px solid" + _main.colors.primary }, src: __webpack_require__(468) })
						)
					),
					_react3.default.createElement(
						'div',
						{ style: { display: 'inline-block', verticalAlign: "top", marginLeft: 20 } },
						_react3.default.createElement(
							'p',
							{ style: { fontSize: 20, width: 680, textAlign: "center" } },
							'2016夏季新款韩版修身显瘦白色T恤女士短袖圆领紧身纯色打底裤'
						),
						_react3.default.createElement(
							'div',
							{ style: { padding: "20px 50px", margin: "20px 0", background: _main.colors.bg, lineHeight: "50px", color: "#888" } },
							_react3.default.createElement(
								'p',
								null,
								_react3.default.createElement(
									'span',
									{ style: { marginRight: 50 } },
									'批发价'
								),
								_react3.default.createElement(
									'span',
									{ style: { color: _main.colors.primary, fontSize: 30 } },
									'¥10.00'
								)
							),
							_react3.default.createElement(
								'p',
								null,
								_react3.default.createElement(
									'span',
									{ style: { marginRight: 50 } },
									'淘宝价'
								),
								_react3.default.createElement(
									'span',
									null,
									'¥30.00'
								)
							)
						),
						_react3.default.createElement(
							'div',
							{ style: { borderBottom: "1px dotted " + _main.colors.line, padding: "15px 0" } },
							_react3.default.createElement(
								'span',
								{ style: { color: "#888" } },
								'服务'
							)
						),
						_react3.default.createElement(
							'div',
							{ style: { borderBottom: "1px dotted " + _main.colors.line, padding: "15px 0" } },
							_react3.default.createElement(
								'span',
								{ style: { color: "#888" } },
								'货号'
							)
						),
						_react3.default.createElement(
							'div',
							{ style: { borderBottom: "1px dotted " + _main.colors.line, padding: "15px 0" } },
							_react3.default.createElement(
								'span',
								{ style: { color: "#888" } },
								'尺寸'
							)
						),
						_react3.default.createElement(
							'div',
							{ style: { borderBottom: "1px dotted " + _main.colors.line, padding: "15px 0" } },
							_react3.default.createElement(
								'span',
								{ style: { color: "#888" } },
								'颜色'
							)
						),
						_react3.default.createElement(
							'div',
							{ style: { textAlign: "center" } },
							_react3.default.createElement(
								'div',
								{ style: { margin: 20, cursor: "pointer", background: _main.colors.primary, color: "#fff", padding: "5px 20px", display: "inline-block", fontSize: 20 } },
								'立即购买'
							),
							_react3.default.createElement(
								'div',
								{ style: { margin: 20, cursor: "pointer", border: "1px solid " + _main.colors.primary, color: _main.colors.primary, padding: "5px 20px", display: "inline-block", fontSize: 20 } },
								'收藏'
							),
							_react3.default.createElement(
								'div',
								{ style: { margin: 20, cursor: "pointer", border: "1px solid " + _main.colors.primary, color: _main.colors.primary, padding: "5px 20px", display: "inline-block", fontSize: 20 } },
								'加入购物车'
							)
						)
					)
				);
			}
		}]);
		return ItemInfo;
	}(_react2.Component));

	var ImageInfo = _wrapComponent('ImageInfo')(function (_Component2) {
		(0, _inherits3.default)(ImageInfo, _Component2);

		function ImageInfo() {
			(0, _classCallCheck3.default)(this, ImageInfo);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ImageInfo).apply(this, arguments));
		}

		(0, _createClass3.default)(ImageInfo, [{
			key: 'render',
			value: function render() {
				return _react3.default.createElement(
					'div',
					{ style: { marginTop: 30, border: "1px solid " + _main.colors.line } },
					_react3.default.createElement(
						'h2',
						{ style: { borderBottom: "1px solid " + _main.colors.line, padding: "15px 20px", background: _main.colors.bg, fontSize: 16, color: "#333" } },
						'商品详情'
					),
					_react3.default.createElement(
						'div',
						{ style: { padding: 20 } },
						_react3.default.createElement(
							'ul',
							{ style: { listStyle: "none", fontSize: 13, margin: "0 40px 20px 40px" } },
							[{ k: "裤长", v: "七分裤" }, { k: "货号", v: "872" }, { k: "女裤裤型", v: "毛裤" }].map(function (it) {
								return _react3.default.createElement(
									'li',
									{ style: { display: "inline-block", margin: 20 } },
									_react3.default.createElement(
										'span',
										{ style: { marginRight: 10, color: "#888" } },
										it.k,
										':'
									),
									_react3.default.createElement(
										'span',
										{ style: { color: "#333" } },
										it.v
									)
								);
							})
						),
						_react3.default.createElement(
							'p',
							{ style: { overflow: "hidden", textAlign: "center" } },
							_react3.default.createElement('img', { style: { maxWidth: 860 }, src: __webpack_require__(597) }),
							_react3.default.createElement('img', { style: { maxWidth: 860 }, src: __webpack_require__(597) })
						)
					)
				);
			}
		}]);
		return ImageInfo;
	}(_react2.Component));

	var _component = _wrapComponent('_component')(function (_Component3) {
		(0, _inherits3.default)(_class, _Component3);

		function _class() {
			(0, _classCallCheck3.default)(this, _class);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(_class).apply(this, arguments));
		}

		(0, _createClass3.default)(_class, [{
			key: 'render',
			value: function render() {
				return _react3.default.createElement(
					'div',
					null,
					_react3.default.createElement(_main.BodyStyle, null),
					_react3.default.createElement(_main.Head, null),
					_react3.default.createElement(
						_main.TitleBar,
						null,
						_react3.default.createElement(_main.Search, null)
					),
					_react3.default.createElement(_main.MenuBar, { data: _main.menuData }),
					_react3.default.createElement(
						'div',
						{ style: { width: 1200, margin: "20px auto" } },
						_react3.default.createElement(ItemInfo, null),
						_react3.default.createElement(ImageInfo, null)
					),
					_react3.default.createElement(_main.Footer, null)
				);
			}
		}]);
		return _class;
	}(_react2.Component));

	exports.default = _component;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ },

/***/ 597:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "bc60928b2ad747d2e4e8c7ee66583faf.jpg";

/***/ }

});