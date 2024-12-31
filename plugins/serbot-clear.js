import fs from 'fs';
import path from 'path';

const handler = async (m, { conn }) => {
  try {
    // Obtener la ruta del directorio actual
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    
    const carpetaEliminar = path.join(__dirname, 'serbot');

    if (fs.existsSync(carpetaEliminar)) {
      // Obtener los archivos y subcarpetas dentro de 'serbot'
      const archivos = fs.readdirSync(carpetaEliminar);
      archivos.forEach(archivo => {
        const archivoPath = path.join(carpetaEliminar, archivo);
        if (fs.lstatSync(archivoPath).isDirectory()) {
          // Si es una subcarpeta, eliminarla recursivamente
          fs.rmSync(archivoPath, { recursive: true, force: true });
        } else {
          // Si es un archivo, eliminarlo
          fs.unlinkSync(archivoPath);
        }
      });

      conn.reply(m.chat, `El contenido dentro de la carpeta 'serbot' ha sido eliminado exitosamente.`, m);
    } else {
      conn.reply(m.chat, `La carpeta 'serbot' no existe.`, m);
    }
  } catch (err) {
    console.error(`Error al eliminar el contenido de la carpeta:`, err);
    conn.reply(m.chat, `Hubo un error al intentar eliminar el contenido de la carpeta.`, m);
  }
};

handler.help = ['borrarfolder'];
handler.tags = ['serbot'];
handler.command = ['borrarfolder'];

export default handler;
