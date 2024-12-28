import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import { addExif } from '../lib/sticker.js'
import { Sticker } from 'wa-sticker-formatter'

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
      if ((q.msg || q).seconds > 10) return m.reply('✧ Máximo 10 segundos.');
      if (!img) throw `✧ Responde a un video con el comando *${usedPrefix + command}*`;

      stiker = await new Sticker(img, { type: 'full', pack: packname, author: author }).toBuffer();
    } else if (/image/g.test(mime)) {
      if (!img) throw `✧ Responde a una imagen con el comando *${usedPrefix + command}*`;

      stiker = await new Sticker(img, { type: 'full', pack: packname, author: author }).toBuffer();
    } else if (args[0] && isUrl(args[0])) {
      stiker = await new Sticker(args[0], { type: 'full', pack: packname, author: author }).toBuffer();
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

const isUrl = (text) => /^(https?:\/\/[^\s$.?#].[^\s]*)$/i.test(text);
