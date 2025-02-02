import axios from 'axios';

const handler = async (m, { conn, args }) => {
   const query = args[0];
    if (!query) {
      return conn.reply(m.chat, '🔥 *Ejemplo:* .ytmp4 <URL de YouTube>', m,rcanal);
    }

    try {
     await m.react('🕓');

     let apiUrl = `https://apidl.asepharyana.cloud/api/downloader/ytmp4?url=${encodeURIComponent(query)}&quality=360`;
     let response = await axios.get(apiUrl);

    if (!response.data?.result?.download_url) {
      apiUrl = `https://api.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(query)}`;
      response = await axios.get(apiUrl);

      if (!response.data?.result?.download_url) {
        return m.reply('🚫 *Error al obtener el video.* Verifica la URL o intenta nuevamente más tarde.');
      }
    }

    const { title, quality, thumbnail, download_url } = response.data.result;

    const caption = `*\`Título:\`* ${title}
*\`Calidad:\`* ${quality}
*\`Miniatura:\`* ${thumbnail}`;

    await conn.sendMessage(m.chat, {
      document: { url: download_url },
      fileName: `${title}.mp4`,
      mimetype: 'video/mp4',
      caption: caption,
    }, { quoted: m });

    await m.react('✅');
  } catch (error) {
    console.error('Error en el comando ytmp3:', error.message);
    await m.react('❌');
  }
};

handler.help = ['ytmp4doc *<url>*''];
handler.tags = ['dl'];
handler.command = /^ytmp4doc$/i;
handler.register = true;
handler.Monedas = 3;

export default handler;
