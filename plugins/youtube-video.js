import fetch from 'node-fetch';

const limit = 300 * 1024 * 1024; // Límite de 300 MB

let handler = async (m, { conn, text }) => {
  if (!m.quoted) {
    return conn.reply(m.chat, `⚠️ Debes etiquetar el mensaje que contenga el resultado de YouTube Play.`, m);
  }

  if (!m.quoted.text.includes("乂  Y O U T U B E  -  P L A Y")) {
    return conn.reply(m.chat, `⚠️ El mensaje etiquetado no contiene un resultado de YouTube Play.`, m);
  }

  const urls = m.quoted.text.match(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9_-]+)/gi);

  if (!urls || urls.length < 1) {
    return conn.reply(m.chat, `⚠️ No se encontraron enlaces válidos en el mensaje etiquetado.`, m);
  }

  await m.react('🕓');

  try {
    const apiUrl = `https://axeel.my.id/api/download/video?url=${urls[0]}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    const { title, thumbnail, duration } = data.metadata;
    const { url: downloadUrl, size, mimetype } = data.downloads;

    if (Number(size.replace(/[^0-9]/g, '')) > limit) {
  
      await conn.sendMessage(
        m.chat,
        {
          document: { url: downloadUrl },
          fileName: `${title}.mp4`,
          mimetype: mimetype || 'video/mp4',
          caption: `🎥 *Título:* ${title}\n⏱️ *Duración:* ${duration}s\n📦 *Nota:* El archivo supera los 300 MB, enviado como documento.`,
        },
        { quoted: m }
      );
    } else {
      await conn.sendMessage(m.chat,
        {
          video: { url: downloadUrl },
          fileName: `${title}.mp4`,
          mimetype: mimetype || 'video/mp4',
          caption: `🎥 *Título:* ${title}\n⏱️ *Duración:* ${duration}s`,
          thumbnail: thumbnail?.url ? { url: thumbnail.url } : null,
        },
        { quoted: m }
      );
    }

    await m.react('✅'); 
  } catch (error) {
    console.error('Error al procesar el video:', error);
    await m.react('✖️'); 
  }
};

handler.help = ['Video'];
handler.tags = ['downloader'];
handler.customPrefix = /^(Video|video|vídeo|Vídeo)/i;
handler.command = new RegExp;

export default handler;
