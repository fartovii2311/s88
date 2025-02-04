import { existsSync } from "fs";
import { rm } from "fs/promises";

let handler = async (m, { conn: parentw }) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  let uniqid = `${who.split`@`[0]}`;
  let folderPath = `./LynxJadiBot/${uniqid}`;

  try {
    if (!existsSync(folderPath)) {
      await parentw.sendMessage(m.chat, { text: "🌠 No cuentas con ninguna sesión de Sub-Bot." }, { quoted: m });
      return;
    }

    await rm(folderPath, { recursive: true, force: true });
    await parentw.sendMessage(m.chat, { text: "🚩 Sub-Bot eliminado." }, { quoted: m });
  } catch (err) {
    console.error("error", err);
  }
};

handler.tags = ['serbot'];
handler.help = ['delsession'];
handler.command = /^(deletesess?ion|eliminarsesion|borrarsesion|delsess?ion|cerrarsesion|delserbot|logout)$/i;
handler.fail = null;

export default handler;
