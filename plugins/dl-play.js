import fetch from 'node-fetch';
import yts from 'yt-search';

let handler = async (m, { conn, args }) => {
  let searchQuery = args.join(' ');

  if (!searchQuery) {
    return conn.sendMessage(m.chat, "Por favor, proporciona una búsqueda o enlace de YouTube.", { quoted: m });
  }

  let searchResults = await yts(searchQuery);
  let video = searchResults.videos[0];

  if (!video) {
    return conn.sendMessage(m.chat, "No se encontró ningún video.", { quoted: m });
  }

  let message = `
*Título:* ${video.title}
*Duración:* ${video.timestamp}
*Vistas:* ${video.views}
*Publicado:* ${video.ago}
*Link:* ${video.url}
`;

  await conn.sendFile(m.chat, video.thumbnail, 'thumbnail.jpg', message, m);

  let apiUrl = `https://deliriussapi-oficial.vercel.app/download/ytmp3?url=${video.url}`;

  let response = await fetch(apiUrl);
  let buffer = await response.buffer();

  await conn.sendFile(m.chat, buffer, `${video.title}.mp3`, null, m);
};
