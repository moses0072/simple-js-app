//IIFE
let pokemonRepository = (function(){
  //Empty array will be filld with pokemon objects from an API
  let pokemonList = [];

  //defined the API url in a variable
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  let searchPok = document.querySelector('#search');
  
  //creating lists and button in the DOM
  function addListItem(pokemon){
    let listGroup = $('.list-group')  
    let listItem = $('<li></li>');
    listItem.addClass('list-group-item list-group-item-action');
    listGroup.append(listItem);

    let button = $('<button data-toggle= "modal" data-target= "#pokModal"></button>');
    button.addClass('btn btn-primary btn-lg' );
    listItem.append(button);
    button.append(pokemon.name);
    button.on('click', function(){
    showDetails(pokemon);
  });
  }
  //execute the details of clicked pokemon as a promise on console 
  function showDetails(pokemon){
    loadDetails(pokemon).then(function(){ 

    //Calling the Modal
    showModal(pokemon);  
    });
  }

  //getAll execute the pokemonlist
  function getAll(){
    return pokemonList;
  }

  function add(pokemon){
    if (typeof pokemon === 'object' &&
    'name'  in pokemon
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
          detailsUrl: item.url,
          abilities: item.abilities,
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  //Get details of the fetched pokemon
  function loadDetails(item){
  let url = item.detailsUrl;
  return fetch(url).then(function(response){
    return response.json();
  }).then(function(details){
    item.imageUrlFront = details.sprites.front_default;
    item.imageUrlBack = details.sprites.back_default;
    item.height = details.height;
    item.types = details.types;
    item.weight = details.weight;
    item.abilities = details.abilities;
  }).catch(function (e){
    console.error(e);
  });
}

  function showModal(pokemon) {
      let modalBody = $('.modal-body');
      let modalTitel = $('.modal-title');
      let modalHeader = $('.modal-header');
    
      modalTitel.empty();
      modalBody.empty();

      //Get the pokemon name
      let nameElement = $('<h1>' + pokemon.name + '</h1>');

      //get the front Image of the pokemon
      let imageElementFront = $('<img class="modal-img" style= "50%">');
      imageElementFront.attr('src', pokemon.imageUrlFront);
      //Get the image from behind
      let imageElementBack = $('<img class="modal-img" style= "50%">');
      imageElementBack.attr('src', pokemon.imageUrlBack);

      //get the height of the pokemon
      let heightElement = $('<p>' + 'height: ' + pokemon.height + '</p>');
      let weightElement = $('<p>'+ 'weight: '+ pokemon.weight + '</p>');
      modalTitel.append(nameElement);
      modalBody.append(imageElementFront);
      modalBody.append(imageElementBack);
      modalBody.append(heightElement);
      modalBody.append(weightElement);
    
  }
      //Searching the displayed Pokemon list
      searchPok.addEventListener('input', function(){
      let pokemonList = document.querySelectorAll('.list-group-item');
      let searchValue = searchPok.value.toUpperCase();

        pokemonList.forEach(function(pokemon){
        if(pokemon.innerText.toUpperCase().indexOf(searchValue) > -1){
            pokemon.style.display = '';
        }else{
            pokemon.style.display = 'none';
        }
        })
      });

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