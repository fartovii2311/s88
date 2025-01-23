import { chatUpdate } from '../lib/events.js'

let handler = async (m, { conn, args }) => {
    let isAdd = /true$/i.test(args[1]) // Verificar si se debe agregar o eliminar
    let who

    // Identificar al usuario en grupos
    if (m.isGroup) {
        who = m.mentionedJid?.[0] // Si se menciona a alguien, usar su JID
            ? m.mentionedJid[0]
            : m.quoted // Si hay un mensaje citado, usar el remitente del mensaje citado
            ? m.quoted.sender
            : null // Si no se encuentra, establecer como null
    } else {
        who = m.chat // En chats privados, usar el chat actual
    }

    // Validaciones
    if (!who) throw `*[🚀] Ingresa el @tag del usuario que deseas agregar o eliminar.*`
    if (!args[1]) throw `*[⚙️] Usa la función true o false al final del comando.*`
    if (!(who in global.db.data.users)) {
        throw `*[⚙️] El usuario no se encuentra en la base de datos del bot.*`
    }

    // Inicializar la propiedad `akinator` si no existe
    if (!global.db.data.users[who].akinator) {
        global.db.data.users[who].akinator = {}
    }

    // Actualizar el estado
    global.db.data.users[who].akinator.sesi = isAdd

    // Mensaje de confirmación
    await m.reply(
        `${isAdd ? '*[🚀] Usuario agregado a la lista con éxito.*' : '*[🚀] Usuario eliminado de la lista con éxito.*'}`
    )
}

// Configuración del handler
handler.command = ['death', 'callar', 'mute', 'silenciar'] // Comandos activadores
handler.group = true // Solo en grupos
handler.admin = true // Solo para admins
handler.rowner = true // Solo para el dueño del bot
handler.botAdmin = true // El bot necesita ser admin

export default handler