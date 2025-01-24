import axios from 'axios';

const handler = async (m, { conn, args }) => {
  try {
    const query = args[0];
    if (!query) return conn.reply(m.chat,'🔥 *Ejemplo:* .ytmp3 <URL de YouTube>',m,rcanal);

    // URL de la API para descargar el audio
    const apiUrl = `https://api.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(query)}`;
    const response = await axios.get(apiUrl);

    // Comprobar si los datos de respuesta contienen download_url
    if (!response.data?.result?.download_url) {
      return m.reply('🚫 *Error al obtener el audio.* Verifica la URL o intenta nuevamente más tarde.');
    }

    // Extraer detalles del audio
    const { title, quality, thumbnail, download_url } = response.data.result;

    // Preparar el texto para el documento de audio
    const caption = `*\`Título:\`* ${title}
*\`Calidad:\`* ${quality}
*\`Miniatura:\`* ${thumbnail}`;

    // Enviar el audio como un documento
    await conn.sendMessage(m.chat, {
      document: { url: download_url },
      fileName: `${title}.mp3`,
      mimetype: 'audio/mpeg',
      caption: caption,
    }, { quoted: m });
    
  } catch (error) {
    console.error('Error en el comando ytmp3:', error.message);
    m.reply('⚠️ *Ocurrió un error al procesar tu solicitud.* Por favor, intenta nuevamente más tarde.');
  }
};

handler.help = ['ytmp3doc'];
handler.tags = ['dl'];
handler.command = /^ytmp3doc|ytadoc$/i;
handler.register = true;
handler.Monedas = 3
export default handler;
