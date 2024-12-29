let mathGame = {}

let handler = async (m, { conn }) => {
  let name = conn.getName(m.sender)
  
  if (mathGame[m.sender]) {
    return conn.sendMessage(m.chat, `🚩 ${name}, ya estás en una partida de matemáticas! Espera que termine para jugar otra.`, m,rcanal)
  }

  // Generamos un problema matemático aleatorio (suma o resta)
  let num1 = Math.floor(Math.random() * 100) + 1
  let num2 = Math.floor(Math.random() * 100) + 1
  let isAddition = Math.random() > 0.5 // 50% de probabilidad de ser suma o resta
  let correctAnswer = isAddition ? num1 + num2 : num1 - num2
  
  // Guardamos el juego en curso
  mathGame[m.sender] = { correctAnswer, isAddition, num1, num2, attempts: 3 }

  // Enviamos el problema al usuario
  let operation = isAddition ? 'suma' : 'resta'
  conn.sendMessage(m.chat, `🚩 Hola @${name}, resuelve el siguiente problema: ¿Cuánto es *${num1} ${operation} ${num2}*? Tienes 3 intentos. ¡Buena suerte!`, m,rcanal { mentions: [m.sender] })
  
  // Función para manejar la respuesta del usuario
  const checkAnswer = async (msg) => {
    if (msg.sender !== m.sender) return // Solo respondemos al jugador que comenzó el juego

    // Validamos la respuesta
    if (msg.body.startsWith('!respuesta')) {
      const userAnswer = parseInt(msg.body.split(' ')[1]) // Extraemos la respuesta del mensaje

      if (isNaN(userAnswer)) {
        return conn.sendMessage(m.chat, "🚩 Por favor, ingresa un número válido como respuesta.", m)
      }

      // Comprobamos si la respuesta es correcta
      if (userAnswer === mathGame[m.sender].correctAnswer) {
        conn.sendMessage(m.chat, `🎉 ¡Felicidades @${name}! Adivinaste correctamente. Ganaste 50 XP.`, m, { mentions: [m.sender] })
        global.db.data.users[m.sender].exp += 50
        delete mathGame[m.sender]
      } else {
        mathGame[m.sender].attempts--
        if (mathGame[m.sender].attempts === 0) {
          conn.sendMessage(m.chat, `🚩 Lo siento @${name}, se te acabaron los intentos. La respuesta correcta era ${mathGame[m.sender].correctAnswer}.`, m, { mentions: [m.sender] })
          delete mathGame[m.sender]
        } else {
          conn.sendMessage(m.chat, `🚩 Incorrecto, te quedan ${mathGame[m.sender].attempts} intentos. Intenta de nuevo.`, m, { mentions: [m.sender] })
        }
      }
    }
  }

  // Reemplaza este código con tu propia lógica para escuchar mensajes en tu bot.
  // Aquí tendrías que tener un mecanismo para recibir las respuestas de los usuarios,
  // como una función que verifica mensajes de entrada y la respuesta del usuario.
  // Este es solo un ejemplo de cómo manejar las respuestas, sin eventos como conn.on()
  // Deberás revisar los mensajes en el ciclo principal de tu bot.
  conn.on('message', checkAnswer)
}

handler.help = ["mate"]
handler.command = ['mate','matematica', 'sumar', 'restar']
handler.tags = ['rpg']
handler.register = true 
export default handler
