/* 
- play hecho por By DarkCore
- https://whatsapp.com/channel/0029Vaxk8vvEFeXdzPKY8f3F
- Parchado por DarkCore... vip plus
*/

import fetch from 'node-fetch'
import yts from 'yt-search'

let handler = async (m, { conn: star, command, args, text, usedPrefix }) => {
  if (!text) {
    return star.reply(m.chat, '[ ᰔᩚ ] Ingresa el título de un video o canción de *YouTube*.', m)
  }

  await m.react('🕓')

  try {
    let res = await search(args.join(" "))
    let video = res[0]

    let txt = `🎬 *‌乂 Y O U T U B E  -  P L A Y 乂* 🎬\n\n`
    txt += `ﾒ *TITULO:* ${video.title}\n`
    txt += `ﾒ *DURACION:* ${secondString(video.duration.seconds)}\n`
    txt += `ﾒ *PUBLICACION:* ${eYear(video.ago)}\n`
    txt += `ﾒ *CANAL:* ${video.author.name || 'Desconocido'}\n`
    txt += `ﾒ *URL:* https://youtu.be/${video.videoId}\n\n`
    txt += `> ⬇️ Selecciona el formato de descarga:`

    const thumbnailUrl = video.image
    const videoUrl = `https://youtu.be/${video.videoId}`

    const buttons = [
      { buttonId: `.ytmp4 ${videoUrl}`, buttonText: { displayText: '🎥 Video MP4' }, type: 1 },
      { buttonId: `.ytmp3 ${videoUrl}`, buttonText: { displayText: '🎵 Audio MP3' }, type: 1 }
    ]

    await star.sendMessage(m.chat, {
      text: txt,
      contextInfo: {
        externalAdReply: {
          title: video.title,
          body: 'Selecciona un formato de descarga',
          thumbnailUrl: thumbnailUrl,
          sourceUrl: videoUrl,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      },
      buttons: buttons,
      headerType: 4
    })

    await m.react('✅')
  } catch (err) {
    console.error(err)
    await m.react('✖️')
    return star.reply(m.chat, '❌ Ocurrió un error al realizar la búsqueda.', m)
  }
}

handler.help = ['play *<búsqueda>*']
handler.tags = ['dl']
handler.command = ['play', 'Play', 'PLAY', 'pl']
handler.register = true 

export default handler

async function search(query, options = {}) {
  let searchResults = await yts.search({ query, hl: "es", gl: "ES", ...options })
  return searchResults.videos.filter(video => video.seconds > 0).slice(0, 5)
}

function secondString(seconds) {
  seconds = Number(seconds)
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  return `${h > 0 ? h + 'h ' : ''}${m > 0 ? m + 'm ' : ''}${s}s`
}

function eYear(txt) {
  if (!txt) return '×'
  return txt.replace('ago', 'hace')
}
