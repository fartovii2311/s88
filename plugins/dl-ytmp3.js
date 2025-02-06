import fetch from 'node-fetch';
import axios from 'axios';

const handler = async (m, { conn, text }) => {
  if (!text) throw `❌ Proporcióname el enlace de YouTube para que pueda ayudarte. 🎵`;

  await m.react('🕓');

  try {
    const apis = [
      { url: `https://api.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(text)}`, type: 'fetch', key: 'result.download_url' },
      { url: `https://dark-core-api.vercel.app/api/download/ytmp3?url=${encodeURIComponent(text)}&type=audio&format=mp3&key=api`, type: 'fetch', key: 'downloadLink' },
      { url: `https://api.siputzx.my.id/api/d/ytmp3?url=${encodeURIComponent(text)}`, type: 'axios', key: 'data.dl' },
      { url: `https://mahiru-shiina.vercel.app/download/ytmp3?url=${encodeURIComponent(text)}`, type: 'axios', key: 'data.download' }
    ];

    for (const api of apis) {
      try {
        let response;
        if (api.type === 'fetch') {
          const res = await fetch(api.url);
          response = await res.json();
        } else {
          const res = await axios.get(api.url);
          response = res.data;
        }

        const downloadUrl = api.key.split('.').reduce((obj, key) => obj?.[key], response);
        if (downloadUrl) {
          const title = response.data?.title || "YouTube Audio";
          const thumbnail = response.data?.thumbnail || "https://i.imgur.com/YyPH9hZ.jpeg";

          let externalAdReply = {
            showAdAttribution: true,
            mediaType: 2,
            mediaUrl: text,
            title: title,
            sourceUrl: text,
            thumbnail: thumbnail
          };

          await conn.sendMessage(
            m.chat,
            { 
              audio: { url: downloadUrl }, 
              mimetype: 'audio/mpeg', 
              ptt: false, 
              contextInfo: { externalAdReply } 
            },
            { quoted: m }
          );

          await m.react('✅');
          return;
        }
      } catch (err) {
        console.error(`Error en la API: ${api.url}`, err.message);
      }
    }

    throw new Error('No se pudo obtener el enlace de descarga de ninguna API');

  } catch (error) {
    await m.react('❌');
    m.reply(`❌ *Error:* ${error.message || 'Ocurrió un error desconocido'}`);
  }
};

handler.help = ['ytmp3 *<url>*'];
handler.tags = ['dl'];
handler.command = ['ytmp3'];
handler.register = true;

export default handler;
