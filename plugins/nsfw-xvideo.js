/* 
- Downloader xvideo By DarkCore
- https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y
- Parchado por DarkCore... vip plus
*/

import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!global.db.data.chats[m.chat].nsfw) {
    return conn.reply(m.chat, `🚩 El grupo no admite contenido *Nsfw.*\n\n> Para activarlo un *Administrador* debe usar el comando */on nsfw*`, m);
  }

  await m.react('🕓');
  
  if (!text) throw 'Proporcióname un enlace de video para descargar.';

  try {
    const apiUrl = `https://dark-core-api.vercel.app/api/download/xvideo?key=user1&url=${encodeURIComponent(text)}`;
    const response = await fetch(apiUrl);

    if (response.ok) {
      const data = await response.json();

      if (data.success && data.results && Array.isArray(data.results) && data.results.length > 0) {
        const videoData = data.results[0]; // Tomamos el primer video en los resultados

        const videoUrl = videoData.videoLink;
        const videoTitle = videoData.videoTitle || 'Desconocido';
        const videoDuration = videoData.videoDuration || 'Desconocida';
        const videoImage = videoData.videoImageSrc || '';

        await conn.sendMessage(m.chat, {
          video: { url: videoUrl },
          caption: `🎥 *Título:* ${videoTitle}\n⏱️ *Duración:* ${videoDuration}`,
          mimetype: 'video/mp4',
          fileName: `${videoTitle}.mp4`,
          thumbnail: { url: videoImage },
        }, { quoted: m });

        await m.react('✅'); // Reacción de éxito
      } else {
        throw new Error('No se encontraron resultados.');
      }
    } else {
      throw new Error('Error al realizar la solicitud.');
    }
  } catch (error) {
    await m.react('❌'); // Reacción de error
    m.reply(`❌ *Error:* ${error.message || 'Ocurrió un error desconocido'}`);
  }
};

handler.help = ['xvideo'];
handler.command = ['xvideo', 'xvideodownload'];
handler.register = true;

export default handler;

