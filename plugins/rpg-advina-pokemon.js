let pokemonGame = {}

let handler = async (m, { conn }) => {
  let name = conn.getName(m.sender)

  if (pokemonGame[m.sender]) {
    return conn.sendMessage(m.chat, `🚩 ${name}, ya estás jugando a adivinar el Pokémon! Espera a que termine para jugar otro.`, m)
  }

  // Lista de Pokémon con descripciones
  const pokemons = [
    { name: "Pikachu", description: "Este Pokémon eléctrico tiene una cola en forma de rayo y puede generar electricidad. Es uno de los más famosos." },
    { name: "Charmander", description: "Este Pokémon de tipo fuego tiene una llama en la punta de su cola. Es uno de los iniciales de la región de Kanto." },
    { name: "Bulbasaur", description: "Este Pokémon tiene una planta que crece en su espalda. Es de tipo planta y veneno." },
    { name: "Squirtle", description: "Este Pokémon es de tipo agua y tiene una concha dura. Es uno de los iniciales de Kanto." },
    { name: "Jigglypuff", description: "Este Pokémon tiene la capacidad de cantar y hacer que los demás se duerman. Es conocido por su voz." },
    // Añade más Pokémon aquí
  ]

  // Elegir un Pokémon aleatorio
  let randomPokemon = pokemons[Math.floor(Math.random() * pokemons.length)]
  
  // Guardamos el juego en curso
  pokemonGame[m.sender] = { correctAnswer: randomPokemon.name, description: randomPokemon.description, attempts: 3 }

  // Enviamos la descripción del Pokémon
  conn.sendMessage(m.chat, `🚩 ¡Hola @${name}! ¿Puedes adivinar el nombre de este Pokémon? \n\nDescripción: *${randomPokemon.description}* \n\nTienes 3 intentos para adivinar. ¡Buena suerte!`, m, { mentions: [m.sender] })
  
  // Función para manejar la respuesta del usuario
  const checkAnswer = async (msg) => {
    if (msg.sender !== m.sender) return // Solo respondemos al jugador que comenzó el juego

    // Validamos la respuesta
    if (msg.body.startsWith('!respuesta')) {
      const userAnswer = msg.body.split(' ')[1].toLowerCase() // Extraemos la respuesta del mensaje

      if (!userAnswer) {
        return conn.sendMessage(m.chat, "🚩 Por favor, ingresa el nombre del Pokémon como respuesta (por ejemplo: !respuesta Pikachu).", m)
      }

      // Comprobamos si la respuesta es correcta
      if (userAnswer === pokemonGame[m.sender].correctAnswer.toLowerCase()) {
        conn.sendMessage(m.chat, `🎉 ¡Felicidades @${name}! Adivinaste correctamente. Ganaste 50 XP.`, m, { mentions: [m.sender] })
        global.db.data.users[m.sender].exp += 50
        delete pokemonGame[m.sender]
      } else {
        pokemonGame[m.sender].attempts--
        if (pokemonGame[m.sender].attempts === 0) {
          conn.sendMessage(m.chat, `🚩 Lo siento @${name}, se te acabaron los intentos. El Pokémon era *${pokemonGame[m.sender].correctAnswer}*.`, m, { mentions: [m.sender] })
          delete pokemonGame[m.sender]
        } else {
          conn.sendMessage(m.chat, `🚩 Incorrecto, te quedan ${pokemonGame[m.sender].attempts} intentos. Intenta de nuevo.`, m, { mentions: [m.sender] })
        }
      }
    }
  }

  // Reemplaza este código con tu propia lógica para escuchar mensajes en tu bot.
  // Aquí tendrías que tener un mecanismo para recibir las respuestas de los usuarios,
  // como una función que verifica mensajes de entrada y la respuesta del usuario.
  // Este es solo un ejemplo de cómo manejar las respuestas, sin eventos como conn.on()
  conn.on('message', checkAnswer)
}

handler.command = ['pokemon', 'adivinarpokemon', 'pokemongame']
export default handler
