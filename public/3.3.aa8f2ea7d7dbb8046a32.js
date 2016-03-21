webpackJsonp([3],{

/***/ 559:
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
		ShopInfo: {
			displayName: 'ShopInfo'
		},
		_component: {}
	};

	var _homeToyDesktopFuzhuangNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
		filename: '/home/toy/Desktop/fuzhuang/src/home/item.jsx',
		components: _components,
		locals: [module],
		imports: [_react3.default]
	});

	var _homeToyDesktopFuzhuangNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
		filename: '/home/toy/Desktop/fuzhuang/src/home/item.jsx',
		components: _components,
		locals: [],
		imports: [_react3.default, _index2.default]
	});

	function _wrapComponent(id) {
		return function (Component) {
			return _homeToyDesktopFuzhuangNode_modulesReactTransformHmrLibIndexJs2(_homeToyDesktopFuzhuangNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
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
						_react3.default.createElement('img', { style: { width: 360, height: 360 }, src: __webpack_require__(468) }),
						_react3.default.createElement(
							'div',
							null,
							_react3.default.createElement('img', { style: { width: 68, height: 68, margin: 10, border: "1px solid" + _main.colors.primary }, src: __webpack_require__(468) }),
							_react3.default.createElement('img', { style: { width: 68, height: 68, margin: 10, border: "1px solid" + _main.colors.primary }, src: __webpack_require__(468) }),
							_react3.default.createElement('img', { style: { width: 68, height: 68, margin: 10, border: "1px solid" + _main.colors.primary }, src: __webpack_require__(468) }),
							_react3.default.createElement('img', { style: { width: 68, height: 68, margin: 10, border: "1px solid" + _main.colors.primary }, src: __webpack_require__(468) })
						)
					),
					_react3.default.createElement(
						'div',
						{ style: { display: 'inline-block', verticalAlign: "top" } },
						_react3.default.createElement(
							'p',
							{ style: { fontSize: 20, width: 540 } },
							'2016夏季新款韩版修身显瘦白色T恤女士短袖圆领紧身纯色打底裤'
						),
						_react3.default.createElement(
							'div',
							{ style: { padding: 20, marginTop: 20, background: _main.colors.bg, lineHeight: "50px", color: "#888" } },
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
							null,
							_react3.default.createElement(
								'div',
								{ style: { margin: 20, cursor: "pointer", background: _main.colors.primary, color: "#fff", padding: "5px 20px", display: "inline-block", textAlign: "center", fontSize: 20 } },
								'立即购买'
							),
							_react3.default.createElement(
								'div',
								{ style: { margin: 20, cursor: "pointer", border: "1px solid " + _main.colors.primary, color: _main.colors.primary, padding: "5px 20px", display: "inline-block", textAlign: "center", fontSize: 20 } },
								'收藏'
							),
							_react3.default.createElement(
								'div',
								{ style: { margin: 20, cursor: "pointer", border: "1px solid " + _main.colors.primary, color: _main.colors.primary, padding: "5px 20px", display: "inline-block", textAlign: "center", fontSize: 20 } },
								'加入购物车'
							)
						)
					)
				);
			}
		}]);
		return ItemInfo;
	}(_react2.Component));

	var ShopInfo = _wrapComponent('ShopInfo')(function (_Component2) {
		(0, _inherits3.default)(ShopInfo, _Component2);

		function ShopInfo() {
			(0, _classCallCheck3.default)(this, ShopInfo);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ShopInfo).apply(this, arguments));
		}

		(0, _createClass3.default)(ShopInfo, [{
			key: 'render',
			value: function render() {
				return _react3.default.createElement(
					'div',
					{ style: { color: "#888", border: "1px solid " + _main.colors.line, padding: 20, fontSize: 12, lineHeight: "30px" } },
					_react3.default.createElement(
						'p',
						{ style: { fontSize: 20, color: "#000" } },
						'店铺名'
					),
					_react3.default.createElement(
						'p',
						null,
						'地址：'
					),
					_react3.default.createElement(
						'p',
						null,
						'商品：'
					)
				);
			}
		}]);
		return ShopInfo;
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
					_react3.default.createElement(_main.LogoBar, { ref: 'logobar', placeholder: this.props.location.query.word }),
					_react3.default.createElement(_main.MenuBar, { data: _main.menuData }),
					_react3.default.createElement(
						'div',
						{ style: { width: 1200, margin: "20px auto" } },
						_react3.default.createElement(
							'div',
							{ style: { width: 980, display: 'inline-block', verticalAlign: "top", paddingRight: 20 } },
							_react3.default.createElement(ItemInfo, null)
						),
						_react3.default.createElement(
							'div',
							{ style: { width: 200, display: 'inline-block', verticalAlign: "top" } },
							_react3.default.createElement(ShopInfo, null)
						)
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

/***/ }

});