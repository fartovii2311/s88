let mathGame = {}

let handler = async (m, { conn, rcanal }) => {
  let name = conn.getName(m.sender)
  
  if (mathGame[m.sender]) {
    return conn.sendMessage(m.chat, { text: `🚩 ${name}, ya estás en una partida de matemáticas! Espera que termine para jugar otra.` }, { quoted: m, rcanal })
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
  conn.sendMessage(
    m.chat, 
    { 
      text: `🚩 Hola @${name}, resuelve el siguiente problema:\n\n¿Cuánto es *${num1} ${operation} ${num2}*?\nTienes 3 intentos. ¡Buena suerte!`, 
      mentions: [m.sender] 
    }, 
    { quoted: m, rcanal }
  )
}

handler.onMessage = async (m, { conn, rcanal }) => {
  if (!mathGame[m.sender]) return // Si no hay juego en curso, ignorar

  let game = mathGame[m.sender]
  let userAnswer = parseInt(m.text) // Intentamos parsear la respuesta

  if (isNaN(userAnswer)) {
    return conn.sendMessage(m.chat, { text: "🚩 Por favor, responde con un número válido." }, { quoted: m, rcanal })
  }

  // Validamos la respuesta
  if (userAnswer === game.correctAnswer) {
    conn.sendMessage(
      m.chat, 
      { 
        text: `🎉 ¡Felicidades @${conn.getName(m.sender)}! Adivinaste correctamente. Ganaste 50 XP.`,
        mentions: [m.sender] 
      }, 
      { quoted: m, rcanal }
    )
    global.db.data.users[m.sender].exp += 50
    delete mathGame[m.sender]
  } else {
    game.attempts--
    if (game.attempts === 0) {
      conn.sendMessage(
        m.chat, 
        { 
          text: `🚩 Lo siento @${conn.getName(m.sender)}, se te acabaron los intentos. La respuesta correcta era ${game.correctAnswer}.`, 
          mentions: [m.sender] 
        }, 
        { quoted: m, rcanal }
      )
      delete mathGame[m.sender]
    } else {
      conn.sendMessage(
        m.chat, 
        { 
          text: `🚩 Incorrecto, te quedan ${game.attempts} intentos. Intenta de nuevo.`, 
          mentions: [m.sender] 
        }, 
        { quoted: m, rcanal }
      )
    }
  }
}

handler.help = ["mate"]
handler.command = ['mate', 'matematica', 'sumar', 'restar']
handler.tags = ['rpg']
handler.register = true 

export default handler
