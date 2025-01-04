import { sticker } from '../lib/sticker.js';
import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
import { webp2png } from '../lib/webp2mp4.js';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let stiker = false;
  let user = db.data.users[m.sender];
  let time = 10000;

  if (new Date - user.lastmining < time) {
    return await conn.reply(m.chat, '*⏳ Espera unos minutos para usar otro comando.*', m);
  }

  try {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';
    let img;

    if (/webp|image|video/g.test(mime)) {
      if (/video/g.test(mime) && (q.msg || q).seconds > 11) {
        return m.reply('⚠️ El video no puede durar más de 7 segundos.');
      }

      img = await q.download?.();
      if (!img) {
        throw '⚠️ Responde a una imagen, video, GIF, o proporciona un enlace válido.';
      }

      try {
        stiker = await sticker(img, false, global.packname, global.author);
      } catch (e) {
        console.error(e);
      }

      if (!stiker) {
        let out;
        if (/webp/g.test(mime)) out = await webp2png(img);
        else if (/image/g.test(mime)) out = await uploadImage(img);
        else if (/video/g.test(mime)) out = await uploadFile(img);

        stiker = await sticker(false, out, global.packname, global.author);
      }
    } else if (args[0]) {
      if (isUrl(args[0])) {
        stiker = await sticker(false, args[0], global.packname, global.author);
      } else {
        return m.reply('⚠️ URL inválida.');
      }
    }

    if (!stiker) throw '⚠️ No se pudo generar el sticker. Por favor, intenta de nuevo.';
  } catch (e) {
    console.error(e);
    return conn.reply(m.chat, `❗️ Ocurrió un error: ${e.message || e}`, m);
  } finally {
    if (stiker) {
      await conn.sendFile(
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
              title: wm,
              body: '😻 SuperGataBot-MD - WhatsApp',
              mediaType: 2,
              sourceUrl: accountsgb,
              thumbnail: imagen1,
            },
          },
        },
        { quoted: m }
      );
    }
  }

  user.lastmining = Date.now();
};

handler.help = ['sticker'];
handler.tags = ['sticker'];
handler.command = ['s', 'sticker', 'stiker'];

export default handler;

const isUrl = (text) => {
  return text.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/gi);
};
