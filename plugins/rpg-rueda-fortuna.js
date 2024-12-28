let cooldowns = {}

let handler = async (m, { conn, text, command }) => {
  let users = global.db.data.users
  let senderId = m.sender
  let senderName = conn.getName(senderId)

  let tiempoEspera = 30 * 60  // Espera de 30 minutos entre giros
  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000))
    m.reply(`🎰 Espera *${tiempoRestante}* para girar la rueda nuevamente.`)
    return
  }

  cooldowns[m.sender] = Date.now()

  // Simulación de rueda de la fortuna
  let resultados = ['💰 100 monedas', '🎁 1 Skin', '💎 50 diamantes', '🤍 5 corazones rojos', '🚫 Nada']
  let resultado = resultados[Math.floor(Math.random() * resultados.length)]

  switch (resultado) {
    case '💰 100 monedas':
      users[senderId].coins += 100
      return conn.reply(m.chat, `🎰 ¡Felicidades, ${senderName}! Has ganado *100 💰 monedas*.`, m)
    case '🎁 1 Skin':
      users[senderId].skins = users[senderId].skins || []
      users[senderId].skins.push('Skin Especial')
      return conn.reply(m.chat, `🎰 ¡Felicidades, ${senderName}! Has ganado una *Skin Especial*!`, m)
    case '💎 50 diamantes':
      users[senderId].diamonds = users[senderId].diamonds || 0
      users[senderId].diamonds += 50
      return conn.reply(m.chat, `🎰 ¡Felicidades, ${senderName}! Has ganado *50 💎 diamantes*.`, m)
    case '🤍 5 corazones rojos':
      users[senderId].hearts = users[senderId].hearts || 0
      users[senderId].hearts += 5
      return conn.reply(m.chat, `🎰 ¡Felicidades, ${senderName}! Has ganado *5 🤍 corazones rojos*.`, m)
    case '🚫 Nada':
      return conn.reply(m.chat, `🎰 Lo siento, ${senderName}, no ganaste nada esta vez. ¡Intenta de nuevo más tarde!`, m)
  }
}

handler.command = ['rueda', 'wheel']
handler.help = ['rueda']
handler.register = true

export default handler

function segundosAHMS(segundos) {
  let horas = Math.floor(segundos / 3600)
  let minutos = Math.floor((segundos % 3600) / 60)
  let segundosRestantes = segundos % 60
  return `${minutos} minutos y ${segundosRestantes} segundos`
}
