import fetch from 'node-fetch';

const handler = async (m, { conn }) => {
  await m.react('🕓');  // Reacción para indicar que está procesando

  try {
    const response = await fetch('https://dark-core-api.vercel.app/api/random/tiktok?key=user1');

    // Verificar si la respuesta es JSON antes de procesarla
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const result = await response.json();

      if (result.success && result.result && result.result.url) {
        const videoUrl = result.result.url;

        await conn.sendMessage(m.chat, {
          video: { url: videoUrl }, 
        }, { quoted: m });

        await m.react('✅');  
      } else {
        throw new Error('No se encontró un video válido');
      }
    } else {
      throw new Error('La respuesta no es un JSON válido');
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
