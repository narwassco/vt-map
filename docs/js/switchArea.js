function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var defaultAreas = [{
  label: 'Narok',
  latlng: [35.87063, -1.08551],
  zoom: 14,
}, {
  label: "Ololulung'a",
  latlng: [35.65072, -1.0085],
  zoom: 13
}];
/**
 * Adds area switcher.
 * @param {Object} options
 * @param {Array} [options.area] - Array of area objects:
 * @param {String} options.area.label - Area label to display on switcher
 * @param {String} options.area.latlng - Latitude and Longitude to display
 * @param {String} options.area.zoom - Zoom level to display
 * @param {Function} [options.onChange] - Triggered on area change. Accepts `area` object
 */

var SwitchAreasControl = /*#__PURE__*/function () {
  function SwitchAreasControl() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, SwitchAreasControl);

    this.areas = options.areas || defaultAreas;
    this.onChange = options.onChange;
  }

  _createClass(SwitchAreasControl, [{
    key: "insertControls",
    value: function insertControls() {
      var _this = this;

      this.container = document.createElement('div');
      this.container.classList.add('mapboxgl-ctrl');
      this.container.classList.add('mapboxgl-ctrl-group');
      this.container.classList.add('mapboxgl-ctrl-styles');
      this.nodes = [];
      this.areas.forEach(function (area) {
        var node = document.createElement('button');
        node.setAttribute('type', 'button');
        node.textContent = area.label;
        node.addEventListener('click', function () {
          if (node.classList.contains('-active')) return;

          _this.map.jumpTo({
            center: area.latlng,
            zoom: area.zoom,
            });

          if (_this.onChange) _this.onChange(area);
        });

        _this.nodes.push(node);

        _this.container.appendChild(node);
      });
    }
  }, {
    key: "onAdd",
    value: function onAdd(map) {
      var _this2 = this;

      this.map = map;
      this.insertControls();
      // this.map.on('styledata', function () {
      //   [].forEach.call(_this2.container.querySelectorAll('button'), function (div) {
      //     div.classList.remove('-active');
      //   });

      //   var styleNames = _this2.styles.map(function (style) {
      //     return style.styleName;
      //   });

      //   var currentStyleIndex = styleNames.indexOf(_this2.map.getStyle().name);

      //   if (currentStyleIndex !== -1) {
      //     var currentNode = _this2.nodes[currentStyleIndex];
      //     currentNode.classList.add('-active');
      //   }
      // });
      return this.container;
    }
  }, {
    key: "onRemove",
    value: function onRemove() {
      this.container.parentNode.removeChild(this.container);
      this.map = undefined;
    }
  }]);

  return SwitchAreasControl;
}();
