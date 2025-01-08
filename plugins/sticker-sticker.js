import { sticker } from '../lib/sticker.js';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let stiker = false;
  const messages = {
    invalidMedia: '🌸 *_Envía primero una imagen, video o gif y luego usa el comando._*',
    tooLongVideo: '🌷 *¡El video no puede durar más de 8 segundos!*',
    invalidUrl: '🥀 *_El URL proporcionado es incorrecto o no compatible._*',
    conversionError: '🌸 *_Hubo un error en la conversión. Inténtalo de nuevo._*',
  };

  try {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';
    
    if (/webp|image|video/g.test(mime)) {
      if (/video/g.test(mime) && ((q.msg || q).seconds || 0) > 8) {
        return m.reply(messages.tooLongVideo);
      }

      let img = await q.download?.();
      if (!img) {
        console.error('No se pudo descargar el medio.');
        return conn.reply(m.chat, messages.invalidMedia, m);
      }

      try {
        stiker = await sticker(img, false, global.packsticker, global.author);
      } catch (e) {
        console.error('Error al crear el sticker con medios:', e);
      }

    } else if (args[0]) {
      if (isUrl(args[0])) {
        try {
          stiker = await sticker(false, args[0], global.packsticker, global.author);
        } catch (e) {
          console.error('Error al crear el sticker con URL:', e);
        }
      } else {
        return m.reply(messages.invalidUrl);
      }
    } else {
      return conn.reply(m.chat, messages.invalidMedia, m);
    }

  } catch (e) {
    console.error('Error general:', e);
  } finally {
    if (stiker) {
      conn.sendFile(
        m.chat, stiker, 'sticker.webp', '', m, true, {
          contextInfo: {
            forwardingScore: 200,
            isForwarded: false,
            externalAdReply: {
              showAdAttribution: false,
              title: global.packsticker || 'Sticker',
              body: global.author || 'Bot',
              mediaType: 2,
              sourceUrl: global.redes || '',
              thumbnail: global.icons || null,
            },
          },
        }, 
        { quoted: m }
      );
    } else {
      conn.reply(m.chat, messages.conversionError, m);
    }
  }
};

handler.help = ['stiker <img>', 'sticker <url>'];
handler.tags = ['sticker'];
handler.group = false;
handler.register = true;
handler.command = ['s', 'sticker', 'stiker'];

export default handler;

const isUrl = (text) => {
  return text.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*(jpe?g|gif|png|webp|mp4))/gi);
};
