let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]; // Obtener los datos del usuario
  
  // Si no existe el usuario en la base de datos, crear los datos iniciales
  if (!user) {
    user = global.db.data.users[m.sender] = {
      premium: false,
      premiumTime: 0,
      points: 0,  // Establece puntos para obtener Premium
    };
  }
  
  // Recompensa por completar una tarea o desafío
  if (m.text.startsWith('.ganoPremium')) {
    let puntosNecesarios = 1000; // Número de puntos necesarios para ganar Premium
    if (user.points >= puntosNecesarios) {
      // Si el usuario tiene suficientes puntos
      let tiempoPremium = 30 * 24 * 60 * 60 * 1000; // 30 días en milisegundos
      user.premium = true;
      user.premiumTime = new Date().getTime() + tiempoPremium; // Establecer el tiempo premium

      // Notificar al usuario
      await conn.reply(m.chat, `🎉 ¡Felicidades! Has ganado el estatus de *Premium* por 30 días.`, m);
    } else {
      // Si el usuario no tiene suficientes puntos
      await conn.reply(m.chat, `🚩 No tienes suficientes puntos para obtener Premium. Necesitas *${puntosNecesarios - user.points}* puntos más.`, m);
    }
  }
  
  // Comando para ver los puntos del usuario
  if (m.text.startsWith('.misPuntos')) {
    await conn.reply(m.chat, `🚩 Tienes *${user.points}* puntos.`, m);
  }

  // Comando para ver si el usuario tiene Premium activo
  if (m.text.startsWith('.premiumStatus')) {
    if (user.premium && new Date().getTime() < user.premiumTime) {
      let tiempoRestante = Math.floor((user.premiumTime - new Date().getTime()) / (1000 * 60 * 60 * 24)); // Calcular días restantes
      await conn.reply(m.chat, `🎉 ¡Tienes Premium activo por *${tiempoRestante}* días más!`, m);
    } else {
      await conn.reply(m.chat, `🚩 No tienes Premium activo. Usa el comando *.ganoPremium* para obtenerlo.`, m);
    }
  }
}

handler.help = ['ganoPremium', 'misPuntos', 'premiumStatus']; // Comandos disponibles
handler.tags = ['rpg']; // Categoría
handler.command = ['ganoPremium', 'misPuntos', 'premiumStatus']; // Nombres de los comandos
handler.register = true; // Registrar el handler

export default handler;
