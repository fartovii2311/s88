import { createHash } from 'crypto';
import fetch from 'node-fetch';

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i;

let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender];
  let name2 = conn.getName(m.sender);

  if (user.registered) return m.reply('✨ Ya estás registrado.');

  if (!Reg.test(text) && command !== 'verificar') {
    return conn.reply(
      m.chat,
      `🌟 *Registro requerido*\n\nPor favor, utiliza el formato:\n\`${usedPrefix + command} <nombre.edad>\`\n\nEjemplo:\n\`${usedPrefix + command} LynxAI.18\``,
      m,rcanal
    );
  }

  let name, age;
  if (command === 'verificar') {
    name = name2.trim();
    age = 18;
    if (!name || isNaN(age) || age < 18 || age > 100) {
      return conn.reply(
        m.chat,
        `❌ *Registro fallido*\n\nNo se pudo obtener un nombre o edad válidos.\nUsa el formato:\n\`${usedPrefix + command} <nombre.edad>\``,
        m,rcanal
      );
    }
  } else {
    let [_, n, splitter, a] = text.match(Reg);
    name = n.trim();
    age = parseInt(a);
    if (!name) return conn.reply(m.chat, '❌ El nombre no puede estar vacío.', m,rcanal);
    if (!age || age < 18 || age > 100) {
      return conn.reply(m.chat, '❌ La edad debe ser entre 18 y 100 años.', m,rcanal);
    }
  }

  user.name = name;
  user.age = age;
  user.regTime = +new Date();
  user.registered = true;

  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6);
  let imgURL = 'https://i.ibb.co/JndpnfX/LynxAI.jpg';
  let now = new Date();
  let date = now.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  let time = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  let txt = `🎉 *¡Registro exitoso!*\n\n` +
            `✨ *Información del Usuario:*\n` +
            `🆔 *Tag:* @${m.sender.split('@')[0]}\n` +
            `👤 *Nombre:* ${name}\n` +
            `🎂 *Edad:* ${age} años\n` +
            `📅 *Fecha:* ${date}\n` +
            `⏰ *Hora:* ${time}\n` +
            `🔑 *N° Serial:* ${sn}\n\n` +
            `🌟 *Bienvenido a la comunidad Dark Team.*`;

  await conn.sendMessage(
    m.chat,
    {
      image: { url: imgURL },
      caption: txt,
      footer: '✨ Powered by Dark Team',
      buttons: [
        { buttonId: `.perfil`, buttonText: { displayText: '👤 VER PERFIL' } },
        { buttonId: `.owner`, buttonText: { displayText: '🛠️ CONTACTAR OWNER' } },
      ],
      viewOnce: true,
      headerType: 4,
    },
    { quoted: m }
  );

  await m.react('✅');
};

handler.help = ['reg'].map(v => v + ' <nombre.edad>');
handler.tags = ['start'];
handler.command = ['verify', 'reg', 'register', 'registrar', 'verificar'];

export default handler;
