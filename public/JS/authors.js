$(function(){

  let users = [
    {
      Name: "Janne Antila",
      picture: "../IMAGES/muhku.jpg",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A, ea suscipit labore, ratione omnis voluptatum maxime nisi adipisci eaque, doloremque deserunt similique? Laudantium cum unde aperiam rerum obcaecati, eveniet aliquam itaque accusamus suscipit ex neque reiciendis deserunt explicabo iure eaque nesciunt autem quis sit animi optio facilis ipsum? Maiores et quia dolorum repellat, nulla debitis minima voluptate, sit, voluptates aliquid beatae quas itaque eveniet! Assumenda, dolor quaerat sunt corporis obcaecati, nesciunt error provident qui, magni cumque mollitia consequatur nemo exercitationem?<"
    },
    {
      Name: "Benjamin Hollywood",
      picture: "../IMAGES/muhku.jpg",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A, ea suscipit labore, ratione omnis voluptatum maxime nisi adipisci eaque, doloremque deserunt similique? Laudantium cum unde aperiam rerum obcaecati, eveniet aliquam itaque accusamus suscipit ex neque reiciendis deserunt explicabo iure eaque nesciunt autem quis sit animi optio facilis ipsum? Maiores et quia dolorum repellat, nulla debitis minima voluptate, sit, voluptates aliquid beatae quas itaque eveniet! Assumenda, dolor quaerat sunt corporis obcaecati, nesciunt error provident qui, magni cumque mollitia consequatur nemo exercitationem?<"
    },
    {
      Name: "Robert Wildman",
      picture: "../IMAGES/muhku.jpg",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A, ea suscipit labore, ratione omnis voluptatum maxime nisi adipisci eaque, doloremque deserunt similique? Laudantium cum unde aperiam rerum obcaecati, eveniet aliquam itaque accusamus suscipit ex neque reiciendis deserunt explicabo iure eaque nesciunt autem quis sit animi optio facilis ipsum? Maiores et quia dolorum repellat, nulla debitis minima voluptate, sit, voluptates aliquid beatae quas itaque eveniet! Assumenda, dolor quaerat sunt corporis obcaecati, nesciunt error provident qui, magni cumque mollitia consequatur nemo exercitationem?<"
    },
    {
      Name: "Lewis Bohme",
      picture: "../IMAGES/muhku.jpg",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A, ea suscipit labore, ratione omnis voluptatum maxime nisi adipisci eaque, doloremque deserunt similique? Laudantium cum unde aperiam rerum obcaecati, eveniet aliquam itaque accusamus suscipit ex neque reiciendis deserunt explicabo iure eaque nesciunt autem quis sit animi optio facilis ipsum? Maiores et quia dolorum repellat, nulla debitis minima voluptate, sit, voluptates aliquid beatae quas itaque eveniet! Assumenda, dolor quaerat sunt corporis obcaecati, nesciunt error provident qui, magni cumque mollitia consequatur nemo exercitationem?<"
    },
    {
      Name: "Adrian McAulay",
      picture: "../IMAGES/muhku.jpg",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A, ea suscipit labore, ratione omnis voluptatum maxime nisi adipisci eaque, doloremque deserunt similique? Laudantium cum unde aperiam rerum obcaecati, eveniet aliquam itaque accusamus suscipit ex neque reiciendis deserunt explicabo iure eaque nesciunt autem quis sit animi optio facilis ipsum? Maiores et quia dolorum repellat, nulla debitis minima voluptate, sit, voluptates aliquid beatae quas itaque eveniet! Assumenda, dolor quaerat sunt corporis obcaecati, nesciunt error provident qui, magni cumque mollitia consequatur nemo exercitationem?<"
    },
    {
      Name: "Stephen Wrath",
      picture: "../IMAGES/muhku.jpg",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A, ea suscipit labore, ratione omnis voluptatum maxime nisi adipisci eaque, doloremque deserunt similique? Laudantium cum unde aperiam rerum obcaecati, eveniet aliquam itaque accusamus suscipit ex neque reiciendis deserunt explicabo iure eaque nesciunt autem quis sit animi optio facilis ipsum? Maiores et quia dolorum repellat, nulla debitis minima voluptate, sit, voluptates aliquid beatae quas itaque eveniet! Assumenda, dolor quaerat sunt corporis obcaecati, nesciunt error provident qui, magni cumque mollitia consequatur nemo exercitationem?"
    }
  ];
  /**
   * Create a template for every author
   */
  users.forEach((user, index) =>{
    $('#profiles').append(`
                            <div id="profile${index}" class="profile">
                              <div class="imageContainer">
                                <img src=${user.picture} alt="${user.Name} class="profilepicture" width="150" height="220" >
                              </div>
                              <h2>${user.Name}</h2>
                              <p>${user.description}</p>
                            </div>
                          `)
  })

})