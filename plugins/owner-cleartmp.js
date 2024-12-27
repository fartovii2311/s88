import { join } from 'path'
import { readdirSync, unlinkSync, existsSync } from 'fs'

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  const tmpDir = join(__dirname, '../tmp');
  const deletedFiles = [];

  if (existsSync(tmpDir)) {
    const filenames = readdirSync(tmpDir);

    filenames.forEach(file => {
      const filePath = join(tmpDir, file);

      try {
        unlinkSync(filePath);
        deletedFiles.push(file);
      } catch (error) {
        console.error(`Error al eliminar el archivo: ${filePath}`, error);
      }
    });

    if (deletedFiles.length > 0) {
      console.log('Archivos eliminados:', deletedFiles);
      const deletedFilesList = deletedFiles.join('\n');
      const responseMessage = deletedFiles.length > 10 ? 
        `Archivos eliminados (mostrando los primeros 10):\n${deletedFilesList.slice(0, 300)}` :
        `Archivos eliminados:\n${deletedFilesList}`;
      
      conn.reply(m.chat, responseMessage, m);
    } else {
      conn.reply(m.chat, 'No hay archivos para limpiar en tmp', m);
    }
  } else {
    conn.reply(m.chat, 'La carpeta tmp no existe', m);
  }

  conn.reply(m.chat, '✧ Listo!', m);
}

handler.help = ['cleartmp']
handler.tags = ['owner']
handler.command = /^(cleartmp|clear|tmpclear|cleantmp)$/i
handler.rowner = true

export default handler;
