'use strict'

let map;
let markers = [];
var markerCluster;

/**
 * Initiating the google maps element, and centering it at Glasgow Caledonian university
 */
function initMap() {
  console.log("initing map")
  map = new google.maps.Map(document.getElementById('map'), {
      zoom: 2,
      center: new google.maps.LatLng(55.866, -4.2499),
      mapTypeId: 'terrain'
  });
  google.maps.event.trigger(map, 'resize');
}

$(function(){  
  /**
   * Fetch the feeds from the server and call the create buttons method
   */
  async function fetchFeeds(){
    console.log('Fetching the feeds and creating buttons');
    let feeds = await fetch('/earthdatafeeds').then(response => response.json()).then(data => {
      return data;
    });

    createButtons(feeds)
  }

  fetchFeeds();

  /**
   * Method used to clear previous markers and marker clusters from the map.
   * Method gets called every time any of the buttons are called.
   */
  function clearOverlays(){
    if(markers === undefined || markers.length == 0){
    }else{
      for(var i = 0; i< markers.length; i++){
        markers[i].setMap(null);
      }
      markers = [];
      markerCluster.clearMarkers();
    }
  }

  /**
   * Dynamically create buttons based on all the available earthquake feeds provided from the server
   */
  function createButtons(feeds){  
    
    /**
     * Looping through all the feeds and creating a div for each element
     */
    feeds.urls.forEach(element => {
      
      let buttonfeedcontainer = `
                                <div class="buttonbyfeed">
                                  <div class="labelcontainer">
                                    <label>${element.name}</label>
                                  </div>
                                  <div class="buttonfeeds">
                                    <ul id=${element.name}>
                                    </ul>
                                  </div>
                                </div>
                                `
                              
      $('#buttons').append(buttonfeedcontainer);

    /**
     * Appending buttons to the UL, containing the URL for the feed.
     */
    element.feeds.forEach(feed => {
      let singlebutton = `
                          <li>
                          <button class='dynamic' data-feedurl='${feed.url}'>${feed.name}</button>
                          </li>
                          `
      $('#' + element.name).append(singlebutton);
      })
    })

    $('.dynamic').click(function(){
      /**
       * Clearing previous markers before fetching new ones
       */
      clearOverlays();
  
      /**
       * Initializing infowindow for google maps,
       * getting the url for the fetch request from the data-feedurl element of the button
       */
      let infowindow = new google.maps.InfoWindow({});
      let feedurl = $(this).attr('data-feedurl')
      
      fetch(feedurl)
      .then(response => response.json())
      .then(response => {
        /**
         * The response has individual earthquakes named as a feature.
         * Looping through all these features, extracting the location and dropping a marker on the location.
         */
        response.features.forEach(feature => {
          var latLng = new google.maps.LatLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]);
          var marker = new google.maps.Marker({
            position: latLng,
            map:map,
            animation: google.maps.Animation.DROP
          });
  
          /**
           * Markers need to be pushed to array in order to be removed later
           */
          markers.push(marker);
        
          let infowindowcontent = `
                                  <div>
                                    <h3>${feature.properties.place}</h3>
                                    <button onclick="window.open('/latloninfo?latlng=${latLng.lat() +','+ latLng.lng()}')">Open page in a new tab!</button>
                                  </div>
                                  `
          /**
           * Adding an action listener and animation to markers.
           */
          marker.addListener('click', function() {
            infowindow.setOptions({
              content: infowindowcontent
            })
  
            if(marker.getAnimation() !== null){
              marker.setAnimation(null);
              infowindow.close();
            }else{
              marker.setAnimation(google.maps.Animation.BOUNCE);
              infowindow.open(map,marker);
            }
          })
        })

        /**
         * Creating a new marker clusterer to handle large amounts of markers
         */
        markerCluster = new MarkerClusterer(map, markers,
          {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      })
    })
  }
})