import ffmpeg from 'fluent-ffmpeg'
import fs from 'fs'
import path from 'path'

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

      // Asegurarse de usar la ruta 'tmp' correctamente para los archivos temporales
      const tmpPath = path.join(__dirname, 'tmp', `sticker-${Date.now()}.webp`) // Ruta temporal para almacenar el sticker

      // Crear la carpeta 'tmp' si no existe
      if (!fs.existsSync(path.join(__dirname, 'tmp'))) {
        fs.mkdirSync(path.join(__dirname, 'tmp'))
      }

      // Usamos ffmpeg para crear un sticker en formato webp
      try {
        await new Promise((resolve, reject) => {
          ffmpeg(img)
            .inputFormat('image2') // Si es una imagen, usa 'image2', si es video usa 'mov'
            .output(tmpPath)
            .outputOptions('-vcodec', 'libwebp', '-preset', 'default', '-an', '-y', '-f', 'webp')
            .on('end', resolve)
            .on('error', reject)
            .run()
        })

        // Enviamos el archivo generado
        stiker = tmpPath
      } catch (e) {
        console.error('Error al generar sticker con ffmpeg:', e)
        stiker = false
      }
    } else if (args[0]) {
      if (isUrl(args[0])) {
        // Si el argumento es una URL, procesamos como una imagen o video
        stiker = await new Sticker(args[0], { pack: global.packname, author: global.author }).toBuffer()  // Puedes seguir usando 'toBuffer' si prefieres
      } else {
        return m.reply('URL inválido')
      }
    }
  } catch (e) {
    console.error('Error principal:', e)
    stiker = 'Ocurrió un error al procesar el sticker'
  } finally {
    if (stiker) {
      // Verificamos si el sticker es un archivo válido
      if (fs.existsSync(stiker)) {
        conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
        // Eliminamos el archivo temporal después de enviarlo
        fs.unlinkSync(stiker)
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

// Función para verificar si un texto es una URL válida
const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpg|jpeg|png|gif)/, 'gi'))
}
