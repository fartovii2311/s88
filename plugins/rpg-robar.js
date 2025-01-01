let cooldowns = {};

let handler = async (m, { conn }) => {
  const tiempoEspera = 2 * 60 * 60;
  let participants = await conn.groupMetadata(m.chat).then((res) => res.participants);
  const usuarioObjetivo = pickRandom(participants).id; 

  if (!usuarioObjetivo) {
    conn.reply(m.chat, `⚠️ No hay suficientes usuarios registrados para robar corazones.`, m, rcanal);
    return;
  }

  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
    const tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000));
    conn.reply(m.chat, `🚩 Espera ⏱ *${tiempoRestante}* para volver a robar corazones.`, m, rcanal);
    return;
  }

  let user = global.db.data.users[m.sender];
  let targetUser = global.db.data.users[usuarioObjetivo];

  user.corazones = user.corazones || 0;
  targetUser.corazones = targetUser.corazones || 0;

  const corazonesRobados = Math.floor(Math.random() * 5) + 1;

  if (targetUser.corazones < corazonesRobados) {
    conn.reply(m.chat, `🤍 ${pickRandom(failMessages)} *${targetUser.name || usuarioObjetivo}* no tiene suficientes corazones para robar.`, m, rcanal);
    return;
  }

  targetUser.corazones -= corazonesRobados;
  user.corazones += corazonesRobados;

  cooldowns[m.sender] = Date.now();

  const userName = await conn.getName(m.sender) || 'Este usuario';
  const targetName = targetUser.name || `@${usuarioObjetivo.split('@')[0]}`;

  conn.reply(m.chat, `🤍 *¡${userName} ha robado ${corazonesRobados} corazones de ${targetName}!* Ahora tienes *${user.corazones} corazones*.`, m, rcanal, { mentions: [usuarioObjetivo] });
};

handler.help = ['robar'];
handler.tags = ['rpg'];
handler.command = ['robar', 'rb'];
handler.register = true;

export default handler;

function segundosAHMS(segundos) {
  let horas = Math.floor(segundos / 3600);
  let minutos = Math.floor((segundos % 3600) / 60);
  let segundosRestantes = segundos % 60;
  return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
}

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}
