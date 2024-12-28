let handler = async m => m

export async function all(m) {
  let user = global.db.data.users[m.sender] // Obtener los datos del usuario
  
  // Evitar que se ejecute en los chats de broadcast
  if (m.chat.endsWith('broadcast')) return

  // Comprobar si el usuario tiene tiempo premium activo
  if (user.premiumTime != 0 && user.premium) {
    // Si el tiempo premium ha expirado
    if (new Date() * 1 >= user.premiumTime) {
      // Notificar al usuario que su tiempo premium ha terminado
      await m.reply(
        `🚩 @${m.sender.split('@')[0]}, tu tiempo como usuario *Premium* ha terminado.`, 
        false, 
        { mentions: [m.sender] }  // Mencionamos al usuario correctamente
      )
      
      // Desactivar el estado premium del usuario
      user.premiumTime = 0
      user.premium = false
    }
  }
}

handler.help = ['checkpremium'] // Comando de ayuda
handler.tags = ['dl'] // Categoría del comando
handler.command = ['checkpremium'] // Nombre del comando
handler.register = true // Hacer que el handler esté registrado

export default handler
