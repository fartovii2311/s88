import { promises as fs } from "fs";
import { existsSync } from "fs";

let handler = async (m, { conn, args }) => {
  // Verifica si el número fue proporcionado
  if (!args[0]) {
    await conn.sendMessage(
      m.chat,
      { text: "❌ Por favor, ingrese el número asociado a la sesión que desea eliminar. Ejemplo: *.delcode 51912345678*" },
      { quoted: m }
    );
    return;
  }

  // Extrae el número proporcionado por el usuario
  let uniqid = args[0];

  // Valida que el número sea un formato correcto (solo números, sin letras ni caracteres extraños)
  if (!/^\d+$/.test(uniqid)) {
    await conn.sendMessage(
      m.chat,
      { text: "❌ El número proporcionado no es válido. Asegúrese de usar solo números." },
      { quoted: m }
    );
    return;
  }

  let sessionPath = `./jadibot/${uniqid}`;  // Ruta de la carpeta asociada al número

  try {
    // Verifica si la carpeta asociada al número existe
    if (!existsSync(sessionPath)) {
      await conn.sendMessage(
        m.chat,
        { text: `❌ No se encontró ninguna sesión activa de LynxJadiBot para el número: ${uniqid}.` },
        { quoted: m }
      );
      return;
    }

    // Elimina la carpeta de la sesión
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
