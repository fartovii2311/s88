import { igdl } from './scrapers/mp3'; 
import yts from 'yt-search';
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

    // Aquí estamos usando igdl para obtener la descarga en formato MP3
    let data = await igdl(url); 

    // Verifica si la respuesta es válida antes de intentar acceder al enlace de descarga
    if (!data || !data.url) {
      return conn.reply(m.chat, '❀ Descarga fallida :(', m);
    }

    // Enviar el archivo MP3 al chat
    await conn.sendMessage(m.chat, {
      audio: { url: data.url }, // Asegurarse de que 'data.url' sea el enlace de la descarga
      mimetype: 'audio/mpeg',
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    return conn.reply(m.chat, '❀ Ocurrió un error al procesar la solicitud :(', m);
  }
};

handler.command = ['play3'];

export default handler;
