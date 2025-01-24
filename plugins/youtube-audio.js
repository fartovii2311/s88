import axios from 'axios';
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

  try {
    let downloadUrl1;
    let secondData;

    // Intentar con la primera API para obtener la URL de descarga
    try {
      const response = await axios.get(`https://api.siputzx.my.id/api/dl/youtube/mp3?url=${videoUrl}`);
      const data = response.data;

      if (!data || !data.data) {
        throw new Error('No se pudo obtener los datos de la primera API.');
      }

      downloadUrl1 = data.data;
    } catch (error) {
      console.log('Fallo en la primera API:', error.message);
    }

    // Si no se pudo obtener la URL de la primera API, intentamos con la segunda
    if (!downloadUrl1) {
      try {
        const response = await axios.get(`https://api.davidcyriltech.my.id/download/ytmp3?url=${videoUrl}`);
        const data = response.data;

        if (data.success === true) {
          downloadUrl1 = data.result.download_url;
        } else {
          throw new Error('No se pudo obtener la URL de la segunda API.');
        }
      } catch (error) {
        console.log('Fallo en la segunda API:', error.message);
      }
    }

    // Si tenemos una URL de descarga, proceder a descargar el archivo
    if (downloadUrl1) {
      const mp3FileResponse = await fetch(downloadUrl1);

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
      console.log("No se pudo obtener la URL de ninguna API.");
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
