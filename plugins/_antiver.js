handler.before = async function (m, { conn, isAdmin, isBotAdmin }) {
  const chat = global.db.data.chats[m.chat];
  
  if (chat.antiver && m.message?.viewOnceMessage) {
    const msg = m.message.viewOnceMessage.message;
    const type = Object.keys(msg)[0];

    if (['imageMessage', 'videoMessage'].includes(type)) {
      const media = await downloadContentFromMessage(msg[type], type === 'imageMessage' ? 'image' : 'video');
      let buffer = Buffer.from([]);

      for await (const chunk of media) {
        buffer = Buffer.concat([buffer, chunk]);
      }

      if (type === 'imageMessage') {
        await conn.sendMessage(
          m.chat,
          { image: buffer, caption: `🚩 *Anti-ViewOnce activado*. Contenido recuperado.`, mentions: [m.sender] },
          { quoted: m }
        );
      } else if (type === 'videoMessage') {
        await conn.sendMessage(
          m.chat,
          { video: buffer, caption: `🚩 *Anti-ViewOnce activado*. Contenido recuperado.`, mentions: [m.sender] },
          { quoted: m }
        );
      }
    }

    if (isBotAdmin) {
      await conn.sendMessage(m.chat, { delete: m.key });
    }

    return false;
  }

  return true;
};
