let cooldowns = {}

let handler = async (m, { conn, text, command, usedPrefix }) => {
  let users = global.db.data.users
  let senderId = m.sender
  let senderName = conn.getName(senderId)

  let tiempoEspera = 30 * 60 // 30 minutos en segundos
  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000))
    m.reply(`🪙 Ya has robado Monedas recientemente, espera *⏱ ${tiempoRestante}* para hacer tu próximo robo.`)
    return
  }

  cooldowns[m.sender] = Date.now()

  if (!users[senderId]) {
    users[senderId] = { Monedas: 0 }
  }

  let senderMonedas = users[senderId].Monedas || 0

  let targetUserId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : null

  if (!targetUserId) {
    if (senderMonedas <= 0) {
      let groupParticipants = m.isGroup ? await conn.groupMetadata(m.chat).then(group => group.participants) : []
      targetUserId = groupParticipants.find(participant => users[participant.id] && users[participant.id].Monedas > 0)?.id

      if (!targetUserId) {
        m.reply(`🪙 No hay usuarios con Monedas para robar en este grupo.`)
        return
      }
    }
  }

  if (targetUserId === senderId) {
    m.reply("🪙 No puedes robar Monedas a ti mismo.")
    return
  }

  if (!users[targetUserId]) {
    users[targetUserId] = { Monedas: 0 }
  }

  let targetUserMonedas = users[targetUserId].Monedas || 0

  let minAmount = 15
  let maxAmount = 50

  let amountTaken = Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount

  let randomOption = Math.floor(Math.random() * 3)

  switch (randomOption) {
    case 0:
      if (targetUserMonedas >= amountTaken) {
        users[senderId].Monedas += amountTaken
        users[targetUserId].Monedas -= amountTaken
        conn.sendMessage(m.chat, {
          text: `🪙 ¡Has robado con éxito! Robaste *${amountTaken} 🪙 Monedas* a @${targetUserId?.split("@")[0]}\n\nSe suman *+${amountTaken} 🪙 Monedas* a ${senderName}.`,
          contextInfo: { 
            mentionedJid: [targetUserId],
          }
        }, { quoted: m })
      } else {
        m.reply(`🪙 El usuario no tiene suficientes Monedas para robar.`)
      }
      break

    case 1:
      let amountSubtracted = Math.min(Math.floor(Math.random() * (senderMonedas - minAmount + 1)) + minAmount, maxAmount)
      users[senderId].Monedas -= amountSubtracted
      conn.reply(m.chat, `🪙 No fuiste cuidadoso y te atraparon mientras intentabas robar Monedas, se restaron *-${amountSubtracted} 🪙 Monedas* a ${senderName}.`, m)
      break

    case 2:
      let smallAmountTaken = Math.min(Math.floor(Math.random() * (targetUserMonedas / 2 - minAmount + 1)) + minAmount, maxAmount)
      users[senderId].Monedas += smallAmountTaken
      users[targetUserId].Monedas -= smallAmountTaken
      conn.sendMessage(m.chat, {
        text: `🪙 Lograste robar algunas Monedas, pero no completamente. Tomaste *${smallAmountTaken} 🪙 Monedas* de @${targetUserId?.split("@")[0]}\n\nSe suman *+${smallAmountTaken} 🪙 Monedas* a ${senderName}.`,
        contextInfo: { 
          mentionedJid: [targetUserId],
        }
      }, { quoted: m })
      break
  }

  global.db.write()
}

handler.tags = ['rpg']
handler.help = ['robar']
handler.command = ['robarmonedas', 'stealmoney', 'robar']
handler.register = true
handler.group = true

export default handler

function segundosAHMS(segundos) {
  let horas = Math.floor(segundos / 3600)
  let minutos = Math.floor((segundos % 3600) / 60)
  let segundosRestantes = segundos % 60
  return `${minutos} minutos y ${segundosRestantes} segundos`
}
