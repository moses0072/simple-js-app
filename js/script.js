
//IIFE
let pokemonRepository = (function(){
    //Empty array will be filld with pokemon objects from an API
    let pokemonList = [];
  
  //defined the API url in a variable
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //creating lists and button in the DOM
  function addListItem(pokemon){
  let pokList = document.querySelector('.pokemon-list');
  let listItem = document.createElement('li');
  let button = document.createElement('button');
  
  //pokemon names on the buttons  
  button.innerText = pokemon.name;
  button.classList.add('button-class');
  
  //append the butten und the list to thier parents  
  listItem.appendChild(button);
  pokList.appendChild(listItem);
  
  //Event listener on click
  button.addEventListener('click', function(event){
        showDetails(pokemon);
    });
  }

  //execute the details of clicked pokemon as a promise on console 
  function showDetails(pokemon){
    loadDetails(pokemon).then(function(){
      console.log(pokemon);
    });
  }

  //getAll execute the pokemonlist
  function getAll(){
    return pokemonList;
  }

  //checking the type of the variable pokemonRepository
  //pushes items into the pokemonList
  function add(pokemon){
    if (typeof pokemon === 'object' &&
    'name' in pokemon
    ){
    pokemonList.push(pokemon);
    } 
  }

  //Get a list of pokemon from the API
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

//Getting the pokemon details from the pokemon object using the Url
function loadDetails(item){
  let url = item.detailsUrl;
  return fetch(url).then(function(response){
    return response.json();
  }).then(function(details){
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = details.types;
  }).catch(function (e){
    console.error(e);
  })
}
//executed funtion outside the IIFE
  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem
  };
    })();
 
  //Calling the loadList function of pokemonrepository
  pokemonRepository.loadList().then(function(){
  //Executed the getAll function
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
});
