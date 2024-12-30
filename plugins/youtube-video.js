import fetch from 'node-fetch';

let handler = async (m, { conn, text, isPrems, isOwner, usedPrefix, command }) => {
  if (!m.quoted) {
    return conn.reply(m.chat, `[ ✰ ] Etiqueta el mensaje que contenga el resultado de YouTube Play.`, m).then(() => m.react('✖️'));
  }

  if (!m.quoted.text.includes("乂  Y O U T U B E  -  P L A Y")) {
    return conn.reply(
      m.chat,
      `[ ✰ ] Etiqueta el mensaje que contenga el resultado de YouTube Play.`,
      m
    ).then(() => m.react('✖️'));
  }

  let urls = m.quoted.text.match(
    /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9_-]+)/gi
  );

  if (!urls) {
    return conn.reply(m.chat, `Resultado no Encontrado.`, m).then(() => m.react('✖️'));
  }

  await m.react('🕓');

  try {
    let api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp4?url=${urls[0]}`);
    let json = await api.json();

    if (!json || !json.data || !json.data.metadata || !json.data.download || !json.data.download.url) {
      throw new Error('Respuesta inválida de la API. No se encontraron los datos esperados.');
    }

    let title = json.data.metadata.title;
    let dl_url = json.data.download.url;
    let filename = json.data.filename;

    await conn.sendMessage(m.chat, {
      video: { url: dl_url },
      fileName: `${filename}.mp4`,
      mimetype: 'video/mp4'
    }, { quoted: m });

    await m.react('✅');
  } catch (err) {
    console.error(`[Error] ${err.message}`, err);
    await conn.reply(m.chat, `✰ Hubo un error al intentar descargar el video. Inténtalo nuevamente más tarde.`, m).then(() => m.react('✖️'));
  }
};

handler.help = ['Video'];
handler.tags = ['downloader'];
handler.customPrefix = /^(Video|video|vídeo|Vídeo)/;
handler.command = new RegExp;

export default handler;
