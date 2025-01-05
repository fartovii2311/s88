import fetch from 'node-fetch';

let handler = async (m, { conn, text, isPrems, isOwner, usedPrefix, command }) => {
  if (!m.quoted) {
    return conn.reply(
      m.chat,
      '✰ Por favor, etiqueta el mensaje que contiene el resultado de YouTube Play.',
      m
    ).then(() => m.react('✖'));
  }

  if (!m.quoted.text.includes('乂  Y O U T U B E  -  P L A Y')) {
    return conn.reply(
      m.chat,
      '✰ El mensaje citado no contiene un resultado válido de YouTube Play.',
      m
    ).then(() => m.react('✖'));
  }

  let urls = m.quoted.text.match(
    /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9_-]+)/gi
  );

  if (!urls || urls.length === 0) {
    return conn.reply(
      m.chat,
      '✰ No se encontró un enlace de YouTube válido en el mensaje citado.',
      m
    );
  }

  await m.react('🕓'); // Proceso en curso

  try {
    let downloadUrl = `https://p.oceansaver.in/ajax/download.php?format=mp3&url=${urls[0]}`;

    let response = await fetch(downloadUrl);
    if (!response.ok) {
      throw new Error(`Error al descargar el archivo: ${response.statusText}`);
    }

    let audioBuffer = await response.buffer();

    // Enviar el audio descargado
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
    console.error('Error al procesar la descarga:', err.message);
    conn.reply(
      m.chat,
      '❀ Ocurrió un error durante el proceso. Verifica el enlace y vuelve a intentarlo.',
      m
    );
    await m.react('✖'); // Indicar error
  }
};

// Configuración del comando
handler.help = ['audio'];
handler.tags = ['downloader'];
handler.customPrefix = /^(audio|Audio)/i;
handler.command = new RegExp;

export default handler;
