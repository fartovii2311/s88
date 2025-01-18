// [ ❀ INSTAGRAM DL (IMAGEN/VIDEO) ]
import axios from 'axios';

let handler = async (m, { text, args, command, conn, usedPrefix }) => {  
  if (!text) return conn.reply(m.chat, '[ ᰔᩚ ] Ingresa el URL del video o imagen de *Instagram*.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* https://www.instagram.com/reel/abc123/`, m, rcanal);

  await m.react('🕓');

  try {
    let mediaInfo = await instagramdlVreden(args[0]);

    if (mediaInfo.videoUrl) {
      let vid = await axios.get(mediaInfo.videoUrl, { responseType: 'arraybuffer' });
      await conn.sendMessage(m.chat, { video: Buffer.from(vid.data), caption: '✅ Video descargado correctamente.' },{ quoted: m });
    } else if (mediaInfo.imageUrl) {
      let img = await axios.get(mediaInfo.imageUrl, { responseType: 'arraybuffer' });
      await conn.sendMessage(m.chat, { image: Buffer.from(img.data), caption: '✅ Imagen descargada correctamente.' },{ quoted: m });
    } else {
      return m.reply('❀ Sin resultados encontrados.');
    }

    await m.react('✅');
  } catch (error) {
    await m.react('❌');
    m.reply('❀ Ocurrió un error al procesar tu solicitud.');
  }
};

handler.command = ['ig', 'igdl', 'instagram'];
handler.tags = ['dl'];
handler.help = ['ig *<link>*'];

export default handler;

let instagramdlVreden = async (url) => {
  let config = {
    method: 'GET',
    url: `https://api.vreden.web.id/api/igdownload?url=${encodeURIComponent(url)}`,
  };

  let res = await axios.request(config);
  let data = res.data.result.response.data[0];
  let mediaInfo = {};

  if (data.type === 'video') {
    mediaInfo.videoUrl = data.url;
  } else if (data.type === 'image') {
    mediaInfo.imageUrl = data.thumb;
  }

  return mediaInfo;
};
