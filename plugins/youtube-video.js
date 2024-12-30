import fetch from 'node-fetch';

let handler = async (m, { conn, text, isPrems, isOwner, usedPrefix, command }) => {
  if (!m.quoted) {
    return conn.reply(
      m.chat,
      `[ ✰ ] Etiqueta el mensaje que contenga el resultado de YouTube Play.`,
      m
    ).then(() => m.react('✖️'));
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
    let api = await fetch(
      `https://restapi.apibotwa.biz.id/api/ytmp4?url=${urls[0]}`
    );
    let json = await api.json();

    if (!json.data) {
      throw new Error('No se pudo obtener el resultado de la API.');
    }

    let { title, download_url, filename } = json.data;

    // Enviar el video MP4
    await conn.sendMessage(
      m.chat,
      {
        video: { url: download_url }, // Usamos la URL de descarga
        caption: `*» Título* : ${title}`, // El título del video
        mimetype: 'video/mp4', // Especificamos que es un video MP4
        fileName: `${filename}.mp4`, // Nombre del archivo
      },
      { quoted: m }
    );

    await m.react('✅');
  } catch (err) {
    console.error(`[Error] ${err.message}`, err);
    await conn.reply(
      m.chat,
      `✰ Hubo un error al intentar descargar el video. Inténtalo nuevamente más tarde.`,
      m
    ).then(() => m.react('✖️'));
  }
};

handler.help = ['Video'];
handler.tags = ['downloader'];
handler.customPrefix = /^(Video|video|vídeo|Vídeo)/;
handler.command = new RegExp;

export default handler;
