/* 
- play hecho por By DarkCore
- https://whatsapp.com/channel/0029Vaxk8vvEFeXdzPKY8f3F
- Parchado por DarkCore... vip plus
*/

import fetch from 'node-fetch';
import yts from 'yt-search';

let handler = async (m, { conn, args }) => {
  if (!args[0]) return conn.reply(m.chat, '*\`Por favor ingresa un término de búsqueda\`*', m);

  await m.react('⏳');
  try {
    let searchResults = await searchVideos(args.join(" "));
    let video = searchResults[0];
    let thumbnail = await (await fetch(video.image)).buffer();

    let messageText = `> *Reproductor YouTube 🍿*\n\n`;
    messageText += `${video.title}\n\n`;
    messageText += `• *Duración:* ${formatDuration(video.duration.seconds)}\n`;
    messageText += `• *Autor:* ${video.author.name || 'Desconocido'}\n`;
    messageText += `• *Publicado hace:* ${convertTimeToSpanish(video.ago)}\n`;
    messageText += `• *Enlace:* _https://youtu.be/${video.videoId}_\n\n`;

    await conn.sendMessage(m.chat, {
      image: thumbnail,
      caption: messageText,
      footer: 'Haz clic en el botón para elegir el formato de descarga.',
      buttons: [
        {
          buttonId: `.downloadMp3 https://youtu.be/${video.videoId}`,
          buttonText: {
            displayText: 'Escuchar en MP3',
          },
        },
        {
          buttonId: `.downloadMp4 https://youtu.be/${video.videoId}`,
          buttonText: {
            displayText: 'Ver en MP4',
          },
        },
      ],
      viewOnce: true,
      headerType: 4,
    }, { quoted: m });

    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('❌');
    conn.reply(m.chat, '*\`Hubo un error al buscar el video.\`*', m);
  }
};

handler.help = ['reproducir *<texto>*'];
handler.tags = ['descargar'];
handler.command = ['reproducir'];

export default handler;

async function searchVideos(query, options = {}) {
  let search = await yts.search({ query, hl: "es", gl: "ES", ...options });
  return search.videos;
}

function formatDuration(seconds) {
  seconds = Number(seconds);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsLeft = Math.floor(seconds % 60);
  return `${hours > 0 ? hours + 'h ' : ''}${minutes}m ${secondsLeft}s`;
}

function convertTimeToSpanish(timeText) {
  if (timeText.includes('year')) return timeText.replace('year', 'año').replace('years', 'años');
  if (timeText.includes('month')) return timeText.replace('month', 'mes').replace('months', 'meses');
  if (timeText.includes('day')) return timeText.replace('day', 'día').replace('days', 'días');
  if (timeText.includes('hour')) return timeText.replace('hour', 'hora').replace('hours', 'horas');
  if (timeText.includes('minute')) return timeText.replace('minute', 'minuto').replace('minutes', 'minutos');
  return timeText;
}
