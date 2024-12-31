import fs from 'fs';
import path from 'path';

const handler = async (m, { conn, args }) => {
  if (args[0]) {
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
  } else {
    conn.reply(m.chat, 'Por favor, proporciona el nombre del usuario o la carpeta a eliminar.', m);
  }
};

handler.help = ['borrarfolder'];
handler.tags = ['serbot'];
handler.command = ['borrarfolder'];

export default handler;
