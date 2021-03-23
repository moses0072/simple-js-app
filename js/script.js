
//IIFE
let pokemonRepository = (function(){
    //Array contains objects of pokemon
    let pokemonList = [
      {
          name:'Bulbasaur',
          height:7, 
          types:['grass', 'poison']
      },
      {
          name:'Charizad' , 
          height:5, 
          types: ['fire' , 'flying']
      },
      {
          name: 'Butterfree', 
          height:3 ,
          types: ['bug' , 'flying']
      }
  ];
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
  //execute the details of clicked pokemon on console 
  function showDetails(pokemon){
      console.log(pokemon);
  }
  //getAll execute the pokemonlist
  function getAll(){
    return pokemonList;
  }
  //checking the type of the variable pokemonRepository
  //pushes items into the pokemonList
  function add(item){
    if (typeof item === 'object'){
    pokemonList.push(item);
    } 
  }
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  }
    })();
  //adding a new object to the pokemonList  
  pokemonRepository.add({name: 'pikachu', height: 1});
  
  //forEach loop to display the contant of the PokemonList array
  
  let text = ' -- Wow, that\'s big! '; 
     pokemonRepository.getAll().forEach(function(pokemon){
      
      pokemonRepository.addListItem(pokemon);
    });
  