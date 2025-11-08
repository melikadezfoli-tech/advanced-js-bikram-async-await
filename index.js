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




