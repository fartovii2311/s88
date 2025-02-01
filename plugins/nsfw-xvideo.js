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

      if (data.success && data.results) {
        const videoData = data.results; // Ahora `results` es un objeto, no un arreglo

        const videoUrl = videoData.VideoUrlHigh;
        const videoTitle = 'Desconocido'; // La API no proporciona un título, así que lo dejamos como 'Desconocido'
        const videoDuration = 'Desconocida'; // Lo mismo para la duración
        const videoImage = videoData.ThumbUrl || ''; // Usamos la URL de la miniatura

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
