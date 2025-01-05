import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, '❀ Ingresa un link de YouTube.', m);

  await m.react('🕓');

  try {
    let api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp4?url=${text}`);
    let json = await api.json();

    if (!json.data || !json.data.download) {
      throw new Error('No se pudo obtener la información del video.');
    }

    let title = json.data.metadata.title;
    let dl_url = json.data.download.url;
    let fileSize = json.data.download.size || null; // Si la API proporciona tamaño.

    const sizeLimit = 50 * 1024 * 1024; // 50 MB

    if (fileSize && parseInt(fileSize) > sizeLimit) {
      // Enviar como documento si el tamaño excede el límite
      await conn.sendMessage(m.chat, {
        document: { url: dl_url },
        fileName: `${title}.mp4`,
        mimetype: 'video/mp4',
        caption: `El archivo es demasiado grande para enviarlo como video, por lo que se envía como documento.\n\n*Título:* ${title}`
      }, { quoted: m });
    } else {
      // Enviar como video directamente
      await conn.sendMessage(m.chat, {
        video: { url: dl_url },
        fileName: `${title}.mp4`,
        mimetype: 'video/mp4',
        caption: `*Título:* ${title}`
      }, { quoted: m });
    }

    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('❌');
    conn.reply(m.chat, '❀ Hubo un error al procesar tu solicitud. Por favor, intenta nuevamente más tarde.', m);
  }
};

handler.help = ["ytmp4 *<url>*"];
handler.tags = ['dl'];
handler.command = ['ytmp4'];
handler.register = true;

export default handler;
