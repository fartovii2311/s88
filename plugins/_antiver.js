handler.before = async function (m, { conn, isAdmin, isBotAdmin }) {
  const chat = global.db.data.chats[m.chat]; 

  if (chat.antiver && m.message?.viewOnceMessage) {
    const msg = m.message.viewOnceMessage.message;
    const type = Object.keys(msg)[0];

    try {
      // Procesa solo imágenes o videos
      if (['imageMessage', 'videoMessage'].includes(type)) {
        const mediaType = type === 'imageMessage' ? 'image' : 'video';
        const media = await downloadContentFromMessage(msg[type], mediaType);

        let buffer = Buffer.from([]);
        for await (const chunk of media) {
          buffer = Buffer.concat([buffer, chunk]);
        }

        // Envía la imagen o video recuperado
        if (type === 'imageMessage') {
          await conn.sendMessage(
            m.chat,
            {
              image: buffer,
              caption: `🚩 *Anti-ViewOnce activado*. Contenido recuperado.`,
              mentions: [m.sender],
            },
            { quoted: m }
          );
        } else if (type === 'videoMessage') {
          await conn.sendMessage(
            m.chat,
            {
              video: buffer,
              caption: `🚩 *Anti-ViewOnce activado*. Contenido recuperado.`,
              mentions: [m.sender],
            },
            { quoted: m }
          );
        }
      }

      if (isBotAdmin) {
        await conn.sendMessage(m.chat, { delete: m.key });
      }
    } catch (error) {
      console.error('Error procesando Anti-ViewOnce:', error);
      await conn.reply(
        m.chat,
        `🚩 Hubo un error al recuperar el contenido ViewOnce. Por favor, inténtalo de nuevo.`,
        m
      );
    }

    // Detiene el manejo de este mensaje
    return false;
  }

  return true;
};
