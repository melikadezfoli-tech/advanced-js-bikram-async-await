//DESARROLLA AQUI TUS SOLUCIONES

//Ejercicio 1 Obtener Pokemon aleatorio:

//función para obtener el total de Pokemon de forma automática
const MAX_VALID_ID = 1025; //ultimo pokemon registrado
async function getTotalPokemonCount() {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1`);
  const data = await response.json();
  return Math.min(data.count, MAX_VALID_ID);// automatizamos valor total de Pokemon evitando ids no válidos
}
//función para obtener el Pokemon aleatorio
async function getRandomPokemon(){
 try{
    const maxPokemon=await getTotalPokemonCount();
    const randomId=Math.floor(Math.random()*maxPokemon)+1;

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    
    if (!response.ok){
        console.log (`No se ha podido obtener el Pokemon: ${response.status}`);
        return null;
    }
    const data = await response.json();//sólo se ejecuta si la respuesta es válida
    
    return {
        id: data.id,
        name: data.name,
        sprite: data.sprites.front_default ?? "Sin imagen disponible",
    };
}catch(error){
    console.log("No se han podido obtener los datos:", error.message);
    return null;
}
}

getRandomPokemon().then(pokemon=>{
    if (pokemon){
        console.log (`Pokemon:${pokemon.name} (Id:${pokemon.id})`)
        console.log(`Imagen: ${pokemon.sprite}`);
  } else {
    console.log("No se pudo obtener un Pokémon.");
  }
});

//Ejericio 2.- Declara una funcion **getImageAndName** que retorne el nombre y la URL de la imagen de un pokemon => (return {img, name})

async function getImageAndName(pokemonName) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
    if (!response.ok) {
      return (`No se pudo obtener el Pokémon: ${pokemonName}`);
    }

    const data = await response.json();
    return {
      name: data.name,
      imageUrl: data.sprites.front_default
    };
  } catch (error) {
    console.log(error);
    return {
      name: null,
      imageUrl: null
    };
  }
}

getImageAndName("pikachu").then(console.log)

/*Ejercicio 3.- Declara una funcion **printImageAndName** que retorne 
el string necesario para pintar la imagen y el nombre del pokemon en 
el DOM de la siguiente forma:
<section>
    <img src="url de imagen" alt="nombre del pokemon">
    <h1>Nombre del pokemon</h1>
</section>*/
async function printImageAndName(pokemonName) {
  try {
    const response = await getImageAndName(pokemonName);
    
    if (!response.name || !response.imageUrl) {
      return `No se pudo obtener el nombre y la imagen del Pokémon: ${pokemonName}`;
    }

    return {
      name: response.name,
      imageUrl: response.imageUrl
    };
  } catch (error) {
    console.error(error);
    return {
      name: null,
      imageUrl: null
    };
  }
}
printImageAndName("pikachu").then(console.log);

function printImageAndName(nombre, imagenUrl) {
  const section = document.createElement("section");

  const img = document.createElement("img");
  img.src = imagenUrl;
  img.alt = nombre;

  const h1 = document.createElement("h1");
  h1.textContent = nombre;

  section.append(img);
  section.append(h1);

  document.body.append(section); 
 
}

/*Ejercicio 4.- Declara una función **getRandomDogImage** 
que retorne la url de la imagen de un perro aleatorio
Recordatorio, la API de perritos era 'https://dog.ceo/dog-api/'*/

async function getRandomDogImage(){
  try{
    const response=await fetch(`https://dog.ceo/api/breeds/image/random`);
    const data=response.json();
  return data.message; 
  } catch (error) {
    console.error("Error al obtener la imagen del perro:", error);
    return null;
  }
}
getRandomDogImage().then(url => {
  if (url) {
    console.log("Imagen aleatoria de perro:", url);
  }
});

/*Ejercicio 5.- Declara una función **getRandomPokemonImage** 
que retorne la url de la imagen de un pokemon aleatorio.*/

async function getRandomPokemonImage() {
  try {
    const randomId = Math.floor(Math.random() * 898) + 1; // Hay 898 Pokémon en la api
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const data = await response.json();
    return data.sprites.front_default; 
  } catch (error) {
    console.error("Error al obtener la imagen del Pokémon:", error);
    return null;
  }
}

Ejercicio 6.- Declara una función **printPugVsPikachu** que pinte la batalla entre "Pug" y "Pikachu" (no se testea)


### Ejercicios con Rick and Morty ###

Usando la api de Rick and Morty https://rickandmortyapi.com/ y sólo async/await:

Ejercicio 7.- Declara una función **getRandomCharacter** que retorne un personaje aleatorio.

Ejercicio 8.- Declara una función **getRandomCharacterInfo** que retorne de un personaje su imagen, nombre, episodios en los que aparece y el nombre del primer episodio en el que aparece + fecha de estreno, tendrás que hacer otro fetch para llegar a los ultimos datos. Formato de retorno => (return {img, name, episodes, firstEpisode, dateEpisode})

Ejercicio 9.- Pinta los anteriores datos en el DOM (no se testea)










