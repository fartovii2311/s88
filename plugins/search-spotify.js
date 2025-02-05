import fetch from 'node-fetch';
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default;

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, 'Ingresa el texto de lo que quieres buscar en Spotify 🤍', m, rcanal);
  
  await m.react('🕓');
  
  try {
    async function createImage(url) {
      const { imageMessage } = await generateWAMessageContent({ image: { url } }, { upload: conn.waUploadToServer });
      return imageMessage;
    }

    let push = [];
    
    // Realizando la consulta a la API de búsqueda de Spotify
    let api = await fetch(`https://dark-core-api.vercel.app/api/search/spotify?key=user1&query=${encodeURIComponent(text)}`);
    let json = await api.json();

    // Procesando los resultados de la API
    for (let track of json.data) {
      let image = await createImage(track.album_cover);

      push.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: `◦ *Título:* ${track.title} \n◦ *Artistas:* ${track.artist} \n◦ *Álbum:* ${track.album} \n◦ *Duración:* ${msToTime(track.duration_ms)} \n◦ *Popularidad:* ${track.popularity} \n◦ *Fecha de lanzamiento:* ${track.release_date}`
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: `©️ ρσωερου ɓу ɠαℓαאу ƭεαɱ`
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: '',
          hasMediaAttachment: true,
          imageMessage: image
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [
            {
              "name": "cta_copy",
              "buttonParamsJson": `{"display_text":"🎧 ¡Escuchar ahora! 🎧","id":"123456789","copy_code":".spotify ${track.link}"}`
            },
          ]
        })
      });
    }

    // Creando el mensaje interactivo con los resultados
    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({ text: `*Resultados para: ${text}*` }),
            footer: proto.Message.InteractiveMessage.Footer.create({ text: '_Powered by Galaxay Team_' }),
            header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: [...push] })
          })
        }
      }
    }, {
      'quoted': m
    });

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
    await m.react('✅');
  } catch (error) {
    console.error(error);
  }
}
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
