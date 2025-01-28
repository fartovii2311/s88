import fetch from 'node-fetch';
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default;

const handler = async (m, { conn, text }) => {
  if (!global.db.data.chats[m.chat].nsfw) {
    return conn.reply(m.chat, `🚩 El grupo no admite contenido *Nsfw.*\n\n> Para activarlo un *Administrador* debe usar el comando */on nsfw*`, m, rcanal);
  }

  await m.react('🕓'); 

  if (!text) throw 'Proporcióname un texto de búsqueda para encontrar el video en Xvideos.';

  try {
    const response = await fetch(`https://dark-core-api.vercel.app/api/search/xvideo?key=user1&text=${encodeURIComponent(text)}`);

    if (response.ok) {
      const data = await response.json();

      if (data.success && data.results && data.results.length > 0) {
        const push = [];

        for (let video of data.results) {
          // Crear la imagen para el carrusel
          const image = await generateWAMessageContent({ image: { url: video.videoImageSrc } }, { upload: conn.waUploadToServer });

          push.push({
            body: proto.Message.InteractiveMessage.Body.fromObject({
              text: `◦ *Título:* ${video.videoTitle} \n◦ *Resolución:* ${video.videoResolution} \n◦ *Duración:* ${video.videoDuration}`
            }),
            footer: proto.Message.InteractiveMessage.Footer.fromObject({
              text: '' 
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
                  "buttonParamsJson": `{"display_text":"🎥 Ver Video 🎬","id":"123456789","copy_code":"${video.videoLink}"}`
                },
              ]
            })
          });
        }

        const msg = generateWAMessageFromContent(m.chat, {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2
              },
              interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                body: proto.Message.InteractiveMessage.Body.create({ text: '*`\Resultados de:\`* ' + `${text}` }),
                footer: proto.Message.InteractiveMessage.Footer.create({ text: '_\`ꜱ\` \`ᴘ\` \`-\` \`ꜱ\` \`ᴇ\` \`ᴀ\` \`ʀ\` \`c\` \`h\`_'}),
                header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
                carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: [...push] })
              })
            }
          }
        }, { 'quoted': m });

        await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
        await m.react('✅');
      } else {
        throw new Error('No se encontraron resultados');
      }
    } else {
      throw new Error('Error al realizar la búsqueda');
    }
  } catch (error) {
    await m.react('❌');
    m.reply(`❌ *Error:* ${error.message || 'Ocurrió un error desconocido'}`);
  }
};

handler.help = ['xvideosearch'];
handler.command = ['xvideosearch', 'xvideosearch'];
handler.register = true;

export default handler;
