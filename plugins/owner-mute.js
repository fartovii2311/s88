import fetch from 'node-fetch';

// Define la función handler que maneja los comandos de muteo y desmuteo
const handler = async (message, { conn, command, text, isAdmin }) => {
  if (command === 'mute') {
    if (!isAdmin) {
      throw 'Solo un administrador puede ejecutar este comando';
    }

    // Obtiene el ID del usuario que se quiere mutar
    const userId = message.mentionedJid[0] || message.quoted.sender;

    // Verifica si el usuario que se quiere mutar es el creador del bot
    if (userId === global.owner[0][0] + '@s.whatsapp.net') {
      throw 'El creador del bot no puede ser mutado';
    }

    // Verifica si el usuario que se quiere mutar ya ha sido mutado
    const userData = global.db.data.users[userId];
    if (userData.muto === true) {
      throw 'Este usuario ya ha sido mutado';
    }

    // Muta al usuario y envía un mensaje de confirmación
    userData.muto = true;
    await conn.reply(message.chat, 'Tus mensajes serán eliminados', {
      mentions: [userId],
    });

    // Busca y elimina los mensajes del usuario mutado en el grupo
    const messages = await conn.fetchMessages(message.chat, {
      from: userId,
      limit: 100,
    });
    for (const msg of messages) {
      await conn.deleteMessage(message.chat, msg.key);
    }
  } else if (command === 'unmute') {
    // Verifica si el usuario que envió el comando es administrador
    if (!isAdmin) {
      throw 'Solo un administrador puede ejecutar este comando';
    }

    // Obtiene el ID del usuario que se quiere desmutar
    const userId = message.mentionedJid[0] || message.quoted.sender;

    // Verifica si el usuario que se quiere desmutar ya ha sido desmutado
    const userData = global.db.data.users[userId];
    if (userData.muto === false) {
      throw 'Este usuario no ha sido mutado';
    }

    // Desmuta al usuario y envía un mensaje de confirmación
    userData.muto = false;
    await conn.reply(message.chat, 'Tus mensajes no serán eliminados', {
      mentions: [userId],
    });
  }
};


handler.help = ['mute *<@user>*'];
handler.tags = ['group'];
handler.command = ['mute', 'unmute'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

// Exporta el handler
export default handler;
