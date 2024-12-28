let guessGame = {}

let handler = async (m, { conn }) => {
  let name = conn.getName(m.sender)
  
  if (guessGame[m.sender]) {
    return conn.reply(m.chat, `🚩 ${name}, ya estás en una partida de adivinanza! Espera que termine para jugar otra.`, m)
  }

  const numeroSecreto = Math.floor(Math.random() * 100) + 1 // Genera un número entre 1 y 100
  guessGame[m.sender] = { numeroSecreto, intentos: 5 }

  // Mencionar al usuario y pedirle que ingrese su adivinanza
  conn.reply(m.chat, `🚩 Hola @${name}, he elegido un número entre 1 y 100. Tienes 5 intentos para adivinarlo. ¡Buena suerte!`, m, { mentions: [m.sender] })

  // Ahora esperamos una respuesta del usuario con el número que intenta adivinar
  const msgHandler = async (msg) => {
    if (msg.body.startsWith('!adivinar')) { // Asegúrate de que el mensaje sea un intento de adivinanza
      const userGuess = parseInt(msg.body.split(' ')[1]) // Extrae el número del mensaje
      if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        return conn.reply(m.chat, "🚩 Por favor, ingresa un número válido entre 1 y 100.", m)
      }

      // Verifica si adivinó correctamente
      if (userGuess === guessGame[m.sender].numeroSecreto) {
        conn.reply(m.chat, `🎉 ¡Felicidades @${name}! Adivinaste el número correctamente. Ganaste 50 XP.`, m, { mentions: [m.sender] })
        global.db.data.users[m.sender].exp += 50
        delete guessGame[m.sender]
      } else {
        guessGame[m.sender].intentos--
        if (guessGame[m.sender].intentos === 0) {
          conn.reply(m.chat, `🚩 Lo siento @${name}, se te acabaron los intentos. El número era ${guessGame[m.sender].numeroSecreto}.`, m, { mentions: [m.sender] })
          delete guessGame[m.sender]
        } else {
          conn.reply(m.chat, `🚩 Incorrecto, te quedan ${guessGame[m.sender].intentos} intentos. Intenta de nuevo.`, m, { mentions: [m.sender] })
        }
      }
    }
  }

  // Este es solo un ejemplo de cómo podrías registrar el mensaje
  // Aquí podrías implementar un manejador adecuado de los mensajes del usuario
  conn.onMessage(msgHandler)
}

handler.command = ['adivinar']
export default handler
