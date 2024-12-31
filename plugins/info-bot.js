import fs from 'fs';
const handler = (m) => m;

handler.all = async function(m) {
  const vn = './media/audios/bot.mp3'; // Ruta de audio
  const chat = global.db.data.chats[m.chat];

  if (/^bot$/i.test(m.text) && !chat.isBanned) {
    conn.sendPresenceUpdate('recording', m.chat);
    conn.reply(m.chat,`🤍 ¡Hola! Soy una ia, ¿en qué puedo ayudarte hoy?\n\n✰ Usa */menu* para ver mis comandos.`,m, rcanal);
  }
  return !0;
};

export default handler;
