"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.function.bind");

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactClickOutside = _interopRequireDefault(require("@langleyfoxall/react-click-outside"));

require("./style.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DynamicContextMenu =
/*#__PURE__*/
function (_Component) {
  _inherits(DynamicContextMenu, _Component);

  function DynamicContextMenu(props) {
    var _this;

    _classCallCheck(this, DynamicContextMenu);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DynamicContextMenu).call(this, props));
    _this.state = {
      style: null,
      showing: false
    };
    _this.ref = _react["default"].createRef();
    _this.handleContextMenu = _this.handleContextMenu.bind(_assertThisInitialized(_this));
    _this.handleClickOutside = _this.handleClickOutside.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(DynamicContextMenu, [{
    key: "handleClick",
    value: function handleClick(item, event) {
      event.stopPropagation();
      var data = this.props.data;
      this.setState({
        showing: false
      });
      item.onClick(data, event);
    }
  }, {
    key: "handleClickOutside",
    value: function handleClickOutside() {
      this.setState({
        showing: false
      });
    }
  }, {
    key: "handleContextMenu",
    value: function handleContextMenu(event) {
      var _this2 = this;

      event.preventDefault();
      event.stopPropagation();
      var clickLocation = {
        x: event.clientX,
        y: event.clientY
      }; // We need to render the menu with all of it's contents in order to calculate the size
      // without displaying it to the user. We can then decide which side of the cursor it should be on

      this.setState({
        style: {
          opacity: 0
        },
        showing: true
      }, function () {
        var onContextMenu = _this2.props.onContextMenu;

        var width = _this2.ref.current.getBoundingClientRect().width;

        var screenW = window.innerWidth;
        var style = {
          opacity: 1
        };

        if (screenW - clickLocation.x > width) {
          style.left = "".concat(clickLocation.x + 5, "px");
        } else {
          style.left = "".concat(clickLocation.x - width - 5, "px");
        }

        style.top = "".concat(clickLocation.y + 5, "px");

        _this2.setState({
          style: style
        }, onContextMenu);
      });
    }
  }, {
    key: "renderDropdown",
    value: function renderDropdown() {
      var _this3 = this;

      var _this$props = this.props,
          menuItems = _this$props.menuItems,
          ignoreClickEvents = _this$props.ignoreClickEvents;
      return _react["default"].createElement(_reactClickOutside["default"], {
        domRef: this.ref,
        ignoreRefs: ignoreClickEvents,
        onClickOutside: this.handleClickOutside
      }, _react["default"].createElement("div", {
        className: "react-context-menu",
        style: this.state.style
      }, _react["default"].createElement("ul", null, menuItems.map(function (item, i) {
        return _react["default"].createElement("li", {
          key: i,
          onClick: _this3.handleClick.bind(_this3, item),
          className: "item-hoverable ".concat(item.className || 0)
        }, item.label);
      }))));
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      return _react["default"].createElement(_react.Fragment, null, _react["default"].cloneElement(children, {
        onContextMenu: this.handleContextMenu
      }), this.state.showing && _reactDom["default"].createPortal(this.renderDropdown(), document.body));
    }
  }]);

  return DynamicContextMenu;
}(_react.Component);

exports["default"] = DynamicContextMenu;
DynamicContextMenu.defaultProps = {
  ignoreClickEvents: null,
  onContextMenu: function onContextMenu() {
    return null;
  }
};
DynamicContextMenu.propTypes = {
  menuItems: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    label: _propTypes["default"].string.isRequired,
    onClick: _propTypes["default"].func.isRequired,
    className: _propTypes["default"].string
  })).isRequired,
  ignoreClickEvents: _propTypes["default"].arrayOf(_propTypes["default"].object),
  data: _propTypes["default"].any.isRequired,
  onContextMenu: _propTypes["default"].func
};