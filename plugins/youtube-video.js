import fetch from 'node-fetch';

const videoLimit = 300 * 1024 * 1024; // 300 MB
const tempDir = './tmp';

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

  const videoUrl = urls[0];
  await m.react('🕓');

  const apiUrls = [
    `https://api.vreden.web.id/api/ytmp4?url=${videoUrl}`,
    `https://delirius-apiofc.vercel.app/download/ytmp4?url=${videoUrl}`,
    `https://api.siputzx.my.id/api/d/ytmp4?url=${videoUrl}`,
    `https://api.davidcyriltech.my.id/download/ytmp4?url=${videoUrl}`,
  ];

  let data = null;

  // Intentar obtener los datos de las APIs en el orden especificado
  for (const apiUrl of apiUrls) {
    try {
      const response = await fetch(apiUrl);
      const result = await response.json();

      if (result.success && result.downloadLink) {
        data = {
          title: result.downloadLink.split('/').pop(), // O cualquier otro método para extraer el título
          downloadUrl: result.downloadLink,
          duration: "Desconocida", // Puedes ajustarlo si la API devuelve la duración
        };
        break; // Si la API responde correctamente, salimos del ciclo
      }
    } catch (error) {
      console.error(`Error al intentar con la API: ${apiUrl}`, error.message);
    }
  }

  if (!data) {
    return conn.reply(
      m.chat,
      '❌ No se pudo obtener el enlace de descarga del video. Intenta de nuevo más tarde.',
      m
    );
  }

  await handleVideoDownload(conn, m, data);
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
handler.Monedas = 1;
handler.command = new RegExp;

export default handler;
