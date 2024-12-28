// [ ❀ YTMP4 ]
import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let [url, resolution] = text.split(' ');
  if (!url) {
    return conn.reply(m.chat, `Ingresa el link de un video de YouTube y una calidad. Ejemplo: ${usedPrefix + command} link 360`, m);
  }

  await m.react('🕓'); // Reacción de carga

  try {
    let apiinfo = await fetch(`https://ytdownloader.nvlgroup.my.id/info?url=${url}`);
    let jsoninfo = await apiinfo.json();
    let titulo = jsoninfo.title;
    let duracion = jsoninfo.duration || '-';
    let calidad = resolution || '360';
    let img = jsoninfo.thumbnail;
    let dl_url = `https://ytdownloader.nvlgroup.my.id/download?url=${url}&resolution=${calidad}`;
    let vidFetch = await fetch(dl_url);
    let video = await vidFetch.buffer();
    let Tamaño = video.length / (1024 * 1024); // Tamaño en MB

    let HS = `- Titulo: ${titulo}
- Link: ${url}
- Duración: ${duracion}
- Calidad: ${calidad}`;

    if (Tamaño > 100) {
      await conn.sendMessage(m.chat, { 
        document: video, 
        caption: HS, 
        mimetype: 'video/mp4', 
        fileName: `${titulo}.mp4` 
      });
    } else {
      await conn.sendMessage(m.chat, { 
        video: video, 
        caption: HS, 
        mimetype: 'video/mp4' 
      });
    }

    await m.react('✅'); // Reacción de éxito

  } catch (error) {
    console.error('Error al descargar el video:', error);
    m.reply('❀ Ocurrió un error al intentar obtener el video. Intenta nuevamente.');
    await m.react('❌'); // Reacción de error
  }
};

handler.help = ["ytmp4 *<url>*"]
handler.tags = ['downloader'];
handler.command = ['ytmp4'];
handler.register = true;
export default handler;
