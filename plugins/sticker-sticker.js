import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import { addExif } from '../lib/sticker.js'
import { Sticker } from 'wa-sticker-formatter'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''

    if (/video/g.test(mime)) {
      if ((q.msg || q).seconds > 10) {
        return m.reply('✧ El video debe durar como máximo 10 segundos.')
      }
      let img = await q.download?.()
      if (!img) {
        return m.reply(`✧ Responde a un video con el comando *${usedPrefix + command}*`)
      }
      let stiker = false
      try {
        stiker = await sticker(img, false, global.stickpack, global.stickauth)
      } catch (e) {
        console.error(e)
      }
      if (!stiker) {
        let out = await uploadFile(img)
        stiker = await sticker(false, out, global.stickpack, global.stickauth)
      }
      conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, null)
    } else if (/image/g.test(mime)) {
      let [packname = 'StickerBot', ...authorParts] = args.join(' ').split('|')
      let author = authorParts.join('|') || 'WhatsApp'
      let img = await q.download?.()
      if (!img) {
        return m.reply(`✧ Responde a una imagen con el comando *${usedPrefix + command}*`)
      }
      let stiker = false
      try {
        stiker = await addExif(img, packname, author)
      } catch (e) {
        console.error(e)
      }
      if (!stiker) {
        stiker = await createSticker(img, null, packname, author)
      }
      conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, null)
    } else {
      conn.reply(m.chat, `✧ Responde a una imagen o video con el comando *${usedPrefix + command}*`, m)
    }
  } catch (e) {
    console.error(e)
    m.reply('✧ Hubo un error al procesar el sticker. Intenta nuevamente.')
  }
}

handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = /^s(tic?ker)?(gif)?$/i
handler.register = true

export default handler

async function createSticker(img, url, packName = 'StickerBot', authorName = 'WhatsApp', quality = 50) {
  let stickerMetadata = {
    type: 'full',
    pack: packName,
    author: authorName,
    quality
  }
  return (new Sticker(img || url, stickerMetadata)).toBuffer()
}
