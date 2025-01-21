let handler = async (m, { args }) => {
   let user = global.db.data.users[m.sender]
   if (!args[0]) return conn.reply(m.chat,'🪙 Ingresa la cantidad de *🪙 Monedas* que deseas Depositar.',m,rcanal)
   if ((args[0]) < 1) return conn.reply(m.chat,'🪙 Ingresa una cantidad válida de *🪙 Monedas.',m,rcanal)
   if (args[0] == 'all') {
      let count = parseInt(user.limit)
      user.Monedas -= count * 1
      user.bank += count * 1
      await conn.reply(m.chat,`Depositaste *${count} 🪙 Monedas* al Banco.`,m,rcanal)
      return !0
   }
   if (!Number(args[0])) return conn.reply(m.chat,'🪙 La cantidad deve ser un Numero.',m,rcanal)
   let count = parseInt(args[0])
   if (!user.Monedas) return conn.reply(m.chat,'No tienes *🪙 Monedas* en la Cartera.',m,rcanal)
   if (user.Monedas < count) return conn.reply(m.chat,`Solo tienes *${user.Monedas} 🪙 Monedas* en la Cartera.`,m,rcanal)
   user.Monedas -= count * 1
   user.bank += count * 1
   await conn.reply(m.chat,`Depositaste *${count} 🪙 Monedas* al Banco.`,m,rcanal)
}

handler.help = ['depositar']
handler.tags = ['rpg']
handler.command = ['deposit', 'depositar', 'dep', 'd']
handler.register = true 
export default handler 
