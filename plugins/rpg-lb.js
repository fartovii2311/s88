let handler = async (m, { conn, args, participants }) => {
  let users = Object.entries(global.db.data.users).map(([key, value]) => {
    return { ...value, jid: key };
  });
  
  let sortedExp = users.map(toNumber('exp')).sort(sort('exp'));
  let sortedLim = users.map(toNumber('Monedas')).sort(sort('Monedas'));
  let sortedLevel = users.map(toNumber('level')).sort(sort('level'));
  
  let usersExp = sortedExp.map(enumGetKey);
  let usersLim = sortedLim.map(enumGetKey);
  let usersLevel = sortedLevel.map(enumGetKey);
  
  let len = args[0] && args[0].length > 0 ? Math.min(5, Math.max(parseInt(args[0]), 5)) : Math.min(5, sortedExp.length);
  
  let text = `
  *🏆 Top ${len} Jugadores:*

  *💰 Top ${len} Monedas 🪙*

  ✩ *Tú eres el #${usersLim.indexOf(m.sender) + 1} de ${usersLim.length}*  
  ✩ ${sortedLim.slice(0, len).map(({ jid, Monedas }, i) => {
    return `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} - *${Monedas} 🪙*`;
  }).join('\n✩ ')}
  
  *💫 Top ${len} XP 💫*

  ✩ *Tú eres el #${usersExp.indexOf(m.sender) + 1} de ${usersExp.length}*  
  ✩ ${sortedExp.slice(0, len).map(({ jid, exp }, i) => {
    return `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} - *${exp} 💫*`;
  }).join('\n✩ ')}
  
  *📈 Top ${len} Niveles 📈*

  ✩ *Tú eres el #${usersLevel.indexOf(m.sender) + 1} de ${usersLevel.length}*  
  ✩ ${sortedLevel.slice(0, len).map(({ jid, level }, i) => {
    return `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} - *Nivel ${level} 📈*`;
  }).join('\n✩ ')}

  *✨ ¡Sigue luchando y sube de nivel! ✨*
  `.trim();

  m.reply(text, null, { mentions: conn.parseMention(text) });
};

handler.help = ['lb'];
handler.tags = ['rpg'];
handler.command = ['nivel', 'lb', 'tops']; 
handler.register = true; 
handler.fail = null;
handler.exp = 0;

export default handler;

function sort(property, ascending = true) {
  if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property];
  else return (...args) => args[ascending & 1] - args[!ascending & 1];
}

function toNumber(property, _default = 0) {
  if (property) return (a, i, b) => {
    return { ...b[i], [property]: a[property] === undefined ? _default : a[property] };
  }
  else return a => a === undefined ? _default : a;
}

function enumGetKey(a) {
  return a.jid;
}
