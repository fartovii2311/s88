import { promises as fs } from "fs";

let handler = async (m, { conn }) => {
  let who = m.mentionedJid && m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.fromMe
            ? conn.user.jid
            : m.sender;
  let uniqid = `${who.split`@`[0]}`;
  let sessionPath = `./jadibot/${uniqid}`;

  try {
    await fs.rm(sessionPath, { recursive: true, force: true });
    await conn.sendMessage(m.chat, { text: '🚩 Sesión de LynxJadiBot eliminada correctamente.' }, { quoted: m });
  } catch (err) {
    if (err.code === 'ENOENT') {
      await conn.sendMessage(m.chat, { text: "❌ No se encontró ninguna sesión activa de LynxJadiBot." }, { quoted: m });
    } else {
      console.error("Error al eliminar la sesión de LynxJadiBot:", err.message);
      await m.react('✖️');
    }
  }
};

handler.tags = ['serbot'];
handler.help = ['delcode *< Numero >*'];
handler.command = /^(delcode|deljadibotsession|deljadibotsesion|borrarsesionjadibot|cerrarsesionjadibot)$/i;

export default handler;
