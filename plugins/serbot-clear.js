import fs from 'fs';
import path from 'path';

const handler = async (m, { conn }) => {
  try {
    // Obtener la ruta del directorio actual
    const __dirname = path.dirname(new URL(import.meta.url).pathname);

    // Carpetas a eliminar
    const carpetasEliminar = [
      path.join(__dirname, 'LynxJadiBots'),
      path.join(__dirname, 'LynxJadiBot'),
    ];

    // Iterar sobre las carpetas y eliminarlas si existen
    carpetasEliminar.forEach((carpeta) => {
      if (fs.existsSync(carpeta)) {
        // Leer todo el contenido de la carpeta
        const archivos = fs.readdirSync(carpeta);

        // Iterar sobre el contenido
        archivos.forEach((archivo) => {
          const archivoPath = path.join(carpeta, archivo);

          if (fs.lstatSync(archivoPath).isDirectory()) {
            // Si es una subcarpeta, eliminarla recursivamente
            fs.rmSync(archivoPath, { recursive: true, force: true });
          } else {
            // Si es un archivo, eliminarlo
            fs.unlinkSync(archivoPath);
          }
        });

        // Eliminar la carpeta principal después de vaciarla
        fs.rmdirSync(carpeta);
        conn.reply(m.chat, `La carpeta '${path.basename(carpeta)}' ha sido eliminada exitosamente.`, m);
      } else {
        conn.reply(m.chat, `La carpeta '${path.basename(carpeta)}' no existe.`, m);
      }
    });
  } catch (err) {
    console.error(`Error al eliminar carpetas:`, err);
    conn.reply(m.chat, `Hubo un error al intentar eliminar las carpetas.`, m);
  }
};

handler.help = ['borrarfolder'];
handler.tags = ['serbot'];
handler.command = ['borrarfolder'];

export default handler;
