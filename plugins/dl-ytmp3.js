import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(m.chat, `☁️ Ingresa un enlace de YouTube válido.`, m);
  }

  await m.react('🕓');

  const apiUrl = `https://axeel.my.id/api/download/audio?url=${text}`;

  try {
    const response = await fetch(apiUrl);
    const json = await response.json();
    const metadata = json.metadata;
    const downloads = json.downloads;

    const downloadUrl = downloads.url;
    const title = metadata.title || "Archivo MP3";

    // Validar el archivo descargado
    const audioResponse = await fetch(downloadUrl);
    const contentLength = audioResponse.headers.get('content-length');
    
    // Enviar el archivo al usuario
    await m.react('✅');
    await conn.sendMessage(
      m.chat,
      {
        audio: { url: downloadUrl },
        fileName: `${title}.mp3`,
        mimetype: 'audio/mpeg',
      },
      { quoted: m }
    );
  } catch (error) {
    console.error(`⚠️ Error:`, error.message);
    await m.react('❌');
    conn.reply(m.chat, `⚠️ No se pudo procesar el enlace. Verifica el enlace o intenta más tarde.`, m);
  }
};

handler.help = ['ytmp3 *<url>*'];
handler.tags = ['dl'];
handler.command = ['ytmp3'];

export default handler;
