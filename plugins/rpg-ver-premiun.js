
let handler = async (m, { conn }) => {
  // Obtener los datos del usuario
  let user = global.db.data.users[m.sender];

  // Si el usuario no existe, inicializar los datos
  if (!user) {
    user = global.db.data.users[m.sender] = {
      premium: false,
      premiumTime: 0,
      points: 0,
    };
  }

  // Definir los puntos necesarios para ganar Premium
  const puntosNecesarios = 1000;

  // Comando para verificar los puntos del usuario
  if (m.text === '.misPuntos') {
    await conn.reply(m.chat, `🚩 Tienes *${user.points}* puntos.`, m);
    return; // Detener la ejecución para no continuar con otros comandos
  }

  // Comando para ganar Premium si se alcanzan los puntos necesarios
  if (m.text === '.ganoPremium') {
    if (user.points >= puntosNecesarios) {
      const tiempoPremium = 30 * 24 * 60 * 60 * 1000; // 30 días en milisegundos
      user.premium = true;
      user.premiumTime = Date.now() + tiempoPremium; // Establecer la fecha de expiración del Premium

      await conn.reply(m.chat, `🎉 ¡Felicidades! Has ganado *Premium* por 30 días.`, m);
    } else {
      await conn.reply(m.chat, `🚩 No tienes suficientes puntos. Necesitas *${puntosNecesarios - user.points}* puntos más para obtener Premium.`, m);
    }
    return; // Detener la ejecución para no continuar con otros comandos
  }

  // Comando para ganar puntos (para pruebas)
  if (m.text === '.ganarPuntos') {
    user.points += 100; // Otorgar 100 puntos al usuario
    await conn.reply(m.chat, `🚩 ¡Has ganado 100 puntos! Ahora tienes *${user.points}* puntos.`, m);
    return; // Detener la ejecución para no continuar con otros comandos
  }

  // Comando para ver el estado del Premium
  if (m.text === '.premiumStatus') {
    if (user.premium && Date.now() < user.premiumTime) {
      const tiempoRestante = Math.floor((user.premiumTime - Date.now()) / (1000 * 60 * 60 * 24)); // Días restantes
      await conn.reply(m.chat, `🎉 ¡Tienes Premium activo por *${tiempoRestante}* días más!`, m);
    } else {
      await conn.reply(m.chat, `🚩 No tienes Premium activo. Usa el comando *.ganoPremium* para obtenerlo.`, m);
    }
  }
};

handler.help = ['ganoPremium', 'misPuntos', 'premiumStatus', 'ganarPuntos']; // Comandos disponibles
handler.tags = ['rpg']; // Categoría
handler.command = ['ganoPremium', 'misPuntos', 'premiumStatus', 'ganarPuntos']; // Nombres de los comandos
handler.register = true; // Registrar el handler

export default handler;
