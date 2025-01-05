import { youtube } from 'btch-downloader';
import yts from 'yt-search'; // Aquí estamos importando la librería
import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, '❀ Ingresa el texto de lo que quieres buscar', m);

  try {
    let ytsres = await yts(text); // Usamos yts para buscar los videos
    let video = ytsres.videos[0]; // Obtenemos el primer video del resultado

    if (!video) return conn.reply(m.chat, '❀ Sin resultados obtenidos :(', m);

    let { title, duration, views, ago, author, thumbnail, url } = video;
    let HS = `- Titulo: ${title}
- Duracion: ${duration.timestamp}
- Visitas: ${views.toLocaleString()}
- Subido: ${ago}
- Autor: ${author.name}`;

    await conn.sendMessage(m.chat, {
      text: HS,
      contextInfo: {
        externalAdReply: {
          title: `${title}`,
          body: `${author.name}`,
          thumbnailUrl: thumbnail,
          sourceUrl: url,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

    let data = await youtube(url);

    // Verifica si la respuesta es válida antes de pasarla a cheerio
    if (!data || !data.mp3) {
      return conn.reply(m.chat, '❀ Descarga fallida :(', m);
    }

    // Verifica si la respuesta es HTML antes de cargarla
    if (typeof data.mp3 !== 'string') {
      throw new Error('La respuesta de la descarga no es una cadena de texto');
    }

    await conn.sendMessage(m.chat, {
      audio: { url: data.mp3 },
      mimetype: 'audio/mpeg',
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    return conn.reply(m.chat, '❀ Ocurrió un error al procesar la solicitud :(', m);
  }
};

handler.command = ['play3'];

export default handler;
