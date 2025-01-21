import fs from 'fs'
import ws from 'ws'

async function handler(m, { conn: stars, usedPrefix }) {
  let uniqueUsers = new Map()

  if (!global.conns || !Array.isArray(global.conns)) {
    global.conns = []
  }

  // Filtrar conexiones válidas (eliminar conexiones cerradas o inválidas)
  global.conns = global.conns.filter((conn) => {
    const isValid = conn.user && conn.ws?.socket?.readyState !== ws.CLOSED
    if (!isValid) {
      console.log(`[INFO] Eliminando subbot desconectado: ${conn.user?.jid || 'desconocido'}`)
    }
    return isValid
  })

  global.conns.forEach((conn) => {
    if (conn.user) {
      uniqueUsers.set(conn.user.jid, conn)
    }
  })

  let users = [...uniqueUsers.values()]
  let totalUsers = uniqueUsers.size

  let img = fs.readFileSync('./storage/img/Screenshot_20250120-024123-316.png')

  let message = users.map((v, index) => {
    const connectedAt = v.connectedAt || Date.now() // Asegúrate de que tenga un valor
    const elapsedTime = Date.now() - connectedAt
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60))
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000)

    return `
*[ \`${index + 1}\` - ${v.user.name || 'Sin Nombre'} ]*
🤍 *Link:* https://wa.me/${v.user.jid.replace(/[^0-9]/g, '')}?text=.code
🕒 *Tiempo Activo:* ${hours}h ${minutes}m ${seconds}s
`
  }).join('\n')

  let responseMessage = `🟢 *Subbots Activos: ${totalUsers}*\n\n${message.trim() || '_No hay subbots activos en este momento._'}`

  await stars.sendFile(
    m.chat,
    img,
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
