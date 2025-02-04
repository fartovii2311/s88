import { readdirSync } from "fs";
import { rm } from "fs/promises";
import { exec } from "child_process";
import os from "os";

let handler = async (m, { conn: parentw }) => {
  let sessionFolder = "./LynxJadiBot";
  let sessions = readdirSync(sessionFolder);
  let deletedSessions = [];

  for (let session of sessions) {
    let isActive = await checkSessionActive(session);
    if (!isActive) {
      await rm(`${sessionFolder}/${session}`, { recursive: true, force: true });
      deletedSessions.push(session);
    }
  }

  let message =
    deletedSessions.length > 0
      ? `🗑️ Sesiones inactivas eliminadas:\n\n${deletedSessions.join("\n")}`
      : "🚫 No se encontraron sesiones inactivas para eliminar.";

  await parentw.sendMessage(m.chat, { text: message }, { quoted: m });
};

handler.tags = ["serbot"];
handler.help = ["cleansessions"];
handler.command = /^cleansessions|cleansess|deletesessions|purgesessions$/i;
handler.fail = null;

export default handler;

async function checkSessionActive(session) {
  return new Promise((resolve) => {
    let command = os.platform() === "win32"
      ? `tasklist | findstr /I ${session}`
      : `ps aux | grep '${session}' | grep -v grep`;

    exec(command, (err, stdout) => {
      resolve(stdout.trim().length > 0);
    });
  });
}
