import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!global.db.data.chats[m.chat].nsfw) {
    return conn.reply(m.chat, `🚩 El grupo no admite contenido *Nsfw.*\n\n> Para activarlo un *Administrador* debe usar el comando */on nsfw*`, m);
  }
  
  if (!text) return conn.reply(m.chat, 'Ingresa el texto de lo que quieres buscar en Xvideo 🤍', m);

  await m.react('🕓');
  
  try {
    let messageBody = `*Resultados de búsqueda para:* ${text}\n\n`;

    const apiUrl = `https://dark-core-api.vercel.app/api/search/xvideo?key=api&text=${encodeURIComponent(text)}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error al realizar la búsqueda: ${response.status} - ${response.statusText}`);
    }

    const json = await response.json();

    if (!json.success || !json.results || json.results.length === 0) {
      throw new Error('No se encontraron resultados');
    }

    for (let video of json.results) {
      messageBody += `🎥 *Título:* ${video.videoTitle}\n⏱️ *Duración:* ${video.videoDuration}\n🔗 *Enlace:* ${video.videoLink}\n\n`;
    }

    await conn.reply(m.chat, messageBody, m);
    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('❌');
    m.reply(`❌ *Error:* ${error.message || 'Ocurrió un error desconocido'}`);
  }
};

handler.help = ['xvideosearch'];
handler.command = ['xvideosearch', 'xvideosearch'];

export default handler;
