import { readdirSync } from "fs";
import { exec } from "child_process";

let handler = async (m, { conn: parentw }) => {
  let sessionFolder = './LynxJadiBot';
  let sessions = readdirSync(sessionFolder);
  let message = '📋 *Lista de Sesiones de Sub-Bots:*\n\n';

  for (let session of sessions) {
    let isActive = await checkSessionActive(session);
    message += `🆔 *${session}* - ${isActive ? '🟢 Activa' : '🔴 Inactiva'}\n`;
  }

  if (sessions.length === 0) {
    message = '🚫 No hay sesiones de Sub-Bots.';
  }

  await parentw.sendMessage(m.chat, { text: message }, { quoted: m });
};

handler.tags = ['serbot'];
handler.help = ['listsessions'];
handler.command = /^listsessions|listsess|showsessions|sessionlist$/i;
handler.fail = null;

export default handler;

async function checkSessionActive(session) {
  return new Promise((resolve) => {
    exec(`netstat -ano | findstr :${session}`, (err, stdout) => {
      resolve(stdout.trim().length > 0);
    });
  });
}
