const handler = async (message, { conn, command, text, isAdmin }) => {
  const db = global['db'] || { users: {} };
  const ownerJid = global['owner']?.[0]?.[0] + '@s.whatsapp.net';
  const botJid = conn?.user?.jid;

  if (!isAdmin) throw '🚫 Solo un administrador puede ejecutar este comando';

  const targetUser = message.mentionedJid?.[0] || message.quoted?.sender;
  if (!targetUser) throw '❗ Menciona o responde a un usuario para mutar/desmutar';

  if (targetUser === ownerJid) throw '🚫 No puedes mutar al creador del bot';
  if (targetUser === botJid) throw '🚫 No puedes mutar al bot';

  if (!db.users[targetUser]) db.users[targetUser] = { mute: false };

  const targetUserData = db.users[targetUser];

  if (command === 'mute') {
    if (targetUserData.mute) throw '🔇 Este usuario ya está mutado';
    targetUserData.mute = true;
    await conn.reply(
      message.chat,
      `🔇 *${targetUser} ha sido mutado. Sus mensajes serán eliminados.*`,
      message,
      {
        mentions: [targetUser],
      }
    );
  } else if (command === 'unmute') {
    if (!targetUserData.mute) throw '🔊 Este usuario no está mutado';
    targetUserData.mute = false;
    await conn.reply(
      message.chat,
      `🔊 *${targetUser} ha sido desmutado. Sus mensajes ya no serán eliminados.*`,
      message,
      {
        mentions: [targetUser],
      }
    );
  }
};

handler.command = ['mute', 'unmute'];
handler.admin = true;
handler.botAdmin = true;

export default handler;
