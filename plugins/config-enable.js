let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  let isEnable = /true|enable|(turn)?on|1/i.test(command)
  let chat = global.db.data.chats[m.chat]
  let user = global.db.data.users[m.sender]
  let bot = global.db.data.settings[conn.user.jid] || {}
  let type = (args[0] || '').toLowerCase()
  let isAll = false, isUser = false
  switch (type) {
  case 'welcome':
    case 'bv':
    case 'bienvenida':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.welcome  = isEnable
      break
      
  case 'antiarabe':
    case 'antiArabe':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiarabe = isEnable
      break
      

  case 'antiPrivate':
    case 'antiprivado':
    case 'antipriv':
     isAll = true
        if (!isOwner) {
          global.dfail('rowner', m, conn)
          throw false
      }
      bot.antiPrivate = isEnable
      break

  case 'restrict':
    case 'restringir':
     isAll = true
        if (!isOwner) {
          global.dfail('rowner', m, conn)
          throw false
      }
      bot.restrict = isEnable
      break

 case 'autolevelup':
    case 'autonivel':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.autolevelup = isEnable
      break

 case 'antibot':
    case 'antibots':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiBot = isEnable
      break

 case 'autoaceptar':
    case 'aceptarauto':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.autoAceptar = isEnable
      break

 case 'autorechazar':
    case 'rechazarauto':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.autoRechazar = isEnable
      break
      
    case 'antibot':
    case 'Antibot':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiBot = isEnable
      break

 case 'antifake':
    case 'antifakes':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antifake = isEnable
      break

  case 'autoresponder':
    case 'autorespond':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.sAutoresponder = isEnable
      break

 case 'modoadmin':
    case 'soloadmin':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.modoadmin = isEnable
      break

 case 'autoread':
    case 'autoleer':
    case 'autover':
      isAll = true
       if (!isROwner) {
         global.dfail('rowner', m, conn)
         throw false
      }
      global.opts['autoread'] = isEnable
      break

  case 'antiver':
    case 'antiocultar':
    case 'antiviewonce':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.antiver = isEnable
      break

  case 'reaction':
    case 'reaccion':
    case 'emojis':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.reaction = isEnable
      break

  case 'audios':
    case 'audiosbot':
    case 'botaudios':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.audios = isEnable
      break

  case 'antiSpam':
    case 'antispam':
    case 'antispamosos':
     isAll = true
      if (!isOwner) {
      global.dfail('rowner', m, conn)
      throw false
      }
      bot.antiSpam = isEnable
      break

  case 'antidelete': 
    case 'antieliminar': 
    case 'delete':
     if (m.isGroup) {
     if (!(isAdmin || isOwner)) {
     global.dfail('admin', m, conn)
     throw false
     }}
     chat.delete = isEnable
     break

  case 'autobio':
    case 'status':
    case 'bio':
     isAll = true
        if (!isOwner) {
          global.dfail('rowner', m, conn)
          throw false
        }
      bot.autobio = isEnable
      break

  case 'jadibotmd':
    case 'serbot':
    case 'subbots':
     isAll = true
        if (!isOwner) {
          global.dfail('rowner', m, conn)
          throw false
      }
      bot.jadibotmd = isEnable
      break

  case 'detect':
    case 'configuraciones':
    case 'avisodegp':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.detect = isEnable
      break

  case 'simi':
    case 'autosimi':
    case 'simsimi':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.simi = isEnable
      break

    case 'document':
    case 'documento':
    isUser = true
    user.useDocument = isEnable
    break

    case 'antilink':
    if (m.isGroup) {
    if (!(isAdmin || isOwner)) {
      global.dfail('admin', m, conn);
      throw false;
     }
  }
  chat.antiLink = isEnable; 
  break;

  case 'autoreacionar':
    if (m.isGroup) {
    if (!(isAdmin || isOwner)) {
      global.dfail('admin', m, conn);
      throw false;
     }
  }
  chat.reaction = isEnable; 
  break;

      case 'nsfw':
      case 'modohorny':
      if (m.isGroup) {
      if (!(isAdmin || isOwner)) {
      global.dfail('admin', m, conn)
      throw false
      }
    }
    chat.nsfw = isEnable          
    break
    default:
      if (!/[01]/.test(command)) return conn.reply(m.chat, `╭───────────────✦
│ 📜 *CONFIGURACIONES DEL CHAT:*
├───────────────╮
│ ➤ Welcome: ${chat.welcome ? '✅' : '❌'}
│ ➤ AutoAceptar: ${chat.autoAceptar ? '✅ Activado' : '❌'}
│ ➤ AutoRechazar: ${chat.autoRechazar ? '✅' : '❌'}
│ ➤ AntiBot: ${chat.antiBot ? '✅' : '❌'}
│ ➤ AntiArabe: ${chat.antiarabe ? '✅' : '❌'}
│ ➤ AntiBot: ${chat.antiBot ? '✅' : '❌'}
│ ➤ AntiFake: ${chat.antifake ? '✅' : '❌'}
│ ➤ AutoResponder: ${chat.autoresponder ? '✅' : '❌'}
│ ➤ Autolevelup: ${chat.autolevelup ? '✅' : '❌'}
│ ➤ AntiEliminar: ${chat.delete ? '✅' : '❌'}
│ ➤ SimSimi: ${chat.simi ? '✅' : '❌'}
│ ➤ Audios: ${chat.audios ? '✅' : '❌'}
│ ➤ AntiVer: ${chat.antiver ? '✅' : '❌'}
│ ➤ Detect: ${chat.detect ? '✅' : '❌'}
│ ➤ ModoAdmin: ${chat.modoadmin ? '✅' : '❌'}
│ ➤ NSFW: ${chat.modohorny ? '✅' : '❌'}
│ ➤ AntiLink: ${chat.antiLink ? '✅' : '❌'}
│ ➤ AntiPrivado: ${bot.antiPrivate ? '✅' : '❌'}
│ ➤ AutoRead: ${global.opts['autoread'] ? '✅' : '❌'}
│ ➤ Restrict: ${bot.restrict ? '✅' : '❌'}
│ ➤ Autobio: ${bot.autobio ? '✅' : '❌'}
│ ➤ AntiSpam: ${bot.antiSpam ? '✅' : '❌'}
│ ➤ JadiBotMD: ${bot.jadibotmd ? '✅' : '❌'}
│ ➤ AutoReacionar: ${bot.reaction ? '✅' : '❌'}
╰───────────────╯`, m, rcanal)
      throw false
  }
 conn.reply(m.chat, `🚩 La función *${type}* se *${isEnable ? 'activó' : 'desactivó'}* ${isAll ? 'para este Bot' : isUser ? '' : 'para este chat'}`, m, rcanal)
}

handler.help = ['on *<opción>*', 'off *<opción>*']
handler.tags = ['enable']
handler.command = ['enable', 'disable', 'on', 'off', '1', '0']

export default handler
