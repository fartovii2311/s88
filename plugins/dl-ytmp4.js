import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(m.chat, '❀ Ingresa un enlace de YouTube válido.', m,rcanal);
  }

  await m.react('🕓');

  try {
    let title, dl_url, fileSizeStr, sizeBytes;
    const sizeLimit = 50 * 1024 * 1024; 

    const apiUrls = [
      `https://api.vreden.web.id/api/ytmp4?url=${text}`,
      `https://delirius-apiofc.vercel.app/download/ytmp4?url=${text}`,
      `https://api.siputzx.my.id/api/d/ytmp4?url=${text}`
    ];

    for (const apiUrl of apiUrls) {
      try {
        const response = await fetch(apiUrl);
        const apiResponse = await response.json();

        if (apiResponse.status && apiResponse.result?.download) {
          const metadata = apiResponse.result.metadata;
          title = metadata.title || 'Video sin título';
          dl_url = apiResponse.result.download.url;
          fileSizeStr = metadata.size || null;
          sizeBytes = fileSizeStr ? parseFloat(fileSizeStr) * 1024 * 1024 : null;
          break;
        } else if (apiResponse.success && apiResponse.data?.download) {
          const metadata = apiResponse.data.metadata;
          title = metadata.title || 'Video sin título';
          dl_url = apiResponse.data.download.url;
          fileSizeStr = metadata.size || null;
          sizeBytes = fileSizeStr ? parseFloat(fileSizeStr) * 1024 * 1024 : null;
          break;
        } else if (apiResponse.status && apiResponse.data?.dl) {
          title = apiResponse.data.title || 'Video sin título';
          dl_url = apiResponse.data.dl;
          sizeBytes = null; 
          break;
        }
      } catch (err) {
        console.error(`Error al intentar con la API: ${apiUrl}`, err.message);
      }
    }

    const sendAsDocument = sizeBytes && sizeBytes > sizeLimit;

    const options = {
      [sendAsDocument ? 'document' : 'video']: { url: dl_url },
      fileName: `${title}.mp4`,
      mimetype: 'video/mp4',
      caption: sendAsDocument
        ? `⚠️ El archivo es demasiado grande para enviarlo como video, se envía como documento.\n\n*Título:* ${title}`
        : `🎥 *Título:* ${title}`
    };

    await conn.sendMessage(m.chat, options, { quoted: m });
    await m.react('✅');
  } catch (error) {
    console.error('❌ Error:', error.message);
    await m.react('❌');
  }
};

handler.help = ["ytmp4 *<url>*"];
handler.tags = ['dl'];
handler.command = ['ytmp4'];
handler.register = true;

export default handler;
