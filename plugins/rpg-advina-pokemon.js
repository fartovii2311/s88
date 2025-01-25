let pokemonGame = {}

let handler = async (m, { conn }) => {
  let name = conn.getName(m.sender)

  if (pokemonGame[m.sender]) {
    return conn.sendMessage(m.chat, { text: `🚩 ${name}, ya estás jugando a adivinar el Pokémon! Espera a que termine para jugar otro.` }, { mentions: [m.sender] })
  }

  const pokemons = [
    { name: "Pikachu", description: "Este Pokémon eléctrico tiene una cola en forma de rayo y puede generar electricidad. Es uno de los más famosos." },
    { name: "Charmander", description: "Este Pokémon de tipo fuego tiene una llama en la punta de su cola. Es uno de los iniciales de la región de Kanto." },
    { name: "Bulbasaur", description: "Este Pokémon tiene una planta que crece en su espalda. Es de tipo planta y veneno." },
    { name: "Squirtle", description: "Este Pokémon es de tipo agua y tiene una concha dura. Es uno de los iniciales de Kanto." },
    { name: "Jigglypuff", description: "Este Pokémon tiene la capacidad de cantar y hacer que los demás se duerman. Es conocido por su voz." },
  ]

  let randomPokemon = pokemons[Math.floor(Math.random() * pokemons.length)]
  
  pokemonGame[m.sender] = { correctAnswer: randomPokemon.name, description: randomPokemon.description, attempts: 3 }

  // Enviar la pregunta y añadir reacción con un ícono
  let message = await conn.sendMessage(m.chat, { text: `🚩 ¡Hola @${name}! ¿Puedes adivinar el nombre de este Pokémon? \n\nDescripción: *${randomPokemon.description}* \n\nTienes 3 intentos para adivinar. ¡Buena suerte!` }, { mentions: [m.sender] })
  
  // Añadir reacción de pregunta (icono)
  await m.react('❓');  // Reacción con un ícono de pregunta

  // Este bloque se activa cuando el usuario envía su respuesta
  if (m.text.startsWith('!respuesta')) {
    const userAnswer = m.text.split(' ')[1]?.toLowerCase()

    if (!userAnswer) {
      return conn.sendMessage(m.chat, { text: "🚩 Por favor, ingresa el nombre del Pokémon como respuesta (por ejemplo: !respuesta Pikachu)." }, { mentions: [m.sender] })
    }

    if (userAnswer === pokemonGame[m.sender].correctAnswer.toLowerCase()) {
      conn.sendMessage(m.chat, { text: `🎉 ¡Felicidades @${name}! Adivinaste correctamente. Ganaste 50 XP.` }, { mentions: [m.sender] })
      global.db.data.users[m.sender].exp += 50
      delete pokemonGame[m.sender]
    } else {
      pokemonGame[m.sender].attempts--
      if (pokemonGame[m.sender].attempts === 0) {
        conn.sendMessage(m.chat, { text: `🚩 Lo siento @${name}, se te acabaron los intentos. El Pokémon era *${pokemonGame[m.sender].correctAnswer}*.` }, { mentions: [m.sender] })
        delete pokemonGame[m.sender]
      } else {
        conn.sendMessage(m.chat, { text: `🚩 Incorrecto, te quedan ${pokemonGame[m.sender].attempts} intentos. Intenta de nuevo.` }, { mentions: [m.sender] })
      }
    }
  }
}

handler.command = ['pokemon', 'adivinarpokemon', 'pokemongame']
handler.tags = ['rpg']
export default handler
