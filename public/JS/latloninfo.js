$(function(){

  /**
   * Getting the Latitude and longitude from the URL
   */
  let urlParameters = new URLSearchParams(window.location.search);
  urlParameters.has('latlng')
  let coords = urlParameters.get('latlng');
  
  /**
   * Defining necessary variables for this page
   */
  let measurements = [];
  let location;
  let locationLatitude;
  let locationLongitude;
  let locationDistance;
  let measurementDefinitions = [];

  /**
   * Getting the location based on the coordinates provided in the URL.
   * The Url provides the nearest location to the given coordinates
   */
  function getLocation(){
    
    const fetchurl = `https://api.openaq.org/v1/locations?coordinates=${coords}&nearest=1`

    fetch(fetchurl).then(response => response.json()).then(data => {
      location = data.results[0].location;
      locationDistance = data.results[0].distance / 1000;
      locationLatitude = data.results[0].coordinates.latitude
      locationLongitude = data.results[0].coordinates.longitude

      console.log(data)
      console.log(locationDistance);
      getMeasurements(location)
    });

  }

  /**
   * Getting measurements based on the location provided
   */
  function getMeasurements(location){

    const fetchLocation = `https://api.openaq.org/v1/latest?location=${location}`
    
    /**
     * Pushing all measurements from the fetch result to a local variable for easier handling
     */
    fetch(fetchLocation).then(response => response.json()).then(data => {
      for(let i=0; i< data.results[0].measurements.length; i++){
        measurements.push(data.results[0].measurements[i]);
      }


      const errormessage = `<p id='error'>Sorry, no measurements found for ${location}</p>`;
      setLocationTitle();

      /**
       * Providing an error message in case there are no measurements to display
       */
      if(measurements.length === 0){
        $('#infomessage').append(errormessage)
      }else{
        handleMeasurements();
      }

    })    
  }

  /**
   * Showing the location and coordinates on the page
   */
  function setLocationTitle(){

    $('.location').html(`The closest location to the earthquake with available measurements is: ${location}`);
    $('.distance').html(`It is ${locationDistance} KM away`);
    $('.coordinates').html('Latitude: ' + locationLatitude + ' Longitude: ' +locationLongitude);
  }

  /**
   * Showing information about the measurements found
   */
  function handleMeasurements(){

    let measurementslength = measurements.length;

    const infomessageone = `<p id='info'>${measurementslength} measurement found for ${location}</p>`;
    const infomessage = `<p id='info'>${measurementslength} measurements found for ${location}</p>`;

    /**
     * Checking for correct grammar
     */
    if(measurementslength <= 1){
      $('#infomessage').append(infomessageone);
    }else{
      $('#infomessage').append(infomessage);    
    }

    /**
     * Appending each measurement to the page.
     * Measurements show the parameter, value and unit
     */
    measurements.forEach(measurement => {
    $('#airinfocontainer').append(`
                                  <div class="parameter">
                                    <h5>${measurement.parameter}</h5>
                                    <p>${measurement.value}  ${measurement.unit}</p>
                                  </div>
                                `)
    });

    getMeasurementDefinitions()
  }

  /**
   * Get the definitions for the shorthand used in the measurmeents
   */
  function getMeasurementDefinitions(){
    
    const measurementUrl = `https://api.openaq.org/v1/parameters`;

    fetch(measurementUrl).then(response => response.json()).then(data => {
      /**
       * Pushing all the results to a local variable for easier handling
       */
      data.results.forEach(definition => {
        measurementDefinitions.push(definition);
      })

      handleMeasurementDefinitions()
    })
  }

  /**
   * Appending all measurement definitions to the page
   */
  function handleMeasurementDefinitions(){

    measurementDefinitions.forEach(definition => {      
      $('#definitionscontainer').append(`<p>${definition.name} ${definition.description}</p>`)
    })
  }

  /**
   * Executing the page
   */
  getLocation()

})
