import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(m.chat, '❀ Ingresa un enlace de YouTube válido.', m,rcanal);
  }

  await m.react('🕓');

  try {
    const api = await fetch(`https://axeel.my.id/api/download/video?url=${text}`);
    const title = json.metadata.title || 'Video sin título';
    const dl_url = json.downloads.url;
    const fileSizeStr = json.downloads.size || null;
    const sizeBytes = fileSizeStr ? parseFloat(fileSizeStr) * 1024 * 1024 : null;
    const sizeLimit = 50 * 1024 * 1024;
    const sendAsDocument = sizeBytes && sizeBytes > sizeLimit;

    const options = {
      [sendAsDocument ? 'document' : 'video']: { url: dl_url },
      fileName: `${title}.mp4`,
      mimetype: json.downloads.mimetype || 'video/mp4',
      caption: sendAsDocument
        ? `⚠️ El archivo es demasiado grande para enviarlo como video, se envía como documento.\n\n*Título:* ${title}\n*Tamaño:* ${fileSizeStr}`
        : `🎥 *Título:* ${title}\n*Tamaño:* ${fileSizeStr}`
    };

    await conn.sendMessage(m.chat, options, { quoted: m });
    await m.react('✅');
  } catch (error) {
    console.error(`❌ Error:`, error.message);
    await m.react('❌');
  }
};

handler.help = ["ytmp4 *<url>*"];
handler.tags = ['dl'];
handler.command = ['ytmp4'];
handler.register = true;

export default handler;
