$(function(){

  /**
   * Variables used throughout app.
   * Storing tutorials in a tutorial array, for easy and automatic creation of new tutorials.
   */
  let index = 0;
  const tutorials = {
    tutorialArray: [
      {
        name: 'Geo Json', 
        description: 'A page that introduces GeoJSON', 
        url:'/', 
      },
      {
        name: 'Earthquake data fundamentals', 
        description: 'A page that explains earthquake data fundamentals', 
        url:'/', 
      },{
        name: 'Weather data fundamentals', 
        description: 'A page that explains weather data fundamentals', 
        url:'/'
      },
      {
        name: 'Javascript data processing', 
        description: 'A page that explains specific JavaScript techniques used to access and process data', 
        url:'/'
      }
    ]
  };

  /**
   * Calling createTutorial method for every tutorial in tutorial array
   */
  tutorials.tutorialArray.forEach(tutorial => {
    createTutorial(tutorial);
  })

  /**
   * Create and append a tutorial on the page for every tutorial in the tutorial array 
   */
  function createTutorial(tutorial){
    let tutorialContent = `
                            <div class='tutorial'>
                              <a href='${tutorial.url}'>
                                <h3>${tutorial.name}</h3>
                                <h5>${tutorial.description}</h5>
                                <p class='content' id='content${index}'>${tutorial.content}</p>
                              </a>
                            </div>
                          `
    $('#tutorials').append(tutorialContent);     
    
    index++;
  }

  /**
   * Add a listener to show the tutorial content once clicked
   */

  $('.tutorial').click(function (){
    showContent($(this).children('p').attr('id'));
  })

  /**
   * Function to show the content of a tutorial
   */
  function showContent(contentId){
    $('#'+contentId).fadeToggle(200);
  }
})