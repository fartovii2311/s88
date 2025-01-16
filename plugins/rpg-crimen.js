let cooldowns = {};

let handler = async (m, { conn, text, command, usedPrefix }) => {
  let users = global.db?.data?.users || {};
  let senderId = m.sender;
  let senderName = conn.getName(senderId);

  // Tiempo de espera
  let tiempoEspera = 5 * 60; // 5 minutos
  if (cooldowns[senderId] && Date.now() - cooldowns[senderId] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[senderId] + tiempoEspera * 1000 - Date.now()) / 1000));
    await conn.reply(
      m.chat,
      `🤍 Ya has cometido un crimen recientemente. Espera *⏱ ${tiempoRestante}* para intentar nuevamente.`,
      m,rcanal
    );
    return;
  }

  cooldowns[senderId] = Date.now();

  // Inicializar corazones si no existen
  users[senderId] = users[senderId] || { corazones: 0 };
  let senderCorazones = users[senderId].corazones;

  // Selección de usuario aleatorio
  let userKeys = Object.keys(users).filter((id) => id !== senderId);
  if (userKeys.length === 0) {
    await conn.reply(m.chat, "🤍 No hay otros usuarios disponibles para robar corazones.", m,rcanal);
    return;
  }

  let randomUserId = userKeys[Math.floor(Math.random() * userKeys.length)];
  users[randomUserId] = users[randomUserId] || { corazones: 0 };
  let randomUserCorazones = users[randomUserId].corazones;

  // Cantidades mínimas y máximas
  let minAmount = 15;
  let maxAmount = 50;

  // Generar resultado aleatorio
  let randomOption = Math.floor(Math.random() * 3);
  switch (randomOption) {
    case 0: // Éxito completo
      let amountTaken = Math.min(
        Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount,
        randomUserCorazones
      );
      users[senderId].corazones += amountTaken;
      users[randomUserId].corazones -= amountTaken;
      await conn.reply(
        m.chat,
        {
          text: `🤍 ¡Lograste cometer tu crimen con éxito! Robaste *${amountTaken} corazones* de @${randomUserId.split("@")[0]}.\n\n*+${amountTaken} corazones* han sido añadidos a ${senderName}.`,
          contextInfo: { mentionedJid: [randomUserId] },
        },
        m,rcanal
      );
      break;

    case 1: // Fracaso
      if (senderCorazones > 0) {
        let amountSubtracted = Math.min(
          Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount,
          senderCorazones
        );
        users[senderId].corazones -= amountSubtracted;
        await conn.reply(
          m.chat,
          `🤍 ¡Te atraparon! Perdiste *-${amountSubtracted} corazones*.`,
          m,rcanal
        );
      } else {
        await conn.reply(m.chat, "🤍 ¡Te atraparon, pero no tenías corazones para perder!", m,rcanal);
      }
      break;

    case 2: // Éxito parcial
      let smallAmountTaken = Math.min(
        Math.floor(Math.random() * (randomUserCorazones / 2 - minAmount + 1)) + minAmount,
        randomUserCorazones
      );
      users[senderId].corazones += smallAmountTaken;
      users[randomUserId].corazones -= smallAmountTaken;
      await conn.reply(
        m.chat,
        {
          text: `🤍 Lograste cometer el crimen, pero te descubrieron. Solo tomaste *${smallAmountTaken} corazones* de @${randomUserId.split("@")[0]}.\n\n*+${smallAmountTaken} corazones* han sido añadidos a ${senderName}.`,
          contextInfo: { mentionedJid: [randomUserId] },
        },
        m,rcanal
      );
      break;
  }

  global.db.write();
};

handler.tags = ["rpg"];
handler.help = ["crimen"];
handler.command = ["crimen", "crime"];
handler.register = true;
handler.group = true;

export default handler;

function segundosAHMS(segundos) {
  let horas = Math.floor(segundos / 3600);
  let minutos = Math.floor((segundos % 3600) / 60);
  let segundosRestantes = segundos % 60;
  return `${minutos} minutos y ${segundosRestantes} segundos`;
}
