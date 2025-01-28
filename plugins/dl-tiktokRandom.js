import fetch from 'node-fetch';

const handler = async (m, { conn }) => {
  await m.react('🕓');  // Reacción para indicar que está procesando

  try {
    const response = await fetch('https://dark-core-api.vercel.app/api/random/tiktok?key=user1');
    const result = await response.json();

    if (result.success && result.result && result.result.url) {
      const videoUrl = result.result.url;  // Obtiene la URL del video

      await conn.sendMessage(m.chat, {
        video: { url: videoUrl }, 
        caption: 'Video de TikTok aleatorio' 
      }, { quoted: m });

      await m.react('✅');  // Reacción de éxito
    } else {
      throw new Error('No se encontró un video válido');
    }
  } catch (error) {
    await m.react('❌');  // Reacción de error
    m.reply(`❌ *Error:* ${error.message || 'Ocurrió un error desconocido'}`);
  }
};

handler.help = ['tiktokrandom'];
handler.tags = ['dl', 'fun'];
handler.command = ['tiktokrandom', 'tiktokrand'];
handler.register = true;

export default handler;
