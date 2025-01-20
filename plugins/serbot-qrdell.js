import { promises as fs } from "fs";

let handler = async (m, { conn }) => {
  let who = m.mentionedJid && m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.fromMe
            ? conn.user.jid
            : m.sender;
  let uniqid = `${who.split`@`[0]}`;
  let sessionPath = `./serbot/${uniqid}`;

  try {
    await fs.rm(sessionPath, { recursive: true, force: true });
    await conn.sendMessage(m.chat, { text: '🚩 Sub-Bot eliminado correctamente.' }, { quoted: m });
  } catch (err) {
    if (err.code === 'ENOENT') {
      await conn.sendMessage(m.chat, { text: "❌ No se encontró ninguna sesión activa de Sub-Bot." }, { quoted: m });
    } else {
      console.error("Error al eliminar la sesión del Sub-Bot:", err.message);
      await m.react('✖️');
    }
  }
};

handler.tags = ['serbot'];
handler.help = ['delqr'];
handler.command = /^(delqr|delsession|delsesion|eliminarsesion|borrarsesion|cerrarsesion)$/i;

export default handler;
