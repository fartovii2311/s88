import { sticker } from '../lib/sticker.js';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let stiker = false;
  try {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';

    if (/webp|image|video/g.test(mime)) {
      if (/video/g.test(mime) && (q.msg || q).seconds > 8) {
        return m.reply('☁ *¡El video no puede durar más de 8 segundos!*');
      }

      let img = await q.download?.();
      if (!img) {
        return conn.reply(
          m.chat,
          '🍁 *_¿Dónde está el archivo? Envía primero una imagen/video/gif y responde con el comando._*',
          m
        );
      }

      let out;
      try {
        stiker = await sticker(img, false, global.packname, global.author);
      } catch (e) {
        console.error(e);
      } finally {
        if (!stiker) {
          if (/webp/g.test(mime)) out = await webp2png(img);
          else if (/image/g.test(mime)) out = await uploadImage(img);
          else if (/video/g.test(mime)) out = await uploadFile(img);

          if (typeof out !== 'string') out = await uploadImage(img);
          stiker = await sticker(false, out, global.packname, global.author);
        }
      }
    } else if (args[0]) {
      if (isUrl(args[0])) {
        stiker = await sticker(false, args[0], global.packname, global.author);
      } else {
        return m.reply('💫 El URL proporcionado es incorrecto.');
      }
    }
  } catch (e) {
    console.error(e);
    if (!stiker) stiker = e;
  } finally {
    if (stiker) {
      conn.sendFile(
        m.chat,
        stiker,
        'sticker.webp',
        '',
        m,
        true,
        {
          contextInfo: {
            forwardingScore: 200,
            isForwarded: false,
            externalAdReply: {
              showAdAttribution: false,
              title: global.packname || 'Sticker Pack',
              body: global.author || 'CrowBot - ST 🚩',
              mediaType: 2,
              sourceUrl: global.redes || '',
              thumbnail: global.icons || null
            }
          }
        },
        { quoted: m }
      );
    } else {
      conn.reply(
        m.chat,
        '🌲 *_La conversión ha fallado. Intenta enviar primero una imagen/video/gif y luego responde con el comando._*\n\n> ⛄𝐅𝐄𝐋𝐈𝐙 𝐍𝐀𝐕𝐈𝐃𝐀𝐃❄',
        m
      );
    }
  }
};

handler.help = ['sticker <imagen/video>', 'sticker <url>'];
handler.tags = ['sticker'];
handler.command = ['s', 'sticker', 'stiker'];

export default handler;

const isUrl = (text) => {
  return text.match(
    new RegExp(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)(jpe?g|gif|png)/,
      'gi'
    )
  );
};
