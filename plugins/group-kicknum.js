const handler = async (m, {conn, args, groupMetadata, participants, usedPrefix, command, isBotAdmin, isSuperAdmin}) => {
    if (!args[0]) return m.reply(`*🤍 Ingrese Algun Prefijo De Un Pais, 𝙴𝙹𝙴𝙼𝙿𝙻𝙾: ${usedPrefix + command} 52*`);
    if (isNaN(args[0])) return m.reply(`*🤍 Ingrese Algun Prefijo De Un Pais, 𝙴𝙹𝙴𝙼𝙿𝙻𝙾: ${usedPrefix + command} 52*`);
    const lol = args[0].replace(/[+]/g, '');
    const ps = participants.map((u) => u.id).filter((v) => v !== conn.user.jid && v.startsWith(lol || lol));
    const bot = global.db.data.settings[conn.user.jid] || {};
    if (ps == '') return m.reply(`*🤍 Aqui No Hay Ningun Numero Con El Prefijo +${lol}*`);
    const numeros = ps.map((v)=> '🤍 @' + v.replace(/@.+/, ''));
    const delay = (time) => new Promise((res)=>setTimeout(res, time));
    switch (command) {
      case 'listanum': case 'listnum':
        conn.reply(m.chat, `*𝙻𝙸𝚂𝚃𝙰 𝙳𝙴 𝙽𝚄𝙼𝙴𝚁𝙾𝚂 𝙲𝙾𝙽 𝙴𝙻 𝙿𝚁𝙴𝙵𝙸𝙹𝙾 +${lol} 𝚀𝚄𝙴 𝙴𝚂𝚃𝙰𝙽 𝙴𝙽 𝙴𝚂𝚃𝙴 𝙶𝚁𝚄𝙿𝙾:*\n\n` + numeros.join`\n`, m, {mentions: ps});
        break;
        
  case 'kicknum':
    if (!isBotAdmin) return m.reply('*¡🤍 El Bot No Es Admin!*');
    
    const ownerGroup = m.chat.split`-`[0] + '@s.whatsapp.net';
    const prefix = m.text.split(' ')[1];
    const users = participants
      .map((u) => u.id)
      .filter((v) => v !== conn.user.jid && v.startsWith(prefix));
  
    let removedCount = 0; 
    let errors = []; 
    
    for (const user of users) {
      const error = `@${user.split('@')[0]} ʏᴀ ʜᴀ sɪᴅᴏ ᴇʟɪᴍɪɴᴀᴅᴏ ᴏ ʜᴀ ᴀʙᴀɴᴅᴏɴᴀᴅᴏ ᴇʟ ɢʀᴜᴘᴏ*`;
  
      if (user !== ownerGroup && user !== global.conn.user.jid && user !== global.owner + '@s.whatsapp.net' && user !== isSuperAdmin) {
        await delay(2000);
        try {
          const responseb = await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
          
          if (responseb[0].status === 'success') {
            removedCount++; 
          } else {
            errors.push(`@${user.split('@')[0]}: Error al eliminar.`);
          }
        } catch (e) {
          console.error(e);
          errors.push(`@${user.split('@')[0]}: Error desconocido.`);
        }
        
        await delay(10000);
      } else {
        errors.push(`@${user.split('@')[0]}: No se puede eliminar (dueño o admin).`);
      }
    }
  
    if (removedCount > 0) {
      m.reply(`*✅ ${removedCount} usuario(s) con el prefijo ${prefix} han sido eliminados del grupo.*`, m.chat);
    }
  
    if (errors.length > 0) {
      m.reply(`*❌ Errores al eliminar los siguientes usuarios:* \n\n${errors.join('\n')}`, m.chat, { mentions: conn.parseMention(errors.join('\n')) });
    }
    break;
  
    }
  };
  handler.help = ['listanum', 'kicknum']
  handler.tags = ['group'];
  handler.command = /^(listanum|kicknum|listnum)$/i;
  handler.group = true;
  handler.admin = true;
  export default handler;
  
