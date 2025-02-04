import fetch from 'node-fetch';

const videoLimit = 40 * 1024 * 1024;

let handler = async (m, { conn, text }) => {
  if (!m.quoted) {
    return conn.reply(m.chat, `🚩 Etiqueta el mensaje que contenga el resultado de YouTube Play.`, m);
  }

  if (!m.quoted.text.includes("🎬 *‌乂 Y O U T U B E  -  P L A Y 乂* 🎬")) {
    return conn.reply(m.chat, `🚩 Etiqueta el mensaje que contenga el resultado de YouTube Play.`, m);
  }

  const urls = m.quoted.text.match(
    /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/gi
  );

  if (!urls || urls.length === 0) {
    return conn.reply(m.chat, '❌ No se encontró un enlace de YouTube en el mensaje etiquetado.', m);
  }

  const videoUrl = urls[0];
  await m.react('🕓');

  let downloadData = await tryApiFetch(videoUrl);

  if (!downloadData) {
    return conn.reply(m.chat, '❌ No se pudo obtener el enlace de descarga del video. Intenta de nuevo más tarde.', m);
  }

  await handleVideoDownload(conn, m, downloadData);
};

const tryApiFetch = async (videoUrl) => {
  const apiUrls = [
    `https://api.botcahx.eu.org/api/dowloader/yt?url=${encodeURIComponent(videoUrl)}&apikey=xenzpedo`,
    `https://delirius-apiofc.vercel.app/download/ytmp4?url=${encodeURIComponent(videoUrl)}`,
    `https://api.siputzx.my.id/api/d/ytmp4?url=${encodeURIComponent(videoUrl)}`,
  ];

  for (const apiUrl of apiUrls) {
    try {
      const response = await fetch(apiUrl);
      const result = await response.json();

      if (result.status && result.data && result.data.download) {
        const { title, download } = result.data;
        return {
          title: title || "Desconocido",
          downloadUrl: download, // Ahora usamos directamente la URL de descarga que da la API
        };
      }
    } catch (error) {
      console.error(`Error al intentar con la API: ${apiUrl}`, error.message);
    }
  }

  return null;
};

const handleVideoDownload = async (conn, m, data) => {
  const title = data.title || "Desconocido";
  const downloadUrl = data.downloadUrl;

  try {
    await conn.sendMessage(
      m.chat,
      {
        video: { url: downloadUrl },
        fileName: `${title}.mp4`,
        mimetype: 'video/mp4',
        caption: `🎥 *Título:* ${title}\n⏱️ *Duración:* Desconocida`,
      },
      { quoted: m }
    );
    await m.react('✅');
  } catch (error) {
    console.error('Error al manejar el video:', error);
    await conn.reply(m.chat, '❌ Error al descargar o procesar el video.', m);
    await m.react('✖️');
  }
};

handler.help = ['video'];
handler.tags = ['dl'];
handler.customPrefix = /^(VIDEO|Video|video|vídeo|Vídeo)/;
handler.register = true;
handler.Monedas = 5;
handler.command = new RegExp;

export default handler;
