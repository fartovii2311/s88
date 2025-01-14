// [ ❀ SPOTIFY PLAY ]
import fetch from 'node-fetch'

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, '[ ᰔᩚ ] Ingresa el enlace de un *Spotify*.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* url`, m,rcanal)

  await m.react('🕓');

  try {
    let apiDL = await fetch(`https://api.vreden.web.id/api/spotify?url=${text}`)
    let jsonDL = await apiDL.json()

    let { title, artists, cover, music } = jsonDL.result
    let titulo = `- Titulo: ${title}\n- Autor: ${artists}\n- Enlace: ${text}`

    await conn.sendFile(m.chat, cover, 'cover.jpg', titulo, m,rcanal,fake);
    await conn.sendFile(m.chat, music, 'music.mp3', null, m);

    await m.react('✅');
    
  } catch (error) {
    console.error(error)
    await m.react('❌');
  }
}

handler.command = /^(spotify|Spotify|SPOTIFY|sp)$/i;
handler.tags = ["dl"];
handler.register = true;
export default handler;
