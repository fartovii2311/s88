let cooldowns = {}

let handler = async (m, { conn, text, command }) => {
  let users = global.db.data.users
  let senderId = m.sender
  let senderName = conn.getName(senderId)

  // Tiempo de enfriamiento (en segundos)
  let tiempoEspera = 5 * 60

  // Verificar si el jugador está en tiempo de enfriamiento
  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000))
    m.reply(`🏴‍☠️ Ya cazaste tesoros recientemente. Espera *${tiempoRestante}* para intentar nuevamente.`)
    return
  }

  // Actualizar el tiempo de enfriamiento
  cooldowns[m.sender] = Date.now()

  if (!users[senderId]) {
    users[senderId] = { Monedas: 0 }
  }

  let senderMonedas = users[senderId].Monedas || 0

  // Generar un evento aleatorio de caza de tesoros
  let eventos = [
    '¡Has encontrado un cofre con 50 🪙 Monedas!',
    '¡Oh no! El tesoro estaba vacío...',
    '¡Increíble! Encontraste un cofre con 200 🪙 Monedas.',
    '¡Sorpresa! Encontraste un tesoro secreto con 100 🪙 Monedas.'
  ]
  let eventoAleatorio = eventos[Math.floor(Math.random() * eventos.length)]

  let recompensa = 0
  switch (eventoAleatorio) {
    case '¡Has encontrado un cofre con 50 🪙 Monedas!':
      recompensa = 50
      break
    case '¡Oh no! El tesoro estaba vacío...':
      recompensa = 0
      break
    case '¡Increíble! Encontraste un cofre con 200 🪙 Monedas.':
      recompensa = 200
      break
    case '¡Sorpresa! Encontraste un tesoro secreto con 100 🪙 Monedas.':
      recompensa = 100
      break
  }

  // Añadir la recompensa al jugador
  users[senderId].Monedas += recompensa

  // Responder al jugador con el resultado de la caza
  if (recompensa > 0) {
    m.reply(`🏴‍☠️ ¡Felicidades! Has cazado un tesoro y ${eventoAleatorio} Ahora tienes un total de *${users[senderId].Monedas} 🪙 Monedas*.`)
  } else {
    m.reply(`🏴‍☠️ ¡Oh no! Has cazado un tesoro y ${eventoAleatorio}. No ganaste Monedas esta vez. ¡Intenta nuevamente!`)
  }

  global.db.write()
}

handler.tags = ['rpg']
handler.help = ['cazar']
handler.command = ['cazar', 'hunt']
handler.register = true
handler.group = true

export default handler

function segundosAHMS(segundos) {
  let horas = Math.floor(segundos / 3600)
  let minutos = Math.floor((segundos % 3600) / 60)
  let segundosRestantes = segundos % 60
  return `${minutos} minutos y ${segundosRestantes} segundos`
}
