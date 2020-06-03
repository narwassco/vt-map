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
}, {
  label: "Kilgoris",
  latlng: [34.87533, -1.00278],
  zoom: 14
}, {
  label: "Suswa",
  latlng: [36.33078, -1.05307],
  zoom: 13
}
];
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
      this.container.classList.add('mapboxgl-ctrl-switch');
      this.nodes = [];

      this.select = document.createElement('select');
      this.select.setAttribute('type', 'select');
      this.select.addEventListener('change', function (e) {
        _this.map.jumpTo(JSON.parse(e.target[this.selectedIndex].value));
      });
      this.container.appendChild(this.select);
      

      this.areas.forEach(function (area) {
        var node = document.createElement('option');
        node.setAttribute('type', 'option');
        node.text = area.label;
        node.value = JSON.stringify({
          center: area.latlng,
          zoom: area.zoom,
          });
        _this.select.appendChild(node);
      });
    }
  }, {
    key: "onAdd",
    value: function onAdd(map) {
      var _this2 = this;

      this.map = map;
      this.insertControls();
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