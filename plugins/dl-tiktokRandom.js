import fetch from 'node-fetch';

const handler = async (m, { conn }) => {
  await m.react('🕓');

  try {
    const response = await fetch('https://dark-core-api.vercel.app/api/random/tiktok?key=user1');
    const result = await response.json();

    if (result.success && result.result && result.result.url) {
      const { url } = result.result;

      await conn.sendMessage(
        m.chat,
        { 
          video: { url } 
        },
        { quoted: m }
      );

      await m.react('✅');
    } else {
      throw new Error('No se pudo obtener un video de TikTok');
    }
  } catch (error) {
    await m.react('❌');
    m.reply(`❌ *Error:* ${error.message || 'Ocurrió un error desconocido'}`);
  }
};

handler.help = ['tiktokrandom'];
handler.tags = ['dl'];
handler.command = ['tiktokrandom', 'tiktokrand'];
handler.register = true;

export default handler;
