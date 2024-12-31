const fs = require('fs');
const path = require('path');

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (command === 'borrarfolder') {
    try {
      const nombreUsuario = args[0] || m.sender.split('@')[0];
      const carpetaEliminar = path.join(__dirname, 'serbot', nombreUsuario);

      if (fs.existsSync(carpetaEliminar)) {
        fs.rmSync(carpetaEliminar, { recursive: true, force: true });
        conn.reply(m.chat, `La carpeta de usuario ${nombreUsuario} ha sido eliminada exitosamente.`, m);
      } else {
        conn.reply(m.chat, `La carpeta de usuario ${nombreUsuario} no existe.`, m);
      }
    } catch (err) {
      console.error(`Error al eliminar la carpeta:`, err);
      conn.reply(m.chat, `Hubo un error al intentar eliminar la carpeta.`, m);
    }
  }
};

handler.help = ['borrarfolder'];
handler.tags = ['serbot'];
handler.command = ['borrarfolder'];

export default handler;
