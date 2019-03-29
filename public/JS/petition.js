var mymap;
var petitionData = [];
var geo;
var max;
$( document ).ready(function() {
//Get Petition data from Gov 
    $.ajax({
        url: "https://petition.parliament.uk/petitions/243319.json",
        type: "get", //send it through get method
        success: function(response) {
            //Looping through all constituency in the JSON file
            $.each(response.data.attributes.signatures_by_constituency, function(index, value) {
                //Adding it to the petition array
                petitionData.push(value);
            }); 
            //Call loading in the map
            max = gethigh()/8;
            $("#legend").append('<div class="ranking-row"> <div class ="color-box" style="background-color: #800026"></div> <p class="ranking-text"> '+[max*7] + '+ </p> </div>');
            $("#legend").append('<div class="ranking-row"> <div class = "color-box" style="background-color: #BD0026"></div> <p class="ranking-text"> '+[max*6] + ' - ' + ([max*7] - 1) +'</p></div>');
            $("#legend").append('<div class="ranking-row"> <div class = "color-box" style="background-color: #E31A1C"></div> <p class="ranking-text"> '+[max*5] + ' - ' + ([max*6] - 1) +'</p></div>');
            $("#legend").append('<div class="ranking-row"> <div class = "color-box" style="background-color: #FC4E2A"></div> <p class="ranking-text"> '+[max*4] + ' - ' + ([max*5] - 1) +'</p></div>');
            $("#legend").append('<div class="ranking-row"> <div class = "color-box" style="background-color: #FD8D3C"></div> <p class="ranking-text"> '+[max*3] + ' - ' + ([max*4] - 1) +'</p></div>');
            $("#legend").append('<div class="ranking-row"> <div class = "color-box" style="background-color:#FEB24C"></div> <p class="ranking-text"> '+[max*2] + ' - ' + ([max*3] - 1) +'</p></div>');
            $("#legend").append('<div class="ranking-row"> <div class = "color-box" style="background-color:#FED976"></div> <p class="ranking-text"> ' +[max*1] + ' - ' + ([max*2] - 1) +' </p></div>');
            $("#legend").append('<div class="ranking-row"> <div class = "color-box" style="background-color:#FFEDA0"></div> <p class="ranking-text"> 0 - '+ ([max*1] - 1) +' </p> </div>');
            loadmap();
        },
        error: function(xhr) {
        //Do Something to handle error
        }
    });
//Styling the map
});








function style(feature) {
    var colornum = 1;
    $.each(petitionData, function(index, value) {
        if(value.ons_code == feature.properties.PCON13CD)
        {
            colornum = value.signature_count;
    
        }
    });
    return {
        fillColor: getColor(colornum),
        weight: 0.5,
        opacity: 1,
        color: '#a0a0a0',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
function getColor(d) {
    
    return d > [max*7] ? '#800026' :
           d > [max*6]  ? '#BD0026' :
           d > [max*5]  ? '#E31A1C' :
           d > [max*4]  ? '#FC4E2A' :
           d > [max*3]   ? '#FD8D3C' :
           d > [max*2]   ? '#FEB24C' :
           d > [max*1]   ? '#FED976' :
                      '#FFEDA0';
}
function gethigh()
{
    var high = 1;
    $.each(petitionData, function(index, value) {
        if(value.signature_count > high)
        {
            high = value.signature_count;
        }
    });
    return high;
}
function highlightFeature(e) {
    var layer = e.target;
    $.each(petitionData, function(index, value) {
        if(value.ons_code == layer.feature.properties.PCON13CD)
        {
            $("#mp").text("MP: " + value.mp);
            $("#cons").text("Constituency: " + value.name);
            $("#signs").text("Signatures: " + value.signature_count);
    
        }
    });
    layer.setStyle({
        weight: 2,
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
function loadmap()
{
    mymap = L.map('mapid').setView([54.527457, -2.911369], 5);
    $.getJSON( "topo_wpc.json", function(topology) {
        geo = L.geoJSON(topojson.feature(topology, topology.objects.wpc), {style: style,onEachFeature: onEachFeature}).addTo(mymap);
    });
}
function getPetitionData(code)
{
    $.each(petitionData, function(index, value) {
        if(value.ons_code == code)
        {
            return value;
        }
    });
}


