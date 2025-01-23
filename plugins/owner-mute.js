const handler = async (message, { conn, command, text, isAdmin }) => {
  if (!global.db) global.db = { users: {} };
  if (!global.db.users) global.db.users = {};

  const db = global.db;
  const ownerJid = global.owner?.[0]?.[0] + '@s.whatsapp.net';
  const botJid = conn?.user?.jid;

  if (!isAdmin) throw '🚫 Solo un administrador puede ejecutar este comando';

  const targetUser =
    message.mentionedJid?.[0] || message.quoted?.sender || text?.trim();

  if (!targetUser) throw '❗ Menciona o responde a un usuario para mutar/desmutar';

  if (targetUser === ownerJid) throw '🚫 No puedes mutar al creador del bot';
  if (targetUser === botJid) throw '🚫 No puedes mutar al bot';

  // Inicializa datos del usuario si no existen
  if (!db.users[targetUser]) {
    db.users[targetUser] = { mute: false };
  }

  const targetUserData = db.users[targetUser];

  if (command === 'mute') {
    if (targetUserData.mute) throw '🔇 Este usuario ya está mutado';
    targetUserData.mute = true;
    await conn.reply(
      message.chat,
      `🔇 *El usuario ${targetUser.split('@')[0]} ha sido mutado. Sus mensajes serán eliminados.*`,
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
      `🔊 *El usuario ${targetUser.split('@')[0]} ha sido desmutado. Sus mensajes ya no serán eliminados.*`,
      message,
      {
        mentions: [targetUser],
      }
    );
  }

  // Lógica para borrar mensajes de usuarios muteados
  if (targetUserData.mute) {
    if (message.sender === targetUser) {
      await conn.deleteMessage(message.chat, message.key);
      console.log(`Mensaje de ${targetUser.split('@')[0]} ha sido eliminado porque está muteado.`);
    }
  }
};

handler.command = ['mute', 'unmute'];
handler.admin = true;
handler.botAdmin = true;

export default handler;
