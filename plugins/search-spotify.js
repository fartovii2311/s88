import fetch from 'node-fetch';
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default;

let handler = async (m, { conn, text }) => {
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

    for (let track of json.data) {
      let image = await createImage(track.album_cover);

      push.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: `◦ *Título:* ${track.title} \n◦ *Artistas:* ${track.artist} \n◦ *Álbum:* ${track.album} \n◦ *Duración:* ${msToTime(track.duration_ms)} \n◦ *Popularidad:* ${track.popularity}`
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: `©️ Powered by Galaxay Team`
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

    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({ text: `*Resultados para: ${text}*` }),
            footer: proto.Message.InteractiveMessage.Footer.create({ text: '_Powered by Galaxay Team_' }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: [...push] })
          })
        }
      }
    }, { 'quoted': m });

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
handler.command = /^(spotifysearch)$/i;

export default handler;
