let cooldowns = {}

let handler = async (m, { conn, text, command }) => {
  let users = global.db.data.users
  let senderId = m.sender
  let senderName = conn.getName(senderId)
  
  let tiempoEspera = 5 * 60

  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000))
    m.reply(`⛏️ Ya has cavado recientemente. Espera ⏳ *${tiempoRestante}* antes de cavar de nuevo.`)
    return
  }

  cooldowns[m.sender] = Date.now()

  if (!users[senderId]) {
    users[senderId] = { Monedas: 0 }
  }

  let senderMonedas = users[senderId].Monedas || 0

  let minMonedas = 5
  let maxMonedas = 20
  let monedasEncontradas = Math.floor(Math.random() * (maxMonedas - minMonedas + 1)) + minMonedas

  users[senderId].Monedas += monedasEncontradas

  conn.reply(m.chat, `⛏️ ¡Cavaste profundo y encontraste *${monedasEncontradas} 🪙 Monedas*! Ahora tienes un total de *${users[senderId].Monedas} 🪙 Monedas*.`, m)

  global.db.write()
}

handler.tags = ['rpg']
handler.help = ['cavar']
handler.command = ['cavar', 'dig']
handler.register = true
handler.group = true

export default handler

function segundosAHMS(segundos) {
  let minutos = Math.floor(segundos / 60)
  let segundosRestantes = segundos % 60
  return `${minutos} minutos y ${segundosRestantes} segundos`
}
