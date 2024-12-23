import fetch from 'node-fetch';
import yts from 'yt-search';

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
  // Verifica si hay un mensaje citado
  if (m.quoted) {
    const quotedMessage = m.quoted;  // El mensaje citado

    // Verificar si el mensaje citado contiene un enlace de YouTube
    const urlRegex = /(https?:\/\/(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\/videos\/(?:youtube|music))[\w-]+)/;
    const match = quotedMessage.text.match(urlRegex);

    // Si no se encuentra un enlace de YouTube en el mensaje citado, termina la ejecución
    if (!match) {
      return conn.reply(m.chat, '❀ El mensaje citado no contiene un enlace de YouTube.', m);
    }

    // Extraer la URL de YouTube
    const youtubeUrl = match[0];
    
    // Responder al usuario con un mensaje indicando que el enlace ha sido detectado
    await m.react('🕓');
    
    try {
      // Buscar el video de YouTube en la API
      let res = await yts(youtubeUrl);
      let video = res.videos[0];

      // Generar mensaje con detalles del video
      let txt = '`乂  Y O U T U B E  -  P L A Y`\n\n';
      txt += `\t\t*» Título* : ${video.title}\n`;
      txt += `\t\t*» Duración* : ${secondString(video.timestamp)}\n`;
      txt += `\t\t*» Publicado* : ${eYear(video.ago)}\n`;
      txt += `\t\t*» Canal* : ${video.author.name || 'Desconocido'}\n`;
      txt += `\t\t*» ID* : ${video.videoId}\n`;
      txt += `\t\t*» Url* : ${video.url}\n\n`;
      txt += `> *-* Para descargar responde a este mensaje con *Video* o *Audio*.`;

      // Enviar el detalle del video
      let img = await (await fetch(video.thumbnail)).buffer();
      await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m);

      // Esperar a que el usuario responda con "Audio" o "Video"
      const filter = (msg) => msg.sender === m.sender && /^(audio|video)$/i.test(msg.text);
      const response = await conn.waitForMessage(m.chat, filter);

      // Si la respuesta es "audio"
      if (/audio/i.test(response.text)) {
        let apiResponse = await fetch(`https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${youtubeUrl}`);
        let api = await apiResponse.json();

        if (api.status === true) {
          let dl_url = api.result.download.url;
          // Enviar el audio MP3
          await conn.sendMessage(m.chat, { 
            audio: { url: dl_url },
            mimetype: "audio/mp3",
            ptt: true
          }, { quoted: m });
        } else {
          conn.reply(m.chat, '❀ Hubo un error al obtener el enlace de descarga. Intenta nuevamente.', m);
        }
      }

      // Si la respuesta es "video"
      else if (/video/i.test(response.text)) {
        let apiResponse = await fetch(`https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${youtubeUrl}`);
        let api = await apiResponse.json();

        if (api.status === true) {
          let dl_url = api.result.download.url;
          // Enviar el video MP4
          await conn.sendMessage(m.chat, { 
            video: { url: dl_url },
            mimetype: "video/mp4"
          }, { quoted: m });
        } else {
          conn.reply(m.chat, '❀ Hubo un error al obtener el enlace de descarga. Intenta nuevamente.', m);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      conn.reply(m.chat, '❀ Ocurrió un error al intentar obtener los detalles del video. Intenta nuevamente más tarde.', m);
    }

  } else {
    // Si no se menciona un mensaje, responde con un mensaje de error
    conn.reply(m.chat, '❀ Por favor menciona un mensaje que contenga un enlace de YouTube.', m);
  }
};

handler.help = ['ytmp3', 'ytmp4'];
handler.tags = ['downloader'];
handler.command = ['play'];
handler.register = true;

export default handler;

// Funciones auxiliares
function secondString(seconds) {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const dDisplay = d > 0 ? d + (d == 1 ? ' Día, ' : ' Días, ') : '';
  const hDisplay = h > 0 ? h + (h == 1 ? ' Hora, ' : ' Horas, ') : '';
  const mDisplay = m > 0 ? m + (m == 1 ? ' Minuto, ' : ' Minutos, ') : '';
  const sDisplay = s > 0 ? s + (s == 1 ? ' Segundo' : ' Segundos') : '';
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

function eYear(txt) {
  if (!txt) {
    return '×';
  }
  if (txt.includes('month ago')) {
    var T = txt.replace("month ago", "").trim();
    return 'hace ' + T + ' mes';
  }
  if (txt.includes('months ago')) {
    var T = txt.replace("months ago", "").trim();
    return 'hace ' + T + ' meses';
  }
  if (txt.includes('year ago')) {
    var T = txt.replace("year ago", "").trim();
    return 'hace ' + T + ' año';
  }
  if (txt.includes('years ago')) {
    var T = txt.replace("years ago", "").trim();
    return 'hace ' + T + ' años';
  }
  if (txt.includes('hour ago')) {
    var T = txt.replace("hour ago", "").trim();
    return 'hace ' + T + ' hora';
  }
  if (txt.includes('hours ago')) {
    var T = txt.replace("hours ago", "").trim();
    return 'hace ' + T + ' horas';
  }
  if (txt.includes('minute ago')) {
    var T = txt.replace("minute ago", "").trim();
    return 'hace ' + T + ' minuto';
  }
  if (txt.includes('minutes ago')) {
    var T = txt.replace("minutes ago", "").trim();
    return 'hace ' + T + ' minutos';
  }
  if (txt.includes('day ago')) {
    var T = txt.replace("day ago", "").trim();
    return 'hace ' + T + ' dia';
  }
  if (txt.includes('days ago')) {
    var T = txt.replace("days ago", "").trim();
    return 'hace ' + T + ' dias';
  }
  return txt;
}
