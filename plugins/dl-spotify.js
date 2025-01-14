// [ ❀ SPOTIFY PLAY ]
import fetch from 'node-fetch'

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, '[ ᰔᩚ ] Ingresa el título de un video o canción de *Spotify*.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* Ozuna intimidad` ,m)

  await m.react('🕓');
  
  try {
    let apiSearch = await fetch(`https://api.vreden.web.id/api/spotifysearch?query=${text}`)
    let jsonSearch = await apiSearch.json()

    if (!jsonSearch.result || jsonSearch.result.length === 0) {
      return conn.reply(m.chat, 'No se encontraron resultados para esa canción o video en Spotify.', m);
    }

    let { popularity, url } = jsonSearch.result[0]

    let apiDL = await fetch(`https://api.vreden.web.id/api/spotify?url=${url}`)
    let jsonDL = await apiDL.json()

    if (!jsonDL.result || !jsonDL.result.result) {
      return conn.reply(m.chat, 'No se pudo obtener la descarga del contenido.', m);
    }

    let { title, artists, cover, music } = jsonDL.result.result

    let titulo = `- Titulo : ${title}\n- Autor : ${artists}\n- Popularidad : ${popularity}\n- Link : ${url}`

    await conn.sendFile(m.chat, cover, 'default.jpg', titulo, m)

    await conn.sendFile(m.chat, music, 'default.mp4', null, m)
    
    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('❌');
  }
}

handler.command = /^(spotify|Spotify|SPOTIFY|sp)$/i;
handler.tags = ["dl"];
handler.register = true;
export default handler;
