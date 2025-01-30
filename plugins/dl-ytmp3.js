/* 
- Downloader Ytmp4 By DarkCore
- https://whatsapp.com/channel/0029Vaxk8vvEFeXdzPKY8f3F
- Parchado por DarkCore... vip plus
*/

import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  
  if (!text) throw `❌ Proporcióname el enlace de YouTube para que pueda ayudarte. 🎵`;

  await m.react('🕓');

  try {
    const response1 = await fetch(`https://api.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(text)}`);
    const result1 = await response1.json();

    if (result1.status === 200 && result1.success && result1.result && result1.result.download_url) {
      await conn.sendMessage(
        m.chat,
        { 
          audio: { url: result1.result.download_url }, 
          mimetype: 'audio/mpeg', 
          ptt: false 
        },
        { quoted: m }
      );
      await m.react('✅');
      return;
    }

    const response2 = await fetch(`https://dark-core-api.vercel.app/api/download/ytmp3?url=${encodeURIComponent(text)}&type=audio&format=mp3&key=api`);
    const result2 = await response2.json();

    if (result2.success && result2.downloadLink) {
      await conn.sendMessage(
        m.chat,
        { 
          audio: { url: result2.downloadLink }, 
          mimetype: 'audio/mpeg', 
          ptt: false 
        },
        { quoted: m }
      );
      await m.react('✅');
    } else {
      throw new Error('No se pudo obtener el enlace de descarga de ninguna API');
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
