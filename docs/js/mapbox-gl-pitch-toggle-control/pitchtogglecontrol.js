class PitchToggle {
    
    constructor({bearing = -20, pitch = 70, minpitchzoom = null}) {
        this._bearing = bearing;
        this._pitch = pitch;
        this._minpitchzoom = minpitchzoom;
    }

    onAdd(map) {
        this._map = map;
        let _this = this; 

        this._btn = document.createElement('button');
        this._btn.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-3d';
        this._btn.type = 'button';
        this._btn['aria-label'] = 'Toggle Pitch';
        this._btn.onclick = function() { 
            if (map.getPitch() === 0) {
                //let options = {pitch: _this._pitch, bearing: _this._bearing};
                let options = {pitch: _this._pitch, bearing: map.getBearing()};
                if (_this._minpitchzoom && map.getZoom() > _this._minpitchzoom) {
                    options.zoom = _this._minpitchzoom;
                }
                map.easeTo(options);
                _this._btn.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-2d';
            } else {
                map.easeTo({pitch: 0, bearing: map.getBearing()});
                //map.easeTo({pitch: 0, bearing: 0});
                _this._btn.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-3d';
            } 
        };
        this._map.on('pitchend', function(e){
            const pitch = map.getPitch();
            if (pitch === 0){
                _this._btn.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-3d';
            }else{
                _this._btn.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-2d';
            }
        });
        

        this._container = document.createElement('div');
        this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
        this._container.appendChild(this._btn);

        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }

}