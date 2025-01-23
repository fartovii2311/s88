let cooldowns = {}

let handler = async (m, { conn, command, usedPrefix }) => {
  let users = global.db.data.users
  let senderId = m.sender
  let senderName = conn.getName(senderId)

  if (!users[senderId]) {
    users[senderId] = { Monedas: 0 }
  }

  let senderMonedas = users[senderId].Monedas || 0
  let tiempoEspera = 30 * 24 * 60 * 60 * 1000 

  if (cooldowns[senderId] && Date.now() - cooldowns[senderId] < tiempoEspera) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[senderId] + tiempoEspera - Date.now()) / 1000))
    m.reply(`🪙 Ya has recibido tu bono social este mes, espera *⏱ ${tiempoRestante}* para recibirlo nuevamente.`)
    return
  }

  let bono = 200
  users[senderId].Monedas += bono

  cooldowns[senderId] = Date.now()

  conn.reply(m.chat, `🪙 ¡Has recibido un bono social de *200 🪙 Monedas*! Ahora tienes *${users[senderId].Monedas} 🪙 Monedas* en tu cuenta.`, m)

  global.db.write()
}

handler.tags = ['rpg']
handler.help = ['bonosocial']
handler.command = ['bonosocial']
handler.register = true
handler.group = true

export default handler

function segundosAHMS(segundos) {
  let horas = Math.floor(segundos / 3600)
  let minutos = Math.floor((segundos % 3600) / 60)
  let segundosRestantes = segundos % 60
  return `${minutos} minutos y ${segundosRestantes} segundos`
}
