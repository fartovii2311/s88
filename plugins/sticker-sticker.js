import { sticker } from '../lib/sticker.js';
import { Sticker } from 'wa-sticker-formatter';
import uploadFile from '../lib/uploadFile.js';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';
    let img = await q.download?.();
    let stiker = false;

    // Configuración de metadatos
    let [packname, ...author] = args.join(' ').split('|');
    packname = packname || global.stickpack || 'StickerBot';
    author = (author || []).join('|') || global.stickauth || 'WhatsApp';

    if (/video/g.test(mime)) {
      // Validación para videos
      if ((q.msg || q).seconds > 10) {
        return m.reply('✧ Máximo 10 segundos.');
      }
      if (!img) throw `✧ Responde a un video con el comando *${usedPrefix + command}*`;

      try {
        stiker = await sticker(img, false, packname, author);
      } catch (e) {
        console.error(e);
      } finally {
        if (!stiker) {
          let out = await uploadFile(img);
          stiker = await sticker(false, out, packname, author);
        }
      }
    } else if (/image/g.test(mime)) {
      // Validación para imágenes
      if (!img) throw `✧ Responde a una imagen con el comando *${usedPrefix + command}*`;

      try {
        stiker = await new Sticker(img, {
          type: 'full',
          pack: packname,
          author: author,
        }).toBuffer();
      } catch (e) {
        console.error(e);
      }
    } else if (args[0] && isUrl(args[0])) {
      // Validación para URLs
      try {
        stiker = await sticker(false, args[0], packname, author);
      } catch (e) {
        console.error(e);
      }
    } else {
      return m.reply('✧ Responde a una imagen, video o envía una URL válida.');
    }

    if (stiker) {
      conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, null);
    } else {
      throw '✧ Error al crear el sticker.';
    }
  } catch (e) {
    console.error(e);
    m.reply('✧ Error inesperado. Inténtalo nuevamente.');
  }
};

handler.help = ['sticker'];
handler.tags = ['sticker'];
handler.command = /^s(tic?ker)?(gif)?$/i;
handler.register = true;

export default handler;

// Validación de URLs
const isUrl = (text) => {
  return /^https?:\/\/[^\s$.?#].[^\s]*$/gi.test(text);
};
