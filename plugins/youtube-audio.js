import fetch from 'node-fetch';

const tempStorage = {}; // Simulación de almacenamiento temporal para el usuario

let handler = async (m, { conn, text }) => {
  // Verifica si el texto es uno de los permitidos para audio
  if (!['❤️', '🎶', 'audio'].includes(text)) return;

  // Obtén los datos temporales del usuario
  const userVideoData = tempStorage[m.sender];
  if (!userVideoData || !userVideoData.url) {
    return conn.reply(m.chat, `⚠️ No se encontró información previa para procesar el comando. Asegúrate de etiquetar el mensaje correcto.`, m);
  }

  try {
    // Procesar audio
    await m.react('🕓'); // Indica que está procesando
    const { url, title } = userVideoData;

    const apiUrls = [
      `https://api.vreden.web.id/api/ytmp3?url=${url}`,
      `https://delirius-apiofc.vercel.app/download/ytmp3?url=${url}`
    ];

    let downloadUrl = null;
    let quality = "128kbps";

    // Obtener el enlace de descarga
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

    // Si no se obtiene un enlace válido, muestra error
    if (!downloadUrl) {
      await m.react('✖️');
      return conn.reply(m.chat, `⚠️ No se pudo obtener el enlace de descarga para el audio.`, m);
    }

    // Descargar y enviar audio
    const response = await fetch(downloadUrl);
    const buffer = await response.buffer();

    const caption = `
🎵 *Título:* ${title}
📦 *Calidad:* ${quality}`.trim();

    await conn.sendMessage(
      m.chat,
      { audio: buffer, fileName: `${title}.mp3`, mimetype: 'audio/mpeg', caption },
      { quoted: m }
    );

    await m.react('✅'); // Completo
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
