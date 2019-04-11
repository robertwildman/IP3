
  /**
   * Initialising necessary variables for page
   */
let map;
let markers = [];

let useLocation = false;

let apixuUrl = "http://api.apixu.com/v1/current.json?key=";
let apixuKey = "fd7ede7ab4f24f97ab7205326193001";

let apixuConditions;

$(function() {

  /**
   * Determine whether the query to apixu uses the url for location or latitude and longitude
   * Disable and clear the input box / boxes for the option that is not in focus
   */
  $('#location').focusin(function(){
    $('.latlon').prop('disabled', true).val('');
    useLocation = true;
  }).focusout(function(){
    $('.latlon').prop('disabled', false)
  });

  $('.latlon').focusin(function(){
    $('#location').prop('disabled', true).val('');
    useLocation = false;
  }).focusout(function(){
    $('#location').prop('disabled', false)
  });

  /**
   * Fetch the list of possible conditions for weather
   * if it has not been fetched yet.
   */
  let fetchConditions = function(){
    if(!apixuConditions){
      fetch('http://www.apixu.com/doc/Apixu_weather_conditions.json')
      .then(response => response.json())
      .then(response => {
        apixuConditions = response;
      })
    }else{
      console.log('skipping fetching')
    }
  }

  fetchConditions();

  /**
   * Check if the map has a marker on it from preious query,
   * if it does, set it to null and clear the markers array
   */
  function removePreviousMarker(){
    if(markers !== undefined || markers.length != 0){
      for(var i = 0; i< markers.length; i++){
        markers[i].setMap(null);
      }
      markers = [];
    }
  }

  let getCurrentWeather = function() {

    removePreviousMarker();

    let apixuLatitude = $("#latitude").val();
    let apixuLongitude = $("#longitude").val();
    let apixuLocation = $("#location").val();
    let fetchUrl;

    /**
     * Depending on whether latitude and longitude or location name is used,
     * assign the fetch url the proper parameters
     */
    if(!useLocation){
      fetchUrl = apixuUrl + apixuKey + '&q=' + apixuLatitude +','+apixuLongitude;
    }else{
      fetchUrl = apixuUrl + apixuKey + '&q=' + apixuLocation;
    }
    
    /**
     * Example fetch url for
     * Lat & Lon: http://api.apixu.com/v1/current.json?key=fd7ede7ab4f24f97ab7205326193001&q=58.87185056337498,11.122172458267187
     * Location: http://api.apixu.com/v1/current.json?key=fd7ede7ab4f24f97ab7205326193001&q=glasgow
     */

    fetch(fetchUrl)
    .then(response => {
        return response.json()
    })
    .then(data => {
        /**
         * Pull necessary data from response for easier processing
         */
        let weatherLocation = data.location.name;
        let localTime = data.location.localtime;
        let temperature = data.current.temp_c; 
        let condition = data.current.condition.text;
        let lat = data.location.lat;
        let lon = data.location.lon;

        /**
         * Path to weather condition icons
         */
        let conditionIconSrc = '../IMAGES/weather/64x64/day/';
    
        /**
         * Weather condition icons are numbered and not named,
         * loop through the possible apixuConditions and comparing them to condition provided from request,
         * If there is a match, assign the correc number available in apixuCondition.icon to our ConditionIconSrc to make it show up in the UI
         */
        apixuConditions.forEach(apixuCondition => {
          if(apixuCondition.day === condition){
            conditionIconSrc += apixuCondition.icon+'.png';
          }
        })   

        /**
         * Creating new center point from the latitude and longitude of the query.
         * Dropping a marker and panning to the same location.
         */
        let center = new google.maps.LatLng(lat, lon);
        let marker = new google.maps.Marker({
          position: center,
          map:map,
          animation: google.maps.Animation.DROP
        });

        markers.push(marker);
        map.panTo(center);   

        /**
         * Removing the previous result from the query and appending a new result with data from the query.
         */
        $('#weatherResult').remove();
        $('#weatherContainer').hide().append(`
                                              <div id="weatherResult">
                                                <div id="resultHeader">
                                                  <p id="resultTime">Today: ${localTime}</p>
                                                  <h3 id="resultTitle">${weatherLocation}</h3>
                                                </div>
                                                <img src="${conditionIconSrc} "alt="sunshine" id="resultPicture"> 
                                                <p id="resultTemperature">${temperature}</p>
                                                <p id="resultCondition">${condition}</p>
                                              </div>
                                              `).slideDown(300);
    });
  };

  $('#currentWeather').click(getCurrentWeather);

});

/**
 * Initiate the google maps element
 */
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
      zoom: 2,
      center: new google.maps.LatLng(55.866, -4.2499),
      mapTypeId: 'terrain'
  });
  google.maps.event.trigger(map, 'resize');

  /**
   * Adding an event listener for clicks, assignign the clicks latitude and longitude to the pages input fields,
   * and calling the getCurrentWeather via a click
   */
  new google.maps.event.addListener(map, "click", function (e) {
    useLocation = false;
    document.getElementById('location').value = '';
    document.getElementById('latitude').value = e.latLng.lat();
    document.getElementById('longitude').value = e.latLng.lng();

    document.getElementById('currentWeather').click();
  });
}