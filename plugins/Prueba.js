import fetch from 'node-fetch';
import yts from 'yt-search';

let handler = async (m, { conn: star, args, usedPrefix, command }) => {
  if (!args.length) {
    return star.reply(
      m.chat,
      `[ ✰ ] Ingresa el título de un video o canción de *YouTube*.\n\nEjemplo:\n> *${usedPrefix + command}* Mc Davo - Debes De Saber`,
      m
    );
  }

  try {
    await m.react('🕓');

    // Buscar video en YouTube
    let searchResults = await yts(args.join(' '));
    if (!searchResults || !searchResults.videos.length) {
      throw new Error('No se encontraron resultados.');
    }

    let video = searchResults.videos[0]; // Primer resultado
    let thumbnail = await (await fetch(video.thumbnail)).buffer();

    // Validar duración
    let duration = video.duration && video.duration.seconds ? secondString(video.duration.seconds) : 'Desconocido';

    // Crear texto descriptivo del video
    let txt = `乂  Y O U T U B E  -  P L A Y\n\n`;
    txt += `\t\t*» Título* : ${video.title}\n`;
    txt += `\t\t*» Duración* : ${duration}\n`;
    txt += `\t\t*» Publicado* : ${video.ago}\n`;
    txt += `\t\t*» Canal* : ${video.author.name}\n`;
    txt += `\t\t*» ID* : ${video.videoId}\n`;
    txt += `\t\t*» Url* : ${video.url}\n\n`;
    txt += `> *-* Para descargar responde a este mensaje con *Video* o *Audio*.\n`;

    // Enviar mensaje interactivo con botones
    await star.sendMessage(
      m.chat,
      {
        image: { buffer: thumbnail },
        caption: txt,
        footer: 'Bot YouTube',
        buttons: [
          { buttonId: `${usedPrefix}ytmp4 ${video.url}`, buttonText: { displayText: 'Descargar Video' } },
          { buttonId: `${usedPrefix}ytmp3 ${video.url}`, buttonText: { displayText: 'Descargar Audio' } },
        ],
        headerType: 4,
      },
      { quoted: m }
    );

    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('❌');
    star.reply(m.chat, `Error: ${error.message}`, m);
  }
};

handler.help = ['play0 *<búsqueda>*'];
handler.tags = ['downloader'];
handler.command = ['prueba'];
handler.register = true;
export default handler;

// Formato de segundos a hh:mm:ss
function secondString(seconds) {
  let h = Math.floor(seconds / 3600) || 0;
  let m = Math.floor((seconds % 3600) / 60) || 0;
  let s = seconds % 60 || 0;
  return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
