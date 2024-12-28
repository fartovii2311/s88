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
    
    // Verificar si el tipo de archivo es webp, imagen o video
    if (/webp|image|video/g.test(mime)) {
      if (/video/g.test(mime) && ((q.msg || q).seconds > 11)) {
        return m.reply('Máximo 10 segundos')
      }

      let img = await q.download?.()
      if (!img) throw new Error(`✳️ Responde a una imagen o video con *${usedPrefix + command}*`)

      let out
      try {
        // Intentar crear el sticker a partir del archivo recibido
        stiker = await sticker(img, false, h, i)
      } catch (e) {
        console.error('Error al crear sticker:', e)
        stiker = false // Si falla, continuar con la siguiente opción
      } finally {
        if (!stiker) {
          // Si no se creó el sticker, intentar procesar el archivo dependiendo del tipo
          try {
            if (/webp/g.test(mime)) {
              out = await webp2png(img)  // Convierte WebP a PNG si es necesario
            } else if (/image/g.test(mime)) {
              out = await uploadImage(img)  // Sube la imagen
            } else if (/video/g.test(mime)) {
              out = await uploadFile(img)  // Sube el video
            }

            if (typeof out !== 'string') out = await uploadImage(img)  // Si no es una URL, sube la imagen
            stiker = await sticker(false, out, h, i)  // Crea el sticker con la imagen o video procesado
          } catch (e) {
            console.error('Error al procesar la imagen/video:', e)
            stiker = 'Error al generar el sticker'
          }
        }
      }
    } else if (args[0]) {
      // Si se pasa una URL en los argumentos
      if (isUrl(args[0])) {
        stiker = await sticker(false, args[0], global.packname, global.author)  // Usa la URL directamente
      } else {
        return m.reply('URL inválido')  // Mensaje si la URL no es válida
      }
    }
  } catch (e) {
    console.error('Error principal:', e)
    stiker = 'Ocurrió un error al procesar el sticker'
  } finally {
    // Si se generó un sticker, lo enviamos
    if (stiker) {
      conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)  
    } else {
      m.reply('Ocurrió un error al generar el sticker')  // Mensaje si no se generó el sticker
    }
  }
}

handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = ['s', 'sticker'] 

export default handler

const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpg|jpeg|png|gif)/, 'gi'))
}
