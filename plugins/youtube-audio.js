import fetch from 'node-fetch';

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

  // Extraer la URL del mensaje citado
  let urls = m.quoted.text.match(
    /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9_-]+)/gi
  );

  if (!urls || urls.length === 0) {
    return conn.reply(m.chat, '✰ No se encontró una URL válida en el mensaje citado.', m);
  }

  await m.react('🕓'); // Indicar que el proceso está en curso

  try {
    // Construir la URL de descarga
    let downloadUrl = `https://p.oceansaver.in/ajax/download.php?format=mp3&url=${urls[0]}`;

    // Realizar la solicitud para obtener el archivo MP3
    let response = await fetch(downloadUrl);
    if (!response.ok) {
      throw new Error(`Error al descargar el archivo: ${response.statusText}`);
    }

    let audioBuffer = await response.buffer();

    // Enviar el archivo MP3 al usuario
    await conn.sendFile(
      m.chat,
      audioBuffer,
      'audio.mp3',
      null,
      m,
      false,
      { mimetype: 'audio/mpeg' }
    );

    await m.react('✅'); // Indicar éxito
  } catch (err) {
    console.error(err);
    conn.reply(m.chat, '❀ Ocurrió un error al descargar el archivo. Por favor, inténtalo más tarde.', m);
    await m.react('✖'); // Indicar error
  }
};

// Configuración del comando
handler.help = ['audio'];
handler.tags = ['downloader'];
handler.customPrefix = /^(audio|Audio)/i;
handler.command = new RegExp;

export default handler;
