import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import yts from 'yt-search'
import fetch from 'node-fetch'

const LimitAud = 725 * 1024 * 1024 // 700MB
const LimitVid = 425 * 1024 * 1024 // 425MB

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
  if (!text) {
    return conn.reply(m.chat, `*Uso incorrecto, ejemplo: ${usedPrefix + command} Billie Eilish - Bellyache*`, m)
  }

  const yt_play = await search(args.join(' '))
  const texto1 = `⌘━─━─≪ *YOUTUBE* ≫─━─━⌘
★ ${yt_play[0].title}
★ ${yt_play[0].ago}
★ ${secondString(yt_play[0].duration.seconds)}
★ ${yt_play[0].views}
★ ${yt_play[0].author.name}
★ ${yt_play[0].url.replace(/^https?:\/\//, '')}
⌘━━━≪ ≫━━━⌘
> _*Descargando... Aguarde un momento por favor*_`.trim()

  await conn.sendFile(m.chat, yt_play[0].thumbnail, 'error.jpg', texto1, m, null, fake)

  if (command === 'play' || command === 'audio') {
    try {
      const yt = await youtubedl(yt_play[0].url).catch(async () => await fetchFromPlayApi(yt_play[0].url))
      await conn.sendFile(m.chat, await yt.audio.download(), `${yt.title}.mp3`, null, m, false, { mimetype: 'audio/mp4' })
    } catch (e) {
      try {
        const res = await fetch(`https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${yt_play[0].url}`)
        let { result } = await res.json()
        await conn.sendMessage(m.chat, { audio: { url: await result.download.url }, mimetype: 'audio/mpeg' }, { quoted: m })
      } catch (e) {
        await m.react('❌')
        console.log(e)
      }
    }
  }

  if (command === 'play2' || command === 'video') {
    try {
      const yt = await youtubedl(yt_play[0].url).catch(async () => await fetchFromPlayApi(yt_play[0].url))
      let q = getBestVideoQuality(yt)
      await conn.sendMessage(m.chat, { video: { url: await yt.video[q].download() }, fileName: `${yt.title}.mp4`, mimetype: 'video/mp4', caption: `⟡ *${yt_play[0].title}*\n⟡ \`${q}\` | ${await yt.video[q].fileSizeH}\n> ${wm}` }, { quoted: m })
    } catch (e) {
      await m.react('❌')
      console.log(e)
    }
  }

  if (command === 'play3' || command === 'playdoc') {
    try {
      const yt_play = await search(args.join(' '))
      const texto1 = `*𓆩 𓃠 𓆪 ✧═══ ═══✧ 𓆩 𓃠 𓆪*

    » ${yt_play[0].title}
    » ${yt_play[0].ago}
    » ${secondString(yt_play[0].duration.seconds)}
    » ${yt_play[0].views}
    » ${yt_play[0].author.name}
    » ${yt_play[0].url}

    *𓆩 𓃠 𓆪 ✧═══ ═══✧ 𓆩 𓃠 𓆪*
    > > _*Descargado su audio en documento. Aguarde un momento, por favor*_`.trim()

      await conn.sendFile(m.chat, yt_play[0].thumbnail, 'error.jpg', texto1, m, null, fake)

      const apiUrl = `${apis}/download/ytmp4?url=${encodeURIComponent(yt_play[0].url)}`
      const apiResponse = await fetch(apiUrl)
      const delius = await apiResponse.json()
      if (!delius.status) {
        return m.react("❌")
      }
      const downloadUrl = delius.data.download.url
      await conn.sendMessage(m.chat, { document: { url: downloadUrl }, mimetype: 'audio/mpeg', fileName: `${yt_play[0].title}.mp3` }, { quoted: m })
    } catch (e) {
      try {
        let q = '128kbps'
        const yt = await youtubedl(yt_play[0].url).catch(async _ => await fetchFromPlayApi(yt_play[0].url))
        const dl_url = await yt.audio[q].download()
        const ttl = await yt.title
        await conn.sendMessage(m.chat, { document: { url: dl_url }, mimetype: 'audio/mpeg', fileName: `${ttl}.mp3` }, { quoted: m })
      } catch (e2) {
        await m.react('❌')
      }
    }
  }
}

handler.command = /^(play[2-4]?|audio|video|playdoc2?)$/i
handler.register = true
export default handler

// Function to search for a YouTube video
async function search(query, options = {}) {
  const search = await yts.search({ query, hl: 'es', gl: 'ES', ...options })
  return search.videos
}

// Convert seconds to a human-readable format
function secondString(seconds) {
  seconds = Number(seconds)
  const d = Math.floor(seconds / (3600 * 24))
  const h = Math.floor((seconds % (3600 * 24)) / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  const dDisplay = d > 0 ? d + (d === 1 ? ' día, ' : ' días, ') : ''
  const hDisplay = h > 0 ? h + (h === 1 ? ' hora, ' : ' horas, ') : ''
  const mDisplay = m > 0 ? m + (m === 1 ? ' minuto, ' : ' minutos, ') : ''
  const sDisplay = s > 0 ? s + (s === 1 ? ' segundo' : ' segundos') : ''
  return dDisplay + hDisplay + mDisplay + sDisplay
}

// Function to fetch the best video quality
function getBestVideoQuality(videoData) {
  const preferredQualities = ['720p', '360p', 'auto']
  const availableQualities = Object.keys(videoData.video)
  for (let quality of preferredQualities) {
    if (availableQualities.includes(quality)) {
      return videoData.video[quality].quality
    }
  }
  return '360p'
}

// Function to download audio from an API
async function fetchFromPlayApi(url) {
  const apiUrl = `https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${url}`
  const response = await fetch(apiUrl)
  const data = await response.json()
  if (data.status && data.result?.downloadUrl) {
    return { audio: { url: data.result.downloadUrl }, mimetype: 'audio/mpeg' }
  }
  throw new Error('Error fetching audio from the API')
    }
