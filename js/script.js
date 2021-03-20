//IIFE 
let pokemonRepository = (function(){
//Array contains objects of Pokomon data    
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
//getAll execute the pokemonlist
function getAll(){
    return pokemonList;
  }
  //pushes items into the pokemonList
  function add(item){
    pokemonList.push(item);
  }

  return {
    add: add,
    getAll: getAll
  }
  })();
//adding a new object to the pokemonList
pokemonRepository.add({name: 'pikachu', height: 1});
//forEach function to display the contant of the PokemonList array
let text = ' -- Wow, that\'s big! ';
pokemonRepository.getAll().forEach(function(list){
    if (list.height > 5){
        document.write('<strong>', list.name + ' ' + '(height: ' + list.height +') ' + ' ' + list.types[0] + ' ' + list.types[1] + ' ' + text, '</strong>','<br>');
    } else if (list.height > 4 && list.height < 6){
        document.write('<strong>', list.name + ' ' + '(height: ' + list.height + ') ','</strong>','<br>');
    } else {
        document.write('<strong>', list.name + ' ' + '(height: ' + list.height + ')','</strong>','<br>');
    };
    
});
//checking the type of the variable pokemonRepository
document.write(typeof pokemonRepository.getAll());

