const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    await conn.sendMessage(m.chat, { 
      text: `Uso: ${usedPrefix}${command} <link del grupo/canal>` 
    });
    return;
  }

  const link = args[0];
  const regexGroup = /https:\/\/chat\.whatsapp\.com\/([\w\d]+)/;
  const match = link.match(regexGroup);

  if (!match) {
    await conn.sendMessage(m.chat, { 
      text: 'Por favor, proporciona un enlace válido de WhatsApp.' 
    });
    return;
  }

  const inviteCode = match[1];
  
  try {
    const groupInfo = await conn.groupAcceptInvite(inviteCode);
    const groupId = groupInfo.id;

    await conn.sendMessage(m.chat, { 
      text: `El ID del grupo/canal es: \n\n*${groupId}*` 
    });
  } catch (e) {
    await conn.sendMessage(m.chat, { 
      text: 'No se pudo obtener información del grupo/canal. Asegúrate de que el enlace sea válido y el bot tenga acceso.' 
    });
    console.error(e);
  }
};

handler.help = ['channelid'];
handler.tags = ['tools'];
handler.command = /^channelid$/i;

export default handler;
