import axios from 'axios';
const handler = async (m, { conn, args }) => {
  try {
    const query = args[0];
    if (!query) return conn.reply(m,chat,'🔥 *Ejemplo:* .ytmp4 <URL de YouTube>',m,rcanal);
    await m.react('🕓');
    const apiUrl = `https://api.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(query)}`;
    const response = await axios.get(apiUrl);

    if (!response.data?.result?.download_url) {
      return m.reply('🚫 *Error al obtener el video.* Verifica la URL o intenta nuevamente más tarde.');
    }

    const { title, quality, thumbnail, download_url } = response.data.result;

    const caption = `*\`Título:\`* ${title}
*\`Calidad:\`* ${quality}
*\`Miniatura:\`* ${thumbnail}
*\`Descargar el video:\`* ${download_url}`;

    await conn.sendMessage(m.chat, {
      document: { url: download_url },
      fileName: `${title}.mp4`,
      mimetype: 'video/mp4',
      caption: caption,
    }, { quoted: m });
  await m.react('✅'); 
  } catch (error) {
    await m.react('❌'); 
    console.error('Error en el comando ytmp4:', error.message);
    m.reply('⚠️ *Ocurrió un error al procesar tu solicitud.* Por favor, intenta nuevamente más tarde.');
  }
};

handler.help = ['ytmp4doc'];
handler.tags = ['dl'];
handler.command = /^ytmp4doc$/i;
handler.register = true;
handler.Monedas = 3
export default handler
