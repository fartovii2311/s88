import { tmpdir } from 'os'
import path, { join } from 'path'
import { readdirSync, statSync, unlinkSync, existsSync } from 'fs'

let handler = async (m, { conn, usedPrefix: _p, __dirname, args }) => {

  const tmpDirs = [tmpdir(), join(__dirname, '../tmp')];
  const filenames = [];

  // Leer archivos de los directorios si existen
  tmpDirs.forEach(dirname => {
    if (existsSync(dirname)) {
      readdirSync(dirname).forEach(file => {
        filenames.push(join(dirname, file));
      });
    }
  });

  const deletedFiles = [];

  // Eliminar archivos
  filenames.forEach(file => {
    const stats = statSync(file);

    if (stats.isDirectory()) {
      console.log(`Skipping directory: ${file}`);
    } else {
      try {
        unlinkSync(file);  // Intentar eliminar el archivo
        deletedFiles.push(file);
      } catch (error) {
        console.error(`Error al eliminar el archivo: ${file}`, error);
      }
    }
  });

  // Responder al usuario
  if (deletedFiles.length > 0) {
    console.log('Deleted files:', deletedFiles);
    const deletedFilesList = deletedFiles.join('\n');
    // Si hay muchos archivos eliminados, solo mostrar los primeros 10
    const responseMessage = deletedFiles.length > 10 ? 
      `Archivos eliminados (mostrando los primeros 10):\n${deletedFilesList.slice(0, 300)}` :
      `Archivos eliminados:\n${deletedFilesList}`;
    
    conn.reply(m.chat, responseMessage, m);
  } else {
    conn.reply(m.chat, 'No hay archivos para limpiar en tmp', m);
  }

  conn.reply(m.chat, '✧ Listo!', m);
}

handler.help = ['cleartmp']
handler.tags = ['owner']
handler.command = /^(cleartmp|clear|tmpclear|cleantmp)$/i
handler.rowner = true

export default handler;
