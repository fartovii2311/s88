import fetch from 'node-fetch';

const tempStorage = {};

let handler = async (m, { conn, text }) => {
  if (!['❤️', '🎶', 'audio'].includes(text)) return;

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

  const userVideoData = tempStorage[m.sender];
  if (!userVideoData || !userVideoData.url) {
    return conn.reply(m.chat, `⚠️ No se encontró información previa para procesar el comando. Asegúrate de etiquetar el mensaje correcto.`, m);
  }

  try {
    await m.react('🕓');
    const { url, title } = userVideoData;

    const apiUrls = [
      `https://api.vreden.web.id/api/ytmp3?url=${url}`,
      `https://delirius-apiofc.vercel.app/download/ytmp3?url=${url}`
    ];

    let downloadUrl = null;
    let quality = "128kbps";

    for (const apiUrl of apiUrls) {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === 200 || data.success) {
          const result = data.result || data.data;
          downloadUrl = result.download?.url || result.download;
          quality = result.quality || result.duration || "128kbps";
          if (downloadUrl) break;
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (!downloadUrl) {
      await m.react('✖️');
      return conn.reply(m.chat, `⚠️ No se pudo obtener el enlace de descarga para el audio.`, m);
    }

    const response = await fetch(downloadUrl);
    const buffer = await response.buffer();

    const caption = `🎵 *Título:* ${title}\n📦 *Calidad:* ${quality}`;

    await conn.sendMessage(
      m.chat,
      { audio: buffer, fileName: `${title}.mp3`, mimetype: 'audio/mpeg', caption },
      { quoted: m }
    );

    await m.react('✅');
  } catch (error) {
    console.log(error);
    await m.react('✖️');
    conn.reply(m.chat, `⚠️ Ocurrió un error al procesar tu solicitud.`, m);
  }
};

handler.help = ['Audio'];
handler.tags = ['downloader'];
handler.customPrefix = /^(❤️|💖|🎵|audio|Audio)$/i;
handler.command = new RegExp;

export default handler;
