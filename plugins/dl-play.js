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

  let apiUrl = `https://deliriussapi-oficial.vercel.app/download/ytmp3?url=${video.url}`;

  let response = await fetch(apiUrl);
  let data = await response.json();
  
  let mp3Buffer = await fetch(data.data.download.url);
  let buffer = await mp3Buffer.buffer();

  await conn.sendFile(m.chat, buffer, `${video.title}.mp3`, null, m);
};

handler.help = ['play *<búsqueda>*'];
handler.tags = ['downloader'];
handler.command = ['play'];

export default handler;
