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
  const apiUrl = `https://api.vreden.web.id/api/ytmp3?url=${videoUrl}`;

  let downloadUrl = null;
  let title = "Archivo de YouTube";
  let size = "Desconocido";
  let image = null;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === 200 && data.result?.download?.url) {
      const result = data.result;
      const download = result.download;

      title = result.metadata?.title || "Archivo MP3";
      downloadUrl = download.url || null;
      size = download.quality || "128kbps";
      image = result.metadata?.image || null;
    } else {
      return conn.reply(m.chat, `⚠️ Error al procesar el enlace: ${videoUrl}`, m);
    }
  } catch (error) {
    console.error("Error con la API", error.message);
    return conn.reply(m.chat, `⚠️ Ocurrió un error al contactar con la API.`, m);
  }

  try {
    const caption = `
🎵 *Título:* ${title}
📦 *Calidad:* ${size}
🌐 *Enlace:* ${videoUrl}`.trim();

    await conn.sendMessage(m.chat,
      {
        audio: { url: downloadUrl },
        fileName: `${title}.mp3`,
        mimetype: 'audio/mpeg',
        caption: caption,
      },
      { quoted: m }
    );

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
