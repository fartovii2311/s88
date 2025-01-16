import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!m.quoted) {
    return conn.reply(m.chat, `⚠️ Debes etiquetar el mensaje que contenga el resultado de YouTube Play.`, m);
  }

  if (!m.quoted.text.includes("乂  Y O U T U B E  -  P L A Y")) {
    return conn.reply(m.chat, `⚠️ El mensaje etiquetado no contiene un resultado de YouTube Play.`, m);
  }

  const urls = m.quoted.text.match(/(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?v=|v\/|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/gi);

  if (!urls || urls.length < 1) {
    return conn.reply(m.chat, `⚠️ No se encontraron enlaces válidos en el mensaje etiquetado.`, m);
  }

  await m.react('🕓'); // Emoji de reloj mientras procesa

  const videoUrl = urls[0];
  const apiUrls = [
    `https://api.vreden.web.id/api/ytmp3?url=${videoUrl}`,
    `https://delirius-apiofc.vercel.app/download/ytmp3?url=${videoUrl}`
  ];

  let downloadUrl = null;
  let title = "Archivo de YouTube";
  let size = "Desconocido";
  let image = null;

  for (const apiUrl of apiUrls) {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status === 200 || data.success) {
        const result = data.result || data.data;

        title = result.title || result.metadata?.title || "Archivo MP3";
        downloadUrl = result.download?.url || result.download;
        size = result.quality || result.duration || "128kbps";
        image = result.image || result.metadata?.image;

        if (downloadUrl) break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!downloadUrl) {
    await m.react('✖️'); // Emoji de error si no encuentra un enlace de descarga
    return conn.reply(m.chat, `⚠️ No se pudo obtener el enlace de descarga.`, m);
  }

  try {
    const response = await fetch(downloadUrl);
    const buffer = await response.buffer();
    const fileSizeInMB = buffer.length / (1024 * 1024);

    const caption = `
🎵 *Título:* ${title}
📦 *Calidad:* ${size}`.trim();

    if (fileSizeInMB > 16) {
      await conn.sendMessage(
        m.chat,
        {
          document: buffer,
          fileName: `${title}.mp3`,
          mimetype: 'audio/mpeg',
          caption: caption,
        },
        { quoted: m }
      );
    } else {
      await conn.sendMessage(
        m.chat,
        {
          audio: buffer,
          fileName: `${title}.mp3`,
          mimetype: 'audio/mpeg',
        },
        { quoted: m }
      );
    }

    await m.react('❤️');
  } catch (error) {
    console.log(error);
    await m.react('✖️'); 
  }
};

handler.help = ['Audio'];
handler.tags = ['downloader'];
handler.customPrefix = /^(❤️|💖|🎵|audio|Audio)$/i;
handler.command = new RegExp;

export default handler;
