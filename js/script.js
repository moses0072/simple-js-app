
//IIFE
let pokemonRepository = (function(){
  let modalContainer = document.querySelector('#modal-container');
  let pokList = document.querySelector('.pokemon-list');
  //Empty array will be filld with pokemon objects from an API
  let pokemonList = [];
  
  //defined the API url in a variable
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
 
  function showModal(pokemon) {
    
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);
    modal.appendChild(closeButtonElement);

    //get the name of the pokemon and display it on Modal
    let pokName = document.createElement('h1');
    pokName.innerText = pokemon.name;
    modal.appendChild(pokName);

    //Get the height of the pokemon and display it on the Modal
    let pokHeight = document.createElement('p');
    pokHeight.innerText = pokemon.height;
    modal.appendChild(pokHeight);

    //get the img of the pokemon and display it on the Modal  
    let containerImg = document.querySelector('#image-container');
    let pokImg = document.createElement('img');
    pokImg.src = pokemon.imageUrl;
    modal.appendChild(pokImg);


    //modal is the child of modalContainer
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible'); 
  }

  //Hide function 
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  // close the Model when Escape key got hitted
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });

  // Close the function when the user clicked outside the Modal
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  /*document.querySelector('#show-modal').addEventListener('click', () => {
    showModal();
  });*/

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
    //Calling the Modal
    showModal(pokemon);  
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
          detailsUrl: item.url,
          //height: item.height
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
