import fetch from 'node-fetch';

const handler = async (m, { conn }) => {
  await m.react('🕓');  // Reacción para indicar que está procesando

  try {
    // Realizamos la petición a la API para obtener el video
    const response = await fetch('https://dark-core-api.vercel.app/api/random/tiktok?key=user1');

    // Verificamos si la respuesta es exitosa
    if (response.ok) {
      const videoUrl = await response.text();  // Obtenemos el contenido de la respuesta (el URL del video)

      // Enviamos el video al chat
      await conn.sendMessage(m.chat, {
        video: { url: videoUrl },  // Envía el video
        caption: 'Video de TikTok aleatorio'  // Opcional, se puede quitar si no deseas texto
      }, { quoted: m });

      await m.react('✅');  // Reacción de éxito
    } else {
      throw new Error('No se pudo obtener el video');
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
