const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!m.isGroup) {
    await conn.sendMessage(m.chat, { 
      text: 'Este comando solo se puede usar en grupos.' 
    });
    return;
  }

  const groupMetadata = await conn.groupMetadata(m.chat);
  const groupId = groupMetadata.id;

  await conn.sendMessage(m.chat, { 
    text: `El ID de este grupo/canal es: \n\n*${groupId}*` 
  });
};

handler.help = ['channelid'];
handler.tags = ['group'];
handler.command = /^channelid$/i;

export default handler;
