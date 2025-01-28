import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!global.db.data.chats[m.chat].nsfw) {
    return conn.reply(m.chat, `🚩 El grupo no admite contenido *Nsfw.*\n\n> Para activarlo un *Administrador* debe usar el comando */on nsfw*`, m, rcanal);
}
  await m.react('🕓'); 

  if (!text) throw 'Proporcióname un texto de búsqueda para encontrar el video.';

  try {
    const response = await fetch(`https://dark-core-api.vercel.app/api/search/xvideo?key=user1&text=${encodeURIComponent(text)}`);

    if (response.ok) {
      const data = await response.json();

      if (data.success && data.results && data.results.length > 0) {
        const video = data.results[0];

        const videoDetails = `
          *Título:* ${video.videoTitle}
          *Resolución:* ${video.videoResolution}
          *Duración:* ${video.videoDuration}
          *Enlace:* ${video.videoLink}
        `;

        await conn.sendMessage(m.chat, { 
          text: videoDetails,
          caption: video.videoTitle
        }, { quoted: m });

        await m.react('✅');
      } else {
        throw new Error('No se encontraron resultados');
      }
    } else {
      throw new Error('Error al realizar la búsqueda');
    }
  } catch (error) {
    await m.react('❌');
    m.reply(`❌ *Error:* ${error.message || 'Ocurrió un error desconocido'}`);
  }
};

handler.help = ['xvideosearch'];
handler.tags = ['search', 'fun'];
handler.command = ['xvideosearch', 'xvideosearch'];
handler.register = true;

export default handler;
