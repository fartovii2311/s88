import { youtube } from 'btch-downloader';
import yts from 'yt-search';
import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(
      m.chat,
      '❀ Ingresa el texto de lo que quieres buscar o una URL válida de YouTube.',
      m
    );
  }

  try {
    let url;
    if (text.startsWith('http')) {
      // Si el texto es un enlace de YouTube
      url = text;
    } else {
      // Buscar en YouTube si no es un enlace
      let ytsres = await yts(text);
      let video = ytsres.videos[0];

      if (!video) {
        return conn.reply(m.chat, '❀ No se encontraron resultados para tu búsqueda.', m);
      }

      // Extraer datos del video
      let { title, duration, views, ago, author, thumbnail, url: videoUrl } = video;
      url = videoUrl;

      // Enviar detalles del video al usuario
      let HS = `🎵 *Título:* ${title}
🕒 *Duración:* ${duration}
👁️ *Visitas:* ${views.toLocaleString()}
📅 *Subido hace:* ${ago}
✍️ *Autor:* ${author.name}`;

      await conn.sendMessage(
        m.chat,
        {
          text: HS,
          contextInfo: {
            externalAdReply: {
              title: title,
              body: author.name,
              thumbnailUrl: thumbnail,
              sourceUrl: url,
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: m }
      );
    }

    // Descargar el audio utilizando btch-downloader
    let data = await youtube(url);

    if (!data || !data.audio) {
      return conn.reply(
        m.chat,
        '❀ Hubo un problema al descargar el archivo de audio.',
        m
      );
    }

    // Enviar el archivo MP3 al usuario
    await conn.sendMessage(
      m.chat,
      { audio: { url: data.audio }, mimetype: 'audio/mpeg' },
      { quoted: m }
    );
  } catch (error) {
    console.error(error);
    conn.reply(
      m.chat,
      '❀ Ocurrió un error inesperado al procesar tu solicitud. Por favor, intenta más tarde.',
      m
    );
  }
};

handler.command = ['yt0']; // Comandos para esta función
export default handler;
