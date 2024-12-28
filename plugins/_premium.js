let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]; // Obtener los datos del usuario
  
  // Si no existe el usuario en la base de datos, crear los datos iniciales
  if (!user) {
    user = global.db.data.users[m.sender] = {
      premium: false,  // Estado de Premium
      premiumTime: 0,  // Tiempo de Premium
      points: 0,  // Puntos del usuario
    };
  }

  // Comando para verificar los puntos del usuario
  if (/^\.misPuntos$/i.test(m.text)) {
    await conn.reply(m.chat, `🚩 Tienes *${user.points}* puntos.`, m);
  }
  
  // Comando para ganar Premium al alcanzar puntos
  if (/^\.ganoPremium$/i.test(m.text)) {
    let puntosNecesarios = 1000; // Puntos necesarios para obtener Premium
    
    // Si el usuario tiene suficientes puntos
    if (user.points >= puntosNecesarios) {
      let tiempoPremium = 30 * 24 * 60 * 60 * 1000; // 30 días en milisegundos
      user.premium = true;
      user.premiumTime = new Date().getTime() + tiempoPremium; // Establecer el tiempo premium

      // Notificar al usuario que ha ganado Premium
      await conn.reply(m.chat, `🎉 ¡Felicidades! Has ganado el estatus de *Premium* por 30 días.`, m);
    } else {
      // Si el usuario no tiene suficientes puntos
      await conn.reply(m.chat, `🚩 No tienes suficientes puntos. Necesitas *${puntosNecesarios - user.points}* puntos más para obtener Premium.`, m);
    }
  }
  
  // Comando para aumentar puntos (solo por pruebas)
  if (/^\.ganarPuntos$/i.test(m.text)) {
    user.points += 100; // Otorgar 100 puntos al usuario como ejemplo
    await conn.reply(m.chat, `🚩 ¡Has ganado 100 puntos! Ahora tienes *${user.points}* puntos.`, m);
  }

  // Comando para ver si el usuario tiene Premium activo
  if (/^\.premiumStatus$/i.test(m.text)) {
    if (user.premium && new Date().getTime() < user.premiumTime) {
      let tiempoRestante = Math.floor((user.premiumTime - new Date().getTime()) / (1000 * 60 * 60 * 24)); // Calcular días restantes
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
