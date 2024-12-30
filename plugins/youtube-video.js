import fetch from 'node-fetch';

let limit = 300;

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
      `https://api.giftedtech.my.id/api/download/dlmp4?apikey=gifted&url=${urls[0]}`
    );
    let json = await api.json();

    if (!json.result) {
      throw new Error('No se pudo obtener el resultado de la API.');
    }

    let { quality, title, size, download_url } = json.result;

    if (!size) {
      throw new Error('El tamaño del archivo no está disponible.');
    }

    let sizeMB = parseFloat(size.replace('MB', '').trim());
    if (isNaN(sizeMB)) {
      throw new Error(`No se pudo determinar el tamaño del archivo: ${size}`);
    }
    if (sizeMB > limit) {
      return conn.reply(
        m.chat,
        `El archivo pesa más de ${limit} MB, se canceló la Descarga.`,
        m
      ).then(() => m.react('✖️'));
    }

    await conn.sendMessage(
      m.chat,
      {
        video: { url: download_url },
        caption: `*» Título* : ${title}\n*» Calidad* : ${quality}\n*» Tamaño* : ${size}`,
        mimetype: 'video/mp4',
        fileName: `${title}.mp4`,
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
