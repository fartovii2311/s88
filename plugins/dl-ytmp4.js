import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(m.chat, '❀ Ingresa un enlace de YouTube válido.', m, rcanal);
  }

  await m.react('🕓');

  try {
    let apiResponse;
    let title, dl_url, fileSizeStr, sizeBytes, sizeLimit = 50 * 1024 * 1024;
    
    try {
      const response1 = await fetch(`https://axeel.my.id/api/download/video?url=${text}`);
      apiResponse = await response1.json();

      title = apiResponse.metadata.title || 'Video sin título';
      dl_url = apiResponse.downloads.url;
      fileSizeStr = apiResponse.downloads.size || null;
      sizeBytes = fileSizeStr ? parseFloat(fileSizeStr) * 1024 * 1024 : null;
    } catch (err) {
      const response2 = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp4?url=${text}`);
      apiResponse = await response2.json();

      const metadata = apiResponse.data.metadata;
      const download = apiResponse.data.download;

      title = metadata.title || 'Video sin título';
      dl_url = download.url;
      fileSizeStr = download.quality || null;
      sizeBytes = null;
    }

    if (!dl_url) {
      const response3 = await fetch(`https://api.vreden.web.id/api/ytmp4?url=${text}`);
      apiResponse = await response3.json();

      if (apiResponse.status && apiResponse.result.status) {
        const metadata = apiResponse.result.metadata;
        title = metadata.title || 'Video sin título';
        dl_url = apiResponse.result.download.url;
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
