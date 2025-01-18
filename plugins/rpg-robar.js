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

  if (sendercorazones <= 0) {
    let groupParticipants = m.isGroup ? await conn.groupMetadata(m.chat).then(group => group.participants) : []
    // Filtramos a los usuarios que tienen corazones mayores que 0
    let targetUserId = groupParticipants.find(participant => users[participant.id] && users[participant.id].corazones > 0)?.id

    if (!targetUserId) {
      m.reply(`🤍 No hay usuarios con corazones para robar en este grupo.`)
      return
    }

    let amountTaken = Math.floor(Math.random() * (50 - 15 + 1)) + 15
    users[targetUserId].corazones -= amountTaken
    users[senderId].corazones += amountTaken
    conn.sendMessage(m.chat, {
      text: `🤍 No tenías corazones, así que robaste *${amountTaken} 🤍 corazones* de @${targetUserId.split("@")[0]}. Se suman *+${amountTaken} 🤍 corazones* a ${senderName}.`,
      contextInfo: { 
        mentionedJid: [targetUserId],
      }
    }, { quoted: m })
    global.db.write()
    return
  }

  let groupParticipants = m.isGroup ? await conn.groupMetadata(m.chat).then(group => group.participants) : []
  // Filtrar solo a los participantes con corazones > 0
  let validParticipants = groupParticipants.filter(participant => users[participant.id] && users[participant.id].corazones > 0)

  if (validParticipants.length === 0) {
    m.reply(`🤍 No hay usuarios con corazones para robar en este grupo.`)
    return
  }

  let randomUserId = validParticipants[Math.floor(Math.random() * validParticipants.length)].id

  while (randomUserId === senderId) {
    randomUserId = validParticipants[Math.floor(Math.random() * validParticipants.length)].id
  }

  // Verificar que el usuario aleatorio tiene el objeto 'corazones'
  if (!users[randomUserId]) {
    users[randomUserId] = { corazones: 0 }
  }

  let randomUsercorazones = users[randomUserId].corazones || 0

  let minAmount = 15
  let maxAmount = 50

  let amountTaken = Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount

  let randomOption = Math.floor(Math.random() * 3)

  switch (randomOption) {
  case 0:
    // Si el robo fue exitoso, robar los corazones
    users[senderId].corazones += amountTaken
    users[randomUserId].corazones -= amountTaken
    conn.sendMessage(m.chat, {
      text: `🤍¡Has robado con éxito! Robaste *${amountTaken} 🤍 corazones* a @${randomUserId.split("@")[0]}\n\nSe suman *+${amountTaken} 🤍 corazones* a ${senderName}.`,
      contextInfo: { 
        mentionedJid: [randomUserId],
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
    let smallAmountTaken = Math.min(Math.floor(Math.random() * (randomUsercorazones / 2 - minAmount + 1)) + minAmount, maxAmount)
    users[senderId].corazones += smallAmountTaken
    users[randomUserId].corazones -= smallAmountTaken
    conn.sendMessage(m.chat, {
      text: `🤍 Lograste robar algunos corazones, pero no completamente. Tomaste *${smallAmountTaken} 🤍 corazones* de @${randomUserId.split("@")[0]}\n\nSe suman *+${smallAmountTaken} 🤍 corazones* a ${senderName}.`,
      contextInfo: { 
        mentionedJid: [randomUserId],
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
