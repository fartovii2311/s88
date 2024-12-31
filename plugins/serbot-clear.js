import fs from 'fs';
import path from 'path';

const handler = async (m, { conn, args }) => {
  if (args[0]) {
    try {
      const nombreUsuario = args[0];  // Usamos directamente el primer argumento
      const carpetaEliminar = path.join(__dirname, 'serbot', nombreUsuario);

      if (fs.existsSync(carpetaEliminar)) {
        // Eliminar todo el contenido de la carpeta (archivos y subcarpetas)
        const archivos = fs.readdirSync(carpetaEliminar);
        archivos.forEach(archivo => {
          const archivoPath = path.join(carpetaEliminar, archivo);
          if (fs.lstatSync(archivoPath).isDirectory()) {
            fs.rmSync(archivoPath, { recursive: true, force: true });
          } else {
            fs.unlinkSync(archivoPath);
          }
        });

        conn.reply(m.chat, `El contenido de la carpeta de usuario ${nombreUsuario} ha sido eliminado exitosamente.`, m);
      } else {
        conn.reply(m.chat, `La carpeta de usuario ${nombreUsuario} no existe.`, m);
      }
    } catch (err) {
      console.error(`Error al eliminar el contenido de la carpeta:`, err);
      conn.reply(m.chat, `Hubo un error al intentar eliminar el contenido de la carpeta.`, m);
    }
  } else {
    conn.reply(m.chat, 'Por favor, proporciona el nombre del usuario o la carpeta a eliminar.', m);
  }
};

handler.help = ['borrarfolder'];
handler.tags = ['serbot'];
handler.command = ['borrarfolder'];

export default handler;
