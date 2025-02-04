import { existsSync } from "fs";
import { rm } from "fs/promises";

let handler = async (m, { conn: parentw, args }) => {
  if (!args[0]) {
    return parentw.sendMessage(m.chat, { text: "⚠️ Debes proporcionar un ID de sesión para eliminar." }, { quoted: m });
  }

  let sessionId = args[0];
  let sessionPath = `./LynxJadiBot/${sessionId}`;

  if (!existsSync(sessionPath)) {
    return parentw.sendMessage(m.chat, { text: `❌ No se encontró la sesión con ID: ${sessionId}.` }, { quoted: m });
  }

  try {
    await rm(sessionPath, { recursive: true, force: true });
    await parentw.sendMessage(m.chat, { text: `✅ La sesión con ID ${sessionId} ha sido eliminada correctamente.` }, { quoted: m });
  } catch (err) {
    console.error("Error al eliminar la sesión:", err);
    await parentw.sendMessage(m.chat, { text: `❌ Error al eliminar la sesión: ${err.message}` }, { quoted: m });
  }
};

handler.tags = ["serbot"];
handler.help = ["deletesession <ID>"];
handler.command = /^deletesession|delonesession|removesession$/i;
handler.fail = null;
handler.owner = true;
export default handler;
