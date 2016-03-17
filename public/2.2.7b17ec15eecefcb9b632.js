webpackJsonp([2],{

/***/ 557:
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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _components = {
		Menu: {
			displayName: 'Menu'
		},
		_component: {}
	};

	var _homeToyDesktopFuzhuangNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
		filename: '/home/toy/Desktop/fuzhuang/src/search.jsx',
		components: _components,
		locals: [module],
		imports: [_react3.default]
	});

	var _homeToyDesktopFuzhuangNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
		filename: '/home/toy/Desktop/fuzhuang/src/search.jsx',
		components: _components,
		locals: [],
		imports: [_react3.default, _index2.default]
	});

	function _wrapComponent(id) {
		return function (Component) {
			return _homeToyDesktopFuzhuangNode_modulesReactTransformHmrLibIndexJs2(_homeToyDesktopFuzhuangNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
		};
	}

	var Menu = _wrapComponent('Menu')(function (_Component) {
		(0, _inherits3.default)(Menu, _Component);

		function Menu() {
			(0, _classCallCheck3.default)(this, Menu);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Menu).apply(this, arguments));
		}

		(0, _createClass3.default)(Menu, [{
			key: 'render',
			value: function render() {
				return _react3.default.createElement(
					'div',
					{ style: { margin: 20, border: "1px solid " + _main.colors.line } },
					_react3.default.createElement(
						'p',
						{ style: { borderBottom: "1px solid " + _main.colors.line, padding: 20 } },
						'分类'
					),
					_react3.default.createElement(
						'p',
						{ style: { borderBottom: "1px solid " + _main.colors.line, padding: 20 } },
						'分类'
					),
					_react3.default.createElement(
						'p',
						{ style: { borderBottom: "1px solid " + _main.colors.line, padding: 20 } },
						'分类'
					),
					_react3.default.createElement(
						'p',
						{ style: { padding: 20 } },
						'分类'
					)
				);
			}
		}]);
		return Menu;
	}(_react2.Component));

	var _component = _wrapComponent('_component')(function (_Component2) {
		(0, _inherits3.default)(_class, _Component2);

		function _class() {
			(0, _classCallCheck3.default)(this, _class);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(_class).apply(this, arguments));
		}

		(0, _createClass3.default)(_class, [{
			key: 'render',
			value: function render() {
				return _react3.default.createElement(
					'div',
					{ style: { borderTop: "3px solid " + _main.colors.primary } },
					_react3.default.createElement(
						'div',
						{ style: { width: 1200, minHeight: 800, margin: "0 auto" } },
						_react3.default.createElement(Menu, null)
					)
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