import { promises as fs } from "fs";
import { existsSync } from "fs";

let handler = async (m, { conn, args }) => {
  if (!args[0]) {
    await conn.sendMessage(
      m.chat,
      { text: "❌ Por favor, ingrese el número asociado a la sesión que desea eliminar. Ejemplo: *.delcode 51912345678*" },
      { quoted: m }
    );
    return;
  }

  let uniqid = args[0];
  let sessionPath = `./jadibot/${uniqid}`;

  try {
    if (!existsSync(sessionPath)) {
      await conn.sendMessage(
        m.chat,
        { text: `❌ No se encontró ninguna sesión activa de LynxJadiBot para el número: ${uniqid}.` },
        { quoted: m }
      );
      return;
    }

    await fs.rm(sessionPath, { recursive: true, force: true });
    await conn.sendMessage(
      m.chat,
      { text: `🚩 Sesión de LynxJadiBot eliminada correctamente para el número: ${uniqid}.` },
      { quoted: m }
    );
  } catch (err) {
    console.error("Error al eliminar la sesión de LynxJadiBot:", err.message);
    await conn.sendMessage(m.chat, { text: "❌ Ocurrió un error al intentar eliminar la sesión." }, { quoted: m });
    await m.react('✖️');
  }
};

handler.tags = ['serbot'];
handler.help = ['delcode *< Número >*'];
handler.command = /^(delcode|deljadibotsession|deljadibotsesion|borrarsesionjadibot|cerrarsesionjadibot)$/i;

export default handler;
