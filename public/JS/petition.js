var mymap;
var petitionData = [];
var geo;
var max;
$( document ).ready(function() {
//Get Petition data from Gov 
$.ajax({
    url: "http://lda.data.parliament.uk/epetitions.json?_view=ePetitionsListViewer&_pageSize=500&_sort=-numberOfSignatures&_page=0",
    type: "get", //send it through get method
    success: function(response) {
        console.log(response);
        $.each(response.result.items, function(index, value) {
            console.log(value.label);
            //Adding it to the petition array
            var drop = '<option value="'+value.identifier._value+'">'+ value.label._value +'</option>'
            $('#petitiondrop').append(drop);
        }); 
        
    },
    error: function(xhr) {
        //Error with the request
        error("Issue with request!");
        console.log(xhr);
    }
});
//Load in the map 
loadmap();
//Add Listener to the Dropdown
$('#petitiondrop').change(function () {
    //On select option in dropdown
    $( "select option:selected" ).each(function() {
        if($(this).val() != 0)
        {
            //Isn't on the select Petition Option.
            //Change the pettion Title and load in the new pettion using its ID
            $("#pettiontitle").html($(this).text());
            loadPetition($( this ).val());
        } 
    });
    
  }).change();
//Showing popup for petiton modal.
$('#petitionModal').modal('show');
});
//Loads in the pettion from the ID Given.
function loadPetition(id)
{
    //Clears Petition Data array
    petitionData = [];
    //Load in ID and Send off for the petition data
    $.ajax({
        url: "https://petition.parliament.uk/petitions/"+id+".json",
        type: "get", //send it through get method
        success: function(response) {
            //Looping through all constituency in the JSON file
            $.each(response.data.attributes.signatures_by_constituency, function(index, value) {
                //Adding it to the petition array
                petitionData.push(value);
            }); 
            //Build the legend
            max = gethigh()/8;
            //Empty Legend Div and then display the colors and Values 
            $("#legend").empty();
            $("#legend").append('<div class="ranking-row"> <div class ="color-box" style="background-color: #800026"></div> <p class="ranking-text"> '+ Math.round([max*7]) + '+ </p> </div>');
            $("#legend").append('<div class="ranking-row"> <div class = "color-box" style="background-color: #BD0026"></div> <p class="ranking-text"> '+ Math.round([max*6])  + ' - ' + (Math.round([max*7])  - 1) +'</p></div>');
            $("#legend").append('<div class="ranking-row"> <div class = "color-box" style="background-color: #E31A1C"></div> <p class="ranking-text"> '+ Math.round([max*5])  + ' - ' + (Math.round([max*6])  - 1) +'</p></div>');
            $("#legend").append('<div class="ranking-row"> <div class = "color-box" style="background-color: #FC4E2A"></div> <p class="ranking-text"> '+ Math.round([max*4])  + ' - ' + (Math.round([max*5])  - 1) +'</p></div>');
            $("#legend").append('<div class="ranking-row"> <div class = "color-box" style="background-color: #FD8D3C"></div> <p class="ranking-text"> '+ Math.round([max*3])  + ' - ' + (Math.round([max*4])  - 1) +'</p></div>');
            $("#legend").append('<div class="ranking-row"> <div class = "color-box" style="background-color:#FEB24C"></div> <p class="ranking-text"> '+ Math.round([max*2])  + ' - ' + (Math.round([max*3]) - 1) +'</p></div>');
            $("#legend").append('<div class="ranking-row"> <div class = "color-box" style="background-color:#FED976"></div> <p class="ranking-text"> ' + Math.round([max*1])  + ' - ' + (Math.round([max*2])  - 1) +' </p></div>');
            $("#legend").append('<div class="ranking-row"> <div class = "color-box" style="background-color:#FFEDA0"></div> <p class="ranking-text"> 0 - '+ (Math.round([max*1])  - 1) +' </p> </div>');
            //Reload the map with the new data
            reloadmap();
        },
        error: function(xhr) {
            //Let the users know that the request failed
            alert("Error with loading in petition data!");
        }
    });
}
//Styles the sections of the map'
function style(feature) {
    //Set colornum to default 0 incase of no signatures 
    var colornum = 0;
    //For each in the petitionData Check the map ONS Code with ones of file to see if we have the WPC on file
    $.each(petitionData, function(index, value) {
        if(value.ons_code == feature.properties.PCON13CD)
        {
            //If on file Change the colornum to number of signatures
            colornum = value.signature_count;
    
        }
    });
    //Returns the style of the sections in the map with the background color changing.
    return {
        //Get the color based on signatures
        fillColor: getColor(colornum),
        weight: 0.5,
        opacity: 1,
        color: '#a0a0a0',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
//Get color based on incoming signatures
function getColor(d) {
    //Max number been set before the function called
    //Based on the number it will be assigned a color
    return d > [max*7] ? '#800026' :
           d > [max*6]  ? '#BD0026' :
           d > [max*5]  ? '#E31A1C' :
           d > [max*4]  ? '#FC4E2A' :
           d > [max*3]   ? '#FD8D3C' :
           d > [max*2]   ? '#FEB24C' :
           d > [max*1]   ? '#FED976' :
                      '#FFEDA0';
}
//Get highest number 
function gethigh()
{
    //Sets high to default one so it can be compared. 
    var high = 1;
    //For each data in petition data check to see if signatures is higher then high variable set high to the signatures
    $.each(petitionData, function(index, value) {
        if(value.signature_count > high)
        {
            high = value.signature_count;
        }
    });
    //Returns high
    return high;
}
//Function for when Section of map is hoovered over
function highlightFeature(e) {
    //Gets the target section
    var layer = e.target;
    //For each petition loop to find the correct WPC so the correct data can be shown.
    $.each(petitionData, function(index, value) {
        if(value.ons_code == layer.feature.properties.PCON13CD)
        {
            //Displays the new data on the petition infomation div
            $("#mp").text("MP: " + value.mp);
            $("#cons").text("Constituency: " + value.name);
            $("#signs").text("Signatures: " + value.signature_count);
    
        }
    });
    //Set the layer style different so you can tell its been hovered over. 
    layer.setStyle({
        weight: 2,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    //For issue with different browsers
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}
//Zoom in on the clicked section so it fits the map!
function zoomToFeature(e) {
    //Zooms to the sections area so its only focus 
    mymap.fitBounds(e.target.getBounds());
}
//For when the mouse is moved off the section
function resetHighlight(e) {
    geo.resetStyle(e.target);
}
//For each section it needs to set up different listeners 
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}
//Used to load in the map
function loadmap()
{
    //Finds the map div and then changes the view to uk middle Lat and long
    mymap = L.map('mapid').setView([54.527457, -2.911369], 5);
    //Get the topojson file and loads it into the Leaflet.JS With the style function and oneachfunction being installed
    $.getJSON( "topo_wpc.json", function(topology) {
        geo = L.geoJSON(topojson.feature(topology, topology.objects.wpc), {style: style,onEachFeature: onEachFeature}).addTo(mymap);
    });
}
function reloadmap()
{
    //Remove the old geoJson
    mymap.removeLayer(L.geoJson);
    //Get the topojson file and loads it into the Leaflet.JS With the style function and oneachfunction being installed
    $.getJSON( "topo_wpc.json", function(topology) {
        geo = L.geoJSON(topojson.feature(topology, topology.objects.wpc), {style: style,onEachFeature: onEachFeature}).addTo(mymap);
    });
}
//Gets the petition data based on the ons_code
function getPetitionData(code)
{
    //For each item in peitionData looking for the codes to match and returns the object
    $.each(petitionData, function(index, value) {
        if(value.ons_code == code)
        {
            return value;
        }
    });
}


