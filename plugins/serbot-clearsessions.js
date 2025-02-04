import { readdirSync } from "fs";
import { rm } from "fs/promises";
import { spawn } from "child_process";

let handler = async (m, { conn: parentw }) => {
  let sessionFolder = './LynxJadiBot';
  let sessions = readdirSync(sessionFolder);
  let deletedSessions = [];

  for (let session of sessions) {
    let isActive = await checkSessionActive(session);
    if (!isActive) {
      await rm(`${sessionFolder}/${session}`, { recursive: true, force: true });
      deletedSessions.push(session);
    }
  }

  let message = deletedSessions.length > 0 
    ? `🗑️ Sesiones inactivas eliminadas:\n\n${deletedSessions.join('\n')}`
    : '🚫 No se encontraron sesiones inactivas para eliminar.';

  await parentw.sendMessage(m.chat, { text: message }, { quoted: m });
};

handler.tags = ['serbot'];
handler.help = ['cleansessions'];
handler.command = /^cleansessions|cleansess|deletesessions|purgesessions$/i;
handler.fail = null;

export default handler;

async function checkSessionActive(session) {
  return new Promise((resolve) => {
    let processCheck = spawn("pgrep", ["-f", `LynxJadiBot/${session}`]);

    processCheck.on("exit", (code) => {
      resolve(code === 0);
    });
  });
}
