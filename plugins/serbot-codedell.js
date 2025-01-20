import { promises as fs } from "fs";
import { existsSync } from "fs";

let handler = async (m, { conn }) => {
  let who = m.mentionedJid && m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.fromMe
            ? conn.user.jid
            : m.sender;
  let uniqid = `${who.split`@`[0]}`;
  let sessionPath = `./jadibot/${uniqid}`;

  try {
    if (!existsSync(sessionPath)) {
      await conn.sendMessage(m.chat, { text: "❌ No se encontró ninguna sesión activa de LynxJadiBot." }, { quoted: m });
      return;
    }

    await fs.rm(sessionPath, { recursive: true, force: true });
    await conn.sendMessage(m.chat, { text: '🚩 Sesión de LynxJadiBot eliminada correctamente.' }, { quoted: m });
  } catch (err) {
    console.error("Error al eliminar la sesión de LynxJadiBot:", err.message);
    await m.react('✖️');
  }
};

handler.tags = ['serbot'];
handler.help = ['delcode *< Número >*'];
handler.command = /^(delcode|deljadibotsession|deljadibotsesion|borrarsesionjadibot|cerrarsesionjadibot)$/i;

export default handler;
