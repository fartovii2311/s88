import { join, dirname } from 'path'; // Asegúrate de importar correctamente path

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `❀ Ingresa un link de YouTube válido`, m);

  await m.react('🕓');

  try {
    // Asegúrate de que estás usando la URL correctamente
    let api = await (await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${text}`)).json();
    let dl_url = api.data.dl;

    // Obtén la ruta correcta usando path.join para evitar problemas con rutas
    const videoPath = join(__dirname, 'video.mp4'); // Usando __dirname correctamente

    // Enviar el video con el enlace de descarga
    await conn.sendMessage(m.chat, { video: { url: dl_url }, caption: `*Aqui tiene ฅ^•ﻌ•^ฅ*` }, { quoted: m });

    await m.react('✅');
  } catch (error) {
    await m.react('❌');
    console.error(error); // Esto te ayudará a ver más detalles sobre el error
  }
};

handler.help = ['play *<texto>*'];
handler.tags = ['downloader'];
handler.command = ['play'];
handler.register = true;

export default handler;
