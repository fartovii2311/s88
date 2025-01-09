import fetch from 'node-fetch';

const videoLimit = 300 * 1024 * 1024;

let handler = async (m, { conn, text }) => {
  if (!m.quoted) {
    return conn.reply(m.chat, `⚠️ Debes etiquetar el mensaje que contenga el resultado de YouTube Play.`, m);
  }

  if (!m.quoted.text.includes("乂  Y O U T U B E  -  P L A Y")) {
    return conn.reply(m.chat, `⚠️ El mensaje etiquetado no contiene un resultado de YouTube Play.`, m);
  }

  const urls = m.quoted.text.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|v\/|embed\/|shorts\/|playlist\?list=)|youtu\.be\/)([a-zA-Z0-9_-]{11,})/gi);

  if (!urls || urls.length < 1) {
    return conn.reply(m.chat, `⚠️ No se encontraron enlaces válidos en el mensaje etiquetado.`, m);
  }

  const videoUrl = urls[0];
  await m.react('🕓'); 

  try {
    const apiUrl1 = `https://delirius-apiofc.vercel.app/download/ytmp4?url=${videoUrl}`;
    const response1 = await fetch(apiUrl1);
    const result1 = await response1.json();

    if (result1.status && result1.data) {
      await handleVideoDownload(conn, m, result1.data);
      return; 
    }

    const apiUrl2 = `https://restapi.apibotwa.biz.id/api/ytmp4?url=${videoUrl}`;
    const response2 = await fetch(apiUrl2);
    const result2 = await response2.json();

    if (result2.status && result2.data) {
      await handleVideoDownload(conn, m, result2.data);
      return;
    }

    await conn.reply(m.chat, `⚠️ No se pudo procesar el video. Ambas APIs fallaron.`, m);
  } catch (error) {
    console.error('Error al procesar el video:', error);
    await m.react('✖️');
  }
};

const handleVideoDownload = async (conn, m, data) => {
    const { title, download, duration, image_max_resolution } = data;
    const { url: downloadUrl, size, filename } = download;
  
    const fileSize = Number(size.replace(/[^\d]/g, '')) * 1024;
  
    if (fileSize > videoLimit) {
      await conn.sendMessage(m.chat,
        {
          document: { url: downloadUrl },
          fileName: filename || `${title}.mp4`,
          mimetype: 'video/mp4',
          caption: `⚠️ El archivo supera el límite permitido (${(videoLimit / 1024 / 1024).toFixed(2)} MB). Se envía como documento.\n\n🎥 *Título:* ${title}\n⏱️ *Duración:* ${duration.timestamp}`,
        },
        { quoted: m }
      );
    } else {
      await conn.sendMessage(m.chat,
        {
          video: { url: downloadUrl },
          fileName: filename || `${title}.mp4`,
          mimetype: 'video/mp4',
          caption: `🎥 *Título:* ${title}\n⏱️ *Duración:* ${duration.timestamp}`,
          thumbnail: image_max_resolution ? { url: image_max_resolution } : undefined,
        },
        { quoted: m }
      );
    }
  
    await m.react('✅');
  };
  
handler.help = ['Video'];
handler.tags = ['downloader'];
handler.customPrefix = /^(Video|video|vídeo|Vídeo)/i;
handler.command = new RegExp;

export default handler;
