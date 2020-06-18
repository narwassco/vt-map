mapboxgl.accessToken = 'pk.eyJ1IjoibmFyd2Fzc2NvIiwiYSI6ImNrOXIxOTFleTBvNGIzZ3A4b3docmE5cHQifQ.BqsnWbWZ2NwJZDWyOVWjXA';

const STYLES = [
    {
        label: 'NAWASSCO',
        styleName: 'NARWASSCO',
        styleUrl: './style.json',
    },
    {
    label: 'Street',
    styleName: 'Street',
    styleUrl: 'mapbox://styles/mapbox/streets-v9',
    }, 
    {
    label: 'Satellite',
    styleName: 'Satellite',
    styleUrl: 'mapbox://styles/mapbox/satellite-streets-v11',
    },
];

$(function(){
    this.map = new mapboxgl.Map({
        container: 'map', // container id
        style: STYLES[0].styleUrl,
        center: [35.87063, -1.08551], // starting position [lng, lat]
        zoom: 13, // starting zoom
        hash:true,
        attributionControl: false,
    });

    var this_ = this;
    const loadImage = function(url, name){
        this_.map.loadImage(url, function(error, image) {
            if (error) throw error;
            if (!this_.map.hasImage(name)) this_.map.addImage(name, image);
        });
    }

    var customerData;
    $.ajaxSetup({ async: false });
    $.getJSON('https://narwassco.github.io/vt-map/meter.geojson', function(json){
        customerData = json;
    })
    $.ajaxSetup({ async: true });
    
    function forwardGeocoder(query) {
        var matched = function(value, query){
            return (value.toString().toLowerCase().search(query.toString().toLowerCase()) !== -1);
        }
        var matchingFeatures = [];
        for (var i = 0; i < customerData.features.length; i++) {
            var feature = customerData.features[i];
            // console.log(feature.properties)
            // handle queries with different capitalization than the source data by calling toLowerCase()
            ['connno', 'serialno'].forEach(v=>{
                var target = feature.properties[v];
                if (!target){
                    return;
                }
                if (matched(target,query)) {
                    feature['place_name'] = `${feature.properties.customer}, ${feature.properties.connno}, ${feature.properties.serialno}, ${feature.properties.village}`;
                    feature['center'] = feature.geometry.coordinates;
                    feature['place_type'] = ['meter'];
                    matchingFeatures.push(feature);
                }
            })
        }
        return matchingFeatures;
    }

    this.map.addControl(
        new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            localGeocoder: forwardGeocoder,
            zoom: 16,
            placeholder: 'CONN NO, S/N, Name',
            mapboxgl: mapboxgl
        }),
        'top-left'
    );
    
    this.map.addControl(new StylesControl({styles: STYLES,}), 'top-left');
    this.map.addControl(new SwitchAreasControl(), 'top-left');
    this.map.addControl(new mapboxgl.FullscreenControl(), 'top-right');
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(new PitchToggle({minpitchzoom: 19})); 
    this.map.addControl(new mapboxgl.ScaleControl({maxWidth: 80, unit: 'metric'}));
    this.map.addControl(new RulerControl(), 'top-right');
    this.map.addControl(new mapboxgl.GeolocateControl({positionOptions: {enableHighAccuracy: true},trackUserLocation: true}));
    this.map.addControl(new mapboxgl.AttributionControl({compact: true,}));
    //this.map.addControl(new InspectControl(), 'bottom-right');
    // this.map.addControl(new MapboxDraw({
    //     displayControlsDefault: false,
    //     controls: {
    //         point: true,
    //         line_string: true,
    //         polygon: true,
    //         trash: true
    //     }
    // }), 'top-left');

    const createPopup = e => {
        var coordinates = e.lngLat;
        if (e.features[0].geometry.type === 'Point'){
            coordinates = e.features[0].geometry.coordinates.slice();
        }
        var properties = e.features[0].properties;
        var html = `<table class="popup-table">`;
        Object.keys(properties).forEach(key=>{
            html += `<tr><th>${key}</th><td>${properties[key]}</td></tr>`;
        })
    
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
            
        new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(html)
        .addTo(this.map);
    }

    this.map.on('click', 'meter', createPopup);
    this.map.on('click', 'flow meter', createPopup);
    this.map.on('click', 'valve', createPopup);
    this.map.on('click', 'washout', createPopup);
    this.map.on('click', 'firehydrant', createPopup);
    this.map.on('click', 'tank', createPopup);
    this.map.on('click', 'intake', createPopup);
    this.map.on('click', 'wtp', createPopup);
    this.map.on('click', 'pipeline', createPopup);
})