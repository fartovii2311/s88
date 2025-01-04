import fetch from 'node-fetch';
import yts from 'yt-search';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args.length) {
    return conn.sendMessage(
      m.chat,
      {
        text: `[ ✰ ] Ingresa el título de un video o canción de *YouTube*.\n\nEjemplo:\n> *${usedPrefix + command}* Mc Davo - Debes De Saber`,
      },
      { quoted: m }
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

    // Crear descripción del video
    let description = `🎥 *YouTube Play*\n\n` +
                      `📌 *Título:* ${video.title}\n` +
                      `🕒 *Duración:* ${video.timestamp || 'Desconocido'}\n` +
                      `🗓️ *Publicado:* ${video.ago}\n` +
                      `📺 *Canal:* ${video.author.name}\n` +
                      `🔗 *URL:* ${video.url}`;

    // Enviar mensaje interactivo con botones
    await conn.sendMessage(
      m.chat,
      {
        image: { buffer: thumbnail },
        caption: description,
        footer: 'Bot YouTube',
        buttons: [
          { buttonId: `${usedPrefix}ytmp4 ${video.url}`, buttonText: { displayText: 'Descargar Video 🎥' } },
          { buttonId: `${usedPrefix}ytmp3 ${video.url}`, buttonText: { displayText: 'Descargar Audio 🎵' } },
        ],
        headerType: 4,
      },
      { quoted: m }
    );

    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('❌');
    conn.sendMessage(
      m.chat,
      { text: `⚠️ Error: ${error.message}` },
      { quoted: m }
    );
  }
};

handler.help = ['play *<búsqueda>*'];
handler.tags = ['downloader'];
handler.command = ['play'];
handler.register = true;

export default handler;
