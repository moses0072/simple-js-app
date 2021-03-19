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
//forEach function to display the contant of the PokemonList array
let text = ' -- Wow, that\'s big! ';
    pokemonList.forEach(function(list){
    if (list.height > 5){
        document.write('<strong>', list.name + ' ' + '(height: ' + list.height +') ' + ' ' + list.types[0] + ' ' + list.types[1] + ' ' + text, '</strong>','<br>');
    } else if (list.height > 4 && list.height < 6){
        document.write('<strong>', list.name + ' ' + '(height: ' + list.height + ') ','</strong>','<br>');
    } else {
        document.write('<strong>', list.name + ' ' + '(height: ' + list.height + ')','</strong>');
    };
});
