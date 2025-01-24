import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  let user = global.db.data.users[m.sender];

  // Verificar si hay un mensaje citado
  if (!m.quoted) {
    return conn.reply(m.chat, `⚠️ Debes etiquetar el mensaje que contenga el resultado de YouTube Play.`, m);
  }

  // Verificar que el mensaje citado contiene un enlace de YouTube
  if (!m.quoted.text.includes("🎬 *‌乂 Y O U T U B E  -  P L A Y 乂* 🎬")) {
    return conn.reply(m.chat, `⚠️ El mensaje etiquetado no contiene un resultado de YouTube Play.`, m);
  }

  // Extraer la URL de YouTube del mensaje citado
  const urls = m.quoted.text.match(/(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?v=|v\/|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/gi);

  if (!urls || urls.length < 1) {
    return conn.reply(m.chat, `⚠️ No se encontraron enlaces válidos en el mensaje etiquetado.`, m);
  }

  await m.react('🕓');

  const videoUrl = urls[0];
  const apiUrl = `https://api.davidcyriltech.my.id/download/ytmp3?url=${videoUrl}`; // API para obtener el enlace de descarga de MP3

  try {
    // Primer API para obtener el enlace de descarga
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === true) {
      const downloadUrl = data.data; // URL de descarga de la primera API

      if (downloadUrl) {
        // Segundo API para descargar el archivo MP3
        const fileResponse = await fetch(downloadUrl);
        const fileData = await fileResponse.json(); // Respuesta de la segunda API

        if (fileData.status === true) {
          const mp3DownloadUrl = fileData.data; // URL de descarga del archivo MP3

          // Realizar la descarga del archivo MP3
          const mp3FileResponse = await fetch(mp3DownloadUrl);

          if (mp3FileResponse.ok) {
            const buffer = await mp3FileResponse.buffer();
            const size = parseInt(mp3FileResponse.headers.get('content-length'), 10) || 0;

            // Enviar el archivo de audio
            await conn.sendMessage(
              m.chat,
              {
                audio: buffer,
                mimetype: 'audio/mp4', 
              },
              { quoted: m }
            );

            // Si el tamaño del archivo es mayor a 10MB, enviarlo como documento
            if (size > 10 * 1024 * 1024) {
              await conn.sendMessage(
                m.chat,
                {
                  document: buffer,
                  mimetype: 'audio/mpeg',
                  fileName: 'audio.mp3',
                },
                { quoted: m }
              );
            }

            await m.react('✅');
          } else {
            console.log("Error en la descarga del archivo MP3.");
            await m.react('✖️');
          }
        } else {
          console.log("Error al obtener el enlace de la segunda API.");
          await m.react('✖️');
        }
      } else {
        console.log("No se obtuvo un enlace de descarga válido.");
        await m.react('✖️');
      }
    } else {
      console.log("Error en la respuesta de la primera API.");
      await m.react('✖️');
    }
  } catch (error) {
    console.log(error);
    await conn.reply(m.chat, "❌ Ocurrió un error al procesar tu solicitud.", m);
    await m.react('✖️');
  }
};

handler.help = ['Audio'];
handler.tags = ['dl'];
handler.customPrefix = /^(AUDIO|audio|Audio)$/i;
handler.register = true;
handler.Monedas = 1;
handler.command = new RegExp;

export default handler;
