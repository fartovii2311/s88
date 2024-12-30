let limit = 200; // Límite de tamaño en MB

let handler = async (m, { conn, text, isPrems, isOwner, usedPrefix, command }) => {
  if (!m.quoted) {
    return conn.reply(
      m.chat,
      '✰ Etiqueta el mensaje que contenga el resultado de YouTube Play.',
      m
    ).then(() => m.react('✖'));
  }

  if (!m.quoted.text.includes("乂  Y O U T U B E  -  P L A Y")) {
    return conn.reply(
      m.chat,
      '✰ Etiqueta el mensaje que contenga el resultado de YouTube Play.',
      m
    ).then(() => m.react('✖'));
  }

  let urls = m.quoted.text.match(
    /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9_-]+)/gi
  );

  if (!urls) {
    return conn.reply(m.chat, '✰ Resultado no encontrado.', m).then(() => m.react('✖'));
  }

  if (urls.length < text) {
    return conn.reply(m.chat, '✰ Resultado no encontrado.', m).then(() => m.react('✖'));
  }

  let user = global.db.data.users[m.sender];
  await m.react('🕓');

  try {
    let v = urls[0];
    let { title, size, quality, thumbnail, dl_url } = await Starlights.ytmp3(v);

    // Comparar tamaño con el límite
    if (parseFloat(size.split('MB')[0]) >= limit) {
      return m.reply(`✰ El archivo pesa más de ${limit} MB. Se canceló la descarga.`).then(() => m.react('✖'));
    }

    // Enviar el archivo de audio
    await conn.sendFile(
      m.chat,
      dl_url,
      `${title}.mp3`,
      null,
      m,
      false,
      { mimetype: 'audio/mpeg', asDocument: user.useDocument }
    );

    await m.react('✅');
  } catch (err) {
    console.error(err);
    await conn.reply(
      m.chat,
      '✰ Hubo un error al intentar descargar el audio. Inténtalo nuevamente más tarde.',
      m
    ).then(() => m.react('✖'));
  }
};

handler.help = ['Audio'];
handler.tags = ['downloader'];
handler.customPrefix = /^(Audio|audio)/i; // Prefijo para detectar el comando
handler.command = new RegExp; // El comando puede activarse sin texto adicional

export default handler;
