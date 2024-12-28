import fetch from 'node-fetch'

async function handler(m, { conn: stars, usedPrefix }) {
  let uniqueUsers = new Map()

  if (!global.conns || !Array.isArray(global.conns)) {
    global.conns = []
  }

  global.conns.forEach((conn) => {
    if (conn.user && conn.ws?.socket?.readyState !== ws.CLOSED) {
      uniqueUsers.set(conn.user.jid, conn)
    }
  })

  let users = [...uniqueUsers.values()]
  let totalUsers = uniqueUsers.size

  // Usar node-fetch con timeout
  let img
  try {
    img = await fetch('https://pomf2.lain.la/f/hg3otwi4.jpg', {
      timeout: 5000, // Tiempo de espera de 5 segundos
    }).then(res => res.buffer())
  } catch (err) {
    console.error('Error al obtener la imagen:', err)
    img = null
  }

  let message = users.map((v, index) => `
*[ \`${index + 1}\` - ${v.user.name || 'Sin Nombre'} ]*\n🤍 *Link:* https://wa.me/${v.user.jid.replace(/[^0-9]/g, '')}
`).join('\n\n')

  let responseMessage = `🟢 *Subbots Activos: ${totalUsers}*\n\n${message.trim() || '_No hay subbots activos en este momento._'}`

  await stars.sendFile(
    m.chat,
    img || 'default-image.jpg',  // Si img es null, usar una imagen por defecto
    'thumbnail.jpg',
    responseMessage,
    m,
    null,
    fake,
    false,
    { mentions: stars.parseMention(responseMessage) }
  )
}

handler.command = ['listjadibot', 'bots']
handler.help = ['bots']
handler.tags = ['serbot']
export default handler
