import fs from 'fs';
import ws from 'ws';

async function handler(m, { conn: stars, usedPrefix }) {
  let uniqueUsers = new Map();

  if (!global.conns || !Array.isArray(global.conns)) {
    global.conns = [];
  }

  global.conns = global.conns.filter((conn) => {
    const isValid = conn && conn.user && conn.ws?.socket?.readyState === ws.OPEN;
    if (!isValid) {
      console.log(`[INFO] Eliminando subbot no activo: ${conn?.user?.jid || 'desconocido'}`);
    }
    return isValid;
  });

  global.conns.forEach((conn) => {
    if (conn && conn.user) {
      uniqueUsers.set(conn.user.jid, conn);
    }
  });

  let users = [...uniqueUsers.values()];
  let totalUsers = uniqueUsers.size;

  let message = users.map((v, index) => {
    const connectedAt = v.connectedAt || Date.now();
    const elapsedTime = Date.now() - connectedAt;
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

    const estado = v.ws?.socket?.readyState === ws.OPEN
      ? 'Activo'
      : 'Desconectado';

    return `*[ \`${index + 1}\` - ${v.user.name || 'Sin Nombre'} ]*
🤍 *ᥣiᥒ᥊:* https://wa.me/${v.user.jid.replace(/[^0-9]/g, '')}?text=.menu
🕒 *𝗍іᥱm⍴᥆ ᥲᥴ𝗍і᥎᥆:* ${hours}h ${minutes}m ${seconds}s
📡 *ᥱs𝗍ᥲძ᥆:* ${estado}
`;
  }).join('\n');

  let responseMessage = `༶•┈┈⛧┈♛ ᥣᥡᥒ᥊ - ᥲі ♛┈⛧┈┈•༶\n🟢 *Subbots Activos: ${totalUsers}*\n\n${message.trim() || '_No hay subbots activos en este momento._'}`;

  await conn.reply(m.chat,
    responseMessage,
    m,
    menu,
    fake,
    { mentions: stars.parseMention(responseMessage) });
}

handler.command = ['listjadibot', 'bots'];
handler.help = ['bots'];
handler.tags = ['serbot'];

export default handler;
