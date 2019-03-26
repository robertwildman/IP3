var mymap;
var petitionData = {};
var geo;
petitionData.name = "Robert";
console.log(petitionData.name);

function style(feature) {
    return {
        fillColor: getColor(670),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}
function highlightFeature(e) {
    var layer = e.target;
    $("#con").text(layer.feature.properties.PCON13NM);
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}
function zoomToFeature(e) {
    mymap.fitBounds(e.target.getBounds());
}
function resetHighlight(e) {
    geo.resetStyle(e.target);
}
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}


mymap = L.map('mapid').setView([54.527457, -2.911369], 5);
$.getJSON( "topo_wpc.json", function(topology) {
    geo = L.geoJSON(topojson.feature(topology, topology.objects.wpc), {style: style,onEachFeature: onEachFeature}).addTo(mymap);
});
