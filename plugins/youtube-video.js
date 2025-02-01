import fetch from 'node-fetch';

const videoLimit = 40 * 1024 * 1024;
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

  const response = await fetch(`https://api.botcahx.eu.org/api/dowloader/yt?url=${encodeURIComponent(videoUrl)}&apikey=xenzpedo`);
  const result = await response.json();

  if (result.status && result.result && result.result.mp4) {
    const { title, mp4, thumb } = result.result;

    const data = {
      title: title || "Desconocido",
      downloadUrl: mp4,
      duration: "Desconocida",
    };

    const videoResponse = await fetch(mp4);
    const videoBuffer = await videoResponse.buffer();
    
    if (videoBuffer.length > videoLimit) {
      await sendDownloadLinkAsDoc(conn, m, data);
    } else {
      await handleVideoDownload(conn, m, data);
    }

  } else {
    return conn.reply(
      m.chat,
      '❌ No se pudo obtener el enlace de descarga del video. Intenta de nuevo más tarde.',
      m
    );
  }
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

const sendDownloadLinkAsDoc = async (conn, m, data) => {
  const title = data.title || "Desconocido";
  const downloadUrl = data.downloadUrl;
  const docContent = `🎥 *Título:* ${title}\n🔗 *Enlace de descarga:* ${downloadUrl}`;

  try {
    await conn.sendMessage(
      m.chat,
      {
        document: { url: downloadUrl },
        fileName: `${title}.doc`,
        mimetype: 'application/msword',
        caption: docContent,
      },
      { quoted: m }
    );
    await m.react('✅');
  } catch (error) {
    console.error('Error al enviar el archivo .doc:', error);
    await conn.reply(m.chat, '❌ Error al enviar el enlace de descarga como archivo .doc.', m);
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
