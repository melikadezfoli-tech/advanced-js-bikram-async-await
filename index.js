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










