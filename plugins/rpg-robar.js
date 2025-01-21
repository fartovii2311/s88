let cooldowns = {}

let handler = async (m, { conn, text, command, usedPrefix }) => {
  let users = global.db.data.users
  let senderId = m.sender
  let senderName = conn.getName(senderId)

  let tiempoEspera = 5 * 60  // 5 minutos
  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000))
    m.reply(`🤍 Ya has robado corazones recientemente, espera *⏱ ${tiempoRestante}* para hacer tu próximo robo.`)
    return
  }

  cooldowns[m.sender] = Date.now()

  // Verificar que el usuario tiene el objeto 'corazones' en su base de datos
  if (!users[senderId]) {
    users[senderId] = { corazones: 0 }
  }

  let sendercorazones = users[senderId].corazones || 0

  // Verificar si se mencionó un usuario
  let targetUserId = m.mentionedJid[0]
  
  if (!targetUserId) {
    if (sendercorazones <= 0) {
      let groupParticipants = m.isGroup ? await conn.groupMetadata(m.chat).then(group => group.participants) : []
      // Filtramos a los usuarios que tienen corazones mayores que 0
      targetUserId = groupParticipants.find(participant => users[participant.id] && users[participant.id].corazones > 0)?.id

      if (!targetUserId) {
        m.reply(`🤍 No hay usuarios con corazones para robar en este grupo.`)
        return
      }
    }
  }

  // Si el objetivo es el mismo que el remitente, dar error
  if (targetUserId === senderId) {
    m.reply("🤍 No puedes robar corazones a ti mismo.")
    return
  }

  // Verificar que el usuario tiene el objeto 'corazones'
  if (!users[targetUserId]) {
    users[targetUserId] = { corazones: 0 }
  }

  let targetUsercorazones = users[targetUserId].corazones || 0

  let minAmount = 15
  let maxAmount = 50

  let amountTaken = Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount

  let randomOption = Math.floor(Math.random() * 3)

  switch (randomOption) {
  case 0:
    // Si el robo fue exitoso, robar los corazones
    users[senderId].corazones += amountTaken
    users[targetUserId].corazones -= amountTaken
    conn.sendMessage(m.chat, {
      text: `🤍¡Has robado con éxito! Robaste *${amountTaken} 🤍 corazones* a @${targetUserId.split("@")[0]}\n\nSe suman *+${amountTaken} 🤍 corazones* a ${senderName}.`,
      contextInfo: { 
        mentionedJid: [targetUserId],
      }
    }, { quoted: m })
    break

  case 1:
    let amountSubtracted = Math.min(Math.floor(Math.random() * (sendercorazones - minAmount + 1)) + minAmount, maxAmount)
    users[senderId].corazones -= amountSubtracted
    conn.reply(m.chat, `🤍 No fuiste cuidadoso y te atraparon mientras intentabas robar corazones, se restaron *-${amountSubtracted} 🤍 corazones* a ${senderName}.`, m)
    break

  case 2:
    // Si el robo es parcialmente exitoso
    let smallAmountTaken = Math.min(Math.floor(Math.random() * (targetUsercorazones / 2 - minAmount + 1)) + minAmount, maxAmount)
    users[senderId].corazones += smallAmountTaken
    users[targetUserId].corazones -= smallAmountTaken
    conn.sendMessage(m.chat, {
      text: `🤍 Lograste robar algunos corazones, pero no completamente. Tomaste *${smallAmountTaken} 🤍 corazones* de @${targetUserId.split("@")[0]}\n\nSe suman *+${smallAmountTaken} 🤍 corazones* a ${senderName}.`,
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
handler.command = ['robarcorazones', 'stealhearts', 'robar', 'rb']
handler.register = true
handler.group = true

export default handler

function segundosAHMS(segundos) {
  let horas = Math.floor(segundos / 3600)
  let minutos = Math.floor((segundos % 3600) / 60)
  let segundosRestantes = segundos % 60
  return `${minutos} minutos y ${segundosRestantes} segundos`
}
