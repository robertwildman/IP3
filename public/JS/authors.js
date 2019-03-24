$(function(){

  let users = [
    {
      firstname: "janne",
      lastname: "antila",
      picture: "../IMAGES/muhku.jpg",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A, ea suscipit labore, ratione omnis voluptatum maxime nisi adipisci eaque, doloremque deserunt similique? Laudantium cum unde aperiam rerum obcaecati, eveniet aliquam itaque accusamus suscipit ex neque reiciendis deserunt explicabo iure eaque nesciunt autem quis sit animi optio facilis ipsum? Maiores et quia dolorum repellat, nulla debitis minima voluptate, sit, voluptates aliquid beatae quas itaque eveniet! Assumenda, dolor quaerat sunt corporis obcaecati, nesciunt error provident qui, magni cumque mollitia consequatur nemo exercitationem?<"
    },
    {
      firstname: "benjamin",
      lastname: "hollywood",
      picture: "../IMAGES/muhku.jpg",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A, ea suscipit labore, ratione omnis voluptatum maxime nisi adipisci eaque, doloremque deserunt similique? Laudantium cum unde aperiam rerum obcaecati, eveniet aliquam itaque accusamus suscipit ex neque reiciendis deserunt explicabo iure eaque nesciunt autem quis sit animi optio facilis ipsum? Maiores et quia dolorum repellat, nulla debitis minima voluptate, sit, voluptates aliquid beatae quas itaque eveniet! Assumenda, dolor quaerat sunt corporis obcaecati, nesciunt error provident qui, magni cumque mollitia consequatur nemo exercitationem?<"
    },
    {
      firstname: "robert",
      lastname: "wildman",
      picture: "../IMAGES/muhku.jpg",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A, ea suscipit labore, ratione omnis voluptatum maxime nisi adipisci eaque, doloremque deserunt similique? Laudantium cum unde aperiam rerum obcaecati, eveniet aliquam itaque accusamus suscipit ex neque reiciendis deserunt explicabo iure eaque nesciunt autem quis sit animi optio facilis ipsum? Maiores et quia dolorum repellat, nulla debitis minima voluptate, sit, voluptates aliquid beatae quas itaque eveniet! Assumenda, dolor quaerat sunt corporis obcaecati, nesciunt error provident qui, magni cumque mollitia consequatur nemo exercitationem?<"
    },
    {
      firstname: "lewis",
      lastname: "bohme",
      picture: "../IMAGES/muhku.jpg",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A, ea suscipit labore, ratione omnis voluptatum maxime nisi adipisci eaque, doloremque deserunt similique? Laudantium cum unde aperiam rerum obcaecati, eveniet aliquam itaque accusamus suscipit ex neque reiciendis deserunt explicabo iure eaque nesciunt autem quis sit animi optio facilis ipsum? Maiores et quia dolorum repellat, nulla debitis minima voluptate, sit, voluptates aliquid beatae quas itaque eveniet! Assumenda, dolor quaerat sunt corporis obcaecati, nesciunt error provident qui, magni cumque mollitia consequatur nemo exercitationem?<"
    },
    {
      firstname: "adrian",
      lastname: "hollywood",
      picture: "../IMAGES/muhku.jpg",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A, ea suscipit labore, ratione omnis voluptatum maxime nisi adipisci eaque, doloremque deserunt similique? Laudantium cum unde aperiam rerum obcaecati, eveniet aliquam itaque accusamus suscipit ex neque reiciendis deserunt explicabo iure eaque nesciunt autem quis sit animi optio facilis ipsum? Maiores et quia dolorum repellat, nulla debitis minima voluptate, sit, voluptates aliquid beatae quas itaque eveniet! Assumenda, dolor quaerat sunt corporis obcaecati, nesciunt error provident qui, magni cumque mollitia consequatur nemo exercitationem?<"
    },
    {
      firstname: "stephen",
      lastname: "wrath",
      picture: "../IMAGES/muhku.jpg",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A, ea suscipit labore, ratione omnis voluptatum maxime nisi adipisci eaque, doloremque deserunt similique? Laudantium cum unde aperiam rerum obcaecati, eveniet aliquam itaque accusamus suscipit ex neque reiciendis deserunt explicabo iure eaque nesciunt autem quis sit animi optio facilis ipsum? Maiores et quia dolorum repellat, nulla debitis minima voluptate, sit, voluptates aliquid beatae quas itaque eveniet! Assumenda, dolor quaerat sunt corporis obcaecati, nesciunt error provident qui, magni cumque mollitia consequatur nemo exercitationem?"
    }
  ];

  users.forEach((user, index) =>{
    $('#profiles').append(`
                            <div id="profile${index}" class="profile">
                              <div class="imageContainer">
                                <img src=${user.picture} alt="${user.firstname} class="profilepicture" width="150" height="220" >
                              </div>
                              <h3>${user.firstname}</h3>
                              <p>${user.description}</p>
                            </div>
                          `)
  })

})