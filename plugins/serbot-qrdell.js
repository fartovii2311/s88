import { promises as fs } from "fs";
import { existsSync } from "fs";

let handler = async (m, { conn, args }) => {
  // Verifica si se proporcionó un número en los argumentos
  if (!args[0]) {
    await conn.sendMessage(
      m.chat,
      { text: "❌ Por favor, ingrese el número asociado a la sesión que desea eliminar. Ejemplo: *.delqr 51912345678*" },
      { quoted: m }
    );
    return;
  }

  let uniqid = args[0];
  let sessionPath = `./serbot/${uniqid}`; // Carpeta asociada al número

  try {
    // Verifica si la carpeta asociada al número existe
    if (!existsSync(sessionPath)) {
      await conn.sendMessage(
        m.chat,
        { text: `❌ No se encontró ninguna sesión activa de Sub-Bot para el número: ${uniqid}.` },
        { quoted: m }
      );
      return;
    }

    // Elimina la carpeta de la sesión
    await fs.rm(sessionPath, { recursive: true, force: true });
    await conn.sendMessage(
      m.chat,
      { text: `🚩 Sub-Bot eliminado correctamente para el número: ${uniqid}.` },
      { quoted: m }
    );
  } catch (err) {
    console.error("Error al eliminar la sesión del Sub-Bot:", err.message);
    await conn.sendMessage(
      m.chat,
      { text: "❌ Ocurrió un error al intentar eliminar la sesión." },
      { quoted: m }
    );
  }
};

handler.tags = ['serbot'];
handler.help = ['delqr *< Número >*'];
handler.command = /^(delqr|delsession|delsesion|eliminarsesion|borrarsesion|cerrarsesion)$/i;

export default handler;
