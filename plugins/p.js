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

    const apkData = response.data.data;
    const downloadUrl = apkData.downloadLink;

    const extension = downloadUrl.split('.').pop().split('?')[0] || 'apk';
    const fileName = `${apkData.title}.${extension}`;

    const message = `
      📦 *Título:* ${apkData.title}
      🔢 *Versión:* ${apkData.version}
      🏷️ *Categoría:* ${apkData.category}
      ⬇️ *Descargando...*
    `;
    await conn.reply(m.chat, message, m);

    await conn.sendMessage(m.chat, {
      document: { url: downloadUrl },
      mimetype: 'application/vnd.android.package-archive',
      fileName: fileName,
      caption: null
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, 'Hubo un error al obtener o enviar el archivo. Intenta nuevamente más tarde.', m);
  }
};

handler.help = ['apk2 <url>'];
handler.tags = ['descarga'];
handler.command = ['apk2', 'apkdescarga2'];
export default handler;
