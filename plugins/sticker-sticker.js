import { Sticker } from 'wa-sticker-formatter'

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
        stiker = await new Sticker(img, { pack: h, author: i }).toBuffer()  // Usamos 'toBuffer' para obtener un Buffer
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
            stiker = await new Sticker(out, { pack: h, author: i }).toBuffer()  // Usamos 'toBuffer' aquí también
          } catch (e) {
            console.error('Error al procesar la imagen/video:', e)
            stiker = 'Error al generar el sticker'
          }
        }
      }
    } else if (args[0]) {
      if (isUrl(args[0])) {
        stiker = await new Sticker(args[0], { pack: global.packname, author: global.author }).toBuffer()  // Usamos 'toBuffer' aquí también
      } else {
        return m.reply('URL inválido')
      }
    }
  } catch (e) {
    console.error('Error principal:', e)
    stiker = 'Ocurrió un error al procesar el sticker'
  } finally {
    if (stiker) {
      // Verificamos si el sticker es un Buffer antes de enviarlo
      if (Buffer.isBuffer(stiker)) {
        conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
      } else {
        m.reply('El sticker generado no es un archivo válido.')
      }
    } else {
      m.reply('Ocurrió un error al generar el sticker')
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
