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

  await m.react('🕓'); // Reacciona con un reloj para indicar que está procesando

  const videoUrl = urls[0];
  const apiUrl = `https://restapi.apibotwa.biz.id/api/ytmp3?url=${videoUrl}`;

  let downloadUrl = null;
  let title = "Archivo de YouTube";
  let size = null;
  let thumbnail = null;

  try {
    const response = await fetch(apiUrl);
    const apiData = await response.json();

    if (apiData.status === 200 && apiData.result.download?.status) {
      const metadata = apiData.result.metadata;
      const download = apiData.result.download;

      title = metadata.title || "Archivo MP3";
      thumbnail = metadata.thumbnail || null;
      downloadUrl = download.url || null;
      size = download.quality || "desconocido";
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
      caption: `🎵 *Título:* ${title}\n📦 *Calidad:* ${size}\n🌐 *Enlace:* ${videoUrl}`,
      fileName: `${title}.mp3`,
      mimetype: 'audio/mpeg',
    }, { quoted: m });

    await m.react('✅'); 
  } catch (error) {
    console.error('Error al enviar el audio:', error);
    await m.react('✖️'); 
  }
};

// Configuración del handler
handler.help = ['Audio'];
handler.tags = ['downloader'];
handler.customPrefix = /^(Audio|audio)$/i;
handler.command = new RegExp;

export default handler;
