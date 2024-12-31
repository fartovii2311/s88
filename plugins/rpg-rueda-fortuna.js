let cooldowns = {}

let handler = async (m, { conn, text, command }) => {
  let users = global.db.data.users
  let senderId = m.sender
  let senderName = conn.getName(senderId)

  let tiempoEspera = 60 * 60  // Espera de 1 hora entre giros

  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000))
    return m.reply(`🎰 Espera *${tiempoRestante}* para girar la rueda nuevamente.`,m,rcanal)
  }

  cooldowns[m.sender] = Date.now()

  let resultados = [
    '🤍 100 corazones blancos', 
    '🎁 1 Skin', 
    '🤍 50 corazones blancos', 
    '✨ 30 XP', 
    '🚫 Nada',
    '🌟 Premium por 1 hora'
  ]
  let resultado = resultados[Math.floor(Math.random() * resultados.length)]

  switch (resultado) {
    case '🤍 100 corazones blancos':
      users[senderId].corazones = users[senderId].corazones || 0
      users[senderId].corazones += 100
      return conn.reply(m.chat, `🎰 ¡Felicidades, ${senderName}! Has ganado *100 🤍 corazones blancos*.`, m,rcanal)
    case '🎁 1 Skin':
      users[senderId].skins = users[senderId].skins || []
      users[senderId].skins.push('Skin Especial')
      return conn.reply(m.chat, `🎰 ¡Felicidades, ${senderName}! Has ganado una *Skin Especial*!`, m,rcanal)
    case '🤍 50 corazones blancos':
      users[senderId].corazones = users[senderId].corazones || 0
      users[senderId].corazones += 50
      return conn.reply(m.chat, `🎰 ¡Felicidades, ${senderName}! Has ganado *50 🤍 corazones blancos*.`, m,rcanal)
    case '✨ 30 XP':
      users[senderId].xp = users[senderId].xp || 0
      users[senderId].xp += 30
      return conn.reply(m.chat, `🎰 ¡Felicidades, ${senderName}! Has ganado *30 ✨ XP*.`, m,rcanal)
    case '🚫 Nada':
      return conn.reply(m.chat, `🎰 Lo siento, ${senderName}, no ganaste nada esta vez. ¡Intenta de nuevo más tarde!`, m,rcanal)
    case '🌟 Premium por 1 hora':
      users[senderId].premium = true
      users[senderId].premiumTime = Date.now() + 1 * 60 * 60 * 1000  // 1 hora en milisegundos
      return conn.reply(m.chat, `🎰 ¡Felicidades, ${senderName}! Has ganado *Premium por 1 hora*!`, m,rcanal)
  }
}

handler.command = ['rueda', 'wheel']
handler.tags = ['rpg'];
handler.help = ['rueda']
handler.register = true

export default handler

function segundosAHMS(segundos) {
  let horas = Math.floor(segundos / 3600)
  let minutos = Math.floor((segundos % 3600) / 60)
  let segundosRestantes = segundos % 60
  return `${minutos} minutos y ${segundosRestantes} segundos`
}
