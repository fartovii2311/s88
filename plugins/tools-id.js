const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    await conn.sendMessage(m.chat, { 
      text: `Uso: ${usedPrefix}${command} <link del grupo/canal>` 
    });
    return;
  }

  const link = args[0];
  const regexGroup = /https:\/\/chat\.whatsapp\.com\/([\w\d]+)/;
  const regexChannel = /https:\/\/whatsapp\.com\/channel\/([\w\d]+)/;

  let id;
  let isValid = false;

  if (regexGroup.test(link)) {
    const match = link.match(regexGroup);
    id = match[1];
    // Validar si el grupo realmente existe
    try {
      const groupInfo = await conn.groupMetadata(id);
      isValid = !!groupInfo;
    } catch (e) {
      isValid = false;
    }
  } else if (regexChannel.test(link)) {
    const match = link.match(regexChannel);
    id = `${match[1]}@newsletter`;
    // Validar si el canal realmente existe
    try {
      const channelInfo = await conn.query({
        tag: 'iq',
        attrs: { to: id, type: 'get', xmlns: 'w:biz' },
        content: [{ tag: 'newsletter', attrs: { xmlns: 'w:biz' } }],
      });
      isValid = !!channelInfo;
    } catch (e) {
      isValid = false;
    }
  } else {
    await conn.sendMessage(m.chat, { 
      text: 'Por favor, proporciona un enlace válido de grupo o canal de WhatsApp.' 
    });
    return;
  }

  if (!isValid) {
    await conn.sendMessage(m.chat, { 
      text: 'El grupo o canal no parece ser válido o no se pudo verificar.' 
    });
    return;
  }

  await conn.sendMessage(m.chat, { 
    text: `El ID del grupo/canal es: \n\n*${id}*` 
  });
};

handler.help = ['id'];
handler.tags = ['tools'];
handler.command = /^id/i;

export default handler;
