import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!m.quoted) {
    return conn.reply(m.chat, `⚠️ Debes etiquetar el mensaje que contenga el resultado de YouTube Play.`, m);
  }

  if (!m.quoted.text.includes("乂  Y O U T U B E  -  P L A Y")) {
    return conn.reply(m.chat, `⚠️ El mensaje etiquetado no contiene un resultado de YouTube Play.`, m);
  }

  const urls = m.quoted.text.match(
    /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9_-]+)/gi
  );

  if (!urls || urls.length < 1) {
    return conn.reply(m.chat, `⚠️ No se encontraron enlaces válidos en el mensaje etiquetado.`, m);
  }

  await m.react('🕓');

  const videoUrl = urls[0];
  const apiUrl1 = `https://restapi.apibotwa.biz.id/api/ytmp3?url=${videoUrl}`;
  const apiUrl2 = `https://delirius-apiofc.vercel.app/download/ytmp3?url=${videoUrl}`;

  let downloadUrl = null;
  let title = "Archivo de YouTube";
  let size = "Desconocido";
  let image = null;

  try {
    const response1 = await fetch(apiUrl1);
    const data1 = await response1.json();

    if (data1.status === 200 && data1.result.download?.status) {
      const metadata = data1.result.metadata;
      const download = data1.result.download;

      title = metadata.title || "Archivo MP3";
      downloadUrl = download.url || null;
      size = download.quality || "Desconocido";
    } else {
      const response2 = await fetch(apiUrl2);
      const data2 = await response2.json();

      if (data2.status && data2.data?.download?.url) {
        const download = data2.data.download;

        title = data2.data.title || "Archivo MP3";
        downloadUrl = download.url || null;
        size = download.size || "Desconocido";
        image = data2.data.image || null;
      }
    }
  } catch (error) {
    console.error("Error con las APIs", error.message);
  }

  if (!downloadUrl) {
    await m.react('✖️');
    return conn.reply(m.chat, `⚠️ No se pudo obtener un enlace de descarga válido.`, m);
  }

  try {
    const caption = `
🎵 *Título:* ${title}
📦 *Tamaño:* ${size}
🌐 *Enlace:* ${videoUrl}
    `.trim();

    const options = {
      audio: { url: downloadUrl },
      caption,
      fileName: `${title}.mp3`,
      mimetype: 'audio/mpeg',
    };

    if (image) {
      options.thumbnail = { url: image };
    }

    await conn.sendMessage(m.chat, options, { quoted: m });
    await m.react('✅');
  } catch (error) {
    console.error("Error al enviar el audio", error);
    await m.react('✖️');
  }
};

handler.help = ['Audio'];
handler.tags = ['downloader'];
handler.customPrefix = /^(Audio|audio)$/i;
handler.command = new RegExp;

export default handler;
