import fetch from 'node-fetch';
import { Buffer } from 'buffer'; // Importar Buffer si no lo tienes

const handler = async (m, { text, conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.reply(m.chat, '*\`Ingresa El link Del vídeo a descargar 🤍\`*', m, rcanal);
  }

  await m.react('🕒');
  let res;
  try {
    // Hacer la solicitud para obtener el video
    res = await fetch(`https://deliriussapi-oficial.vercel.app/download/facebook?url=${args[0]}`);
    const data = await res.json();

    if (!data.urls || !data.urls.length) {
      return conn.reply(m.chat, '*`No se encontraron resultados.`*', m, rcanal);
    }

    // Obtener la URL SD
    let video = data.urls.find(i => i.sd);
    if (!video) {
      return conn.reply(m.chat, '*`No se encontró la resolución SD.`*', m, rcanal);
    }

    // Usar la URL SD
    video = video.sd;

    // Descargar el video como un Buffer
    const videoRes = await fetch(video);
    if (!videoRes.ok) {
      throw new Error('No se pudo descargar el video');
    }

    const videoBuffer = await videoRes.buffer();

    await m.react('✅');
    // Enviar el video usando el buffer descargado
    await conn.sendMessage(m.chat, {
      video: videoBuffer,
      caption: '¡Aquí tienes tu video en SD!',
      fileName: 'fb.mp4',
      mimetype: 'video/mp4'
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    await m.react('❌');
    return conn.reply(m.chat, '*`Error al procesar los datos. Verifica el enlace.`*', m);
  }
};

handler.help = ['fb *<link>*'];
handler.corazones = 2;
handler.tags = ['dl'];
handler.command = /^(fb|facebook|fbdl)$/i;
handler.register = true;

export default handler;
