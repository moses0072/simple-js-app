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
//for loop to display the contant of the PokemonList array
let text = ' -- Wow, that\'s big! ';
for (let i = 0; i < pokemonList.length; i++){
    if (pokemonList[i].height > 5){
        document.write('<strong>', pokemonList[i].name + ' ' + '(height: ' + pokemonList[i].height +') ' + ' ' + pokemonList[i].types[0] + ' ' + pokemonList[i].types[1] + ' ' + text, '</strong>','<br>');
    } else if (pokemonList[i].height > 4 && pokemonList[i].height < 6){
        document.write('<strong>',pokemonList[i].name + ' ' + '(height: ' + pokemonList[i].height + ') ','</strong>','<br>');
    } else {
        document.write('<strong>',pokemonList[i].name + ' ' + '(height: ' + pokemonList[i].height + ')','</strong>');
    }
}