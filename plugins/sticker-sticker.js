import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let stiker = false
  const user = conn.getName(m.sender)
  const h = ` ㌹ Dark-ia`
  const i = `By Staff`

  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    
    if (/webp|image|video/g.test(mime)) {
      if (/video/g.test(mime) && ((q.msg || q).seconds > 11)) {
        return m.reply('Máximo 10 segundos')
      }

      let img = await q.download?.()
      if (!img) throw new Error(`✳️ Responde a una imagen o video con *${usedPrefix + command}*`)

      let out
      try {
        stiker = await sticker(img, false, h, i)
      } catch (e) {
        console.error('Error al crear sticker:', e)
        stiker = false
      } finally {
        if (!stiker) {
          try {
            if (/webp/g.test(mime)) {
              out = await webp2png(img)
            } else if (/image/g.test(mime)) {
              out = await uploadImage(img)
            } else if (/video/g.test(mime)) {
              out = await uploadFile(img)
            }

            if (typeof out !== 'string') out = await uploadImage(img)
            stiker = await sticker(false, out, h, i)
          } catch (e) {
            console.error('Error al procesar la imagen/video:', e)
            stiker = 'Error al generar el sticker'
          }
        }
      }
    } else if (args[0]) {
      if (isUrl(args[0])) {
        stiker = await sticker(false, args[0], global.packname, global.author)
      } else {
        return m.reply('URL inválido')
      }
    }
  } catch (e) {
    console.error('Error principal:', e)
    stiker = 'Ocurrió un error al procesar el sticker'
  } finally {
    // Aquí corregimos el error de 'rpl' y lo sustituimos por 'm' para citar el mensaje
    if (stiker) {
      conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)  // El parámetro rpl ha sido eliminado
    } else {
      m.reply('Ocurrió un error al generar el sticker')
    }
  }
}

handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = ['s', 'sticker']

export default handler

// Función para verificar si un texto es una URL válida
const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpg|jpeg|png|gif)/, 'gi'))
}
