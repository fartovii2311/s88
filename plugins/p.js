import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, 'Por favor, proporciona la URL de la página del APK.', m);
  }

  try {
    const apiUrl = `https://dark-core-api.vercel.app/api/download/getapk?key=user1&url=${encodeURIComponent(text)}`;
    const response = await axios.get(apiUrl);
    
    if (!response.data.success) {
      return conn.reply(m.chat, 'No se pudieron obtener los detalles del APK.', m);
    }

    const apkDetails = response.data.data;

    const message = `
      Título: ${apkDetails.title}
      Versión: ${apkDetails.version}
      Categoría: ${apkDetails.category}
      Enlace de descarga: ${apkDetails.downloadLink}
    `;

    await conn.reply(m.chat, message, m);
    await conn.sendFile(m.chat, apkDetails.downloadLink, `${apkDetails.title}.apk`, '', m);
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, 'Hubo un error al obtener los detalles del APK. Intenta nuevamente más tarde.', m);
  }
};

handler.help = ['apk4 <url>'];
handler.tags = ['dl'];
handler.command = ['apk4'];
export default handler;
