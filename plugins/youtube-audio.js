import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!m.quoted) {
    await m.react('✖️');
    return conn.reply(m.chat, `⚠️ Debes etiquetar el mensaje que contenga el resultado de YouTube Play.`, m);
  }

  if (!m.quoted.text.includes("乂  Y O U T U B E  -  P L A Y")) {
    await m.react('✖️');
    return conn.reply(m.chat, `⚠️ El mensaje etiquetado no contiene un resultado de YouTube Play.`, m);
  }

  const urls = m.quoted.text.match(
    new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9_-]+)/, 'gi')
  );

  if (!urls || urls.length < 1) {
    await m.react('✖️');
    return conn.reply(m.chat, `⚠️ No se encontraron enlaces válidos en el mensaje etiquetado.`, m);
  }

  await m.react('🕓');

  const videoUrl = urls[0];
  const apiUrls = [
    `https://axeel.my.id/api/download/audio?url=${videoUrl}`,
    `https://restapi.apibotwa.biz.id/api/ytmp3?url=${videoUrl}`,
    `https://deliriussapi-oficial.vercel.app/download/ytmp3?url=${videoUrl}`
  ];

  let downloadUrl = null;
  let title = "Archivo de YouTube";

  for (const apiUrl of apiUrls) {
    try {
      const response = await fetch(apiUrl);
      const apiData = await response.json();

      if (apiUrl.includes('axeel.my.id') && apiData.metadata?.url) {
        title = apiData.metadata.title || "Archivo MP3";
        downloadUrl = apiData.metadata.url;
        break;
      } else if (apiUrl.includes('apibotwa.biz.id') && apiData.status && apiData.result?.download?.url) {
        title = apiData.result.metadata.title || "Archivo MP3";
        downloadUrl = apiData.result.download.url;
        break;
      } else if (apiUrl.includes('deliriussapi-oficial') && apiData.status && apiData.data?.download?.url) {
        title = apiData.data.download.filename || "Archivo MP3";
        downloadUrl = apiData.data.download.url;
        break;
      }
    } catch (error) {
      console.log(`Error con la API: ${apiUrl}`, error.message);
    }
  }

  if (!downloadUrl) {
    await m.react('✖️');
    return conn.reply(
      m.chat,
      `⚠️ Ocurrió un problema al intentar descargar el audio.\nPor favor, verifica el enlace o inténtalo de nuevo más tarde.`,
      m
    );
  }

  try {
    await conn.sendMessage(
      m.chat,
      {
        audio: { url: downloadUrl },
        fileName: `${title}.mp3`,
        mimetype: 'audio/mp4',
      },
      { quoted: m }
    );
    await m.react('✅');
  } catch (error) {
    console.error('Error al enviar el audio:', error);
    await m.react('✖️');
    conn.reply(m.chat, `⚠️ No se pudo enviar el audio descargado.`, m);
  }
};

handler.help = ['Audio'];
handler.tags = ['downloader'];
handler.customPrefix = /^(Audio|audio)$/i;
handler.command = new RegExp();

export default handler;
