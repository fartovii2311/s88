import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  await m.react('✖️');
  if (!text) throw `❌ Proporcióname el enlace de YouTube para que pueda ayudarte. 🎵`;

  await m.react('🕓');

  try {
    const response = await fetch(`https://api.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(text)}`);
    const result = await response.json();

    if (result.status === 200 && result.success && result.result && result.result.download_url) {
      await conn.sendMessage(
        m.chat,
        { 
          audio: { url: result.result.download_url }, 
          mimetype: 'audio/mpeg', 
          ptt: false 
        },
        { quoted: m }
      );
      await m.react('✅');
    } else {
      throw new Error('No se pudo obtener el enlace de descarga');
    }
  } catch (error) {
    await m.react('❌');
    m.reply(`❌ *Error:* ${error.message || 'Ocurrió un error desconocido'}`);
  }
};

handler.help = ['ytmp3 *<url>*'];
handler.tags = ['dl'];
handler.command = ['ytmp3'];
handler.register = true;
handler.Monedas = 3;

export default handler;
