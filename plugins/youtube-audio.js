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
  const apiUrl = `https://axeel.my.id/api/download/audio?url=${videoUrl}`;

  let downloadUrl = null;
  let title = "Archivo de YouTube";
  let size = null;

  try {
    const response = await fetch(apiUrl);
    const apiData = await response.json();

    if (apiData && apiData.downloads?.url) {
      title = apiData.metadata?.title || "Archivo MP3";
      downloadUrl = apiData.downloads.url;
      size = apiData.downloads.size || "desconocido";
    } else {
      console.log("No se pudo obtener un enlace de descarga válido. Datos de la API:", apiData);
    }
  } catch (error) {
    console.error(`Error con la API: ${apiUrl}`, error.message);
  }

  if (!downloadUrl) {
    return conn.reply(m.chat, `⚠️ No se pudo obtener el audio del video.`, m);
  }

  try {
    await conn.sendMessage(m.chat, {
      audio: { url: downloadUrl },
      fileName: `${title}.mp3`,
      mimetype: 'audio/mpeg',
    }, { quoted: m });

    await m.react('✅');
  } catch (error) {
    console.error('Error al enviar el audio:', error);
    await m.react('✖️');
  }
};

handler.help = ['Audio'];
handler.tags = ['downloader'];
handler.customPrefix = /^(Audio|audio)$/i;
handler.command = new RegExp;

export default handler;
