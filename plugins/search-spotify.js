import fetch from 'node-fetch'
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, 'Ingresa el texto de lo que quieres buscar en Spotify 🤍', m);

  await m.react('🕓');

  try {
    async function createImage(url) {
      const { imageMessage } = await generateWAMessageContent({ image: { url } }, { upload: conn.waUploadToServer });
      return imageMessage;
    }

    let push = [];
    let api = await fetch(`https://dark-core-api.vercel.app/api/search/spotify?key=user1&query=${encodeURIComponent(text)}`);
    let json = await api.json();

    console.log("Respuesta de la API:", json); // Verificar la respuesta de la API

    // Verificar si la API devuelve la estructura correcta
    if (json && json.data && json.data.length > 0) {
      // Procesar cada track devuelto por la API
      for (let track of json.data) {
        let image = await createImage(track.album_cover); // Obtener la imagen del álbum

        push.push({
          body: proto.Message.InteractiveMessage.Body.fromObject({
            text: `◦ *Título:* ${track.title} \n◦ *Artistas:* ${track.artist} \n◦ *Álbum:* ${track.album} \n◦ *Duración:* ${msToTime(track.duration_ms)} \n◦ *Popularidad:* ${track.popularity} \n◦ *Fecha:* ${track.release_date}`,
          }),
          footer: proto.Message.InteractiveMessage.Footer.fromObject({
            text: '🎶 Powered by Dark-Core API 🎶',
          }),
          header: proto.Message.InteractiveMessage.Header.fromObject({
            title: track.album, // Título del álbum
            hasMediaAttachment: true,
            imageMessage: image, // Imagen del álbum
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
            buttons: [
              {
                "name": "cta_copy",
                "buttonParamsJson": `{"display_text":"🎧 ¡Escuchar ahora! 🎧","id":"123456789","copy_code":".spotify ${track.link}"}`
              },
            ]
          }),
        });
      }

      const msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
          message: {
            interactiveMessage: proto.Message.InteractiveMessage.fromObject({
              body: proto.Message.InteractiveMessage.Body.create({ text: `*Resultados para: ${text}*` }),
              footer: proto.Message.InteractiveMessage.Footer.create({ text: '_Powered by Dark-Core API_' }),
              carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: [...push] }),
            }),
          },
        },
      }, { 'quoted': m });

      // Enviar el mensaje
      await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
      await m.react('✅');
    } else {
      console.log('No se encontraron resultados o la respuesta de la API es incorrecta:', json);
      return conn.reply(m.chat, 'No se encontraron resultados para la búsqueda', m);
    }
  } catch (error) {
    console.error(error);
    return conn.reply(m.chat, 'Hubo un error al realizar la búsqueda', m);
  }
};

// Función para convertir la duración en milisegundos a formato "minutos:segundos"
function msToTime(ms) {
  let date = new Date(ms);
  return `${date.getUTCMinutes()}:${date.getUTCSeconds()}`;
}

handler.help = ["spotifysearch *<text>*"];
handler.tags = ["search"];
handler.command = /^(spotifysearch)$/i;
handler.register = true;
handler.Monedas = 5;

export default handler;
