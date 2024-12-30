import MessageType from '@whiskeysockets/baileys';

let impuesto = 0.02; // Impuesto del 2%
let handler = async (m, { conn, text }) => {
  let who;
  if (m.isGroup) who = m.mentionedJid[0]; // Obtiene el primer usuario mencionado
  else who = m.chat; // Si no es grupo, toma el chat como destinatario
  if (!who) throw '🚩 Menciona al usuario con *@user.*';

  let txt = text.replace('@' + who.split`@`[0], '').trim(); // Obtiene el texto restante
  if (!txt) throw '🚩 Ingrese la cantidad de *💫 XP* que quiere transferir.';
  if (isNaN(txt)) throw '🚩 Solo números son permitidos.';

  let xp = parseInt(txt);
  if (xp < 1) throw '🚩 Mínimo es 1 💫 XP.*';

  let users = global.db.data.users;
  let imt = Math.ceil(xp * impuesto); // Calcula el impuesto
  let exp = xp + imt;

  // Verifica si el remitente es un propietario
  const isOwner = global.owner.some(([jid]) => m.sender.endsWith(jid));

  if (!isOwner) {
    // Si no es propietario, verifica si tiene suficiente XP
    if (exp > users[m.sender].exp) throw '🚩 No tienes suficiente *💫 XP* para transferir.';
    users[m.sender].exp -= exp; // Resta XP del remitente
  }

  // Agrega XP al destinatario
  users[who].exp += xp;

  await m.reply(
    `*${xp}* 💫 XP enviados exitosamente.
Impuesto del 2%: *${imt}* 💫 XP.
${isOwner ? '*Nota: Tienes XP ilimitado como propietario.*' : `Total gastado: *${exp} 💫 XP*.`}`
  );

  // Notifica al destinatario sobre la recepción del XP
  conn.fakeReply(m.chat, `*+${xp} 💫 XP recibidos.*`, who, m.text);
};

handler.help = ['darxp *@user <cantidad>*'];
handler.tags = ['rpg'];
handler.command = ['darxp']; 
handler.register = true;

export default handler;
